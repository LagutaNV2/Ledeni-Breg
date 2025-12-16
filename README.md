# Ledeni Breg — Django Web Project

Добро пожаловать в проект **Ledeni Breg** — веб-сайт для продажи воды и автоматов с использованием Django, PostgreSQL и современного фронтенда.


Сайт информационного характера о компании ___, занимающейся установкой автоматов по продаже питьевой воды (водоматы) и игровых автоматов с игрушками (хватайки).
Регион - Сербия.

https://ledeni-breg.onrender.com

http://127.0.0.1:8000/

http://127.0.0.1:8000/admin/

## Цели сайта
Сайт носит информативный характер для потенциальных клиентов в разрезе видов автоматов («хватайка» (автомат с игрушками)/ «вода» (очистка воды)):
 справка об услуге для конечного пользователя и/или для владельцев бизнеса, желающих установить у себя автомат

## 	Пользовательские сценарии
Конечные пользователи:
 - получение справки об услуге,
 - интерактивная карта с автоматами при наличии доступа.

Владельцы бизнеса:
 - информация о фирме, в т.ч. правовая,
 - форма обратной связи,
 - интерактивная карта с автоматами при наличии доступа.

 Доступ к блоку карт регулируется админом через админку.
 Пользователи будут делиться на три группы: с полным доступом к картам, без доступа,  неавторизованные.
 Предусмотрена возможность отключить систему раздельного доступа через настройку в settings.

## 🛠️ Технологии

- **Backend**: Django 5.x
- **Database**: PostgreSQL
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS (без фреймворков — чистый, адаптивный дизайн)
- **Hosting**: Render.com *(демонстрационный)*
- **Deployment**: `build.sh` + `render.yaml`
- **Fonts**: Zalando Sans (локально)
- **Icons**: SVG + PNG

- **OpenStreetMap + OpenCageData + Leaflet**: интерактивные карты

- Отправление информации на почту через форму заявки: Gmail с использованием App Passwords *(на render не работает)*;


## Количество и примерное содержание страниц сайта

1.	Хедер
 Логотип (голубой кристалл  и название «Ledeni Breg» ,

Сквозное верхнее меню (бургер):
- «О фирме» - переход на страницу с описанием деятельности фирмы, правовая информация, …;
 - «Виды услуг» - дублирование кнопок «вода»/«хватайка»;
- «Наши новости»**- блоки с новостями и ссылками на новость (опционно);
 - «О нас в прессе» (опционно);
 - «Контакты» - контакты, ссылка на форму** – заявка на установку);

   - Переключатель языка: рус, срб (?)

2.	Сквозная нижняя строка (футер)
контакты в виде иконок: Viber, WhatsApp, Telegram, …(?)
и/или @2025 Vendime d.o.o …;

3.	Главная страница:
фон – (см. брендбук с синим логотипом);
кнопки:
две большие горизонтально расположенные кнопки:
синяя «вода» и красная «хватайка»;
текст:
«Pasivna zarada
….Pošaljite Viber poruku или ... ссылка на форму заявки на установку** i dobićete ….»
** требуется сервер (backend)

4.	О фирме
На спокойном фоне размещен текст, который прокручивается вниз при просмотре.
Справка о фирме (миссия и пр. бла-бла),
Правовая информация (юридическое название, адрес и пр…)
…..

5.	 Страница «Вода» (открывается при нажатии на синюю кнопку):
фото автомата и справка;
«интерактивная карта»** - карта Сербии с нанесенными точками автоматов «вода» (голубые кристаллы);
** требуется сервер (backend)

6.	 Страница «Хватайка» (открывается при нажатии на красную кнопку):
фото автомата и справка;
 «интерактивная карта»** - карта Сербии с нанесенными точками автоматов «хватайка» (красные кристаллы);
** требуется сервер (backend)

7.	Страница «Наши новости»** (опционно)
Список новостей - информация промоакциях, о специальных предложениях, о новых установленных автоматах и пр.
Каждая новость в списке: ( фото,  заголовок, дата, начало текста,  ссылка «далее», которая позволяет перейти на страницу «новость»);

 1. 	Страница «Новость»** (опционно)
- фото,   заголовок, дата,  текст полный, ссылка «назад», которая позволяет вернуться на страницу «Наши новости»;
** требуется сервер (backend)

9.	 О нас в прессе (опционно) - Список статей и ссылки на статьи на сайтах источников

10.	 Контакты
Фон – голубые волны
блоки с текстом:
 - юридическое название фирмы: «Kompanija Vendtime d.o.o»,
 - контакты (телефоны, мессенджеры, адрес);
 - текст со ссылкой на форму** – заявка на установку;
** требуется сервер (backend)

11.	 форма заявки на установку**:
Поля для ввода информации:
Выбрать вид автомата из списка («вода», «хватайка»),
количество штук – выбрать число (1-10),
адрес - город, улица, номер строения,
ФИО – текстовое поле,
телефон (с валидацией),
e-mail – поле типа e-mail,
комментарий – текстовое поле
кнопка – «отправить»

при нажатии выводится сообщение на 7 секунд: «Ваша заявка успешно отправлена».
Данная информация будет направлена на электронную почту ….@...
** требуется сервер (backend)

12.  Страница 404
- текст: «ошибка соединения»;
 - кнопка «вернуться на главную страницу»




# Техническая информация
## Выбор Django вместо чистого JavaScript
- Безопасность: Встроенные механизмы защиты от CSRF, XSS и SQL-инъекций.
- Встроенная поддержка ORM: Удобное управление базами данных без необходимости написания сложных SQL-запросов.
- Админ-панель: Автоматически генерируется админка для управления контентом и данными (точки на карте, хранение заявок со статусами и пр.).
- Шаблонизатор: Удобный способ создания HTML-страниц с динамическим содержимым (легко создавать статические и полустатические страницы).
- SEO-оптимизация: Django-шаблоны поддерживают серверную рендеринг, что улучшает индексацию сайта.
- Поддержка форм: Упрощает валидацию данных (например, в форме заявки).

## Выбор  Django + Vanilla JS вместо Django + React:
- Производительность: Отсутствие лишних библиотек (React, TypeScript) уменьшает время загрузки страницы.
- Быстрая разработки: Нет необходимости настраивать сложные инструменты (Webpack, Babel).

## Выбор инструментов создания интерактивных карт
Реализация в проекте: **OpenStreetMap + OpenCageData + Leaflet**.
OpenCageData выполняет геокодирование (текст → координаты), а Leaflet отображает результат на карте.

*OpenStreetMap (OSM) и Google Maps* для небольшого сайта без массового посещения:
 - Если бюджет ограничен и сайт небольшой, OSM — явный победитель;
 - Google Maps проще в интеграции и выглядит более привычно для пользователей, но OSM дает больше свободы и не требует API-ключа;
 - Google Maps проще в использовании, но OSM — гибче и не привязывает к поставщику.
  Вывод - для небольшого сайта в Сербии лучше использовать OpenStreetMap, если:
- бюджет ограничен (или вообще нет бюджета на API-ключи);
- важна независимость от Google;
- нужен контроль над данными;
- не нужна сложная навигация или маршруты.
В 2025 году это зрелый, стабильный и гибкий инструмент, особенно с библиотекой **Leaflet**.

## сервис поиска в картах
получение бесплатного API ключа (бесплатно 2500 запросов/день):
https://opencagedata.com/ (бесплатная регистрация);

Получение API ключа: Your geocoding API key is: ххх ххх ххх;

Добавление переменной OPENCAGE_API_KEY в .env файл и в настройки Render.

## Сравнение реализации функциии поиска: OpenStreetMap (с использованием Leaflet или Mapbox) и Google Maps:

**OpenStreetMap + Leaflet**:
- Бесплатно
- Нет лимитов по запросам
- Необходимо настроить собственный тайл-сервер или использовать сторонний (например, Maptiler)
- Поиск реализуется через Nominatim или другие геокодеры
- Требует больше времени на настройку

**OpenStreetMap + Mapbox**:
- Бесплатно до 50,000 загрузок карты и 100,000 запросов к геокодеру/месяц
- Профессиональный дизайн карт
- Простая интеграция
- После превышения лимита - $5 за каждые 1,000 дополнительных запросов

**Google Maps**:
- Бесплатно до $200/месяц (примерно 28,000 запросов)
- $7 за каждые 1,000 запросов после лимита
- Очень простая интеграция
- Встроенная мощная функция поиска Places API
- Готовый профессиональный вид

Критерии выбора для небольшого сайта:
- бюджет ограничен - OpenStreetMap + Mapbox (бесплатный тариф достаточно щедрый)
- важна простота внедрения - Google Maps (платный, но предсказуемый)
- максимальная гибкость - OpenStreetMap + Leaflet (требует больше работы)

## хостинг
  демонстрационный - Render: альтернатива Heroku с бесплатным тарифом для статических сайтов и Django-приложений.

  рабочий -  VPS  IP 5.188.118.217

## 🗂️ Структура проекта
```

Ledeni Breg/            # Django проект
  ├── ledenibreg/     # Основной пакет проекта
  │   ├── __init__.py
  │   ├── settings/
  │   │   ├── __init__.py
  │   │   ├── base.py              # Общие настройки
  │   │   ├── development.py       # DEV настройки
  │   │   └── production.py        # PROD настройки Render (демо) (для  VPS см. далее уточнение)
  |   |
  │   ├── urls.py                  # Главные URL-ы
  │   ├── asgi.py
  │   └── wsgi.py
  ├── apps/
  │   ├── __init__.py
  │   ├── core/                    # Главное приложение
  │   │   ├── __init__.py
  │   │   ├── admin.py
  │   │   ├── apps.py
  │   │   ├── context-processors.py  # для двуязычности сайта
  │   │   ├── models.py              # пусто
  │   │   ├── urls.py
  │   │   ├── views.py
  │   │   └── tests.py
  |   ├── applications/            # Форма для заявки
  │   │   ├── __init__.py
  │   │   ├── admin.py
  │   │   ├── apps.py
  │   │   ├── models.py
  │   │   ├── urls.py
  │   │   ├── views.py
  |   |    ...
  |   ├── map_points/              # Интерактивная карта с точками установки автоматов
  │   │   ├── __init__.py
  │   │   ├── admin.py
  │   │   ├── apps.py
  │   │   ├── models.py
  |   |    ...
  |   |    ...
  │   ├── news/                    # Новости. Не реализовано
  │   │   ├── __init__.py
  │   │   ├── admin.py
  │   │   ├── apps.py
  │   │   ├── models.py
  |   |    ...
  │   └── contacts/                # Контакты и формы
  │   │   ├── __init__.py
  │   │   ├── admin.py
  │   │   ├── apps.py
  │   │   ├── models.py
  |   |    ...
  |
  ├── media/                        # Загружаемые файлы
  │    ├── logo.svg
  |    |    ...
  ├── static/
  │   ├── css/
  │   │   ├── about.css
  │   │   ├── igracki-bg.css
  │   │   ├── igracki-bg-mobil.css
  |   │   ├── style.css              # Основные стили
  │   │   ├── map.css
  │   │   ├── grabber.css            # Стили страницы игрушек
  │   │   ├── home.css               #  Стили главной страницы
  |   |   ...
  |   |   ├── water-bg.css
  │   │   ├── water-bg-mobil.css
  │   │   └── water.css              # Стили страницы воды
  │   ├── js/
  │   │   ├── main.js                 # Основной JS
  │   │   ├── burger-menu.js          # Бургер-меню
  │   │   ├── map-common.js           # Интерактивные карты
  │   │   ├── grabber-map.js
  │   │   ├── water-map.js
  |   |  ...
  │   │
  │   ├── images/
  │   │   ├── logo.svg             # Логотип "капля"
  │   │   ├── waves.svg
  |   |   ├── igracki-desc.svg
  |   |   ├── igracki-mobil.svg
  |   |   ├── drop-blu-kontur.png  # кристал для карты
  |   |   ├── drop-кув-kontur.png  # кристал для карты
  │   │   ...
  |   |   ├── automats/
  |   |   |   ├── automat-blu.png
  |   |   |   ├── automat-red.png
  │   │   |   ...
  |   |   ├── kontent/
  |   |   |   ├── uputstvo-voda.png
  │   │   |   ...
  │   │   └── icons/ # не используется
  │   └── fonts/    # не подключено
  │       └── zalando-sans/ # Шрифт Zalando Sans
  ...
  ├── templates/     # HTML шаблоны
  │   ├── applocations/
  |   |    ├── application.html    # form
  |   |    └── email_template.html # стили письма e-mail
  │   ├── water/
  │   ├── grabber/
  |   └── core/
  │       |   ...
  |       ├── about.html
  |       ├── contacts.html
  |       └── home.html  # main
  |   └──includes/
  |       ├── header.html
  |       └── footer.html
  |
  │   ├── base.html
  │   ├── index.html                  # не используется
  │   ├── water_background.html
  │   ...
  │   └── 404.html
  |
  ...
  ├── manage.py
  ├── .env                         # Переменные окружения (не в git)
  ├── .gitignore
  ├── build.sh                        # сборщик для Render
  ├── render.yaml                     # сборщик для Render
  ├── create_admin.py                 # для Render
  |
  ├── gunicorn_config.py              # настройки VPS
  ├── create_admin.py
 ...
  ├── requirements.txt                # зависимости env
...
  └── README.md

```


> 💡 **Примечание**: Все пути, начинающиеся с `...`, означают, что в папке есть дополнительные файлы, но не указаны для краткости.
> Все статические файлы и шаблоны организованы по приложениям для удобства поддержки.

---

## 🚀 Режимы работы
```
| Режим                 | Переменная `DEBUG` | Настройки                   | Используется                   |
|-----------------------|--------------------|-----------------------------|--------------------------------|
| **Разработка**        | `DEBUG=True`       | `settings/development.py`   | Локальный сервер (`runserver`) |
| **Demo - Продакшен**  | `DEBUG=False`      | `settings/production.py`    | Render.com                     |
| **Продакшен**         | `DEBUG=False`      | `settings/production.py`    | 5.188.118.217 -p 64022         |
```

> ✅ В `wsgi.py` автоматически выбирается нужный файл настроек по значению `DEBUG`.

---


## 🔐 Безопасность

- Секретные данные (`SECRET_KEY`, `DATABASE_URL`, `ADMIN_PASSWORD`) хранятся в **переменных окружения**.
- `.env`
- На Render — переменные задаются через Dashboard.
- PPS - SSL-сертификаты, изоляция переменных окруженияю
---

## 📦 Установка (локально)

   Клонируйте репозиторий:
   ```bash
   git clone https://github.com/ваш-пользователь/ledeni-breg.git
   cd Django/backend
   ```

# Прочая вспомогательная информация

## установка env
```
PowerShell:
 cd backend
 venv/Scripts/activate
```


# requirements (venv)
pip freeze > requirements.txt

pip install -r requirements.txt

# запуск сервера в разработке
python manage.py runserver

Приложение: http://127.0.0.1:8000/
Админ: http://127.0.0.1:8000/admin/

ctr + shift + delete - очитска кеша в мозиле


## GIT
### push
git add .

git commit -a -m "update settigs v..."

git push


### Клонирование проекта
cd /var/www/ledenibreg

git clone https://github.com/LagutaNV2/Ledeni-Breg.git .



## запуск команд в разработке
```
Добавляем тестовые данные

python manage.py migrate

python manage.py seed_points
```

#  VPS
## Команды запуска приложения
win + R wsl / Git Bush

### вход и запуск служб
```
ssh nvlaguta2023@5.188.118.217 -p 64022
cd LedeniBreg
source venv/bin/activate

sudo systemctl daemon-reload

sudo systemctl start gunicorn
sudo systemctl enable gunicorn
sudo systemctl status gunicorn

sudo nginx -t
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl restart nginx
sudo systemctl status nginx
```
### Перезапуск служб:
```
 пересбор статики:
 rm -rf staticfiles/

 python manage.py collectstatic --clear --noinput --settings=ledenibreg.settings.production

 or

 python manage.py collectstatic --noinput

 sudo systemctl daemon-reload
 sudo systemctl restart gunicorn
 sudo systemctl restart nginx

 проверка:
 sudo systemctl status gunicorn
 sudo systemctl status nginx
 journalctl -u gunicorn
 sudo tail -f /var/log/nginx/error.log
 tail -f debug.log

http://5.188.118.217
```
## настройка переменных окружения (!!!!!)
### Содержимое `.env`:
```
DEBUG=False
SECRET_KEY=ваш-очень-сложный-секретный-ключ
ALLOWED_HOSTS=5.188.118.217,ledenibreg.rs,www.ledenibreg.rs,localhost,127.0.0.1

DJANGO_SETTINGS_MODULE=ledenibreg.settings.production

# Доступ к карте только для авторизованных пользователей ( True - режим ограничения включен)
MAP_ACCESS_REQUIRED = True

# База данных
DB_NAME=ledenibreg
DB_USER=ledenibreg_user
DB_PASSWORD=ваш_пароль_от_базы
DB_HOST=localhost
DB_PORT=5432

ADMIN_EMAIL=n.v.laguta2023@gmail.com
ADMIN_PASSWORD=...
ADMIN_USERNAME=ledenibreg_prod_admin

# Email настройки
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=n.v.laguta2023@gmail.com
EMAIL_HOST_PASSWORD=ваш-пароль-приложения-gmail
DEFAULT_FROM_EMAIL=n.v.laguta2023@gmail.com
APPLICATION_EMAIL=n.v.laguta2023@gmail.com

# OpenCage API
OPENCAGE_API_KEY=49ccc4bbc07e45788dc79eb85de14eb5

```


### nvlaguta2023@lb:~/LedeniBreg/ledenibreg/settings$ cat production.py
```
from .base import *
import os
from decouple import config
import dj_database_url

DEBUG = False

SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-secret-key-for-debug-only')

ALLOWED_HOSTS_STR = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1')
if isinstance(ALLOWED_HOSTS_STR, str):
    ALLOWED_HOSTS = [host.strip() for host in ALLOWED_HOSTS_STR.split(',') if host.strip()]
else:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Для корректного определения протокола
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# База данных
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'ledenibreg'),
        'USER': os.environ.get('DB_USER', 'name_user...'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'password...'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}


# E=mail settings
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.environ.get('EMAIL_HOST', '...')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', ...))
EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS', 'True') == 'True'
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', '')
APPLICATION_EMAIL = os.environ.get('APPLICATION_EMAIL', '')

# Security settings
SECURE_SSL_REDIRECT = False     # for change for SSL
SESSION_COOKIE_SECURE = False     # for change for SSL
CSRF_COOKIE_SECURE = False     # for change for SSL

# for change for SSL:
#SECURE_HSTS_SECONDS = 31536000
#SECURE_HSTS_INCLUDE_SUBDOMAINS = True
#SECURE_HSTS_PRELOAD = True

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True

# Для кастомных обработчиков ошибок
CSRF_TRUSTED_ORIGINS = [
    'https://5.188.118.217',
    'https://ledenibreg.rs',
    'https://www.ledenibreg.rs',
]

# Добавляем обработчики ошибок
handler404 = 'apps.core.views.custom_404'
handler500 = 'apps.core.views.custom_500'

# WhiteNoise configuration
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Улучшенные настройки сжатия
COMPRESS_ENABLED = True
COMPRESS_OFFLINE = True

# Увеличить таймауты
GUNICORN_TIMEOUT = 120

# Кэширование в памяти
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}

# Логирование
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
        'apps.applications': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}

```
## Gunicorn настройки
### sudo cat /etc/systemd/system/gunicorn.service
```
[Unit]
Description=Gunicorn daemon for Ledeni Breg
After=network.target

[Service]
User=nvlaguta2023
Group=nvlaguta2023
WorkingDirectory=/home/nvlaguta2023/LedeniBreg
Environment=PATH=/home/nvlaguta2023/LedeniBreg/venv/bin
EnvironmentFile=/home/nvlaguta2023/LedeniBreg/.env
ExecStart=/home/nvlaguta2023/LedeniBreg/venv/bin/gunicorn --bind unix:/tmp/gunicorn_ledenibreg.sock --w>
ExecReload=/bin/kill -s HUP $MAINPID
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
###  cat gunicorn_config.py
```
bind = 'unix:/tmp/gunicorn_ledenibreg.sock'
workers = 3
worker_class = 'sync'
worker_connections = 1000
timeout = 120
max_requests = 1000
max_requests_jitter = 50

# Логирование
accesslog = '/var/log/gunicorn/access.log'
errorlog = '/var/log/gunicorn/error.log'
loglevel = 'info'

# Безопасность
raw_env = [
    'DJANGO_SETTINGS_MODULE=ledenibreg.settings.production',
]
```
###  Запускаем службу
sudo systemctl start ledenibreg
sudo systemctl enable ledenibreg

## NGNIX настройки
### sudo nano /etc/nginx/sites-available/ledenibreg
```

Содержимое конфига nginx:
# HTTP redirect to HTTPS
server {
    listen 80;
    server_name 5.188.118.217;
    # return 301 https://$server_name$request_uri;
    client_max_body_size 10M;

    # Security headers (будут полезны и для HTTP)
#    add_header X-Frame-Options "SAMEORIGIN" always;
#    add_header X-Content-Type-Options "nosniff" always;
#    add_header X-XSS-Protection "1; mode=block" always;
#    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Статические файлы
    location /static/ {
        alias /home/nvlaguta2023/LedeniBreg/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Медиа файлы
    location /media/ {
        alias /home/nvlaguta2023/LedeniBreg/media/;
        expires 1d;
        add_header Cache-Control "public";
        access_log off;
    }

    # Основное приложение
    location / {
        proxy_pass http://unix:/tmp/gunicorn_ledenibreg.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $server_name;

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
# Запрет доступа к скрытым файлам
#    location ~ /\. {
#        deny all;
#        access_log off;
#        log_not_found off;
#    }

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}

# HTTPS server
#server {
#    listen 443 ssl http2;
#    server_name 5.188.118.217;

    # SSL configuration  ПРОВЕРИТЬ НАЛИЧИЕ!!!
#    ssl_certificate /etc/nginx/ssl/ledenibreg.crt;
#    ssl_certificate_key /etc/nginx/ssl/ledenibreg.key;

    # Modern SSL configuration
#    ssl_protocols TLSv1.2 TLSv1.3;
#    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
#    ssl_prefer_server_ciphers off;
#    ssl_session_cache shared:SSL:10m;
#    ssl_session_timeout 1d;

#    client_max_body_size 10M;

    # Security headers
#    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
#    add_header X-Frame-Options "SAMEORIGIN" always;
#    add_header X-Content-Type-Options "nosniff" always;
#    add_header X-XSS-Protection "1; mode=block" always;
#    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Статические файлы
#    location /static/ {
#        alias /home/nvlaguta2023/LedeniBreg/staticfiles/;
#        expires 1y;
#        add_header Cache-Control "public, immutable";
#        access_log off;
#    }

    # Медиа файлы
#    location /media/ {
#        alias /home/nvlaguta2023/LedeniBreg/media/;
#        expires 1d;
#        add_header Cache-Control "public";
#        access_log off;
#    }

    # Основное приложение
#    location / {
#        proxy_pass http://unix:/tmp/gunicorn_ledenibreg.sock;
#        proxy_set_header Host $host;
#        proxy_set_header X-Real-IP $remote_addr;
#        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#        proxy_set_header X-Forwarded-Proto $scheme;
#        proxy_set_header X-Forwarded-Host $server_name;

#        proxy_connect_timeout 60s;
#        proxy_send_timeout 60s;
#        proxy_read_timeout 60s;

        # WebSocket support (если нужно)
#        proxy_http_version 1.1;
#        proxy_set_header Upgrade $http_upgrade;
#        proxy_set_header Connection "upgrade";
#    }

    # Запрет доступа к скрытым файлам
#    location ~ /\. {
#        deny all;
#        access_log off;
#        log_not_found off;
#    }

    # Favicon и robots.txt
#    location = /favicon.ico {
#        alias /home/nvlaguta2023/LedeniBreg/staticfiles/images/favicon.ico;
#        access_log off;
#        log_not_found off;
#    }
#    location = /robots.txt {
#        alias /home/nvlaguta2023/LedeniBreg/staticfiles/robots.txt;
#        access_log off;
#        log_not_found off;
#    }
#}

```
### Активируем сайт
```
sudo ln -s /etc/nginx/sites-available/ledenibreg /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Если вы хотите полностью удалить старый файл и создать новый:
```
sudo rm /var/log/gunicorn/error.log
sudo rm /var/log/nginx/error.log
sudo touch /var/log/gunicorn/error.log
sudo touch /var/log/nginx/error.log
```
