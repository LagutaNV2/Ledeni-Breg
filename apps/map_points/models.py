# Модель для точек на карте (Django/backend/apps/map_points/models.py)

from django.db import models
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType

class MapPoint(models.Model):
    MACHINE_TYPES = [
        ('water', 'Вода'),
        ('grabber', 'Хватайка'),
    ]

    name = models.CharField(max_length=100, verbose_name="Название точки")
    machine_type = models.CharField(max_length=10, choices=MACHINE_TYPES, verbose_name="Тип автомата")
    address = models.CharField(max_length=200, verbose_name="Адрес")
    city = models.CharField(max_length=100, verbose_name="Город")
    latitude = models.FloatField(verbose_name="Широта")
    longitude = models.FloatField(verbose_name="Долгота")
    is_active = models.BooleanField(default=True, verbose_name="Активна")

    class Meta:
        verbose_name = "Точка на карте"
        verbose_name_plural = "Точки на карте"
        permissions = [
            ("view_all_maps", "Может просматривать все карты"),
        ]

    def __str__(self):
        return f"{self.name} ({self.get_machine_type_display()})"
