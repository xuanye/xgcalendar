define(function(require, exports, module) { 
    require("form");
    require("validate");
    require("datepicker");
    require("dropdown");
    exports.init = function(){
        //init time zone;
        $("#tbTimeZone").val(new Date().getTimezoneOffset()/60 * -1);
        //datepicker
        $("#tbStartDate").datepicker({ 
          picker: "<img class='picker' style='float:left;' align='middle' src='/image/icon/s.gif' alt=''/>", 
          showtime: false });
        $("#tbEndDate").datepicker({ 
          picker: "<img class='picker' style='float:left;' align='middle' src='/image/icon/s.gif' alt=''/>", 
          showtime: false });

        $("#closeDailog").click(closedailog);
        $("#btnClose").click(closedailog);
        $("#tbSubject").focus();
        $("body").keyup(function(e){
          if(e.keyCode==27)
          {
            closedailog();
          }
        })
        //time select
        var arrT = [];
        var tt = "{0}:{1}";
        for (var i = 0; i < 24; i++) {
            arrT.push({ text: StrFormat(tt, [i >= 10 ? i : "0" + i, "00"]) }, { text: StrFormat(tt, [i >= 10 ? i : "0" + i, "30"]) });
        }
        $("#tbStartTime").dropdown({
                dropheight: 200,
                dropwidth:80,
                editable:true,
                selectedchange: function() { },
                items: arrT,
                onshow:timedpshow
        });
        $("#tbEndTime").dropdown({
                dropheight: 200,
                dropwidth:80,
                editable:true,
                selectedchange: function() { },
                items: arrT,
                onshow:timedpshow
        });
       
        var check = $("#cbIsAllDayEvent").click(function(e) {
            if (this.checked) {
                $("#tbStartTime").val("00:00").hide();
                $("#tbEndTime").val("00:00").hide();
            }
            else {
                var d = new Date();
                var p = 60 - d.getMinutes();
                if (p > 30) p = p - 30;
                d = DateAdd("n", p, d);
                $("#tbStartTime").val(getHM(d)).show();
                $("#tbEndTime").val(getHM(DateAdd("h", 1, d))).show();
            }
        });
        if (check[0].checked) {
            $("#tbStartTime").val("00:00").hide();
            $("#tbEndTime").val("00:00").hide();
        }
        //color select
        initcolor(18);
        //form validate 
        formvalidate();

    };
    function closedailog()
    {
      CloseModalDialog();
    }
    function timedpshow(panel)
    {  
       var v = this.value.split(":");
       if(v.length ==2)
       {  
          var hour = parseInt(v[0]);       
          var th = hour * 25 * 2; //当前值选项的位置
          var ch = panel[0].clientHeight; //整个的高度
          var sh = th - 0.5 * ch; // 滚到中间
          var ph = panel[0].scrollHeight; //滚动高度
          //console.log("th="+th);
          //console.log("ph="+ph);
          if (sh < 0) sh = 0;
          if (sh > ph - ch) sh = ph - ch - 10 * (23 - hour);
          //console.log("sh="+sh);
          //console.log("ch="+ch);
          panel[0].scrollTop = sh;
        }
    }
    function getHM(date)
    {
         var hour =date.getHours();
         var minute= date.getMinutes();
         var ret= (hour>9?hour:"0"+hour)+":"+(minute>9?minute:"0"+minute) ;
         return ret;
    }
    function formvalidate()
    {
       $.validator.addMethod("date", function(value, element) {                             
            //var arrs = value.split(i18n.datepicker.dateformat.separator);
            //var year = arrs[i18n.datepicker.dateformat.year_index];
            //var month = arrs[i18n.datepicker.dateformat.month_index];
            //var day = arrs[i18n.datepicker.dateformat.day_index];
            var arrs = value.split("-");
            var year = arrs[0];
            var month = arrs[1];
            var day = arrs[2];
            var standvalue = [year,month,day].join("-");
            return this.optional(element) || /^(?:(?:1[6-9]|[2-9]\d)?\d{2}[\/\-\.](?:0?[1,3-9]|1[0-2])[\/\-\.](?:29|30))(?: (?:0?\d|1\d|2[0-3])\:(?:0?\d|[1-5]\d)\:(?:0?\d|[1-5]\d)(?: \d{1,3})?)?$|^(?:(?:1[6-9]|[2-9]\d)?\d{2}[\/\-\.](?:0?[1,3,5,7,8]|1[02])[\/\-\.]31)(?: (?:0?\d|1\d|2[0-3])\:(?:0?\d|[1-5]\d)\:(?:0?\d|[1-5]\d)(?: \d{1,3})?)?$|^(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])[\/\-\.]0?2[\/\-\.]29)(?: (?:0?\d|1\d|2[0-3])\:(?:0?\d|[1-5]\d)\:(?:0?\d|[1-5]\d)(?: \d{1,3})?)?$|^(?:(?:16|[2468][048]|[3579][26])00[\/\-\.]0?2[\/\-\.]29)(?: (?:0?\d|1\d|2[0-3])\:(?:0?\d|[1-5]\d)\:(?:0?\d|[1-5]\d)(?: \d{1,3})?)?$|^(?:(?:1[6-9]|[2-9]\d)?\d{2}[\/\-\.](?:0?[1-9]|1[0-2])[\/\-\.](?:0?[1-9]|1\d|2[0-8]))(?: (?:0?\d|1\d|2[0-3])\:(?:0?\d|[1-5]\d)\:(?:0?\d|[1-5]\d)(?:\d{1,3})?)?$/.test(standvalue);
       }, "日期格式不正确");
       $.validator.addMethod("time", function(value, element) {
            return this.optional(element) || /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(value);
       }, "时间格式不正确");
       $.validator.addMethod("safe", function (value, element) {
            return this.optional(element) || /^[^$\<\>]+$/.test(value);
        }, "不能包含以下符号: $<>");
        var options = {
            beforeSubmit: function () {               
            },
            dataType: "json",
            success: function (data) {
                if (data.IsSuccess) {
                    CloseModalDialog(null,true);
                }
                else {
                    alert(data.Msg);
                }
            }
        }; //options

        $("#fmEdit").validate(
        {
           submitHandler: function (form) {              
              $("#fmEdit").ajaxSubmit(options);
           },
           rules:
           {            
             Subject:{required: true,safe:true,maxlength:200},
             StartDate:{required: true,date:true},
             EndDate:{required: true,date:true},
             StartTime:{required: true,time:true},
             EndTime:{required: true,time:true},
             Location:{safe:true,maxlength:200},
             Description:{safe:true,maxlength:1000},
             AttendeeNames:{safe:true,maxlength:200}
           },
           messages: {            
           },
           errorElement: "div",
           errorClass: "cusErrorPanel",
           errorPlacement: showValidateError
        }); //validate
      
    }
    //init color select
    function initcolor(len)
    {      
      var defTheme = parseInt($("#tbCategory").val());
      //alert(defTheme);
      var colors  = [];
      var borders = [];
      // "橙色类别", "红色类别", "黄色类别", "蓝色类别", "绿色类别", "紫色类别"
      var d = "666666888888aaaaaabbbbbbdddddda32929cc3333d96666e69999f0c2c2b1365fdd4477e67399eea2bbf5c7d67a367a994499b373b3cca2cce1c7e15229a36633cc8c66d9b399e6d1c2f029527a336699668cb399b3ccc2d1e12952a33366cc668cd999b3e6c2d1f01b887a22aa9959bfb391d5ccbde6e128754e32926265ad8999c9b1c2dfd00d78131096184cb05288cb8cb8e0ba52880066aa008cbf40b3d580d1e6b388880eaaaa11bfbf4dd5d588e6e6b8ab8b00d6ae00e0c240ebd780f3e7b3be6d00ee8800f2a640f7c480fadcb3b1440edd5511e6804deeaa88f5ccb8865a5aa87070be9494d4b8b8e5d4d47057708c6d8ca992a9c6b6c6ddd3dd4e5d6c6274878997a5b1bac3d0d6db5a69867083a894a2beb8c1d4d4dae54a716c5c8d8785aaa5aec6c3cedddb6e6e41898951a7a77dc4c4a8dcdccb8d6f47b08b59c4a883d8c5ace7dcce";
      var theme = 1;
      var init = theme * 6;
      for (var i = init; i < d.length; i = i + 30) {
        colors.push(d.substr(i, 6));
        borders.push(d.substr(i - 6, 6));
      }
      if(len>colors.length)
        len = colors.length;
      var html=[];
      //selected color
      var atemp = '<a href="javascript:void(0);" key="{0}" bcolor="{2}" hidefocus="on" style="background:#{1};border:solid 1px #{1}" unselectable="on">&#160;</a>';
      var catemp = '<a href="javascript:void(0);" key="{0}" class="current" bcolor="{2}" hidefocus="on" style="background:#{1};border:solid 1px #{2}"unselectable="on">√</a>';
      html.push(StrFormatNoEncode(catemp,[defTheme,colors[defTheme],borders[defTheme]]));
      html.push("<span class='split'>|</span>");     
      for(var i=j=1;j<=len; i++)
      {
        if( i != defTheme)
        {
          html.push(StrFormatNoEncode(atemp,[i,colors[i],borders[i]])); 
          j++;
        }
      }
      var panel = $("#dvcolorpanel").html(html.join(""));
      panel.find(">a").each(function(i){
        var aelement = $(this);
        var bcolor = aelement.attr("bcolor");
        aelement.hover(function(){
          if(!$(this).hasClass("current")){
            $(this).css("borderColor","#555");
          }
        },function(){
          if(!$(this).hasClass("current")){
            $(this).css("borderColor",$(this).css("backgroundColor"));
          }
        }).click(function(){
            var me = $(this);
            $("#tbCategory").val(me.attr("key"));
            me.parent().find(">a.current").each(function(){
               $(this).css("borderColor",$(this).css("backgroundColor")).removeClass("current").html("&#160;");
            });
            me.addClass("current").html("√");
            me = null;
        });
      })
    }

});