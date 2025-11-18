#!/usr/bin/env bash
# set -o errexit

# echo "=== Starting Build Process ==="
# echo "Current directory: $(pwd)"
# echo "Directory contents:"
# ls -la

# echo "=== CHECKING DJANGO STRUCTURE ==="
# find . -name "manage.py" -type f
# find . -name "wsgi.py" -type f
# find . -name "requirements.txt" -type f
# echo "=== END CHECK ==="

# Install dependencies from CORRECT location
# echo "Installing Python dependencies..."
# pip install -r requirements.txt

# Collect static files
# echo "Collecting static files..."
# python manage.py collectstatic --noinput

# Run migrations
# echo "Running database migrations..."
# python manage.py migrate

# echo "=== Build Complete ==="


# diagnostic build script - uncomment for debugging build issues
set -o errexit

echo "=== DIAGNOSTIC BUILD ==="
echo "Current directory: $(pwd)"
echo "Python path:"
python -c "import sys; print('\n'.join(sys.path))"

echo "=== CHECKING PATHS ==="
find . -name "manage.py" -exec ls -la {} \;
find . -name "wsgi.py" -exec ls -la {} \;
find . -name "static" -type d

echo "=== TESTING DJANGO ==="
python -c "
import django
from pathlib import Path
print(f'Django version: {django.__version__}')
print(f'Current dir: {Path.cwd()}')
try:
    from ledenibreg import settings
    print('SUCCESS: Imported settings')
except Exception as e:
    print(f'ERROR importing settings: {e}')
"

pip install -r requirements.txt


python manage.py check --deploy

echo "=== BUILD COMPLETE ==="
