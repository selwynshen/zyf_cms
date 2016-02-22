#coding=utf-8
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render_to_response

from django.views.decorators.csrf import csrf_exempt

from django.template import RequestContext

from common.request_context import render_response,render_response_with_csrfcookie,render_to_error_page

from admin.actions import AdminManager


def index(request):
    request.luser = 1
    return render_response_with_csrfcookie(request,'admin/base-iframe.html',{'defUrl':'/admin/cookbook_list'})

def cookbook_list(request):
    return AdminManager.get_cookbook_action().object_list(request)
def cookbook_detail(request,id):
    return AdminManager.get_cookbook_action().object_detail(request,id)
def cookbook_add(request):
    return AdminManager.get_cookbook_action().object_add(request)
def cookbook_update(request,id):
    return AdminManager.get_cookbook_action().object_update(request,id)
def cookbook_manage(request):
    return AdminManager.get_cookbook_action().object_manage(request)
def cookbook_delete(request,id):
    return AdminManager.get_cookbook_action().object_delete(request,id)

