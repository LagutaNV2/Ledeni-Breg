# Django/backend/apps/core/views.py
# Главная страница

from django.shortcuts import render, redirect
from apps.map_points.models import MapPoint

from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from apps.applications.forms import ApplicationForm
from apps.applications.models import Application

import logging

logger = logging.getLogger('apps.core')

def home(request):
    return render(request, 'core/home.html')

def about(request):
    context = {
        'company_info': 'Ledeni Breg - ведущая компания по установке автоматов в Сербии...',
        # добавить другие данные если нужно
    }
    return render(request, 'core/about.html', context)

def water(request):
    try:
        water_points = MapPoint.objects.filter(machine_type='water', is_active=True)
        logger.info(f"Found {water_points.count()} water points")

        # Логируем точки для отладки
        for point in water_points:
            logger.debug(f"Water point: {point.name} - {point.latitude}, {point.longitude}")

        context = {
            'water_points': water_points,
        }
        return render(request, 'water/water.html', context)

    except Exception as e:
        logger.error(f"Error in water view: {e}")
        return render(request, 'water/water.html', {'water_points': []})

def grabber(request):
    try:
        grabber_points = MapPoint.objects.filter(machine_type='grabber', is_active=True)
        logger.info(f"Found {grabber_points.count()} grabber points")

        for point in grabber_points:
            logger.debug(f"Grabber point: {point.name} - {point.latitude}, {point.longitude}")

        context = {
            'grabber_points': grabber_points,
        }
        return render(request, 'grabber/grabber.html', context)

    except Exception as e:
        logger.error(f"Error in grabber view: {e}")
        return render(request, 'grabber/grabber.html', {'grabber_points': []})

def news(request):
    # не реализовано получение новостей из базы данных
    return render(request, 'news/news.html')

def press(request):
    # не реализовано получение пресс-релизов из базы данных
    return render(request, 'core/press.html')

def contacts(request):
    # не реализовано получение контактной информации из базы данных
    return render(request, 'contacts/contacts.html')

def application(request):
    if request.method == 'POST':
        form = ApplicationForm(request.POST)
        if form.is_valid():
            # Сценарий 1 и 2: форма валидна
            application = form.save()
            email_sent = False

            try:
                subject = f'Nova prijava za automatu - {application.get_machine_type_display()}'
                message_html = render_to_string('applications/email_template.html', {'application': application})
                message_text = f"""Nova prijava za automatu:

Tip automata: {application.get_machine_type_display()}
Količina: {application.quantity}
Adresa: {application.city}, {application.street} {application.building}
Ime i prezime: {application.full_name}
Telefon: {application.phone}
Email: {application.email}
Komentar: {application.comment or 'Nema komentara'}

Datum prijave: {application.created_date.strftime('%d.%m.%Y %H:%M')}"""

                send_mail(
                    subject=subject,
                    message=message_text,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.APPLICATION_EMAIL],
                    html_message=message_html,
                    fail_silently=False,
                )
                email_sent = True
                logger.info("Email sent successfully")

                # Сценарий 1: успех
                return render(request, 'applications/application.html', {
                    'show_success': True,
                    'application': application
                })

            except Exception as e:
                logger.error(f"Email sending failed: {str(e)}")
                # Сценарий 2: форма сохранена, но ошибка email
                return render(request, 'applications/application.html', {
                    'show_email_error': True,
                    'application': application,
                    'form_data': form.cleaned_data  # Передаём данные формы для отображения
                })
        else:
            # Сценарий 3: форма не валидна
            return render(request, 'applications/application.html', {
                'show_validation_error': True,
                'form': form
            })

    else:
        # GET запрос - показываем пустую форму
        form = ApplicationForm()
        return render(request, 'applications/application.html', {'form': form})
