from .base import *
import os
from decouple import config
import dj_database_url

DEBUG = False

SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-secret-key-for-debug-only')

ALLOWED_HOSTS_STR = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1')
if isinstance(ALLOWED_HOSTS_STR, str):
    ALLOWED_HOSTS = [host.strip() for host in ALLOWED_HOSTS_STR.split(',') if h>
else:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Для корректного определения протокола
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# База данных
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'name_db'),
        'USER': os.environ.get('DB_USER', 'name_user'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'password'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}


# E=mail settings
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'xxx')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', xxx))
EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS', 'True') == 'True'
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', '')
APPLICATION_EMAIL = os.environ.get('APPLICATION_EMAIL', '')

# Security settings (common HTTP/HTTPS)
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True

# Security settings (True for HTTPS )
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Security settings (## for HTTP)
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Для кастомных обработчиков ошибок
CSRF_TRUSTED_ORIGINS = [
    'https://5.188.118.217',
    'https://ledenibreg.rs',
    'https://www.ledenibreg.rs',
]

# Добавляем обработчики ошибок
handler404 = 'apps.core.views.custom_404'
handler500 = 'apps.core.views.custom_500'

# WhiteNoise configuration
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Улучшенные настройки сжатия
COMPRESS_ENABLED = True
COMPRESS_OFFLINE = True

# Увеличить таймауты
GUNICORN_TIMEOUT = 120

# Кэширование в памяти
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}

# Логирование
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
        'apps.applications': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}
