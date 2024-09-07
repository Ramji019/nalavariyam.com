function showOrHideExtraDetails()
{
	var selectedItem=document.form_add_outlets.outlet_type_id.value;
	if(selectedItem == "NS" || selectedItem == "CN" ||  selectedItem == "MA" ||  selectedItem == "NP" || selectedItem == "RD" ||  selectedItem == "TV")
	{
		document.getElementById("blog").style.display="none";
		document.getElementById("forum").style.display="none";
		document.getElementById("twitter").style.display="none";
		document.getElementById("twitter0").style.display="none";
	}
	else if(selectedItem == "BL" || selectedItem == "WS")
	{
		document.getElementById("forum").style.display="none";
		document.getElementById("twitter").style.display="none";
		document.getElementById("blog").style.display="block"
		document.getElementById("twitter0").style.display="block";
	}
	else if(selectedItem == "FO")
	{
		document.getElementById("twitter").style.display="none";
		document.getElementById("blog").style.display="block";
		document.getElementById("twitter0").style.display="block";
		document.getElementById("forum").style.display="block"
	}
	else if(selectedItem == "TW")
	{
		document.getElementById("forum").style.display="none";
		document.getElementById("blog").style.display="none";
		document.getElementById("twitter0").style.display="block";
		document.getElementById("twitter").style.display="block"
	}
}