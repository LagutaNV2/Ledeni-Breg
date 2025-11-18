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

# Collect static files (из корневой директории)
echo "Collecting static files..."
python Django/backend/manage.py collectstatic --noinput

# Run migrations (из корневой директории)
echo "Running database migrations..."
python Django/backend/manage.py migrate

echo "=== Build Complete ==="
