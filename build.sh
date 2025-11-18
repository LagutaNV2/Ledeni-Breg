#!/usr/bin/env bash
set -o errexit

echo "=== Starting Build Process ==="
echo "Current directory: $(pwd)"
# echo "Directory contents:"
# ls -la

# echo "=== CHECKING DJANGO STRUCTURE ==="
# find . -name "manage.py" -type f
# find . -name "wsgi.py" -type f
# find . -name "requirements.txt" -type f

# echo "=== CHECKING TEMPLATES ==="
# find . -name "home.html" -type f
# find . -name "templates" -type d

echo "=== CHECKING STATIC FILES ==="
find . -name "logo.svg" -type f
find . -name "waves.svg" -type f
echo "=== Static files in images/ ==="
find . -path "*/static/images/*" -type f | head -20
echo "=== END CHECK ==="

# Install dependencies from CORRECT location
# echo "Installing Python dependencies..."
pip install -r requirements.txt

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Run migrations
echo "Running database migrations..."

echo "=== CHECKING MIGRATIONS ==="
python manage.py showmigrations
echo "=== APPLYING MIGRATIONS ==="
python manage.py migrate
echo "=== Build Complete ==="
