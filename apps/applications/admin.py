# apps/applications/admin.py

from django.contrib import admin
from .models import Application

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'machine_type', 'quantity', 'created_date', 'processed']
    list_filter = ['machine_type', 'processed', 'created_date']
    search_fields = ['full_name', 'phone', 'email']
    readonly_fields = ['created_date']
