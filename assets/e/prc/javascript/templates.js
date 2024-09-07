var tplViewOutletDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{outletId}">',
    		'<div align="center" class="outlet-heading">{outletName}</div>',
    		'<div class="outlet-image"><img class=cover-page src="../assets/e/prc/images/no-image-available.jpg"><div><div class="outlet-description">{outletDescription}</div>',
    		// '<div class="outlet-image"><img class=cover-page src="../assets/e/prc/images/{coverImage}"><div><div class="outlet-description">{outletDescription}</div>',
    		'<br />',
    		'<table width=100%>',
    			'<tpl if="this.isValidURL(outletUrl)">',
        			'<tr><td class="outlet-field">Outlet URL</td><td class="outlet-value"><a target="blank" href="{outletUrl}">{outletUrl}</a></td></tr>',
        		'</tpl>',
        		'<tpl if="!this.isValidURL(outletUrl)">',
        			'<tr><td class="outlet-field">Outlet URL</td><td class="outlet-value">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(outletFacebookUrl)">',
    			'<tr><td class="outlet-field">Facebook</td><td class="outlet-value"><a target="blank" href="{outletFacebookUrl}">{outletFacebookUrl}</a></td></tr>',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(outletFacebookUrl)">',
        			'<tr><td class="outlet-field">Facebook</td><td class="outlet-value">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(outletTwitterUrl)">',
    			'<tr><td class="outlet-field">Twitter</td><td class="outlet-value"><a target="blank" href="{outletTwitterUrl}">{outletTwitterUrl}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(outletTwitterUrl)">',
	    			'<tr><td class="outlet-field">Twitter</td><td class="outlet-value">Not available. Please check back later</td></tr>',
	    		'</tpl>',
	    		
    			'<tr><td class="outlet-field">Circulation</td><td class="outlet-value">{circulation}</a></td></tr>',
    			'<tr><td class="outlet-field">Frequency</td><td class="outlet-value">{frequency}</a></td></tr>',
    			'<tr><td class="outlet-field">Medium</td><td class="outlet-value">{medium}</a></td></tr>',
    			'<tr><td class="outlet-field">Language</td><td class="outlet-value">{language}</a></td></tr>',
    			'<tr><td class="outlet-field">Type</td><td class="outlet-value">{outletType}</a></td></tr>',
    			'<tr><td class="outlet-field">Pub Name</td><td class="outlet-value">{publisherName}</a></td></tr>',

        		'<tpl if="this.isValidURL(publisherWebsite)">',
    			'<tr><td class="outlet-field">Pub Website</td><td class="outlet-value"><a target="blank" href="{publisherWebsite}">{publisherWebsite}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(publisherWebsite)">',
	    			'<tr><td class="outlet-field">Pub Website</td><td class="outlet-value">Not available. Please check back later</td></tr>',
	    		'</tpl>',

    			'<tr><td class="outlet-field">Address 1</td><td class="outlet-value">{address1}</a></td></tr>',
    			'<tr><td class="outlet-field">Address 2</td><td class="outlet-value">{address2}</a></td></tr>',
    			'<tr><td class="outlet-field">City</td><td class="outlet-value">{city}</a></td></tr>',
    			'<tr><td class="outlet-field">County</td><td class="outlet-value">{county}</a></td></tr>',
    			'<tr><td class="outlet-field">State</td><td class="outlet-value">{state}</a></td></tr>',
    			'<tr><td class="outlet-field">Country</td><td class="outlet-value">{country}</a></td></tr>',
    			'<tr><td class="outlet-field">ZipCode</td><td class="outlet-value">{zipCode}</a></td></tr>',
    			'<tr><td class="outlet-field">Phone Number</td><td class="outlet-value">{phoneNumber}</a></td></tr>',
    			'<tr><td class="outlet-field">Fax Number</td><td class="outlet-value">{faxNumber}</a></td></tr>',
    			'<tr><td class="outlet-field">Last Modified</td><td class="outlet-value">{lastModified}</a></td></tr>',
    		'</table>',
    	'</div>',
    '</tpl>',
    '<div class="x-clear"></div>',
    {
    	isValidURL: function(strURL)
    	{
    		var strHTTP = strURL.substring(0, 4);
    		if(strHTTP == "http")
    		{
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	}
    }
);

var tplViewOpportunityList = new Ext.XTemplate(
	'<div align="center" class="opportunity-heading">List of Opportunities</div>',
	'<tpl for=".">',
    	'<tpl if="this.getFirstTwoCharacters(opportunityId) == ' + "'OP'" + '">',
	    	'<div id="{opportunityId}">',
	    		'<table width=100%>',
	    			'<tr><td class="opportunity-field">Opportunity</td><td class="opportunity-value">{opportunityValue}</a></td></tr>',
	        		'<tr><td class="opportunity-field">Description</td><td class="opportunity-value">{opportunityDescription}</a></td></tr>',
	        		'<tr><td class="opportunity-field">Publishing Date</td><td class="opportunity-value">{publishingDate}</a></td></tr>',
	        		'<tr><td class="opportunity-field">Doc Date</td><td class="opportunity-value">{docDeadlineDate}</a></td></tr>',
	        		'<tr><td class="opportunity-field">Ad Date</td><td class="opportunity-value">{adDeadlineDate}</a></td></tr>',
	        		'<tr><td class="opportunity-field">Contact Email</td><td class="opportunity-value">{contactEmail}</a></td></tr>',
	        		//'<tr><td class="opportunity-field">Last modified</td><td class="opportunity-value">{lastModified}</a></td></tr>',
	        		'<hr />',
	    		'</table>',
	    	'</div>',
    	'</tpl>',
    '</tpl>',
    '<div class="x-clear"></div>',
    {
    	getFirstTwoCharacters: function(strOpportunityId)
    	{
    		return strOpportunityId.substring(0, 2);
    	}
    }
);

var tplViewContactList = new Ext.XTemplate(
	'<tpl for=".">',
	   	'<tpl if="this.getFirstCharacters(contactId) == ' + "'C'" + '">',
	    	'<div id="{contactId}">',
	    		'<div align="center" class="outlet-heading">{contactFirstName} {contactLastName}</div>',
	    		'<div class="outlet-image"><img class=cover-page src="images/{contactPhoto}"></td><td class="outlet-description">{contactDescription}</div>',
	    		'<br />',
	    		'<table width=100%>',
	    			'<tr><td class="contact-field">Designation</td><td class="contact-value">{designation}</td></tr>',
	        		'<tr><td class="contact-field">Phone Number</td><td class="contact-value">{contactPhone}</td></tr>',
	        		'<tr><td class="contact-field">Email</td><td class="contact-value">{contactEmail}</td></tr>',
	        		
	        		'<tpl if="this.isValidURL(contactURL)">',
	        			'<tr><td class="contact-field">Contact Website</td><td class="contact-value"><a target="blank" href="{contactURL}">{contactURL}</a></td></tr>',
	        		'</tpl>',
	        		'<tpl if="!this.isValidURL(contactURL)">',
	        			'<tr><td class="contact-field">Contact Website</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
	        		'</tpl>',
	        		
	        		'<tr><td class="contact-field">Alternative Email</td><td class="contact-value">{alternativeEmail}</a></td></tr>',
	        		'<tr><td class="contact-field">University</td><td class="contact-value">{contactUniversity}</a></td></tr>',
	        		'<tpl if="this.isValidURL(contactFacebook)">',
	    					'<tr><td class="contact-field">Facebook</td><td class="contact-value"><a target="blank" href="{contactFacebook}">{contactFacebook}</a></td></tr>',
		        	'</tpl>',
	        		'<tpl if="!this.isValidURL(contactFacebook)">',
	        			'<tr><td class="contact-field">Facebook</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
	        		'</tpl>',
	        		'<tpl if="this.isValidURL(contactLinkedin)">',
	    					'<tr><td class="contact-field">Linked In</td><td class="contact-value"><a target="blank" href="{contactLinkedin}">{contactLinkedin}</a></td></tr>',
		        	'</tpl>',
	        		'<tpl if="!this.isValidURL(contactLinkedin)">',
	        			'<tr><td class="contact-field">Linked In</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
	        		'</tpl>',
	        		'<tpl if="this.isValidURL(contactTwitter)">',
	    					'<tr><td class="contact-field">Twitter</td><td class="contact-value"><a target="blank" href="{contactTwitter}">{contactTwitter}</a></td></tr>',
		    			'</tpl>',
		    			'<tpl if="!this.isValidURL(contactTwitter)">',
		    				'<tr><td class="contact-field">Twitter</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
		    			'</tpl>',
	    			'<tr><td class="contact-field">Last modified</td><td class="contact-value">{lastModified}</a></td></tr>',
	    		'</table>',
	    		'<br /><br /><br />',
	    	'</div>',
	    '</tpl>',
	'</tpl>',
    '<div class="x-clear"></div>',
    {
    	isValidURL: function(strURL)
    	{
    		var strHTTP = strURL.substring(0, 4);
    		if(strHTTP == "http")
    		{
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	},
    	getFirstCharacters: function(strContactId)
    	{
    		return strContactId.substring(0, 1);
    	}
    }
);

//Opportunities
var tplOPKSViewOpportunityDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{opportunityId}">',
    		'<div align="center" class="opportunity-heading">{opportunityValue}</div>',
    		'<table>',
        		'<tr><td class="opportunity-field">Description</td><td class="opportunity-value">{opportunityDescription}</a></td></tr>',
    			'<tr><td class="opportunity-field">Publishing Date</td><td class="opportunity-value">{publishingDate}</a></td></tr>',
    			'<tr><td class="opportunity-field">Doc Deadline Date</td><td class="opportunity-value">{docDeadlineDate}</a></td></tr>',
    			'<tr><td class="opportunity-field">Ad Deadline Date</td><td class="opportunity-value">{adDeadlineDate}</a></td></tr>',
    			
				'<tpl if="this.isValidEmail(contactEmail)">',
        			'<tr><td class="opportunity-field">Email</td><td class="opportunity-value"><a target="blank" href="{contactEmail}">{contactEmail}</a></td></tr>',
        		'</tpl>',
        		'<tpl if="!this.isValidEmail(contactEmail)">',
        			'<tr><td class="opportunity-field">Email</td><td class="opportunity-not-found">NA</td></tr>',
        		'</tpl>',
        		
    			'<tr><td class="opportunity-field">Last Modified</td><td class="opportunity-value">{lastModified}</a></td></tr>',
    		'</table>',
    	'</div>',
    '</tpl>',
    '<div class="x-clear"></div>',
    {
    	isValidEmail: function(strEMail)
    	{
    		var intAtLocation = strEMail.indexOf("@");
    		if(intAtLocation > 0)
    		{
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	}
    }
);

var tplOPKSViewOuttletDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{outletId}">',
    		'<div align="center" class="outlet-heading">{outletName}</div>',
    		'<div class="outlet-image"><img class=cover-page src="../assets/e/prc/images/no-image-available.jpg"><div><div class="outlet-description">{outletDescription}</div>',
    		// '<div class="outlet-image"><img class=cover-page src="../assets/e/prc/images/{coverImage}"><div><div class="outlet-description">{outletDescription}</div>',
    		'<br />',
    		'<table width=100%>',
    			'<tpl if="this.isValidURL(outletUrl)">',
        			'<tr><td class="outlet-field">Outlet URL</td><td class="outlet-value"><a target="blank" href="{outletUrl}">{outletUrl}</a></td></tr>',
        		'</tpl>',
        		'<tpl if="!this.isValidURL(outletUrl)">',
        			'<tr><td class="ocontact-value>Outlet URL</td><td class="outlet-value">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(outletFacebookUrl)">',
    			'<tr><td class="outlet-field">Facebook</td><td class="outlet-value"><a target="blank" href="{outletFacebookUrl}">{outletFacebookUrl}</a></td></tr>',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(outletFacebookUrl)">',
        			'<tr><td class="outlet-field">Facebook</td><td class="outlet-value">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(outletTwitterUrl)">',
    			'<tr><td class="outlet-field">Twitter</td><td class="outlet-value"><a target="blank" href="{outletTwitterUrl}">{outletTwitterUrl}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(outletTwitterUrl)">',
	    			'<tr><td class="outlet-field">Twitter</td><td class="outlet-value">Not available. Please check back later</td></tr>',
	    		'</tpl>',
	    		
    			'<tr><td class="outlet-field">Circulation</td><td class="outlet-value">{circulation}</a></td></tr>',
    			'<tr><td class="outlet-field">Frequency</td><td class="outlet-value">{frequency}</a></td></tr>',
    			'<tr><td class="outlet-field">Medium</td><td class="outlet-value">{medium}</a></td></tr>',
    			'<tr><td class="outlet-field">Language</td><td class="outlet-value">{language}</a></td></tr>',
    			'<tr><td class="outlet-field">Type</td><td class="outlet-value">{outletType}</a></td></tr>',
    			'<tr><td class="outlet-field">Pub Name</td><td class="outlet-value">{publisherName}</a></td></tr>',

        		'<tpl if="this.isValidURL(publisherWebsite)">',
    			'<tr><td class="outlet-field">Pub Website</td><td class="outlet-value"><a target="blank" href="{publisherWebsite}">{publisherWebsite}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(publisherWebsite)">',
	    			'<tr><td class="outlet-field">Pub Website</td><td class="outlet-value">Not available. Please check back later</td></tr>',
	    		'</tpl>',

    			'<tr><td class="outlet-field">Address 1</td><td class="outlet-value">{address1}</a></td></tr>',
    			'<tr><td class="outlet-field">Address 2</td><td class="outlet-value">{address2}</a></td></tr>',
    			'<tr><td class="outlet-field">City</td><td class="outlet-value">{city}</a></td></tr>',
    			'<tr><td class="outlet-field">County</td><td class="outlet-value">{county}</a></td></tr>',
    			'<tr><td class="outlet-field">State</td><td class="outlet-value">{state}</a></td></tr>',
    			'<tr><td class="outlet-field">Country</td><td class="outlet-value">{country}</a></td></tr>',
    			'<tr><td class="outlet-field">ZipCode</td><td class="outlet-value">{zipCode}</a></td></tr>',
    			'<tr><td class="outlet-field">Phone Number</td><td class="outlet-value">{phoneNumber}</a></td></tr>',
    			'<tr><td class="outlet-field">Fax Number</td><td class="outlet-value">{faxNumber}</a></td></tr>',
    			'<tr><td class="outlet-field">Last Modified</td><td class="outlet-value">{lastModified}</a></td></tr>',
    		'</table>',
    	'</div>',
    '</tpl>',
    '<div class="x-clear"></div>',
    {
    	isValidURL: function(strURL)
    	{
    		var strHTTP = strURL.substring(0, 4);
    		if(strHTTP == "http")
    		{
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	}
    }
);

var tplViewContactDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{contactId}">',
    		'<div align="center" class="contact-heading">{contactName}</div>',
    		'<div class="contact-image"><img class=cover-page src="images/{contactPhoto}"><div><div class="contact-description">{contactDescription}</div>',
    		'<br />',
    		'<table width="100%">',
        		'<tr><td class="contact-field">First Name</td><td class="contact-value">{contactFirstName}</a></td></tr>',
    			'<tr><td class="contact-field">Last Name</td><td class="contact-value">{contactLastName}</a></td></tr>',
    			'<tr><td class="contact-field">Designation</td><td class="contact-value">{designation}</a></td></tr>',
    			'<tr><td class="contact-field">Phone Number</td><td class="contact-value">{contactPhone}</a></td></tr>',
    			
				'<tpl if="this.isValidEmail(contactEmail)">',
        			'<tr><td class="contact-field">Email</td><td class="contact-value"><a target="blank" href="{contactEmail}">{contactEmail}</a></td></tr>',
        		'</tpl>',
        		'<tpl if="!this.isValidEmail(contactEmail)">',
        			'<tr><td class="contact-field">Email</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		
        		'<tpl if="this.isValidEmail(alternativeEmail)">',
        			'<tr><td class="contact-field">Alternative Email</td><td class="contact-value"><a target="blank" href="{alternativeEmail}">{alternativeEmail}</a></td></tr>',
        		'</tpl>',
        		'<tpl if="!this.isValidEmail(alternativeEmail)">',
        			'<tr><td class="contact-field">Alternative Email</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		
        		'<tr><td class="contact-field">University</td><td class="contact-value">{contactUniversity}</a></td></tr>',
        		'<tpl if="this.isValidURL(contactFacebook)">',
    			'<tr><td class="contact-field">Facebook</td><td class="contact-value"><a target="blank" href="{contactFacebook}">{contactFacebook}</a></td></tr>',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(contactFacebook)">',
        			'<tr><td class="contact-field">Facebook</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactLinkedin)">',
    			'<tr><td class="contact-field">Linked In</td><td class="contact-value"><a target="blank" href="{contactLinkedin}">{contactLinkedin}</a></td></tr>',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(contactLinkedin)">',
        			'<tr><td class="contact-field">Linked In</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactTwitter)">',
    			'<tr><td class="contact-field">Twitter</td><td class="contact-value"><a target="blank" href="{contactTwitter}">{contactTwitter}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(contactTwitter)">',
	    			'<tr><td class="contact-field">Twitter</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
	    		'</tpl>',
	    		'<tpl if="this.isValidURL(contactURL)">',
    			'<tr><td class="contact-field">Website/Blog</td><td class="contact-value"><a target="blank" href="{contactURL}">{contactURL}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(contactURL)">',
	    			'<tr><td class="contact-field">Website/Blog</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
	    		'</tpl>',
    			'<tr><td class="contact-field">Last Modified</td><td class="contact-value">{lastModified}</a></td></tr>',
    		'</table>',
    	'</div>',
    '</tpl>',
    '<div class="x-clear"></div>',
    {
    	isValidURL: function(strURL)
    	{
    		var strHTTP = strURL.substring(0, 4);
    		if(strHTTP == "http")
    		{
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	},
		isValidEmail: function(strEMail)
    	{
    		var intAtLocation = strEMail.indexOf("@");
    		if(intAtLocation > 0)
    		{
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	}
    }
);