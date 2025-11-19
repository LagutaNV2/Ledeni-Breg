"""
Django/backend/ledenibreg/wsgi.py

WSGI config for ledenibreg project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import sys

sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from django.core.wsgi import get_wsgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ledenibreg.settings.development')
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ledenibreg.settings.production')
if os.environ.get('DEBUG', 'False').lower() == 'true':
    # Режим разработки
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ledenibreg.settings.development')
else:
    # Режим продакшн (по умолчанию)
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ledenibreg.settings.production')

application = get_wsgi_application()
