var calendardao = require("../libs/calendardao");
var util        = require('util');
require('date-utils');
var viewhelper = require("../libs/viewhelper");
var i18n = require('i18n');

var TIMEZONE_INDEX = new Date().getTimezoneOffset()/60 * -1;

exports.index = function(req,res){   
    //console.log(i18n.getLocale());
    var lang = req.query.lang;
    if(lang=='zh-cn')
    {
       i18n.setLocale('zh-cn');
    }
    else
    {
       i18n.setLocale('en-us');
    }
    res.render('index',{title:__('title')});   
}

exports.query = function(req,res) {
    var ret        = {} ;
    var viewtype   = req.body.viewtype; // week,month,day
    //console.info(viewtype);
    var strshowday = req.body.showdate; // 当前是那一天 
    var clientzone = req.body.timezone;
    var serverzone = TIMEZONE_INDEX;
    var zonediff   = serverzone-clientzone ; 
    var showdaytimp  = Date.parse(strshowday,__("dateparseformat"));//__("dateformat"));//TODO：日期格式  
    if( isNaN(showdaytimp) )
    {
        ret.error = {"ErrorCode":"NotVolidDateTimeFormat","ErrorMsg":__("notvoliddatetimeformat")};
        res.json(ret);
    }
    else
    {
        var showday = new Date(showdaytimp);
        var timestamp   = showday.getTime();
        var dataformart = viewhelper.GetCalendarViewFormat(viewtype,showday);
      
        var qstart      = dataformart.start.clone().addHours(zonediff);       
        var qend        = dataformart.end.clone().addHours(zonediff); 
        ret.start       = util.format("\/Date(%d)\/",dataformart.start.getTime());
        ret.end         = util.format("\/Date(%d)\/",dataformart.end.getTime());
        ret.error       = null;
        calendardao.QueryCalendar(qstart,qend,'demo',zonediff,function(dbdata){
           ret.events = [];
           for(var i=0,l=dbdata.length;i<l;i++)
            {         
                //debugger;
                //[主键,标题,开始时间,结束时间，是否全天日程，是否跨天日程,是否循环日程,颜色主题,是否有权限,地点,参与人]      
                ret.events.push([dbdata[i].Id,
                    dbdata[i].Subject,
                    util.format("\/Date(%d)\/",dbdata[i].StartTime.getTime()),
                    util.format("\/Date(%d)\/",dbdata[i].EndTime.getTime()),
                    dbdata[i].IsAllDayEvent[0],//全天日程
                    dbdata[i].StartTime.toYMD()==dbdata[i].EndTime.toYMD()?0:1,//是否跨天日程
                    1, //是否循环日程
                    parseInt(dbdata[i].Category),
                    1,//是否有权限
                    dbdata[i].Location,
                    dbdata[i].Attendees
                    
                ]);
            }            
          
            var respstr =JSON.stringify(ret);
            respstr = respstr.replace(/\//ig,"\\\/");        
            res.set('Content-Type', 'application/json; charset=utf-8');
            res.send(respstr);
            //res.json(ret);
        },function(err) {
            ret.error = {"ErrorCode":"DBError","ErrorMsg":__("dberror")};
            res.json(ret);
        });    
    }
}

exports.editview  = function(req,res){
  var id = req.params.id;
  var eventdata={};
  if(id !=null)
  {
     id = parseInt(id);     
  }
  else
  {
    id  = -1;
  }
  if(id>0)
  {
     //修改
      calendardao.GetCalendar(id,'demo',function(dbdata){
         if(dbdata && dbdata.length>0)
         {
            eventdata = dbdata[0];
            eventdata.IsAllDayEvent = eventdata.IsAllDayEvent[0]==1;
            var diffzone = eventdata.MasterId-TIMEZONE_INDEX;
            eventdata.StartTime.addHours(diffzone);
            eventdata.EndTime.addHours(diffzone);
            eventdata.startdate = eventdata.StartTime.toFormat(__("dateformat"));
            eventdata.starttime = eventdata.StartTime.toFormat("HH24:MI");
            eventdata.enddate   = eventdata.EndTime.toFormat(__("dateformat"));
            eventdata.endtime   = eventdata.EndTime.toFormat("HH24:MI");
            res.render("editcal",{title:__("edittitle"),data:eventdata});
         }
         else
         {
            res.send(__("parameterinvalid","id"));
         }         
      },function(err) {           
          res.send(__("dberror"));
      });
    
  }
  else
  {
    //新增 
    eventdata.Id = id;
    if(req.query.start)
    {
      eventdata.StartTime = new Date(Date.parse(req.query.start,__("datefullparseformat"))); //new Date(req.query.start);
    }
    if(req.query.end)
    {
      eventdata.EndTime = new Date(Date.parse(req.query.end,__("datefullparseformat"))); //new Date(req.query.end);
    }
    if(req.query.title)
    {
      eventdata.Subject =req.query.title;
    }
    if(!eventdata.StartTime)
    {
      eventdata.StartTime = new Date();
    }
    if(!eventdata.EndTime)
    {
      eventdata.EndTime = eventdata.StartTime.clone().addHours(2);
    }
    eventdata.startdate = eventdata.StartTime.toFormat(__("dateformat"));
    eventdata.starttime = eventdata.StartTime.toFormat("HH24:MI");
    eventdata.enddate   = eventdata.EndTime.toFormat(__("dateformat"));
    eventdata.endtime   = eventdata.EndTime.toFormat("HH24:MI");
    if(!eventdata.Subject)
    {
      eventdata.Subject = __("defaultsubject");
    }
    eventdata.Category = '1';
    eventdata.IsAllDayEvent = req.query.isallday=='1';
    res.render("editcal",{title:__("edittitle"),data:eventdata});
  }
 
}

exports.save = function(req,res){
  //console.log(req.params.id);
  var id = req.params.id;
  var ret       = {};
  // 校验
  req.assert('Subject', __("parameterinvalid","Subject")).notEmpty();
  req.assert('Category', __("parameterinvalid","Category")).isInt();
  req.assert('TimeZone', __("parameterinvalid","TimeZone")).isInt(); 

  var strStartDate = req.body.StartDate;
  var strStartTime = req.body.StartTime;
  var strEndDate = req.body.EndDate;
  var strEndTime = req.body.EndTime;
  var starttimetimp = Date.parse(strStartDate +' '+strStartTime,__("datefullparseformat"));
  var endtimetimp = Date.parse(strEndDate +' '+strEndTime,__("datefullparseformat"));

  if(isNaN(starttimetimp))
  {
    ret.IsSuccess = false;
    ret.Msg       = __("parameterinvalid","StartTime");
    res.json(ret);
    return;
  }
  if(isNaN(endtimetimp))
  {
   ret.IsSuccess = false;
    ret.Msg       =  __("parameterinvalid","EndTime");
    res.json(ret);
    return;
  }

  var errors = req.validationErrors();
  if(errors && errors.length>0)
  {
    var ermsg = [];
    for(var i=0;i<errors.length;i++)
    {
      ermsg.push(errors[i].msg);
    }
    ret.IsSuccess = false;
    ret.Msg       = ermsg.join("\n");
    res.json(ret);
    return;
  }

  //脚本攻击
  req.sanitize('Subject').xss();
  req.sanitize('Location').xss();
  req.sanitize('Description').xss();
  req.sanitize('AttendeeNames').xss();
  
  var starttime = new Date(starttimetimp);
  var endtime   = new Date(endtimetimp);
  var data      = {};
  data.Subject = req.body.Subject;
  data.Location = req.body.Location;
  data.Category = req.body.Category;
  data.Description = req.body.Description;
  data.AttendeeNames = req.body.AttendeeNames;

  data.IsAllDayEvent =  req.body.IsAllDayEvent=="True";

  var clientzone = req.body.TimeZone;
  var serverzone = TIMEZONE_INDEX;
  var zonediff   = serverzone-clientzone ; 
  if (data.IsAllDayEvent)
  {
    data.StartTime = starttime.addHours(zonediff);
    data.EndTime = endtime.add({
                                    minutes: 59,
                                    hours: 23+zonediff,
                                    seconds: 59
                                });
  }
  else
  {
    data.StartTime = starttime.addHours(zonediff);
    data.EndTime = endtime.addHours(zonediff);
  }
  //console.log(data);
  if(data.EndTime <= data.StartTime)
  {
    ret.IsSuccess = false;
    ret.Msg       = __("starttimegreatthanendtime");
    res.json(ret);
    return;
  }


  data.HasAttachment = false;  
  data.InstanceType  = 0;
  data.UPAccount     = 'demo';
  data.UPName        = 'demo';
  data.UPTime        = new Date();
  //data.Attendees     = "刘德华,关之琳";
  //data.Location      = '宝芝林';
  data.MasterId      = clientzone ;
  
  if(id && id >0)
  {
    calendardao.UpdateCalendar(id,'demo',data,function(rcount){
          if(rcount>0)
          {
            ret.IsSuccess = true;
            ret.Msg       = __("successmsg");         
          }  
          else
          {
            ret.IsSuccess = false;
            ret.Msg       = __("defaulterrormsg");      
          }  
          res.json(ret);
        },function(err) {
          ret.IsSuccess = false;
          ret.Msg = __("dberror");
          res.json(ret);
    });
  }
  else
  {
    calendardao.addCalendar(data, function(newid){        
          if(newid>0)
          {
            ret.IsSuccess = true;
            ret.Msg       = __("successmsg");  
            ret.Data      = newid   
          }  
          else
          {
            ret.IsSuccess = false;
            ret.Msg       = __("defaulterrormsg");        
          }  
          res.json(ret);
        },function(err) {
              ret.IsSuccess = false;
              ret.Msg = __("dberror");
              res.json(ret);
    });
  }
}
exports.add = function(req,res){
    var ret           = {};
    var data          = {};
    data.Subject      = req.body.CalendarTitle
    var strStartTime  = req.body.CalendarStartTime;
    var strEndTime    = req.body.CalendarEndTime;
    var isallday      = req.body.IsAllDayEvent ;
    var clientzone    = req.body.timezone;
    var serverzone    = TIMEZONE_INDEX;
    var zonediff      = serverzone-clientzone ; 
    
    data.CalendarType = 1;
    var starttimp    = Date.parse(strStartTime,__("datefullparseformat"));//new Date(strStartTime);
    var endtimp      = Date.parse(strEndTime,__("datefullparseformat"));

    if( isNaN(starttimp)) 
    {
      ret.IsSuccess = false;
      ret.Msg       = __("parameterinvalid","StartTime");
      res.json(ret);
      return;
    }
    if( isNaN(endtimp) )
    {
      ret.IsSuccess = false;
      ret.Msg       = __("parameterinvalid","EndTime"); 
      res.json(ret);
      return;
    }
    data.StartTime    = new Date(starttimp);
    data.EndTime      = new Date(endtimp);
    //时区偏差
    data.StartTime.addHours(zonediff);
    data.EndTime.addHours(zonediff);
    
    data.IsAllDayEvent = isallday=="1";
    data.HasAttachment = false;
    data.Category      = "1";
    data.InstanceType  = 0;
    data.UPAccount     = 'demo';
    data.UPName        = 'demo';
    data.UPTime        = new Date();
    //data.Attendees     = "刘德华,关之琳";
    //data.Location      = '宝芝林';
    data.MasterId      = clientzone ;

    calendardao.addCalendar(data, function(id){        
        if(id>0)
        {
          ret.IsSuccess = true;
          ret.Msg       = __("successmsg");
          ret.Data      = id   
        }  
        else
        {
          ret.IsSuccess = false;
          ret.Msg       = __("defaulterrormsg");         
        }  
        res.json(ret);
    },function(err) {
            ret.IsSuccess = false;
            ret.Msg = __("dberror");
            res.json(ret);
        })
}
exports.update =function(req,res){
    var ret         = {};
    var data        = {};
    var id          = req.body.calendarId ;
    if(!/[\d+]/ig.test(id))
    {
      ret.IsSuccess = false;
      ret.Msg       = __("parameterinvalid","Id");
      res.json(ret);
      return;
    }
    var strStartTime = req.body.CalendarStartTime;
    var strEndTime  = req.body.CalendarEndTime;
    var starttimp    = Date.parse(strStartTime,__("datefullparseformat"));//new Date(strStartTime);
    var endtimp      = Date.parse(strEndTime,__("datefullparseformat"));

    if( isNaN(starttimp))
    {
      ret.IsSuccess = false;
      ret.Msg       = __("parameterinvalid","StartTime");
      res.json(ret);
      return;
    }
    if( isNaN(endtimp))
    {
      ret.IsSuccess = false;
      ret.Msg       = __("parameterinvalid","EndTime"); 
      res.json(ret);
      return;
    }
    data.StartTime    = new Date(starttimp);
    data.EndTime      = new Date(endtimp);
    
    var clientzone    = req.body.timezone;
    var serverzone    = TIMEZONE_INDEX;
    var zonediff      = serverzone-clientzone 
    //时区偏差
    data.StartTime.addHours(zonediff);
    data.EndTime.addHours(zonediff);

    calendardao.UpdateCalendar(id,'demo',data,function(rcount){
        if(rcount>0)
        {
          ret.IsSuccess = true;
          ret.Msg       = __("successmsg");    
        }  
        else
        {
          ret.IsSuccess = false;
          ret.Msg       = __("defaulterrormsg");     
        }  
        res.json(ret);
    },function(err) {
            ret.IsSuccess = false;
            ret.Msg = __("dberror");
            res.json(ret);
        });
}
exports.delete =function(req,res){
    var ret         = {};
    var data        = {};
    var id          = req.body.calendarId ;
    if(!/[\d+]/ig.test(id))
    {
      ret.IsSuccess = false;
      ret.Msg       = __("parameterinvalid","Id");
      res.json(ret);
      return;
    }
    calendardao.DeleteCalendar(id,'demo',function(rcount){
        if(rcount>0)
        {
          ret.IsSuccess = true;
          ret.Msg       = __("successmsg");        
        }  
        else
        {
          ret.IsSuccess = false;
          ret.Msg       = __("defaulterrormsg");      
        }  
        res.json(ret);
    },function(err) {
            ret.IsSuccess = false;
            ret.Msg = __("dberror");
            res.json(ret);
        }); 
}


