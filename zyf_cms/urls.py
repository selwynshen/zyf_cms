#coding=utf-8
from django.conf.urls import patterns, include, url
import sys
reload(sys)
sys.setdefaultencoding('utf8')

urlpatterns = patterns('',
    url(r'^$', 'zyf_cms.views.login',name='登陆'),
    url(r'^logout/', 'zyf_cms.views.logout',name='注销'),

    url(r'^admin/', include('admin.urls'),name='后台管理员'),

    url(r'^ajax/', include('ajax.urls'),name="ajax request"),

    url(r'^register/$', 'zyf_cms.views.register',name='注册'),

    )
