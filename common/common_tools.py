#coding=utf-8
__author__ = 'Selwyn Shen'
from django.db.models.loading import get_model
from datetime import datetime
import time
import re
import math
from common.logging_util import get_logger
from decimal import *

def get_report_model(report_type,module_name):
    #需要根据项目重写
    app_label = '%s_department'%(module_name)
    reportModel = get_model(app_label,report_type)
    return reportModel

def list_clear_and_extend(list_obj,new_list):
    del list_obj[:]
    list_obj[:] = []
    list_obj.extend(new_list)

def get_time_stamp():
    time_tuple = datetime.now().timetuple()
    return int(time.mktime(time_tuple))

def validate_by_regex(str_pattern,val):
    pattern = re.compile(str_pattern)
    return pattern.match(val)

def round10(val,reserved):
    mi = math.pow(10,reserved)
    val = round(val * math.pow(10,reserved + 1)/10.0)
    return val/mi

def decimal_to_power_str(val):
    is_negtive = (val<0)
    if is_negtive:
        val = -val
    i = 0
    while(val>1):
        val = val/10.0
        i = i + 1
    while(val<1):
        val = val * 10.0
        i = i - 1
    if is_negtive:
        val = -val
    val = round10(val,2)
    if val >= 10:
        val = val/10.0
        i = i + 1
    if i >=0 and i <= 1:
        return '%s'%(val * math.pow(10,i))
    return '%s×10<sup>%s</sup>'%(val,i)

def change_unit(val):
    if val == 0:
        return 0
    return val / 10000.0

def change_unite(val):
    return val

def change_units_without_round(decimal_list):
    result_list = []
    for dec in decimal_list:
        result_list.append(change_unit(float(dec)))
    return result_list


# arr = [
#     2.225,
#     0.005,
#     0.00001,
#     100.5,
#     0.9995,
#     9.995,
#     9.965,
#     99.95,
#     0.2349,
#     10.05,
# ]
# for val in arr:
#     print decimal_to_power_str(val)


#输入：(x*2+3)*4,2
#输出：(2*2+3)*4=28
#输入：(x+2)*2-3,3
#输出：(3+2)*2-3=7
#调用举例：calcaulate_by_expression('(x*2+3)*4',2)或calcaulate_by_expression('(%s+2)*2-3',3)
def calcaulate_by_expression(expression,val,def_val_name='x'):
    template = expression.replace(def_val_name,'%s')
    result = 0
    try:
        to_execute = template%(val)
        result = eval(to_execute)
    except Exception:
        get_logger().error('%s do not have arguments'%(template))
    return result

def calculate_by_expression(expression,val_dict):
    template = expression
    #进行替换
    for key,val in val_dict.items():
        template = template.replace(key,'%s')
        try:
            template = template%(val)
        except Exception:
            get_logger().error('%s do not have arguments'%(template))
    return eval(template)

def get_dif_list(list_a,list_b):
    return list(set(list_a).difference(set(list_b)))

def model_deep_clone(model_clz,obj_to_copy):
    clone_obj = model_clz()
    fields_to_set = type(obj_to_copy)._meta.get_all_field_names()
    for field in fields_to_set:
        val = getattr(obj_to_copy,field)
        if val:
            setattr(clone_obj,field,val)
            #0.0 也算是False，因此需要特殊处理
        if val == 0:
            setattr(clone_obj,field,val)

    return clone_obj