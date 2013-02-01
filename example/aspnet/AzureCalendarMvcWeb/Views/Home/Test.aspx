<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Test.aspx" Inherits="System.Web.Mvc.ViewPage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <title></title>
</head>
<body>
    <form id="form1">
    <div>
     <script src="<%=Url.Content("~/Javascripts/jquery-1.4.js")%>" type="text/javascript"></script>  
    <script type="text/javascript">
        debugger;
        var data = "{\"events\":[[3032,\"hello\",new Date(1263571200000),new Date(1264262399000),1,1,0,-1,1,\"\",\"\"],[3033,\"english\",new Date(1263868200000),new Date(1263871800000),0,0,0,-1,1,null,\"\"],[3061,\"test\",new Date(1263879000000),new Date(1263884400000),0,0,0,-1,1,null,\"\"],[3030,\"red color in \",new Date(1263916800000),new Date(1264003199000),1,0,0,14,1,\"\",\"\"],[3041,\"testaaaaa\",new Date(1263916800000),new Date(1264003199000),1,0,0,-1,1,\"\",\"\"],[3026,\"test a\",new Date(1263960000000),new Date(1263967200000),0,0,0,12,1,\"\",\"\"],[3025,\"test\",new Date(1264051800000),new Date(1264057200000),0,0,0,-1,1,null,\"\"],[3080,\"test\",new Date(1264116600000),new Date(1264123800000),0,0,0,-1,1,null,\"\"],[3034,\"hello too\",new Date(1264140000000),new Date(1264143600000),0,0,0,-1,1,null,\"\"]],\"issort\":true,\"start\":new Date(1263744000000),\"end\":new Date(1264348799000),\"error\":null}";
        data = data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@");
        data = data.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]");
        data = data.replace(/(?:^|:|,)(?:\s*\[)+/g, "")
        alert(data);
    </script>
    </div>
    </form>
</body>
</html>
