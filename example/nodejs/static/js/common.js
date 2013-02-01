Date.prototype.Format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "w": "0123456".indexOf(this.getDay()),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    }
    return format;
};
function DateAdd(interval, number, idate) {
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
};

var popUpWin;
function PopUpCenterWindow(URLStr, width, height, newWin, scrollbars) {
    var popUpWin = 0;
    if (typeof (newWin) == "undefined") {
        newWin = false;
    }
    if (typeof (scrollbars) == "undefined") {
        scrollbars = 0;
    }
    if (typeof (width) == "undefined") {
        width = 800;
    }
    if (typeof (height) == "undefined") {
        height = 600;
    }
    var left = 0;
    var top = 0;
    if (screen.width >= width) {
        left = Math.floor((screen.width - width) / 2);
    }
    if (screen.height >= height) {
        top = Math.floor((screen.height - height) / 2);
    }
    if (newWin) {
        open(URLStr, '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=' + scrollbars + ',resizable=yes,copyhistory=yes,width=' + width + ',height=' + height + ',left=' + left + ', top=' + top + ',screenX=' + left + ',screenY=' + top + '');
        return;
    }

    if (popUpWin) {
        if (!popUpWin.closed) popUpWin.close();
    }
    popUpWin = open(URLStr, 'popUpWin', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=' + scrollbars + ',resizable=yes,copyhistory=yes,width=' + width + ',height=' + height + ',left=' + left + ', top=' + top + ',screenX=' + left + ',screenY=' + top + '');
    popUpWin.focus();
}

function OpenModalDialog(url, option) {
    option.type = 2;
    if ($.ShowIfrmDailog) {
        $.ShowIfrmDailog(url, option);
    }
}
function CloseModalDialog(callback, dooptioncallback, userstate) {
    if (parent && parent.$.closeIfrm) {
        parent.$.closeIfrm(callback, dooptioncallback, userstate);
    }
}

function StrFormat(temp, dataarry) {
    return temp.replace(/\{([\d]+)\}/g, function (s1, s2) { var s = dataarry[s2]; if (typeof (s) != "undefined") { if (s instanceof (Date)) { return s.getTimezoneOffset() } else { return encodeURIComponent(s) } } else { return "" } });
}
function StrFormatNoEncode(temp, dataarry) {
    return temp.replace(/\{([\d]+)\}/g, function (s1, s2) { var s = dataarry[s2]; if (typeof (s) != "undefined") { if (s instanceof (Date)) { return s.getTimezoneOffset() } else { return (s); } } else { return ""; } });
}
function showValidateError(error, element) {
    //var close = $("<a href=\"javascript:void(0)\" class=\"valiclose\">&nbsp;</a>").click(removeParent);  
    var pos = element.position();
    var height = element.height();
    if (pos.left + 155 >= document.documentElement.clientWidth) {
        pos.left = document.documentElement.clientWidth - 156;
    }
    var newpos = { left: pos.left, top: pos.top + height + 2 }
    error.appendTo("#fmEdit").css(newpos);
}
function buildAjaxHandlerUrl(controller, action, paras) {
    var url = "/{0}/{1}.do{2}";
    var qstring = [];
    if (paras) {
        qstring.push("?");
        for (var a in paras) {
            qstring.push(a, "=", encodeURIComponent(paras[a]));
        }
    }
    return StrFormatNoEncode(url, [controller, action, qstring.join("")]);
}
