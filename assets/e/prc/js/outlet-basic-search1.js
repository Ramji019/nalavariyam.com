var winViewOutletDetails;
var winViewOpportunityDetails;
var winViewContactList;
var winAddOutletToMyRemainder;

var strOutletName = "";
var strOutletType = "";

var hanOutletSearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/search-outlet.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Search Outlets', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('iconOutletSearch'))
	{
		tabCenter.setActiveTab('iconOutletSearch');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Search Outlets',
		tabTip: 'Search Outlets',
		id: 'tabitmSearchOutlet',
		closable: true,
		iconCls: 'iconOutletSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlSearchOutletCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlSearchOulet',
						layout: 'hbox',
						width: 400,
						height: 150,
						border: false,
						layoutConfig:
						{
							pack: 'center',
							align: 'middle'
						},
						items:
						[
							{
       							title: 'Search Outlets',
								xtype: 'form',
								width: 350,
								id: 'pnlSearchOutletsForm',
								labelWidth: 80,
								defaultType: 'field',
								autoScroll: true,
								order: false,
								buttonAlign: 'right',
								frame: true, 
								items: 
								[
									{
										xtype: 'textfield',
										fieldLabel: 'Outlet Name', 
										id: 'txtOutletName',
										name: 'outlet_name',
										blankText: "Outlet name is Required", 
										width: 253,
						                allowBlank: false,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanSearchOutletsResult();
												}
											}
										}
									},
									{
										xtype: 'checkboxgroup',
										fieldLabel: 'Outlet Type', 
										columns: 2,
										items: 
										[
											{
												id: 'chkOSMagazine',
												checked: true,
												boxLabel: 'Magazine'
											},
											{
												boxLabel: 'Blog',
												id: 'chkOSBlog'
											},
											{
												boxLabel: 'News Paper',
												id: 'chkOSNewsPaper'
											},
											{
												boxLabel: 'Twitter',
												id: 'chkOSTwitter'
											},
											{
												boxLabel: 'Television',
												id: 'chkOSTelevision'
											},
											{
												boxLabel: 'Websites',
												id: 'chkOSWebsite'
											},
											{
												boxLabel: 'Radio',
												id: 'chkOSRadio'
											},
											/*{
												boxLabel: 'College Newspaper',
												id: 'chkOSCollegeNewspaper'
											},*/
											{
												boxLabel: 'Forum',
												id: 'chkOSForum'
											}
										]
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
											Ext.getCmp('pnlSearchOutletCardLayout').layout.setActiveItem(1);  
										} 
									},
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/search-icon.gif',
										iconAlign: 'left',
										text: 'Search Outlets',
										width: 120,
										height: 25,
										formBind: true,
										handler: hanSearchOutletsResult
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
												icon: '../assets/e/prc/icons/save-icon.png',
												iconAlign: 'left',
												text: 'Save Search',
												height: 25,
												handler: hanSearchOutletsBack
											},
											/*{
												xtype: 'button',
												icon: '../assets/e/prc/icons/icon.gif',
												iconAlign: 'left',
												text: 'Show all Result',
												height: 25,
												handler: hanSearchOutletsBack
											},*/
											{
												xtype: 'button',
												icon: '../assets/e/prc/icons/back-icon.gif',
												iconAlign: 'left',
												text: 'Back',
												height: 25,
												handler: hanSearchOutletsBack
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
												id: 'gridSearchOutlet',
												store: storSearchOutlet,
												viewConfig:
												{
													forceFit:true
												},
												columns:
												[
													expander,
													{
														header: "S. No",
														width: 10,
														sortable: true,
														dataIndex: 'sno'
													},
													{
														header: 'Outlet Name',
														width: 20,
														sortable: true,
														dataIndex: 'outletName'
													},
													{
														header: 'Outlet Description',
														width: 65,
														sortable: true,
														dataIndex: 'outletDescription'
													}
												],
												plugins: expander,
												listeners:
												{
													render:
													{
														fn: function()
														{
															 Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});
														}
													},
													rowcontextmenu:
													{
														fn: function(grid, rowIndex, event) 
														{
															grid.getSelectionModel().selectRow(rowIndex);
															conmnuOutletSearch.showAt(event.getXY());
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanViewOutletDetails(grid, rowIndex);
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar(
												{
													pageSize: 20,
													store: storSearchOutlet,
													displayInfo: true,
													displayMsg: 'Displaying Outlets {0} - {1} of {2}',
													emptyMsg: "No Outlets to display, Change your Search Conditions"
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
	tabCenter.setActiveTab('tabitmSearchOutlet');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Outlets Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanSearchOutletsResult = function(btn)
{
	//Check for Outlet Name not blank.
	strOutletName = Ext.getCmp('txtOutletName').getValue();
	if(strOutletName.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Outlet Name',
			msg: "Outlet Name Empty Please enter the outlet name",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	if(Ext.getCmp('chkOSMagazine').checked)
	{
		strOutletType += "'MA',";
	}
	else if(Ext.getCmp('chkOSNewsPaper').checked)
	{
		strOutletType += "'NP',";
	}
	else if(Ext.getCmp('chkOSTelevision').checked)
	{
		strOutletType += "'TV',";
	}
	else if(Ext.getCmp('chkOSRadio').checked)
	{
		strOutletType += "'RD',";
	}
	else if(Ext.getCmp('chkOSWebsite').checked)
	{
		strOutletType += "'WS',";
	}
	else if(Ext.getCmp('chkOSBlog').checked)
	{
		strOutletType += "'BL',";
	}
	else if(Ext.getCmp('chkOSForum').checked)
	{
		strOutletType += "'FO',";
	}
	else if(Ext.getCmp('chkOSCollegeNewspaper').checked)
	{
		strOutletType += "'CN',";
	}
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
	//Connect to backend and get the JSON object and load it to the table
	
	storSearchOutlet.on('beforeload', function(store)
	{
		storSearchOutlet.baseParams = {searchName:strOutletName, outletType:strOutletType};
	});
	
	storSearchOutlet.load({params: {searchName:strOutletName, outletType:strOutletType}});
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
	
	Ext.getCmp('gridSearchOutlet').setAutoScroll(true);
	
	//Now show the table card layout
	Ext.getCmp('pnlSearchOutletCardLayout').layout.setActiveItem(1);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
	Ext.getCmp('btnShowPreviousSearch').enable();
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	
	
}


var hanSearchOutletsBack = function(btn)
{
	Ext.getCmp('pnlSearchOutletCardLayout').layout.setActiveItem(0);
}

var storViewOutletDetails = new Ext.data.JsonStore(
{
    url: 'viewoutletdetails/showOutletDetails',
    root: 'data.Outlet',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
    ]
});

var storViewOpportunityList = new Ext.data.JsonStore(
{
    url: 'viewopportunitylist',
    root: 'data.viewopportunitylist',
    fields: 
    [
     	'opportunityId', 'opportunityValue', 'opportunityDescription', 'publishingDate', 'docDeadlineDate', 'adDeadlineDate', 'contactEmail', 'lastModified'
    ]
});

var storViewContactList = new Ext.data.JsonStore(
{
    url: 'viewcontactlist',
    root: 'data.viewcontactlist',
    fields: 
    [
     	'contactId', 'contactFirstName', 'contactLastName', 'contactDescription', 'contactPhoto', 'designation', 'contactPhone', 'contactEmail', 'contactFacebook', 'contactLinkedin', 'contactTwitter', 'contactURL', 'lastModified'
    ]
});

var xtplViewOutletDetails = new Ext.XTemplate(
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

var xtplViewOpportunityList = new Ext.XTemplate(
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

var xtplViewContactList = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{contactId}">',
    		'<div align="center" class="outlet-heading">{contactFirstName} {contactLastName}</div>',
    		'<div class="outlet-image"><img class=cover-page src="images/{contactPhoto}"><div><div class="outlet-description">{contactDescription}</div>',
    		'<br />',
    		'<div class="outlet-details" align="left">',
    				'<div class="outlet-field">Designation</div><div class="outlet-value">{designation}</a></div><br />',
        		'<div class="outlet-field">Phone Number</div><div class="outlet-value">{contactPhone}</a></div><br />',
        		'<div class="outlet-field">Email</div><div class="outlet-value">{contactEmail}</a></div><br />',
        		'<tpl if="this.isValidURL(contactURL)">',
        			'<div class="outlet-field">Contact Blog</div><div class="outlet-value"><a target="blank" href="{contactURL}">{contactURL}</a></div><br />',
        		'</tpl>',
        		'<tpl if="!this.isValidURL(contactURL)">',
        			'<div class="outlet-field">Contact Blog</div><div class="outlet-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactFacebook)">',
    					'<div class="outlet-field">Facebook</div><div class="outlet-value"><a target="blank" href="{contactFacebook}">{contactFacebook}</a></div><br />',
	        	'</tpl>',
        		'<tpl if="!this.isValidURL(contactFacebook)">',
        			'<div class="outlet-field">Facebook</div><div class="outlet-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactLinkedin)">',
    					'<div class="outlet-field">Facebook</div><div class="outlet-value"><a target="blank" href="{contactLinkedin}">{contactLinkedin}</a></div><br />',
	        	'</tpl>',
        		'<tpl if="!this.isValidURL(contactLinkedin)">',
        			'<div class="outlet-field">Facebook</div><div class="outlet-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactTwitter)">',
    					'<div class="outlet-field">Twitter</div><div class="outlet-value"><a target="blank" href="{contactTwitter}">{contactTwitter}</a></div><br />',
	    			'</tpl>',
	    			'<tpl if="!this.isValidURL(contactTwitter)">',
	    				'<div class="outlet-field">Twitter</div><div class="outlet-not-found">Not available. Please check back later</div><br />',
	    			'</tpl>',
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

var hanViewOutletDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
	//alert(strOutletId);
	var strOutletId = rec.get('outletId');
	storViewOutletDetails.load({params: {oid:strOutletId}});
	var strOutletNameToView = rec.get('outletName');
	
	var strTitle = strOutletNameToView + " Details";
	
	if (!winViewOutletDetails)
	{
		winViewOutletDetails = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewOutletDetails',
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
			        store: storViewOutletDetails, 
			        tpl: xtplViewOutletDetails,
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
								id: 'btnAddToMyOutlets',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Add to My Outlets',
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
									winViewOutletDetails.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winViewOutletDetails.show();
}

var hanViewOpportunitiesList = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	storViewOpportunityList.load({params: {oid:strOutletId}});
	var strOutletNameToView = rec.get('outletName');
	var strTitle = strOutletNameToView + " Opportunities Details";
	
	if (!winViewOpportunityDetails)
	{
		winViewOpportunityDetails = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewOpportunityDetails',
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
			        tpl: xtplViewOpportunityList,
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
									winViewOpportunityDetails.hide();
								}
							}
						]
					}
			 	}
			]
		});
	}
	winViewOpportunityDetails.show();
}

var hanViewContactList = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	storViewContactList.load({params: {oid:strOutletId}});
	var strOutletNameToView = rec.get('outletName');
	
	var strTitle = strOutletNameToView + " Contact Details";
	
	if (!winViewContactList)
	{
		winViewContactList = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewContactList',
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
			        store: storViewContactList, 
			        tpl: xtplViewContactList,
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
									winViewContactList.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winViewContactList.show();
}

var hanAddToMyOutlet = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
		
	Ext.getCmp('gridSearchOutlet').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Add Outlet to My List', true);
	//Connect to backend and get the JSON object and load it to the table
	
	var conn = new Ext.data.Connection();
	conn.request(
	{
		url: 'myoutletadd',
		method: 'POST',
		params: 
		{
			outletid: strOutletId
		},
		success: function(responseObject)
		{
			Ext.Msg.show(
			{
				title: 'Successful',
				msg: "Outlet added to list successfully!",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
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
	Ext.getCmp('gridSearchOutlet').body.unmask();
}

var hanAddToMyReminder = function(grid, rowIndex, colIndex)
{
}

var hanAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
	var strOutletNameToView = rec.get('outletName');
	var strTitle = strOutletNameToView + " Remainder to Add";
	
	if (!winAddOutletToMyRemainder)
	{
		winAddOutletToMyRemainder = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winAddOutletToMyRemainder',
			iconCls: 'iconPRC',
			width: 454,
			height: 182,
			constrain: true,
			autoScroll:true,
			items:
			[
				{
					xtype: 'form',
					width: 440,
					height: 150,
					id: 'formAddOutletToNote',
					buttonAlign: 'right',
					frame: true,
					bodyStyle: 'padding: 5px',
					defaults: 
					{
						anchor: '0'
					},
					items: 
					[
						{
							xtype: 'textfield',
							id: 'txtAddOutletToNoteSubject',
							name: 'subject',
							html: "Outlet Name: " + strOutletNameToView,
							fieldLabel: 'Subject',
							allowBlank: false, 
							width: 350,
							listeners: 
							{
								specialkey: function(field, e)
								{
									if(e.getKey() == e.ENTER)
									{
										hanAddOutletToNote();
									}
								}
							}
						},
						{
							xtype: 'textarea',
							id: 'txtAddOutletToNoteDetails',
							name: 'details',
							html: "Outlet Name: " + strOutletNameToView,
							fieldLabel: 'Details'
						}
					],
					buttons:
					[
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
								winAddOutletToMyRemainder.hide();
							} 
						},
						{
							text: 'Reset',
							icon: '../icons/icon.gif',
							iconAlign: 'left',
							handler: function()
							{
								Ext.getCmp('formAddOutletToNote').getForm().reset();
							} 
						},
						{
							xtype: 'button',
							icon: 'icons/icon.gif',
							iconAlign: 'left',
							text: 'Add to My Note',
							width: 120,
							height: 25,
							formBind: true,
							handler: hanAddOutletToNote
						}
					]
				}
			]
		});
	}
	winAddOutletToMyRemainder.show();
}

var hanAddOutletToNote = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
		
	Ext.getCmp('formAddOutletToNote').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Add Outlet to My List', true);
	//Connect to backend and get the JSON object and load it to the table
	
	strNoteSubject = Ext.getCmp('txtAddOutletToNoteSubject').getValue();
	strNoteDetails = Ext.getCmp('txtAddOutletToNoteDetails').getValue();
	
	if(strNoteSubject.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Note Subject ',
			msg: "Note Subject is empty Please give a valid keyword",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	Ext.getCmp('gridSearchOutlet').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
	//Connect to backend and get the JSON object and load it to the table
	
	var conn = new Ext.data.Connection();
	conn.request(
	{
		url: 'noteadd',
		method: 'POST',
		params: 
		{
			subject: strNoteSubject, 
			details: strNoteDetails
			
		},
		success: function(responseObject)
		{
			Ext.Msg.show(
			{
				title: 'Successful',
				msg: "Note added successfully!",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
			
			Ext.getCmp('txtAddOutletToNoteSubject').setValue("");
			Ext.getCmp('txtAddOutletToNoteDetails').setValue("");
			
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
	Ext.getCmp('formAddOutletToNote').body.unmask();
}

var storSearchOutlet = new Ext.data.JsonStore(
{
	root: 'data.searchOutletResult', 
	url: 'outletsearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'outletId'},{name: 'outletName'},{name: 'outletDescription'}
	],
	baseParams: 
	{
        searchName: strOutletName, 
		outletType: strOutletType
    }
},this);

var expander = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{outletDescription}</p>'
	)
});


var conmnuOutletSearch = new Ext.menu.Menu(
{
	ignoreParentClicks: true,
	items:
	[
		{
			text: 'View Detail',
			menu:
			{
				items:
				[
					{
						text: 'Outlet',
						tabTip: "View Outlet Details",
						handler: hanViewOutletDetails
					},
					{
						text: 'Opportunities',
						tabTip: "View All Opportunities",
						handler: hanViewOpportunitiesList
					},
					{
						text: 'Contact',
						tabTip: "View All contact Details",
						handler: hanViewContactList
					}
				]
			}
		},
		'-',
		{
			text: 'Add to',
			menu:
			{
				items:
				[
					{
						text: 'My Outlet',
						tabTip: "Add to My Outlet",
						handler: hanAddToMyOutlet
					},
					{
						text: 'Reminder',
						tabTip: "Add Outlet to your Reminder",
						handler: hanAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Outlet to your Notes",
						handler: hanAddToMyNote
					}
				]
			}
		},
		'-',
		{
			text: 'Comments',
			menu:
			{
				items:
				[
					{
						text: 'Add Comments',
						tabTip: "Add Your comments"
					},
					{
						text: 'View Comments',
						tabTip: "View All comments"
					}
				]
			}
		}
	]
});
