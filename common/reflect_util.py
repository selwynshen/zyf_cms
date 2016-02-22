#coding=utf-8
__author__ = 'Selwyn Shen'

import importlib
#获取类成员方法
def getClassMethod(module_name,class_name,method_name):
    parent_module = importlib.import_module(module_name)
    class_module = getattr(parent_module,class_name)
    return getattr(class_module(),method_name)