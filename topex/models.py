import os

from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4
from django.utils.deconstruct import deconstructible

@deconstructible
class PathAndRename(object):
    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(self.path, filename)

path_and_renameLogo = PathAndRename("Logo")
path_and_renameDoc = PathAndRename("licenseDoc")

class UserInfoTB (models.Model):
    ID = models.BigAutoField(primary_key=True)
    User = models.OneToOneField(User, on_delete=models.PROTECT)
    Address = models.CharField(max_length=250,null=False)
    TheEmail  =models.EmailField(blank=False)
    license = models.CharField(max_length=250, null=True)
    user_type = models.CharField(max_length=50, null=True)
    profile_pic = models.ImageField(upload_to=path_and_renameLogo,null=True)
    license_pdf = models.FileField(upload_to=path_and_renameDoc, null=True)
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
