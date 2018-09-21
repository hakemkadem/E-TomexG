from django.urls import include, path
from rest_framework import routers
from .api import NoteViewSet,AlbumViewSet,TrackViewSet,RegistrationAPI,LoginAPI,UserAPI
router = routers.DefaultRouter()
router.register('album', AlbumViewSet)
router.register('note', NoteViewSet, 'note')
router.register('track',TrackViewSet)
# router.register('user',UserAPIClass)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/register/", RegistrationAPI.as_view()),
    path("auth/auth_login/", LoginAPI.as_view()),
    path("auth/user/", UserAPI.as_view()),
]