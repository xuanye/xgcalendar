xgcalendar
========================================

google like calendar js control
a jQuery plugin that enables us to create an event calendar that functions similar to the popular Google Calendar 
why named xgcalendar? X=xuanye G=Google Calendar Like

## Features
  
  * Day/week/month view provided. 
  * Support the definition of the start date of the week 
  * get and update data by ajax 
  * create/update/remove events by drag & drop 
  * qucik delete 
  * quick update by drag/drop 
  * update event by Resize
  * rigth control
  * theme 
  * Good performance
  * support IE6+,FireFox3?.5+,Opera 10+,Chrome 3+ 


## Usage
 
html :   
 
    <div id="xgcalendarp">这里是日历控件</div>

include js:

    <script src="static/js/plugin/xgcalendar_lang_zh_CN.js" type="text/javascript"></script>  
    <script src="static/js/plugin/xgcalendar.js?v=1.2.0.4" type="text/javascript"></script>   

javascript :

    var op = {
        view: "week", //default view type
        theme:1,//theme style
        autoload:true,
        showday: new Date(),
        EditCmdhandler:edit,
        //DeleteCmdhandler:dcal,
        ViewCmdhandler:view,    
        onWeekOrMonthToDay:wtd,//when weekview or month switch to dayview 
        onBeforeRequestData: cal_beforerequest,
        onAfterRequestData: cal_afterrequest,
        onRequestDataError: cal_onerror, 
        url: "/calendar/query" ,  //url for get event data by ajax request(post)
        quickAddUrl: "/calendar/add" ,   //url for quick add event data by ajax request(post)
        quickUpdateUrl: "/calendar/update" ,   //url for quick update event data by ajax request(post)
        quickDeleteUrl:  "/calendar/delete"  //url for quick delete event data by ajax request(post)
    };
    var _MH = document.documentElement.clientHeight;
    op.height = _MH-70; //container height;
    op.eventItems =[]; //default event data;
    $("#xgcalendarp").bcalendar(op);

## Options

to complete

