# Generated by Django 5.1.6 on 2025-03-24 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_player_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='picture',
            field=models.CharField(default='default.png', max_length=1000),
        ),
        migrations.AlterField(
            model_name='achievement',
            name='logo',
            field=models.CharField(default='default.png', max_length=1000),
        ),
    ]
