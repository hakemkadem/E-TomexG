# from requests import Response
from rest_framework import viewsets, permissions, parsers
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer

from topex.models import UserInfoTB
from .models import *
from .serializers import NoteSerializer,TrackSerializer,LoginUserSerializer,CreateUserSerializer, UserSerializer,AlbumSerializer,MyNotesSerializer,AllDataSerializer
from rest_framework import generics
from django.http import HttpResponse
from knox.models import AuthToken
from rest_framework.response import Response


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.FileUploadParser,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "status":"success",
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "isConfirmed": self.request.user.is_staff,
            "isSuperuser": self.request.user.is_superuser,
            "isAuthenticated":False,
            "isExist": True
        })
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        if user.is_staff:
            return Response({
                    "user": UserSerializer(user, context=self.get_serializer_context()).data,
                    "token": AuthToken.objects.create(user),
                    "isConfirmed":user.is_staff,
                    "isSuperuser":user.is_superuser,
                    "isAuthenticated": True,
                    "isExist":True,
                    "CustomerType": UserInfoTB.objects.filter(User_id=user.pk).first().user_type if UserInfoTB.objects.filter(User_id=user.pk).count()!=0 else "admin"


            })
        else:
            return Response({"isConfirmed":False,
                             "isSuperuser":False,
                             "isAuthenticated":False,
                             "isExist": True,
                             "CustomerType":''

                             });

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

    def get(self, request, format=None):
        return Response({
            "user": UserSerializer(self.request.user, context=self.get_serializer_context()).data,
            # "token": AuthToken.objects.create(self.request.user),
            "isConfirmed": self.request.user.is_staff,
            "isSuperuser": self.request.user.is_superuser,
            "isAuthenticated": True,
            "isExist": True,
            "CustomerType": UserInfoTB.objects.filter(User_id=self.request.user.pk).first().user_type if UserInfoTB.objects.filter(User_id=self.request.user.pk).count() != 0 else "admin"

        })


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = NoteSerializer
    def get_queryset(self):
        return self.request.user.notes.all()
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = AlbumSerializer
class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = TrackSerializer

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