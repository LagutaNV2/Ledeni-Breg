# Django/backend/apps/core/views.py

import os
import logging

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.utils import translation
from django.template.loader import render_to_string
from django.http import JsonResponse, HttpResponseNotFound

from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie

from apps.applications.forms import ApplicationForm
from apps.applications.models import Application
from apps.map_points.models import MapPoint

logger = logging.getLogger('apps.core')

@cache_page(60 * 15)  # Кэширование на 15 минут
@vary_on_cookie  # Разные версии для разных пользователей
def water(request):
    water_points = MapPoint.objects.filter(
        machine_type='water',
        is_active=True
    )

    context = {
        'water_points': water_points,
        'current_language': request.LANGUAGE_CODE,
    }

    return render(request, 'water/water.html', context)


def home(request):
    current_language = request.COOKIES.get('django_language', 'sr')
    context = {
        'current_language': current_language,
        'languages': settings.LANGUAGES,
    }
    return render(request, 'core/home.html', context)

def about(request):
    current_language = request.COOKIES.get('django_language', 'sr')
    context = {
        'company_info': 'Ledeni Breg - ведущая компания по установке автоматов в Сербии...',
        'current_language': current_language,
        'languages': settings.LANGUAGES,
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
    current_language = request.COOKIES.get('django_language', 'sr')
    context = {
        'current_language': current_language,
        'languages': settings.LANGUAGES,
    }
    return render(request, 'core/contacts.html', context)

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

def custom_404(request, exception):
    return render(request, 'core/404.html', status=404)

def custom_500(request):
    return render(request, 'core/500.html', status=500)

def set_language(request):
    """Устанавливает язык в cookies"""
    if request.method == 'POST':
        language = request.POST.get('language', 'sr')
        logger.info(f"Language switch attempt: {language}, referer: {request.META.get('HTTP_REFERER', '/')}")

        if language in [lang[0] for lang in settings.LANGUAGES]:
            translation.activate(language)
            # request.LANGUAGE_CODE = translation.get_language()

            response = redirect(request.META.get('HTTP_REFERER', '/'))
            response.set_cookie('django_language', language, max_age=365*24*60*60)
            logger.info(f"Language successfully switched to: {language}")
            return response
        else:
            logger.warning(f"Invalid language code: {language}")
    else:
        logger.warning("set_language called without POST method")

    return redirect(request.META.get('HTTP_REFERER', '/'))

def get_current_language(request):
    """Получает текущий язык из cookie или использует язык по умолчанию"""
    return request.COOKIES.get('django_language', 'sr')

def register(request):
    """Регистрация нового пользователя с обработкой ошибок"""
    if request.user.is_authenticated:
        return redirect('home')

    # Получаем язык из куки
    current_language = request.COOKIES.get('django_language', 'sr')

    error = None
    success = None

    if request.method == 'POST':
        try:
            username = request.POST.get('username')
            password1 = request.POST.get('password1')
            password2 = request.POST.get('password2')

            # Валидация
            if not username or not password1 or not password2:
                error = 'Заполните все поля' if current_language == 'ru' else 'Popunite sva polja'
            elif password1 != password2:
                error = 'Пароли не совпадают' if current_language == 'ru' else 'Lozinke se ne podudaraju'
            elif len(password1) < 6:
                error = 'Пароль должен быть не менее 6 символов' if current_language == 'ru' else 'Lozinka mora imati najmanje 6 karaktera'
            elif len(username) < 3:
                error = 'Имя пользователя должно быть не менее 3 символов' if current_language == 'ru' else 'Korisničko ime mora imati najmanje 3 karaktera'
            else:
                # Проверяем, существует ли пользователь
                from django.contrib.auth.models import User
                if User.objects.filter(username=username).exists():
                    error = 'Пользователь с таким именем уже существует' if current_language == 'ru' else 'Korisnik sa ovim imenom već postoji'
                else:
                    # Создаем пользователя
                    user = User.objects.create_user(
                        username=username,
                        password=password1
                    )

                    # Автоматический вход после регистрации
                    login(request, user)

                    # Сообщение об успехе
                    messages.success(request,
                        'Регистрация успешна! Добро пожаловать!' if current_language == 'ru'
                        else 'Registracija uspešna! Dobrodošli!'
                    )
                    return redirect('home')

        except Exception as e:
            logger.error(f'Registration error: {e}')
            error = 'Произошла ошибка при регистрации. Попробуйте позже.' if current_language == 'ru' else 'Došlo je do greške pri registraciji. Pokušajte kasnije.'

    context = {
        'error': error,
        'success': success,
        'current_language': current_language,  # Используем куки
    }

    return render(request, 'core/register.html', context)

def quick_logout(request):
    """Временный выход для тестирования"""
    logout(request)
    return redirect('home')

def custom_login(request):
    """Свой view для входа без ссылок на сброс пароля"""
    # Если уже авторизован - на главную
    if request.user.is_authenticated:
        return redirect('home')

    # Получаем язык из куки (как везде в проекте)
    current_language = request.COOKIES.get('django_language', 'sr')

    error = None
    success = None

    if request.method == 'POST':
        try:
            username = request.POST.get('username')
            password = request.POST.get('password')

            # Проверяем, что оба поля заполнены
            if not username or not password:
                error = 'Заполните все поля' if current_language == 'ru' else 'Popunite sva polja'
            else:
                user = authenticate(request, username=username, password=password)

                if user is not None:
                    login(request, user)
                    next_url = request.GET.get('next', 'home')

                    # Добавляем сообщение об успехе
                    messages.success(request,
                        'Вы успешно вошли в систему!' if current_language == 'ru'
                        else 'Uspešno ste se prijavili!'
                    )
                    return redirect(next_url)
                else:
                    error = 'Неверный логин или пароль' if current_language == 'ru' else 'Pogrešno korisničko ime ili lozinka'

        except Exception as e:
            # Логируем ошибку
            logger.error(f'Login error: {e}')
            error = 'Произошла ошибка при входе. Попробуйте позже.' if current_language == 'ru' else 'Došlo je do greške pri prijavi. Pokušajte kasnije.'

    context = {
        'error': error,
        'success': success,
        'current_language': current_language,  # Используем куки
    }

    return render(request, 'core/login.html', context)

def custom_logout(request):
    """Свой view для выхода"""
    # Очищаем все сообщения перед выходом
    from django.contrib.messages import get_messages
    storage = get_messages(request)
    for message in storage:
        # Очищаем все сообщения
        pass

    logout(request)
    return redirect('home')

# отладочная функция для проверки подключения к базе данных
def debug_database(request):
    """Диагностика базы данных"""
    debug_info = {
        'database_url': os.environ.get('DATABASE_URL', 'Not set'),
        'database_engine': settings.DATABASES['default']['ENGINE'],
        'database_name': settings.DATABASES['default']['NAME'],
        'water_points_count': 0,
        'grabber_points_count': 0,
    }

    try:
        from apps.map_points.models import WaterPoint, GrabberPoint
        debug_info['water_points_count'] = WaterPoint.objects.count()
        debug_info['grabber_points_count'] = GrabberPoint.objects.count()
        debug_info['database_status'] = 'Connected'
    except Exception as e:
        debug_info['database_status'] = f'Error: {str(e)}'

    return JsonResponse(debug_info)

# отладочная функция для тестовой отправки email
def test_email_view(request):
    try:
        send_mail(
            'Test from Ledeni Breg',
            'This is a test email.',
            'n.v.laguta2023@gmail.com',
            ['n.v.laguta2023@gmail.com'],
            fail_silently=False,
        )
        # send_mail(
        #     '✅ Test Email from Ledeni Breg',
        #     'This is a test email from your Django application on Render.',
        #     settings.DEFAULT_FROM_EMAIL,
        #     [settings.APPLICATION_EMAIL],
        #     fail_silently=False,
        # )
        return JsonResponse({'status': 'Email sent successfully'})
    except Exception as e:
        return JsonResponse({'status': f'Error: {str(e)}'})
