<?php
ob_start();
header("Content-type:application/json; charset=utf-8"); 
require_once('includes/prefs.inc.php');
require_once('includes/db.php');
require_once('resources/i18n.php');
ob_end_flush();
if( IsPost() ) // 如果是post提交数据
{
	
	$mode = getPref('mode');
	switch($mode)
	{
		case "get":
			GetCalendarsByRange();
			break;
		case "quickadd":
			QuickAdd();
			break;
		case "quickupdate":
			QuickUpdate();
			break;
		case "quickdelete":
			QuickDelete();
			break;
		default :
			DefaultImpl();
			break;
	}
	
}
function DefaultImpl()
{
	$ret = array();
	$ret["error"] = array("ErrorCode"=>"NotVolidMode","ErrorMsg"=>"") ;
	echo json_encode($ret);
}
function QuickAdd()
{
	$ret = array();
 	$subject = getPref("CalendarTitle");
	$strStartTime = getPref("CalendarStartTime");
	$strEndTime =  getPref("CalendarEndTime");
	$isallday =  getPref("IsAllDayEvent");
	$clientzone = getPref('timezone');
	$serverzone= TIMEZONE_INDEX;
	$zonediff = $serverzone-$clientzone ; 
	$start_date = DateTime::createFromFormat(msg("datestring")." H:i",$strStartTime);
	if ($start_date==null) {
		$ret["IsSuccess"] =false;
		$ret["Msg"] =msg("notvoliddatetimeformat").":".$strStartTime;
		echo json_encode($ret); 
		return;
	}
	$end_date = DateTime::createFromFormat(msg("datestring")." H:i",$strEndTime);
	if ($end_date==null) {
		$ret["IsSuccess"] =false;
		$ret["Msg"] =msg("notvoliddatetimeformat").":".$strEndTime;
		echo json_encode($ret);
		return;
	}
	
	try
	{
		$cal = array(
		"CalendarType" => 1,
		"InstanceType" => 0,
		"Subject" => $subject,
		"StartTime" => addtime($start_date,$zonediff,0,0),
		"EndTime" => addtime($end_date,$zonediff,0,0),
		"IsAllDayEvent" => $isallday == "1"?1:0,
		"UPAccount" => GetClientIP(),
		"UPName" => msg("admin"),
		"UPTime" => new DateTime(),
		"MasterId" => $clientzone
		);
		//print_r($cal);
		$newid = DbInsertCalendar($cal);
		if($newid>0)
		{
			$ret["IsSuccess"] =true;
			$ret["Msg"] =msg("successmsg");
			$ret["Data"] = $newid;
		}
		else 
		{
			$ret["IsSuccess"] =false;
			$ret["Msg"] =msg("dberror");
		}
	}
	catch(Exception $e)
	{
			$ret["IsSuccess"] =false;
			$ret["Msg"] = $e->getMessage();
	}
	echo json_encode($ret);
}
function QuickUpdate()
{
	$ret =array();
	try
	{
		
		$id =getPref("calendarId");
		//echo getPref("CalendarStartTime")."|";
		//echo getPref("CalendarEndTime")."|";
		//echo msg(datestring)."|";
		$start_time = DateTime::createFromFormat(msg(datestring)." H:i",getPref("CalendarStartTime"));
		$end_time = DateTime::createFromFormat(msg(datestring)." H:i",getPref("CalendarEndTime"));

		$clientzone = getPref('timezone');
		$serverzone= TIMEZONE_INDEX;
		$zonediff = $serverzone-$clientzone ; 
		$rcount = DbUpdateCalendar($id ,addtime($start_time,$zonediff,0,0)->format("Y-m-d H:i:s"),addtime($end_time,$zonediff,0,0)->format("Y-m-d H:i:s"),$clientzone);
	
		if($rcount>0)
		{
			$ret["IsSuccess"] =true;
			$ret["Msg"] =msg("successmsg");
		}
		else
		{
			$ret["IsSuccess"] =false;
			$ret["Msg"] =msg("dberror");
		}
	}
	catch(Exception $e)
	{
			$ret["IsSuccess"] =false;
			$ret["Msg"] = $e->getMessage();
	}
	echo json_encode($ret);
}
function QuickDelete()
{

	/*
	Id = self.request.get("calendarId");
	  dao = resp()
	  dao.delete_calendar(Id) 
	  msg={"IsSuccess":True,"Msg":"操作成功!"}
	*/
	$ret =array();
	try
	{
		$id =getPref("calendarId");
		$rcount =DbDeleteCalendar($id );
		if($rcount>0)
		{
			$ret["IsSuccess"] =true;
			$ret["Msg"] =msg("successmsg");
		}
		else
		{
			$ret["IsSuccess"] =false;
			$ret["Msg"] =msg("dberror");
		}
	}
	catch(Exception $e)
	{
			$ret["IsSuccess"] =false;
			$ret["Msg"] = $e->getMessage();
	}
	echo json_encode($ret);
}
function strtodate($strdata)
{	
	
	$date= date_create_from_format(msg(datestring),$strdata );
	
	return $date;
}
function GetCalendarsByRange()
{
	$ret = array();
	$view_Type = getPref('viewtype'); // week,month,day
	$str_show_day = getPref('showdate'); // 当前是那一天 
	$clientzone = getPref('timezone');
	$serverzone= TIMEZONE_INDEX;
	$zonediff = $serverzone-$clientzone ; 
	$showday = strtodate($str_show_day);

	if (($timestamp =  date_timestamp_get($showday)) === false) {
		echo 1;
		$ret["error"] = array("ErrorCode"=>"NotVolidDateTimeFormat","ErrorMsg"=>msg("notvoliddatetimeformat")) ;//替换成
	}
	else
	{
		
		$dataformat = GetCalendarViewFormat($view_Type ,$timestamp);
		$qstart = $dataformat['start_date'] +$zonediff*3600;
		$qend = $dataformat['end_date'] +$zonediff*3600;		
		//查询数据库 GetClientIP();
		// {"start":start,"end":end,"error":error,"issort":issort,"events":jsonlist}
		$ret["start"] = TimestampToJsonTime($dataformat['start_date']);
		$ret["end"] = TimestampToJsonTime( $dataformat['end_date']);
		
		$ret["error"] =NUll;
		$ret["issort"] =TRUE;
		//print_r($ret);	
		$ret["events"] = DbQueryCalendars(date("Y-m-d H:i:s",$qstart),date("Y-m-d H:i:s",$qend),GetClientIP(),$zonediff);	
		
	}
	echo json_encode($ret);
}
function DbDeleteCalendar($id)
{
	$db = db_connect();
	$id = safeparam($id);
	$sql = "delete from  calendar where Id={$id}";

	$affected_rowscount =$db->exec($sql);
	
	if($affected_rowscount>0)
	{
		return $affected_rowscount;
	}		
	return -1;
}
function DbUpdateCalendar($id,$start_date,$end_date,$client_zone)
{
	$db = db_connect();
	$start_date = safeparam($start_date);
	$end_date = safeparam($end_date);
	$id = safeparam($id);
	$sql = "UPDATE calendar set  StartTime='{$start_date}',EndTime='{$end_date}',MasterId='{$client_zone}' where Id={$id}";

	$affected_rowscount =$db->exec($sql);	
	
	if($affected_rowscount>0)
	{
		//echo $affected_rowscount;
		return $affected_rowscount;
	}	
	return -1;
}
function DbInsertCalendar($cal)
{
	$db = db_connect();
	
	$sql = "INSERT INTO calendar (Subject,Location,MasterId,Description,
				CalendarType,StartTime,EndTime,IsAllDayEvent,HasAttachment,
				Category,InstanceType,Attendees,AttendeeNames,OtherAttendee,
				UPAccount,UPName,UPTIME) 
				VALUES  ('".IsNullThenEmpty($cal,"Subject")."',
				'".IsNullThenEmpty($cal,"Location")."',{$cal["MasterId"]},
				'".IsNullThenEmpty($cal,"Description")."',{$cal["CalendarType"]}
				,'".$cal["StartTime"]->format('Y-m-d H:i:s')."','".$cal["EndTime"]->format('Y-m-d H:i:s')."',".IsNullThenFalse($cal,"IsAllDayEvent")."
				,".IsNullThenFalse($cal,"HasAttachment").",'".IsNullThenEmpty($cal,"Category")."'
				,0,'".IsNullThenEmpty($cal,"Attendees")."','".IsNullThenEmpty($cal,"AttendeeNames")."'
				,'".IsNullThenEmpty($cal,"OtherAttendee")."','".IsNullThenEmpty($cal,"UPAccount")."',
				'".IsNullThenEmpty($cal,"UPName")."',now())";
	$ret =-1;
	
	$affected_rowscount =$db->exec($sql);
	
	if($affected_rowscount>0)
	{
		$ret =$db->lastInsertId();
	}		

	return $ret;
}
function IsNullThenEmpty($arr,$key)
{
	if(isset($arr[$key]))
	{
		return safeparam($arr[$key]);		
	}	
	else 
	{
		return "";
	}
}
function IsNullThenFalse($arr,$key)
{
	if(isset($arr[$key]))
	{
		return $arr[$key];
	}	
	else 
	{
		return 0;	
	}
}
function DbQueryCalendars($qstart,$qend,$userId,$zonediff)
{
	$db = db_connect();	
	
	$result = $db->query("SELECT * FROM calendar where StartTime<'{$qend}' and EndTime>'{$qstart}' and UPAccount='{$userId}' order by StartTime,EndTime");		

	$ret =array();	

	if($result)
	{
		//echo date("ymd",$row["StartTime"]);
		//echo date("ymd",$row["EndTime"]);
		foreach ($result as $row) {
			$ret[] = array(
				$row["Id"],$row["Subject"],
				TimeToJsonTime($row["StartTime"]),
				TimeToJsonTime($row["EndTime"]),
				$row["IsAlldayEvent"]?1:0,
				TimeToTimeStringFormat($row["StartTime"],"Ymd")==TimeToTimeStringFormat($row["EndTime"],"Ymd")? 0:1,
				1,
				$row["Category"]=="1"?1:0,1,$row["Attendees"],$row["Location"]
			);		
		}		
		
	}
	
	return $ret;
}

?>
