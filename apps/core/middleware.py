# apps/core/middleware.py
#кэширования доступа к картам
import traceback
from django.http import HttpResponseServerError
from django.template import loader
from django.utils.cache import add_never_cache_headers
from django.conf import settings

# middleware для кэширования доступа к картам
class MapAccessCacheMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Если пользователь авторизован и есть проверка доступа
        if request.user.is_authenticated and settings.MAP_ACCESS_REQUIRED:
            # Отключаем кэширование для страниц с картами
            if request.path in ['/water/', '/grabber/']:
                add_never_cache_headers(response)

        return response
