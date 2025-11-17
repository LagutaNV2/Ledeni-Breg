# apps/contacts/admin.py

from django.contrib import admin
from .models import Contact, SocialMedia, PhoneNumber

class PhoneNumberInline(admin.TabularInline):
    model = PhoneNumber
    extra = 3
    fields = ['phone_type', 'number', 'description']

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'email', 'get_phones']
    inlines = [PhoneNumberInline]
    fieldsets = [
        ('Основная информация', {
            'fields': ['company_name', 'legal_address', 'email', 'working_hours']
        }),
    ]

    def get_phones(self, obj):
        return ", ".join([phone.number for phone in obj.phones.all()])
    get_phones.short_description = 'Телефоны'

@admin.register(SocialMedia)
class SocialMediaAdmin(admin.ModelAdmin):
    list_display = ['name', 'url', 'icon_class']
    list_editable = ['url', 'icon_class']


@admin.register(PhoneNumber)
class PhoneNumberAdmin(admin.ModelAdmin):
    list_display = ['contact', 'phone_type', 'number', 'description']
    list_filter = ['phone_type', 'contact']
    search_fields = ['number', 'contact__company_name']
    list_editable = ['number', 'description']
