#coding=utf-8
__author__ = 'Selwyn Shen'
from common.common_tools import validate_by_regex

def validate_empty(val):
    if val and len(val.strip()) > 0:
        return True
    else:
        return False

def validate_numeric(val):
    result =  validate_by_regex(r'^(\d+)(((.|,)\d+)+)?$',val)
    return result != None

def validate_report_date(val,is_month=True):
    #modified by selwyn
    #按月填报也支持按年导入，所以对于按月的，按年按月的验证有一个通过就行了
    str_yyyymm_pattern = '^[0-9]{4}-(1[0-2]|0[1-9])$'
    str_yyyy_pattern = '^[0-9]{4}$'
    yyyy_flag = validate_by_regex(str_yyyy_pattern,val)!=None
    if not is_month:
        return yyyy_flag
    yyyymm_flag = validate_by_regex(str_yyyymm_pattern,val)!=None
    return (yyyy_flag or yyyymm_flag)

#判断是年数据还是月数据
def validate_report_date_old(val,is_month=True):
    #这是以前的，用来判断沿用的是年的数据还是月份的数据
    str_pattern = '^[0-9]{4}-(1[0-2]|0[1-9])$'
    if not is_month:
        str_pattern = '^[0-9]{4}$'
    return validate_by_regex(str_pattern,val) != None

