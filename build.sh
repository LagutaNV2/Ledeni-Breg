#!/usr/bin/env bash
set -o errexit

echo "=== Starting Build Process ==="
# echo "Current directory: $(pwd)"

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

# Создаем суперпользователя (если ещё не создан)
echo "=== CREATING SUPERUSER (IF NOT EXISTS) ==="
python create_admin.py

# Check if applications app exists and has models
echo "=== Checking Applications Setup ==="
python manage.py shell -c "
try:
    from apps.applications.models import Application
    print('✓ Applications model imported successfully')
    count = Application.objects.count()
    print(f'✓ Total applications in DB: {count}')
except Exception as e:
    print(f'✗ Applications model error: {e}')
"

echo "=== Build Complete ==="
