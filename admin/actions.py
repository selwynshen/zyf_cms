#coding=utf-8
__author__ = 'Selwyn Shen'
from common.common_action import Action
from zyf_cms.models import Shop, UserInfo, IllCase

from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext

from common.auth import get_user_shops, get_user_shops_below, is_superadmin, get_head_shop_group_id, get_branch_shop_group_id, is_head_shop_user
from zyf_cms.user_manage import get_user_shop, get_user_info
from common.format_helper import string_to_date

class ShopAction(Action):
    model = Shop

    list_to_redirect =  'shop_list'

    manage_to_render = 'shop_manage.html'
    list_to_render = 'shop_list.html'
    detail_to_render = 'shop_detail.html'

    title_add = '店铺添加'
    title_manage = '店铺管理'

    def hook_list(self,request):
        shops = get_user_shops(request)
        return shops

    def wire_others(self,request,obj):
        if not obj.id:
            if is_superadmin(request):
                from django.db.models import Max
                max_id = Shop.objects.all().aggregate(Max('id'))['id__max']
                new_id = 1
                if max_id:
                    new_id = max_id + 1
                obj.leader_id = new_id
                obj.id = new_id
                obj.group_id = get_head_shop_group_id()
            else:
                if is_head_shop_user(request):
                    obj.group_id = get_branch_shop_group_id()
                    obj.leader_id = get_user_shop(request).id






#用户管理
class UserInfoAction(Action):
    model = UserInfo

    list_to_redirect =  'userinfo_list'
    manage_to_render = 'userinfo_manage.html'
    list_to_render = 'userinfo_list.html'
    detail_to_render = 'userinfo_detail.html'

    title_add = '新建用户'
    title_manage = '编辑用户'

    def hook_add(self,request,dict):
        shops = get_user_shops(request)
        dict['shops'] = shops

    def hook_update(self,request,objid,dict):
        self.hook_add(request,dict)
        dict['userinfo'].user.password = ''

    def hook_list(self,request):
        shops = get_user_shops(request)
        return UserInfo.objects.filter(shop__in=shops)

    def hook_delete(self,request,objid):
        obj = self.model.objects.get(id=objid)
        obj.user.delete()

    def wire_others(self, request ,obj ,errorMsg):
        objid = request.POST.get("id")
        update_flag = False
        if objid and objid != '':
            update_flag = True

        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        email = request.POST.get('email')
        shop_id = request.POST.get('shop_id')

        if confirm_password != password:
            errorMsg.append('密码和确认密码不一致!')

        else:
            #User->User_Group->UserInfo
            from django.contrib.auth.models import User
            old_user = None
            try:
                old_user = User.objects.get(username=username)
            except User.DoesNotExist:
                pass
                #用户名已存在
            if not update_flag and old_user:
                return

            from django.contrib.auth.hashers import make_password
            password = make_password(password)

            shop = Shop.objects.get(id=shop_id)
            group = shop.group

            if not update_flag:
                user = User.objects.create(username=username,password=password,email=email)
                group.user_set.add(user)
                obj.shop = shop
                obj.user = user

            else:
                old_group = User.groups.through.objects.get(user=old_user)
                old_group.group = group
                old_group.save()

                old_user.password = password
                old_user.email = email

                old_user.save(False,True)

                obj.shop = shop
                obj.user = old_user


    def object_manage(self,request):
        objid = None
        if request.method == 'POST':
            objid = request.POST.get("id")

        errorMsg = []

        if objid and objid != '':
            obj = self.model.objects.get(id=objid)
            self.autowired(request,obj)
            self.wire_others(request,obj,errorMsg)

            if not errorMsg:
                obj.save(False,True)
            else:
                dict = {'title':self.title_add,'flag':0}
                self.hook_add(request,dict)
                dict['errMsg'] = errorMsg[0]
                return render_to_response('%s/%s' % (self.path_prefix,self.manage_to_render),dict,context_instance=RequestContext(request))
        else:
            obj = self.model()
            self.autowired(request,obj)
            self.wire_others(request,obj,errorMsg)
            if not errorMsg:
                obj.save(True)
            else:
                dict = {'title':self.title_add,'flag':0}
                self.hook_add(request,dict)
                dict['errMsg'] = errorMsg[0]
                return render_to_response('%s/%s' % (self.path_prefix,self.manage_to_render),dict,context_instance=RequestContext(request))
        if objid != 1:
            return HttpResponseRedirect('/%s/%s/' % (self.path_prefix,self.list_to_redirect))
        else:
            return HttpResponseRedirect('shop_list')

class IllCaseAction(Action):
    model = IllCase

    list_to_redirect =  'illcase_list'

    manage_to_render = 'illcase_manage.html'
    list_to_render = 'illcase_list.html'
    detail_to_render = 'illcase_detail.html'

    title_add = '病例添加'
    title_manage = '病例管理'

    def hook_add(self,request,dict):
        shops = get_user_shops(request)
        dict['shops'] = shops

    def hook_update(self,request,objid,dict):
        self.hook_add(request,dict)

    def hook_list(self,request):
        shops = get_user_shops_below(request)
        return IllCase.objects.filter(shop__in=shops)

    def wire_others(self,request,obj):
        dabian_zhuangtai_list = request.POST.getlist("dabian_zhuangtai", [])
        obj.dabian_zhuangtai = ','.join(dabian_zhuangtai_list)

        shezhi_list = request.POST.getlist('shezhi', [])
        obj.shezhi = ','.join(shezhi_list)

        shese_list = request.POST.getlist('shese', [])
        obj.shese = ','.join(shese_list)

        shetai_list = request.POST.getlist('shetai', [])
        obj.shetai = ','.join(shetai_list)

        yanjing_list = request.POST.getlist('yanjing', [])
        obj.yanjing = ','.join(yanjing_list)

        tuijiao_qingkuang_list = request.POST.getlist('tuijiao_qingkuang', [])
        obj.tuijiao_qingkuang = ','.join(tuijiao_qingkuang_list)

        minyuecha_list = request.POST.getlist('minyuecha', [])
        obj.minyuecha = ','.join(minyuecha_list)

        wuzisan_list = request.POST.getlist("wuzisan", [])
        obj.wuzisan = ','.join(wuzisan_list)

        yuantangtie_tiefu_xuewei_list = request.POST.getlist('yuantangtie_tiefu_xuewei', [])
        obj.yuantangtie_tiefu_xuewei = ','.join(yuantangtie_tiefu_xuewei_list)

        fuzhuyaowu_list = request.POST.getlist("fuzhuyaowu", [])
        obj.fuzhuyaowu = ','.join(fuzhuyaowu_list)

        yuantangguang_buwei_list = request.POST.getlist('yuantangguang_buwei', [])
        obj.yuantangguang_buwei = ','.join(yuantangguang_buwei_list)

        yuantangguang_fuyao_qingkuang_list = request.POST.getlist('yuantangguang_fuyao_qingkuang', [])
        obj.yuantangguang_fuyao_qingkuang = ','.join(yuantangguang_fuyao_qingkuang_list)

        #设置店铺和填写人用户
        obj.user_info = get_user_info(request)
        obj.shop = obj.user_info.shop

    def put_extra_object_list(self, request, dict):
        shops = get_user_shops_below(request)
        dict['shops'] = shops


    def object_filter(self,request):
        report_date = request.GET.get('selected_date')
        shop_id = request.GET.get('shop_id')

        objs = self.model.objects.all()

        if report_date:
            begin_date = string_to_date(report_date)
            from datetime import  timedelta
            if begin_date:
                objs = objs.filter(create_time__range=(begin_date,begin_date + timedelta(1)))

        if shop_id:
            shop = Shop.objects.filter(id=shop_id)
            objs = objs.filter(shop=shop)

        objs = objs.order_by("-create_time")

        shops = get_user_shops_below(request)

        return render_to_response('%s/%s' % (self.path_prefix,self.list_to_render),{self._module_name + 's':objs,'selected_date':report_date,'shop_id':int(shop_id), 'shops': shops},context_instance=RequestContext(request))


class AdminManager:
    shop_action = ShopAction('admin')
    user_info_action = UserInfoAction('admin')

    ill_case_action = IllCaseAction('admin')
    @classmethod
    def get_shop_action(cls):
        return cls.shop_action

    @classmethod
    def get_user_info_action(cls):
        return cls.user_info_action

    @classmethod
    def get_ill_case_action(cls):
        return cls.ill_case_action