using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SubSonic.Repository;

namespace AzureCalendarMvcWeb.Models
{
    public class CalendarService:ICalendarService
    {

        private SimpleRepository _rep = new SimpleRepository("AzureCalendarDb", SimpleRepositoryOptions.Default);
        #region ICalendarRepository 成员

        public int UpdateCalendar(Calendar data)
        {          
            return _rep.Update(data);
        }

        public int AddCalendar(Calendar data)
        {           
            _rep.Add(data);
            return data.Id;
        }

        public List<Calendar> QueryCalendars(DateTime st, DateTime ed, string useId)
        {
            var list =from n in _rep.All<Calendar>()                
                      where n.UPAccount==useId &&  (
                      (n.StartTime >= st && n.StartTime < ed)  || 
                      (n.EndTime >= st && n.EndTime < ed) ||
                      (n.StartTime<st && n.EndTime >ed)
                      )
                      orderby n.StartTime   
                      select  n ;
                    
            return list.ToList();
        }

        public Calendar GetCalendar(int Id)
        {
            return _rep.Single<Calendar>(Id);
        }

        public int DeleteCalendar(int Id,string uId)
        {
           return  _rep.Delete<Calendar>(Id);
        }

        #endregion
    }
}
