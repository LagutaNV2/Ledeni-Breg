# apps/applications/views.py

from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.views.generic import CreateView
from .models import Application
from .forms import ApplicationForm

class ApplicationCreateView(CreateView):
    model = Application
    form_class = ApplicationForm
    template_name = 'applications/application_form.html'

    def form_valid(self, form):
        # Сохраняем заявку
        response = super().form_valid(form)

        # Отправляем email
        application = form.instance
        subject = f'Новая заявка на подключение автомата от {application.full_name}'

        message = f"""
        Новая заявка на подключение автомата:

        Тип автомата: {application.get_machine_type_display()}
        Количество: {application.quantity}
        Адрес: {application.full_address}
        ФИО: {application.full_name}
        Телефон: {application.phone}
        Email: {application.email}
        Комментарий: {application.comment or 'Не указано'}

        Дата заявки: {application.created_date.strftime("%d.%m.%Y %H:%M")}
        """

        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.APPLICATION_EMAIL],  # Email куда отправлять заявки
                fail_silently=False,
            )
        except Exception as e:
            # Логируем ошибку, но не прерываем процесс
            print(f"Ошибка отправки email: {e}")

        # Добавляем сообщение об успехе
        messages.success(self.request, 'Ваша заявка успешно отправлена!')

        return response

def application_success(request):
    return render(request, 'applications/application_success.html')
