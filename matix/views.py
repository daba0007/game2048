from django.shortcuts import HttpResponse, redirect, render
from django.apps import apps
from django.views.decorators.csrf import csrf_exempt
from django.http import StreamingHttpResponse
import json
import os


def index(request):
    return render(request, 'index.html')


@csrf_exempt
def contact_us(request):
    name = request.POST.get('name', '')
    phone = request.POST.get('phone', '')
    advice = request.POST.get('advice', '')
    contact = "name:" + name + "\nphone:" + phone + "\nadvice:" + advice + "\n\n"
    file_object = open('file/data.txt', 'w+')
    file_object.writelines(contact)
    file_object.close()
    message = "感谢您的宝贵意见"
    ret = {'message': message}
    return HttpResponse(json.dumps(ret))


@csrf_exempt
def get_board(request):
    board = [[] for i in range(4)]
    board[0] = request.POST.getlist('board[0][]', '')
    board[1] = request.POST.getlist('board[1][]', '')
    board[2] = request.POST.getlist('board[2][]', '')
    board[3] = request.POST.getlist('board[3][]', '')
    message = "收到"
    ret = {'message': message}
    return HttpResponse(json.dumps(ret))
