function getSubscriptionTypeName(strSubscriptionType)
{
	if(strSubscriptionType == "EN")
	{
		strSubscriptionType = "Enterprise Edition";
	}
	else if(strSubscriptionType == "PR")
	{
		strSubscriptionType = "Pro Edition";
	}
	return strSubscriptionType;
}
