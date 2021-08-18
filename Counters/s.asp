html>
<head><title>Page Counter</title></head>
<body>

<%
Application.Lock
IF Application( "LastCrash" ) = "" THEN
  Application( "LastCrash" ) = NOW()
END IF
Application( "PageCount" ) = Application( "PageCount" ) + 1
Application.UnLock
%>

This page has been viewed
<font face="Comic Sans MS" size="4">
<br><%=Application( "PageCount" )%> times
</font> 
<br>since this server last crashed on 
<%=Application( "LastCrash" )%>


</body>
</html>