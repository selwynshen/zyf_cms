#coding=utf-8
__author__ = 'Selwyn Shen'

from django.contrib.auth.models import User
from zyf_cms.models import UserInfo

#获取用户信息
def get_user_info(request):
    user_info_id = request.session.get('user_info_id')
    user_info = None
    if user_info_id:
        user_info = UserInfo.objects.get(id=user_info_id)
    return user_info

def get_user(request):
    user = request.session.get('user')
    return user

#根据用户id获取用户信息
def get_user_info_by_user_id(user_id):
    user = User.objects.get(id=user_id)
    user_info = UserInfo.objects.get(user=user)
    return user_info

def get_user_shop(request):
    user_info = get_user_info(request)
    return user_info.shop







