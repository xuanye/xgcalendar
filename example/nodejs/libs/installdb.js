var mysql      = require('mysql');

exports.installdb = function()
{
  var db = mysql.createConnection({
      host     : "localhost",
      user     : "root",
      password : "cjchnws"
  })
  db.queryFormat = function (query, values) {
      if (!values) return query;
      return query.replace(/\:(\w+)/g, function (txt, key) {
          if (values.hasOwnProperty(key)) {
              return this.escape(values[key]);
          }
          return txt;
      }.bind(this));
  };
  db.connect();

  if (!process.env.VCAP_SERVICES) {
      db.query('CREATE DATABASE IF NOT EXISTS test;', function (err) {
        if (err)  return console.log(err);
      });
      db.query('USE  test;', function (err) {
        if (err)  return console.log(err);
      });
  }
  var query = db.query('SHOW TABLES LIKE "calendar";', function (err, rows) {
        if (err) return console.log(err);

        //create table if it's not already setup
        if (rows.length == 0) {
            var sql = ""+
            "create table calendar\n"+
            "    (\n"+
            "    Id               int not null auto_increment comment '日程主键',\n"+
            "    Subject              varchar(2000) character set utf8 comment '日程标题',\n"+
            "    Location             varchar(200) character set utf8 comment '地点',\n"+
            "    MasterId             int,\n"+
            "    Description          varchar(500) character set utf8 comment '说明',\n"+
            "    CalendarType         tinyint default 1 comment '日程类型\n"+
            "    1   个人日程\n"+
            "    2   部门日程',\n"+
            "    StartTime            datetime not null comment '开始时间',\n"+
            "    EndTime              datetime not null comment '结束时间',\n"+
            "    IsAllDayEvent        bit not null default 0 comment '是否全天日程',\n"+
            "    HasAttachment        bit not null default 0 comment '是否有附件',\n"+
            "    Category             varchar(400) character set utf8 comment '分类',\n"+
            "    InstanceType         tinyint not null comment '实例类型\n"+
            "    0   Single（一般日程）\n"+
            "    1   Master（循环主日程）\n"+
            "    2   Instance（循环实例日程）\n"+
            "    3   Exception （错误）\n"+
            "    4   MeetingRequest（会议安排）',\n"+
            "    Attendees            varchar(500) character set utf8 comment '参与人',\n"+
            "    AttendeeNames        varchar(500) character set utf8 comment '参与人姓名',\n"+
            "    OtherAttendee        varchar(500) character set utf8 comment '其他参与人',\n"+
            "    UPAccount            varchar(100) character set utf8 comment '更新人账号',\n"+
            "    UPName               varchar(100) character set utf8 comment '更新人姓名',\n"+
            "    UPTime               datetime comment '最后一次更新时间',\n"+
            "    RecurringRule        varchar(1000) character set utf8 comment '循环规则',\n"+
            "    primary key (Id)\n"+
            ") ENGINE=innodb DEFAULT CHARSET=utf8;";
            //console.log(sql);
            db.query(sql, function (err) {
                if (err)
                    return console.log(err);
            });
        }

  });
  query.on('end',function(){
      db.end();
      console.log("数据库初始化已经完毕了");
  })

};