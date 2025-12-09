# apps/core/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

class CustomUserAdmin(UserAdmin):
    list_filter = UserAdmin.list_filter + ('groups',)
    list_display = UserAdmin.list_display + ('has_map_access',)

    def has_map_access(self, obj):
        return obj.has_perm('map_points.view_all_maps')
    has_map_access.boolean = True
    has_map_access.short_description = 'Доступ к картам'

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
