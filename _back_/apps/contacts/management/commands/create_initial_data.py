# Django/backend/apps/contacts/management/commands/create_initial_data.py

from django.core.management.base import BaseCommand
from apps.contacts.models import Contact, PhoneNumber, SocialMedia

class Command(BaseCommand):
    help = 'Create initial contact data'

    def handle(self, *args, **options):
        # Создаем основной контакт
        contact, created = Contact.objects.get_or_create(
            company_name="Kompanija Vendtime d.o.o",
            defaults={
                'legal_address': 'Kragujevac, Srbija',
                'email': 'info@ledenibreg.com',
                'working_hours': 'ponedeljak–subota 8:00–20:00'
            }
        )

        if created:
            # Создаем телефоны
            PhoneNumber.objects.create(
                contact=contact,
                phone_type='main',
                number='+381 067 789-8477',
                description='Основной телефон'
            )
            PhoneNumber.objects.create(
                contact=contact,
                phone_type='viber',
                number='+381 067 789-8477',
                description='Viber'
            )

            # Создаем соцсети
            SocialMedia.objects.create(
                name='Viber',
                url='https://viber.com/ledenibreg',
                icon_class='viber'
            )
            SocialMedia.objects.create(
                name='WhatsApp',
                url='https://wa.me/38112345678',
                icon_class='whatsapp'
            )
            SocialMedia.objects.create(
                name='Telegram',
                url='https://t.me/ledenibreg',
                icon_class='telegram'
            )

            self.stdout.write(
                self.style.SUCCESS('✅ Initial contact data created successfully!')
            )
        else:
            self.stdout.write(
                self.style.WARNING('ℹ️ Contact data already exists')
            )
