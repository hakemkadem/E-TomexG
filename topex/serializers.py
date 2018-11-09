from rest_framework import serializers
from .models import *
from Provider.models import ProviderTB
from topex.models import UserInfoTB
from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Q
from Provider.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','email','is_active','is_staff')
class AllUserSerializer(serializers.ModelSerializer):
    User = UserSerializer()
    IsSubscribed = serializers.SerializerMethodField()
    IsProvider = serializers.SerializerMethodField()
    IsClient = serializers.SerializerMethodField()
    class Meta:
        model = UserInfoTB
        fields = ('ID','user_type','Mobile','license','Address',
                  'license_pdf','profile_pic','User','IsSubscribed',
                  'IsProvider','IsClient')

    def get_IsSubscribed(self, obj):
        CurrentUserID=self.context['user_id']
        if(ProviderClientTB.objects.filter(Q(Provider_id=obj.User.id),Q(Client_id=CurrentUserID)).count()):
            flag = ProviderClientTB.objects.filter(Q(Provider_id=obj.User.id),Q(Client_id=CurrentUserID)).first().ConfirmationFlag
        else:
            flag="no";
        return flag

    def get_IsProvider(self, obj):
        CurrentUserID = self.context['user_id']
        if (ProviderClientTB.objects.filter(Q(Provider_id=obj.User.id), Q(Client_id=CurrentUserID),Q(ConfirmationFlag=1)).count()):
            flag = True
        else:
            flag = False;
        return flag

    def get_IsClient(self, obj):
        CurrentUserID = self.context['user_id']
        if (ProviderClientTB.objects.filter(Q(Client_id=obj.User.id), Q(Provider_id=CurrentUserID)).count()):
            flag = True
        else:
            flag = False;
        return flag



class RequestedCompSerializer(serializers.ModelSerializer):
    User = UserSerializer()
    loading = serializers.SerializerMethodField()
    class Meta:
        model = UserInfoTB
        fields = ('ID', 'Mobile', 'Address', 'profile_pic', 'User','loading')
    def get_loading(self, obj):
        return False


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


