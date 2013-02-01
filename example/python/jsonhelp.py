# -*- coding: utf-8 -*-
import datetime,time
import decimal
from django.utils import simplejson

def safe_new_datetime(d):
    kw = [d.year, d.month, d.day]
    if isinstance(d, datetime.datetime):
        kw.extend([d.hour, d.minute, d.second, d.microsecond, d.tzinfo])
    return datetime.datetime(*kw)

def safe_new_date(d):
    return datetime.date(d.year, d.month, d.day)

def addtime(date,d=0,h=0,m=0,s=0):
    """给传入的参数加上指定的时间"""
    diff= datetime.timedelta(days=d,hours=h,minutes=m,seconds=s)
    return date+diff
#----------------------------------------------------------------------
def get_date_stamp(d):
    """获取当前日期和1970年1月1日之间的毫秒数"""
    return int(time.mktime(d.timetuple())*1000)
    
def get_ms_json_date_format(d):
    """获取MS Ajax Json Data Format /Date(@tickets)/"""
    stamp=get_date_stamp(d);
    return r"/Date("+str(stamp)+")/"
    
class DatetimeJSONEncoder(simplejson.JSONEncoder):
    """可以序列化时间的JSON"""
    #DATE_FORMAT = "%Y-%m-%d"
    TIME_FORMAT = "%H:%M:%S"
    def default(self, o):
        if isinstance(o, datetime.datetime):
            d = safe_new_datetime(o)
            return get_ms_json_date_format(d)
        elif isinstance(o, datetime.date):
            d = safe_new_date(o)
            return get_ms_json_date_format(d)
        elif isinstance(o, datetime.time):
            return o.strftime(self.TIME_FORMAT)
        elif isinstance(o, decimal.Decimal):
            return str(o)
        else:
            return super(DatetimeJSONEncoder, self).default(o)
        
#----------------------------------------------------------------------
def convert_callist_to_strlist(callist,zonediff):
    """将CalendarList转换成json元组"""
    strlist=[]
    for a in callist:
        s = addtime(a.start_time,h=zonediff)
        e = addtime(a.end_time,h=zonediff)
        strlist.append([str(a.key())
                        ,a.subject,
                        s,
                        e,
                        1 if a.is_all_day_event else 0,
                        0 if s.strftime("%y%m%d")==e.strftime("%y%m%d") else 0,
                        1,
                        a.category,1,
                        a.attendees,
                        a.location
                        ])
    return strlist;
#----------------------------------------------------------------------
def build_json_calendar_viewdata(start,end,events,issort=True,error=None,zonediff=8):
    """创建日程视图的json对象"""
    jsonlist =convert_callist_to_strlist(events,zonediff) 
    return {"start":start,"end":end,"error":error,"issort":issort,"events":jsonlist}

