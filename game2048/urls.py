
from django.conf.urls import url,include
from django.contrib import admin
from matix import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'',include('matix.urls')),
]
