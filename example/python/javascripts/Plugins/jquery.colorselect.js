/// <reference path="../intellisense/jquery-1.2.6-vsdoc-cn.js" />
(function($) {
    $.fn.DhoverClass = function(className) {
        return $(this).hover(function() { $(this).addClass(className); }, function() { $(this).removeClass(className); });
    }
    function getDulyOffset(target, w, h) {
        var pos = target.offset();
        var height = target.outerHeight();
        var newpos = { left: pos.left, top: pos.top + height - 1 }
        var bw = $(document).width();
        var bh = $(document).height();
        if ((newpos.left + w) >= bw) {
            newpos.left = bw - w - 2;
        }
        if ((newpos.top + h) >= bh && bw > newpos.top) {
            newpos.top = pos.top - h - 2;
        }
        return newpos;
    }
    $.fn.colorselect = function(option) {        
        var options = $.extend({
            hiddenid: null,
            title: "点击设置颜色",
            width: 90,
            height: 90,
            //defaultcolor: "CF9CB5",
            index: "-1",
            cssClass: "bbit-dropdown"
        }, option);
        var me = $(this);
        var id = me.attr("id");
        if (id == null || id == "")
            id = new Date();
        me.addClass("containtdiv");
        var leftId = "divleft" + id;
        var leftdiv = $("<div/>").addClass("leftdiv").attr("id", leftId).appendTo(me);
        var aitem = '<a href="#" id="{1}-{0}" key="{2}" hidefocus="on"><em><span style="background:#{0};border:solid 1px #{3}" unselectable="on">&#160;</span></em></a>';



        var colors = [

        // "F7B281", "EA878B", "FDFC77", "8DADE1", "9CDA95", "CF9CB5"

    ];
        var borders = [];


        // "橙色类别", "红色类别", "黄色类别", "蓝色类别", "绿色类别", "紫色类别"

        var d = "666666888888aaaaaabbbbbbdddddda32929cc3333d96666e69999f0c2c2b1365fdd4477e67399eea2bbf5c7d67a367a994499b373b3cca2cce1c7e15229a36633cc8c66d9b399e6d1c2f029527a336699668cb399b3ccc2d1e12952a33366cc668cd999b3e6c2d1f01b887a22aa9959bfb391d5ccbde6e128754e32926265ad8999c9b1c2dfd00d78131096184cb05288cb8cb8e0ba52880066aa008cbf40b3d580d1e6b388880eaaaa11bfbf4dd5d588e6e6b8ab8b00d6ae00e0c240ebd780f3e7b3be6d00ee8800f2a640f7c480fadcb3b1440edd5511e6804deeaa88f5ccb8865a5aa87070be9494d4b8b8e5d4d47057708c6d8ca992a9c6b6c6ddd3dd4e5d6c6274878997a5b1bac3d0d6db5a69867083a894a2beb8c1d4d4dae54a716c5c8d8785aaa5aec6c3cedddb6e6e41898951a7a77dc4c4a8dcdccb8d6f47b08b59c4a883d8c5ace7dcce";
        var theme = 1;
        var init = theme * 6;
        for (var i = init; i < d.length; i = i + 30) {
            colors.push(d.substr(i, 6));
            borders.push(d.substr(i - 6, 6));
        }

        // return "#" + d.substring(c * 30 + i * 6, c * 30 + (i + 1) * 6);
        var html = [];
        for (var i = 0; i < colors.length; i++) {
            var atemp = [];
            var cucolor = colors[i];
            atemp.push(cucolor);
            atemp.push(id);
            atemp.push(i);
            atemp.push(borders[i]);
            var ahtml = StrFormatNoEncode(aitem, atemp);
            html.push(ahtml);
        }
        var blanka = '<a href="#" id="{1}-{0}" key="{2}" hidefocus="on"><em><span style=" text-align:center; width:46px;padding-top:2px; height:11px;border:solid 1px #8B7B8B;" unselectable="on">无</span></em></a>'
        var blank = [];
        blank.push("ffffff");
        blank.push(id);
        blank.push(-1);

        html.push(StrFormatNoEncode(blanka, blank));
        var result = html.join('');

        // var innerdiv = $("<div />").addClass("centerdiv").html(result);
        // html.push('</div>');
        var div = $("<div />").addClass("x-color-palette").css({
            position: "absolute",
            "z-index": "999",
            "overflow": "auto",
            width: options.width,
            height: options.height,
            display: "none"
            //"border": "solid 1px #555"

        }).attr("id", "div" + id).html(result).appendTo("body");
        // 颜色选取
        $("#div" + id + "  a").click(function(e) {
            //debugger;
            var co = $(this).attr("id");

            var selectcolor = co.split('-')[1];
            leftdiv.css("background", "#" + selectcolor);
            var key = $(this).attr("key");
            //if (key != -1) {
            leftdiv.css("border", $(this).find("span").css("border"));
            // }
            //else {
            //leftdiv.css("border", "none");
            // }
            if (options.hiddenid != null && options.hiddenid != "") {
                $("#" + options.hiddenid).val(key);
            }
            div.hide();
            return false;
        });
        // 弹出下拉
        me.click(function() {
            var pos = getDulyOffset(me, 120, 200);
            div.css(pos);
            div.show();
            $(document).one("click", function(event) { div.hide(); });
            return false;
        });
        // me.addClass(options.cssClass).DhoverClass("hover");
        //获取颜色描述的索引
        function getcolorbyindex(index) {
            if (index >= 0 && index < colors.length)
                return colors[index];
            return "ffffff";
        }

        leftdiv.css("background", "#" + getcolorbyindex(options.index));
        if (options.index != -1) {
            leftdiv.css("border", " solid 1px " + "#" + borders[options.index]);
        }
        else {
            leftdiv.css("border", "solid 1px #8B7B8B");
        }
        if (options.hiddenid != null && options.hiddenid != "") {
            $("#" + options.hiddenid).val(options.index);
        }
        /*     */
        me.attr("title", options.title);
        return me;

    } // endof colorselect
})(jQuery);