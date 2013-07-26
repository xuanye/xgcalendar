define(function(require, exports, module) { //参数名字不能改
   function minicalendar(option){
      this.__option =  $.extend({ 
            weekStart: 0,
            weekName: [i18n.minicalendar.dateformat.sun, i18n.minicalendar.dateformat.mon, i18n.minicalendar.dateformat.tue, i18n.minicalendar.dateformat.wed, i18n.minicalendar.dateformat.thu, i18n.minicalendar.dateformat.fri, i18n.minicalendar.dateformat.sat], //星期的格式
            monthName: [i18n.minicalendar.dateformat.jan, i18n.minicalendar.dateformat.feb, i18n.minicalendar.dateformat.mar, i18n.minicalendar.dateformat.apr, i18n.minicalendar.dateformat.may, i18n.minicalendar.dateformat.jun, i18n.minicalendar.dateformat.jul, i18n.minicalendar.dateformat.aug, i18n.minicalendar.dateformat.sep, i18n.minicalendar.dateformat.oct, i18n.minicalendar.dateformat.nov, i18n.minicalendar.dateformat.dec], //月份的格式
            monthp: i18n.minicalendar.dateformat.postfix,         
            dateValueFormat:i18n.minicalendar.dateformat.dateValueFormat,
            currentDate:new Date(),     
            today: new Date(),
            onchange: false           
          }, option);
   }
   minicalendar.prototype = {
      init:function(parent) {
        this.__parent = $(parent);
        this.__parent.addClass("minicalendar");
        this.render();
        this.filldate();
        this.__initevent();
      },
      __initevent:function() {
        // body...
        var me    = this;
        var aprev = this.__parent.find("a.cal-prev");
        var anext = this.__parent.find("a.cal-next");       
        aprev.click(function(){           
            me.__option.currentDate = DateAdd("m",-1,me.__option.currentDate);
            me.filldate();
            if(me.__option.onchange)
            {
              me.__option.onchange.call(me,me.__option.currentDate);
            }
        });
        anext.click(function(){
            me.__option.currentDate = DateAdd("m",1,me.__option.currentDate);
            me.filldate();
            if(me.__option.onchange)
            {
              me.__option.onchange.call(me,me.__option.currentDate);
            }
        });       
      
      },
      render:function (argument) {       
        var html=[];

        html.push("<div class='minical-p1'>");    
        html.push("<div class='minical-p1-head'><span class='ymbtn'></span><a class='cal-prev' href='javascript:void(0);' hidefocus='on'></a><a class='cal-next' href='javascript:void(0);' hidefocus='on'></a></div>");
        //周
        html.push("<table class='minical-body' cellspacing='0'><thead><tr>");
        //生成周
        for (var i = this.__option.weekStart, j = 0; j < 7; j++) {
          html.push("<th><span>", this.__option.weekName[i], "</span></th>");
          if (i == 6) { i = 0; } else { i++; }
        }
        html.push("</tr></thead>");
        //生成tBody,需要重新生成的
        html.push("<tbody></tbody></table>");     
        html.push("</div>");   
        this.__parent.html(html.join(""));
      },
      filldate:function () {
          var me = this;
          var tb = this.__parent.find("table.minical-body tbody");        
          var year = this.__option.currentDate.getFullYear();
          var monthName = this.__option.monthName[this.__option.currentDate.getMonth()];
          $("span.ymbtn").html(monthName+this.__option.monthp +" "+year);
          var year   =  this.__option.currentDate.getFullYear();
          var month  =  this.__option.currentDate.getMonth();
          var firstdate = new Date(year, month, 1);

          var diffday =  this.__option.weekStart - firstdate.getDay();        
          if (diffday > 0) {
              diffday -= 7;
          }
          var startdate = DateAdd("d", diffday, firstdate);
          var enddate = DateAdd("d", 42, startdate);
          var tds = this.__option.today.Format(this.__option.dateValueFormat);
          var ins = this.__option.currentDate.Format(this.__option.dateValueFormat);
          var bhm = [];
          for (var i = 1; i <= 42; i++) {
                if (i % 7 == 1) {
                    bhm.push("<tr>");
                }
                var ndate = DateAdd("d", i - 1, startdate);
                var tdc = [];              
                if (ndate.getMonth() < month) {
                    tdc.push("minical-prevday");
                }
                else if (ndate.getMonth() > month) {
                    tdc.push("minical-nextday");
                }
                var s = ndate.Format("yyyy-MM-dd");
                if (s == tds) {
                    tdc.push("minical-today");
                }
                if (s == ins) {
                    tdc.push("minical-current");
                }

                bhm.push("<td class='", tdc.join(" "), "' title='", ndate.Format(this.__option.dateValueFormat), "' xdate='", ndate.Format("yyyy-M-d"), "'><a href='javascript:void(0);' hidefocus='on'><em><span>", ndate.getDate(), "</span></em></a></td>");
                if (i % 7 == 0) {
                    bhm.push("</tr>");
                }
          }
          tb.html(bhm.join(""));        
          tb.find("td").each(function(i){
             $(this).click(tbclick);
          });
          function tbclick(){         
            me.__parent.find("td.minical-current").each(function(){
              $(this).removeClass("minical-current");
            });     
            $(this).addClass("minical-current").blur();    
            var idate = $(this).attr("xdate");
            var date = idate.split(/\D/);
            me.__option.currentDate= new Date(date[0],parseInt(date[1],10)-1,date[2]);          
            if(me.__option.onchange)
            {
               me.__option.onchange.call(me,me.__option.currentDate);
            }
        }
      },
      goto:function(date) {
        // body...
        this.__option.currentDate = date;
        this.filldate();
      }
   };
   module.exports = minicalendar;
});