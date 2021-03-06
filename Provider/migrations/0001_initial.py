# Generated by Django 2.0.4 on 2018-08-27 06:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('topex', '0002_airlinetb_servicetb'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlockSeatTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('NoSeat', models.IntegerField()),
                ('Create_By', models.CharField(max_length=250)),
                ('Create_At', models.DateTimeField(auto_now_add=True)),
                ('Total', models.DecimalField(decimal_places=2, max_digits=18)),
                ('ADTNo', models.IntegerField()),
                ('CHDNo', models.IntegerField()),
                ('INFNo', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ClientCreditTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('Credit', models.DecimalField(decimal_places=2, max_digits=18)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('Created_By', models.CharField(max_length=250)),
                ('Is_Active', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ClientGroupRelationTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='ClientOfferTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('OfferName', models.CharField(max_length=150)),
                ('Create_By', models.CharField(max_length=150)),
                ('Created_Date', models.DateTimeField(auto_now_add=True)),
                ('Is_Active', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='CreditDetailTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('Amount', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Description', models.TextField()),
                ('Credit', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.ClientCreditTB')),
            ],
        ),
        migrations.CreateModel(
            name='HotelPTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='HotelTB',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('HotelName', models.CharField(max_length=250)),
                ('Provider', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.ProviderTB')),
            ],
        ),
        migrations.CreateModel(
            name='ProviderClientTB',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('Client', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.ClientTB')),
                ('Provider', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.ProviderTB')),
            ],
        ),
        migrations.CreateModel(
            name='ServicePriceSchemaTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('ADTPrice', models.DecimalField(decimal_places=2, max_digits=80)),
                ('CHDPrice', models.DecimalField(decimal_places=2, max_digits=80)),
                ('INFPrice', models.DecimalField(decimal_places=2, max_digits=80)),
                ('ClientOffer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.ClientOfferTB')),
                ('Service', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.ServiceTB')),
            ],
        ),
        migrations.CreateModel(
            name='TicketTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('DepDate', models.DateTimeField(auto_now_add=True)),
                ('ArrDate', models.DateTimeField(auto_now_add=True)),
                ('TypeOfAirLine', models.CharField(max_length=250)),
                ('TimeDep', models.CharField(max_length=250)),
                ('TimeArr', models.CharField(max_length=250)),
                ('NoOfSeats', models.IntegerField()),
                ('FlightNo', models.IntegerField()),
                ('AirLine', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.AirLineTB')),
                ('ArrAirPort', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.ArrCountryTB')),
                ('DepAirPort', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.DepCountryTB')),
                ('TripType', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.HotelTB')),
            ],
        ),
        migrations.CreateModel(
            name='TourGroupTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('DepDate', models.DateTimeField(auto_now_add=True)),
                ('ArrDate', models.DateTimeField(auto_now_add=True)),
                ('TypeOfAirLine', models.CharField(max_length=250)),
                ('TimeDep', models.CharField(max_length=250)),
                ('TimeArr', models.CharField(max_length=250)),
                ('NoOfSeats', models.IntegerField()),
                ('AirLine', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.AirLineTB')),
                ('ArrAirPort', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.ArrCountryTB')),
                ('DepAirPort', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.DepCountryTB')),
                ('Hotel', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.HotelTB')),
            ],
        ),
        migrations.CreateModel(
            name='TourTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='TProductTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('Created_Date', models.DateTimeField(auto_now_add=True)),
                ('Created_by', models.CharField(max_length=250)),
                ('ProductType', models.IntegerField()),
                ('Hotel', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='Provider.HotelPTB')),
                ('Provider', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='topex.ProviderTB')),
                ('Ticket', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='Provider.TicketTB')),
                ('Tour', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='Provider.TourTB')),
                ('TourGroup', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='Provider.TourGroupTB')),
            ],
        ),
        migrations.CreateModel(
            name='VisaTB',
            fields=[
                ('ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('SubmittingDate', models.DateTimeField(auto_now_add=True)),
                ('Country', models.CharField(max_length=150)),
                ('FlagImageURL', models.CharField(max_length=250)),
                ('WaitingDay', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='tproducttb',
            name='Visa',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='Provider.VisaTB'),
        ),
        migrations.AddField(
            model_name='clientoffertb',
            name='TProduct',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.TProductTB'),
        ),
        migrations.AddField(
            model_name='clientgrouprelationtb',
            name='Client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.ProviderClientTB'),
        ),
        migrations.AddField(
            model_name='clientgrouprelationtb',
            name='ClientOffer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.ClientOfferTB'),
        ),
        migrations.AddField(
            model_name='clientgrouprelationtb',
            name='TProductTB',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.TProductTB'),
        ),
        migrations.AddField(
            model_name='clientcredittb',
            name='Client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.ProviderClientTB'),
        ),
        migrations.AddField(
            model_name='blockseattb',
            name='ClientOffer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.ClientOfferTB'),
        ),
        migrations.AddField(
            model_name='blockseattb',
            name='Credit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.ClientCreditTB'),
        ),
        migrations.AddField(
            model_name='blockseattb',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Provider.ProviderClientTB'),
        ),
    ]
