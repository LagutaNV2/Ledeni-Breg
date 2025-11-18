# apps/applications/views.py

import threading
from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.views.generic import CreateView
from django.views import View
from .models import Application
from .forms import ApplicationForm
import logging

# Настройка логгера
logger = logging.getLogger(__name__)

# class ApplicationCreateView(CreateView):
#     model = Application
#     form_class = ApplicationForm
#     template_name = 'applications/application_form.html'

#     def form_valid(self, form):
#         # Сохраняем заявку
#         response = super().form_valid(form)

#         # Отправляем email
#         application = form.instance
#         subject = f'Новая заявка на подключение автомата от {application.full_name}'

#         message = f"""
#         Новая заявка на подключение автомата:

#         Тип автомата: {application.get_machine_type_display()}
#         Количество: {application.quantity}
#         Адрес: {application.full_address}
#         ФИО: {application.full_name}
#         Телефон: {application.phone}
#         Email: {application.email}
#         Комментарий: {application.comment or 'Не указано'}

#         Дата заявки: {application.created_date.strftime("%d.%m.%Y %H:%M")}
#         """

#         try:
#             send_mail(
#                 subject,
#                 message,
#                 settings.DEFAULT_FROM_EMAIL,
#                 [settings.APPLICATION_EMAIL],  # Email куда отправлять заявки
#                 fail_silently=False,
#             )
#         except Exception as e:
#             # Логируем ошибку, но не прерываем процесс
#             print(f"Ошибка отправки email: {e}")

#         # Добавляем сообщение об успехе
#         messages.success(self.request, 'Ваша заявка успешно отправлена!')

#         return response

# def application_success(request):
#     return render(request, 'applications/application_success.html')

class ApplicationView(View):
    template_name = 'applications/application_form.html'

    def get(self, request):
        form = ApplicationForm()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = ApplicationForm(request.POST)

        if form.is_valid():
            try:
                # Сохраняем заявку
                application = form.save()
                logger.info(f"Заявка #{application.id} сохранена успешно")

                # Пытаемся отправить email (синхронно, но с обработкой ошибок)
                email_sent = self.try_send_email(application)

                if email_sent:
                    return render(request, self.template_name, {
                        'show_success': True,
                        'form_data': form.cleaned_data
                    })
                else:
                    # Email не отправлен, но заявка сохранена
                    return render(request, self.template_name, {
                        'show_email_error': True,
                        'form_data': form.cleaned_data
                    })

            except Exception as e:
                logger.error(f"Ошибка при сохранении заявки: {str(e)}")
                return render(request, self.template_name, {
                    'form': form,
                    'show_email_error': True,
                    'form_data': form.cleaned_data
                })
        else:
            return render(request, self.template_name, {
                'form': form,
                'show_validation_error': True
            })

    def try_send_email(self, application):
        """Пытается отправить email, возвращает True если успешно"""
        try:
            from django.core.mail import send_mail
            from django.conf import settings

            subject = f'Новая заявка от {application.full_name}'
            message = f"""
            Новая заявка:

            Тип: {application.get_machine_type_display()}
            Количество: {application.quantity}
            Адрес: {application.city}, {application.street} {application.building}
            ФИО: {application.full_name}
            Телефон: {application.phone}
            Email: {application.email}
            Комментарий: {application.comment or 'Нет'}
            """

            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.APPLICATION_EMAIL],
                fail_silently=True,  # Не вызывать исключение при ошибке
            )
            logger.info(f"Email отправлен для заявки #{application.id}")
            return True

        except Exception as e:
            logger.warning(f"Email не отправлен для заявки #{application.id}: {str(e)}")
            return False
