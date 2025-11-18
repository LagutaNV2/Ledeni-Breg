# Проект LEDENI BREG
Сайт информационного характера о компании ___, занимающейся установкой автоматов по продаже питьевой воды (водоматы) и игровых автоматов с игрушками (хватайки).
Регион - Сербия.

https://ledeni-breg.onrender.com

# Техническая информация


## установка env
PowerShell:
 cd backend

 venv/Scripts/activate

# requirements (venv)
pip freeze > requirements.txt
pip install -r requirements.txt

# запуск сервера в разработке
python manage.py runserver

Приложение: http://127.0.0.1:8000/
Админ: http://127.0.0.1:8000/admin/

## запуск команд
Добавляем тестовые данные
python manage.py migrate
python manage.py seed_points

# сервис поиска в картах
получение бесплатного API ключа (бесплатно 2500 запросов/день):

Зайдите на https://opencagedata.com/ и арегистрируйтесь (бесплатно)

Получите API ключ: Your geocoding API key is: ххх ххх ххх

Добавте переменную OPENCAGE_API_KEY в .env файл и в настройки Render.


# Структура проекта (Backend + Frontend)

Django/
├── backend/            # Django проект
│   ├── ledenibreg/     # Основной пакет проекта
│   │   ├── __init__.py
│   │   ├── settings/
│   │   │   ├── __init__.py
│   │   │   ├── base.py              # Общие настройки
│   │   │   ├── development.py       # DEV настройки
│   │   │   └── production.py        # PROD настройки
│   │   ├── urls.py                  # Главные URL-ы
|   |  ...
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── __init__.py
│   │   ├── core/                    # Главное приложение
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── apps.py
│   │   │   ├── models.py
│   │   │   ├── urls.py
│   │   │   ├── views.py
│   │   │   └── tests.py
|   |   ├── applications/            # Форма для заявки
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── apps.py
|   |   |    ...
|   |   ├── map_points/              # Интерактивная карта с точками установки автоматов
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── apps.py
|   |   |    ...
│   │   ├── water/                   # Приложение "Вода"
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── apps.py
|   |   |    ...
│   │   ├── grabber/                 # Раздел "Хватайка"
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── apps.py
|   |   |    ...
│   │   ├── news/                    # Новости. Не реализовано
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── apps.py
|   |   |    ...
│   │   └── contacts/                # Контакты и формы
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── apps.py
|   |   |    ...
|   |
│   ├── static/
│   │   ├── css/
│   │   │   ├── ...
│   │   │   ├── water-bg.css +
│   │   │   ├── water-bg-mobil.css   +
│   │   │   ├── igracki-bg-desc.css    +
│   │   │   ├── igracki-bg-mobil.css   +
|   |   │   ├── style.css          # Основные стили
│   │   │   ├── water.css              # Стили страницы воды
│   │   │   ├── grabber.css            # Стили страницы игрушек
│   │   │   ├── home.css              #  Стили главной страницы
|   |   |   ...
│   │   │   └── map.css
│   │   ├── js/
│   │   │   ├── main.js           # Основной JS
│   │   │   ├── forms.js          # Обработка форм
│   │   │   ├── burger-menu.js    # Бургер-меню
│   │   │   ├── map-common.js           # Интерактивные карты
|   |   |  ...
|   |   |
│   │   │
│   │   ├── images/
│   │   │   ├── logo.svg             # Логотип "капля"
│   │   │   ├── waves.svg
|   |   |   ├── igracki-desc.svg
|   |   |   ├── igracki-mobil.svg
|   |   |   ├── drop-blu-kontur.png  # кристал для карты
|   |   |   ├── drop-кув-kontur.png  # кристал для карты
│   │   │   ...
|   |   |   ├── automats/
|   |   |   |   ├── automat-blu.png
|   |   |   |   ├── automat-red.png
│   │   │   |   ...
|   |   |   ├── kontent/
|   |   |   |   ├── uputstvo-voda.png
│   │   │   |   ...
│   │   │   └── icons/
│   │   └── fonts/
│   │       └── zalando-sans/ # Шрифт Zalando Sans
|   ...
│   ├── templates/     # HTML шаблоны
│   │   ├── water/
│   │   ├── grabber/
|   |   └── core/
|   |       └── home.html  # main
|   |   └──includes/
|   |       ├── header.html
|   |       └── footer.html
|   |
│   │   ├── base.html
│   │   ├── index.html                  # не используется
│   │   ├── water_background.html
│   │   ...
│   │   └── 404.html
│   ├── media/                        # Загружаемые файлы, пока пусто
|   |
|   ...
│   ├── requirements/     # пусто
│   ├── manage.py
│   └── .env                         # Переменные окружения (не в git)
├── .gitignore
├──  build.sh                        # сборщик для Render
├──  render.yaml                     # сборщик для Render
├──  requirements.txt
...
├── README.md
└── runtime.txt                      # не используется
