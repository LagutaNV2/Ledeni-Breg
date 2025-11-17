# Django/backend/apps/contacts/models.py

from django.db import models

class PhoneNumber(models.Model):
    TYPE_CHOICES = [
        ('main', 'Основной'),
        ('secondary', 'Дополнительный'),
        ('viber', 'Viber'),
        ('whatsapp', 'WhatsApp'),
        ('telegram', 'Telegram'),
    ]

    contact = models.ForeignKey('Contact', on_delete=models.CASCADE, related_name='phones', verbose_name="Контакт")
    phone_type = models.CharField(max_length=10, choices=TYPE_CHOICES, verbose_name="Тип телефона", default='main')
    number = models.CharField(max_length=20, verbose_name="Номер телефона")
    description = models.CharField(max_length=100, blank=True, verbose_name="Описание")

    class Meta:
        verbose_name = "Номер телефона"
        verbose_name_plural = "Номера телефонов"

    def __str__(self):
        return f"{self.get_phone_type_display()}: {self.number}"

class Contact(models.Model):
    company_name = models.CharField(max_length=200, verbose_name="Юридическое название", default="Kompanija Vendtime d.o.o")
    legal_address = models.TextField(verbose_name="Юридический адрес")
    email = models.EmailField(verbose_name="Email")
    working_hours = models.TextField(verbose_name="Режим работы", blank=True)

    class Meta:
        verbose_name = "Контакт"
        verbose_name_plural = "Контакты"

    def __str__(self):
        return self.company_name

class SocialMedia(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название")
    url = models.URLField(verbose_name="Ссылка")
    icon_class = models.CharField(max_length=50, verbose_name="Класс иконки")

    class Meta:
        verbose_name = "Социальная сеть"
        verbose_name_plural = "Социальные сети"

    def __str__(self):
        return self.name
