; (function($) {
    if ($.ShowIfrmDailog) {
        return;
    }
    $.escapeHTML = function(string) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(string));
        return div.innerHTML;
    };
    $.documentCenter = function(el) {
        el = $(el);
        el.css({
            position: 'absolute',
            left: Math.max((document.documentElement.clientWidth - el.width()) / 2 + document.documentElement.scrollLeft, 0) + 'px',
            top: Math.max((document.documentElement.clientHeight - el.height()) / 2 + document.documentElement.scrollTop, 0) + 'px'
        });
    };
    $.getMargins = function(e, toInteger) {
        var el = jQuery(e);
        var t = el.css('marginTop') || '';
        var r = el.css('marginRight') || '';
        var b = el.css('marginBottom') || '';
        var l = el.css('marginLeft') || '';
        if (toInteger)
            return {
                t: parseInt(t) || 0,
                r: parseInt(r) || 0,
                b: parseInt(b) || 0,
                l: parseInt(l)
            };
        else
            return { t: t, r: r, b: b, l: l };
    };
    function Tp(temp, dataarry) {
        return temp.replace(/\$\{([\w]+)\}/g, function(s1, s2) { var s = dataarry[s2]; if (typeof (s) != "undefined") { return s; } else { return s1; } });
    }
    var opening = false;
    $.ShowIfrmDailog = function(url, options) {
        if (opening) {
            return;
        }
        opening = true;
        options = $.extend({
            width: 600,
            height: 400,
            caption: '',
            enabledrag: true,
            type: 1,
            onclose: null
        }, options);
        var newid = (new Date()).valueOf();
        options.newid = newid;
        options.caption = $.escapeHTML(options.caption);
        var wp = 14;
        if (options.type == 1) {
            var box = $("<div id='dailog_" + newid + "' class='bbit-window bbit-window-plain'></div>");
            var headtemplete = "<div id='dailog_head_${newid}' class='bbit-window-tl'><div class='bbit-window-tr'><div class='bbit-window-tc'><div style='mozuserselect: none; khtmluserselect: none' class='bbit-window-header' unselectable='on'><div class='bbit-tool bbit-tool-close'>&nbsp;</div><span class='bbit-window-header-text'>${caption}</span></div></div></div></div>";
            var bodytemplete = "<div class='bbit-window-bwrap'><div class='bbit-window-ml'><div class='bbit-window-mr'><div class='bbit-window-mc'><div id='dailog_body_${newid}' style='width: ${width}px; height: ${height}px' class='bbit-window-body'>${iframehtml}</div></div></div></div><div class='bbit-window-bl'><div class='bbit-window-br'><div class='bbit-window-bc'><div class='bbit-window-footer'></div></div></div></div></div>";
        }
        else {
            var wp = 0;
            var box = $("<div id='dailog_" + newid + "' class='bbit-window bbit-window-dailog'></div>");
            var headtemplete = "<div id='dailog_head_${newid}' class='bbit-dailog-tl'></div>";
            var bodytemplete = "<div class='bbit-window-bwrap'><div id='dailog_body_${newid}' style='width: ${width}px; height: ${height}px' class='bbit-window-body'>${iframehtml}</div></div>";
        }
        var iframetemplete = '<iframe id="dailog_iframe_${newid}" border="0" frameBorder="0" src="${url}" style="border:none;width:${width}px;height:${height}px"></iframe>';
        options.url = url + (url.indexOf('?') > -1 ? '&' : '?') + '_=' + (new Date()).valueOf();
        var html = [];
        options.iframehtml = Tp(iframetemplete, options);
        html.push(Tp(headtemplete, options));
        html.push(Tp(bodytemplete, options));
        box.css({ width: options.width + wp,zIndex:'999' }).html(html.join(""));
        var closebtn = box.find("div.bbit-tool-close")
        .hover(function(e) { $(this).addClass("hover") }, function(e) { $(this).removeClass("hover") })
        .click(closedialog);
        var margins = $.getMargins(document.body, true);
        var overlayer = $('<div></div>').css({
            position: 'absolute',
            left: 0,
            top: 0,
            width: Math.max(document.documentElement.clientWidth, document.body.scrollWidth),
            height: Math.max(document.documentElement.clientHeight, document.body.scrollHeight + margins.t + margins.b),
            zIndex: '998',
            background: '#fff',
            opacity: '0.5'
        }).bind('contextmenu', function() { return false; }).appendTo(document.body);
        var isdrag = false;
        if (options.enabledrag) {
            if ($.fn.easydrag) {
                box.addClass("bbit-window-draggable").easydrag(false)
                //.setHandler("dailog_head_" + newid)
                .ondrag(function(e) {
                    if (isdrag == false) {
                        isdrag = true;
                        $("#dailog_body_" + newid).css("visibility", "hidden");
                    }
                }).ondrop(function(e) {
                    isdrag = false;
                    $("#dailog_body_" + newid).css("visibility", "visible");
                });
            }
        }
        box.appendTo(document.body);
        $.documentCenter(box);
        if ($.browser.msie6) {
            $(document.body).addClass("hiddenselect");
            document.getElementById("dailog_iframe_" + newid).src = options.url;
        }
        else if ($.browser.msie7) {
            document.getElementById("dailog_iframe_" + newid).src = options.url;
        }
        function closedialog(e) {
            $.closeIfrm();
        }
        function returnfalse() { return false; }
        $.closeIfrm = function(callback, d,userstate) {
            $.closeIfrm = returnfalse;
            if ($.browser.msie6) {
                $(document.body).removeClass("hiddenselect");
            }
            overlayer.remove();
            closebtn.remove();
            box.remove();
            opening = false;
            closebtn = overlayer = box = null;
            callback && callback();
            if (d && options.onclose) {
                options.onclose(userstate);
                options.onclose = null;
            }
        };
    }
})(jQuery);