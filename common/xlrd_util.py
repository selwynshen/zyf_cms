#coding=utf-8
__author__ = 'Selwyn Shen'
import xlrd
from django.db import models
from common.xlwt_util import export_data
from common.validator import validate_numeric,validate_empty,validate_report_date,validate_report_date_old
from decimal import *
from common.format_helper import get_year

class Importor(object):
    #导出文件标题
    exported_file_name = ''

    #数据日期field名称
    report_date_field_name = 'report_date'

    #存放错误信息
    errors = []

    model_clz = object

    #要导入的字段名称列表
    fieldsnames = []
    #导入文件的标题行名称列表
    headernames = []
    #flag：是否成功导入
    #message：消息，比如成功导入了多少条，失败多少条
    #tips:错误信息
    result = {}

    success_count = 0
    total_count = 0

    #用于去重的辅助变量
    fields_for_duplicate = []
    #哪些字段在年数据转化为月数据的时候不需要除以12
    exclude_fields_for_transform = []
    #哪些字段在年数据转化为月数据的时候需要除以12（除_ammount结尾的填报字段外）
    include_fields_for_transform = []

    #结尾的为填报数据
    report_field_suffix = '_ammount'

    # errors_to_export = []

    def __init__(self):
        self.result['flag'] = True
        self.result['message'] = ''

        self.errors_to_export = []

        #要保存到数据库的对象
        self.imported = []
        #已经确定要导入的年份
        #dict key:year value:count
        self.year_imported_dict = {}

    #设置excel文档里面每一单元格的值到model对象里面
    def set_field_value(self,obj,colindex,cellvalue):
        setattr(obj,self.fieldsnames[colindex],cellvalue)
        return []

    def get_import_fields_names(self):
        self.fieldsnames = self.model_clz._meta.get_all_field_names()
        return self.fieldsnames



    #是否是填报字段
    def is_report_field_name(self,field_name,exclude_fields_name_list=[],include_fields_name_list=[]):
        flag = False
        if field_name.endswith(self.report_field_suffix) and field_name not in [self.report_date_field_name,'month',]:
            flag =  True
        if flag:
            if field_name not in exclude_fields_name_list:
                flag = True
            else:
                flag = False
        #如果在包含的字段列表里，那么也算是填报字段
        if field_name in include_fields_name_list:
            flag = True
        return flag


    #默认会验证所有以_ammount结尾的字段名称的值
    #判空以及是否数值
    def validate_all_report_fields(self,new_obj,errors,exclude_fields_name_list=[]):
        flag = True
        field_count = len(self.headernames)
        for idx in range(field_count):
            field_name = self.fieldsnames[idx]
            if self.is_report_field_name(field_name):
                val = getattr(new_obj,field_name)
                val = str(val)
                #首先判空
                if not validate_empty(val):
                    errors.append('%s不能为空'%(self.headernames[idx]))
                    flag = False
                #然后判断是否为数值
                if not validate_numeric(val):
                    errors.append('%s必须是数值'%(self.headernames[idx]))
                    flag = False

        return flag

    def validate_report_date(self,new_obj,errors,is_month=True,report_date_field_name='report_date'):
        val = getattr(new_obj,report_date_field_name)
        #fixed by selwyn
        #解决excel单元格为常规，实际传过来是float的问题
        if type(val) == float:
            val = int(val)
        val = str(val)
        flag = validate_empty(val)
        if not flag:
            errors.append('%s不能为空'%('数据日期'))
        else:
            flag = validate_report_date(val,is_month)
            if not flag:
                format = 'YYYY'
                if is_month:
                    format += '-MM'
                errors.append('%s格式应为%s'%('数据日期',format))
            else:
                if self.year_imported_dict.has_key(val):
                    errors.append('该数据日期的数据已经存在')
                else:
                    #判断年还是月数据
                    is_month_flag = validate_report_date_old(val)
                    if is_month_flag:
                        #取出年份，判断下年份是否已经存在
                        report_year = get_year(val)
                        if report_year and self.year_imported_dict.has_key(str(report_year)):
                            errors.append('该数据日期的数据已经存在')

                if errors:
                    flag = False
                else:
                    #重新设置数据日期，保证是正确的
                    setattr(new_obj,report_date_field_name,val)

        return flag

    #验证数据在表中是否重复，默认为False
    def validate_duplicate(self,new_obj,errors):
        return True

    #验证字段
    def validate_each_field(self,new_obj,errors):
        return True

    #额外的参数设置，默认设置区域
    def set_other_fields_values(self,new_obj,cur_user):
        new_obj.region = cur_user.region

    #总验证要导入的对象
    def validate_object(self,new_obj):
        #首先判断各个字段的值是否符合要求
        errors = []
        field_flag = self.validate_each_field(new_obj,errors)
        duplicate_flag = True
        if field_flag:
            duplicate_flag = self.validate_duplicate(new_obj,errors)

        if not field_flag or not duplicate_flag:
            error_dict = {}
            #modified by selwyn
            #对于使用用户所在区域作为导入填报数据的区域，不应该使用fieldsnames作为输出到错误excel文件的字段key
            field_len = len(self.headernames)
            for idx in range(field_len):
                field_name = self.fieldsnames[idx]
                error_dict[field_name] = getattr(new_obj,field_name,'')
            # for field_name in self.fieldsnames:
            #     error_dict[field_name] = getattr(new_obj,field_name)
            error_dict['tips'] = ','.join(errors)
            #错误信息放到错误列表中
            self.errors_to_export.append(error_dict)

            return False
        else:
            report_date = getattr(new_obj,self.report_date_field_name)
            self.year_imported_dict[report_date] = 1
            return True

    #标题的验证，是否标题要一致才行,默认必须要一致
    def validate_colnames(self,colnames):
        return colnames == self.headernames


    #保存验证后的对象到数据库
    def save_to_db(self):
        if self.imported:
            for record in self.imported:
                record.save()

    #填充错误
    def fill_in_error_result(self,error_msg,error_flag=False):
        self.result['flag'] = error_flag
        self.result['message'] = error_msg

    #如果导入的是年数据，是否要转化成12个月的月数据
    def is_year_obj_to_month_objs(self):
        return True

    #年数据转化为月数据，并保存，返回成功条数
    def save_month_objs(self,year_obj,exclude_fields_name_list=[],include_fields_name_list=[]):
        success_account = 0

        year = getattr(year_obj,self.report_date_field_name)
        user = getattr(year_obj,'user')
        region = getattr(year_obj,'region')
        #先把原数据填报字段全部除以12，作为月填报数据
        from common.common_tools import model_deep_clone
        clone_obj = model_deep_clone(self.model_clz,year_obj)
        field_count = len(self.headernames)
        for idx in range(field_count):
            field_name = self.fieldsnames[idx]
            if self.is_report_field_name(field_name,exclude_fields_name_list,include_fields_name_list):
                month_val = getattr(clone_obj,field_name,0) / 12.0
                setattr(clone_obj,field_name,month_val)

        from common.format_helper import get_year_month_seq
        year_month_seq = get_year_month_seq(year)
        for year_month in year_month_seq:
            old_objs = self.model_clz.objects.filter(user=user,report_date=year_month,region=region,source=0)
            if not old_objs:
                #计算后插入到表里面
                setattr(clone_obj,self.report_date_field_name,year_month)
                clone_obj.id = None
                clone_obj.save()
                success_account = success_account + 1

        return success_account


    #导入excel文档，默认使用用户区域作为地区数据进行导入
    def import_file(self,file_ins,cur_user=None):
        table = None
        try:
            imported_file = xlrd.open_workbook(file_contents=file_ins)
            table = imported_file.sheets()[0]
        except Exception,e:
            self.errors.append(e)

        if not table and table.nrows <= 1:
            self.fill_in_error_result('找不到工作单或没有数据')
            return

        nrows = table.nrows
        self.total_count = nrows - 1
        colnames =  table.row_values(0)

        #如果标题不一致
        if not self.validate_colnames(colnames):
            self.fill_in_error_result('导入文件的标题形式不正确')
            return

        #excel里面内容实际的列数
        col_len = len(colnames)

        for rownum in range(1,nrows):
            row = table.row_values(rownum)
            if row:
                obj = self.model_clz()
                self.set_field_value(obj,0,row[0])
                for i in range(0,col_len):
                    self.set_field_value(obj,i,row[i])

                #额外设置字段的值，可以自己覆写set_other_fields_values
                if cur_user:
                    self.set_other_fields_values(obj,cur_user)

                #验证
                validate_flag = self.validate_object(obj)
                #如果验证通过，则放入到待保存对象列表中
                if validate_flag:
                    self.imported.append(obj)

        #判断是否先有年，后有月数据

        for temp_obj in self.imported:
            if self.is_year_obj_to_month_objs() and validate_report_date(temp_obj.report_date,False):
                temp_success_count = self.save_month_objs(temp_obj,self.exclude_fields_for_transform,self.include_fields_for_transform)
                self.success_count += temp_success_count
            else:
                temp_obj.save()
                self.success_count += 1

        #clean list
        self.imported = []

        if self.errors_to_export:
            self.fill_in_error_result('导入失败')
        else:
            self.fill_in_error_result('导入成功',True)


    @classmethod
    def export_data_to_excel(cls,data,with_error_tip=False):
        headernames = list(cls.headernames)
        fieldsnames = list(cls.fieldsnames)

        if with_error_tip:
            headernames.append('错误提示')
            fieldsnames.append('tips')

        return export_data(headernames,fieldsnames,data)


