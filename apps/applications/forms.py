# apps/applications/forms.py

from django import forms
from .models import Application

class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = [
            'machine_type', 'quantity', 'city', 'street', 'building',
            'full_name', 'phone', 'email', 'comment'
        ]
        widgets = {
            'machine_type': forms.Select(attrs={
                'class': 'form-control',
                'required': 'required'
            }),
            'quantity': forms.Select(attrs={
                'class': 'form-control',
                'required': 'required'
            }),
            'city': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Unesite grad',
                'required': 'required'
            }),
            'street': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Unesite ulicu',
                'required': 'required'
            }),
            'building': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Broj zgrade',
                'required': 'required'
            }),
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Vaše puno ime',
                'required': 'required'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '+381...',
                'required': 'required'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'vaš@email.com',
                'required': 'required'
            }),
            'comment': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Dodatne informacije ili želje...',
                'rows': 4
            }),
        }

    def clean_phone(self):
        phone = self.cleaned_data['phone']
        # Простая валидация телефона
        if not any(char.isdigit() for char in phone):
            raise forms.ValidationError("Unesite ispravan broj telefona")
        return phone

    