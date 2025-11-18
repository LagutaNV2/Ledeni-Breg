# backend/create_admin.py
import os
import sys
import django

# Убедимся, что Django настроен
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ledenibreg.settings.production')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Получаем логин и пароль из переменных окружения
username = os.environ.get('ADMIN_USERNAME', 'admin')
email = os.environ.get('ADMIN_EMAIL', 'admin@ledeni-breg.com')
password = os.environ.get('ADMIN_PASSWORD')

if not password:
    print("ERROR: ADMIN_PASSWORD environment variable is not set.")
    sys.exit(1)

# Проверяем, существует ли пользователь
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"Superuser '{username}' created successfully.")
else:
    print(f"Superuser '{username}' already exists. Skipping creation.")
