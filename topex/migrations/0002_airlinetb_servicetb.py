# Generated by Django 2.0.4 on 2018-08-27 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topex', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AirLineTB',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('AirllinSymbol', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='ServiceTB',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('ServiceName', models.CharField(max_length=250, null=True)),
            ],
        ),
    ]
