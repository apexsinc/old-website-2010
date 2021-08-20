
/***********************************************
* AnyLink Drop Down Menu- © Dynamic Drive (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/

//Contents for menu 1 Products
var menu1=new Array()

menu1[0]='<a href="../driveright/index.htm">Automotive Section</a>'
menu1[1]='<a href="../weather_station/new_weather/index.php">Weather Products</a>'
menu1[2]='<a href="../gps-devices/gps-products.htm">GPS Products</a>'
menu1[3]='<a href="../ip-camera/ip-camera.htm">IP Surveillance Camera</a>'

menu1[5]='<a href="../voip/index.htm">IP Phone System</a>'
menu1[6]='<a href="../testers/index.htm">Electronic Equipments</a>'


//Contents for menu 2, Support
var menu2=new Array()
menu2[0]='<a href="../techsupport.php">Technical Support</a>'
menu2[1]='<a href="../driveright/software_support.html">Software Support</a>'
menu2[2]='<a href="../driveright/latest-catalogs-and-brochures.htm">Catalogs & Brochures</a>'
menu2[3]='<a href="../driveright/instructional-videos.htm">Instructional Videos</a>'
menu2[4]='<a href="../driveright/instruction_manuals.html">Instruction Manuals</a>'
menu2[5]='<a href="../driveright/InstallationGallery.htm">Installation Gallery</a>'
menu2[6]='<a href="../driveright/CarChipFAQ.html">Carchip FAQs</a>'
menu2[7]='<a href="../driveright/DriveRightFAQ.html">Driveright FAQs</a>'


//Contents for menu 3, About Us
var menu3=new Array()
menu3[0]='<a href="../company_info.htm">Company Profile</a>'
menu3[1]='<a href="../company_info.htm#marchingahead">Marching Ahead</a>'


//Contents for menu 4, Legal notices
var menu4=new Array()
menu4[0]='<a href="../TERMS.HTM">Terms and Conditions</a>'
menu4[1]='<a href="../PRIVACY.HTM">Security and Privacy</a>'


//Contents for menu 5, News
//var menu5=new Array()
//menu5[0]='<a href="../gps-devices/gps-products.htm">GPS Products&nbsp;<img src="images/new.gif" border=0></a>'
//menu5[1]='<a href="../weather_station/new_weather/index.php">Weather Products</a>'
//menu5[2]='<a href="wireless_download.html">DR Wireless Download</a>'
//menu5[3]='<a href="../basic_stamp/Updates/product_id_28146.html">Parallax Updates</a>'
//menu5[4]='<a href="../Developments.htm">Automotive Section</a>'
//menu5[5]='<a href="../Products.htm">Store Updates</a>'



		
var menuwidth='165px' //default menu width
var menubgcolor='lightyellow'  //menu bgcolor
var disappeardelay=250  //menu disappear speed onMouseout (in miliseconds)
var hidemenu_onclick="yes" //hide menu when user clicks within menu?

/////No further editting needed

var ie4=document.all
var ns6=document.getElementById&&!document.all

if (ie4||ns6)
document.write('<div id="dropmenudiv" style="visibility:hidden;width:'+menuwidth+';background-color:'+menubgcolor+'" onMouseover="clearhidemenu()" onMouseout="dynamichide(event)"></div>')

function getposOffset(what, offsettype){
var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
var parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
}


function showhide(obj, e, visible, hidden, menuwidth){
if (ie4||ns6)
dropmenuobj.style.left=dropmenuobj.style.top="-500px"
if (menuwidth!=""){
dropmenuobj.widthobj=dropmenuobj.style
dropmenuobj.widthobj.width=menuwidth
}
if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover")
obj.visibility=visible
else if (e.type=="click")
obj.visibility=hidden
}

function iecompattest(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function clearbrowseredge(obj, whichedge){
var edgeoffset=0
if (whichedge=="rightedge"){
var windowedge=ie4 && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
edgeoffset=dropmenuobj.contentmeasure-obj.offsetWidth
}
else{
var topedge=ie4 && !window.opera? iecompattest().scrollTop : window.pageYOffset
var windowedge=ie4 && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure){ //move up?
edgeoffset=dropmenuobj.contentmeasure+obj.offsetHeight
if ((dropmenuobj.y-topedge)<dropmenuobj.contentmeasure) //up no good either?
edgeoffset=dropmenuobj.y+obj.offsetHeight-topedge
}
}
return edgeoffset
}

function populatemenu(what){
if (ie4||ns6)
dropmenuobj.innerHTML=what.join("")
}


function dropdownmenu(obj, e, menucontents, menuwidth){
if (window.event) event.cancelBubble=true
else if (e.stopPropagation) e.stopPropagation()
clearhidemenu()
dropmenuobj=document.getElementById? document.getElementById("dropmenudiv") : dropmenudiv
populatemenu(menucontents)

if (ie4||ns6){
showhide(dropmenuobj.style, e, "visible", "hidden", menuwidth)

dropmenuobj.x=getposOffset(obj, "left")
dropmenuobj.y=getposOffset(obj, "top")
dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+"px"
dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+"px"
}

return clickreturnvalue()
}

function clickreturnvalue(){
if (ie4||ns6) return false
else return true
}

function contains_ns6(a, b) {
while (b.parentNode)
if ((b = b.parentNode) == a)
return true;
return false;
}

function dynamichide(e){
if (ie4&&!dropmenuobj.contains(e.toElement))
delayhidemenu()
else if (ns6&&e.currentTarget!= e.relatedTarget&& !contains_ns6(e.currentTarget, e.relatedTarget))
delayhidemenu()
}

function hidemenu(e){
if (typeof dropmenuobj!="undefined"){
if (ie4||ns6)
dropmenuobj.style.visibility="hidden"
}
}

function delayhidemenu(){
if (ie4||ns6)
delayhide=setTimeout("hidemenu()",disappeardelay)
}

function clearhidemenu(){
if (typeof delayhide!="undefined")
clearTimeout(delayhide)
}

if (hidemenu_onclick=="yes")
document.onclick=hidemenu
