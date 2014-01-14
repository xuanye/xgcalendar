<?php 
  ob_start();
   require_once ("includes/commons.inc");  
   require_once ("resources/i18n.php");
  ob_end_flush();
?>
<!DOCTYPE html>
<html>    
    <head>
        <title><?php echo ucfmsg("title") ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="static/css/main.css">
        <link rel="stylesheet" href="static/css/plugin/minical.css">
        <link rel="stylesheet" href="static/css/plugin/calendar.css">
        <link rel="stylesheet" href="static/css/plugin/dailog.css">
    </head>    
    <body>
        <div id="mainpanel">
            <div id="toppanel">
                <div id="loadingpannel"><?php echo ucfmsg("loaddatamsg"); ?></div>
                <div id="errorpannel"><?php echo ucfmsg("defaulterrormsg"); ?></div>
                <p class="logo"><?php echo ucfmsg("title") ?></p>
                <div class="calbtnp1">
                    <button id="todaybtn" type="button" class="btn"><?php echo ucfmsg("today") ; ?></button>
                    <div class="btngroup">
                        <span id="prevbtn" type="button" class="btn prevbtn"><em></em></span>
                        <span id="nextbtn" type="button" class="btn nextbtn"><em></em></span>
                    </div>
                    <div id="dateshow"></div>
                </div>
                <div class="calbtnp3">
                    <div>
                        <a id="langch" href="?lang=zh-cn">中文</a>                       
						<span>|</span>
                        <a id="langen" href="?lang=en-us">English</a>
                    </div>
                </div>
                <div class="calbtnp2">
                    <div id="viewswithbtn" class="btngroup">
                        <button id="daybtn" type="button" class="btn">
                          <?php echo ucfmsg("day") ; ?>
                        </button>
                        <button id="weekbtn" type="button" class="btn current">
                         <?php echo ucfmsg("week") ; ?>
                        </button>
                        <button id="monthbtn" type="button" class="btn">
                          <?php echo ucfmsg("month") ; ?>
                        </button>
                    </div>
                </div>
            </div>
            <div id="leftpanel">
                <div class="addbtnp">
                    <button id="addcalbtn" type="button" class="btn btn-danger">
                        <?php echo ucfmsg("new_event");  ?>
                    </button>
                </div>
                <div id="minical" class="minical">
                </div>
            </div>
            <div id="rightpanel">
                <div id="xgcalendarp">
                </div>
                <div class="bottom">
                    demo base on
                    <a target="_blank" href="https://github.com/xuanye/xgcalendar">
                        xgcalendar
                    </a>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="static/js/locales/<?php echo $lang ;?>.js"></script>
        <script type="text/javascript" src="static/js/sea.js"></script>
        <script type="text/javascript" src="static/js/seaconfig.js">  </script>
        <script type="text/javascript">
            var loadingmsg = '<?php echo ucfmsg("loaddatamsg")?>';
            var sucessmsg = '<?php echo ucfmsg("successmsg");  ?>';
            var processdatamsg = '<?php echo ucfmsg("processdatamsg");  ?>';
            seajs.use('page/index', function(app) {
                app.init();
            });
        </script>
    </body>

</html>