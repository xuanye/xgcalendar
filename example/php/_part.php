<?php
require_once('includes/prefs.inc.php');
require_once('includes/db.php');

$date = new DateTime();

$timestamp = $date->getTimestamp();
$dataformat = GetCalendarViewFormat("week" ,$timestamp);
$clientzone =8;
$serverzone= TIMEZONE_INDEX;
$zonediff = $serverzone-$clientzone ; 
$qstart = $dataformat['start_date'] +$zonediff*3600;
$qend = $dataformat['end_date'] +$zonediff*3600;		
$qstart  = date("Y-m-d H:i:s",$qstart);
$qend = date("Y-m-d H:i:s",$qend);
$userid =GetClientIP();
$db = db_connect();	

$result = $db->query("SELECT * FROM calendar where StartTime<'{$qend}' and EndTime>'{$qstart}' and UpAccount='{$userid}' order by StartTime,EndTime");		

$ret =array();	
echo " __CURRENTDATA=[";
if($result)
{
	$i = 0;
	foreach ($result as $row) {
		
	
	
		if($i>0) 
		{
			echo ",";
		}
		echo "['{$row["Id"]}','{$row["Subject"]}',".TimeToFullJsonTime($row["StartTime"]).",".TimeToFullJsonTime($row["EndTime"]).
		",".($row["IsAllDayEvent"]?1:0).",".((TimeToTimeStringFormat($row["StartTime"],"Ymd")== TimeToTimeStringFormat($row["EndTime"],"Ymd"))? 0:1).",1,".
		($row["Category"]=="1"?1:0).",1,'{$row["Attendees"]}','{$row["Location"]}']";
			
		$i++;
	}		
	
}
echo "];\r\n";

//echo " __CURRENTDATA=".preg_replace("/\/(Date\([0-9-]+\))\//", "new \\1", $r).";"; 
?>