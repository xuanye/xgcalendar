# -*- coding: utf-8 -*-
import os,datetime
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

from django.utils import simplejson
from model import *
from jsonhelp import * #内置不支持Datetime的Json序列化，这个提供支持
from calendarviewhelp import *
from dateaccess import *


class MyCalendar(webapp.RequestHandler):
  def get(self):  
    template_values={} 
    path = os.path.join(os.path.dirname(__file__), os.path.join('views', 'mycalendar.htm'))
    html= template.render(path, template_values)
    self.response.out.write(html)
    
class GetCalViewData(webapp.RequestHandler):
  def post(self):
    showday=datetime.datetime.strptime(self.request.get("showdate"),"%Y-%m-%d")   
    clientzone=int(self.request.get("timezone"))
    viewtype=self.request.get("viewtype")
    serverzone = 0-time.timezone/3600
    zonediff = serverzone - clientzone;    
    viewdate = calendar_view_date_range(viewtype,showday,1)
    qstart = addtime(viewdate.start_day,h=zonediff)
    qend = addtime(viewdate.end_day,h=zonediff)
    dao = resp()
    callist = dao.query_calendars(qstart,qend) 
    jsondata = build_json_calendar_viewdata(qstart,qend,callist,True,None,zonediff)    
    self.response.headers['Content-Type']='application/json'
    self.response.out.write(simplejson.dumps(jsondata,cls=DatetimeJSONEncoder))
    
class QuickAddCal(webapp.RequestHandler):
  def post(self):    
    try:
      c = Calendar()
      c.subject = self.request.get("CalendarTitle")
      c.start_time = datetime.datetime.strptime(self.request.get("CalendarStartTime"),"%Y-%m-%d %H:%M") 
      c.end_time = datetime.datetime.strptime(self.request.get("CalendarEndTime"),"%Y-%m-%d %H:%M")       
      
##      c.start_time_stamp = get_date_stamp(c.start_time)
##      c.end_time_stamp = get_date_stamp(c.end_time)
      c.calendar_type =1
      c.category =-1
      c.is_all_day_event = self.request.get("IsAllDayEvent")=='1'
      c.time_zone = int(self.request.get("timezone"))  
      dao = resp()
      newid=dao.save_calendar(c)      
      msg={"IsSuccess":True,"Msg":"操作成功!","Data":str(newid)}
    except Exception,ex:
      msg={"IsSuccess":False,"Msg":"操作失败!","Data":str(ex)}
      
    self.response.headers['Content-Type']='application/json'
    self.response.out.write(simplejson.dumps(msg)) 
      
class QuickUpdateCal(webapp.RequestHandler):
  def post(self):
    try:     
      Id = self.request.get("calendarId");
      start_time =datetime.datetime.strptime(self.request.get("CalendarStartTime"),"%Y-%m-%d %H:%M") 
      end_time = datetime.datetime.strptime(self.request.get("CalendarEndTime"),"%Y-%m-%d %H:%M")  
      clientzone = int(self.request.get("timezone"))
      serverzone = 0-time.timezone/3600
      zonediff = serverzone - clientzone;    
      dao = resp()
      entity = dao.get_calendar(Id)
      entity.start_time = addtime(start_time,h=zonediff)
      entity.end_time = addtime(end_time,h=zonediff)
      entity.time_zone = clientzone;
      
      dao.save_calendar(entity) 
      msg={"IsSuccess":True,"Msg":"操作成功!"}
    except Exception,ex:
      msg={"IsSuccess":False,"Msg":"操作失败!","Data":str(ex)}
       
    self.response.headers['Content-Type']='application/json'
    self.response.out.write(simplejson.dumps(msg)) 
    
class QuickDeleteCal(webapp.RequestHandler):
  def post(self):
    try:    
      Id = self.request.get("calendarId");
      dao = resp()
      dao.delete_calendar(Id) 
      msg={"IsSuccess":True,"Msg":"操作成功!"}
    except Exception,ex:
      msg={"IsSuccess":False,"Msg":"操作失败!","Data":str(ex)}
      
    self.response.headers['Content-Type']='application/json'
    self.response.out.write(simplejson.dumps(msg))    
 
application = webapp.WSGIApplication([
                                        ('/cm/?', MyCalendar),
                                        ('/cm/GetCalViewData', GetCalViewData),
                                        ('/cm/QuickAddCal', QuickAddCal),
                                        ('/cm/QuickUpdateCal', QuickUpdateCal),
                                        ('/cm/QuickDeleteCal', QuickDeleteCal)
                                      ], debug=True)

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()
