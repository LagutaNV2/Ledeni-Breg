# Django/backend/ledenibreg/settings/development.py
# Development settings for Ledenibreg project

from .base import *
import os
from dotenv import load_dotenv
from pathlib import Path
from decouple import config

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DEBUG = os.getenv('DEBUG', 'False') == 'True'

SECRET_KEY = os.getenv('SECRET_KEY', 'fallback-secret-key')
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

# PostgreSQL configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'ledenibreg_dev'),
        'USER': os.getenv('DB_USER', 'postgres'),        # кастомное имя пользователя
        'PASSWORD': os.getenv('DB_PASSWORD', ''),        # пароль постгресса
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
        'OPTIONS': {
            'client_encoding': 'UTF8',  # Принудительно устанавливаем UTF8
            'options': '-c client_encoding=UTF8',  # Дополнительная опция для установки кодировки
        },
    }
}

# Email settings
EMAIL_BACKEND = config('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = config('EMAIL_HOST', default='')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='webmaster@localhost')

# Email для заявок
APPLICATION_EMAIL = config('APPLICATION_EMAIL', default='n.v.laguta2023@gmail.com')

# Для статических файлов в разработке
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Логирование для отладки
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',  # Используем StreamHandler для вывода в консоль
            'level': 'DEBUG',
            'formatter': 'verbose',  # Добавляем форматтер (определим его ниже)
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
            'formatter': 'verbose',  # Также используем форматтер
        },
    },
    'formatters': {
        'verbose': {  # Определяем формат логов
            'format': '[{asctime}] {levelname} {module}: {message}',
            'style': '{',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
        'apps.map_points': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'apps.core': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

# логирование текущих email настроек для отладки:
print("=== EMAIL SETTINGS ===")
print(f"EMAIL_BACKEND: {EMAIL_BACKEND}")
print(f"EMAIL_HOST: {EMAIL_HOST}")
print(f"EMAIL_PORT: {EMAIL_PORT}")
print(f"EMAIL_USE_TLS: {EMAIL_USE_TLS}")
print(f"EMAIL_HOST_USER: {EMAIL_HOST_USER}")
print(f"DEFAULT_FROM_EMAIL: {DEFAULT_FROM_EMAIL}")
print(f"APPLICATION_EMAIL: {APPLICATION_EMAIL}")
print("======================")
