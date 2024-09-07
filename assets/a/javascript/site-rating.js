function $(v,o) { return((typeof(o)=='object'?o:document).getElementById(v)); }
function $S(o) { return((typeof(o)=='object'?o:$(o)).style); }
function agent(v) { return(Math.max(navigator.userAgent.toLowerCase().indexOf(v),0)); }
function abPos(o) { var o=(typeof(o)=='object'?o:$(o)), z={X:0,Y:0}; while(o!=null) { z.X+=o.offsetLeft; z.Y+=o.offsetTop; o=o.offsetParent; }; return(z); }
function XY(e,v) { var o=agent('msie')?{'X':event.clientX+document.body.scrollLeft,'Y':event.clientY+document.body.scrollTop}:{'X':e.pageX,'Y':e.pageY}; return(v?o[v]:o); }

star={};

star.mouse=function(e,o) { if(star.stop || isNaN(star.stop)) { star.stop=0;

	document.onmousemove=function(e) { var n=star.num;

		var p=abPos($('star'+n)), x=XY(e), oX=x.X-p.X, oY=x.Y-p.Y; star.num=o.id.substr(4);

		if(oX<1 || oX>84 || oY<0 || oY>19) { star.stop=1; star.revert(); }

		else {

			$S('starCur'+n).width=oX+'px';
			$S('starUser'+n).color='#111';
			$('starUser'+n).innerHTML=Math.round(oX/84*100)+'%';
		}
	};
} };

star.update=function(e,o) { var n=star.num, v=parseInt($('starUser'+n).innerHTML);

	n=o.id.substr(4); $('starCur'+n).title=v;
	//alert("Jesus" + v);
	ajaxFunction(v);
};

star.revert=function() { var n=star.num, v=parseInt($('starCur'+n).title);

	$S('starCur'+n).width=Math.round(v*84/100)+'px';
	$('starUser'+n).innerHTML=(v>0?Math.round(v)+'%':'');
	$('starUser'+n).style.color='#888';

	document.onmousemove='';

};

star.num=0;

function ajaxFunction(intCurrentSelectedValue)
{
	var xmlHttp;
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch (e)
	{
		// Internet Explorer
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				alert("Your browser does not support AJAX!");
				return false;
			}
			}
		}
		xmlHttp.onreadystatechange=function()
		{
			if(xmlHttp.readyState==4)
			{
				if(xmlHttp.responseText == "ALREADY-ADDED")
				{
					alert("You already add the rating ");
					return;
				}
				document.getElementById("txtCurrrentRating").innerHTML=xmlHttp.responseText;
			}
	}
	xmlHttp.open("GET","time.jsp?selected_percentage=" + intCurrentSelectedValue,true);
	xmlHttp.send(null);
}