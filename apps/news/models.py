# Django/backend/apps/news/models.py

from django.db import models
from django.utils import timezone
from django.urls import reverse

class News(models.Model):
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    image = models.ImageField(upload_to='news/', verbose_name="Изображение", blank=True, null=True)
    content = models.TextField(verbose_name="Содержание")
    short_content = models.TextField(max_length=300, verbose_name="Краткое описание")
    created_date = models.DateTimeField(default=timezone.now, verbose_name="Дата публикации")
    published = models.BooleanField(default=True, verbose_name="Опубликовано")

    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"
        ordering = ['-created_date']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('news_detail', kwargs={'pk': self.pk})