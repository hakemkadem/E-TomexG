from requests import Response
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from .models import *
from Provider.models import *
from .serializers import *
from django.db import transaction
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from itertools import chain


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 5
class UserActivation(viewsets.ModelViewSet):
    queryset =User.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer
class UserViewSet(viewsets.ModelViewSet):
    # queryset = UserInfoTB.objects.filter(User__is_staff=False)
    queryset = UserInfoTB.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AllUserSerializer

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}
class RegisteredCustomerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserInfoTB.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AllUserSerializer
    pagination_class = StandardResultsSetPagination
    def get_serializer_context(self):
        return {'user_id': self.request.user.id}
    def get_queryset(self):
        QT=self.request.query_params['QT'];
        CurrentUser = self.request.user;
        qSearch=self.request.query_params['qSearch'];

        #return UserInfoTB.objects.filter(User__is_staff=True).\
         #   exclude(User__id__in=ProviderClientTB.objects.
          #          filter(Q(ConfirmationFlag=1),
           #                Q(Client__Client_id=CurrentUser.id)).
            #        values_list('Provider', flat=True)).\
           # exclude(User=CurrentUser).order_by('ID');
        if  QT=="shared":
        # all only confirm companies yet
            qs = UserInfoTB.objects.filter(User__is_staff=True).\
                filter(User__id__in=ProviderClientTB.objects.
                     filter(Q(ConfirmationFlag=1),Q(Client_id=CurrentUser.id)).
                   values_list('Provider', flat=True)).\
            exclude(User=CurrentUser).order_by('ID');


            qs1= UserInfoTB.objects.filter(User__is_staff=True). \
                filter(User__id__in=ProviderClientTB.objects.
                   filter(Q(ConfirmationFlag=1), Q(Provider_id=CurrentUser.id)).
                   values_list('Client', flat=True)). \
            exclude(User=CurrentUser).order_by('ID');

            result_list = list(chain(qs, qs1))
            list_set = set(result_list)
            unique_list = (list(list_set))
            return unique_list

        elif QT=="wait":
        #all only not confirm companies yet
            qs = UserInfoTB.objects.filter(User__is_staff=True).\
                filter(User__id__in=ProviderClientTB.objects.
                     filter(Q(ConfirmationFlag=0),
                           Q(Client__Client_id=CurrentUser.id)).
                   values_list('Provider', flat=True)).\
            exclude(User=CurrentUser).order_by('ID');

            # if (qSearch!="all"):
            #     qs=qs.filter(User__username__contains=qSearch)
            return qs;

        elif QT=="new":
        # only not shared companies (new)
            qs = UserInfoTB.objects.filter(User__is_staff=True).\
              exclude(User__id__in=ProviderClientTB.objects.
                     filter(Q(Client__Client_id=CurrentUser.id)).
                   values_list('Provider', flat=True)).\
            exclude(User=CurrentUser).order_by('ID');

            # if(qSearch!="all"):
            #     qs=qs.filter(User__username__contains=qSearch)

            return qs

        #all company exist in system
        else:
            if(qSearch=="all"):
                return UserInfoTB.objects.filter(User__is_staff=True).\
                    exclude(User=CurrentUser).order_by('ID');
            else:
                return UserInfoTB.objects.filter(User__username__contains=qSearch).filter(User__is_staff=True).\
                    exclude(User=CurrentUser).order_by('ID');

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
            return Response(ProviderSerializer(Customer).data)

#This function used to create the relationship between provider and client
@api_view(['POST'],['GET'])
@permission_classes((IsAuthenticated,))
def CompanySubscription(request):
    if(request.method=="POST"):
        Provider= ProviderTB.objects.filter(Provider_id=request.data['ProviderID']).first();
        Client = ClientTB.objects.filter(Client_id=request.user.id).first();
        ProviderClientTB.objects.create(Provider=Provider,Client=Client);
        ProviderInfo = UserInfoTB.objects.filter(User_id=request.data['ProviderID']).first();
    return Response(AllUserSerializer(ProviderInfo, context={'user_id': request.user.id}).data)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def RequestedSharedComp(request):
    if(request.method=='GET'):
        user = request.user;
        qs = UserInfoTB.objects.filter(User__id__in=ProviderClientTB.objects.
                                       filter(Q(ConfirmationFlag=0),Q(Provider_id=user.id)).
                                       values_list('Client_id', flat=True))

        return Response(RequestedCompSerializer(qs, many=True).data)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def CountRequestedSharedComp(request):
    if(request.method=='GET'):
        user = request.user;
        qs = UserInfoTB.objects.filter(User__id__in=ProviderClientTB.objects.
                                       filter(Q(ConfirmationFlag=0),Q(Provider_id=user.id)).
                                       values_list('Client_id', flat=True)).count()

        return Response(qs)


@api_view(['PATCH'])
@permission_classes((IsAuthenticated,))
def ConfirmRequestedSharedComp(request):
    if(request.method=='PATCH'):
        user = request.user;
        UpdatedQs = ProviderClientTB.objects.filter(Q(Provider_id=user.id),Q(Client_id=request.data['ClientID'])).first();
        UpdatedQs.ConfirmationFlag=1;
        UpdatedQs.save();

        qs = UserInfoTB.objects.filter(User__id__in=ProviderClientTB.objects.
                                       filter(Q(ConfirmationFlag=0),Q(Provider_id=user.id)).
                                       values_list('Client_id', flat=True))

        return Response(RequestedCompSerializer(qs, many=True).data)


# @api_view(['GET'])
# def TransTest(request):
#     try:
#         with transaction.atomic():
#             DepCountryTB.objects.create(CountrySymbol="IQ", CountryName='Iraq', StateName='NJF')
#             ProviderClientTB.objects.create(Client_id=122, ConfirmationFlag=0, Provider_id=105)
#
#     except Exception as e:
#
#         return Response({"exception"})




