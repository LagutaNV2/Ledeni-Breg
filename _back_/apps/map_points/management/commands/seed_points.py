# backend/apps/map_points/management/commands/seed_points.py
from django.core.management.base import BaseCommand
from apps.map_points.models import MapPoint

class Command(BaseCommand):
    help = 'Seed database with sample map points'

    def handle(self, *args, **options):
        # Очищаем старые данные
        MapPoint.objects.all().delete()

        # Тестовые точки для водоматов
        water_points = [
            {
                'name': 'Белград Центр',
                'machine_type': 'water',
                'address': 'Кнез Михаилова улица',
                'city': 'Белград',
                'latitude': 44.817813,
                'longitude': 20.456898,
            },
            {
                'name': 'Нови Сад Вода',
                'machine_type': 'water',
                'address': 'Петроварадинская крепость',
                'city': 'Нови Сад',
                'latitude': 45.255133,
                'longitude': 19.861545,
            },
            {
                'name': 'Подгорица Вода',
                'machine_type': 'water',
                'address': 'Центральный парк',
                'city': 'Подгорица',
                'latitude': 42.441575,
                'longitude': 19.262244,
            }
        ]

        # Тестовые точки для игрушек
        grabber_points = [
            {
                'name': 'Белград Игрушки',
                'machine_type': 'grabber',
                'address': 'ТЦ Ушче',
                'city': 'Белград',
                'latitude': 44.806234,
                'longitude': 20.442543,
            },
            {
                'name': 'Ниш Игрушки',
                'machine_type': 'grabber',
                'address': 'ТЦ Казино',
                'city': 'Ниш',
                'latitude': 43.320902,
                'longitude': 21.895758,
            }
        ]

        # Создаем точки
        for point_data in water_points + grabber_points:
            MapPoint.objects.create(**point_data)

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {len(water_points)} water and {len(grabber_points)} grabber points')
        )
