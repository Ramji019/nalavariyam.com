function removeAllOpporunities(opportunityList, opportunityValue, opportunityDescription, contactEmail, publishingDate, docDeadlineDate, adDeadlineDate)
{
	var i;
	for(i=opportunityList.options.length-1;i>=0;i--)
	{
		opportunityList.remove(i);
	}
	
	opportunityList.options[opportunityList.options.length] = new Option("", "nothing");
	var outLength = opportunityList.length
	
	for (i=0; i<outLength; i++)
	{
	    opportunityList.options[i].selected = true;
	}
	
	opportunityValue.value = "";
	opportunityDescription.value = "";
	contactEmail.value = "";
	publishingDate.value = "";
	docDeadlineDate.value = "";
	adDeadlineDate.value = "";
}

function removeOpporunities(opportunityList, opportunityValue, opportunityDescription, contactEmail, publishingDate, docDeadlineDate, adDeadlineDate)
{
	var i;
	for(i=opportunityList.options.length-1;i>=0;i--)
	{
		if(opportunityList.options[i].selected)
		opportunityList.remove(i);
	}
	var outLength = opportunityList.length
	for (i=0; i<outLength; i++)
	{
	    opportunityList.options[i].selected = true;
	}
	
	opportunityValue.value = "";
	opportunityDescription.value = "";
	contactEmail.value = "";
	publishingDate.value = "";
	docDeadlineDate.value = "";
	adDeadlineDate.value = "";
}

function addOpportunities(opportunityList, opportunityValue, opportunityDescription, contactEmail, publishingDate, docDeadlineDate, adDeadlineDate)
{
	var str_opportunityValue = opportunityValue.value;
	var str_opportunityDescription = opportunityDescription.value;
	var strContactEmail = contactEmail.value;
	var strPublishingDate = publishingDate.value;
	var strDocDeadlineDate = docDeadlineDate.value;
	var strAdDeadlineDate = adDeadlineDate.value;
	
	if(str_opportunityValue == "")
	{
		alert("opportunity Value is mandatory field!");
		return;
	}
	
	var str_full_datails = str_opportunityValue + "|" + str_opportunityDescription + "|" + strContactEmail + "|" + strPublishingDate + "|" + strDocDeadlineDate + "|" + strAdDeadlineDate;
	opportunityList.options[opportunityList.options.length] = new Option(str_full_datails, str_full_datails);
	opportunityValue.value = "";
	opportunityDescription.value = "";
	contactEmail.value = "";
	publishingDate.value = "";
	docDeadlineDate.value = "";
	adDeadlineDate.value = "";
	
	var outLength = opportunityList.length
	
	for (i=0; i<outLength; i++)
	{
	    opportunityList.options[i].selected = true
	}
}

function selectOpportunity(opportunityList, opportunityId, opportunityValue, opportunityDescription, contactEmail, publishingDate, docDeadlineDate, adDeadlineDate)
{
	var str_selected_opportunity = opportunityList.value;


	var int_pipe_index = str_selected_opportunity.indexOf("|");
	if(int_pipe_index > 0)
	{
		var strOpportunityId = str_selected_opportunity.substring(0, int_pipe_index);
		str_selected_opportunity = str_selected_opportunity.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_opportunity.indexOf("|");
		var str_opportunityValue = str_selected_opportunity.substring(0, int_pipe_index);
		str_selected_opportunity = str_selected_opportunity.substring(++int_pipe_index);
		
		int_pipe_index = str_selected_opportunity.indexOf("|");
		var str_opportunityDescription = str_selected_opportunity.substring(0, int_pipe_index);
		str_selected_opportunity = str_selected_opportunity.substring(++int_pipe_index);;
		
		int_pipe_index = str_selected_opportunity.indexOf("|");
		var strContactEmail = str_selected_opportunity.substring(0, int_pipe_index);
		str_selected_opportunity = str_selected_opportunity.substring(++int_pipe_index);;
		
		int_pipe_index = str_selected_opportunity.indexOf("|");
		var strPublishingDate = str_selected_opportunity.substring(0, int_pipe_index);
		str_selected_opportunity = str_selected_opportunity.substring(++int_pipe_index);;
		
		int_pipe_index = str_selected_opportunity.indexOf("|");
		var strDocDeadlineDate = str_selected_opportunity.substring(0, int_pipe_index);
		str_selected_opportunity = str_selected_opportunity.substring(++int_pipe_index);;
		
		var strADDeadlineDate = str_selected_opportunity;;
		
		opportunityId.value = strOpportunityId;
		opportunityValue.value = str_opportunityValue;
		opportunityDescription.value = str_opportunityDescription;
		contactEmail.value = strContactEmail;
		publishingDate.value = strPublishingDate;
		docDeadlineDate.value = strDocDeadlineDate;
		adDeadlineDate.value = strADDeadlineDate;
				
		document.form_modify_opportunity.btnAddOpportunity.disabled=true;
		document.form_modify_opportunity.btnUpdateOpportunity.disabled=false;
		document.form_modify_opportunity.btnRemoveOpportunity.disabled=false;
		document.form_modify_opportunity.btnRemoveAllOpportunity.disabled=false;
		document.form_modify_opportunity.btnClearOpportunity.disabled=false;
	}

}

function updateOpportunities(opportunityList, opportunityValue, opportunityDescription, contactEmail, publishingDate, docDeadlineDate, adDeadlineDate)
{
	var strewOpportunityValue = opportunityValue.value;
	var strewOpportunityDescription = opportunityDescription.value;
	var strContactEmail = contactEmail.value;
	var strPublishingDate = publishingDate.value;
	var strDocDeadlineDate = docDeadlineDate.value;
	var strAdDeadlineDate = adDeadlineDate.value;
	
	
	if(strewOpportunityValue.trim() == "")
	{
		alert("opportunity Value is mandatory field!");
		return;
	}


	var i;
	for(i=opportunityList.options.length-1;i>=0;i--)
	{
		if(opportunityList.options[i].selected)
		{
			opportunityList.options[i].text = strewOpportunityValue + "|" + strewOpportunityDescription + "|" + strContactEmail + "|" + strPublishingDate + "|" + strDocDeadlineDate + "|" + strAdDeadlineDate;
			
			opportunityList.options[i].value = strewOpportunityValue + "|" + strewOpportunityDescription + "|" + strContactEmail + "|" + strPublishingDate + "|" + strDocDeadlineDate + "|" + strAdDeadlineDate;
			
		}
	}
	opportunityValue.value = "";
	opportunityDescription.value = "";
	contactEmail.value = "";
	publishingDate.value = "";
	docDeadlineDate.value = "";
	adDeadlineDate.value = "";
	
	var outLength = opportunityList.length
	for (i=0; i<outLength; i++)
	{
	    opportunityList.options[i].selected = true
	}
}

function check(form)
{
	var boolConfirmValue = confirm("Are you sure you want to manage the opportunity details details?")
	
	if (boolConfirmValue)
	{
		var outLength = form.opportunity_details.length;
		for (i=0; i<outLength; i++)
		{
			form.opportunity_details.options[i].selected = true
		}
		return true;
	}
	else
	{
		return false;
	}

	var strewOpportunityValue = form.opportunity_value.value.trim();
	var strewOpportunityDescription = form.opportunity_description.value.trim();
	var strContactEmail = form.contactEmail.value.trim();
	var strPublishingDate = form.publishingDate.value.trim();
	var strDocDeadlineDate = form.docDeadlineDate.value.trim();
	var strAdDeadlineDate = form.adDeadlineDate.value.trim();
	
	alert(strewOpportunityValue);
	alert(strewOpportunityDescription);
	alert(strContactEmail);
	alert(strPublishingDate);
	alert(strDocDeadlineDate);
	alert(strAdDeadlineDate);
	
	if(strewOpportunityValue != "" || strewOpportunityDescription != "" || strContactEmail != "" || strPublishingDate != "" || strDocDeadlineDate != "" || strAdDeadlineDate != "")
	{
		alert("Please add the opportunity to the list before submitting");
		return false;
	}	
}