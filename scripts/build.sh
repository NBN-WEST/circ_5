#!/bin/bash

echo "Building Circolo delle Quinte"
echo "=================================="

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf dist/
rm -rf release/

# Run tests
echo "Running tests..."
npm test || exit 1

# Type check
echo "Type checking..."
npm run type-check || exit 1

# Build frontend
echo "Building React app..."
npm run build || exit 1

# Build Electron app
echo "Building Electron app..."
npm run electron:build || exit 1

echo "Build completed successfully!"
echo "Installers available in: release/"
