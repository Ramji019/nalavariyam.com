var strCurrentJobProfile = "";
var boolImageButtonClicked = false;

function removeAllContact(contactList, contact_first_name, contact_last_name, contact_description, designation_id, contact_photo, contact_phone, contact_email, alternate_email, university, contact_facebook, contact_linkedin, contact_twitter, contact_url)
{
	if (!confirm("You are going to delete all the Contacts? Are you sure you want to delete all the contact?"))
	{
		return;
	}
	var i;
	for(i=contactList.options.length-1;i>=0;i--)
	{
		contactList.remove(i);
	}
	
	contactList.options[contactList.options.length] = new Option("", "nothing");
	var outLength = contactList.length
	
	for (i=0; i<outLength; i++)
	{
	    contactList.options[i].selected = true;
	}
	
	contact_first_name.value = "";
	contact_last_name.value = "";
	contact_description.value = "";
	designation_id.value = "";
	contact_photo.value = "";
	contact_phone.value = "";
	contact_email.value = "";
	
	alternate_email.value = "";
	university.value = "";

	contact_facebook.value = "";
	contact_linkedin.value = "";
	contact_twitter.value = "";
	contact_url.value = "";
	
	document.form_modify_contacts.btnUpdateContact.disabled=true;
	document.form_modify_contacts.btnRemoveContact.disabled=true;
	document.form_modify_contacts.btnSubmitContact.disabled=true;
}

function removeContact(contactList, contact_first_name, contact_last_name, contact_description, designation_id, contact_photo, contact_phone, contact_email, alternate_email, university, contact_facebook, contact_linkedin, contact_twitter, contact_url)
{
	var i;
	for(i=contactList.options.length-1;i>=0;i--)
	{
		if(contactList.options[i].selected)
		contactList.remove(i);
	}
	var outLength = contactList.length
	for (i=0; i<outLength; i++)
	{
	    contactList.options[i].selected = true;
	}
	
	contact_first_name.value = "";
	contact_last_name.value = "";
	contact_description.value = "";
	designation_id.value = "";
	contact_photo.value = "";
	contact_phone.value = "";
	contact_email.value = "";
	
	alternate_email.value = "";
	university.value = "";
	
	contact_facebook.value = "";
	contact_linkedin.value = "";
	contact_twitter.value = "";
	contact_url.value = "";
	
	document.form_modify_contacts.btnRemoveContact.disabled=true;
	document.form_modify_contacts.btnSubmitContact.disabled=false;
}

function addContact(contactList, contact_first_name, contact_last_name, contact_description, designation_id, contact_photo, contact_phone, contact_email, alternate_email, university, contact_facebook, contact_linkedin, contact_twitter, contact_url)
{
	var str_contact_first_name = contact_first_name.value;
	var str_contact_last_name = contact_last_name.value;
	var str_contact_description = contact_description.value;
	var str_designation_id = designation_id.value;
	var str_contact_photo = contact_photo.value;
	var str_contact_phone = contact_phone.value;
	var str_contact_email = contact_email.value;
	
	var str_alternate_email = alternate_email.value;
	var str_university = university.value;
	
	var str_contact_facebook = contact_facebook.value;
	var str_contact_linkedin = contact_linkedin.value;
	var str_contact_twitter = contact_twitter.value;
	var str_contact_url = contact_url.value;
	
	if(str_contact_first_name == "")
	{
		alert("Contact Value is mandatory field!");
		return;
	}
	
	
	var str_full_datails = str_contact_first_name + "|" + 
		str_contact_last_name + "|" + 
		str_contact_description + "|" + 
		str_designation_id + "|" + 
		str_contact_photo + "|" + 
		str_contact_phone + "|" + 
		str_contact_email + "|" + 
		str_alternate_email + "|" + 
		str_university + "|" + 
		str_contact_facebook + "|" + 
		str_contact_linkedin + "|" + 
		str_contact_twitter + "|" + 
		str_contact_url;
		
	contactList.options[contactList.options.length] = new Option(str_full_datails, str_full_datails);
	
	contact_first_name.value = "";
	contact_last_name.value = "";
	contact_description.value = "";
	designation_id.value = "";
	contact_photo.value = "";
	contact_phone.value = "";
	contact_email.value = "";
	alternate_email.value = "";
	university.value = "";
	contact_facebook.value = "";
	contact_linkedin.value = "";
	contact_twitter.value = "";
	contact_url.value = "";
	
	var outLength = contactList.length
	
	for (i=0; i<outLength; i++)
	{
	    contactList.options[i].selected = true
	}
	document.form_modify_contacts.btnSubmitContact.disabled=false;
}

function selectContact(contactList, contactId, contact_first_name, contact_middle_name, contact_last_name, contact_description, designation_id, contact_photo, contact_phone, contact_email, alternate_email, university, contact_facebook, contact_linkedin, contact_twitter, contact_url)
{
	var str_selected_contact = contactList.value;

	var int_pipe_index = str_selected_contact.indexOf("|");
	if(int_pipe_index > 0)
	{
		var strContactId = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_contact_first_name = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_contact_middle_name = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_contact_last_name = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_contact_description = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_designation_id = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_contact_photo = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_contact_phone = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_contact_email = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_alternate_email = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_university = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_contact_facebook = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_contact_linkedin = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_contact.indexOf("|");
		var str_contact_twitter = str_selected_contact.substring(0, int_pipe_index);
		str_selected_contact = str_selected_contact.substring(++int_pipe_index);
		
		var str_contact_url = str_selected_contact;
		
		contactId.value = strContactId;
		contact_first_name.value = str_contact_first_name;
		contact_middle_name.value = str_contact_middle_name;
		contact_last_name.value = str_contact_last_name;
		contact_description.value = str_contact_description;
		designation_id.value = str_designation_id;
		contact_photo.value = str_contact_photo;
		contact_phone.value = str_contact_phone;
		contact_email.value = str_contact_email;
		
		alternate_email.value = str_alternate_email;
		university.value = str_university;
		
		contact_facebook.value = str_contact_facebook;
		contact_linkedin.value = str_contact_linkedin;
		contact_twitter.value = str_contact_twitter;
		contact_url.value = str_contact_url;
		
		document.form_modify_contacts.btnAddContact.disabled=true;
		document.form_modify_contacts.btnUpdateContact.disabled=false;
		document.form_modify_contacts.btnRemoveContact.disabled=false;
		document.form_modify_contacts.btnSubmitContact.disabled=true;
	}
}

function clearContact(contactList, contactId, contact_first_name, contact_middle_name, contact_last_name, contact_description, designation_id, contact_photo, contact_phone, contact_email, alternate_email, university, contact_facebook, contact_linkedin, contact_twitter, contact_url)
{
	contactId.value = "";
	contact_first_name.value = "";
	contact_middle_name.value = "";
	contact_last_name.value = "";
	contact_description.value = "";
	designation_id.value = "";
	contact_photo.value = "";
	contact_phone.value = "";
	contact_email.value = "";
	
	alternate_email.value = "";
	university.value = "";
	
	contact_facebook.value = "";
	contact_linkedin.value = "";
	contact_twitter.value = "";
	contact_url.value = "";
	
	var outLength = contactList.length
	for (i=0; i<outLength; i++)
	{
	    contactList.options[i].selected = false
	}
	document.form_modify_contacts.btnAddContact.disabled=false;
	document.form_modify_contacts.btnUpdateContact.disabled=true;
	document.form_modify_contacts.btnRemoveContact.disabled=true;
}
function updateContact(contactList, contact_first_name, contact_last_name, contact_description, designation_id, contact_photo, contact_phone, contact_email, alternate_email, university, contact_facebook, contact_linkedin, contact_twitter, contact_url)
{
	var str_contact_first_name = contact_first_name.value;
	var str_contact_last_name = contact_last_name.value;
	var str_contact_description = contact_description.value;
	var str_designation_id = designation_id.value;
	var str_contact_photo = contact_photo.value;
	var str_contact_phone = contact_phone.value;
	var str_contact_email = contact_email.value;
	
	var str_alternate_email = alternate_email.value;
	var str_university = university.value;
	
	var str_contact_facebook = contact_facebook.value;
	var str_contact_linkedin = contact_linkedin.value;
	var str_contact_twitter = contact_twitter.value;
	var str_contact_url = contact_url.value;
	
	if(str_contact_first_name == "")
	{
		alert("Contact Value is mandatory field!");
		return;
	}
	var str_full_datails = str_contact_first_name + "|" + 
		str_contact_last_name + "|" + 
		str_contact_description + "|" + 
		str_designation_id + "|" + 
		str_contact_photo + "|" + 
		str_contact_phone + "|" + 
		str_contact_email + "|" + 
		str_alternate_email + "|" + 
		str_university + "|" + 
		str_contact_facebook + "|" + 
		str_contact_linkedin + "|" + 
		str_contact_twitter + "|" + 
		str_contact_url;

	var i;
	for(i=contactList.options.length-1;i>=0;i--)
	{
		if(contactList.options[i].selected)
		{
			contactList.options[i].text = str_full_datails;
			contactList.options[i].value = str_full_datails;
		}
	}
	
	contact_first_name.value = "";
	contact_last_name.value = "";
	contact_description.value = "";
	designation_id.value = "";
	contact_photo.value = "";
	contact_phone.value = "";
	contact_email.value = "";
	
	alternate_email.value = "";
	university.value = "";
	
	contact_facebook.value = "";
	contact_linkedin.value = "";
	contact_twitter.value = "";
	contact_url.value = "";
	
	var outLength = contactList.length
	for (i=0; i<outLength; i++)
	{
	    contactList.options[i].selected = true
	}
	document.form_modify_contacts.btnAddContact.disabled=false;
	document.form_modify_contacts.btnUpdateContact.disabled=true;
	document.form_modify_contacts.btnRemoveContact.disabled=true;
	document.form_modify_contacts.btnSubmitContact.disabled=false;
}

function check(form)
{
	if(boolImageButtonClicked)
	{
		boolImageButtonClicked = false;
		return false;
	}
	var str_contact_first_name = form.contact_first_name.value;
	var str_contact_last_name = form.contact_last_name.value;
	
	if(str_contact_first_name == "" || str_contact_last_name == "")
	{
		alert("Contact names are mandatory");
		return false;
	}
	
	//Checking the Designation Id
	var strDesignationId = form.designation_id.value;
	var strNewDesignationValue = form.newDesignation.value;
	
	if(strDesignationId != "NS" && strNewDesignationValue != "")
	{
		alert("You should either select the designation from the list or add a new designation.");
		return false;
	}
	
	var boolConfirmValue = confirm("Are you sure you want to add/update/delete the contact details?")
	if (boolConfirmValue)
	{
		return true;
	}
	else
	{
		return false;
	}
}

var winContactAdd = null;
function NewWindow(mypage,myname,w,h,scroll,pos)
{
	LeftPosition=(screen.width)?(screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h)/2:100;
	settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=yes,menubar=no,toolbar=no,resizable=no';

	winContactAdd=window.open(mypage,myname,settings);
}

function generateImageLink(strOutletName)
{
	var formAddContact = document.forms['form_modify_contacts'];
	var strFirstName = formAddContact.elements['contact_first_name'].value;
	var strMiddleName = formAddContact.elements['contact_middle_name'].value;
	var strLastName = formAddContact.elements['contact_last_name'].value;
	
	var strFormattedFirstName = trimAndRemoveSpace(strFirstName);
	var strFormattedMiddleName = trimAndRemoveSpace(strMiddleName);
	var strFormattedLastName = trimAndRemoveSpace(strLastName);
	
	strOutletName = reformatString(strOutletName);
	strFirstName = reformatString(strFirstName);
	strLastName = reformatString(strLastName);
	
	if(strFirstName == "")
	{
		alert("Please enter a valid First Name");
		return;
	}
	else if(strLastName == "")
	{
		alert("Please enter a valid Last Name");
		return;
	}
	
	formAddContact.elements['contact_first_name'].value = strFormattedFirstName;
	formAddContact.elements['contact_middle_name'].value = strFormattedMiddleName;
	formAddContact.elements['contact_last_name'].value = strFormattedLastName;
	
	var strImageFileName = strOutletName + "-" + strFirstName + "-" + strLastName + ".jpg";
	
	formAddContact.elements['contact_photo'].value = strImageFileName;
	alert("Make sure that you upload the file name with same name as \n\n" + strImageFileName);
	boolImageButtonClicked = true;
	return false;
}

function reformatString(strValueToFormat)
{
	strValueToFormat = strValueToFormat.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); //Code to trim the space from both side.
	strValueToFormat = strValueToFormat.toLowerCase();
	strValueToFormat = strValueToFormat.replace("  ", " ");
	strValueToFormat = strValueToFormat.replace(" ", "-");
	return strValueToFormat;
}

function trimAndRemoveSpace(strValueToFormat)
{
	strValueToFormat = strValueToFormat.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); //Code to trim the space from both side.
	strValueToFormat = strValueToFormat.replace("  ", " ");
	return strValueToFormat;
}

function generateConactsJobProfileTemplate(strOutletName)
{
	var boolCreateJobProfile = confirm("Press confirm that you need to recreate the Job Profile\nYou will not revert back the existing ");
	if (boolCreateJobProfile==false)
	{
		return;
	}
	
	var formAddContact = document.forms['form_modify_contacts'];
	
	var strContactJobProfile = formAddContact.elements['contact_description'].value;
	strCurrentJobProfile = strContactJobProfile;
	
	var strFirstName = formAddContact.elements['contact_first_name'].value;
	var strLastName = formAddContact.elements['contact_last_name'].value;
	var strDesignationId = formAddContact.elements['designation_id'].value;
	
	//var strContactPhoto = formAddContact.elements['contact_photo'].value;
	
	var strContactPhone = formAddContact.elements['contact_phone'].value;
	var strContactEmail = formAddContact.elements['contact_email'].value;
	var strContactFacebook = formAddContact.elements['contact_facebook'].value;
	var strContactLinkedin = formAddContact.elements['contact_linkedin'].value;
	var strContactTwitter = formAddContact.elements['contact_twitter'].value;
	var strContactUrl = formAddContact.elements['contact_url'].value;
	
	
	var strJobProfile = strFirstName + " " + strLastName + " is the " + strDesignationId + " of " + strOutletName + ".  ";
	
	if(strContactEmail != "")
	{
		strJobProfile += "You can contact " + strFirstName + " through his email address " + strContactEmail + ". ";
	}
	
	if(strContactPhone != "")
	{
		strJobProfile += "The phone number to contact " + strFirstName + " is " + strContactPhone + ". ";
	}
	
	if(strContactFacebook != "")
	{
		strJobProfile += "You can also connect to " + strFirstName + "'s facebook id using the link " + strContactFacebook + " and get his latest updates. ";
	}
	
	if(strContactLinkedin != "")
	{
		strJobProfile += "You can also connect to " + strFirstName + "'s linkedin id " + strContactLinkedin + " and get his professional details. ";
	}
	
	if(strContactTwitter != "")
	{
		strJobProfile += "You can also follow " + strFirstName + " using his twitter link " + strContactTwitter + ". ";
	}
	
	if(strContactUrl != "")
	{
		strJobProfile += "He also has his personal blogs. You can check his new articles in his blog " + strContactUrl + ". ";
	}
	
	formAddContact.elements['contact_description'].value = strJobProfile;
	formAddContact.btnRestoreJobProfile.disabled=false;
}

function restoreConactsJobProfileTemplate(strOutletName)
{
	var boolRestoreJobProfile = confirm("Are you sure that you want to restore the previous job profile. <br /> The change will not be reverted back.");
	if (boolRestoreJobProfile == false)
	{
		return;
	}
	
	var formAddContact = document.forms['form_modify_contacts'];
	formAddContact.elements['contact_description'].value = strCurrentJobProfile;
}
