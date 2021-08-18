// Ver 3.01

var currentGroupIndex;
var currentMenuIndex;
var currentItemIndex;
var STMenu=new Array();

var tempMenu=null;
var hideAllTimer=null;
var currentTimer=null;

document.onclick=STDocumentClick;
window.onload=STMenuInit;

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
	
	STMenu[currentGroupIndex].showPopup=showSTMenu;
	STMenu[currentGroupIndex].hidePopup=hideSTMenu;
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
	
	tempObj.doMenuOver=doMenuOver;
	tempObj.doMenuOut=doMenuOut;
	if(tempObj.menuIndex==0&&tempObj.getMenuGroup().position=="relative")
	{
		tempObj.showPopup=nonedo;
		tempObj.hidePopup=nonedo;
	}
	else
	{
		tempObj.showPopup=showPopup;
		tempObj.hidePopup=hidePopup;
	}
	tempObj.hideCallback=hideCallback;
	tempObj.getLeft=getMenuLeft;
	tempObj.getTop=getMenuTop;
	tempObj.getRight=getMenuRight;
	tempObj.getBottom=getMenuBottom;
	tempObj.getCurrentLeft=getCurrentLeft;
	tempObj.getCurrentTop=getCurrentTop;
	tempObj.getCurrentWidth=getCurrentWidth;
	tempObj.getCurrentHeight=getCurrentHeight;
	tempObj.getCurrentRight=getCurrentRight;
	tempObj.getCurrentBottom=getCurrentBottom;
	if(currentMenuIndex==0)
	{
		tempObj.moveTo=noneMoveTo;
		tempObj.moveToEx=moveTo;
	}
	else
		tempObj.moveTo=moveTo;
	tempObj.show=show;
	tempObj.hide=hide;
	tempObj.setClipRect=setClipRect;
	
	switch(tempObj.specType)
	{	
	case "Fade":
		tempObj.specInit=FadeInit;
		tempObj.specShow=FadeShow;
		tempObj.specShowCallback=FadeShowCallback;
		tempObj.specHide=FadeHide;
		tempObj.specHideCallback=FadeHideCallback;		
		break;	
	case "Box in":
	case "Box out":
	case "Circle in":
	case "Circle out":
	case "Wipe up":
	case "Wipe down":
	case "Wipe right":
	case "Wipe left":
	case "Vertical blinds":
	case "Horizontal blinds":
	case "Checkerboard across":
	case "Checkerboard down":
	case "Random dissolve":
	case "Split vertical in":
	case "Split vertical out":
	case "Split horizontal in":
	case "Split horizontal out":
	case "Strips left down":
	case "Strips left up":
	case "Strips right down":
	case "Strips right up":
	case "Random bars horizontal":
	case "Random bars vertical":
	case "Random filter":
		tempObj.specInit=FilterInit;
		tempObj.specShow=FilterShow;
		tempObj.specShowCallback=FilterShowCallback;
		tempObj.specHide=FilterHide;
		tempObj.specHideCallback=FilterHideCallback;
		break;

	case "Normal":
	default:
/*
		tempObj.specInit=FilterInit;
		tempObj.specShow=FilterShow;
		tempObj.specShowCallback=FilterShowCallback;
		tempObj.specHide=FilterHide;
		tempObj.specHideCallback=FilterHideCallback;
		tempObj.specSpeed=10000;
*/
		tempObj.specInit=NormalInit;
		tempObj.specShow=NormalShow;
		tempObj.specShowCallback=NormalShowCallback;
		tempObj.specHide=NormalHide;
		tempObj.specHideCallback=NormalHideCallback;
		break;
	}
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
		tempObj.decLtImageOver.border=tempObj.decLtBorder;
		tempObj.decLtImageOut.border=tempObj.decLtBorder;
		tempObj.decLtId=tempObj.block+"LD";
	tempObj.arrow=tempObj.parentMenu.arrow;
		tempObj.arrowImage =new Image();
		tempObj.arrowImage.src =tempObj.arrow;
		tempObj.arrowId=tempObj.block+"RD";
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
	tempObj.getArrowString=getArrowString;
	tempObj.getCurrentLeft=getCurrentLeft;
	tempObj.getCurrentTop=getCurrentTop;
	tempObj.getCurrentWidth=getCurrentWidth;
	tempObj.getCurrentHeight=getCurrentHeight;
	tempObj.getCurrentRight=getCurrentRight;
	tempObj.getCurrentBottom=getCurrentBottom;
	tempObj.showSubMenu=showSubMenu;
	tempObj.hideSubMenu=hideSubMenu;
	tempObj.showMouseOverStyle=showMouseOverStyle;
	tempObj.showMouseOutStyle=showMouseOutStyle;
	tempObj.doClick=doClick;
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
	for(menuIndex=0;menuIndex<STMenu[menuGroupIndex].menus.length;menuIndex++)
	{
		var innerText="";
		var tempObj=STMenu[menuGroupIndex].menus[menuIndex];

		innerText+="\n<TABLE CELLSPACING=0 CELLPADDING="+tempObj.outerSpace;
		innerText+=" ID=\""+tempObj.block+"\"";
		if(menuIndex==0)
		{
			innerText+=(" style=\"");
			if(tempObj.getMenuGroup().position=="absolute"||tempObj.getMenuGroup().posLeft!=0||tempObj.getMenuGroup().posTop!=0)
				innerText+=("position:"+tempObj.getMenuGroup().position+";");
			innerText+=(" left:"+tempObj.getMenuGroup().posLeft+";");
			innerText+=(" top:" +tempObj.getMenuGroup().posTop +";");
		}
		else
		{
			innerText+=(" style=\"position:absolute;");
		}
		innerText+=(" z-index:"+tempObj.z_index+";");
		if(menuIndex==0)
			innerText+=(" float:"+tempObj.getMenuGroup().floatType+";");
		innerText+=" visibility:hidden;";
		innerText+=(" background-color:"+tempObj.background_color+";");
		if(tempObj.background_image!=null)
			innerText+=(" background-image:url("+tempObj.background_image.src+");");
		innerText+=(" background-repeat:"+tempObj.background_repeat+";");
		innerText+=(" border-color:"+tempObj.borderColor+";");
		innerText+=(" border-width:"+tempObj.borderWidth+";");
		innerText+=(" border-style:"+tempObj.borderStyle+";");
		if(IEMac==0)
		{
			innerText+=(" filter:");
			innerText+=("revealTrans(Transition=1,Duration=1)");
			innerText+=(" Alpha(opacity="+tempObj.Alpha_opacity+")");
			innerText+=(";");
		}				

		innerText+="\"";
		innerText+=(" onmouseover=\"STMenu["+menuGroupIndex+"].menus["+menuIndex+"].doMenuOver(this);\"");
		innerText+=(" onmouseout=\"STMenu["+menuGroupIndex+"].menus["+menuIndex+"].doMenuOut(this);\"");
		innerText+=(" onclick=\"event.cancelBubble=true;\"");
		innerText+=">";
		
		if(STMenu[menuGroupIndex].menus[menuIndex].arrangeType=="horizontally")
			innerText+="<TR ID="+tempObj.block+"TR>";
		
		var itemIndex;
		for(itemIndex=0;itemIndex<STMenu[menuGroupIndex].menus[menuIndex].items.length;itemIndex++)
		{
			var innerItemText="";
			var tempObj=STMenu[menuGroupIndex].menus[menuIndex].items[itemIndex];
			if(tempObj.parentMenu.arrangeType=="vertically")
				innerItemText+="<TR ID="+tempObj.parentMenu.block+"TR>";
			switch(tempObj.itemType)
			{
			case "normal":
				innerItemText+="<TD NOWRAP HEIGHT=100% ID="+tempObj.parentMenu.block+"TD STYLE=\"border-width:0\">";
				
				innerItemText+="<TABLE HEIGHT=100% CELLSPACING=0 CELLPADDING="+tempObj.parentMenu.innerSpace;
				if(tempObj.parentMenu.arrangeType!="horizontally")
					innerItemText+=(" WIDTH=100%");
				innerItemText+=" ID="+tempObj.block;
				if(tempObj.tipText!="")
					innerItemText+=(" TITLE=\""+tempObj.tipText+"\"");
				innerItemText+=(" onmouseover=\"");
				innerItemText+=("STMenu["+menuGroupIndex+"].menus["+menuIndex+"].items["+itemIndex+"].showMouseOverStyle(this);");
				innerItemText+=("\"");				
				innerItemText+=(" onmouseout=\"");
				innerItemText+=("STMenu["+menuGroupIndex+"].menus["+menuIndex+"].items["+itemIndex+"].showMouseOutStyle(this);");
				innerItemText+=("\"");
				innerItemText+=(" onclick=\"");
				innerItemText+=("STMenu["+menuGroupIndex+"].menus["+menuIndex+"].items["+itemIndex+"].doClick();");
				innerItemText+=("\"");
				innerItemText+=" BORDERCOLOR="+tempObj.borderColorLightOut;
				innerItemText+=" BORDERCOLORDARK="+tempObj.borderColorDarkOut;
				innerItemText+=" BORDERCOLORLIGHT="+tempObj.borderColorLightOut;
				innerItemText+=" STYLE=\"";
				innerItemText+=(tempObj.url!="" ? " cursor:hand;" : " cursor:default;");
				innerItemText+=(" background-color:"+tempObj.background_colorOut+";");
				innerItemText+=(" border-width:"+tempObj.borderWidth+";");
				innerItemText+=(" border-style:"+tempObj.borderStyle+";");
	
				innerItemText+="\"><TR ID="+tempObj.block+"TR>";
				if(tempObj.decLtWidth!=0||tempObj.parentMenu.arrangeType=="vertically")
					innerItemText+=("<TD NOWRAP ALIGN=CENTER VALIGN=MIDDLE WIDTH="+tempObj.parentMenu.lw+" HEIGHT=100% ID="+(tempObj.block+"LT")+" STYLE=\"border-width:0\">"+tempObj.getLeftDecString()+"</TD>");
				innerItemText+=("<TD NOWRAP HEIGHT=100% ID="+(tempObj.block+"MT")+" STYLE=\"border-width:0\"");
				innerItemText+=(" ALIGN="+tempObj.innerTextAlign);
				innerItemText+=(" VALIGN="+tempObj.innerTextVAlign);
				innerItemText+=">";
				innerItemText+=("<A ID="+tempObj.textStyleId);
				innerItemText+=(" STYLE=\"");
				innerItemText+=(tempObj.url!="" ? " cursor:hand;" : " cursor:default;");
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
					innerItemText+=(" ID="+tempObj.block+"INIMG>");
				}
				else
				{
					innerItemText+=tempObj.innerText;
				}
				innerItemText+="</A>";
				innerItemText+="</TD>";
				if(tempObj.parentMenu.arrowWidth!=0||tempObj.parentMenu.arrangeType=="vertically")
					innerItemText+=("<TD ALIGN=CENTER VALIGN=MIDDLE NOWRAP WIDTH="+tempObj.parentMenu.rw+" HEIGHT=100% ID="+(tempObj.block+"RT")+" STYLE=\"border-width:0\">"+tempObj.getArrowString()+"</TD>");
				innerItemText+="</TR></TABLE>";
				
				innerItemText+="</TD>";
				break;
			
			case "sepline":
				innerItemText+="<TD NOWRAP ID="+tempObj.parentMenu.block+"TD STYLE=\"border-width:0\">";
				
				innerItemText+="<TABLE WIDTH=100% HEIGHT=100% CELLSPACING=0 CELLPADDING=0";
				innerItemText+=" ID="+tempObj.block;
				innerItemText+=" STYLE=\"";
				innerItemText+=(" background-color:"+tempObj.background_colorOut+";");
				innerItemText+="\"><TR ID="+tempObj.block+"TR>";
				innerItemText+="<TD NOWRAP ID="+tempObj.block;
				if(tempObj.parentMenu.arrangeType=="horizontally")
					innerItemText+=(" HEIGHT=100% WIDTH="+tempObj.sepLineWidth);
				else
					innerItemText+=(" WIDTH=100% HEIGHT="+tempObj.sepLineWidth);
				innerItemText+=" STYLE=\"";
				innerItemText+="background-color:"+tempObj.background_colorOut+";";
				innerItemText+="\"";
				innerItemText+=">";
				innerItemText+="<IMG ID="+(tempObj.block+"SL")+" SRC=\""+tempObj.sepLineImage.src+"\"";
				if(tempObj.lineImageWidth>=0)
					innerItemText+=(" WIDTH="+tempObj.lineImageWidth);
				if(tempObj.lineImageHeight>=0)
					innerItemText+=(" HEIGHT="+tempObj.lineImageHeight);
				innerItemText+=">";
				innerItemText+="</TD>";
				innerItemText+="</TR></TABLE>";				
				
				innerItemText+="</TD>";
				break;
			}
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

function STMenuInit()
{
	var i;
	var j;
	for(i=0;i<STMenu.length;i++)
	{	
		for(j=0;j<STMenu[i].menus.length;j++)
		{
			STMenu[i].menus[j].specInit();
		}
		if(STMenu[i].position!="absolute")
		{
			STMenu[i].menus[0].show();
			STMenu[i].menus[0].isShow=true;
		}
	}
}

function getMenuBlock()
{
	return document.all[this.block];
}

function getMenuItemBlock()
{
	return document.all[this.block];
}

function nonedo()
{
}

function showMouseOverStyle(obj)
{
	if(event.fromElement!=null&&event.fromElement.id!=null&&event.fromElement.id.indexOf(this.block)>=0)
		return;

	var tempObj;

	obj.borderColor=this.borderColorLightOver;
	obj.borderColorDark=this.borderColorDarkOver;
	obj.borderColorLight=this.borderColorLightOver;
	obj.style.backgroundColor=this.background_colorOver;
	if(this.decLtImageOver.src != this.decLtImageOut.src&&
		(this.decLtWidth!=0||this.parentMenu.arrangeType=="vertically"))
	{
		tempObj=eval(obj.id+"LD");
		tempObj.src=this.decLtImageOver.src;
	}

	if(this.isImage==false)
	{
		tempObj=document.all[obj.id+"TX"].style;
		if(this.font_familyOver!=this.font_familyOut)
			tempObj.fontFamily=this.font_familyOver;
		tempObj.fontSize=this.font_sizeOver;
		tempObj.color=this.colorOver;
		tempObj.fontWeight=this.font_weightOver;
		tempObj.fontStyle=this.font_styleOver;
		tempObj.textDecoration=this.text_decorationOver;
	}
	else
	{
		if(this.innerImageOut.src!=this.innerImageOver.src)
		{
			var tempObj;
			tempObj=eval(obj.id+"INIMG");
			tempObj.src=this.innerImageOver.src;
		}
	}
	this.showSubMenu();
}

function showMouseOutStyle(obj)
{
	if(event.toElement!=null&&event.toElement.id!=null&&event.toElement.id.indexOf(this.block)>=0)
		return;

	var tempObj;

	obj.borderColor=this.borderColorLightOut;
	obj.borderColorDark=this.borderColorDarkOut;
	obj.borderColorLight=this.borderColorLightOut;
	obj.style.backgroundColor=this.background_colorOut;
	if(this.decLtImageOver.src != this.decLtImageOut.src&&
		(this.decLtWidth!=0||this.parentMenu.arrangeType=="vertically"))
	{
		tempObj=eval(obj.id+"LD");
		tempObj.src=this.decLtImageOut.src;
	}

	if(this.isImage==false)
	{
		tempObj=document.all[obj.id+"TX"].style;
		if(this.font_familyOver!=this.font_familyOut)
			tempObj.fontFamily=this.font_familyOut;
		tempObj.fontSize=this.font_sizeOut;
		tempObj.color=this.colorOut;
		tempObj.fontWeight=this.font_weightOut;
		tempObj.fontStyle=this.font_styleOut;
		tempObj.textDecoration=this.text_decorationOut;
	}
	else
	{
		if(this.innerImageOut.src!=this.innerImageOver.src)
		{
			var tempObj;
			tempObj=eval(obj.id+"INIMG");
			tempObj.src=this.innerImageOut.src;
		}
	}
	this.hideSubMenu();
}

function showSubMenu()
{
	if(this.parentMenu.isShow==true)
	{
		clearTimeout(hideAllTimer);
		hideAllTimer=null;
		clearTimeout(currentTimer);
		currentTimer=null;
		while(tempMenu!=null&&tempMenu!=this.parentMenu)
		{
			tempMenu.hidePopup();
			if(tempMenu.parentMenuItem!=null)
				tempMenu=tempMenu.parentMenuItem.parentMenu;
			else
				tempMenu=null;
		}
		if((this.menuIndex==0&&this.getMenuGroup().clickShow==false||this.menuIndex!=0)&&this.subMenu!=null)
			this.subMenu.showPopup();
		if(this.subMenu==null)
			tempMenu=this.parentMenu;
		else if(this.subMenu.isShow==true)
			tempMenu=this.subMenu;
		else
			tempMenu=this.parentMenu;
	}
}

function hideSubMenu()
{
	if(this.parentMenu.isShow==true)
	{
		clearTimeout(currentTimer);
		currentTimer=null;
		if(this.subMenu!=null)
			currentTimer=setTimeout("STMenu["+this.menuGroupIndex+"].menus["+this.subMenu.menuIndex+"].hideCallback();",500);
	}
}

function doClick()
{
	event.cancelBubble=true;
	if(this.menuIndex==0&&this.getMenuGroup().clickShow==true&&this.subMenu!=null)
	{
		if(this.subMenu.isShow==false)
		{
			this.subMenu.showPopup();
			tempMenu=this.subMenu;
		}
	}
	else if(this.url!="")
		open(this.url,this.target);
}

function doMenuOver(obj)
{
	if(event.fromElement!=null&&event.fromElement.id!=null&&event.fromElement.id.indexOf(this.block)>=0)
		return;
	clearTimeout(hideAllTimer);
	hideAllTimer=null;
}

function doMenuOut(obj)
{
	if((event.toElement!=null&&event.toElement.id!=null&&event.toElement.id.indexOf(this.block)>=0)||this.getMenuGroup().clickHide==true)
		return;
	clearTimeout(hideAllTimer);
	hideAllTimer=null;
	hideAllTimer=setTimeout("hideAllMenus();",500);
}

function hideAllMenus()
{
	if(currentTimer!=null)
	{
		clearTimeout(currentTimer);
		currentTimer=null;
	}
	while(tempMenu!=null)
	{
		tempMenu.hidePopup();
		if(tempMenu.parentMenuItem!=null)
			tempMenu=tempMenu.parentMenuItem.parentMenu;
		else
			tempMenu=null;
	}
}

function hideCallback()
{
	this.hidePopup();
	if(tempMenu.parentMenuItem==null)
		tempMenu=null;
	else
		tempMenu=tempMenu.parentMenuItem.parentMenu;
}

function STDocumentClick()
{
	hideAllMenus();
}

function showSTMenu()
{
	if(this.position=="absolute"&&this.menus[0].isShow==false)
	{
		this.menus[0].showPopup();
		tempMenu=this.menus[0];
	}
}

function hideSTMenu()
{
	if(this.position=="absolute"&&this.menus[0].isShow==true)
	{	
		this.menus[0].hidePopup();
		tempMenu=null;
	}
}

function getSTMenu(name)
{
	var i=0;
	var j;
	j=STMenu.length;
	while(i<j)
		if(STMenu[i].name==name)
			return STMenu[i];
		else
			i++;
	return null;
}

function showFloatMenu(name,e)
{
	if(e!=null)
	{
		e.cancelBubble=true;
		showFloatMenuAt(name,e.x,e.y);
	}
}

function showFloatMenuAt(name,x,y)
{
	hideAllMenus();
	var obj;
	obj=getSTMenu(name);
	obj.menus[0].moveToEx(x,y);
	obj.showPopup();
}

function showPopup()
{
	if(this.isShow==false)
	{
		this.isShow=true;
		this.specShow();
	}
}

function hidePopup()
{
	if(this.isShow==true)
	{
		this.isShow=false;
		this.specHide();
	}
}

function getMenuLeft()
{
	var tempX;
	if(this.menuIndex==0)
		return this.getCurrentLeft();
	switch(this.offsetType)
	{
	case "left":
		tempX=this.offsetLeft+this.parentMenuItem.getCurrentLeft()-this.getCurrentWidth();
		break;
	case "right":
		tempX=this.offsetLeft+this.parentMenuItem.getCurrentRight();
		break;
	case "up":
	case "down":
		tempX=this.offsetLeft+this.parentMenuItem.getCurrentLeft();
		break;
	default:
		tempX=0;
		break;
	}
	if(tempX+this.getCurrentWidth()>document.body.clientWidth+document.body.scrollLeft)
		tempX=(document.body.clientWidth+document.body.scrollLeft-this.getCurrentWidth());
	return (tempX>=0?tempX:0);
}

function getMenuTop()
{
	var tempY;
	if(this.menuIndex==0)
		return this.getCurrentTop();
	switch(this.offsetType)
	{
	case "left":
	case "right":
		tempY=this.offsetTop+this.parentMenuItem.getCurrentTop();
		break;
	case "up":
		tempY=this.offsetTop+this.parentMenuItem.getCurrentTop()-this.getCurrentHeight();
		break;
	case "down":
		tempY=this.offsetTop+this.parentMenuItem.getCurrentBottom();
		break;
	default:
		tempY=0;
		break;
	}
	if(tempY+this.getCurrentHeight()>document.body.clientHeight+document.body.scrollTop)
			tempY=document.body.clientHeight+document.body.scrollTop-this.getCurrentHeight();
	return (tempY>=0?tempY:0);
}

function getMenuRight()
{
	return this.getLeft()+this.getCurrentWidth();
}

function getMenuBottom()
{
	return this.getTop()+this.getCurrentHeight();
}

function moveTo(x,y)
{
	this.getBlock().style.left=x;
	this.getBlock().style.top=y;
}

function noneMoveTo(x,y)
{
}

function show()
{
	this.getBlock().style.visibility="visible";
	this.getMenuGroup().menus[0].getBlock().style.clip="rect(0,100%,100%,0)";
}

function hide()
{
	this.getBlock().style.visibility="hidden";
	this.getMenuGroup().menus[0].getBlock().style.clip="rect(0,100%,100%,0)";
}

function setClipRect(left,top,right,bottom)
{
	var rectStr="rect(";
	rectStr+=top;
	rectStr+=top?"% ":" ";
	rectStr+=right;
	rectStr+=right?"% ":" ";
	rectStr+=bottom;
	rectStr+=bottom?"% ":" ";
	rectStr+=left;
	rectStr+=left?"%)":")";
	this.getBlock().style.clip=rectStr;

}

function getMenuGroup()
{
	return STMenu[this.menuGroupIndex];
}

function getCurrentLeft()
{
	var tempX=0;
	var tempObj=this.getBlock();
	while(tempObj!=null)
	{
		tempX+=tempObj.offsetLeft;
		tempObj=tempObj.offsetParent;
	}
	return tempX;
}

function getCurrentTop()
{
	var tempY=0;
	var tempObj=this.getBlock();
	while(tempObj!=null)
	{
		tempY+=tempObj.offsetTop;
		tempObj=tempObj.offsetParent;
	}
	return tempY;
}

function getCurrentWidth()
{
	var tempObj=this.getBlock();
	if(tempObj==null)
		tempObj=this.getBlock();
	return tempObj.offsetWidth;
}

function getCurrentHeight()
{
	var tempObj=this.getBlock();
	if(tempObj==null)
		tempObj=this.getBlock();
	return tempObj.offsetHeight;
}

function getCurrentRight()
{
	return this.getCurrentLeft()+this.getCurrentWidth();
}

function getCurrentBottom()
{
	return this.getCurrentTop()+this.getCurrentHeight();
}

function getLeftDecString()
{
	var str="<IMG";
	if(this.decLtWidth>=0)
		str+=(" WIDTH="+this.decLtWidth);
	if(this.decLtHeight>=0)
		str+=(" HEIGHT="+this.decLtHeight);
	str+=(" BORDER="+this.decLtBorder+" SRC=\""+this.decLtImageOut.src+"\" NAME="+this.decLtId+" ID="+this.decLtId+">");
	return str;
}

function getArrowString()
{
	if(this.subMenu==null)
		this.arrowImage.src =BlankImage.src;
	else
		this.arrowImage.src =this.parentMenu.arrow;
	var str="<IMG";
	if(this.arrowWidth>=0)
		str+=(" WIDTH="+this.arrowWidth);
	if(this.arrowHeight>=0)
		str+=(" HEIGHT="+this.arrowHeight);
	str+=(" SRC=\""+this.arrowImage.src+"\" NAME="+this.arrowId+" ID="+this.arrowId+">");
	return str;
}

function NormalInit()
{
}

function NormalShow()
{
	var x;
	var y;
	x=this.getLeft();
	y=this.getTop();
	this.moveTo(x,y);
	this.show();	
}

function NormalShowCallback()
{
}

function NormalHide()
{
	this.hide();
}

function NormalHideCallback()
{
}

function FadeInit()
{
	this.cur =0;
	this.step=10;
}

function FadeShow()
{
	if(this.timerId!=null)
	{
		clearTimeout(this.timerId);
		this.timerId=null;
		this.specShowCallback();
	}
	else
	{
		var x;
		var y;
		x=this.getLeft();
		y=this.getTop();
		this.moveTo(x,y);
		this.getBlock().filters["Alpha"].opacity=0;
		this.show();
		this.specShowCallback();
	}
}

function FadeShowCallback()
{
	this.getBlock().filters["Alpha"].opacity=this.cur;
	if(this.cur!=this.Alpha_opacity)
	{
		this.cur+=this.step;
		if(this.cur>this.Alpha_opacity)
			this.cur=this.Alpha_opacity;
		this.timerId=setTimeout("STMenu["+this.menuGroupIndex+"].menus["+this.menuIndex+"].specShowCallback();",parseInt(1000/this.specSpeed));
	}
	else
	{
		this.timerId=null;
	}
}

function FadeHide()
{
	if(this.timerId!=null)
	{
		clearTimeout(this.timerId);
		this.timerId=null;
	}
	this.specHideCallback();
}

function FadeHideCallback()
{
	this.cur=0;
	this.getBlock().filters["Alpha"].opacity=this.cur;
	if(this.cur!=0)
	{
		this.cur-=this.step;
		if(this.cur<0)
			this.cur=0;
		this.timerId=setTimeout("STMenu["+this.menuGroupIndex+"].menus["+this.menuIndex+"].specHideCallback();",parseInt(1000/this.specSpeed));
	}
	else
	{
		this.hide();
		this.timerId=null;
	}
}

function FilterInit()
{
	this.getBlock().filters["revealTrans"].transition=filterArray[this.specType];
	this.getBlock().filters["revealTrans"].duration=10/this.specSpeed;
	if(this.getBlock().filters["revealTrans"].duration<0.002)
		this.getBlock().filters["revealTrans"].duration=0.000;
}

function FilterShow()
{
	var x;
	var y;
	x=this.getLeft();
	y=this.getTop();
	this.moveTo(x,y);
	this.getBlock().filters["revealTrans"].apply();
	this.getBlock().style.visibility="visible";
	this.getBlock().filters["revealTrans"].play();
}

function FilterShowCallback()
{
}

function FilterHide()
{
	this.hide();
//	this.getBlock().filters["revealTrans"].apply();
//	this.getBlock().style.visibility="hidden";
//	this.getBlock().filters["revealTrans"].play();
}

function FilterHideCallback()
{
}

var filterArray=new Array();
filterArray["Box in"]=0;
filterArray["Box out"]=1;
filterArray["Circle in"]=2;
filterArray["Circle out"]=3;
filterArray["Wipe up"]=4;
filterArray["Wipe down"]=5;
filterArray["Wipe right"]=6;
filterArray["Wipe left"]=7;
filterArray["Vertical blinds"]=8;
filterArray["Horizontal blinds"]=9;
filterArray["Checkerboard across"]=10;
filterArray["Checkerboard down"]=11;
filterArray["Random dissolve"]=12;
filterArray["Split vertical in"]=13;
filterArray["Split vertical out"]=14;
filterArray["Split horizontal in"]=15;
filterArray["Split horizontal out"]=16;
filterArray["Strips left down"]=17;
filterArray["Strips left up"]=18;
filterArray["Strips right down"]=19;
filterArray["Strips right up"]=20;
filterArray["Random bars horizontal"]=21;
filterArray["Random bars vertical"]=22;
filterArray["Random filter"]=23;