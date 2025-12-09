#  Django/backend/apps/core/urls.py

from django.contrib.auth import views as auth_views
from django.urls import path
from . import views
from apps.core.views import debug_database, test_email_view # Импортируем отладочные страницу

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('water/', views.water, name='water'),
    path('grabber/', views.grabber, name='grabber'),
    path('news/', views.news, name='news'),
    path('press/', views.press, name='press'),
    path('contacts/', views.contacts, name='contacts'),
    path('application/', views.application, name='application'),
    path('set-language/', views.set_language, name='set_language'),
    path('login/', views.custom_login, name='login'),
    path('logout/', views.custom_logout, name='logout'),
    path('register/', views.register, name='register'),
    path('debug/database/', debug_database, name='debug_database'), # Отладочная страница
    path('test-email/', test_email_view, name='test_email'), # Страница для тестирования email
]