#!/bin/bash

# Name of the main project folder
EXTENSION_DIR="my-wallpaper-extension"

# Create the directory structure
mkdir -p "$EXTENSION_DIR/images"

# Navigate into the directory
cd "$EXTENSION_DIR" || exit

# Create the required files
touch manifest.json newtab.html style.css script.js

# Print success message
echo "✅ Chrome extension folder structure created successfully."
