# Generated by Django 2.0.4 on 2018-10-09 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Provider', '0002_providerclienttb_confirmationflag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='providerclienttb',
            name='Client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.ClientTB', to_field='Client'),
        ),
        migrations.AlterField(
            model_name='providerclienttb',
            name='Provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.ProviderTB', to_field='Provider'),
        ),
    ]