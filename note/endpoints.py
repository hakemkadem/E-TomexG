from django.urls import include, path
from rest_framework import routers
from .api import NoteViewSet,AlbumViewSet,TrackViewSet

router = routers.DefaultRouter()
router.register('album', AlbumViewSet)
router.register('note',NoteViewSet)
router.register('track',TrackViewSet)
# router.register('user',UserAPIClass)

urlpatterns = [
    path("", include(router.urls)),
]