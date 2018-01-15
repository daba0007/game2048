from django.shortcuts import HttpResponse,redirect,render
from django.apps import apps

def index(request):
    return render(request,'index.html')
