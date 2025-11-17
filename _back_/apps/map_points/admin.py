# apps/map_points/admin.py

from django.contrib import admin
from .models import MapPoint

@admin.register(MapPoint)
class MapPointAdmin(admin.ModelAdmin):
    list_display = ['name', 'machine_type', 'city', 'is_active']
    list_filter = ['machine_type', 'city', 'is_active']
    search_fields = ['name', 'address', 'city']
