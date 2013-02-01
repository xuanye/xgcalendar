using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AzureCalendarMvcWeb.Models
{
    public class JsonError
    {
        public JsonError(string code, string msg)
        {
            ErrorCode = code;
            msg = ErrorMsg;
        }
       
        public string ErrorCode { get; private set; }
        public string ErrorMsg { get; private set; }
    }
}
