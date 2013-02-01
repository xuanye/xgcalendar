using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AzureCalendarMvcWeb.Models
{
    public interface ICalendarService
    {
        /// <summary>
        /// Updates the calendar.
        /// </summary>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        int UpdateCalendar(Calendar data);
        /// <summary>
        /// Adds the calendar.
        /// </summary>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        int AddCalendar(Calendar data);
        /// <summary>
        /// Queries the calendar.
        /// </summary>
        /// <param name="st">The st.</param>
        /// <param name="ed">The ed.</param>
        /// <param name="useId">The use id.</param>
        /// <returns></returns>
        List<Calendar> QueryCalendars(DateTime st, DateTime ed, string useId);
        /// <summary>
        /// Gets the calendar.
        /// </summary>
        /// <param name="Id">The id.</param>
        /// <returns></returns>
        Calendar GetCalendar(int Id);
        /// <summary>
        /// Deletes the calendar.
        /// </summary>
        /// <param name="Id">The id.</param>
        /// <param name="userId">The user id.</param>
        /// <returns></returns>
        int DeleteCalendar(int Id,string userId);
    }
}
