# backend/apps/core/context_processors.py
from django.conf import settings
from django.contrib.auth.models import Permission
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

def map_access_context(request):
    """Контекстный процессор для проверки доступа к картам"""
    has_map_access = False

    if not settings.MAP_ACCESS_REQUIRED:
        # Если проверка отключена в настройках - доступ у всех
        has_map_access = True
    elif request.user.is_authenticated:
        # Проверяем разрешение view_all_maps
        has_map_access = request.user.has_perm('map_points.view_all_maps')

    return {
        'has_map_access': has_map_access,
        'MAP_ACCESS_REQUIRED': settings.MAP_ACCESS_REQUIRED,
    }
