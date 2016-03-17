#coding=utf-8
from django.conf.urls import patterns, include, url



urlpatterns = patterns('',
    url(r'^login/', 'admin.views.login',name='登录'),
    url(r'^logout/', 'admin.views.logout',name='注销'),

    url(r'index/$', 'admin.views.index'),

    url(r'home/$', 'admin.views.home'),

    # 店铺管理
    url(r'shop_list/$','admin.views.shop_list'),
    url(r'shop_manage/$','admin.views.shop_manage'),
    url(r'shop_add/$', 'admin.views.shop_add'),
    url(r'shop_update/(?P<shopid>\d*)/$', 'admin.views.shop_update'),
    url(r'shop_detail/(?P<shopid>\d*)/$', 'admin.views.shop_detail'),
    url(r'shop_delete/(?P<shopid>\d*)/$', 'admin.views.shop_delete'),


    # 用户管理
    url(r'userinfo_list/$','admin.views.userinfo_list'),
    url(r'userinfo_manage/$','admin.views.userinfo_manage'),
    url(r'userinfo_add/$', 'admin.views.userinfo_add'),
    url(r'userinfo_update/(?P<userinfoid>\d*)/$', 'admin.views.userinfo_update'),
    url(r'userinfo_detail/(?P<userinfoid>\d*)/$', 'admin.views.userinfo_detail'),
    url(r'userinfo_delete/(?P<userinfoid>\d*)/$', 'admin.views.userinfo_delete'),


    # 病例管理
    url(r'illcase_list/$','admin.views.illcase_list'),
    url(r'illcase_manage/$','admin.views.illcase_manage'),
    url(r'illcase_add/$', 'admin.views.illcase_add'),
    url(r'illcase_update/(?P<illcaseid>\d*)/$', 'admin.views.illcase_update'),
    url(r'illcase_detail/(?P<illcaseid>\d*)/$', 'admin.views.illcase_detail'),
    url(r'illcase_delete/(?P<illcaseid>\d*)/$', 'admin.views.illcase_delete'),

    url(r'illcase_filter/$', 'admin.views.illcase_filter'),

)
