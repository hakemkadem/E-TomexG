"""ponynote URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from note import endpoints
from topex import endpoints as topexEndpoint
from note.api import TestView
from  django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    path(''.join('Myadmin'), TemplateView.as_view(template_name="index.html")),
    path(''.join('login'), TemplateView.as_view(template_name="index.html")),
    path(''.join('register'), TemplateView.as_view(template_name="index.html")),
    path(''.join('company'), TemplateView.as_view(template_name="index.html")),
    path(''.join('wait'), TemplateView.as_view(template_name="index.html")),
    path(''.join('confirmResetPassword'), TemplateView.as_view(template_name="index.html")),

    path('api/', include(endpoints)),
    path('api1/',include(topexEndpoint)),
    path('test/',TestView),
    path('api/auth/', include('knox.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
