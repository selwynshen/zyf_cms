#coding=utf-8
from django.conf.urls import patterns, include, url


urlpatterns = patterns('',
    #导入功能 显示导入对话框页面
    url(r'show_import_page/','ajax.views.show_import_page'),

    url(r'manage_remark/','ajax.views.manage_remark'),
)
