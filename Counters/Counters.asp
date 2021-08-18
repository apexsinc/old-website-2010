<%@ LANGUAGE="VBSCRIPT" %>

<HTML>
<HEAD>
<META NAME="GENERATOR" Content="Microsoft Visual InterDev 1.0">
<META HTTP-EQUIV="Content-Type" content="text/html; charset=iso-8859-1">
<TITLE>Document Title</TITLE>
</HEAD>
<BODY>
<h2>Demo of the Counters ASP Component</h2>

<%
On Error Resume Next

Dim ObjCntr
Dim nCount, nErr
Dim strName
strName= Application("CounterName")

Set ObjCntr = Application("MSCounters") 
nCount = ObjCntr.Increment(strName) 
nErr = Application("IsErr")


If (Err <> 0 AND nErr <>0) then 
	Response.Write ("<P>Error: Could not get the instance of the Counters Object.<br> Error Code:" + CStr(nErr) )
Else 
    Response.Write ("<h4><P>There have been <font color=RED>"+ CStr(nCount) + "</font> visits to this Web page. Refresh this page to increment <br>the counter.</h4>")
End If 
%>

</BODY>
</HTML>
