#!/usr/bin/env bash
# Exit immediately if any command fails
set -o errexit

echo "=== Starting Build Process ==="
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Install dependencies
echo "Installing Python dependencies..."
pip install -r Django/backend/requirements.txt

# Change to backend directory
cd Django/backend

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Run migrations
echo "Running database migrations..."
python manage.py migrate

echo "=== Build Complete ==="
# Note: The actual deployment to Render.com is
# handled via the Render dashboard and the render.yaml file.