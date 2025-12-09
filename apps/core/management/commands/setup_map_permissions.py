# apps/core/management/commands/setup_map_permissions.py

from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from apps.map_points.models import MapPoint

class Command(BaseCommand):
    help = 'Настройка групп и разрешений для доступа к картам'

    def handle(self, *args, **options):
        # Получаем разрешение для карт
        content_type = ContentType.objects.get_for_model(MapPoint)
        map_permission, created = Permission.objects.get_or_create(
            codename='view_all_maps',
            content_type=content_type,
            defaults={'name': 'Может просматривать все карты'}
        )

        # Создаем группу с доступом к картам
        map_access_group, created = Group.objects.get_or_create(
            name='Map Access Users'
        )
        map_access_group.permissions.add(map_permission)

        self.stdout.write(
            self.style.SUCCESS('Группы и разрешения успешно настроены')
        )
