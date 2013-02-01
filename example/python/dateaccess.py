# -*- coding: utf-8 -*-
from google.appengine.ext import db
from model import *


########################################################################
class resp:
    """"""
    #----------------------------------------------------------------------
    def __init__(self):
        """Constructor"""
##    (start_time>=:1 and start_time<:2) or 
##    (start_time<:1 and end_time>:1)
##    好像可以进化为 start_time<:2 and end_time>:1
    #----------------------------------------------------------------------
    def query_calendars (self,qstart,qend):
        """根据开始时间和结束时间查询日程信息"""
        return db.GqlQuery("SELECT * FROM Calendar where start_time>=:1 and start_time<:2 order by start_time,end_time",qstart,qend).fetch(1000)

    #----------------------------------------------------------------------
    def save_calendar(self,data):
        """"保存日程"""
        return data.put()
    
    #----------------------------------------------------------------------
    def get_calendar(self,key_value):
        """根据key值获取日程信息"""
        return db.get(db.Key(key_value)) 
    
    #----------------------------------------------------------------------
    def delete_calendar(self,key_value):
        """根据键值删除日程信息"""
        return db.delete(db.Key(key_value))