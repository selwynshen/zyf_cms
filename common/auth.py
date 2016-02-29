#coding=utf-8
from django.http import HttpResponseRedirect

from zyf_cms.settings import LOGIN_URL
from django.shortcuts import render_to_response
from zyf_cms.user_manage import get_user_shop, get_user
from zyf_cms.models import Shop
from django.db.models import Q

ap_dict = {
    1: 'superadmin',
    2: 'headshop',
    3: 'branchshop',
}

def auth_required(function):
    def decorator(request, *args, **kwargs):
        user = request.session.get('user')
        if not user:
            return HttpResponseRedirect(LOGIN_URL)
        return function(request, *args, **kwargs)
    return decorator

def access_permitted(function):
    def decorator(request, *args, **kwargs):
        user_group_id = request.session.get('user_group_id')
        # if request.path.find('document') == -1 and user_group_id <= 2 and request.path.find(apMap.get(user_group_id)) == -1:
        #     return render_to_response('error/error.html',{'errorMsg':'无权限访问该页面！'})

        return function(request, *args, **kwargs)
    return decorator

def get_head_shop_group_id():
    return 2

def get_branch_shop_group_id():
    return 3

def is_head_shop_user(request):
    user_group_id = request.session['user_group_id']
    return user_group_id and  user_group_id == get_head_shop_group_id()

def is_superadmin(request):
    user_group_id = request.session['user_group_id']
    return user_group_id and  user_group_id == 1

#反正所属店铺，如果没有，则取自己的店铺
def get_user_shops_below(request):
    if is_superadmin(request):
        from django.db.models import F
        return Shop.objects.filter(id=F('leader_id'))
    user_shop = get_user_shop(request)
    below_shops = Shop.objects.filter(leader_id=user_shop.id)
    if not below_shops:
        return [user_shop]
    return below_shops

def get_user_shops(request):
    if is_superadmin(request):
        from django.db.models import F
        return Shop.objects.filter(id=F('leader_id'))
    user_shop = get_user_shop(request)
    below_shops = Shop.objects.filter(leader_id=user_shop.id).exclude(id=user_shop.id)
    return below_shops




