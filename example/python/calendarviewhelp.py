# -*- coding: utf-8 -*-
import datetime,time #,calendar

#----------------------------------------------------------------------
def addtime(date,d=0,h=0,m=0,s=0):
    """给传入的参数加上指定的时间"""
    diff= datetime.timedelta(days=d,hours=h,minutes=m,seconds=s)
    return date+diff

def get_day_of_week(d):
    """获取当前日期是所在星期的星期几，1代表星期一，0代表星期天"""
    return d.isoweekday() if d.isoweekday()<7 else 0 


class calendar_view_date_range():
    def __init__(self,viewtype,showday,weekstartday):
        """构造函数，通过视图类型，当前日期，星期开始时间计算视图的开始时间和结束时间
        和Python 传统计算方式不同，此处weekstartday是一个星期从哪一天开始，1代表星期一，0代表星期天
        """
        if(viewtype=="day"):
            self.start_day= showday
            self.end_day= datetime.datetime(showday.year,showday.month,showday.day,23,59,59)
        elif(viewtype=="week"):
            w = weekstartday-get_day_of_week(showday)            
            if(w>0):w=w-7
            self.start_day = addtime(showday,w)
            self.end_day= addtime(self.start_day,6,23,59,59)
        else:   
            first_day = datetime.datetime(showday.year,showday.month,1)
            w = weekstartday-get_day_of_week(first_day)
            if(w>0):w=w-7
            self.start_day = addtime(first_day,w)
            self.end_day = addtime(self.start_day,34)
         
            if (showday.year == self.end_day.year 
                and showday.month == self.end_day.month 
                and addtime(self.end_day,1).month == self.end_day.month):            
                self.end_day = addtime(self.end_day,7)                     
        
            self.end_day = addtime(self.end_day,0,23,59,59) 
            
            
            
            