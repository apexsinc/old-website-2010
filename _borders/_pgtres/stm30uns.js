// Ver 3.01

var currentGroupIndex;
var currentMenuIndex;
var currentItemIndex;
var STMenu=new Array();

function beginSTM(name,position,posLeft,posTop,floatType,clickShow,clickHide)
{
	currentGroupIndex=STMenu.length;
	currentMenuIndex=0;
	currentItemIndex=0;
	STMenu[currentGroupIndex]=new Object();
	STMenu[currentGroupIndex].menus=new Array();
	STMenu[currentGroupIndex].menuGroupIndex=currentGroupIndex;	

	STMenu[currentGroupIndex].name=name;
	STMenu[currentGroupIndex].position=position=="" ? "relative" : position;
	STMenu[currentGroupIndex].posLeft =posLeft=="" ? 0 : eval(posLeft);
	STMenu[currentGroupIndex].posTop  =posTop =="" ? 0 : eval(posTop);
	STMenu[currentGroupIndex].floatType=floatType=="" ? "none" : floatType;
	STMenu[currentGroupIndex].clickShow=clickShow=="" ? false : eval(clickShow);
	STMenu[currentGroupIndex].clickHide=clickHide=="" ? true  : eval(clickHide);
}

function beginSTMB(offsetType,offsetLeft,offsetTop,arrangeType,arrow,arrowWidth,arrowHeight,outerSpace,innerSpace,
	background_color,background_image,background_repeat,
	borderColor,borderWidth,borderStyle,Alpha_opacity,specType,specSpeed,lw,lh,rw,rh)
{
	var oldMenuIndex=currentMenuIndex;
	var oldItemIndex=currentItemIndex;
	currentMenuIndex=STMenu[currentGroupIndex].menus.length;
	currentItemIndex=0;
	STMenu[currentGroupIndex].menus[currentMenuIndex]=new Object();
	STMenu[currentGroupIndex].menus[currentMenuIndex].items=new Array();

	var tempObj=STMenu[currentGroupIndex].menus[currentMenuIndex];
	tempObj.menuGroupIndex=currentGroupIndex;
	tempObj.menuIndex=currentMenuIndex;
	tempObj.block="STM"+currentGroupIndex+"_"+currentMenuIndex+"__";
	tempObj.parentMenuItem=(currentMenuIndex==0?null:STMenu[currentGroupIndex].menus[oldMenuIndex].items[oldItemIndex]);
	if(currentMenuIndex!=0)
		tempObj.parentMenuItem.subMenu=tempObj;
	tempObj.getBlock=getMenuBlock;
	tempObj.getMenuGroup=getMenuGroup;
	tempObj.isShow=false;
	tempObj.timerId=null;
	tempObj.z_index=(currentMenuIndex==0?1000:tempObj.parentMenuItem.parentMenu.z_index+10);

	tempObj.offsetType=offsetType=="" ? "auto" : offsetType;
	tempObj.offsetLeft=offsetLeft=="" ? 0 : eval(offsetLeft);
	tempObj.offsetTop =offsetTop==""  ? 0 : eval(offsetTop);
	tempObj.arrangeType=arrangeType=="" ? "vertically" : arrangeType;
	if(tempObj.offsetType=="auto"&&tempObj.parentMenuItem!=null)
		tempObj.offsetType= tempObj.parentMenuItem.parentMenu.arrangeType=="vertically" ? "right" : "down";
	tempObj.arrow=arrow;
	tempObj.arrowWidth =arrowWidth =="" ? 8 : eval(arrowWidth);
	tempObj.arrowHeight=arrowHeight=="" ? 8 : eval(arrowHeight);
	tempObj.outerSpace=outerSpace=="" ? 0  : eval(outerSpace);
	tempObj.innerSpace=innerSpace=="" ? 0  : eval(innerSpace);
	tempObj.background_color =background_color =="" ? "transparent" : background_color;
	if(background_image=="")
		tempObj.background_image=null;
	else
	{
		tempObj.background_image=new Image();
		tempObj.background_image.src=background_image;
	}
	switch(background_repeat)
	{
		case "free":
		case "no-repeat":
			tempObj.background_repeat="no-repeat";
			break;
		case "tiled by x":
		case "repeat-x":
			tempObj.background_repeat="repeat-x";
			break;
		case "tiled by y":
		case "repeat-y":
			tempObj.background_repeat="repeat-y";
			break;
		default:
			tempObj.background_repeat="repeat";
		break;	
	}
	tempObj.borderColor= borderColor=="" ? tempObj.background_color : borderColor;
	tempObj.borderWidth= borderWidth=="" ? "0" : borderWidth;
	tempObj.borderStyle= borderStyle=="" ? "none" : borderStyle;
	if(tempObj.borderStyle=="hidden")
		tempObj.borderStyle="none";
	tempObj.Alpha_opacity=Alpha_opacity==""?100:eval(Alpha_opacity);
	tempObj.Alpha_opacity=100-tempObj.Alpha_opacity;
	tempObj.specType =specType =="" ? "Normal" : specType;
	tempObj.specSpeed=specSpeed=="" ? 50 : eval(specSpeed);
	if(tempObj.specSpeed<1)
		tempObj.specSpeed=1;
	if(tempObj.specSpeed>100)
		tempObj.specSpeed=100;
	tempObj.lw=lw=="" ? 1 : eval(lw);
	tempObj.lh=lh=="" ? 1 : eval(lh);
	tempObj.rw=rw=="" ? 1 : eval(rw);
	tempObj.rh=rh=="" ? 1 : eval(rh);
}

function appendSTMI(isImage,innerText,innerTextAlign,innerTextVAlign,
	innerImageSrcOut,innerImageSrcOver,innerImageWidth,innerImageHeight,innerImageBorder,itemType,
	background_colorOut,background_colorOver,sepLineImage,sepLineWidth,lineImageWidth,lineImageHeight,
	decLtOut,decLtOver,decLtWidth,decLtHeight,decLtBorder,tipText,URL,target,
	font_familyOut,font_sizeOut,font_colorOut,font_weightOut,font_styleOut,font_decorationOut,
	font_familyOver,font_sizeOver,font_colorOver,font_weightOver,font_styleOver,font_decorationOver,
	borderWidth,borderStyle,borderColorDarkOut,borderColorLightOut,borderColorDarkOver,borderColorLightOver)
{
	currentItemIndex=STMenu[currentGroupIndex].menus[currentMenuIndex].items.length;
	STMenu[currentGroupIndex].menus[currentMenuIndex].items[currentItemIndex]=new Object();
	var tempObj=STMenu[currentGroupIndex].menus[currentMenuIndex].items[currentItemIndex];
	tempObj.menuGroupIndex=currentGroupIndex;
	tempObj.menuIndex=currentMenuIndex;
	tempObj.itemIndex=currentItemIndex;
	tempObj.block="STM"+currentGroupIndex+"_"+currentMenuIndex+"__"+currentItemIndex+"___";
	tempObj.parentMenu=STMenu[currentGroupIndex].menus[currentMenuIndex];
	tempObj.subMenu=null;
	tempObj.getBlock=getMenuItemBlock;
	tempObj.getMenuGroup=getMenuGroup;
	tempObj.textStyleId=tempObj.block+"TX";
	tempObj.timerId=null;
	tempObj.itemType=itemType=="" ? "normal" : itemType;

	tempObj.isImage=isImage=="" ? false : eval(isImage);
	tempObj.innerText=innerText;
	tempObj.innerTextVAlign=(innerTextVAlign==""?"MIDDLE":innerTextVAlign);
	tempObj.innerTextAlign=(innerTextAlign==""?"CENTER":innerTextAlign);

	tempObj.innerImageSrcOut=innerImageSrcOut;
	tempObj.innerImageSrcOver=innerImageSrcOver;
	tempObj.innerImageWidth =(innerImageWidth =="") ? -1 : eval(innerImageWidth);
	tempObj.innerImageHeight=(innerImageHeight=="") ? -1 : eval(innerImageHeight);
	tempObj.innerImageBorder=(innerImageBorder=="") ? 0 : eval(innerImageBorder);
	if(tempObj.isImage==true)
	{
		tempObj.innerImageOut=new Image();
		tempObj.innerImageOver=new Image();
		tempObj.innerImageOut.src=tempObj.innerImageSrcOut;
		tempObj.innerImageOver.src=tempObj.innerImageSrcOver;
	}

	tempObj.sepLineImageSrc=sepLineImage;
	tempObj.sepLineImage=new Image();
	tempObj.sepLineImage.src=tempObj.sepLineImageSrc;
	tempObj.sepLineWidth=sepLineWidth=="" ? 0 : eval(sepLineWidth);
	tempObj.lineImageWidth =lineImageWidth== "" ? -1 : eval(lineImageWidth);
	tempObj.lineImageHeight=lineImageHeight=="" ? -1 : eval(lineImageHeight);
	
	tempObj.background_colorOut =background_colorOut =="" ? "transparent" : background_colorOut;
	tempObj.background_colorOver=background_colorOver=="" ? "transparent" : background_colorOver;
	tempObj.decLtOut   =decLtOut;
	tempObj.decLtOver  =decLtOver;
	tempObj.decLtWidth = decLtWidth=="" ? 16 : eval(decLtWidth);
	tempObj.decLtHeight=decLtHeight=="" ? 16 : eval(decLtHeight);
	tempObj.decLtBorder=decLtBorder=="" ? 0 : eval(decLtBorder);
		tempObj.decLtImageOver=new Image();
		tempObj.decLtImageOut =new Image();
		tempObj.decLtImageOver.src=tempObj.decLtOver;
		tempObj.decLtImageOut.src =tempObj.decLtOut;
	tempObj.arrow=tempObj.parentMenu.arrow;
		tempObj.arrowImage =new Image();
		tempObj.arrowImage.src =tempObj.arrow;
		tempObj.arrowWidth =tempObj.parentMenu.arrowWidth;
		tempObj.arrowHeight=tempObj.parentMenu.arrowHeight;
	tempObj.tipText=tipText;
	tempObj.url=URL;
	tempObj.target=target==""?"_self":target;
	tempObj.font_familyOver    =font_familyOver    =="" ? "\'Times new roman\'" : font_familyOver;
	tempObj.font_sizeOver      =font_sizeOver      =="" ? "9pt"                 : font_sizeOver;
	tempObj.colorOver          =font_colorOver     =="" ? "red"                 : font_colorOver;
	tempObj.font_weightOver    =font_weightOver    =="" ? "normal"              : font_weightOver;
	tempObj.font_styleOver     =font_styleOver     =="" ? "normal"              : font_styleOver;
	tempObj.text_decorationOver=font_decorationOver=="" ? "underline"           : font_decorationOver;
	tempObj.font_familyOut     =font_familyOut     =="" ? "\'Times new roman\'" : font_familyOut;
	tempObj.font_sizeOut       =font_sizeOut       =="" ? "9pt"                 : font_sizeOut;
	tempObj.colorOut           =font_colorOut      =="" ? "red"                 : font_colorOut;
	tempObj.font_weightOut     =font_weightOut     =="" ? "normal"              : font_weightOut;
	tempObj.font_styleOut      =font_styleOut      =="" ? "normal"              : font_styleOut;
	tempObj.text_decorationOut =font_decorationOut =="" ? "none"                : font_decorationOut;
	
	tempObj.borderWidth		    =borderWidth=="" ? "0" : eval(borderWidth);
	tempObj.borderStyle		    =borderStyle=="" ? "none" : borderStyle;
	if(tempObj.borderStyle=="hidden")
		tempObj.borderStyle="none";
	tempObj.borderColorDarkOut  =borderColorDarkOut  =="" ? "#ffffff" : borderColorDarkOut;
	tempObj.borderColorLightOut =borderColorLightOut =="" ? "#ffffff" : borderColorLightOut;
	tempObj.borderColorDarkOver =borderColorDarkOver =="" ? "#000000" : borderColorDarkOver;
	tempObj.borderColorLightOver=borderColorLightOver=="" ? "#000000" : borderColorLightOver;

	tempObj.getLeftDecString=getLeftDecString;
}

function endSTMB()
{
	var tempObj=STMenu[currentGroupIndex].menus[currentMenuIndex].parentMenuItem;
	if(tempObj!=null)
	{
		currentGroupIndex=tempObj.menuGroupIndex;
		currentMenuIndex =tempObj.menuIndex;
		currentItemIndex =tempObj.itemIndex;
	}
}

function endSTM()
{
	var menuGroupIndex=currentGroupIndex;
	var menuIndex;
	var innerHTMLText="";
	for(menuIndex=0;menuIndex<STMenu[menuGroupIndex].menus.length&&menuIndex<1;menuIndex++)
	{
		var innerText="";
		var tempObj=STMenu[menuGroupIndex].menus[menuIndex];

		innerText+="\n<TABLE CELLSPACING=0 CELLPADDING="+tempObj.outerSpace;
		innerText+=" BGCOLOR="+tempObj.background_color;
		innerText+=" BORDER="+tempObj.borderWidth;
		innerText+=" BORDERCOLOR="+tempObj.borderColor;
		innerText+=">";
		
		if(STMenu[menuGroupIndex].menus[menuIndex].arrangeType=="horizontally")
			innerText+="<TR>";
		
		var itemIndex;
		for(itemIndex=0;itemIndex<STMenu[menuGroupIndex].menus[menuIndex].items.length;itemIndex++)
		{
			var innerItemText="";
			var tempObj=STMenu[menuGroupIndex].menus[menuIndex].items[itemIndex];
			if(tempObj.itemType!="normal")
				continue;
			if(tempObj.parentMenu.arrangeType=="vertically")
				innerItemText+="<TR>";

			innerItemText+="<TD NOWRAP HEIGHT=100%>";
			
			innerItemText+="<TABLE HEIGHT=100% CELLSPACING=0 CELLPADDING="+tempObj.parentMenu.innerSpace;
			if(tempObj.parentMenu.arrangeType!="horizontally")
				innerItemText+=(" WIDTH=100%");
			if(tempObj.tipText!="")
				innerItemText+=(" TITLE=\""+tempObj.tipText+"\"");
			innerItemText+=" BORDER=0 BGCOLOR="+tempObj.background_colorOut;
			innerItemText+="><TR>";
			if(tempObj.decLtWidth!=0||tempObj.parentMenu.arrangeType=="vertically")
				innerItemText+=("<TD NOWRAP ALIGN=CENTER VALIGN=MIDDLE WIDTH="+tempObj.parentMenu.lw+" HEIGHT=100%>"+tempObj.getLeftDecString()+"</TD>");
			innerItemText+=("<TD NOWRAP HEIGHT=100% ALIGN="+tempObj.innerTextAlign);
			innerItemText+=(" VALIGN="+tempObj.innerTextVAlign);
			innerItemText+=">";
			if(tempObj.url=="")
				innerItemText+="<A HREF=\"javascript:;\"";
			else
				innerItemText+=("<A HREF=\""+tempObj.url+"\"");
			innerItemText+=" TARGET="+tempObj.target;
			innerItemText+=(" STYLE=\"");
			innerItemText+=("font-family:"+tempObj.font_familyOut+";");
			innerItemText+=(" font-size:"+tempObj.font_sizeOut+";");
			innerItemText+=(" color:"+tempObj.colorOut+";");
			innerItemText+=(" font-weight:"+tempObj.font_weightOut+";");
			innerItemText+=(" font-style:"+tempObj.font_styleOut+";");
			innerItemText+=(" text-decoration:"+tempObj.text_decorationOut+";");
			innerItemText+=("\"");
			innerItemText+=">";
			if(tempObj.isImage==true)
			{
				innerItemText+=("<IMG SRC=\""+tempObj.innerImageOut.src+"\" BORDER="+tempObj.innerImageBorder);
				if(tempObj.innerImageWidth>=0)
					innerItemText+=(" WIDTH="+tempObj.innerImageWidth);
				if(tempObj.innerImageHeight>=0)
					innerItemText+=(" HEIGHT="+tempObj.innerImageHeight);
				innerItemText+=">";
			}
			else
			{
				innerItemText+=tempObj.innerText;
			}
			innerItemText+="</A>";
			innerItemText+="</TD>";
			innerItemText+="</TR></TABLE>";				
			
			innerItemText+="</TD>";

			if(tempObj.parentMenu.arrangeType=="vertically")
				innerItemText+="</TR>";
			innerText+=innerItemText;
		}

		if(STMenu[menuGroupIndex].menus[menuIndex].arrangeType=="horizontally")
			innerText+="</TR>";
		innerText+="</TABLE>";
		innerHTMLText+=innerText;
	}	
	document.writeln(innerHTMLText);
}

function getMenuBlock()
{
	return document.all[this.block];
}

function getMenuItemBlock()
{
	return document.all[this.block];
}

function showFloatMenu(name,e)
{
	return false;
}

function showFloatMenuAt(name,x,y)
{
	return false;
}

function getMenuGroup()
{
	return STMenu[this.menuGroupIndex];
}

function getLeftDecString()
{
	var str="<IMG";
	if(this.decLtWidth>=0)
		str+=(" WIDTH="+this.decLtWidth);
	if(this.decLtHeight>=0)
		str+=(" HEIGHT="+this.decLtHeight);
	str+=(" BORDER="+this.decLtBorder+" SRC=\""+this.decLtImageOut.src+"\">");
	return str;
}
