var winViewOutletsDetails;
var strOutletName = "";
var strOutletType = "";

var hanOutletAdvanceSearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/advance-search-outlet.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Advance Search Outlets', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmAdvanceSearchOutlets'))
	{
		tabCenter.setActiveTab('tabitmAdvanceSearchOutlets');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Advance Search Outlets',
		tabTip: 'Advance Search Outlets',
		id: 'tabitmAdvanceSearchOutlets',
		closable: true,
		iconCls: 'iconOutletAdvanceSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlAdvanceSearchOutletCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlAdvanceSearchOulet',
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
							    title: 'Advance Outlets Search',
								xtype: 'form',
								width: 347,
								height: 330,
								id: 'pnlAdvanceSearchOutletsForm',
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
										id: 'txtAdvanceOutletName',
										name: 'outlet_name',
										blankText: "Outlet name is Required", 
										width: 250,
						                allowBlank: false,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
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
												id: 'chkOASMagazine',
												checked: true,
												boxLabel: 'Magazine'
											},
											{
												boxLabel: 'Blog',
												id: 'chkOASBlog'
											},
											{
												boxLabel: 'News Paper',
												id: 'chkOASNewsPaper'
											},
											{
												boxLabel: 'Twitter',
												id: 'chkOASTwitter'
											},
											{
												boxLabel: 'Television',
												id: 'chkOASTelevision'
											},
											{
												boxLabel: 'Websites',
												id: 'chkOASWebsite'
											},
											{
												boxLabel: 'Radio',
												id: 'chkOASRadio'
											},
											/*{
												boxLabel: 'College Newspaper',
												id: 'chkOASCollegeNewspaper'
											},*/
											{
												boxLabel: 'Forum',
												id: 'chkOASForum'
											}
										]
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Outlet URL', 
										id: 'txtAdvanceOutletURL',
										name: 'outlet_url',
										width: 250,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
												}
											}
										}
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Circulation', 
										id: 'txtAdvanceOutletCirculation',
										name: 'outlet_circulation',
										width: 250,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
												}
											}
										}
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Medium', 
										id: 'txtAdvanceOutletMedium',
										name: 'outlet_medium',
										width: 250,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
												}
											}
										}
									},
									{
										xtype: 'textfield',
										fieldLabel: 'State', 
										id: 'txtAdvanceOutletState',
										name: 'outlet_state',
										width: 250,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
												}
											}
										}
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Country', 
										id: 'txtAdvanceOutletCountry',
										name: 'outlet_country',
										width: 250,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
												}
											}
										}
									}
								],
								buttons:
								[
									{
										xtype: 'button',
										id: 'btnShowPreviousAdvanceSearch',
										icon: '../assets/e/prc/icons/previous-search-icon.gif',
										iconAlign: 'left',
										text:'Show Previous Search',
										disabled: true,
										height: 25,
										formBind: true,
										handler:function()
										{
											Ext.getCmp('pnlAdvanceSearchOutletCardLayout').layout.setActiveItem(1);
										} 
									},
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/search-icon.gif',
										iconAlign: 'left',
										text: 'Search Outlets',
										height: 25,
										formBind: true,
										handler: hanAdvanceSearchOutletsResult
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
												handler: hanAdvanceSearchOutletsBack
											},
											/*{
												xtype: 'button',
												icon: 'icons/icon.gif',
												iconAlign: 'left',
												text: 'Show all Result',
												height: 25,
												handler: hanAdvanceSearchOutletsBack
											},*/
											{
												xtype: 'button',
												icon: '../assets/e/prc/icons/back-icon.gif',
												iconAlign: 'left',
												text: 'Back',
												height: 25,
												handler: hanAdvanceSearchOutletsBack
											}
										]
									},
									{
										border: false,
										region: 'center',
										layout: 'fit',
										xtype: 'panel',
										id: 'pnlAdvanceSearchOuletResult',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridAdvanceSearchOutlet',
												store: storAdvanceSearchOutlet,
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
														header: 'Circulation/UserCount',
														width: 20,
														sortable: true,
														dataIndex: 'outletCirculation'
													},
													{
														header: 'URL',
														width: 20,
														sortable: true,
														dataIndex: 'outletUrl'
													},
													{
														header: 'Frequency',
														width: 20,
														sortable: true,
														dataIndex: 'outletFrequency'
													},
													{
														header: 'Outlet Type',
														width: 20,
														sortable: true,
														dataIndex: 'outletType'
													},
													{
										                xtype: 'actioncolumn',
										                width: 5,
										                sortable: false,
										                items: 
										                [
															{
																icon: '../assets/e/prc/icons/view-icon.gif',
																tooltip: 'View Outlet Details'
															}
														]
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
													cellclick:
													{
														fn: function(grid, rowIndex, columnIndex, event) 
														{
															grid.getSelectionModel().selectRow(rowIndex);
															if(columnIndex == 7)
															{
																var intarrLocation = new Array();
																intarrLocation[0] = event.getXY()[0] - 120;
																intarrLocation[1] = event.getXY()[1];
																conmnuOutletAdvanceSearch.showAt(intarrLocation);
															}
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanOASViewOutletDetails(grid, rowIndex);
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar(
												{
													pageSize: commonConfig.OUTLET_ROW_COUNT,
													store: storAdvanceSearchOutlet,
													displayInfo: true,
													displayMsg: 'Displaying Outlets {0} - {1} of {2}',
													emptyMsg: "No Outlets to display, Change your Advance Search Conditions"
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
	tabCenter.setActiveTab('tabitmAdvanceSearchOutlets');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Advance Search Outlets Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanAdvanceSearchOutletsResult = function(btn)
{
	//Check for Outlet Name not blank.
	strOutletName = Ext.getCmp('txtAdvanceOutletName').getValue();
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
	
	strOutletType = "";
	
	if(Ext.getCmp('chkOASMagazine').checked)
	{
		strOutletType += "'MA',";
	}
	else if(Ext.getCmp('chkOASNewsPaper').checked)
	{
		strOutletType += "'NP',";
	}
	else if(Ext.getCmp('chkOASTelevision').checked)
	{
		strOutletType += "'TV',";
	}
	else if(Ext.getCmp('chkOASRadio').checked)
	{
		strOutletType += "'RD',";
	}
	else if(Ext.getCmp('chkOASWebsite').checked)
	{
		strOutletType += "'WS',";
	}
	else if(Ext.getCmp('chkOASBlog').checked)
	{
		strOutletType += "'BL',";
	}
	else if(Ext.getCmp('chkOASForum').checked)
	{
		strOutletType += "'FO',";
	}
	else if(Ext.getCmp('chkOASCollegeNewspaper').checked)
	{
		strOutletType += "'CN',";
	}
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'AdvanceSearching Outlets', true);
	//Connect to backend and get the JSON object and load it to the table
	storSearchOutlet.on('beforeload', function(store)
	{
		storSearchOutlet.baseParams = {searchName:strOutletName, outletType:strOutletType};
	});
	
	storAdvanceSearchOutlet.load({params: {searchName:strOutletName, outletType:strOutletType}});
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Advance Search Result', true);
	
	Ext.getCmp('gridAdvanceSearchOutlet').setAutoScroll(true);
	
	//Now show the table card layout
	Ext.getCmp('pnlAdvanceSearchOutletCardLayout').layout.setActiveItem(1);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Advance Search Loaded Successfully', true);
	Ext.getCmp('btnShowPreviousAdvanceSearch').enable();
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	
	strOutletType = "";
}


var hanAdvanceSearchOutletsBack = function(btn)
{
	Ext.getCmp('pnlAdvanceSearchOutletCardLayout').layout.setActiveItem(0);
}

var storOASViewOutlet = new Ext.data.JsonStore(
{
    url: 'viewoutletdetails/showOutletDetails',
    root: 'data.Outlet',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
    ]
});

var tplOASViewOutlet = new Ext.XTemplate(
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

var hanViewOutletAdvanceSearchDetails = function(grid, rowIndex, colIndex)
{
	var rec = storAdvanceSearchOutlet.getAt(rowIndex);	
	var strOutletId = rec.get('outletId');
	storOASViewOutlet.load({params: {oid:strOutletId}});
	var strOutletName = rec.get('outletName');
	
	var strTitle = strOutletName + " Details";
	
	if (!winViewOutletsDetails)
	{
		winViewOutletsDetails = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewOutletsDetails',
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
			        store: storOASViewOutlet, 
			        tpl: tplOASViewOutlet,
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
									winViewOutletsDetails.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winViewOutletsDetails.show();
}

var storAdvanceSearchOutlet = new Ext.data.JsonStore(
{
	root: 'data.advanceSearchOutletResult', 
	url: 'outletadvancesearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'outletId'},{name: 'outletName'},{name: 'outletDescription'},{name: 'outletUrl'},{name: 'outletCirculation'},{name: 'outletFrequency'},{name: 'outletType'}
	]
});


var hanOASViewOutletDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	storOASViewOutlet.load({params: {oid:strOutletId}});
	var strOutletName = rec.get('outletName');
	
	var strTitle = strOutletName + " Details";
	
	if (!winViewOutletsDetails)
	{
		winViewOutletsDetails = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewOutletsDetails',
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
			        store: storOASViewOutlet, 
			        tpl: tplOASViewOutlet,
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
									winViewOutletsDetails.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winViewOutletsDetails.show();
}

var hanOASViewOpportunitiesList = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
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

var hanOASViewContactList = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
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

var hanOASAddToMyOutlet = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
		
	Ext.getCmp('gridAdvanceSearchOutlet').body.mask();
	
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
	Ext.getCmp('gridAdvanceSearchOutlet').body.unmask();
}

var hanOASAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
	var strOutletNameToView = rec.get('outletName');
	var strTitle = strOutletNameToView + " Reminder to Add";
	
	if (!winAddOutletToMyRemainder)
	{
		winAddOutletToMyRemainder = new Ext.Window(
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
	winAddOutletToMyRemainder.items.itemAt(0).items.itemAt(0).setValue("Reminder for " + strOutletNameToView);
	winAddOutletToMyRemainder.show();
}

var hanOASAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
	var strOutletNameToView = rec.get('outletName');
	var strTitle = strOutletNameToView + " Note to Add";
	
	if (!winAddOutletToMyNote)
	{
		winAddOutletToMyNote = new Ext.Window(
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
	winAddOutletToMyNote.items.itemAt(0).items.itemAt(0).setValue("joseph");
	winAddOutletToMyNote.show();
}

var hanAddOutletToNote = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
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
	Ext.getCmp('gridAdvanceSearchOutlet').body.mask();
	
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

var expander = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{outletDescription}</p>'
	)
});

var hanOASAddComments = function(grid, rowIndex, colIndex)
{
	
}

var hanOASViewComments = function(grid, rowIndex, colIndex)
{
	
}

var conmnuOutletAdvanceSearch = new Ext.menu.Menu(
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
						text: 'Outlet',
						tabTip: "View Outlet Details",
						icon: '../assets/e/prc/icons/outlet-icon.gif',
						handler: hanOASViewOutletDetails
					},
					{
						text: 'Opportunities',
						tabTip: "View All Opportunities",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOASViewOpportunitiesList
					},
					{
						text: 'Contact',
						tabTip: "View All contact Details",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOASViewContactList
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
						text: 'My Outlet',
						tabTip: "Add to My Outlet",
						icon: '../assets/e/prc/icons/outlet-icon.gif',
						handler: hanOASAddToMyOutlet
					},
					{
						text: 'Reminder',
						tabTip: "Add Outlet to your Reminder",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOASAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Outlet to your Notes",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOASAddToMyNote
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
						handler: hanOASAddComments
					},
					{
						text: 'View Comments',
						icon: '../assets/e/prc/icons/comment-view-icon.gif',
						tabTip: "View All comments",
						handler: hanOASViewComments
					}
				]
			}
		}
	]
});
