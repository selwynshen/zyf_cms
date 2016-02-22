#coding=utf-8
__author__ = 'Selwyn Shen'

from django import template
from datetime import datetime
from common.format_helper import get_cur_year
from common.user_manager import get_user_from_session,is_industry_user
from common.common_tools import decimal_to_power_str
from decimal import *
from industry_department.models import IndrcagInfo,EnterpriseInfo
from public_architecture.models import ArchInfo
register = template.Library()

@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)



register.simple_tag(get_item)

