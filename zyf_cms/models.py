#coding=utf-8
from django.db import models

import datetime

from common import format_helper
from common.common_models import BaseModel
from django.contrib.auth.models import User, Group

class Shop(BaseModel):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=500)
    contact_info = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    #province = models.CharField(max_length=50)
    #city = models.CharField(max_length=50)
    leader_id = models.IntegerField(blank=True, null=True)

    group = models.ForeignKey(Group)

    class Meta:
        db_table = 'shop'

#用户信息
class UserInfo(BaseModel):
    user = models.ForeignKey(User)
    shop = models.ForeignKey(Shop)

    real_name = models.CharField(max_length=200)

    class Meta:
        db_table = 'user_info'


#病例
class IllCase(BaseModel):
    case_name = models.CharField(max_length=200)

    shop = models.ForeignKey(Shop)

    user_info = models.ForeignKey(UserInfo)

    remark = models.CharField(max_length=2000, null=True, default="")


    name = models.CharField(max_length=200)
    gender = models.IntegerField(default=1)
    age = models.IntegerField(blank=True, null=True, default=0)


    xuetang = models.CharField(max_length=50, null=True, default="")
    xueya = models.CharField(max_length=50, null=True, default="")

    shiduan = models.CharField(max_length=50, null=True, default="")
    #0:未知   1:是  2:否  3：略微
    pilaogan = models.IntegerField(max_length=2, null=True, default=0)

    dabian_cishu = models.IntegerField(max_length=5, null=True, default=0)
    #0:未知   1:成形  2:不成形  3：顺畅 4：便不净 5：气味恶臭
    dabian_zhuangtai = models.CharField(max_length=50, null=True, default="")
    #0:未知   1:有  2:无
    futong = models.IntegerField(max_length=2, null=True, default=0)

    xiaobian_baitian = models.IntegerField(max_length=5, null=True, default=0)
    xiaobian_wanshang = models.IntegerField(max_length=5, null=True, default=0)
    #0:未知 1:多 2:少 3:一般 4：无
    paomo = models.IntegerField(max_length=2, null=True, default=0)
    #0:未知 1:有 2:无
    zhuotonggan = models.IntegerField(max_length=2, null=True, default=0)
    #0:未知 1:清 2:浑浊 3： 浅黄 4： 深黄
    xiaobian_yanse = models.IntegerField(max_length=2, null=True, default=0)
    #0:未知 1:失眠多梦不易入睡  2:做梦醒来就忘不困 3： 多梦醒来精神疲劳 4： 有凌晨醒的现象
    shuimian_zhiliang = models.IntegerField(max_length=2, null=True, default=0)

    shuimian_shijian_kaishi = models.CharField(max_length=20, null=True, default='')

    shuimian_shijian_jieshu = models.CharField(max_length=20, null=True, default='')
    #0:未知 1:肥大  2:瘦小 3： 有齿痕 4： 舌中有裂纹
    shezhi = models.CharField(max_length=50, null=True, default="")
    #0:未知 1:是  2:否
    chiheng_jianqing = models.IntegerField(max_length=2, null=True, default=0)
    #0:未知 1:红润  2:绛紫 3： 淡白 4： 暗红 5： 青色 6： 舌周围有红色圆点
    shese = models.CharField(max_length=50, null=True, default="")
    #0:未知 1:黄腻  2:白苔 3： 黑苔 4： 灰苔 5： 苔薄 6： 苔厚 7： 润 8：燥 9：腐 10： 腻 11: 剥落苔
    shetai = models.CharField(max_length=50, null=True, default="")

    #0:未知 1:有血丝 2:有黄斑 3： 干涩 4： 模糊 5： 不适
    yanjing = models.CharField(max_length=50, null=True, default="")
    yanjing_beizhu = models.CharField(max_length=200, null=True, default="")

    #0:未知 1： 正常 2:有麻木感 3:胀感 4： 冰凉5： 疼痛 6： 刺痛 7： 抽搐
    tuijiao_qingkuang = models.CharField(max_length=50, null=True, default="")
    tuijiao_buwei = models.CharField(max_length=200, null=True, default="")

    jiangtangyao_mingcheng = models.CharField(max_length=200, null=True, default="")
    jiangtangyao_jiliang = models.CharField(max_length=200, null=True, default="")
    #0:未知 1： 正常 2:减药 3:停用
    jiangtangyao_zhuangtai = models.IntegerField(max_length=2, null=True, default=0)

    yidaosu__mingcheng = models.CharField(max_length=200, null=True, default="")
    yidaosu_jiliang = models.CharField(max_length=200, null=True, default="")
    #0:未知 1：早 2:中 3:晚 4：睡前
    yidaosu_shiyong_qingkuang = models.IntegerField(max_length=2, null=True, default=0)
    #0:未知 1： 正常 2:减药 3:停用
    yidaosu_zhuangtai = models.IntegerField(max_length=2, null=True, default=0)

    jiangyayao_mingcheng = models.CharField(max_length=200, null=True, default="")
    jiangyayao_jiliang = models.CharField(max_length=200, null=True, default="")
    #0:未知 1： 正常 2:减药 3:停用
    jiangyayao_zhuangtai = models.IntegerField(max_length=2, null=True, default=0)

    jiangzhiyao_mingcheng = models.CharField(max_length=200, null=True, default="")
    jiangzhiyao_jiliang = models.CharField(max_length=200, null=True, default="")
    #0:未知 1： 正常 2:减药 3:停用
    jiangzhiyao_zhuangtai = models.IntegerField(max_length=2, null=True, default=0)

    #0:未知 1： 1号 2:2号 3:中号
    minyuecha = models.CharField(max_length=50, null=True, default="")
    minyuecha_yinyong_qingkuang = models.CharField(max_length=200, null=True, default="")

    #0:未知 1： 1号 2:2号 3:3号
    wuzisan = models.CharField(max_length=50, null=True, default="")
    wuzisan_yitian_cishu = models.IntegerField(max_length=5, null=True, default=0)
    wuzisan_yici = models.IntegerField(max_length=5, null=True, default=0)

    #0:未知 1： 会阴 2:关元 3:涌泉
    yuantangtie_tiefu_xuewei = models.CharField(max_length=50, null=True, default="")

    #0:未知 1： 金匮肾气丸 2:六味地黄丸 3:知柏地黄丸 4： 人参归脾丸 5： 肾源
    fuzhuyaowu = models.CharField(max_length=50, null=True, default="")
    #0:未知 1： 正常剂量 2:翻倍剂量
    fuzhuyaowu_fuyong_qingkuang = models.IntegerField(max_length=2, null=True, default=0)

    #0:未知 1： 是 2:否
    zhuixun_yuantang_shipu = models.IntegerField(max_length=2, null=True, default=0)
    zaocan_qingkuang = models.CharField(max_length=500, null=True, default="")
    wucan_qingkuang = models.CharField(max_length=500, null=True, default="")
    wancan_qingkuang = models.CharField(max_length=500, null=True, default="")

    #0:未知 1： 腹部推拿 2:经络疏通
    yuantangfa = models.IntegerField(max_length=2, null=True, default=0)
    yuantangshu_paojiao_wendu = models.IntegerField(max_length=5, null=True, default=0)
    yuantangshu_shijian = models.IntegerField(max_length=5, null=True, default=0)
    #0:未知 1： 不出汗 2:微汗 3： 正常 4： 大汗 5: 禁用
    yuantangshu_chuhan_qingkuang = models.IntegerField(max_length=5, null=True, default=0)

    yuantangguang_chuang_wendu = models.IntegerField(max_length=5, null=True, default=0)
    yuantangguang_tan_wendu= models.IntegerField(max_length=5, null=True, default=0)
    yuantangguang_shijian = models.IntegerField(max_length=5, null=True, default=0)
    #0:未知 1： 腿 2：腹部 3: 肚脐关元处 4： 背部 5： 胸十二椎以下
    yuantangguang_buwei = models.CharField(max_length=50, null=True, default="")
    #0:未知 1： 不出汗 2:微汗 3： 正常 4： 大汗 5: 禁用
    yuantangguang_chuhan_qingkuang = models.IntegerField(max_length=5, null=True, default=0)
    #0:未知 1：无 2：腿部 3： 腹部关元穴4： 背部
    yuantangguang_fuyao_qingkuang = models.CharField(max_length=50, null=True, default="")


    class Meta:
        db_table = 'ill_case'
