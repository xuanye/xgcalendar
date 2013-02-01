drop table if exists calendar;

/*==============================================================*/
/* Table: calendar                                              */
/*==============================================================*/
create table calendar
(
   Id                   int not null auto_increment comment '日程主键',
   Subject              varchar(2000) character set utf8 comment '日程标题',
   Location             varchar(200) character set utf8 comment '地点',
   MasterId             int,
   Description          varchar(500) character set utf8 comment '说明',
   CalendarType         tinyint default 1 comment '日程类型
            1	个人日程
            2	部门日程',
   StartTime            datetime not null comment '开始时间',
   EndTime              datetime not null comment '结束时间',
   IsAllDayEvent        bit not null default 0 comment '是否全天日程',
   HasAttachment        bit not null default 0 comment '是否有附件',
   Category             varchar(400) character set utf8 comment '分类',
   InstanceType         tinyint not null comment '实例类型
            0	Single（一般日程）
            1	Master（循环主日程）
            2	Instance（循环实例日程）
            3	Exception （错误）
            4	MeetingRequest（会议安排）',
   Attendees            varchar(500) character set utf8 comment '参与人',
   AttendeeNames        varchar(500) character set utf8 comment '参与人姓名',
   OtherAttendee        varchar(500) character set utf8 comment '其他参与人',
   UPAccount            varchar(100) character set utf8 comment '更新人账号',
   UPName               varchar(100) character set utf8 comment '更新人姓名',
   UPTime               datetime comment '最后一次更新时间',
   RecurringRule        varchar(1000) character set utf8 comment '循环规则',
   primary key (Id)
);
