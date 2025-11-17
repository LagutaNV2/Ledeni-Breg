#  Django/backend/apps/core/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('water/', views.water, name='water'),
    path('grabber/', views.grabber, name='grabber'),
    path('news/', views.news, name='news'),
    path('press/', views.press, name='press'),
    path('contacts/', views.contacts, name='contacts'),
    path('application/', views.application, name='application'),
]