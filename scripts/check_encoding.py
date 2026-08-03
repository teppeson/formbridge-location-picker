from __future__ import annotations

import argparse
import fnmatch
import re
from pathlib import Path


DEFAULT_TEXT_GLOBS = [
    "*.md",
    "*.txt",
    "*.json",
    "*.yaml",
    "*.yml",
    "*.py",
    "*.ps1",
    "*.js",
    "*.ts",
    "*.tsx",
    "*.css",
    "*.html",
    "*.csv",
]

DEFAULT_SKIP_DIRS = {
    ".git",
    ".venv",
    "venv",
    "node_modules",
    "__pycache__",
    ".mypy_cache",
    ".pytest_cache",
}

DEFAULT_CP932_GLOBS = []
CRLF_GLOBS = ["*.bat", "*.cmd", "*.csv", "formbridge-location-picker.js"]
QUESTION_RUN_RE = re.compile(r"(?<![`?])\?{3,}(?![`?])")


def relpath(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def matches_any(value: str, patterns: list[str]) -> bool:
    return any(fnmatch.fnmatch(value, pattern) for pattern in patterns)


def iter_target_files(root: Path, text_globs: list[str]):
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        parts = set(path.relative_to(root).parts)
        if parts & DEFAULT_SKIP_DIRS:
            continue
        rel = relpath(path, root)
        if matches_any(path.name, text_globs) or matches_any(rel, text_globs):
            yield path


def expected_newline(rel: str, name: str) -> bytes:
    if matches_any(name, CRLF_GLOBS) or matches_any(rel, CRLF_GLOBS):
        return b"\r\n"
    return b"\n"


def check_file(path: Path, root: Path, cp932_globs: list[str]) -> list[str]:
    rel = relpath(path, root)
    data = path.read_bytes()
    errors: list[str] = []

    if data.startswith(b"\xef\xbb\xbf"):
        errors.append(f"{rel}: UTF-8 BOM is not allowed by default")

    encoding = "cp932" if matches_any(rel, cp932_globs) else "utf-8"
    try:
        text = data.decode(encoding)
    except UnicodeDecodeError as exc:
        errors.append(f"{rel}: cannot decode as {encoding}: {exc}")
        return errors

    for line_no, line in enumerate(text.splitlines(), 1):
        if "\ufffd" in line and "`\ufffd`" not in line:
            errors.append(f"{rel}:{line_no}: contains replacement character U+FFFD")
        if QUESTION_RUN_RE.search(line):
            errors.append(f"{rel}:{line_no}: contains suspicious consecutive question marks")

    newline = expected_newline(rel, path.name)
    if b"\r\n" in data and newline == b"\n":
        errors.append(f"{rel}: CRLF found; LF is expected")
    if b"\r\n" not in data and b"\n" in data and newline == b"\r\n":
        errors.append(f"{rel}: LF found; CRLF is expected")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Check text encodings and newline policy.")
    parser.add_argument("root", nargs="?", default=".", help="Project root to scan")
    parser.add_argument(
        "--cp932-glob",
        action="append",
        default=[],
        help="Path glob for explicit CP932 / Shift_JIS exceptions",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve()
    cp932_globs = DEFAULT_CP932_GLOBS + args.cp932_glob
    errors: list[str] = []

    for path in iter_target_files(root, DEFAULT_TEXT_GLOBS):
        errors.extend(check_file(path, root, cp932_globs))

    if errors:
        for error in errors:
            print(error)
        return 1

    print("encoding check passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
