<?php 
ob_start();
   require_once ("includes/commons.inc");  
   require_once ("resources/i18n.php");
  ob_end_flush();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
 <head>
  <title><?php echo msg("title");?> </title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <link href="static/theme/Default/main.css"" rel="stylesheet" type="text/css" />
  <link href="static/theme/Default/dailog.css" rel="stylesheet" type="text/css" />
  <link href="static/theme/Default/calendar.css" rel="stylesheet" type="text/css" /> 
  <link href="static/theme/Default/dp.css" rel="stylesheet" type="text/css" />   
  <link href="static/theme/Default/alert.css" rel="stylesheet" type="text/css" />     
  <link href="static/theme/Shared/blackbird.css" rel="stylesheet" type="text/css" />
 </head>

 <body>
<div>
      <div id="calhead" style="padding-left:1px;padding-right:1px;">          
            <div class="cHead"><div class="ftitle"><?php echo ucfmsg("title") ?></div>
            <div id="loadingpannel" class="ptogtitle loadicon" style="display: none;"><?php echo ucfmsg("loaddatamsg"); ?></div>
             <div id="errorpannel" class="ptogtitle loaderror" style="display: none;"><?php echo ucfmsg("defaulterrormsg"); ?></div>
            </div>          
            
            <div id="caltoolbar" class="ctoolbar">
              <div id="faddbtn" class="fbutton">
                <div><span title='<?php echo ucfmsg("new_event_title") ?>' class="addcal">
                <?php echo ucfmsg("new_event");  ?>            
                </span></div>
            </div>
            <div class="btnseparator"></div>
             <div id="showtodaybtn" class="fbutton">
                <div><span title='<?php echo ucfmsg("today_title") ;?> ' class="showtoday">
                <?php echo ucfmsg("today") ; ?></span></div>
            </div>
              <div class="btnseparator"></div>
            <div id="showdaybtn" class="fbutton">
                <div><span title='<?php echo ucfmsg("day") ?>' class="showdayview"><?php echo ucfmsg("day") ; ?></span></div>
            </div>
              <div  id="showweekbtn" class="fbutton fcurrent">
                <div><span title='<?php echo ucfmsg("week") ?>' class="showweekview"><?php echo ucfmsg("week") ; ?></span></div>
            </div>
              <div  id="showmonthbtn" class="fbutton">
                <div><span title='<?php echo ucfmsg("month") ?>' class="showmonthview"><?php echo ucfmsg("month");  ?></span></div>
            </div>
            <div class="btnseparator"></div>
              <div  id="showreflashbtn" class="fbutton">
                <div><span title='<?php echo ucfmsg("refresh_title") ?>' class="showdayflash"><?php echo ucfmsg("refresh");  ?></span></div>
                </div>
             <div class="btnseparator"></div>
            <div id="sfprevbtn" title="<?php echo ucfmsg("prev_title") ; ?>"  class="fbutton">
              <span class="fprev"></span>
            </div>
            <div id="sfnextbtn" title="<?php echo ucfmsg("next_title") ; ?>" class="fbutton">
                <span class="fnext"></span>
            </div>
            <div class="fshowdatep fbutton">
                    <div>
                        <input type="hidden" name="txtshow" id="hdtxtshow" />
                        <span id="txtdatetimeshow">Loading</span>
                    </div>
            </div>
            <div class="btnseparator"></div>
            <div id="changetochinese" class="fbutton">
                <div><span title='<?php echo ucfmsg("chinese") ; ?>' class="chinese"><?php echo ucfmsg("chinese") ; ?></span></div>
            </div>
            <div id="changetoenglish" class="fbutton">
                <div><span title='<?php echo ucfmsg("english");  ?>' class="english"><?php echo ucfmsg("english");  ?></span></div>
            </div>
             <div id="changetoenglishau" class="fbutton">
                <div><span title='<?php echo ucfmsg("english");  ?>' class="english_au"><?php echo ucfmsg("english") ; ?></span></div>
            </div>
             <div class="btnseparator"></div>         
            <div class="clear"></div>
            </div>
      </div>
      <div style="padding:1px;">
        <div class="t1 chromeColor">
            &nbsp;</div>
        <div class="t2 chromeColor">
            &nbsp;</div>
        <div id="dvCalMain" class="calmain printborder">
            <div id="gridcontainer" style="overflow-y: visible;">
            </div>
        </div>
        <div class="t2 chromeColor">
            &nbsp;</div>
        <div class="t1 chromeColor">
            &nbsp;
        </div>   
        </div>
     
  </div>
    <script src="static/javascripts/jquery.min.js" type="text/javascript"></script>  
    <script src="static/javascripts/Common.js" type="text/javascript"></script>    
    <script src="static/javascripts/lib/blackbird.js" type="text/javascript"></script> 
    <script src="<?php echo msg("datepicker_langpack_url");  ?>" type="text/javascript"></script>     
    <script src="static/javascripts/Plugins/jquery.datepicker.js" type="text/javascript"></script>
    <script src="static/javascripts/Plugins/jquery.alert.js" type="text/javascript"></script>    
    <script src="static/javascripts/Plugins/jquery.ifrmdailog.js" defer="defer" type="text/javascript"></script>
    <script src="<?php echo msg("calendar_langpack_url");  ?>" type="text/javascript"></script>  
    <script src="static/javascripts/Plugins/xgcalendar.js?v=1.2.0.4" type="text/javascript"></script>   
    <script type="text/javascript">
        $(document).ready(function() {
            //[id,title,start,end，全天日程，跨日日程,循环日程,theme,'','']          
           var view="week";          
            <?php include("_part.php"); ?>
            var op = {
                view: view,
                theme:3,
                showday: new Date(),
                EditCmdhandler:Edit,
                DeleteCmdhandler:Delete,
                ViewCmdhandler:View,    
                onWeekOrMonthToDay:wtd,
                onBeforeRequestData: cal_beforerequest,
                onAfterRequestData: cal_afterrequest,
                onRequestDataError: cal_onerror, 
                url: "calendar.php?mode=get" ,  
                quickAddUrl: "calendar.php?mode=quickadd" ,  
                quickUpdateUrl: "calendar.php?mode=quickupdate" ,  
                quickDeleteUrl:  "calendar.php?mode=quickdelete" //快速删除日程的
               /* timeFormat:" hh:mm t", //t表示上午下午标识,h 表示12小时制的小时，H表示24小时制的小时,m表示分钟
			    tgtimeFormat:"ht" //同上 */             
            };
            var $dv = $("#calhead");
            var _MH = document.documentElement.clientHeight;
            var dvH = $dv.height() + 2;
            op.height = _MH - dvH;
            op.eventItems =__CURRENTDATA;

            var p = $("#gridcontainer").bcalendar(op).BcalGetOp();
            if (p && p.datestrshow) {
                $("#txtdatetimeshow").text(p.datestrshow);
            }
            $("#caltoolbar").noSelect();
            
            $("#hdtxtshow").datepicker({ picker: "#txtdatetimeshow", showtarget: $("#txtdatetimeshow"),
            onReturn:function(r){                          
                            var p = $("#gridcontainer").BCalGoToday(r).BcalGetOp();
                            if (p && p.datestrshow) {
                                $("#txtdatetimeshow").text(p.datestrshow);
                            }
                     } 
            });
            function cal_beforerequest(type)
            {
                var t="<?php echo ucfmsg("loaddatamsg")?>";
                switch(type)
                {
                    case 1:
                        t="<?php echo ucfmsg("loaddatamsg");  ?>";
                        break;
                    case 2:                      
                    case 3:  
                    case 4:    
                        t="<?php echo ucfmsg("processdatamsg");  ?>";                                   
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
                        $("#loadingpannel").html("<?php echo ucfmsg("successmsg");  ?>");
                        window.setTimeout(function(){ $("#loadingpannel").hide();},2000);
                    break;
                }              
               
            }
            function cal_onerror(type,data)
            {
                $("#errorpannel").show();
            }
            function Edit(data)
            {
               var eurl="";   
                if(data)
                {
                    var url = StrFormat(eurl,data);
                    OpenModelWindow(url,{ width: 600, height: 400, caption:"<?php echo ucfmsg("editcalendar");  ?>",onclose:function(){
                       $("#gridcontainer").BCalReload();
                    }});
                }
            }    
            function View(data)
            {
                var vurl="";   
                if(data)
                {
                    var url = StrFormat(vurl,data);
                    OpenModelWindow(url,{ width: 600, height: 400, caption: "<?php echo ucfmsg("viewcalendar");?>"});
                }                
            }    
            function Delete(data,callback)
            {  
                $.alerts.okButton="<?php echo ucfmsg("ok");  ?>";  
                $.alerts.cancelButton="<?php echo ucfmsg("cancel") ; ?>";  
                hiConfirm("<?php echo ucfmsg("deleteconfirm") ; ?>", '<?php echo ucfmsg("confirm");  ?>',function(r){ r && callback(0);});           
            }
            function wtd(p)
            {
               if (p && p.datestrshow) {
                    $("#txtdatetimeshow").text(p.datestrshow);
                }
                $("#caltoolbar div.fcurrent").each(function() {
                    $(this).removeClass("fcurrent");
                })
                $("#showdaybtn").addClass("fcurrent");
            }
            //显示日视图
            $("#showdaybtn").click(function(e) {
                //document.location.href="#day";
                $("#caltoolbar div.fcurrent").each(function() {
                    $(this).removeClass("fcurrent");
                })
                $(this).addClass("fcurrent");
                var p = $("#gridcontainer").BCalSwtichview("day").BcalGetOp();
                if (p && p.datestrshow) {
                    $("#txtdatetimeshow").text(p.datestrshow);
                }
            });
            //显示周视图
            $("#showweekbtn").click(function(e) {
                //document.location.href="#week";
                $("#caltoolbar div.fcurrent").each(function() {
                    $(this).removeClass("fcurrent");
                })
                $(this).addClass("fcurrent");
                var p = $("#gridcontainer").BCalSwtichview("week").BcalGetOp();
                if (p && p.datestrshow) {
                    $("#txtdatetimeshow").text(p.datestrshow);
                }

            });
            //显示月视图
            $("#showmonthbtn").click(function(e) {
                //document.location.href="#month";
                $("#caltoolbar div.fcurrent").each(function() {
                    $(this).removeClass("fcurrent");
                })
                $(this).addClass("fcurrent");
                var p = $("#gridcontainer").BCalSwtichview("month").BcalGetOp();
                if (p && p.datestrshow) {
                    $("#txtdatetimeshow").text(p.datestrshow);
                }
            });
            
            $("#showreflashbtn").click(function(e){
                $("#gridcontainer").BCalReload();
            });
            
            //点击新增日程
            $("#faddbtn").click(function(e) {
                var url ="";
                OpenModelWindow(url,{ width: 500, height: 400, caption: "<?php echo ucfmsg("addcalendar");  ?>"});
            });
            //点击回到今天
            $("#showtodaybtn").click(function(e) {
                var p = $("#gridcontainer").BCalGoToday().BcalGetOp();
                if (p && p.datestrshow) {
                    $("#txtdatetimeshow").text(p.datestrshow);
                }


            });
            //上一个
            $("#sfprevbtn").click(function(e) {
                var p = $("#gridcontainer").BCalPrev().BcalGetOp();
                if (p && p.datestrshow) {
                    $("#txtdatetimeshow").text(p.datestrshow);
                }

            });
            //下一个
            $("#sfnextbtn").click(function(e) {
                var p = $("#gridcontainer").BCalNext().BcalGetOp();
                if (p && p.datestrshow) {
                    $("#txtdatetimeshow").text(p.datestrshow);
                }
            });
            $("#changetochinese").click(function(e){
                location.href="?lang=zh-cn";
            });
            $("#changetoenglish").click(function(e){
                location.href="?lang=en-us";
            });
             $("#changetoenglishau").click(function(e){
                location.href="?lang=en-au";
            });
            
        });
    </script>
 </body>
</html>

