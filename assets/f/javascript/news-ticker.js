var delay = 2000; //set delay between message change (in miliseconds)
var maxsteps=30; // number of steps to take to change from start color to endcolor
var stepdelay=40; // time in miliseconds of a single step
//**Note: maxsteps*stepdelay will be total time in miliseconds of fading effect
var startcolor= new Array(255,255,255); // start color (red, green, blue)
var endcolor=new Array(155,0,0); // end color (red, green, blue)

var fcontent=new Array();
begintag='<div style="font: normal 14px Arial; padding: 5px;">'; //set opening tag, such as font declarations
fcontent[0]="We have reached the milestone  of  6000 outlets";
fcontent[1]="We have reached the milestone of 15000 opportunities";
fcontent[2]="We have reached the milestone of 18000 contacts";
fcontent[3]="We have released the first free version on Nov 1 2011";
fcontent[4]="Enterprise version is planned to release on Jan 1 2012";
closetag='</div>';

var fwidth='220px'; //set scroller width
var fheight='140px'; //set scroller height

var fadelinks=0;  //should links inside scroller content also fade like text? 0 for no, 1 for yes.

///No need to edit below this line/////////////////


var ie4=document.all&&!document.getElementById;
var DOM2=document.getElementById;
var faderdelay=0;
var index=0;


function changecontent()
{
	if (index>=fcontent.length)
	{
		index=0
	}
	if (DOM2)
	{
  		document.getElementById("fscroller").style.color="rgb("+startcolor[0]+", "+startcolor[1]+", "+startcolor[2]+")"
		document.getElementById("fscroller").innerHTML=begintag+fcontent[index]+closetag
  		if (fadelinks)
  		{
    			linkcolorchange(1);
    		}
		colorfade(1, 15);
	}
	else if (ie4)
	{
  		document.all.fscroller.innerHTML=begintag+fcontent[index]+closetag;
  	}
	index++
}

function linkcolorchange(step)
{
	var obj=document.getElementById("fscroller").getElementsByTagName("A");
	if (obj.length>0)
	{
		for (i=0;i<obj.length;i++)
		{
			obj[i].style.color=getstepcolor(step);
		}
	}
}

var fadecounter;
function colorfade(step) 
{
	if(step<=maxsteps) 
	{	
  		document.getElementById("fscroller").style.color=getstepcolor(step);
		if (fadelinks)
		{
			linkcolorchange(step);
		}
		step++;
		fadecounter=setTimeout("colorfade("+step+")",stepdelay);
	}
	else
	{
		clearTimeout(fadecounter);
		document.getElementById("fscroller").style.color="rgb("+endcolor[0]+", "+endcolor[1]+", "+endcolor[2]+")";
		setTimeout("changecontent()", delay);
	}   
}

function getstepcolor(step) 
{
	var diff
	var newcolor=new Array(3);
	for(var i=0;i<3;i++) 
	{
		diff = (startcolor[i]-endcolor[i]);
		if(diff > 0) 
		{
			newcolor[i] = startcolor[i]-(Math.round((diff/maxsteps))*step);
		}
		else
		{
			newcolor[i] = startcolor[i]+(Math.round((Math.abs(diff)/maxsteps))*step);
		}
	}
	return ("rgb(" + newcolor[0] + ", " + newcolor[1] + ", " + newcolor[2] + ")");
}

if (ie4||DOM2)
{
	document.write('<div id="fscroller" style="border:1px dotted #D8D8D8;width:'+fwidth+';height:'+fheight+'"></div>');
}

if (window.addEventListener)
{
	window.addEventListener("load", changecontent, false)
}
else if (window.attachEvent)
{
	window.attachEvent("onload", changecontent)
}
else if (document.getElementById)
{
	window.onload=changecontent
}

