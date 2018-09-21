from django.urls import include, path
from rest_framework import routers
from .api import *
router = routers.DefaultRouter()
router.register('newuser', UserViewSet)
router.register('useractive', UserActivation)
# router.register('ClientCreation', ClientViewSet)


# router.register('user',UserAPIClass)

urlpatterns = [
    path("", include(router.urls)),
    # path("ClientCreation/", ClientViewSet.as_view()),
    path("CustomerCreation/", CustomerCreation),

]