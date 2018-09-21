from django.db import models
from django.contrib.auth.models import User


class UserInfoTB (models.Model):
    ID = models.BigAutoField(primary_key=True)
    User = models.OneToOneField(User, on_delete=models.PROTECT)
    Address = models.CharField(max_length=250,null=False)
    license = models.CharField(max_length=250, null=True)
    user_type = models.CharField(max_length=50, null=True)
    profile_pic = models.ImageField(null=True)
    Mobile    = models.CharField(max_length=20,default='07821070993')

class ProviderTB(models.Model):
    ID = models.AutoField(primary_key=True)
    Provider = models.OneToOneField(User,on_delete=models.PROTECT)


class ClientTB(models.Model):
    ID = models.AutoField(primary_key=True)
    Client=models.OneToOneField(User,on_delete=models.PROTECT)

class DepCountryTB(models.Model):
    ID = models.AutoField(primary_key=True)
    CountrySymbol=models.CharField(max_length=5,null=False)
    CountryName=models.CharField(max_length=250,null=False)
    StateName=models.CharField(max_length=250,null=False)

class ArrCountryTB(models.Model):
    ID = models.AutoField(primary_key=True)
    CountrySymbol=models.CharField(max_length=5,null=False)
    CountryName=models.CharField(max_length=250,null=False)
    StateName=models.CharField(max_length=250,null=False)

class AirLineTB (models.Model):
    ID = models.AutoField(primary_key=True)
    AirllinSymbol = models.CharField(max_length=10, null=False)

class ServiceTB(models.Model):
    ID = models.AutoField(primary_key=True)
    ServiceName = models.CharField(max_length=250, null=True)
