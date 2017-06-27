using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AzureCalendarMvcWeb.Models
{
    public class JsonCalendarViewData{
        public JsonCalendarViewData(List<object[]> eventList, DateTime startDate, DateTime endDate)
        {
            events = eventList;
            start = startDate;
            end = endDate;
        }

        public JsonCalendarViewData(List<object[]> eventList, DateTime startDate, DateTime endDate, bool isSort)
        {
            /* obsolete function */
            start = startDate;
            end = endDate;
            events = eventList;
        }
        public JsonCalendarViewData(JsonError jsonError)
        {
            error = jsonError;
        }
        public List<object[]> events { get; private set; }
        public bool issort
        {
            /* obsolete */
            get;
            private set;
        }

        public DateTime start { get; private set; }
        public DateTime end { get; private set; }
        public JsonError error { get; private set; }
    }
}
