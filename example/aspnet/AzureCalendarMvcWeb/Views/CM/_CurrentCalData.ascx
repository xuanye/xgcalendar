<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<AzureCalendarMvcWeb.Models.Calendar>>" %>
<%@ Import Namespace="AzureCalendarMvcWeb.Helps"%>
var __CURRENTDATA=[<% 
    if (ViewData.Model != null && ViewData.Model.Count > 0)
    {
        for (int i = 0; i < ViewData.Model.Count; i++)
        {var entity=ViewData.Model[i];
            if(i>0)
            {%>,<%}%>['<%=entity.Id%>','<%=entity.Subject.Replace("\\",@"\\").Replace("'",@"\'")%>',new Date(<%=TimeHelper.MilliTimeStamp(entity.StartTime)%>),new Date(<%=TimeHelper.MilliTimeStamp(entity.EndTime)%>),<%=entity.IsAllDayEvent ? "1" : "0"%>,<%=TimeHelper.CheckIsCrossEvent(entity)%>,<%=entity.InstanceType== 2?"1":"0"%>,<%=string.IsNullOrEmpty(entity.Category) ? "-1" : entity.Category%>,1,'<%=entity.Location %>','<%=entity.AttendeeNames %><%=string.IsNullOrEmpty(entity.OtherAttendee)?"":","+entity.OtherAttendee%>' ]
           <%
        }
    }
%>
];
