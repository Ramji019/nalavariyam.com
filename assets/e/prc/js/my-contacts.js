var winViewOutletByContact;
var winViewContactDetails;
var strContactName = "";
var strDesignation = "";
var winCBSViewOpportunityLisForContact;
var winCBSAddContactToMyRemainder;
var winCBSAddContactToMyNote;

var hanMyContacts = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/contact-my.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening My Contacts', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	storMyContact.load({params: {myName:strContactName, designation:strDesignation}});
	
	if(Ext.getCmp('tabitmMyContacts'))
	{
		tabCenter.setActiveTab('tabitmMyContacts');
		return;
	}
	
	tabCenter.add(
	{
		title: 'My Contacts',
		tabTip: 'My Contacts',
		id: 'tabitmMyContacts',
		closable: true,
		iconCls: 'iconContactMy',
		layout: 'fit',
		items: 
		[
			new Ext.grid.GridPanel(
			{
				id: 'gridMyContact',
				store: storMyContact,
				viewConfig:
				{
					forceFit:true
				},
				columns:
				[
					expContactMy,
					{
						header: "S. No",
						width: 10,
						sortable: true,
						dataIndex: 'sno'
					},
					{
						header: 'First Name',
						width: 20,
						sortable: true,
						dataIndex: 'contactFirstName'
					},
					{
						header: 'Last Name',
						width: 20,
						sortable: true,
						dataIndex: 'contactLastName'
					},
					{
						header: 'Designation',
						width: 15,
						sortable: true,
						dataIndex: 'contactDesignation'
					},
					{
						xtype: 'actioncolumn',
						width: 5,
						sortable: false,
						items: 
						[
							{
								icon: '../assets/e/prc/icons/view-icon.gif',
								tooltip: 'View My Contact Details'
							}
						]
					}

				],
				plugins: expContactMy,
				listeners:
				{
					render:
					{
						fn: function()
						{
							 Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});
						}
					},
					cellclick:
					{
						fn: function(grid, rowIndex, columnIndex, event) 
						{
							grid.getSelectionModel().selectRow(rowIndex);
							if(columnIndex == 5)
							{
								var intarrLocation = new Array();
								intarrLocation[0] = event.getXY()[0] - 120;
								intarrLocation[1] = event.getXY()[1];
								conmnuContactMy.showAt(intarrLocation);
							}
						}
					},
					rowdblclick:
					{
						fn: function(grid, rowIndex, e)
						{
							hanCBSViewContactDetails(grid, rowIndex);
						}
					}
				},
				stripeRows: true,
				loadMask: true,
				bbar: new Ext.PagingToolbar({
					pageSize: 20,
					store: storMyContact,
					displayInfo: true,
					displayMsg: 'Displaying Contacts {0} - {1} of {2}',
					emptyMsg: "No Contacts to display, Change your My Conditions"
				})
			})
		]
	});
	
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Mying Contacts', true);
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Contact My Result', true);
	
	Ext.getCmp('gridMyContact').setAutoScroll(true);
	
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Contact My Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmMyContacts');
	Ext.getCmp('pbarPRC').updateProgress(1, 'My Contacts Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

	


var hanMyContactsBack = function(btn)
{
	Ext.getCmp('pnlMyContactCardLayout').layout.setActiveItem(0);
}

var xtplOutletByContact = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{outletId}">',
    		'<div align="center" class="outlet-heading">{outletName}</div>',
    		'<div class="outlet-image"><img class=cover-page src="images/{coverImage}"><div><div class="outlet-description">{outletDescription}</div>',
    		'<br />',
    		'<div class="outlet-details" align="left">',
        		'<tpl if="this.isValidURL(outletUrl)">',
        			'<div class="outlet-field">Outlet URL</div><div class="outlet-value"><a target="blank" href="{outletUrl}">{outletUrl}</a></div><br />',
        		'</tpl>',
        		'<tpl if="!this.isValidURL(outletUrl)">',
        			'<div class="outlet-field">Outlet URL</div><div class="outlet-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(outletFacebookUrl)">',
    			'<div class="outlet-field">Facebook</div><div class="outlet-value"><a target="blank" href="{outletFacebookUrl}">{outletFacebookUrl}</a></div><br />',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(outletFacebookUrl)">',
        			'<div class="outlet-field">Facebook</div><div class="outlet-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(outletTwitterUrl)">',
    			'<div class="outlet-field">Twitter</div><div class="outlet-value"><a target="blank" href="{outletTwitterUrl}">{outletTwitterUrl}</a></div><br />',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(outletTwitterUrl)">',
	    			'<div class="outlet-field">Twitter</div><div class="outlet-not-found">Not available. Please check back later</div><br />',
	    		'</tpl>',
	    		
    			'<div class="outlet-field">Circulation</div><div class="outlet-value">{circulation}</a></div><br />',
    			'<div class="outlet-field">Frequency</div><div class="outlet-value">{frequency}</a></div><br />',
    			'<div class="outlet-field">Medium</div><div class="outlet-value">{medium}</a></div><br />',
    			'<div class="outlet-field">Language</div><div class="outlet-value">{language}</a></div><br />',
    			'<div class="outlet-field">Type</div><div class="outlet-value">{outletType}</a></div><br />',
    			'<div class="outlet-field">Pub Name</div><div class="outlet-value">{publisherName}</a></div><br />',

        		'<tpl if="this.isValidURL(publisherWebsite)">',
    			'<div class="outlet-field">Pub Website</div><div class="outlet-value"><a target="blank" href="{publisherWebsite}">{publisherWebsite}</a></div><br />',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(publisherWebsite)">',
	    			'<div class="outlet-field">Pub Website</div><div class="outlet-not-found">Not available. Please check back later</div><br />',
	    		'</tpl>',

    			'<div class="outlet-field">Address 1</div><div class="outlet-value">{address1}</a></div><br />',
    			'<div class="outlet-field">Address 2</div><div class="outlet-value">{address2}</a></div><br />',
    			'<div class="outlet-field">City</div><div class="outlet-value">{city}</a></div><br />',
    			'<div class="outlet-field">State</div><div class="outlet-value">{state}</a></div><br />',
    			'<div class="outlet-field">Country</div><div class="outlet-value">{country}</a></div><br />',
    			'<div class="outlet-field">ZipCode</div><div class="outlet-value">{zipCode}</a></div><br />',
    			'<div class="outlet-field">Phone Number</div><div class="outlet-value">{phoneNumber}</a></div><br />',
    			'<div class="outlet-field">Fax Number</div><div class="outlet-value">{faxNumber}</a></div><br />',
    			'<div class="outlet-field">Last Modified</div><div class="outlet-value">{lastModified}</a></div><br />',
    		'</div>',
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

var xtplViewContactDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{contactId}">',
    		'<div align="center" class="contact-heading">{contactName}</div>',
    		'<div class="contact-image"><img class=cover-page src="images/{contactPhoto}"><div><div class="contact-description">{contactDescription}</div>',
    		'<br />',
    		'<div class="contact-details" align="left">',
        		'<div class="contact-field">First Name</div><div class="contact-value">{contactFirstName}</a></div><br />',
    			'<div class="contact-field">Last Name</div><div class="contact-value">{contactLastName}</a></div><br />',
    			'<div class="contact-field">Designation</div><div class="contact-value">{designation}</a></div><br />',
    			'<div class="contact-field">Phonenumber</div><div class="contact-value">{contactPhone}</a></div><br />',
    			
				'<tpl if="this.isValidEmail(contactEmail)">',
        			'<div class="contact-field">Email</div><div class="contact-value"><a target="blank" href="{contactEmail}">{contactUrl}</a></div><br />',
        		'</tpl>',
        		'<tpl if="!this.isValidEmail(contactEmail)">',
        			'<div class="contact-field">Email</div><div class="contact-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactFacebook)">',
    			'<div class="contact-field">Facebook</div><div class="contact-value"><a target="blank" href="{contactFacebook}">{contactFacebook}</a></div><br />',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(contactFacebook)">',
        			'<div class="contact-field">Facebook</div><div class="contact-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactLinkedin)">',
    			'<div class="contact-field">Linked In</div><div class="contact-value"><a target="blank" href="{contactLinkedin}">{contactLinkedin}</a></div><br />',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(contactLinkedin)">',
        			'<div class="contact-field">Linked In</div><div class="contact-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactTwitter)">',
    			'<div class="contact-field">Twitter</div><div class="contact-value"><a target="blank" href="{contactTwitter}">{contactTwitter}</a></div><br />',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(contactTwitter)">',
	    			'<div class="contact-field">Twitter</div><div class="contact-not-found">Not available. Please check back later</div><br />',
	    		'</tpl>',
	    		'<tpl if="this.isValidURL(contactURL)">',
    			'<div class="contact-field">Website/Blog</div><div class="contact-value"><a target="blank" href="{contactURL}">{contactURL}</a></div><br />',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(contactURL)">',
	    			'<div class="contact-field">Website/Blog</div><div class="contact-not-found">Not available. Please check back later</div><br />',
	    		'</tpl>',
    			'<div class="contact-field">Last Modified</div><div class="contact-value">{lastModified}</a></div><br />',
    		'</div>',
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

var hanCBSViewOutletDetailsByContact = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyContact').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storOutletsByContact.load({params: {contactId:strContactId}});
	var strContactName = rec.get('ContactName');
	
	var strTitle = "List of Outlets were" + strContactName + " is working";
	
	if (!winViewOutletByContact)
	{
		winViewOutletByContact = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewOutletByContact',
			iconCls: 'iconPRC',
			width: 400,
			height: 500,
			constrain: true,
			autoScroll:true,
			items:
			[
			 	{
					xtype: 'dataview',
					autoScroll: true, 
			        store: storOutletsByContact, 
			        tpl: xtplOutletByContact,
			        autoHeight: false, 
			        height: 500,
			        multiSelect: true, 
			        itemSelector: 'div.thumb-wrap',
			        emptyText: 'No data to display',
			        loadingText: 'Please Wait...',
			        style: 'border:1px solid #99BBE8;background:#fff;'
			 	},
			 	{
				 	bbar: 
					{
						xtype: 'toolbar',
						border: 0,
						items: 
						[
							{
								xtype: 'button',
								id: 'btnAddToMyContacts',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Add to My Contacts',
								width: 120,
								height: 25,
								formBind: true,
								handler:function()
								{
									  
								} 
							},
							{
								xtype: 'button',
								id: 'btnClose',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Close',
								width: 120,
								height: 25,
								formBind: true,
								handler:function()
								{
									winViewOutletByContact.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winViewOutletByContact.show();
}

var hanCBSViewContactDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyContact').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewContactDetails.load({params: {contactId:strContactId}});
	var strContactName = rec.get('ContactName');
	
	var strTitle = strContactName + " Details";
	
	if (!winViewContactDetails)
	{
		winViewContactDetails = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewContactDetails',
			iconCls: 'iconPRC',
			width: 400,
			height: 500,
			constrain: true,
			autoScroll:true,
			items:
			[
			 	{
					xtype: 'dataview',
					autoScroll: true, 
			        store: storViewContactDetails, 
			        tpl: xtplViewContactDetails,
			        autoHeight: false, 
			        height: 500,
			        multiSelect: true, 
			        itemSelector: 'div.thumb-wrap',
			        emptyText: 'No data to display',
			        loadingText: 'Please Wait...',
			        style: 'border:1px solid #99BBE8;background:#fff;'
			 	},
			 	{
				 	bbar: 
					{
						xtype: 'toolbar',
						border: 0,
						items: 
						[
							{
								xtype: 'button',
								id: 'btnAddToMyContacts',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Add to My Contacts',
								width: 120,
								height: 25,
								formBind: true,
								handler:function()
								{
									  
								} 
							},
							{
								xtype: 'button',
								id: 'btnClose',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Close',
								width: 120,
								height: 25,
								formBind: true,
								handler:function()
								{
									winViewContactDetails.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winViewContactDetails.show();
}

var hanCBSViewOpportunieyByContact = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyContact').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewOpportunityList.load({params: {cid:strContactId}});
	var strContactFirstName = rec.get('contactFirstName');
	var strContactLastName = rec.get('contactLastName');
	var strTitle = strContactFirstName + " " + strContactLastName + " Opportunities Details";
	
	if (!winCBSViewOpportunityLisForContact)
	{
		winCBSViewOpportunityLisForContact = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			iconCls: 'iconPRC',
			width: 400,
			height: 500,
			constrain: true,
			autoScroll:true,
			items:
			[
			 	{
					xtype: 'dataview',
					autoScroll: true, 
			        store: storViewOpportunityList, 
			        tpl: xtplViewOpportunityListForContact,
			        autoHeight: false, 
			        multiSelect: true, 
			        itemSelector: 'div.thumb-wrap',
			        emptyText: 'No data to display',
			        loadingText: 'Please Wait...',
			        style: 'border:1px solid #99BBE8;background:#fff;'
			 	},
			 	{
				 	bbar: 
					{
						xtype: 'toolbar',
						border: 0,
						items: 
						[
							{
								xtype: 'button',
								id: 'btnAddToMyContactList',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Add to My Contact',
								height: 25,
								formBind: true,
								handler:function()
								{
									
								} 
							},
							{
								xtype: 'button',
								id: 'btnClose',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Close',
								height: 25,
								formBind: true,
								handler:function()
								{
									winCBSViewOpportunityLisForContact.hide();
								}
							}
						]
					}
			 	}
			]
		});
	}
	winCBSViewOpportunityLisForContact.show();
};

var storMyContact = new Ext.data.JsonStore(
{
	root: 'data.myContactResult', 
	url: 'mycontacts',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'contactId'},{name: 'contactFirstName'},{name: 'contactLastName'},{name: 'contactDesignation'},{name: 'contactDescription'}
	],
	baseParams: 
	{
        myName: strContactName, 
		designation: strDesignation
    }
});

var storOutletsByContact = new Ext.data.JsonStore(
{
    url: 'viewoutletdetailsbycontact',
    root: 'data.OutletByContact',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
    ]
});

var storViewContactDetails = new Ext.data.JsonStore(
{
    url: 'viewcontactdetails',
    root: 'data.ViewContactDetails',
    fields: 
    [
     	'contactId', 'contactFirstName', 'contactLastName', 'contactDescription', 'contactPhoto', 'designation', 'contactPhone', 'contactEmail', 'contactFacebook', 'contactLinkedin', 'contactTwitter', 'contactURL', 'lastModified'
    ]
});

var storViewOpportunityList = new Ext.data.JsonStore(
{
    url: 'viewopportunitybycontact',
    root: 'data.viewopportunitybycontact',
    fields: 
    [
     	'opportunityId', 'opportunityValue', 'opportunityDescription', 'publishingDate', 'docDeadlineDate', 'adDeadlineDate', 'contactEmail', 'lastModified'
    ]
});

var expContactMy = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{contactDescription}</p>'
	)
});

var hanCBSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyContact').getSelectionModel().getSelected();
	var strContactNameToAdd = rec.get('contactFirstName');
	var strTitle = strContactNameToAdd + " reminder to Add";
	
	if (!winCBSAddContactToMyRemainder)
	{
		winCBSAddContactToMyRemainder = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			iconCls: 'iconPRC',
			width: 454,
			height: 272,
			constrain: true,
			autoScroll:true,
			items:
			[
				{
					xtype: 'formreminderadd'
				}
			]
		});
	}
	winCBSAddContactToMyRemainder.items.itemAt(0).items.itemAt(0).setValue("Reminder for " + strContactNameToAdd);
	winCBSAddContactToMyRemainder.show();
}

var hanCBSAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyContact').getSelectionModel().getSelected();
	var strContactNameToAdd = rec.get('contactFirstName');
	var strTitle = strContactNameToAdd + " Note to Add";
	
	if (!winCBSAddContactToMyNote)
	{
		winCBSAddContactToMyNote = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			iconCls: 'iconPRC',
			width: 484,
			height: 200,
			constrain: true,
			autoScroll:true,
			items:
			[
				{
					xtype: 'formnoteadd'
				}
			]
		});
	}
	winCBSAddContactToMyNote.items.itemAt(0).items.itemAt(0).setValue("Note about " + strContactNameToAdd);
	winCBSAddContactToMyNote.show();
}

var hanCBSAddComments = function(grid, rowIndex, colIndex)
{
	
}

var hanCBSViewComments = function(grid, rowIndex, colIndex)
{
	
}

var xtplViewOpportunityListForContact = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{opportunityId}">',
    		'<div class="outlet-details" align="left">',
    			'<div class="outlet-field">Opportunity</div><div class="outlet-value">{opportunityValue}</a></div><br />',
        		'<div class="outlet-field">Description</div><div class="outlet-value">{opportunityDescription}</a></div><br />',
        		'<div class="outlet-field">Publishing Date</div><div class="outlet-value">{publishingDate}</a></div><br />',
        		'<div class="outlet-field">Doc Date</div><div class="outlet-value">{docDeadlineDate}</a></div><br />',
        		'<div class="outlet-field">Ad Date</div><div class="outlet-value">{adDeadlineDate}</a></div><br />',
        		'<div class="outlet-field">Contact Email</div><div class="outlet-value">{contactEmail}</a></div><br />',
        		'<div class="outlet-field">Last modified</div><div class="outlet-value">{lastModified}</a></div><br /><br /><br />',
    		'</div>',
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

var conmnuContactMy = new Ext.menu.Menu(
{
	ignoreParentClicks: true,
	items:
	[
		{
			text: 'View Detail',
			icon: '../assets/e/prc/icons/view-icon.gif',
			menu:
			{
				items:
				[
					{
						text: 'Contact',
						tabTip: "View All contact Details",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanCBSViewContactDetails
					},
					{
						text: 'Outlet',
						tabTip: "View Outlet Details",
						icon: '../assets/e/prc/icons/outlet-icon.gif',
						handler: hanCBSViewOutletDetailsByContact
					},
					{
						text: 'Opportunities',
						tabTip: "View All Opportunities",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanCBSViewOpportunieyByContact
					}
				]
			}
		},
		'-',
		{
			text: 'Add to',
			icon: '../assets/e/prc/icons/add-button-icon.gif',
			menu:
			{
				items:
				[
					{
						text: 'Reminder',
						tabTip: "Add Contact to your Reminder",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanCBSAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Contact to your Notes",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanCBSAddToMyNote
					}
				]
			}
		},
		'-',
		{
			text: 'Comments',
			icon: '../assets/e/prc/icons/comment-icon.gif',
			menu:
			{
				items:
				[
					{
						text: 'Add Comments',
						icon: '../assets/e/prc/icons/comment-add-icon.gif',
						tabTip: "Add Your comments",
						handler: hanCBSAddComments
					},
					{
						text: 'View Comments',
						icon: '../assets/e/prc/icons/comment-view-icon.gif',
						tabTip: "View All comments",
						handler: hanCBSViewComments
					}
				]
			}
		}
	]
});
