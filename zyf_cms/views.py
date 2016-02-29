#coding=utf-8
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt

from common.request_context import render_response

from django.core.context_processors import csrf



@csrf_exempt
def login(request):
    return render_to_response('index.html')

@csrf_exempt
def logout(request):
    user = getattr(request, 'user', None)
    user = None
    request.session.flush()

    return HttpResponseRedirect('/')

@csrf_exempt
def register(request):
    pass


