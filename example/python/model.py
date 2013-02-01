# -*- coding: utf-8 -*-
import datetime
from google.appengine.ext import db


#Subject	主题
#Location       地点
#TimeZone       时区      
#Description    说明
#CalendarType   日程类型，1 个人，2 单位，3 系统
#StartTime      开始时间
#EndTime        结束时间
#IsAllDayEvent  是否全天日程
#HasAttachment  是否有附件
#Category       分类 
#InstanceType   示例类型
#Attendees      参与人 
#RecurringRule  循环规则
#Last_Update_Account      最后更新人账号
#Last_Update_Name         最后更新人姓名
#Last_Update_Time         最后更新时间
class Calendar(db.Model):
  subject = db.StringProperty()
  location = db.StringProperty()
  time_zone = db.IntegerProperty()
  description = db.StringProperty()
  calendar_type= db.IntegerProperty(choices=set([1, 2, 3]))
  start_time = db.DateTimeProperty()
  end_time = db.DateTimeProperty()
  is_all_day_event= db.BooleanProperty()
  has_attachment = db.BooleanProperty()
  category= db.IntegerProperty()
  instance_type = db.IntegerProperty(choices=set([1, 2, 3]))
  attendees = db.StringProperty()
  recurring_rule = db.StringListProperty()
  last_update_account = db.StringProperty()
  last_update_name= db.StringProperty()
  last_update_time= db.DateTimeProperty(auto_now=True)