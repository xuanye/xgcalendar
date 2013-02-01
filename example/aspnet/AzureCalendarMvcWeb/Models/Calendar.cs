using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SubSonic.SqlGeneration.Schema;

namespace AzureCalendarMvcWeb.Models
{
    
 	public class Calendar
	{		
	    #region property
		 /// <summary>
    	///  主键标识自增
    	/// </summary>
        [SubSonicPrimaryKey]
		public int Id
		{
			get;set;
		}
		 /// <summary>
    	///  标题
    	/// </summary>
		public string Subject
		{
			get;set;
		}
		/// <summary>
    	///  地点
    	/// </summary>
        [SubSonicNullString]
		public string Location
		{
			get;set;
		}
		 /// <summary>
    	///  循环主日程Id
    	/// </summary>
		public int? MasterId
		{
			get;set;
		}
		
        /// <summary>
    	///  描述
    	/// </summary>
        [SubSonicNullString]
		public string Description
		{
			get;set;
		}
        
        /// <summary>
        /// 日程的类型
        /// </summary>
        /// <value>The calendartype.</value>
		public int CalendarType
		{
			get;set;
		}
		 /// <summary>
    	///  开始时间
    	/// </summary>
		public DateTime StartTime
		{
			get;set;
		}
		 /// <summary>
    	///  结束时间
    	/// </summary>
		public DateTime EndTime
		{
			get;set;
		}
		 /// <summary>
    	///  是否全天日程
    	/// </summary>
		public bool IsAllDayEvent
		{
			get;set;
		}
		 /// <summary>
    	///  是否有附件
    	/// </summary>
		public bool HasAttachment
		{
			get;set;
		}
		 /// <summary>
    	///  类别
    	/// </summary>
        [SubSonicNullString]
		public string Category
		{
			get;set;
		}
	    /// <summary>
       ///  实例类型(周期类型)
       ///0	Single（一般日程）
       ///1	Master（循环主日程）
       ///2	Instance（循环实例日程）
       ///3	Exception （错误）
       ///4	MeetingRequest（会议安排）
    	/// </summary>
		public int InstanceType
		{
			get;set;
		}
		 /// <summary>
    	///  参与人帐号或者邮件，多个
    	/// </summary>
        [SubSonicNullString]
		public string Attendees
		{
			get;set;
		}
		 /// <summary>
    	///  参与人姓名，多个
    	/// </summary>
        [SubSonicNullString]
		public string AttendeeNames
		{
			get;set;
		}
		 /// <summary>
    	///  其他参与人，填入邮件
    	/// </summary>
        [SubSonicNullString]
		public string OtherAttendee
		{
			get;set;
		}
		 /// <summary>
    	///  最后一个修改人账号
    	/// </summary>
		public string UPAccount
		{
			get;set;
		}
		 /// <summary>
    	///  最后一个修改人名称
    	/// </summary>
		public string UPName
		{
			get;set;
		}
		 /// <summary>
    	///  最后一次修改时间
    	/// </summary>    
		public DateTime UPTime
		{
			get;set;
		}
		 /// <summary>
    	///  循环规则
    	/// </summary>
        [SubSonicNullString]
		public string RecurringRule
		{
			get;set;
		}
	 #endregion property	
	}
}
