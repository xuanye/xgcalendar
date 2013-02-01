define(function(require, exports, module) { //参数名字不能改
  var minicalendar = require("../plugin/minicalendar");
  require("plugin/xgcalendar");
  require("dailog");
  exports.init =function() {   
     var minical =new minicalendar({
        onchange:datechange
     });
     minical.init("#minical");    
     var op = {
        view: "week",
        theme:1,
        autoload:true, //
        showday: new Date(),
        EditCmdhandler:edit,
        //DeleteCmdhandler:dcal,
        ViewCmdhandler:view,    
        onWeekOrMonthToDay:wtd,
        onBeforeRequestData: cal_beforerequest,
        onAfterRequestData: cal_afterrequest,
        onRequestDataError: cal_onerror, 
        url: "/calendar/query" ,  
        quickAddUrl: "/calendar/add" ,  
        quickUpdateUrl: "/calendar/update" ,  
        quickDeleteUrl:  "/calendar/delete" //快速删除日程的
        /* timeFormat:" hh:mm t", //t表示上午下午标识,h 表示12小时制的小时，H表示24小时制的小时,m表示分钟
        tgtimeFormat:"ht" //同上 */ 
    };
    var _MH = document.documentElement.clientHeight;
    op.height = _MH-90;
    op.eventItems =[];
    var p = $("#xgcalendarp").bcalendar(op).BcalGetOp();
    if (p && p.datestrshow) {       
        $("#dateshow").text(p.datestrshow);
    }
    $("#addcalbtn").click(function(){
        OpenModalDialog("/calendar/add", { caption: "创建活动", width: 580, height: 460, onclose: function(){
            $("#xgcalendarp").BCalReload();
        }});
    });
    $("#daybtn").click(function() {      
       switchview.call(this,"day");       
    });
    $("#weekbtn").click(function() {      
       switchview.call(this,"week");       
    });
    $("#monthbtn").click(function() {       
       switchview.call(this,"month");       
    });
    $("#prevbtn").click(function(){
        var p = $("#xgcalendarp").BCalPrev().BcalGetOp();
        if (p && p.datestrshow) {
            $("#dateshow").text(p.datestrshow);
        }
    });
    $("#nextbtn").click(function(){
        var p = $("#xgcalendarp").BCalNext().BcalGetOp();
        if (p && p.datestrshow) {
            $("#dateshow").text(p.datestrshow);
        }
    });
    $("#todaybtn").click(function(e) {
        var p = $("#xgcalendarp").BCalGoToday().BcalGetOp();
        if (p && p.datestrshow) {
            $("#dateshow").text(p.datestrshow);
        }
    });
    function switchview (view) {
        $("#viewswithbtn button.current").each(function() {
            $(this).removeClass("current");
        })
        $(this).addClass("current");
        var p = $("#xgcalendarp").BCalSwtichview(view).BcalGetOp();
        if (p && p.datestrshow) {
            $("#dateshow").text(p.datestrshow);
        }
    }
    function datechange(r)
    {
        var p = $("#xgcalendarp").BCalGoToday(r).BcalGetOp();
        if (p && p.datestrshow) {
            $("#dateshow").text(p.datestrshow);
        }
    }
    function cal_beforerequest(type)
    {          
        var t=loadingmsg;
        switch(type)
        {
            case 1:
                t=loadingmsg;
                break;
            case 2:                      
            case 3:  
            case 4:    
                t=processdatamsg;                                   
                break;
        }
        $("#errorpannel").hide();
        $("#loadingpannel").html(t).show();        
    }
    function cal_afterrequest(type)
    {         
        switch(type)
        {
            case 1:
                $("#loadingpannel").hide();
                break;
            case 2:
            case 3:
            case 4:
                $("#loadingpannel").html(sucessmsg);
                window.setTimeout(function(){ $("#loadingpannel").hide();},2000);
            break;
        }              
    }
    function cal_onerror(type,data)
    {   
      $("#errorpannel").show(); 
    }
    function edit(data)
    { 
        if(data)
        {
            var url = StrFormat("/calendar/edit/{0}?start={2}&end={3}&isallday={4}&title={1}",data);           
            OpenModalDialog(url, { caption: "修改活动", width: 580, height: 460, onclose: function(){
                $("#xgcalendarp").BCalReload();
            }});           
        }
    }    
    function view(data)
    {              
    }    
    function dcal(data,callback)
    {            
    }
    function wtd(p)
    {
       if (p && p.datestrshow) {
            $("#txtdatetimeshow").text(p.datestrshow);
       }
       $("#viewswithbtn button.current").each(function() {
            $(this).removeClass("current");
        })
        $("#daybtn").addClass("current");             
    }
  }
});