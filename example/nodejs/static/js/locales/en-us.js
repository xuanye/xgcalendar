function extend(defaultObject,extentObject){ //扩展object
    for(var  a in extentObject)
    {
        defaultObject[a] = extentObject[a];
    }
    return  defaultObject; 
}
var i18n = extend(i18n || {} , {
    xgcalendar: {
        dateformat: {
            "fulldaykey": "MMddyyyy",
            "fulldayshow": "L d yyyy",
            "fulldayvalue": "M/d/yyyy",
            "Md": "W M/d",
            "Md3": "L d",
            "AM": "am",
            "PM": "pm",
            "separator": "/",
            "year_index": 2,
            "month_index": 0,
            "day_index": 1,
            "day": "d",
            "sun": "Sun",
            "mon": "Mon",
            "tue": "Tue",
            "wed": "Wed",
            "thu": "Thu",
            "fri": "Fri",
            "sat": "Sat",
            "jan": "Jan",
            "feb": "Feb",
            "mar": "Mar",
            "apr": "Apr",
            "may": "May",
            "jun": "Jun",
            "jul": "Jul",
            "aug": "Aug",
            "sep": "Sep",
            "oct": "Oct",
            "nov": "Nov",
            "dec": "Dec"
        },
        "no_implemented": "No implemented yet",
        "to_date_view": "Click to the view of current date",
        "i_undefined": "Undefined",
        "allday_event": "All day event",
        "repeat_event": "Repeat event",
        "time": "Time",
        "event": "Event",
        "location": "Location",
        "participant": "Participant",
        "get_data_exception": "Exception when getting data",
        "new_event": "New event",
        "confirm_delete_event": "Do you confirm to delete this event? ",
        "confrim_delete_event_or_all": "Do you want to all repeat events or only this event? \r\nClick [OK] to delete only this event, click [Cancel] delete all events",
        "data_format_error": "Data format error! ",
        "invalid_title": "Event title can not be blank or contains ($<>)",
        "view_no_ready": "View is not ready",
        "example": "e.g., meeting at room 107",
        "content": "What",
        "create_event": "Create",
        "update_detail": "Edit details",
        "click_to_detail": "View details",
        "i_delete": "Delete",
        "day_plural": "days",
        "others": "Others",
        "item": ""
    }
});
extend(i18n || {} , {
    datepicker: {
        dateformat: {
            "fulldayvalue": "M/d/yyyy",
            "separator": "/",
            "year_index": 2,
            "month_index": 0,
            "day_index": 1,
            "sun": "Sun",
            "mon": "Mon",
            "tue": "Tue",
            "wed": "Wed",
            "thu": "Thu",
            "fri": "Fri",
            "sat": "Sat",
            "jan": "Jan",
            "feb": "Feb",
            "mar": "Mar",
            "apr": "Apr",
            "may": "May",
            "jun": "Jun",
            "jul": "Jul",
            "aug": "Aug",
            "sep": "Sep",
            "oct": "Oct",
            "nov": "Nov",
            "dec": "Dec",
            "postfix": ""
        },
        ok: " Ok ",
        cancel: "Cancel",
        today: "Today",
        prev_month_title: "prev month",
        next_month_title: "next month"
    }
});
extend(i18n || {} , {
    minicalendar: {
        dateformat: {
            "dateValueFormat": "M/d/yyyy",   
            "dateShowFormat" :"MMM yyyy",
            "sun": "Sun",
            "mon": "Mon",
            "tue": "Tue",
            "wed": "Wed",
            "thu": "Thu",
            "fri": "Fri",
            "sat": "Sat",
            "jan": "Jan",
            "feb": "Feb",
            "mar": "Mar",
            "apr": "Apr",
            "may": "May",
            "jun": "Jun",
            "jul": "Jul",
            "aug": "Aug",
            "sep": "Sep",
            "oct": "Oct",
            "nov": "Nov",
            "dec": "Dec",
            "postfix": ""        
        }       
    }
});
