#!/usr/bin/env bash
set -o errexit

echo "=== Starting Build Process ==="
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

echo "=== CHECKING DJANGO STRUCTURE ==="
find . -name "manage.py" -type f
find . -name "wsgi.py" -type f
find . -name "requirements.txt" -type f
echo "=== END CHECK ==="

# Install dependencies from CORRECT location
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Run migrations
echo "Running database migrations..."
python manage.py migrate

echo "=== Build Complete ==="
