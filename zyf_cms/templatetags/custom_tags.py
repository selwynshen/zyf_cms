#coding=utf-8
__author__ = 'Selwyn Shen'

from django import template
from datetime import datetime
from common.format_helper import get_cur_year
from common.common_tools import decimal_to_power_str
from decimal import *
register = template.Library()

@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)

@register.filter
def get_checkbox_list(val):
    if val == '':
        return []
    return val.split(',')

register.simple_tag(get_item)
register.simple_tag(get_checkbox_list)
