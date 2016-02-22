#coding=utf-8
import datetime,time

from datetime import date, timedelta

def get_first_day(dt, d_years=0, d_months=0):
    # d_years, d_months are "deltas" to apply to dt
    y, m = dt.year + d_years, dt.month + d_months
    a, m = divmod(m-1, 12)
    return date(y+a, m+1, 1)

def get_last_day(dt):
    return get_first_day(dt, 0, 1) + timedelta(-1)

def string_to_date(str):
    sdate =time.strptime(str,'%Y-%m-%d')
    sdate = datetime.date(*sdate[0:3])
    return sdate

def string_to_datetime(str):
    return datetime.datetime.strptime(str,'%Y-%m-%d %H:%M:%S')

def string_to_ymd_datetime(str):
    return datetime.datetime.strptime(str,'%Y-%m-%d')

def string_to_ym_datetime(str):
    return datetime.datetime.strptime(str,'%Y-%m')

def string_to_ym_datetime_add(str):
    return datetime.datetime.strptime(str,'%Y-%m')

def string_to_time(str):
    stime = time.strptime(str,'%H:%M:%S')
    return datetime.time(*stime[3:6])

def date_to_string(t):
    if type(t)!=datetime.date:
        return ''
    return t.strftime('%Y-%m-%d')

def datetime_to_string(t):
    if type(t)!=datetime.datetime:
        return ''
    return t.strftime('%Y-%m-%d %H:%M:%S')

def time_to_string(t):
    if type(t)!=datetime.time:
        return ''
    return t.strftime('%H:%M:%S')

#数字转为月份表示
def month_to_standard(i):
    if i < 10:
        temp_month = '0%d'%i
    else:
        temp_month = str(i)
    return temp_month

def get_year(yyyymm_str):
    try:
        return (int)(yyyymm_str.split('-')[0])
    except Exception:
        return None

def get_year_seq(start_year,end_year):
    offset = end_year - start_year
    if offset >= 1:
        seq = [start_year]
        for i in range(0,offset):
            seq.append(start_year+i+1)
        return seq
    else:
        return [start_year]

def get_year_month_seq(year):
    year_month_seq = []
    for month in range(1,13):
        if month < 10:
            month = '0%s'%month
        year_month_seq.append('%s-%s'%(year,month))
    return year_month_seq


def get_year_list(end_year, year_count):
    if year_count > 1:
        seq = []
        for i in range(year_count):
            seq.append(end_year - i)
        return sorted(seq)
    else:
        return [end_year]

def get_cur_year():
    cur_date = datetime.datetime.now()
    return cur_date.strftime('%Y')

def get_cur_year_month():
    cur_date = datetime.datetime.now()
    return cur_date.strftime('%Y-%m')

#处理年份序列，全部加上年，供chart的显示
def handle_year_seq(year_seq):
    chart_year_seq = []
    for year in year_seq:
        chart_year_seq.append('%s年'%(year))
    return chart_year_seq



