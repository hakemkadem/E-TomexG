from requests import Response
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from .models import *
from .serializers import *
from rest_framework import generics
from django.http import HttpResponse, Http404
from knox.models import AuthToken
from rest_framework.response import Response
from rest_framework.views import APIView


class UserActivation(viewsets.ModelViewSet):
    queryset =User.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer




class UserViewSet(viewsets.ModelViewSet):
    # queryset = UserInfoTB.objects.filter(User__is_staff=False)
    queryset = UserInfoTB.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AllUserSerializer

# This class use to add customer when users are activated by admin
# class ClientViewSet(generics.GenericAPIView):
#     serializer_class = ClientSerializer
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         Client = serializer.save()
#         return Response({
#             "status":"success",
#              "user": request.data,
#         })



# This function use to add customer when users are activated by admin
@api_view(['PATCH'])
@permission_classes((IsAuthenticated, ))
def CustomerCreation(request):
    if request.method=='PATCH':
        MyID = request.data['UserID']
        user = User.objects.filter(id=int(MyID)).first()
        CustomerType = UserInfoTB.objects.filter(User_id=int(MyID)).first().user_type
        if(CustomerType=='client'):
            Customer = ClientTB.objects.create(Client=user)
            return Response(ClientSerializer(Customer).data)
        else:
            Customer = ProviderTB.objects.create(Provider=user)
            Customer = ClientTB.objects.create(Client=user)
            return Response(ProviderSerializer (Customer).data)
