<?php
define("TIMEZONE_INDEX",8);
define("WEEK_START",1);


$cookie_prefix = "xgcalendar_";

//
// Get preference
//
function getPref($key) {
	
	global $cookie_prefix, $_POST, $_GET, $_COOKIE;
	
	if(isset($_POST[$key])) {
		return $_POST[$key];
	} elseif(isset($_GET[$key])) {
		return $_GET[$key];
	} elseif(isset($_COOKIE[$cookie_prefix.$key])) {
		return $_COOKIE[$cookie_prefix.$key];		
	}
}
function IsPost()
{
	return $_SERVER['REQUEST_METHOD']=='POST';
}
function GetCalendarViewFormat($viewType, $showdate)
{
	
	$ret =array();	
	$date =getdate($showdate);
	switch ($viewType)
	{ 
		case "day": //日
			$ret["start_date"] = mktime(0, 0, 0, $date['mon'], $date['mday'], $date['year'] );
			$ret["end_date"] =mktime(0, 0, -1,$date['mon'], $date['mday']+1, $date['year'] );
			break;
		case "week": // 周            
			$index = WEEK_START ;//0     
			             
			$w = $index -$date['wday'] ;//0-1
			if ($w > 0) $w = $w - 7;
			
			$ret["start_date"] =mktime(0, 0, 0,  $date['mon'], $date['mday']+$w, $date['year']);
			$ret["end_date"] =mktime(0, 0, -1,  $date['mon'], $date['mday']+$w+7, $date['year']);
			//echo date("y-m-d",$ret["start_date"])."|".date("y-m-d",$ret["end_date"]);
			break;
		case "month": // 月         
			$first_date = new DateTime();
			$first_date->setDate($date['year'] , $date['mon'] , 1);
			$index = WEEK_START ;//0    
			$first_time = $first_date->getTimestamp();
			$first_time_format = getdate($first_time);
			$w = index - date("w",$first_time) ;//0-1
			if ($w > 0){
				$w -= 7;
			}
			$ret["start_date"] =mktime(0, 0, 0, $first_time_format["mon"],  $first_time_format["mday"]+$w ,  $first_time_format["year"]);
			$ret["end_date"] =mktime(23, 59, 59,$first_time_format["mon"],  $first_time_format["mday"]+37 ,  $first_time_format["year"]);

			if ( date("Y",$ret["end_date"] ) == showday.Year && date("m",$ret["end_date"] ) == showday.Month && date("m",$ret["end_date"]+mktime(0,0,0,0,1,0)) == date("m",$ret["end_date"]))
			{
				$ret["end_date"] =$ret["end_date"] + mktime(0,0,0,0,7,0) ;
			}			
			break;
	}
	return $ret ;
}
function GetClientIP()
{
	if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown"))
           $ip = getenv("HTTP_CLIENT_IP");
       else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown"))
           $ip = getenv("HTTP_X_FORWARDED_FOR");
       else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown"))
           $ip = getenv("REMOTE_ADDR");
       else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown"))
           $ip = $_SERVER['REMOTE_ADDR'];
       else
           $ip = "unknown";
   return($ip);
}
function TimestampToFullJsonTime($time)
{
	return "new Date(".$time."000)";
}
function TimeToTimeStringFormat($time,$format)
{
	$datetime = new DateTime($time);
	return $datetime->format($format);

}
function TimestampToJsonTime($time)
{
	return "/Date(".$time."000)/";
}
function TimeToFullJsonTime($time)
{
	$datetime = new DateTime($time);
	return TimestampToFullJsonTime($datetime->getTimestamp());
}
function TimeToJsonTime($time)
{
	$datetime = new DateTime($time);
	return TimestampToJsonTime($datetime->getTimestamp());
}
function addtime($date,$hours,$minutes,$seconds )
{
	 $date->setTimestamp($date->getTimestamp() +$hours*3600+$minutes*60+$seconds);
	 return $date;
}
function safeparam($str)
{
	if($str==null || $str=="")
	{
		return "";
	}
	else
	{
		$vowels= array("'",";","--");
		return str_replace($vowels, "",$str);
	}
}
?>
