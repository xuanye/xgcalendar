var mysql      = require('mysql');

function GetConnection(usecusformat)
{
    var db = mysql.createConnection({
        host     : "localhost",
        user     : "xgcalendar",
        password : "xgcalendar@123",
        database : "xgcalendar"
    })
    if(usecusformat)
    {
        db.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                else{
                    return this.escape(null);
                }
            }.bind(this));
        };
    }
    return db;
}
exports.GetCalendar = function(id,userid,datacb,errcb) {
    var db  = GetConnection(true);
    db.connect();
    var sql = "SELECT * FROM calendar where id=:Id and UPAccount=:account order by StartTime,EndTime";
    db.query(sql,{Id:id,account:userid},
        function(err,r){ //数据放回来
            db.end();
            if(err)
            {
                console.log(err);
                if(errcb)
                {
                    errcb(err);
                }
                return;
            }          
            if(r && datacb)
            {        
                if(datacb)
                    datacb(r);                
            }
           
    });
    //console.log(q.sql);
}
exports.QueryCalendar = function(qstart,qend,userId,zonediff,datacb,errcb) {
    var db  = GetConnection(true);
    db.connect();
    var sql = "SELECT * FROM calendar where StartTime<:end and EndTime>:start and UPAccount=:account order by StartTime,EndTime";
    db.query(sql,{start:qstart,end:qend,account:userId},
        function(err,r){ //数据放回来
            db.end();
            if(err)
            {
                console.log(err);
                if(errcb)
                {
                    errcb(err);
                }
                return;
            }          
            if(r && datacb)
            {        
                if(datacb)
                    datacb(r);                
            }
           
    });
    //console.log(q.sql);
}
exports.addCalendar = function(calendar,cb,errcb){
    var db = GetConnection(true);
    db.connect();
    var sql = "INSERT INTO `calendar`"+
        "(`Subject`,`Location`,`MasterId`,`Description`,`CalendarType`,`StartTime`,`EndTime`"+
    ",`IsAllDayEvent`,`HasAttachment`,`Category`,`InstanceType`,`Attendees`,`AttendeeNames`"+
    ",`OtherAttendee`,`UPAccount`,`UPName`,`UPTime`,`RecurringRule`) "+
    "VALUES "+
        "(:Subject,:Location,:MasterId,:Description,:CalendarType,:StartTime,:EndTime"+
        ",:IsAllDayEvent,:HasAttachment,:Category,:InstanceType,:Attendees,:AttendeeNames"+
        ",:OtherAttendee,:UPAccount,:UPName,:UPTime,:RecurringRule) "
    db.query(sql,calendar,function(err,result){
        db.end();
        if(err)
        {
            console.log(err);
            if(errcb)
            {
                errcb(err);
            }
            return;
        }
        if(cb)
        {
            cb(result.insertId);
        }
    });
    //console.log(q.sql);
}
exports.UpdateCalendar = function(id,userid,calendar,cb,errcb){
    var db = GetConnection();
    db.connect();
    var sql = "UPDATE `calendar` SET ? WHERE Id="+id+" and UPAccount='"+userid+"'";
    db.query(sql,calendar,function(err,result){
        db.end();
        if(err)
        {
            console.log(err);
            if(errcb)
            {
                errcb(err);
            }
            return;
        }
        if(cb)
        {
            var affectedRows = result != null? result.affectedRows:0;
            cb(affectedRows);
        }
    });
    //console.log(q.sql);
}
exports.DeleteCalendar =  function(id,userid,cb,errcb){
    var db = GetConnection();
    db.connect();
    var sql = "DELETE FROM `calendar` WHERE Id="+id+" and UPAccount='"+userid+"'";
    db.query(sql,function(err,result){
        db.end();
        if(err)
        {
            console.log(err);
            if(errcb)
            {
                errcb(err);
            }
            return;
        }
        if(cb)
        {
            var affectedRows = result != null? result.affectedRows:0;
            cb(affectedRows);
        }
    });
}