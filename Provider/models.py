from django.db import models
from topex.models import ClientTB,ProviderTB,DepCountryTB,ArrCountryTB,AirLineTB,ServiceTB

class ProviderClientTB(models.Model):
    ID = models.AutoField(primary_key=True)
    Client = models.ForeignKey(ClientTB,on_delete=models.PROTECT)
    Provider = models.ForeignKey(ProviderTB,on_delete=models.PROTECT)

class HotelTB (models.Model):
    ID = models.AutoField(primary_key=True)
    HotelName=models.CharField(max_length=250,null=False)
    Provider = models.ForeignKey(ProviderTB, on_delete=models.PROTECT)

class TourGroupTB(models.Model):
    ID = models.BigAutoField(primary_key=True)
    DepAirPort = models.ForeignKey(DepCountryTB,on_delete=models.PROTECT,null=False)
    ArrAirPort = models.ForeignKey(ArrCountryTB,on_delete=models.PROTECT,null=False)
    DepDate    = models.DateTimeField(auto_now_add=True,null=False)
    ArrDate    = models.DateTimeField(auto_now_add=True,null=False)
    AirLine    = models.ForeignKey(AirLineTB,on_delete=models.PROTECT,null=False)
    TypeOfAirLine = models.CharField(max_length=250, null=False)
    TimeDep       = models.CharField(max_length=250, null=False)
    TimeArr       = models.CharField(max_length=250, null=False)
    Hotel         = models.ForeignKey(HotelTB, on_delete=models.PROTECT,null=False)
    NoOfSeats     = models.IntegerField(null=False)

class TicketTB(models.Model):
    ID = models.BigAutoField(primary_key=True)
    DepAirPort = models.ForeignKey(DepCountryTB, on_delete=models.PROTECT, null=False)
    ArrAirPort = models.ForeignKey(ArrCountryTB, on_delete=models.PROTECT, null=False)
    DepDate = models.DateTimeField(auto_now_add=True, null=False)
    ArrDate = models.DateTimeField(auto_now_add=True, null=False)
    AirLine = models.ForeignKey(AirLineTB, on_delete=models.PROTECT, null=False)
    TypeOfAirLine = models.CharField(max_length=250, null=False)
    TimeDep = models.CharField(max_length=250, null=False)
    TimeArr = models.CharField(max_length=250, null=False)
    TripType = models.ForeignKey(HotelTB, on_delete=models.PROTECT, null=False)
    NoOfSeats = models.IntegerField(null=False)
    FlightNo  = models.IntegerField(null=False)

class VisaTB(models.Model):
    ID =models.BigAutoField(primary_key=True)
    SubmittingDate = models.DateTimeField(auto_now_add=True, null=False)
    Country        = models.CharField(max_length=150, null=False)
    FlagImageURL   = models.CharField(max_length=250, null=False)
    WaitingDay     = models.IntegerField(null=False)

class HotelPTB (models.Model):
    ID =models.BigAutoField(primary_key=True)

class TourTB (models.Model):
    ID =models.BigAutoField(primary_key=True)

class TProductTB(models.Model):
    ID =models.BigAutoField(primary_key=True)
    Provider = models.ForeignKey(ProviderTB,on_delete=models.PROTECT)
    Created_Date = models.DateTimeField(auto_now_add=True)
    Created_by   = models.CharField(max_length=250,null=False)
    Ticket       =models.ForeignKey(TicketTB, on_delete=models.PROTECT,null=True)
    Visa       =models.ForeignKey(VisaTB, on_delete=models.PROTECT,null=True)
    Hotel       =models.ForeignKey(HotelPTB, on_delete=models.PROTECT,null=True)
    TourGroup     =models.ForeignKey(TourGroupTB, on_delete=models.PROTECT,null=True)
    Tour       =models.ForeignKey(TourTB, on_delete=models.PROTECT,null=True)
    ProductType =models.IntegerField()

class ClientOfferTB(models.Model):
    ID = models.BigAutoField(primary_key=True)
    OfferName = models.CharField(max_length=150,null=False)
    TProduct  = models.ForeignKey(TProductTB, on_delete=models.PROTECT, null=False)
    Create_By = models.CharField( max_length=150, null=False)
    Created_Date =models.DateTimeField(auto_now_add=True)
    Is_Active =models.IntegerField()

class ServicePriceSchemaTB(models.Model):
    ID          = models.BigAutoField(primary_key=True)
    Service     = models.ForeignKey(ServiceTB, on_delete=models.PROTECT,null=False )
    ClientOffer = models.ForeignKey(ClientOfferTB, on_delete=models.PROTECT, null=False)
    ADTPrice    = models.DecimalField(max_digits=80,decimal_places=2,null=False)
    CHDPrice    = models.DecimalField(max_digits=80,decimal_places=2,null=False)
    INFPrice    = models.DecimalField(max_digits=80,decimal_places=2,null=False)

class ClientCreditTB(models.Model):
    ID = models.BigAutoField(primary_key=True)
    Client = models.ForeignKey(ProviderClientTB,on_delete=models.PROTECT,null=False)
    Credit = models.DecimalField(max_digits=18, decimal_places=2,null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    Created_By = models.CharField(max_length=250,null=False)
    Is_Active = models.IntegerField(null=False)

class CreditDetailTB(models.Model):
    ID = models.BigAutoField(primary_key=True)
    Credit = models.ForeignKey(ClientCreditTB, on_delete=models.PROTECT, null=False)
    Amount = models.DecimalField( max_digits=18,decimal_places=2, null=False)
    Description = models.TextField(null=False)

class BlockSeatTB(models.Model):
    ID = models.BigAutoField(primary_key=True)
    client = models.ForeignKey(ProviderClientTB,on_delete=models.PROTECT,null=False)
    ClientOffer = models.ForeignKey(ClientOfferTB,on_delete=models.PROTECT,null=False)
    Credit      = models.ForeignKey(ClientCreditTB, null=False, on_delete=models.PROTECT)
    NoSeat = models.IntegerField(null=False)
    Create_By = models.CharField(max_length=250,null=False)
    Create_At = models.DateTimeField(auto_now_add=True)
    Total = models.DecimalField(max_digits=18, decimal_places=2)
    ADTNo = models.IntegerField(null=False)
    CHDNo = models.IntegerField(null=False)
    INFNo = models.IntegerField(null=False)

class ClientGroupRelationTB(models.Model):
    ID = models.BigAutoField(primary_key=True)
    Client = models.ForeignKey(ProviderClientTB, on_delete=models.PROTECT, null=False)
    ClientOffer = models.ForeignKey(ClientOfferTB,on_delete=models.PROTECT,null=False)
    TProductTB  = models.ForeignKey(TProductTB,on_delete=models.PROTECT,null=False)

