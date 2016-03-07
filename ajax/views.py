#coding=utf-8
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_protect,csrf_exempt
from django.core.context_processors import csrf
from common.format_helper import string_to_ym_datetime,get_first_day,get_last_day,date_to_string
from django.template import RequestContext
from common.common_tools import get_report_model
import simplejson
from admin.actions import AdminManager

@csrf_exempt
def show_import_page(request):
    url = request.GET.get('import_url')
    dict = {}
    dict['import_url'] = url
    return render_to_response('common/to_import.html',dict,context_instance=RequestContext(request))

@csrf_exempt
def manage_remark(request):
    return AdminManager.get_ill_case_action().remark_manage(request)
