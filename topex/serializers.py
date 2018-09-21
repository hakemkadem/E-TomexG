from rest_framework import serializers
from .models import *
from Provider.models import ProviderTB
from topex.models import UserInfoTB
from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','email','is_active','is_staff')

class AllUserSerializer(serializers.ModelSerializer):
    User = UserSerializer()
    class Meta:
        model = UserInfoTB
        fields = ('user_type','Mobile','license','Address','User')

class ClientSerializer(serializers.ModelSerializer):
    # UserID = serializers.CharField()
    class Meta:
        model = ClientTB
        fields = ('Client',)
    # def create(self, validated_data):
    #     MyID=validated_data.pop('UserID')
    #     user =  User.objects.filter(id=int(MyID)).first()
    #     client = ClientTB.objects.create(Client=user)
    #     return client


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProviderTB
        fields = ('Provider',)