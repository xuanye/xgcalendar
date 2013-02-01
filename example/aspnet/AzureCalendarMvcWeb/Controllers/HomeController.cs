using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading;
using System.Globalization;


namespace AzureCalendarMvcWeb.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
              
        public ActionResult Index()
        {          
            return View();
        }
        public ActionResult Test()
        {
            return View();
        }

        public ActionResult SetLang(string lang)
        {
            if (string.IsNullOrEmpty(lang))
            {
                lang = "en-US";
            }
            Session["Culture"] = lang;           
            return RedirectToAction("MyCalendar", "CM");
        }
    }
}
