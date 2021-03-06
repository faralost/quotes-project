# Generated by Django 4.0.3 on 2022-04-01 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=666)),
                ('name', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('rating', models.PositiveSmallIntegerField(default=0)),
                ('status', models.CharField(choices=[('new', 'New'), ('mod', 'Moderated')], default='new', max_length=3)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
