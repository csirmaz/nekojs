#\!/bin/bash
set -e

python3 build.py
cp README.md docs/README.md
cd docs && jekyll serve
