
from django.conf.urls import url
from matix import views

urlpatterns = [
    url(r'^index/$', views.index),
]