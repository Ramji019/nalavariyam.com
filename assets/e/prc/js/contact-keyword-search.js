var winViewOutletByContactKeyword;
var winViewContactDetails;
var strContactName = "";
var strDesignation = "";
var winViewContactKeywordDetails;
var winCKSViewOpportunityLisForContact;

var winCKSAddContactToMyRemainder;
var winCKSAddContactToMyNote;

var hanContactKeywordSearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/contact-keyword-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Search ContactKeyword', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmSearchContactKeyword'))
	{
		tabCenter.setActiveTab('tabitmSearchContactKeyword');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Search ContactKeyword',
		tabTip: 'Search ContactKeyword',
		id: 'tabitmSearchContactKeyword',
		closable: true,
		iconCls: 'iconContactKeywordSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlSearchContactKeywordCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlSearchOulet',
						layout: 'hbox',
						border: false,
						layoutConfig:
						{
							pack: 'center',
							align: 'middle'
						},
						items:
						[
							{   
							    title: 'Contact Keyword Search',
								xtype: 'form',
								width: 370,
								height: 100,
								id: 'pnlSearchContactKeywordForm',
								labelWidth: 100,
								defaultType: 'field',
								autoScroll: true,
								order: false,
								buttonAlign: 'right',
								frame: true, 
								items: 
								[
									{
										xtype: 'textfield',
										fieldLabel: 'Contact Keyword', 
										id: 'txtContactKeywordName',
										name: 'contact_keyword_name',
										blankText: "Contact name is Required", 
										width: 250,
						                allowBlank: false,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanSearchContactKeywordResult();
												}
											}
										}
									}
								],
								buttons:
								[
									{
										xtype: 'button',
										id: 'btnShowPreviousSearch',
										icon: '../assets/e/prc/icons/previous-search-icon.gif',
										iconAlign: 'left',
										text:'Show Previous Search',
										width: 120,
										disabled: true,
										height: 25,
										formBind: true,
										handler:function()
										{
											Ext.getCmp('pnlSearchContactKeywordCardLayout').layout.setActiveItem(1);  
										}
									},
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/search-icon.gif',
										iconAlign: 'left',
										text: 'Search Contact',
										width: 120,
										height: 25,
										formBind: true,
										handler: hanSearchContactKeywordResult
									}
								]
							}
						]
					},
					{
						xtype: 'panel',
						layout: 'fit',
						items:
						[
							{
								xtype: 'panel',
								layout: 'border',
								border: false,
								items: 
								[
									{
										border: false,
										height: 25,
										region: 'north',
										xtype: 'panel',
										layout: 'column',
										items: 
										[
											{
												xtype: 'button',
												icon: '../assets/e/prc/icons/save-icon.gif',
												iconAlign: 'left',
												text: 'Save Search',
												height: 25,
												handler: hanSearchContactKeywordBack
											},
											/*{
												xtype: 'button',
												icon: 'icons/icon.gif',
												iconAlign: 'left',
												text: 'Show all Result',
												height: 25,
												handler: hanSearchContactKeywordBack
											},*/
											{
												xtype: 'button',
												icon: '../assets/e/prc/icons/back-icon.gif',
												iconAlign: 'left',
												text: 'Back',
												height: 25,
												handler: hanSearchContactKeywordBack
											}
										]
									},
									{
										border: false,
										region: 'center',
										layout: 'fit',
										xtype: 'panel',
										id: 'pnlSearchOuletResult',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridSearchContactKeyword',
												store: storSearchContactKeyword,
												viewConfig:
												{
													forceFit:true
												},
												columns:
												[
													expContactKeywordSearch,
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
																tooltip: 'View Contact Details'
															}
														]
										            }
												],
												plugins: expContactKeywordSearch,
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
																conmnuContactKeywordSearch.showAt(intarrLocation);
															}
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanViewOutletDetailsByContactKeyword(grid, rowIndex);
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar(
												{
													pageSize: 20,
													store: storSearchContactKeyword,
													displayInfo: true,
													displayMsg: 'Displaying Contacts {0} - {1} of {2}',
													emptyMsg: "No Contacts to display, Change your Search Conditions"
												})
											})
										]
									}
								]
							}
						]
					}
				]
			}
		]
	});
	
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmSearchContactKeyword');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Contacts Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanSearchContactKeywordResult = function(btn)
{
	//Check for Contact Name not blank.
	strContactName = Ext.getCmp('txtContactKeywordName').getValue();
	
	if(strContactName.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Contact Name',
			msg: "Contact Keyword Empty Please enter the Contact Keyword",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Contacts', true);
	//Connect to backend and get the JSON object and load it to the table
	storSearchContactKeyword.load({params: {searchName:strContactName}});
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Contact Search Result', true);
	
	Ext.getCmp('gridSearchContactKeyword').setAutoScroll(true);
	
	//Now show the table card layout
	Ext.getCmp('pnlSearchContactKeywordCardLayout').layout.setActiveItem(1);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Contact Search Loaded Successfully', true);
	Ext.getCmp('btnShowPreviousSearch').enable();
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}


var hanSearchContactKeywordBack = function(btn)
{
	Ext.getCmp('pnlSearchContactKeywordCardLayout').layout.setActiveItem(0);
}

var xtplOutletByContactKeyword = new Ext.XTemplate(
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

var xtplViewContactKeywordDetails = new Ext.XTemplate(
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

var hanViewOutletDetailsByContactKeyword = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactKeyword').getSelectionModel().getSelected();
	var strContactKeywordId = rec.get('contactId');
	storOutletsByContactKeyword.load({params: {contactId:strContactKeywordId}});
	var strContactKeywordName = rec.get('ContactName');
	
	var strTitle = "List of Outlets were" + strContactKeywordName + " is working";
	
	if (!winViewOutletByContactKeyword)
	{
		winViewOutletByContactKeyword = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewOutletByContactKeyword',
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
			        store: storOutletsByContactKeyword, 
			        tpl: xtplOutletByContactKeyword,
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
								id: 'btnAddToMyContactKeyword',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Add to My ContactKeyword',
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
									winViewOutletByContactKeyword.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winViewOutletByContactKeyword.show();
}

var hanViewContactKeywordDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactKeyword').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewContactKeywordDetails.load({params: {contactId:strContactId}});
	var strContactName = rec.get('ContactName');
	
	var strTitle = strContactName + " Details";
	
	if (!winViewContactKeywordDetails)
	{
		winViewContactKeywordDetails = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewContactKeywordDetails',
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
			        store: storViewContactKeywordDetails, 
			        tpl: xtplViewContactKeywordDetails,
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
								id: 'btnAddToMyContactKeyword',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Add to My ContactKeyword',
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
									winViewContactKeywordDetails.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winViewContactKeywordDetails.show();
}

var hanCKSViewOpportunieyByContact = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactKeyword').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewOpportunityList.load({params: {cid:strContactId}});
	var strContactFirstName = rec.get('contactFirstName');
	var strContactLastName = rec.get('contactLastName');
	var strTitle = strContactFirstName + " " + strContactLastName + " Opportunities Details";
	
	if (!winCKSViewOpportunityLisForContact)
	{
		winCKSViewOpportunityLisForContact = new Ext.Window(
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
									winCKSViewOpportunityLisForContact.hide();
								}
							}
						]
					}
			 	}
			]
		});
	}
	winCKSViewOpportunityLisForContact.show();
};

var storSearchContactKeyword = new Ext.data.JsonStore(
{
	root: 'data.searchContactResult', 
	url: 'contactkeywordsearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'contactId'},{name: 'contactFirstName'},{name: 'contactLastName'},{name: 'contactDesignation'},{name: 'contactDescription'}
	],
	baseParams: 
	{
        searchName: strContactName, 
		designation: strDesignation
    }
});

var storOutletsByContactKeyword = new Ext.data.JsonStore(
{
    url: 'viewoutletdetailsbycontact',
    root: 'data.OutletByContact',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
    ]
});

var storViewContactKeywordDetails = new Ext.data.JsonStore(
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

var expContactKeywordSearch = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{contactDescription}</p>'
	)
});


var hanCKSAddToMyContact = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridSearchContactKeyword').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
		
	Ext.getCmp('gridSearchContactKeyword').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Add Outlet to My List', true);
	//Connect to backend and get the JSON object and load it to the table
	
	var conn = new Ext.data.Connection();
	conn.request(
	{
		url: 'mycontactadd',
		method: 'POST',
		params: 
		{
			contactId: strContactId
		},
		success: function(responseObject)
		{
			var o =  Ext.decode(responseObject.responseText);
			if(o.success)
			{
				Ext.Msg.show(
				{
					title: 'Successful',
					msg: "Contact added to your list successfully!",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
			}
			else
			{
				Ext.Msg.show(
				{
					title: 'Already in List',
					msg: "Contact already added to the list",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.ERROR
				});
			}
		},
		failure: function()
		{
			Ext.Msg.show(
			{
				title: 'Server Error',
				msg: "Some Error in the Sever, Please try again or contact cusomer care",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
		}
	});	
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridSearchContactKeyword').body.unmask();
}

var hanCKSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactKeyword').getSelectionModel().getSelected();
	var strContactNameToAdd = rec.get('contactFirstName');
	var strTitle = strContactNameToAdd + " reminder to Add";
	
	if (!winCKSAddContactToMyRemainder)
	{
		winCKSAddContactToMyRemainder = new Ext.Window(
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
	winCKSAddContactToMyRemainder.items.itemAt(0).items.itemAt(0).setValue("Reminder for " + strContactNameToAdd);
	winCKSAddContactToMyRemainder.show();
}

var hanCKSAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactKeyword').getSelectionModel().getSelected();
	var strContactNameToAdd = rec.get('contactFirstName');
	var strTitle = strContactNameToAdd + " Note to Add";
	
	if (!winCKSAddContactToMyNote)
	{
		winCKSAddContactToMyNote = new Ext.Window(
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
	winCKSAddContactToMyNote.items.itemAt(0).items.itemAt(0).setValue("Note about " + strContactNameToAdd);
	winCKSAddContactToMyNote.show();
}

var hanCKSAddComments = function(grid, rowIndex, colIndex)
{
	
}

var hanCKSViewComments = function(grid, rowIndex, colIndex)
{
	
}

var conmnuContactKeywordSearch = new Ext.menu.Menu(
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
						handler: hanViewContactKeywordDetails
					},
					{
						text: 'Outlet',
						tabTip: "View Outlet Details",
						icon: '../assets/e/prc/icons/outlet-icon.gif',
						handler: hanViewOutletDetailsByContactKeyword
					},
					{
						text: 'Opportunities',
						tabTip: "View All Opportunities",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanCKSViewOpportunieyByContact
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
						text: 'My Contact',
						tabTip: "Add to My Contact",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanCKSAddToMyContact
					},
					{
						text: 'Reminder',
						tabTip: "Add Contact to your Reminder",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanCKSAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Contact to your Notes",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanCKSAddToMyNote
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
						handler: hanCKSAddComments
					},
					{
						text: 'View Comments',
						icon: '../assets/e/prc/icons/comment-view-icon.gif',
						tabTip: "View All comments",
						handler: hanCKSViewComments
					}
				]
			}
		}
	]
});
