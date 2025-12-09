#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ledenibreg.settings.development')
django.setup()

from django.contrib.auth.models import User, Group, Permission
from django.contrib.contenttypes.models import ContentType
from apps.map_points.models import MapPoint

def setup_initial_permissions():
    # 1. Проверяем наличие разрешения
    content_type = ContentType.objects.get_for_model(MapPoint)

    # Создаем или получаем разрешение
    permission, created = Permission.objects.get_or_create(
        codename='view_all_maps',
        content_type=content_type,
        defaults={'name': 'Может просматривать все карты'}
    )

    # 2. Создаем или получаем группу
    group, group_created = Group.objects.get_or_create(
        name='Map Access Users'
    )

    # 3. Добавляем разрешение в группу
    group.permissions.add(permission)

    # 4. Даем права администратору
    try:
        admin_user = User.objects.get(username='admin')
        admin_user.user_permissions.add(permission)
        admin_user.groups.add(group)
        print(f"Права добавлены пользователю: {admin_user.username}")
    except User.DoesNotExist:
        print("Пользователь 'admin' не найден")

    # 5. Создаем тестового пользователя без прав
    try:
        test_user = User.objects.get(username='test_access_allowed')
    except User.DoesNotExist:
        test_user = User.objects.create_user(
            username='test_access_allowed',
            password='test123',
            email='test@example.com'
        )

    # Убираем у тестового пользователя все права
    test_user.groups.clear()
    test_user.user_permissions.clear()

    print("=" * 50)
    print(f"Создано разрешение: {permission}")
    print(f"Создана группа: {group}")
    print(f"Разрешения группы: {list(group.permissions.all())}")
    print("=" * 50)
    print("Теперь нужно:")
    print("1. Войти как администратор (admin)")
    print("2. Перейти в админку: http://127.0.0.1:8000/admin")
    print("3. Зайти в 'Пользователи'")
    print("4. Выбрать пользователя и добавить его в группу 'Map Access Users'")
    print("5. Или назначить разрешение 'Может просматривать все карты'")

if __name__ == '__main__':
    setup_initial_permissions()
