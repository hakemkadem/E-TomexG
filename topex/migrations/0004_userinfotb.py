# Generated by Django 2.0.4 on 2018-09-04 06:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('topex', '0003_providertb_license'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfoTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('Address', models.CharField(max_length=250)),
                ('license', models.CharField(max_length=250, null=True)),
                ('UserID', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
