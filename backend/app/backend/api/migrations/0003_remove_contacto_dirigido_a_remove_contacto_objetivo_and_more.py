# Generated by Django 5.2.3 on 2025-06-29 15:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_proyectos_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contacto',
            name='dirigido_a',
        ),
        migrations.RemoveField(
            model_name='contacto',
            name='objetivo',
        ),
        migrations.RemoveField(
            model_name='contacto',
            name='tipo',
        ),
    ]
