#coding=utf-8
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render_to_response

from django.views.decorators.csrf import csrf_exempt
from django.template import RequestContext
from zyf_cms.models import UserInfo

from common.request_context import render_response,render_response_with_csrfcookie,render_to_error_page
from common.auth import auth_required, access_permitted, get_branch_shop_group_id
from admin.actions import AdminManager


@csrf_exempt
def login(request):
    if request.method=='GET':
        return render_to_response('admin/login.html')

    if request.method=='POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        remember_me = request.POST.get('remember_me', None)

        if not username or not password:
            return render_to_response('login.html',{'error':'用户名或者密码不能为空'})

        from django.contrib.auth import authenticate, login
        user = authenticate(username=username, password=password)
        if user == None:
            return render_to_response('admin/login.html',{'error':'用户名或密码错误'})

        if user is not None:
            if user.is_active:
                login(request, user)
                user.password = None
                if not remember_me:
                    request.session.set_expiry(0)

        request.session['user'] = user
        user_group = user.groups.all()
        request.session['user_group_id'] = user_group[0].id
        request.luser = request.session['user']

        user_info = None
        try:
            user_info = UserInfo.objects.get(user=user)
            #设置到session
            request.session['user_info_id'] = user_info.id
        except:
            pass
        return HttpResponseRedirect('/admin/index')

def logout(request):
    from django.contrib import auth
    auth.logout(request)
    from zyf_cms.settings import LOGIN_URL
    return HttpResponseRedirect(LOGIN_URL)

@auth_required
@access_permitted
def index(request):
    def_url = '/admin/shop_list'
    if get_branch_shop_group_id() == request.session['user_group_id']:
        def_url = '/admin/illcase_list'
    return render_response_with_csrfcookie(request,'admin/base-iframe.html',{'defUrl':def_url})


#单位管理
@auth_required
@access_permitted
def shop_manage(request):
    return AdminManager.get_shop_action().object_manage(request)

@auth_required
@access_permitted
def shop_list(request):
    return AdminManager.get_shop_action().object_list(request)

@auth_required
@access_permitted
def shop_add(request):
    return AdminManager.get_shop_action().object_add(request)

@auth_required
@access_permitted
def shop_update(request,shopid):
    return AdminManager.get_shop_action().object_update(request,shopid)

@auth_required
@access_permitted
def shop_delete(request,shopid):
    return AdminManager.get_shop_action().object_delete(request,shopid)

@auth_required
@access_permitted
def shop_detail(request,shopid):
    return AdminManager.get_shop_action().object_detail(request,shopid)

# 用户管理
@auth_required
@access_permitted
def userinfo_manage(request):
    return AdminManager.get_user_info_action().object_manage(request)

@auth_required
@access_permitted
def userinfo_list(request):
    return AdminManager.get_user_info_action().object_list(request)

@auth_required
@access_permitted
def userinfo_add(request):
    return AdminManager.get_user_info_action().object_add(request)

@auth_required
@access_permitted
def userinfo_update(request,userinfoid):
    return AdminManager.get_user_info_action().object_update(request,userinfoid)

@auth_required
@access_permitted
def userinfo_delete(request,userinfoid):
    return AdminManager.get_user_info_action().object_delete(request,userinfoid)

@auth_required
@access_permitted
def userinfo_detail(request,userinfoid):
    return AdminManager.get_user_info_action().object_detail(request,userinfoid)

# 病例管理
@auth_required
@access_permitted
def illcase_manage(request):
    return AdminManager.get_ill_case_action().object_manage(request)

@auth_required
@access_permitted
def illcase_list(request):
    return AdminManager.get_ill_case_action().object_list(request)

@auth_required
@access_permitted
def illcase_add(request):
    return AdminManager.get_ill_case_action().object_add(request)

@auth_required
@access_permitted
def illcase_update(request,illcaseid):
    return AdminManager.get_ill_case_action().object_update(request,illcaseid)

@auth_required
@access_permitted
def illcase_delete(request,illcaseid):
    return AdminManager.get_ill_case_action().object_delete(request,illcaseid)

@auth_required
@access_permitted
def illcase_detail(request,illcaseid):
    return AdminManager.get_ill_case_action().object_detail(request,illcaseid)

@auth_required
@access_permitted
def illcase_filter(request):
    return AdminManager.get_ill_case_action().object_filter(request)