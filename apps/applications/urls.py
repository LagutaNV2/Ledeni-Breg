# apps/applications/urls.py

from django.urls import path
from . import views

app_name = 'applications'

urlpatterns = [
    path('', views.ApplicationCreateView.as_view(), name='application_form'),
    path('success/', views.application_success, name='application_success'),
]