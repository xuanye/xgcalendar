using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using AzureCalendarMvcWeb.Helps;
using AzureCalendarMvcWeb.Models;

namespace AzureCalendarMvcWeb.Controllers
{   
    public class CMController : BaseController
    {
        private readonly ICalendarService _service;
        public CMController()
        {
           
            _service = new CalendarService();           
        }

      
        public CMController(ICalendarService service)
        {           
            _service = service;
        }
      
        public ActionResult ViewCalendar(int? id)
        {
            Calendar calendar = id.HasValue ? _service.GetCalendar(id.Value) : new Calendar();
            return View(calendar);
        }

        public ActionResult EditCalendar(int? id, string start,string end, int? isallday)
        {
            int p = 60 - DateTime.Now.Minute;
            if (p >30) p = p-30;
            DateTime now = DateTime.Now.AddMinutes(p);
            Calendar calendar;

            if (id.HasValue && id > 0)
            {
                calendar = _service.GetCalendar(id.Value);
                int clientzone = calendar.MasterId.HasValue ? calendar.MasterId.Value : 8;
                int serverzone = TimeHelper.GetTimeZone();
                var zonediff = clientzone - serverzone;
                //时区转换
                calendar.StartTime = calendar.StartTime.AddHours(zonediff);
                calendar.EndTime = calendar.EndTime.AddHours(zonediff);
            }
            else
            {
                calendar = new Calendar();
                calendar.StartTime = Convert.ToDateTime(start);
                calendar.EndTime = Convert.ToDateTime(end);
                calendar.IsAllDayEvent = isallday.HasValue && isallday.Value == 1;
              
            }
            return View(calendar);
        }

        public ActionResult EnCodeMC()
        {
            CalendarViewFormat format = new CalendarViewFormat(CalendarViewType.week, DateTime.Now, DayOfWeek.Monday);
            List<Calendar> list = _service.QueryCalendars(format.StartDate, format.EndDate, UserId);
            return View(list);
        }
        
        public ActionResult MyCalendar()
        {
         
           CalendarViewFormat  format= new CalendarViewFormat(CalendarViewType.week, DateTime.Now, DayOfWeek.Monday);
           List<Calendar> list = _service.QueryCalendars(format.StartDate, format.EndDate, UserId);

           return View(list);
        }
    

        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult GetPersonalCalViewData(FormCollection form)
        {

            CalendarViewType viewType = (CalendarViewType)Enum.Parse(typeof(CalendarViewType), form["viewtype"]);
            string strshowday = form["showdate"];
            DateTime showdate;
            int clientzone = Convert.ToInt32(form["timezone"]);
            int serverzone = TimeHelper.GetTimeZone();
            var zonediff = serverzone - clientzone;
            bool b = DateTime.TryParse(strshowday, out showdate);
            if (!b)
            {
                var ret = new JsonCalendarViewData(new JsonError("NotVolidDateTimeFormat", this.Resource("lang,notvoliddatetimeformat")));
                return Json(ret);
            }
            var format = new CalendarViewFormat(viewType, showdate, DayOfWeek.Monday);
            var qstart = format.StartDate.AddHours(zonediff);
            var qend = format.EndDate.AddHours(zonediff);
            List<Calendar> list = _service.QueryCalendars(qstart, qend, UserId);
            var data = new JsonCalendarViewData(ConvertToStringArray(list), format.StartDate, format.EndDate);
            return Json(data);
        }

        private static List<object[]> ConvertToStringArray(ICollection<Calendar> list)
        {
            List<object[]> relist = new List<object[]>();

            if (list != null && list.Count > 0)
            {
                int serverzone = TimeHelper.GetTimeZone();
                foreach (Calendar entity in list)
                {

                    int clientzone = entity.MasterId.HasValue ? entity.MasterId.Value : 8;
                  
                    var zonediff = clientzone - serverzone;
                    //时区转换
                    var s = entity.StartTime.AddHours(zonediff);
                    var e = entity.EndTime.AddHours(zonediff);
                    var attends = entity.AttendeeNames + (string.IsNullOrEmpty(entity.OtherAttendee) ? "" : ","+entity.OtherAttendee);
                    relist.Add(new object[] { entity.Id, 
                       entity.Subject, 
                       entity.StartTime, 
                       entity.EndTime, 
                       entity.IsAllDayEvent ?1: 0, 
                       s.ToShortDateString() != e.ToShortDateString() ?1 : 0,
                       entity.InstanceType== 2?1:0,
                       string.IsNullOrEmpty(entity.Category)?-1:Convert.ToInt32(entity.Category)
                       ,1,
                       entity.Location,attends });
                }
            }
            return relist;
        }
    
        /// <summary>
        /// Quicks the add personal cal.
        /// </summary>
        /// <param name="form">The form.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult QuickAddPersonalCal(FormCollection form)
        {
            JsonReturnMessages r = new JsonReturnMessages();
            string subject = form["CalendarTitle"];
            string strStartTime = form["CalendarStartTime"];
            string strEndTime = form["CalendarEndTime"];
            string isallday = form["IsAllDayEvent"];
            int clientzone = Convert.ToInt32(form["timezone"]);
            int serverzone = TimeHelper.GetTimeZone();
            var zonediff = serverzone - clientzone;
            DateTime st;
            DateTime et;           
            
            bool a = DateTime.TryParse(strEndTime, out et);
            bool b = DateTime.TryParse(strStartTime, out st);
            if (!b)
            {
                r.IsSuccess = false;
                r.Msg = this.Resource("lang,notvoliddatetimeformat")+":" + strStartTime;
                return Json(r);
            }
            if (!a)
            {
                r.IsSuccess = false;
                r.Msg = this.Resource("lang,notvoliddatetimeformat")+":" + strEndTime;
                return Json(r);                
            }           

            try
            {
             
                Calendar entity = new Calendar();
                entity.CalendarType = 1;
                entity.InstanceType = 0;
                entity.Subject = subject;
                entity.StartTime = st.AddHours(zonediff);
                entity.EndTime = et.AddHours(zonediff);
                entity.IsAllDayEvent = isallday == "1";
                entity.UPAccount = UserId;
                entity.UPName = this.Resource("lang,admin");
                entity.UPTime = DateTime.Now;
                entity.MasterId = clientzone;
                r.Data = _service.AddCalendar(entity);
                r.IsSuccess = true;
                r.Msg = this.Resource("lang,successmsg");
                 
            }
            catch (Exception ex)
            {
                r.IsSuccess = false;
                r.Msg = ex.Message;
            }
            return Json(r);
        }

        /// <summary>
        /// Quicks the update personal cal.
        /// </summary>
        /// <param name="form">The form.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult QuickUpdatePersonalCal(FormCollection form)
        {
            JsonReturnMessages r = new JsonReturnMessages();
            string Id = form["calendarId"];
            string strStartTime = form["CalendarStartTime"];
            string strEndTime = form["CalendarEndTime"];
            int clientzone = Convert.ToInt32(form["timezone"]);
            int serverzone = TimeHelper.GetTimeZone();
            var zonediff = serverzone - clientzone;
            DateTime st,et;
          
            bool a = DateTime.TryParse(strStartTime, out st);
            bool b = DateTime.TryParse(strEndTime, out et);
            if (!a || !b)
            {
                r.IsSuccess = false;
                r.Msg =this.Resource("lang,notvoliddatetimeformat")+":" + strStartTime;
                return Json(r);
            }
            try
            {
                Calendar c = _service.GetCalendar(Convert.ToInt32(Id));
                c.StartTime = st.AddHours(zonediff);
                c.EndTime = et.AddHours(zonediff);
                c.MasterId = clientzone;
                _service.UpdateCalendar(c);
                r.IsSuccess = true;
                r.Msg = this.Resource("lang,successmsg");
            }
            catch (Exception ex)
            {
                r.IsSuccess = false;
                r.Msg = ex.Message;
            }
            return Json(r);
        }

        /// <summary>
        /// 快速删除个人日程
        /// </summary>
        /// <param name="form">The form.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult QuickDeletePersonalCal(FormCollection form)
        {
            JsonReturnMessages r = new JsonReturnMessages();
            string id = form["calendarId"];
            if (string.IsNullOrEmpty(id))
            {
                r.IsSuccess = false;
                r.Msg = this.Resource("lang,parameterinvalid","Id");
                return Json(r);
            }
            try
            {
                _service.DeleteCalendar(Convert.ToInt32(id),base.UserId);
                r.IsSuccess = true;
                r.Msg = this.Resource("lang,successmsg");
            }
            catch (Exception ex)
            {
                r.IsSuccess = false;
                r.Msg = ex.Message;
            }
            return Json(r);
        }

        /// <summary>
        /// Saves the calendar.
        /// </summary>
        /// <param name="Id">The id.</param>
        /// <param name="data">The data.</param>
        /// <param name="form">The form.</param>
        /// <returns></returns>
        [AcceptVerbs( HttpVerbs.Post)]
        public JsonResult SaveCalendar(int Id,FormCollection form)
        {
            JsonReturnMessages r = new JsonReturnMessages();
            try
            {
                Calendar data;
                if (Id > 0)
                {
                    data = _service.GetCalendar(Id);       

                }
                else
                {
                    data = new Calendar();
                }
                data.Subject = form["Subject"];
                data.Location = form["Location"];
                data.Description = form["Description"];
                data.IsAllDayEvent = form["IsAllDayEvent"] !="false";
                data.Category = form["colorvalue"];
                string sdate = form["stpartdate"];
                string edate = form["etpartdate"];
                string stime = form["stparttime"];
                string etime = form["etparttime"];
                int clientzone = Convert.ToInt32(form["timezone"]);
                int serverzone = TimeHelper.GetTimeZone();
                var zonediff = serverzone - clientzone;
             
                if (data.IsAllDayEvent)
                {
                    data.StartTime = Convert.ToDateTime(sdate).AddHours(zonediff);
                    data.EndTime = Convert.ToDateTime(edate).AddHours(23).AddMinutes(59).AddSeconds(59).AddHours(zonediff);
                }
                else
                {
                    data.StartTime = Convert.ToDateTime(sdate + " " + stime).AddHours(zonediff);
                    data.EndTime = Convert.ToDateTime(edate + " " + etime).AddHours(zonediff);
                }
                if (data.EndTime <= data.StartTime)
                {
                    throw new Exception(this.Resource("lang,starttimegreatthanendtime"));
                }
                data.CalendarType = 1;
                data.InstanceType = 0;
                data.MasterId = clientzone;
                data.UPAccount = UserId;
                data.UPName = this.Resource("lang,admin");
                data.UPTime = DateTime.Now;

                if (data.Id > 0)
                {
                    _service.UpdateCalendar(data);
                }
                else {
                    _service.AddCalendar(data);
                }
                r.IsSuccess = true;
                r.Msg = this.Resource("lang,successmsg");
            }
            catch (Exception ex)
            {
                r.IsSuccess = false;
                r.Msg = ex.Message;
            }
            return Json(r);
        }

        
    }
}
