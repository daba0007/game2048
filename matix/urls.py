
from django.conf.urls import url
from matix import views

urlpatterns = [
    url(r'^index/$', views.index),
    url(r'^contact_us/$', views.contact_us),
    url(r'^get_board/$', views.get_board),
]