var storViewContactDetails = new Ext.data.JsonStore(
{
    url: 'viewcontactdetails',
    root: 'data.ViewContactDetails',
    fields: 
    [
    	'contactId', 'contactFirstName', 'contactLastName', 'contactDescription', 'contactPhoto', 'designation', 'contactPhone', 'contactEmail', 'alternativeEmail', 'contactUniversity', 'contactFacebook', 'contactLinkedin', 'contactTwitter', 'contactURL', 'lastModified'
    ]
});