#!/bin/bash
set -e

./prepare-docs.sh
cd docs && jekyll serve
