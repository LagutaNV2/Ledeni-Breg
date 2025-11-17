# Модель для заявок (Django/backend/apps/applications/models.py)

from django.db import models
from django.utils import timezone
from django.urls import reverse

class Application(models.Model):
    MACHINE_TYPES = [
        ('water', 'Вода'),
        ('grabber', 'Хватайка'),
    ]

    machine_type = models.CharField(max_length=10, choices=MACHINE_TYPES, verbose_name="Тип автомата")
    quantity = models.IntegerField(
        verbose_name="Количество",
        choices=[(i, i) for i in range(1, 11)]
    )
    city = models.CharField(max_length=100, verbose_name="Город")
    street = models.CharField(max_length=200, verbose_name="Улица")
    building = models.CharField(max_length=20, verbose_name="Номер строения")
    full_name = models.CharField(max_length=200, verbose_name="ФИО")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    email = models.EmailField(verbose_name="Email")
    comment = models.TextField(
        verbose_name="Комментарий",
        blank=True,
        help_text="Дополнительная информация или пожелания"
    )
    created_date = models.DateTimeField(default=timezone.now, verbose_name="Дата заявки")
    processed = models.BooleanField(default=False, verbose_name="Обработано")

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"
        ordering = ['-created_date']

    def __str__(self):
        return f"Заявка от {self.full_name} ({self.get_machine_type_display()})"

    @property
    def full_address(self):
        return f"{self.city}, {self.street}, {self.building}"

    def get_absolute_url(self):
        return reverse('application_success')
