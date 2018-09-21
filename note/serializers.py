from rest_framework import serializers
from .models import Note,Album,Track
from Provider.models import ProviderTB
from topex.models import UserInfoTB
from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate



class CreateUserSerializer(serializers.ModelSerializer):
    license = serializers.CharField()
    address = serializers.CharField()
    user_type = serializers.CharField()
    profile_pic = serializers.ImageField()
    class Meta:
        model = User
        fields = ('id', 'username', 'email','password','is_staff','address','license','user_type','profile_pic')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['email'],
                                        validated_data['password'])
        UserInfoTB.objects.create(User=user,
                                  Address=validated_data['address'],
                                  license=validated_data['license'],
                                  user_type=validated_data['user_type'],
                                  profile_pic=validated_data['profile_pic']
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
        raise serializers.ValidationError("Unable to log in with provided credentials.")
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


