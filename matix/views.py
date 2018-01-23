from django.shortcuts import HttpResponse, redirect, render
from django.apps import apps
from django.views.decorators.csrf import csrf_exempt
from django.http import StreamingHttpResponse
import json
import os,sys , stat


def index(request):
    exist_file = os.path.exists('static/js/ai.js')
    if exist_file:
        os.remove(r'static/js/ai.js')
    os.mknod(r'static/js/ai.js')
    os.system('chmod 644 static/js/ai.js')
    return render(request, 'index.html')


@csrf_exempt
def contact_us(request):
    name = request.POST.get('name', '')
    phone = request.POST.get('phone', '')
    advice = request.POST.get('advice', '')
    contact = "name:" + name + "\nphone:" + phone + "\nadvice:" + advice + "\n\n"
    file_object = open('file/data.txt', 'a+')
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

@csrf_exempt
def get_aijs(request):
    files = request.FILES.get('files')
    file_name = "ai.js"
    path_name = 'static/js/'
    img_path = os.path.join(path_name, file_name)
    with open(img_path, 'wb') as f:
        for item in files.chunks():
            f.write(item)
    message = "上传成功"
    ret = {'message': message}
    return HttpResponse(json.dumps(ret))
