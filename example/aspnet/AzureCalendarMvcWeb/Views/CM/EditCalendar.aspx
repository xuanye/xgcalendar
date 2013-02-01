<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EditCalendar.aspx" Inherits="System.Web.Mvc.ViewPage<AzureCalendarMvcWeb.Models.Calendar>" %>
<%@ Import Namespace="AzureCalendarMvcWeb" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=7" />
    <title>修改日程详细</title>
    <link href="<%=Url.Content("~/Theme/Default/main.css") %>" rel="stylesheet" type="text/css" />  
    <link href="<%=Url.Content("~/Theme/Default/dp.css") %>" rel="stylesheet" />
    <link href="<%=Url.Content("~/Theme/Default/dropdown.css") %>" rel="stylesheet" />
    <link href="<%=Url.Content("~/Theme/Default/colorselect.css") %>" rel="stylesheet" />
     <style type="text/css">
     .calpick
     {
        width:25px;
        border:none;
        cursor:pointer;
        background:url("/images/icons/cal.gif") no-repeat center 2px;
        margin-left:-22px;
     }
     </style>
</head>
<body>
    <div>
      <div class="toolBotton">
           <a id="Savebtn" class="imgbtn" href="javascript:void(0);">
                <span class="Save"  title="<%=Html.Resource("lang,savetitle")%>"><%=Html.Resource("lang,save")%>(<u>S</u>)</span>
           </a>
           <% if (Model.Id > 0)
              {%>
               <a id="Deletebtn" class="imgbtn" href="javascript:void(0);">
                    <span class="Delete" title="<%=Html.Resource("lang,deletetitle")%>"><%=Html.Resource("lang,delete")%>(<u>D</u>)</span>
                </a>
            <%} %>
            <a id="Closebtn" class="imgbtn" href="javascript:void(0);">
                <span class="Close" title="<%=Html.Resource("lang,closetitle")%>" ><%=Html.Resource("lang,close")%></span></a>
            </a>
        </div>        
         <div style="clear: both">
         </div>
        <div class="infocontainer">
            <% using (Html.BeginForm("SaveCalendar", "CM", new { id = Model.Id }, FormMethod.Post, new { id = "fmEdit", @class = "fform" }))
               {
            %>
                <label>
                    <span>
                        *<%=Html.Resource("lang,subject")%>：
                    </span>
                    <div id="calendarcolor"></div><% =Html.TextBox("Subject", Model.Subject, new { style = "width:85%;",@class="required safe", MaxLength = "200" })%>
                    <%=Html.Hidden("colorvalue",Model.Category)%>
                </label>
                 <label>
                    <span>
                       *<%=Html.Resource("lang,time")%>：
                    </span>
                    <div>
                      <% =Html.TextBox("stpartdate", Model.StartTime > DateTime.MinValue ? Model.StartTime.ToString(Html.Resource("lang,datestring")) : "", new { @class = "required date", style = "padding-left:2px;width:90px;", MaxLength = "10" })%>
                      <% =Html.TextBox("stparttime", Model.StartTime > DateTime.MinValue ? Model.StartTime.ToString("HH:mm") : "", new { @class="required time", style = "width:40px;", MaxLength = "5" })%>
<%=Html.Resource("lang,to")%>
                      <% =Html.TextBox("etpartdate", Model.EndTime > DateTime.MinValue ? Model.EndTime.ToString(Html.Resource("lang,datestring")) : "", new { @class = "required date", style = "padding-left:2px;width:90px;", MaxLength = "10" })%>
                      <% =Html.TextBox("etparttime", Model.EndTime > DateTime.MinValue ? Model.EndTime.ToString("HH:mm") : "", new { @class="required time", style = "width:40px;", MaxLength = "50" })%>
                      
                     <label class="checkp"> <%=Html.CheckBox("IsAllDayEvent", Model.IsAllDayEvent)%>
                     <%=Html.Resource("lang,alldayevent")%>
                     </label>
                    </div>
                </label>
                 <label>
                    <span>
                        <%=Html.Resource("lang,location")%>：
                    </span>
                    <% =Html.TextBox("Location", Model.Location, new { style = "width:95%;", MaxLength = "200" })%>
                </label>
                 <label>
                    <span>
                        <%=Html.Resource("lang,remark")%>：
                    </span>
                    <% =Html.TextArea("Description", Model.Description, new { style = "width:95%; height:70px" })%>
                </label>
                <%=Html.Hidden("timezone")%>
           <%} %>

         </div>
    <script src="<%=Url.Content("~/Javascripts/jquery.min.js")%>" type="text/javascript"></script>
    <script src="<%=Url.Content("~/Javascripts/Common.js")%>" type="text/javascript"></script>   
    <script src="<%=Url.Content("~/Javascripts/Plugins/jquery.form.js")%>" type="text/javascript"></script>
    <script src="<%=Url.Content("~/Javascripts/Plugins/jquery.validate.js")%>" type="text/javascript"></script>
    <script src="<%=Url.Content(Html.Resource("lang,datepicker_langpack_url"))%>" type="text/javascript"></script>   
    <script src="<%=Url.Content("~/Javascripts/Plugins/jquery.datepicker.js")%>" type="text/javascript"></script>
    <script src="<%=Url.Content("~/Javascripts/Plugins/jquery.dropdown.js")%>" type="text/javascript"></script>
    <script src="<%=Url.Content("~/Javascripts/Plugins/jquery.colorselect.js")%>" type="text/javascript"></script>
    <script type="text/javascript">
        if (!DateAdd || typeof (DateDiff) != "function") {
            var DateAdd = function(interval, number, idate) {
                number = parseInt(number);
                var date;
                if (typeof (idate) == "string") {
                    date = idate.split(/\D/);
                    eval("var date = new Date(" + date.join(",") + ")");
                }
                if (typeof (idate) == "object") {
                    date = new Date(idate.toString());
                }
                switch (interval) {
                    case "y": date.setFullYear(date.getFullYear() + number); break;
                    case "m": date.setMonth(date.getMonth() + number); break;
                    case "d": date.setDate(date.getDate() + number); break;
                    case "w": date.setDate(date.getDate() + 7 * number); break;
                    case "h": date.setHours(date.getHours() + number); break;
                    case "n": date.setMinutes(date.getMinutes() + number); break;
                    case "s": date.setSeconds(date.getSeconds() + number); break;
                    case "l": date.setMilliseconds(date.getMilliseconds() + number); break;
                }
                return date;
            }
        }
        function getHM(date)
        {
             var hour =date.getHours();
             var minute= date.getMinutes();
             var ret= (hour>9?hour:"0"+hour)+":"+(minute>9?minute:"0"+minute) ;
             return ret;
        }
        $(document).ready(function() {
            //debugger;
            var arrT = [];
            var tt = "{0}:{1}";
            for (var i = 0; i < 24; i++) {
                arrT.push({ text: StrFormat(tt, [i >= 10 ? i : "0" + i, "00"]) }, { text: StrFormat(tt, [i >= 10 ? i : "0" + i, "30"]) });
            }
            $("#timezone").val(new Date().getTimezoneOffset()/60 * -1);
            $("#stparttime").dropdown({
                dropheight: 200,
                dropwidth:60,
                selectedchange: function() { },
                items: arrT
            });
            $("#etparttime").dropdown({
                dropheight: 200,
                dropwidth:60,
                selectedchange: function() { },
                items: arrT
            });
            var check = $("#IsAllDayEvent").click(function(e) {
                if (this.checked) {
                    $("#stparttime").val("00:00").hide();
                    $("#etparttime").val("00:00").hide();
                }
                else {
                    var d = new Date();
                    var p = 60 - d.getMinutes();
                    if (p > 30) p = p - 30;
                    d = DateAdd("n", p, d);
                    $("#stparttime").val(getHM(d)).show();
                    $("#etparttime").val(getHM(DateAdd("h", 1, d))).show();
                }
            });
            if (check[0].checked) {
                $("#stparttime").val("00:00").hide();
                $("#etparttime").val("00:00").hide();
            }
            $("#Savebtn").click(function() { $("#fmEdit").submit(); });
            $("#Closebtn").click(function() { CloseModelWindow(); });
            $("#Deletebtn").click(function() {
                 if (confirm("你确定要取消该日程吗？")) {  
                    var param = [{ "name": "calendarId", value: <%=Model.Id %>}];                
                    $.post("<%=Url.Action("QuickDeletePersonalCal")%>",
                        param,
                        function(data){
                              if (data.IsSuccess) {
                                    alert(data.Msg); 
                                    CloseModelWindow(null,true);                            
                                }
                                else {
                                    alert("操作失败：\r\n" + data.Msg);
                                }
                        }
                    ,"json");
                }
            });
            
           $("#stpartdate,#etpartdate").datepicker({ picker: "<button class='calpick'></button>"});    
            var cv =$("#colorvalue").val() ;
            if(cv=="")
            {
                cv="-1";
            }
            $("#calendarcolor").colorselect({ title: "颜色分类", index: cv, hiddenid: "colorvalue" });
            //定义ajaxform的调用参数
            var options = {
                beforeSubmit: function() {
                    return true;
                },
                dataType: "json",
                success: function(data) {
                    alert(data.Msg);
                    if (data.IsSuccess) {
                        CloseModelWindow(null,true);  
                    }
                }
            };
            $.validator.addMethod("date", function(value, element) {                             
                var arrs = value.split(i18n.datepicker.dateformat.separator);
                var year = arrs[i18n.datepicker.dateformat.year_index];
                var month = arrs[i18n.datepicker.dateformat.month_index];
                var day = arrs[i18n.datepicker.dateformat.day_index];
                var standvalue = [year,month,day].join("-");
                return this.optional(element) || /^(?:(?:1[6-9]|[2-9]\d)?\d{2}[\/\-\.](?:0?[1,3-9]|1[0-2])[\/\-\.](?:29|30))(?: (?:0?\d|1\d|2[0-3])\:(?:0?\d|[1-5]\d)\:(?:0?\d|[1-5]\d)(?: \d{1,3})?)?$|^(?:(?:1[6-9]|[2-9]\d)?\d{2}[\/\-\.](?:0?[1,3,5,7,8]|1[02])[\/\-\.]31)(?: (?:0?\d|1\d|2[0-3])\:(?:0?\d|[1-5]\d)\:(?:0?\d|[1-5]\d)(?: \d{1,3})?)?$|^(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])[\/\-\.]0?2[\/\-\.]29)(?: (?:0?\d|1\d|2[0-3])\:(?:0?\d|[1-5]\d)\:(?:0?\d|[1-5]\d)(?: \d{1,3})?)?$|^(?:(?:16|[2468][048]|[3579][26])00[\/\-\.]0?2[\/\-\.]29)(?: (?:0?\d|1\d|2[0-3])\:(?:0?\d|[1-5]\d)\:(?:0?\d|[1-5]\d)(?: \d{1,3})?)?$|^(?:(?:1[6-9]|[2-9]\d)?\d{2}[\/\-\.](?:0?[1-9]|1[0-2])[\/\-\.](?:0?[1-9]|1\d|2[0-8]))(?: (?:0?\d|1\d|2[0-3])\:(?:0?\d|[1-5]\d)\:(?:0?\d|[1-5]\d)(?:\d{1,3})?)?$/.test(standvalue);
            }, "输入的日期格式不正确");
            $.validator.addMethod("time", function(value, element) {
                return this.optional(element) || /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(value);
            }, "输入的时间格式不正确");
            $.validator.addMethod("safe", function(value, element) {
                return this.optional(element) || /^[^$\<\>]+$/.test(value);
            }, "不能包含以下符号: $<>");
            $("#fmEdit").validate({
                submitHandler: function(form) { $("#fmEdit").ajaxSubmit(options); },
                errorElement: "div",
                errorClass: "cusErrorPanel",
                errorPlacement: function(error, element) {
                    showerror(error, element);
                }
            });
            function showerror(error, target) {
                var pos = target.position();
                var height = target.height();
                var newpos = { left: pos.left, top: pos.top + height + 2 }
                var form = $("#fmEdit");             
                error.appendTo(form).css(newpos);
            }
        });
    </script>
    </div>
</body>
</html>

