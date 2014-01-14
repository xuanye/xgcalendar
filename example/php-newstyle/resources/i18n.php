<?php

$default_lang = 'zh-cn';

$supported_langs = array("zh-cn","en-au","en-us","it-it");


$cookie_names[] = 'lang';


//
// Write preference to cookie
//
foreach($cookie_names as $cookie_name) {
  if(isset($_POST[$cookie_name])) {
    setcookie($cookie_prefix.$cookie_name, $_POST[$cookie_name]);
  } elseif (isset($_GET[$cookie_name])) {
    setcookie($cookie_prefix.$cookie_name, $_GET[$cookie_name]);
  }
}
//
// Handle language choice
//

if( getPref('lang') != NULL ) {
	$lang = getPref('lang');
}
  
if(!isset($lang)) {
   $lang == 'auto';
}

//
// Auto-Detect best possible language
//
if($lang == 'auto') {

  // Try to use the browser's wish:
  // - de-ch,de-de;q=0.9,de;q=0.7,en;q=0.6,en-us;q=0.4,en-gb;q=0.3,fr;q=0.1
  //
  // TBD: Improve the handling,
  // => http://www.w3.org/International/articles/language-tags/
  // => Achtung: "en_us"
  //
  
  if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    $http_accept_language = strtolower( $_SERVER['HTTP_ACCEPT_LANGUAGE'] );
  } 
  else {
  	$http_accept_language = "";
  }
  
  foreach(explode(',', $http_accept_language) as $accept_lang) {
  	$accepted_languages[] = $accept_lang;
  }
 // print_r($accepted_languages);
  foreach($accepted_languages as $curr_lang)
  {
    if( array_search($curr_lang, $supported_langs) !== FALSE ) {
    	$lang = $curr_lang;
      break;
    }
  }
}

//
// Choose "default" if no supported language chosen
//
if( array_search($lang, $supported_langs) === FALSE ) {
 	$lang = $default_lang;
}

//
// Include only the selected language
//

include("lang.".$lang.".php");

//
// Return the country flag for a language
// - Default: langauge = country
// - Custom:  $use_flag['lang'] = 'country';
//
function get_flag($language) {
	
	global $use_flag;
	
	if(isset($use_flag[$language]))
	  return $use_flag[$language];
	else
	  return $language;
}



function msg($value)
{
	global $lang, $messages;
	
	
	if(isset($messages[$value][$lang])) {
	  return $messages[$value][$lang];
	} else {
	  return $value;
	}
}

//
// Uppercase the first character with UTF-8 if possible,
// else try to use "ucfirst".
//
$has_mb_strtoupper = function_exists('mb_strtoupper');
mb_internal_encoding("UTF-8");

function ucfmsg($value) {
	
  global $has_mb_strtoupper;

  $msg = msg($value);

  // Multibyte "ucfirst" function
  if( $has_mb_strtoupper ) {
  	$msg = mb_strtoupper(mb_substr($msg, 0,1)).mb_substr($msg, 1);
  	
  } else { // Backward compatiblity
  	$msg = ucfirst($msg);
  }
  return $msg;
}

//
// Try the best to convert UTF-8 to latin1.
//
function utf8_to_latin1($text) {
	
  if(function_exists('iconv')) {
       setlocale(LC_CTYPE, 'cs_CZ');
       return iconv("UTF-8", "ISO-8859-1//TRANSLIT", $text);
     
  } 
  else {
  	  return utf8_decode($text);
  }
}

function translateTags($text) {
	
	global $messages;
	
	foreach($messages as $key => $translations) {
		$text = str_replace("%".$key."%", msg($key), $text);
	}
	return $text;
}
?>
