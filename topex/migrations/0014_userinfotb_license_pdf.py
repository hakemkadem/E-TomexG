# Generated by Django 2.0.4 on 2018-09-22 11:00

from django.db import migrations, models
import topex.models


class Migration(migrations.Migration):

    dependencies = [
        ('topex', '0013_auto_20180922_0300'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfotb',
            name='license_pdf',
            field=models.FileField(null=True, upload_to=topex.models.PathAndRename('licenseDoc')),
        ),
    ]
