# Generated by Django 2.0.4 on 2018-09-20 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topex', '0008_userinfotb_mobile'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfotb',
            name='profile_pic',
            field=models.ImageField(null=True, upload_to='media'),
        ),
    ]
