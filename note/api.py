# from requests import Response
import djoser
from django.shortcuts import redirect
from django.utils.timezone import now
from djoser import utils
from djoser.compat import get_user_email
from djoser.email import PasswordResetEmail
from djoser.views import PasswordResetView, PasswordResetConfirmView
from rest_framework import viewsets, permissions, parsers, status
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer

from Provider.models import ProviderClientTB
from topex.models import UserInfoTB
from .models import *
from .serializers import NoteSerializer,TrackSerializer,LoginUserSerializer,CreateUserSerializer, UserSerializer,AlbumSerializer,MyNotesSerializer,AllDataSerializer
from rest_framework import generics
from django.http import HttpResponse
from knox.models import AuthToken
from rest_framework.response import Response
from djoser.conf import settings

class CustomPasswordResetEmail(PasswordResetEmail):
    template_name = 'email/custom_password_reset.html'
class CustomPasswordReset(PasswordResetView):

    def _action(self, serializer):
        exist = 0
        for user in self.get_users(serializer.data['email']):
            exist=exist+1
            self.send_password_reset_email(user)
        if exist>0:
            Mystatus=status.HTTP_200_OK
        else:
            Mystatus=status.HTTP_404_NOT_FOUND
        return Response({
            "status":Mystatus,

        })

    def send_password_reset_email(self, user):
        context = {'user': user}
        print(user)
        to = [get_user_email(user)]
        CustomPasswordResetEmail(self.request,context).send(to)
class CustomPasswordResetConfirm(PasswordResetConfirmView):
    def _action(self, serializer):
        serializer.user.set_password(serializer.data['new_password'])
        if hasattr(serializer.user, 'last_login'):
            serializer.user.last_login = now()
        serializer.user.save()
        Mystatus = status.HTTP_204_NO_CONTENT
        # return redirect('http://localhost:8000/login')
        return Response({"status":Mystatus,})
class CustomLoginView(djoser.views.TokenCreateView):
    def _action(self, serializer):
        token = utils.login_user(self.request, serializer.user)
        token_serializer_class =settings.SERIALIZERS.token
        if(serializer.user.is_staff):
            content = {
            "user": UserSerializer(serializer.user, context=self.get_serializer_context()).data,
            'token': token_serializer_class(token).data['auth_token'],
            "isConfirmed": serializer.user.is_staff,
            "isSuperuser": serializer.user.is_superuser,
            "isAuthenticated": True,
            "isExist": True,
            "CustomerType": UserInfoTB.objects.filter(User_id=serializer.user.pk).first().user_type if UserInfoTB.objects.filter(
            User_id=serializer.user.pk).count() != 0 else "admin",
            "CompanyNo":UserInfoTB.objects.filter(User__is_staff=True). \
                exclude(User__id__in=ProviderClientTB.objects.
                            filter(Client__Client_id=serializer.user.id).
                            values_list('Provider', flat=True)). \
                            exclude(User=serializer.user).count()

            # "imgeUrl": "{0}{1}{2}{3}".format("https://" if request.is_secure() else "http://", request.get_host(),
            #                              '/media/', UserInfoTB.objects.filter(Address='DXB').first().profile_pic)
        }
        else:
             content={"isConfirmed":False,
                             "isSuperuser":False,
                             "isAuthenticated":False,
                             "isExist": True,
                             "CustomerType":''

                             }
        return Response(content)
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
            "isExist": True,
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
                    "CustomerType": UserInfoTB.objects.filter(User_id=user.pk).first().user_type if UserInfoTB.objects.filter(User_id=user.pk).count()!=0 else "admin",
                    "imgeUrl": "{0}{1}{2}{3}".format("https://" if request.is_secure() else "http://", request.get_host(),'/media/', UserInfoTB.objects.filter(Address='DXB').first().profile_pic)


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
            "CustomerType": UserInfoTB.objects.filter(User_id=self.request.user.pk).first().user_type if UserInfoTB.objects.filter(User_id=self.request.user.pk).count() != 0 else "admin",
            "CompanyNo": UserInfoTB.objects.filter(User__is_staff=True). \
                exclude(User__id__in=ProviderClientTB.objects.
                        filter(Client__Client_id=request.user.id).
                        values_list('Provider', flat=True)). \
                exclude(User=request.user).count()
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


