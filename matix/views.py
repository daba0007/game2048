from django.shortcuts import HttpResponse,redirect,render
from django.apps import apps
from django.views.decorators.csrf import csrf_exempt
from django.http import StreamingHttpResponse
import json
import os


def index(request):
    return render(request,'index.html')

@csrf_exempt
def contact_us(request):
    name = request.POST.get('name', '')
    phone = request.POST.get('phone', '')
    advice = request.POST.get('advice', '')
    contact="name:"+name+"\nphone:"+phone+"\nadvice:"+advice+"\n\n"
    file_object = open('file/data.txt', 'w+')
    file_object.writelines(contact)
    file_object.close()
    message="感谢您的宝贵意见"
    ret = {'message': message}
    return HttpResponse(json.dumps(ret))
