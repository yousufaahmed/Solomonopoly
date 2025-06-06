# Generated by Django 5.1.6 on 2025-03-23 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_achievement_count_achievement_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='playerachievement',
            name='count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='playerachievement',
            name='tags',
            field=models.ManyToManyField(blank=True, to='myapp.tag'),
        ),
    ]
