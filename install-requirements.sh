#!/bin/bash

echo "Checking Python availability..."
if ! command -v python3 &> /dev/null; then
    echo "Error: Python is not installed. Please install Python before running this script."
    exit 1
fi

echo "Creating venv..."
if ! python3 -m venv venv; then
    echo "Error: Failed to create venv."
    exit 1
fi
echo "venv is created successfully."

echo "Activating venv..."
if ! source  venv/bin/activate; then
    echo "Error: Failed to activate venv."
    exit 1
fi
echo "venv activated."

echo "Installing requirements..."
if ! pip install --no-cache-dir -r requirements.txt && pip install --no-cache-dir pygco; then
    echo "Error: Failed to install requirements."
    exit 1
fi
echo "Requirements installed successfully."

echo "Your project is ready :)"