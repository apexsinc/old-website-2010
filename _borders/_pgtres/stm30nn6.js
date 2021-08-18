// Ver 3.01

var STMenu=new Array();
var tempMenuTimer=null;

var itemOver=null;
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
	oldMenuIndex=currentMenuIndex;
	oldItemIndex=currentItemIndex;
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
	tempObj.getBlockTab=getMenuBlockTab;
	tempObj.getMenuGroup=getMenuGroup;
	tempObj.isShow=false;
	tempObj.timerId=null;
	tempObj.z_index=(currentMenuIndex==0?1000:tempObj.parentMenuItem.parentMenu.z_index+10);

	tempObj.offsetType=offsetType=="" ? "auto" : offsetType;
	tempObj.offsetLeft=offsetLeft=="" ? 0 : eval(offsetLeft);
	tempObj.offsetTop =offsetTop==""  ? 0 : eval(offsetTop);
	tempObj.arrangeType=arrangeType=="" ? "vertically" : arrangeType;
	if(tempObj.offsetType=="auto")
		tempObj.offsetType= tempObj.arrangeType=="vertically" ? "right" : "down";
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
	case "Fade":
	case "Normal":
	default:
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
	tempObj.getBlockTab=getMenuItemBlockTab;
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

	tempObj.background_colorOut =background_colorOut =="" ? "transparent" : background_colorOut;
	tempObj.background_colorOver=background_colorOver=="" ? "transparent" : background_colorOver;
	tempObj.sepLineImageSrc=sepLineImage;
	tempObj.sepLineImage=new Image();
	tempObj.sepLineImage.src=tempObj.sepLineImageSrc;
	tempObj.sepLineWidth=sepLineWidth=="" ? 0 : eval(sepLineWidth);
	tempObj.lineImageWidth =lineImageWidth== "" ? -1 : eval(lineImageWidth);
	tempObj.lineImageHeight=lineImageHeight=="" ? -1 : eval(lineImageHeight);

	tempObj.decLtOut   =decLtOut;
	tempObj.decLtOver  =decLtOver;
	tempObj.decLtWidth = decLtWidth=="" ? 16 : eval(decLtWidth);
	tempObj.decLtHeight=decLtHeight=="" ? 16 : eval(decLtHeight);
	tempObj.decLtBorder=decLtBorder=="" ? 0 : eval(decLtBorder);
		tempObj.decLtImageOver=new Image();
		tempObj.decLtImageOut =new Image();
		tempObj.decLtImageOver.src=tempObj.decLtOver;
		tempObj.decLtImageOver.border=tempObj.decLtBorder;
		tempObj.decLtImageOut.src =tempObj.decLtOut;
		tempObj.decLtImageOut.border =tempObj.decLtBorder;
		tempObj.decLtId=tempObj.block+"LD";
	tempObj.arrow   =tempObj.parentMenu.arrow;
		tempObj.arrowImage =new Image();
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

		innerText+=("\n<DIV ID=\""+tempObj.block+"\"");
		if(menuIndex==0)
		{
			innerText+=(" style=\"position:"+tempObj.getMenuGroup().position+";");
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
		innerText+=" visibility:hidden\"";
		innerText+=">";

		innerText+="\n<TABLE CELLSPACING=0 CELLPADDING="+tempObj.outerSpace;
		innerText+=" ID=\""+tempObj.block+"TB\"";
		innerText+=(" style=\"");
		innerText+=(" background-color:"+tempObj.background_color+";");
		if(tempObj.background_image!=null)
			innerText+=(" background-image:url("+tempObj.background_image.src+");");
		innerText+=(" background-repeat:"+tempObj.background_repeat+";");
		innerText+=(" border-color:"+tempObj.borderColor+";");
		innerText+=(" border-width:"+tempObj.borderWidth+";");
		innerText+=(" border-style:"+tempObj.borderStyle+";");
		
		innerItemText+="\"";
		innerText+=(" onmouseout=\"STMenu["+menuGroupIndex+"].menus["+menuIndex+"].doMenuOut();\"");
		innerText+=">";

		if(STMenu[menuGroupIndex].menus[menuIndex].arrangeType=="horizontally")
			innerText+="<TR>";
		
		innerHTMLText+=innerText;
		
		var itemIndex;
		for(itemIndex=0;itemIndex<STMenu[menuGroupIndex].menus[menuIndex].items.length;itemIndex++)
		{
			var innerItemText="";
			var tempObj=STMenu[menuGroupIndex].menus[menuIndex].items[itemIndex];
			if(tempObj.parentMenu.arrangeType=="vertically")
				innerItemText+="<TR>";
			
			switch(tempObj.itemType)
			{
			case "normal":
				innerItemText+="<TD NOWRAP STYLE=\"border-width:0\">";
				
				innerItemText+="<TABLE HEIGHT=100% CELLSPACING=0 CELLPADDING="+tempObj.parentMenu.innerSpace;
				if(tempObj.parentMenu.arrangeType!="horizontally")
					innerItemText+=(" WIDTH=100%");
				innerItemText+=" ID="+tempObj.block;
				if(tempObj.tipText!="")
					innerItemText+=(" TITLE=\""+tempObj.tipText+"\"");
				innerItemText+=(" onmouseover=\"");
				innerItemText+=("STMenu["+menuGroupIndex+"].menus["+menuIndex+"].items["+itemIndex+"].showMouseOverStyle();");
				innerItemText+=("\"");				
				innerItemText+=(" onmouseout=\"");
				innerItemText+=("STMenu["+menuGroupIndex+"].menus["+menuIndex+"].items["+itemIndex+"].showMouseOutStyle();");
				innerItemText+=("\"");
				innerItemText+=" BORDERCOLOR="+tempObj.borderColorLightOut;
				innerItemText+=" BORDERCOLORDARK="+tempObj.borderColorDarkOut;
				innerItemText+=" BORDERCOLORLIGHT="+tempObj.borderColorLightOut;
				innerItemText+=" STYLE=\"";
				innerItemText+=(tempObj.url!="" ? " cursor:hand;" : " cursor:default;");
				innerItemText+=(" background-color:"+tempObj.background_colorOut+";");
				innerItemText+=(" border-width:"+tempObj.borderWidth+";");
				innerItemText+=(" border-style:"+tempObj.borderStyle+";");
				innerItemText+="\"><TR>";
				if(tempObj.decLtWidth!=0||tempObj.parentMenu.arrangeType=="vertically")
					innerItemText+=("<TD NOWRAP ALIGN=CENTER VALIGN=MIDDLE WIDTH="+tempObj.parentMenu.lw+" STYLE=\"border-width:0\">"+tempObj.getLeftDecString()+"</TD>");
				innerItemText+=("<TD NOWRAP STYLE=\"border-width:0\"");
				innerItemText+=(" ALIGN="+tempObj.innerTextAlign);
				innerItemText+=(" VALIGN="+tempObj.innerTextVAlign);
				innerItemText+=">";		
				innerItemText+=("<A ID="+tempObj.textStyleId);
				innerItemText+=(" HREF=\"javascript:STMenu["+menuGroupIndex+"].menus["+menuIndex+"].items["+itemIndex+"].doClick();\"");
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
					innerItemText+=("<TD NOWRAP ALIGN=CENTER VALIGN=MIDDLE WIDTH="+tempObj.parentMenu.rw+" STYLE=\"border-width:0\">"+tempObj.getArrowString()+"</TD>");
				innerItemText+="</TR></TABLE>";
				
				innerItemText+="</TD>";
				break;
			case "sepline":
				if(tempObj.parentMenu.arrangeType=="horizontally")
				{
					innerItemText+=("<TD NOWRAP WIDTH="+tempObj.sepLineWidth);
					innerItemText+=(" ID="+tempObj.parentMenu.block+"TD STYLE=\"border-width:0;");
					innerItemText+=(" background-color:"+tempObj.background_colorOut+";");
					innerItemText+=("\">");
				}
				else
				{
					innerItemText+="<TD NOWRAP ID="+tempObj.parentMenu.block+"TD STYLE=\"border-width:0\">";
					
					innerItemText+="<TABLE WIDTH=100% HEIGHT=100% CELLSPACING=0 CELLPADDING=0";
					innerItemText+=" ID="+tempObj.block;
					innerItemText+=" STYLE=\"";
					innerItemText+=(" background-color:"+tempObj.background_colorOut+";");
		
					innerItemText+="\"><TR ID="+tempObj.block+"TR>";
					innerItemText+="<TD ID="+tempObj.block;
					innerItemText+=(" HEIGHT="+tempObj.sepLineWidth);
					innerItemText+=" STYLE=\"";
					innerItemText+="background-color:"+tempObj.background_colorOut+";";
					innerItemText+="\"";
					innerItemText+=">";
				}
				innerItemText+="<IMG ID="+(tempObj.block+"SL")+" SRC=\""+tempObj.sepLineImage.src+"\"";
				if(tempObj.lineImageWidth>=0)
					innerItemText+=(" WIDTH="+tempObj.lineImageWidth);
				if(tempObj.lineImageHeight>=0)
					innerItemText+=(" HEIGHT="+tempObj.lineImageHeight);
				innerItemText+=">";
				
				if(tempObj.parentMenu.arrangeType=="horizontally")
					innerItemText+="</TD>";
				else
				{
					innerItemText+="</TD>";
					innerItemText+="</TR></TABLE>";
					innerItemText+="</TD>";
				}
				break;
			}
			if(tempObj.parentMenu.arrangeType=="vertically")
				innerItemText+="</TR>";
			innerHTMLText+=innerItemText;
		}
		if(STMenu[menuGroupIndex].menus[menuIndex].arrangeType=="horizontally")
			innerText+="</TR>"
		innerText="</TABLE></DIV>";

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
		if(STMenu[i].position=="relative")
		{
			STMenu[i].menus[0].show();
			STMenu[i].menus[0].isShow=true;
		}
	}
}

function getMenuBlock()
{
	return document.getElementById(this.block);
}

function getMenuBlockTab()
{
	return document.getElementById(this.block+"B");
}

function nonedo()
{
}

function getMenuItemBlock()
{
	return document.getElementById(this.block);
}

function getMenuItemBlockTab()
{
	return null;
}

function showMouseOverStyle()
{
	var tempObj;

	if(this.isImage==false)
	{
		tempObj=document.getElementById(this.textStyleId).style;
		tempObj.fontFamily=this.font_familyOver;
		tempObj.fontSize  =this.font_sizeOver;
		tempObj.color     =this.colorOver;
		tempObj.fontWeight=this.font_weightOver;
		tempObj.fontStyle =this.font_styleOver;
		tempObj.textDecoration=this.text_decorationOver;
		if(this.decLtImageOver.src != this.decLtImageOut.src&&
			(this.decLtWidth!=0||this.parentMenu.arrangeType=="vertically"))
			document.images[this.decLtId].src=this.decLtImageOver.src;
	}
	else
	{
		if(this.innerImageOut.src!=this.innerImageOver.src)
			document.images[this.block+"INIMG"].src=this.innerImageOver.src;
	}
	this.showSubMenu();
}

function showMouseOutStyle()
{
	if(this.isImage==false)
	{
		var tempObj;
		tempObj=document.getElementById(this.textStyleId).style;
		tempObj.fontFamily=this.font_familyOut;
		tempObj.fontSize  =this.font_sizeOut;
		tempObj.color     =this.colorOut;
		tempObj.fontWeight=this.font_weightOut;
		tempObj.fontStyle =this.font_styleOut;
		tempObj.textDecoration=this.text_decorationOut;

		if(this.decLtImageOver.src != this.decLtImageOut.src&&
			(this.decLtWidth!=0||this.parentMenu.arrangeType=="vertically"))
			document.images[this.decLtId].src=this.decLtImageOut.src;
	}
	else
	{
		if(this.innerImageOut.src!=this.innerImageOver.src)
			document.images[this.block+"INIMG"].src=this.innerImageOut.src;
	}
	this.hideSubMenu();
}

function showSubMenu()
{
	if(this.parentMenu.isShow==true)
	{
		if(hideAllTimer!=null)
		{
			clearTimeout(hideAllTimer);
			hideAllTimer=null;
		}
		if(currentTimer!=null)
		{
			clearTimeout(currentTimer);
			currentTimer=null;
		}
		while(tempMenu!=null&&tempMenu!=this.parentMenu)
		{
			tempMenu.hidePopup();
			if(tempMenu.parentMenuItem!=null)
				tempMenu=tempMenu.parentMenuItem.parentMenu;
			else
				tempMenu=null;
		}
		if((this.menuIndex!=0||this.menuIndex==0&&this.getMenuGroup().clickShow==false)&&this.subMenu!=null)
			if(this.subMenu.isShow==false)
				this.subMenu.showPopup();
		if(this.subMenu==null)
			tempMenu=this.parentMenu;
		else if(this.subMenu.isShow==true)
			tempMenu=this.subMenu;
		else
			tempMenu=this.parentMenu;
	}
	itemOver=this;
}

function hideSubMenu()
{
	itemOver=null;
	if(this.parentMenu.isShow==true)
	{
		if(currentTimer!=null)
		{
			clearTimeout(currentTimer);
			currentTimer=null;
		}
		if(this.subMenu!=null)
			currentTimer=setTimeout("STMenu["+this.menuGroupIndex+"].menus["+this.subMenu.menuIndex+"].hideCallback();",100);
	}
}

function doClick()
{
	itemOver=this;
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

function doMenuOut()
{
	if(this.getMenuGroup().clickHide==true)
		return;
	itemOver=null;
	if(hideAllTimer!=null)
	{
		clearTimeout(hideAllTimer);
		hideAllTimer=null;
	}
	hideAllTimer=setTimeout("hideAllMenus();",100);
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
	itemOver=null;
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
	if(itemOver==null)
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
	while(i<STMenu.length)
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
		showFloatMenuAt(name,e.pageX,e.pageY);
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
	if(tempX+this.getCurrentWidth()>window.pageXOffset+window.innerWidth)
		tempX=(window.pageXOffset+window.innerWidth-this.getCurrentWidth());
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
	if(tempY+this.getCurrentHeight()>window.pageYOffset+window.innerWidth)
			tempY=window.pageYOffset+window.innerWidth-this.getCurrentHeight();
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
}

function hide()
{
	this.getBlock().style.visibility="hidden";
}

function setClipRect(left,top,right,bottom)
{
	var rectStr="rect(";
	rectStr+=(parseInt(top*this.height/100)+",");
	rectStr+=(parseInt(right*this.width/100)+",")
	rectStr+=(parseInt(bottom*this.height/100)+",")
	rectStr+=(parseInt(left*this.width/100)+")")
	this.getBlock().style.clip=rectStr;
}

function getMenuGroup()
{
	return STMenu[this.menuGroupIndex];
}

function getCurrentLeft()
{
	var tempX=0;
	var tempObj=this.getBlockTab();
	if(tempObj==null)
		tempObj=this.getBlock();
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
	var tempObj=this.getBlockTab();
	if(tempObj==null)
		tempObj=this.getBlock();
	while(tempObj!=null)
	{
		tempY+=tempObj.offsetTop;
		tempObj=tempObj.offsetParent;
	}
	return tempY;
}

function getCurrentWidth()
{
	var tempObj=this.getBlockTab();
	if(tempObj==null)
		tempObj=this.getBlock();
	return tempObj.offsetWidth;
}

function getCurrentHeight()
{
	var tempObj=this.getBlockTab();
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