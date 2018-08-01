from rest_framework import serializers
from .models import Note,Album,Track
from datetime import datetime
from django.contrib.auth.models import User
# class MyNotesSerializer(serializers.Serializer):
#     text  = serializers.CharField(max_length=200)
#     owner = serializers.CharField(max_length=200)



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


