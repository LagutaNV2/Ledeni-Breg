# backend/apps/core/context_processors.py
from django.conf import settings
import logging

logger = logging.getLogger('apps.core')

def language_context(request):
    """Добавляет информацию о языке в контекст шаблонов"""
    current_language = request.COOKIES.get('django_language', 'sr')

    # Логируем для отладки
    logger.debug(f"Current language: {current_language}, path: {request.path}")

    return {
        'current_language': current_language,
        'languages': settings.LANGUAGES,
    }
