#!/bin/bash
set -e

# Build neko.js
python3 build.py

# Copy README to docs
cp README.md docs/README.md

# Copy neko icon to docs
mkdir -p docs/assets/images
cp nkosrc4/Neko98/Res/Awake.ico docs/assets/images/neko-awake.ico
