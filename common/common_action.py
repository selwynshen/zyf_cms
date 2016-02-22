#coding=utf-8
#coding=utf-8
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render_to_response

from common.format_helper import get_year,get_year_seq,month_to_standard,get_cur_year_month,get_cur_year, get_year_list, handle_year_seq
from common.common_data import month_axis,quarter_axis,type_list
from django.template import RequestContext
import simplejson
import datetime
from django.core.exceptions import ObjectDoesNotExist
from common.request_context import render_to_error_page
# from CarbonEmission.sys_switch import get_switch_value
from common_tools import get_time_stamp,change_unite,change_units_without_round,list_clear_and_extend
from common.validator import validate_report_date_old
from decimal import Decimal
import urllib
#对于判断是否是编辑页面还是添加页面，可以在模版中使用变量flag,1为编辑页面，0为添加页面.
class Action(object):
    fields_to_set = {
    }
    module_name = ''
    model = object

    list_to_redirect =  ''

    manage_to_render = ''
    list_to_render = ''
    detail_to_render = ''

    title_add = ''
    title_manage = ''

    #跳转页面路径前缀
    path_prefix = ''

    _module_name = None

    #钩子方法
    def hook_add(self,request,dict):
        pass

    def hook_update(self,request,objid,dict):
        pass

    def hook_list(self,requset):
        return self.model.objects.all()

    def hook_detail(self,request,obj,dict):
        pass

    def hook_delete(self,request,objid):
        obj = self.model.objects.get(id=objid)
        obj.delete()

    def __init__(self,path_prefix='',is_verify=False):
        if not self._module_name:
            self._module_name = self.model()._meta.module_name.__str__().lower()
        self.path_prefix = path_prefix

    def object_list(self,request):
        dict = {}
        objs = self.hook_list(request)
        result_objs = []
        if objs:
            dict[self._module_name + 's'] = objs
        try:
            result_objs = objs.order_by('-report_date')
            obj_len = len(result_objs)
        except Exception:
            result_objs = objs
        dict[self._module_name + 's'] = result_objs

        return render_to_response('%s/%s' % (self.path_prefix,self.list_to_render),dict,context_instance=RequestContext(request))

    def object_add(self,request):
        dict = {'title':self.title_add,'flag':0}
        self.hook_add(request,dict)
        return render_to_response('%s/%s' %(self.path_prefix,self.manage_to_render),dict,context_instance=RequestContext(request))

    def object_update(self,request,objid):
        dict = {}
        obj = None
        if objid:
            obj = self.model.objects.get(id=objid)
            dict['title'] = self.title_manage
            dict['flag'] = 1
            dict[self._module_name] = obj
        self.hook_update(request,objid,dict)
        return render_to_response('%s/%s' % (self.path_prefix,self.manage_to_render),dict,context_instance=RequestContext(request))

    def object_detail(self,request,objid):
        dict = {}
        obj = None
        if objid:
            obj = self.model.objects.get(id=objid)
            dict['title'] = self.title_manage
            dict['flag'] = 1
            dict[self._module_name] = obj
        self.hook_detail(request,obj,dict)
        return render_to_response('%s/%s' % (self.path_prefix,self.detail_to_render),dict)

    def object_delete(self,request,objid):
        self.hook_delete(request,objid)
        return HttpResponseRedirect('/%s/%s/' % (self.path_prefix,self.list_to_redirect))

    def object_manage(self,request):
        objid = None
        if request.method == 'POST':
            objid = request.POST.get("id")


        if objid and objid != '':
            obj = self.model.objects.get(id=objid)
            self.autowired(request,obj)
            self.wire_others(request,obj)
            obj.save(False,True)
        else:
            obj = self.model()
            self.autowired(request,obj)
            self.wire_others(request,obj)
            obj.save(True)

        return HttpResponseRedirect('/%s/%s/' % (self.path_prefix,self.list_to_redirect))

    def wire_properties(self,from_model_obj,to_model_obj):
        fields_set = type(to_model_obj)._meta.get_all_field_names()
        if fields_set:
            for field_name in fields_set:
                try:
                    val = getattr(from_model_obj,field_name)
                    setattr(to_model_obj,field_name,val)
                except Exception:
                    pass

    def autowired(self,request,obj):
        if not self.fields_to_set:
            self.fields_to_set = type(obj)._meta.get_all_field_names()

        if self.fields_to_set:
            val = None
            for field in self.fields_to_set:
                val = request.POST.get(field)
                if val:
                    setattr(obj,field,val)

    def wire_others(self,request,obj):
        pass

    def render_to_page(self,request,url):
        return render_to_response(url,{},context_instance=RequestContext(request))

    def render_dict_to_page(self,request,dict,url):
        return render_to_response(url,dict,context_instance=RequestContext(request))

    def render_jsondata_to_response(self,dict):
        return HttpResponse(simplejson.dumps(dict), content_type="application/json")

    def render_html_to_response(self,dict):
        return HttpResponse(simplejson.dumps(dict),content_type="text/html")


class ImportAction(Action):
    importor = None
    error_export_url = None

    def __init__(self,path_prefix='',is_verify=False,use_user_region=False):
        super(ImportAction,self).__init__(path_prefix,is_verify)
        self.use_user_region = use_user_region

    def object_import(self,request):
        pass

    def error_export(self,request):
        errors_to_export = request.session['errors_to_export']
        data = self.importor.export_data_to_excel(errors_to_export, True)
        file_name = self.importor.exported_file_name + '_%s.xls'%(get_time_stamp())
        response = HttpResponse(data,mimetype='application/vnd.ms-excel; charset=utf-8')
        response['Content-Disposition'] = 'attachment; filename=%s' %(urllib.quote(file_name.encode('utf-8')))
        #remove errros_to_export
        request.session['errors_to_export'] = None
        return response

    def template_export(self,request):
        data_to_export = self.importor.export_data_to_excel([])
        file_name = self.importor.exported_file_name + '导出模板.xls'

        response = HttpResponse(data_to_export,mimetype='application/vnd.ms-excel; charset=utf-8')
        #fixed by selwyn
        #IE导出文件乱码问题
        response['Content-Disposition'] = 'attachment; filename=%s' %(urllib.quote(file_name.encode('utf-8')))
        #response['Content-Disposition'] = 'attachment; filename=%s' %(file_name.encode('utf-8'))
        return response




















