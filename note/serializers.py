from rest_framework import serializers
from .models import Note,Album,Track
from Provider.models import ProviderTB
from topex.models import UserInfoTB
from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError


class CreateUserSerializer(serializers.ModelSerializer):
    license = serializers.CharField()
    address = serializers.CharField()
    user_type = serializers.CharField()
    profile_pic = serializers.ImageField()
    license_pdf = serializers.FileField()
    TheEmail = serializers.EmailField()

    def __init__(self, *args, **kwargs):
        self.fields['username'] = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
        self.fields['password'] = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
        self.fields['address'] = serializers.CharField(required=False, allow_null=True,  allow_blank=True)
        self.fields['license'] = serializers.CharField(required=False, allow_null=True, allow_blank=True)
        self.fields['profile_pic'] = serializers.ImageField(required=False, allow_null=True)
        self.fields['license_pdf'] = serializers.FileField(required=False, allow_null=True)
        self.fields['TheEmail'] = serializers.EmailField(required=False, allow_null=True, allow_blank=True)
        return super(CreateUserSerializer, self).__init__(*args, **kwargs)
    def validate(self, data):
        errors = {"test":"test"}
        if  data.get('username')=='':
            errors['username'] = u'هنالك مشكلة في اسم المستخدم لا يمكنك اكمال عملية التسجيل في حال عدم معالجتها'
            raise serializers.ValidationError(errors)

        if  data.get('password') == '':
            errors['password'] = u'هنالك مشكلة في الرمز السري لا يمكنك اكمال عملية التسجيل في حال عدم معالجتها'
            raise serializers.ValidationError(errors)

        if  data.get('address') == '':
            errors['address'] = u'هنالك مشكلة في العنوان لا يمكنك اكمال عملية التسجيل في حال عدم معالجتها'
            raise serializers.ValidationError(errors)

        if  data.get('license') == '':
            errors['license'] = u'هنالك مشكلة في رقم الاجازة لا يمكنك اكمال عملية التسجيل في حال عدم معالجتها'
            raise serializers.ValidationError(errors)

        if  data.get('profile_pic')== None:
            errors['profile_pic'] = u'هنالك مشكلة في ملف شعار الشركة لا يمكنك اكمال عملية التسجيل في حال عدم معالجتها'
            raise serializers.ValidationError(errors)

        if  data.get('license_pdf')==None:
            errors['license_pdf'] = u'هنالك مشكلة في ملف اجازة الشركة لا يمكنك اكمال عملية التسجيل في حال عدم معالجتها'
            raise serializers.ValidationError(errors)

        if data.get('TheEmail') == '':
            errors['TheEmail'] = u'هنالك مشكلة في البريد الالكتروني لا يمكنك اكمال عملية التسجيل في حال عدم معالجتها'
            raise serializers.ValidationError(errors)
        return data
    class Meta:
        model = User
        fields = ('id', 'username','password','is_staff','address','license','user_type','profile_pic','license_pdf','TheEmail')
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        print(validated_data['password'])
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['TheEmail'],
                                        validated_data['password'])
        UserInfoTB.objects.create(User=user,
                                  Address=validated_data['address'],
                                  license=validated_data['license'],
                                  user_type=validated_data['user_type'],
                                  profile_pic=validated_data['profile_pic'],
                                  license_pdf = validated_data['license_pdf'],
                                  TheEmail=validated_data['TheEmail'],
                                  )

        return user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','password','is_superuser','is_staff')
class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("لا يمكن الدخول بهذه المعلومات")
class MyNotesSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        return {
                    "text"  : obj.text,
                    "owner" : obj.owner
        }
class AllDataSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        return {
            "City":obj.City,
            "Complex":obj.Complex
        }
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id','text','owner')

    def create(self, validated_data):
        note = Note.objects.create(**validated_data)
        return note
class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ('order', 'title', 'duration')
class AlbumSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True)
    Moniter =serializers.CharField(max_length=250,default='Ok')
    class Meta:
        model = Album
        fields = ('album_name', 'artist','Moniter', 'tracks')

    def create(self, validated_data):
        tracks_data = validated_data.pop('tracks')
        album = Album.objects.create(**validated_data)
        for track_data in tracks_data:
            Track.objects.create(album=album,title="good news", **track_data)
        return album


