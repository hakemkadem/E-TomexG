# Generated by Django 2.0.4 on 2018-09-20 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topex', '0009_userinfotb_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfotb',
            name='profile_pic',
            field=models.ImageField(upload_to=''),
        ),
    ]
