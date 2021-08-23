/*
Simple Image Trail script- By JavaScriptKit.com
Visit http://www.javascriptkit.com for this script and more
This notice must stay intact

Modified by Bob Titchenell
*/

var offsetfrommouse=[15,15]; //image x,y offsets from cursor position in pixels. Enter 0,0 for no offset
var displayduration=0; //duration in seconds image should remain visible. 0 for always.
var currentimageheight = 450;	// maximum image size.

if (document.getElementById || document.all){
	document.write('<div id="trailimageid">');
	document.write('</div>');
}

function gettrailobj(){
if (document.getElementById)
return document.getElementById("trailimageid").style
else if (document.all)
return document.all.trailimagid.style
}

function gettrailobjnostyle(){
if (document.getElementById)
return document.getElementById("trailimageid")
else if (document.all)
return document.all.trailimagid
}


function truebody(){
return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function showtrail(imageurl,itemname,itemnumber,description,ratingaverage,ratingnumber,showthumb,height, width){

	
	//do to issue in IE we need to hide all selects while showing trail
	var ele = document.getElementsByTagName("select");
	for( var i = 0; i < ele.length; i++){
		ele[i].style.visibility="hidden";
	}
	


	if (height > 0){
		currentimageheight = height;
	}

	document.onmousemove=followmouse;

	cameraHTML = '';

	/*
	if (ratingnumber == 0){
		ratingaverage = 0;
	}

	for(x = 1; x <= 5; x++){

		if (ratingaverage >= 1){
			cameraHTML = cameraHTML + '<img src="/images/camera_1.gif">';
		} else if (ratingaverage >= 0.5){
			cameraHTML = cameraHTML + '<img src="/images/camera_05.gif">';
		} else {
			cameraHTML = cameraHTML + '<img src="/images/camera_0.gif">';
		}
	
		ratingaverage = ratingaverage - 1;
	}

	cameraHTML = cameraHTML + ' (' + ratingnumber + ' Review';
	if ( ratingnumber != 1 ) cameraHTML += 's';
	cameraHTML = cameraHTML + ')';
	*/

	newHTML = '<div style="padding: 5px; float: left; background-color:#deefb1; border: 3px dotted #f20a0a;">';
	newHTML = newHTML + '<b>' + itemname + '</b><br/>';
	newHTML = newHTML + itemnumber + '<br/>';
	//newHTML = newHTML + 'Rating: ' + cameraHTML + '<br/>';
	newHTML = newHTML + description + '<br/>';

	//added hardcoded widths and height in image tag based on params passed in.
	//we may opt to not do this if the program returning the image cna resize dynamically.

	if (showthumb > 0){
		newHTML = newHTML + '<div align="center" style="padding: 8px 2px 2px 2px;"><img src="' + imageurl + '" border="0" width="'+width+'" height="'+height+'"></div>';
	}

	newHTML = newHTML + '</div>';

	gettrailobjnostyle().innerHTML = newHTML;

	gettrailobj().visibility="visible";

}


function hidetrail(){
	//do to issue in IE we need to unhide all selects while not showing trail since they were hidden
	var ele = document.getElementsByTagName("select");
	for( var i = 0; i < ele.length; i++){
		ele[i].style.visibility="visible";
	}
	
	gettrailobj().visibility="hidden"
	document.onmousemove=""
	gettrailobj().left="-500px"

}

function followmouse(e){

	var xcoord=offsetfrommouse[0]
	var ycoord=offsetfrommouse[1]

	var docwidth=document.all? truebody().scrollLeft+truebody().clientWidth : pageXOffset+window.innerWidth-15
	var docheight=document.all? Math.min(truebody().scrollHeight, truebody().clientHeight) : Math.min(window.innerHeight)

	//if (document.all){
	//	gettrailobjnostyle().innerHTML = 'A = ' + truebody().scrollHeight + '<br>B = ' + truebody().clientHeight;
	//} else {
	//	gettrailobjnostyle().innerHTML = 'C = ' + document.body.offsetHeight + '<br>D = ' + window.innerHeight;
	//}

	if (typeof e != "undefined"){
		if (docwidth - e.pageX < 450){
			xcoord = e.pageX - xcoord - 450; // Move to the left side of the cursor
		} else {
			xcoord += e.pageX;
		}
		if (docheight - e.pageY < (currentimageheight + 110)){
			ycoord += e.pageY - Math.max(0,(110 + currentimageheight + e.pageY - docheight - truebody().scrollTop));
		} else {
			ycoord += e.pageY;
		}

	} else if (typeof window.event != "undefined"){
		if (docwidth - event.clientX < 450){
			xcoord = event.clientX + truebody().scrollLeft - xcoord - 450; // Move to the left side of the cursor
		} else {
			xcoord += truebody().scrollLeft+event.clientX
		}
		if (docheight - event.clientY < (currentimageheight + 110)){
			ycoord += event.clientY + truebody().scrollTop - Math.max(0,(110 + currentimageheight + event.clientY - docheight));
		} else {
			ycoord += truebody().scrollTop + event.clientY;
		}
	}

	var docwidth=document.all? truebody().scrollLeft+truebody().clientWidth : pageXOffset+window.innerWidth-15
	var docheight=document.all? Math.max(truebody().scrollHeight, truebody().clientHeight) : Math.max(document.body.offsetHeight, window.innerHeight)
		if(ycoord < 0) { ycoord = ycoord*-1; }
	gettrailobj().left=xcoord+"px"
	gettrailobj().top=ycoord+"px"

}

