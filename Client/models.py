from django.db import models
from Provider.models import TProductTB,ProviderClientTB,ClientCreditTB,ClientOfferTB,BlockSeatTB

class PNRTB (models.Model):
    ID = models.CharField(max_length=80,primary_key=True)
    Tproduct = models.ForeignKey(TProductTB, on_delete=models.PROTECT, null=False)
    Client = models.ForeignKey(ProviderClientTB, on_delete=models.PROTECT, null=False)
    ClientOffer = models.ForeignKey(ClientOfferTB, on_delete=models.PROTECT, null=False)
    BlockSeat = models.ForeignKey(BlockSeatTB, on_delete=models.PROTECT, null=False)
    Credit = models.ForeignKey(ClientCreditTB, on_delete=models.PROTECT, null=False)
    BookingType = models.IntegerField(null=False)
    Total = models.DecimalField(max_digits=18, decimal_places=2)
    PassenagerNo = models.IntegerField(null=False)
    BookingURL   = models.CharField(max_length=250,null=False)
class PassengerTB (models.Model):
    ID = models.BigAutoField(primary_key=True)
    PNR           =models.ForeignKey(PNRTB, on_delete=models.PROTECT, null=False)
    FirstName = models.CharField(max_length=250, null=False)
    SecondName = models.CharField(max_length=250, null=False)
    PassportNo = models.CharField(max_length=250, null=False)
    PassengerType = models.CharField(max_length=10, null=False)
    Price         = models.DecimalField(max_digits=18,decimal_places=2)
