function validateTestimonials(form)
{
	var strUserName = form.user_name.value;
	var strSelectedState = form.state_id.value;
	var strSelectedLicenseCategory = form.license_category_id.value;
	var strUserComments = form.user_comments.value;

	if(strUserName == "")
	{
		alert("Please enter your name");
		return false;
	}
	else if(strSelectedState == "NO-STATE")
	{
		alert("Please select a State to proceed");
		return false;
	}
	else if(strSelectedLicenseCategory == "NO-LICENSE-CATEGORY")
	{
		alert("Please select a License Category to proceed");
		return false;
	}
	else if(strUserComments == "")
	{
		alert("Please enter your comments");
		return false;
	}
	
	return true;
}