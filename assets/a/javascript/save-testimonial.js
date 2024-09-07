function saveTestimonialDetails(strURLToLink)
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
			alert("-----" + xmlHttp.responseText);
			document.getElementById("txtTestimonialSavedMessage").innerHTML=xmlHttp.responseText;
		}
	}
	xmlHttp.open("GET",strURLToLink,true);
	xmlHttp.send(null);
}
