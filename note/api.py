from requests import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from .models import Note,Album,Track
from .serializers import NoteSerializer,TrackSerializer,AlbumSerializer,MyNotesSerializer,AllDataSerializer
from django.shortcuts import render, get_object_or_404
from django.http import HttpRequest, JsonResponse
from rest_framework import generics
from django.http import HttpRequest, JsonResponse,HttpResponse
from django.contrib.auth.models import User



@api_view(['GET'])
def TestView(request):
    RequestData=request.GET;
    qr=Note.objects.all()
    serializer = MyNotesSerializer(qr,many=True)
    obj1={"City":"NJF",
          "Complex":serializer.data
          }
    AllSerial=AllDataSerializer(obj1,many=True)
    json = JSONRenderer().render(serializer.data)
    # if(RequestData['Token']=='1596321'):
    return HttpResponse(JSONRenderer().render(AllSerial.instance))
    # else:
    #     return HttpResponse(JSONRenderer().render({"Error":"Error"}))



class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = NoteSerializer




class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = AlbumSerializer

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = TrackSerializer




