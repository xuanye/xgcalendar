xgcalendar
========================================
谷歌日历风格的日历控件
一个基于jQury的日历插件，可以帮助用户快速的创建日程（活动），类似谷歌日历
为啥叫xgcalendar? X=xuanye G=Google Calendar Like 

####周视图  
![xgcalendar screenshot1](doc/images/Screenshot1.jpg) 
 
####月视图  
![xgcalendar screenshot2](doc/images/Screenshot2.jpg)  

最新的demo地址： [http://xgcal.sinaapp.com/demo2/](http://xgcal.sinaapp.com/demo2/ "搓我")  
原demo地址： [http://xgcal.sinaapp.com/demo/](http://xgcal.sinaapp.com/demo/ "搓我")
## 功能列表
  
  * 支持三种视图类型 （日,月,周）
  * 支持定义一周的开始日期(周一或者周日) 
  * 支持无刷新获取数据和更新数据
  * 支持拖拽选择时间段新增日程（包括单日和跨日） 
  * 快速删除
  * 通过拖拽方式快速修改时间
  * 通过拖拽改变大小来调整日程持续时间
  * 支持权限控制
  * 支持多主题风格
  * 优异的性能表现
  * 支持多语言
  * 支持的浏览器 IE6+,FireFox3.5+,Opera 10+,Chrome 3+ 


## 使用方法
 
在页面中插入html :   
 
    <div id="xgcalendarp">这里是日历控件</div>

引入JS: 其中xgcalendar_lang_zh_CN.js为本地化文件，xgcalendar支持多语言

    <script src="static/js/locales/xgcalendar_lang_zh_CN.js" type="text/javascript"></script>
    <script src="static/js/plugin/xgcalendar.js?v=1.2.0.4" type="text/javascript"></script>   

调用 :

    var op = {
        view: "week", //默认视图，这里是周视图
        theme:1,//默认的主题风格
        autoload:true, //是否在页面加载完毕后自动获取当前视图时间的数据
        showday: new Date(), //当前视图的显示时间
        EditCmdhandler:edit, //点击的响应事件
        //DeleteCmdhandler:dcal, //删除的响应事件
        ViewCmdhandler:view,    //查看的响应事件
        onWeekOrMonthToDay:wtd,//当when weekview or month switch to dayview 
        onBeforeRequestData: cal_beforerequest,
        onAfterRequestData: cal_afterrequest,
        onRequestDataError: cal_onerror, 
        url: "/calendar/query" ,  //url for get event data by ajax request(post)
        quickAddUrl: "/calendar/add" ,   //url for quick add event data by ajax request(post)
        quickUpdateUrl: "/calendar/update" ,   //url for quick update event data by ajax request(post)
        quickDeleteUrl:  "/calendar/delete"  //url for quick delete event data by ajax request(post)
    };
    var _MH = document.documentElement.clientHeight; //获取页面高度，不同的文档类型需要不同的计算方法，注意示例中使用的doctype 用这个就搞定了
    op.height = _MH-70; //container height;
    op.eventItems =[]; //default event data;
    $("#xgcalendarp").bcalendar(op);

## 参数说明
- `view`:  默认是周视图 `day`,`week`,`month` 
- `weekstartday`: 默认星期一开始，即为1,如果设置为0则为从星期日开始
- `theme`: 默认使用第一套主题,可设置范围0-21
- `height`: 视图的高度，如果不设置则默认获取所在页面的高度
- `url`:  **必填**  请求数据的Url         
- `eventItems`: 日程数据，是个数组，可通过此参数设置初始化数据
- `method`: 异步提交数据的方式，默认为POST建议不要修改。
- `showday`: 显示日期，默认为当天
- `onBeforeRequestData`: 在异步调用调用开始之前执行的函数，可以用此参数配合下面的参数完成动态提示效果
- `onAfterRequestData`: 异步调用完成之后
- `onRequestDataError`: 在异步调用发生异常时             
- `onWeekOrMonthToDay`: 当周视图切换到日视图，因为在转换在内部完成，所以公开一个入口可得到该行为
- `quickAddHandler`: 快速添加的拦截函数，该参数设置后quickAddUrl参数的设置将被忽略
- `quickAddUrl`: 快速添加日程响应的 Url 地址
- `quickUpdateUrl`: 拖拽更新时响应的 Url 地址
- `quickDeleteUrl`: 快速删除日程时响应的Urk 地址       
- `autoload`: 自动使用`url`参数加载数据，如果eventItems参数没有配置，可启用该参数，默认第一次获取数据
- `readonly`: 是否只读，某些情况下，可设置整个视图只读
- `extParam`: 额外参数数组{name:"",value:""}，在所以异步请求中，都会附加的额外参数，可配置其他扩展的查询条件
- `enableDrag`:默认为true，是否可拖拽,和 `readonly` 参数不同的是 只是不能拖拽。
- `timeFormat`:默认为`HH:mm`, t表示上午下午标识,h 表示12小时制的小时，H表示24小时制的小时,m表示分钟
- `tgtimeFormat`:"HH:mm" //同上

## 数据格式

参数列表中的`eventItems`参数的数据格式，如果添加新的字段尽量往后添加
---
> eventItems本身是个数组，数组的项本身又是个数组，结构如下所示
> [主键,标题,开始时间,结束时间，是否全天日程，是否跨天日程,是否循环日程,颜色主题,是否有权限,地点,参与人]
> 对应的数据类型
> [String,String,Date,Date,1/0,1/0,1/0,0-21,0/1,String,String]

## 可用的方法

所有方法通过 `$("#calendarid").functionName(params) ` 方式调用  

- `BCalSwtichview(viewtype)` 切换视图 参数 `viewtype` 值为`day`，`week`，`month` 之一
- `BCalReload` 重新加载当前视图 即刷新
- `BCalGoToday(day)` 将时间回到`day`参数所在的时间段，不切换视图
- `BCalPrev` 往前一个时间段，这个时间的范围由当前视图决定，如周视图即为往前一周
- `BCalNext` 同上 往后一个时间段 
- `BcalGetOp` 获取当前参数，这个在切换视图的时候 会获取到某些文字提示，详见demo
- `BcalSetOp(p)` 设置参数,`p`为额外的参数值 ,参考`{p1:p1value}`，可动态设置参数
 
## 参数中的那些事件
- `onBeforeRequestData(type)`: type为数字，表示事件的类型（1：加载,2：新增,3：删除,4：更新）
- `onAfterRequestData(type)`: type同上
- `onRequestDataError(type,data)`:type同上，data为错误信息，如果存在的话
- `onWeekOrMonthToDay(p)`: p为当前的参数值，可从p.dayshow 获取提示信息，详见demo

####load时的参数说明  
 **请求参数**  
>showdate=2013-1-9&viewtype=month&timezone=8  

其中showdate为当前日期，viewtype为当前视图，timezone为时区
后台会根据showdate和viewtype计算出对应的开始日期和结束日期，加上时区的偏移到数据库中检索
实际的情况应该根据你服务端编码实现的情况来处理，默认可通过request 的form中获取上述值  
 
**请求返回** 

>{"events":[],"issort":true,"start":"\/Date(1261353600000)\/","end":"\/Date(1261958399000)\/","error":null}

`events`的结构同参数`eventItems`的结构，
`issort`是否已在服务端排序（请在服务端做好排序），
`start`和`end`是本次请求的开始时间和结束时间,这里是date的json表示法
`error`是业务异常对象，可在服务端生成，结构为：`{ErrorCode:””,ErrorMsg:””}` 可在`onRequestDataError`中捕获，并做友好的提示。

####更新时的参数说明
**请求参数** 
>calendarId=98&CalendarStartTime=2013-1-2+00%3A00&CalendarEndTime=2013-1-2+00%3A00&timezone=8  

开始时间和结束时间的格式同你的多语言配置相关

**请求返回**﻿
> {"IsSuccess":true,"Msg":""}  

是否成功和失败时的错误信息

删除和新增雷同 不做展开说了，如果不清楚可以通过工具看看，chrome 使用F12调出开发者工具，切换 Network选项卡，操作一边就可以看到。


##FAQ 

* 有没有java版本的demo  
  > 没有,我知道很多网友 实现了如果有愿意提供的那非常欢迎

* 怎么把时间范围控制在8：00到下午18：00 （类似控制时间段）  
  > 展示不提供类似功能，如你愿意付费我可以考虑帮你实现。

* 弹出层中不能通过点击事件获得焦点，同样不能选中文字等等问题。  
> 这个可能是因为我禁用了 弹出层的mousedown事件的冒泡 ，新的输入框不能通过点击获得焦点
> 在代码中弹出层有如下一段代码。
> `buddle.mousedown(function(e) { return false })`
> `$(document).one("mousedown", function(){}）`
> 主要是和这个事件冲突，你可以把上面的mousedown事件注释掉，然后在这个时间里面判断点击的位置是否在buddle中，可以通过判断pos，或者eventtarget 是buddle 子元素的方式 

* 我想在弹出层中新增一个字段要怎么做?
> 首先你要在弹出层的html中添加对应的input或者select标签  
> 其次你在代码中必须对这个元素的取值赋值进行处理，并插入到post的请求参数中，还要存放到本地缓存中。
> 最后可能还要修改一些小瑕疵，根据你的测试情况，虽然我曾经帮别人实现过一次，但是时间过去的太久我已经记不得全部过程了。

* xgcalendar的版权问题，它收费吗？可用于商业项目嘛？
> xgcalendar是个开源项目，如果你把它使用到了你的商业项目中，我只要求你保留版权信息即可，不收取费用，当然你如果希望定制化的开发，那我可能会收取一些费用，视功能复杂情况而定。

* 关于wdcalendar,我发现这个程序和你的xgcalendar非常相似？
> 确实我也发现了，还是一个法国人告诉我的，wdcalendar在很早的时候就盗版了xgcalendar ，也不能说完全一字不改把，至少注释都改成英文了。我强烈鄙视这种行为，另外盗版了我一些其他的jquery插件号称是其作品。[http://www.web-delicious.com/jquery-plugins/](http://www.web-delicious.com/jquery-plugins/ "列表在此")，上面的插件都是我写的，这个站点也是盗版者的网站，虽然是全英文但是确实国人的，哎 受不了。

* 怎么添加农历？
> 农历可作为一类日程数据 在服务端生成 再在客户端上显示


## License

(The MIT License)

Copyright (c) 2014 Xuanye and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.