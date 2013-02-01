require('date-utils');

var WEEK_START     = 0;

exports.GetCalendarViewFormat = function GetCalendarViewFormat(viewtype, showdate)
{
  var ret   = {};  
  var year  = showdate.getFullYear();
  var month = showdate.getMonth();
  var day   = showdate.getDate();
  var wday  = showdate.getDay();
  var date  = new Date(year,month,day);
  switch (viewtype)
  { 
    case "day": //日
      ret.start = date.clone() ;
      ret.end   = date.clone().add({milliseconds: 999,
                                    minutes: 59,
                                    hours: 23,
                                    seconds: 59});
      break;
    case "week": // 周            
      var index = WEEK_START ;//0                    
      var w = index - wday ;//0-1
      if (w > 0) w= w - 7;      
      ret.start = date.clone().addDays(w); 
      ret.end   = date.clone().add({milliseconds: 999,
                                    minutes: 59,
                                    hours: 23,
                                    seconds: 59,
                                    days:w+7});     
      break;
    case "month": // 月    
      var firstdate = new Date(year,month,1);     
      var index = WEEK_START     
      var w = index - firstdate.getDay() ;//0-1
      if (w > 0){
        w -= 7;
      }
      ret.start = firstdate.addDays(1+w); 
      ret.end   = ret.start.clone().addDays(34); 

      if (ret.end.getYear() == year && ret.end.getMonth() == month && 
         ret.end.setDate(ret.end.getDate()+1).getMonth() == ret.end.getMonth())
      {
         ret.end.addDays(7);
         ret.end = ret.end.setDate(ret.end.getDate()+7);
      }   
      ret.end.add({milliseconds: 999,
                    minutes: 59,
                    hours: 23,
                    seconds: 59}); 
    
      break;
  }
  return ret ;
}
