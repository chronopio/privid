#!/bin/sh
set -e

# From apps/extension

# Clean previous build
rm -rf build
mkdir build

# Build the extension (from the extension root)
bun run build

# Copy necessary files to build/
cp manifest.json build/
cp -r popup build/
cp -r dist build/

# Build the extension zip using web-ext from inside build/
cd build
bunx web-ext build --source-dir=./ --artifacts-dir=../dist
cd ..

# Clean up build directory
rm -rf build