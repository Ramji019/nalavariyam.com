var winViewOutletsDetails;
var strOutletName = "";
var strOutletType = "";

var hanOutletSearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/search-outlet.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Search Outlets', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmSearchOutlets'))
	{
		tabCenter.setActiveTab('tabitmSearchOutlets');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Search Outlets',
		tabTip: 'Search Outlets',
		id: 'tabitmSearchOutlets',
		closable: true,
		iconCls: 'iconPRC',
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
								xtype: 'form',
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
										width: 200,
						                allowBlank: false
									},
									{
										xtype: 'fieldset',
										bodyStyle: 'padding-bottom:4px',
										title: 'Outlet Type',
										autoHeight: true,
										defaultType: 'checkbox',
										layout: 'table',
										border: true,
										layoutConfig:
										{
											columns: 1
										},
										items: 
										[
											{
												id: 'MA',
												checked: true,
												boxLabel: 'Magazine&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
											},
											{
												boxLabel: 'News Paper&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
												id: 'NP'
											},
											{
												boxLabel: 'Television&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
												id: 'TV'
											},
											{
												boxLabel: 'Radio&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
												id: 'RD'
											},
											{
												boxLabel: 'Websites&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
												id: 'WS'
											},
											{
												boxLabel: 'Blog&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
												id: 'BL'
											},
											{
												boxLabel: 'Forum&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
												id: 'FO'
											},
											{
												boxLabel: 'College Newspaper&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
												id: 'CN'
											}
										]
									}
								],
								buttons:
								[
									{
										xtype: 'button',
										id: 'btnShowPreviousSearch',
										icon: 'icons/icon.gif',
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
										icon: 'icons/icon.gif',
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
												icon: 'icons/icon.gif',
												iconAlign: 'left',
												text: 'Show all Result',
												height: 25,
												handler: hanSearchOutletsBack
											},*/
											{
												xtype: 'button',
												icon: 'icons/icon.gif',
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
													},
													{
										                xtype: 'actioncolumn',
										                width: 5,
										                sortable: false,
										                items: 
										                [
															{
																icon: '../assets/e/prc/icons/icon.gif',
																tooltip: 'View Outlet Details',
																handler: hanViewOutletDetails
															},
															{
																icon: '../assets/e/prc/icons/icon.gif',
																tooltip: 'View Opportunities Details',
																handler: hanViewOpportunitiesDetails
															},
															{
																icon: '../assets/e/prc/icons/icon.gif',
																tooltip: 'View Contacts Details',
																handler: hanViewContactDetails
															}
														]
										            }
												],
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar({
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
	tabCenter.setActiveTab('tabitmSearchOutlets');
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
	
	if(Ext.getCmp('MA').checked)
	{
		strOutletType += "'MA',";
	}
	else if(Ext.getCmp('NP').checked)
	{
		strOutletType += "'NP',";
	}
	else if(Ext.getCmp('TV').checked)
	{
		strOutletType += "'TV',";
	}
	else if(Ext.getCmp('RD').checked)
	{
		strOutletType += "'RD',";
	}
	else if(Ext.getCmp('WS').checked)
	{
		strOutletType += "'WS',";
	}
	else if(Ext.getCmp('BL').checked)
	{
		strOutletType += "'BL',";
	}
	else if(Ext.getCmp('FO').checked)
	{
		strOutletType += "'FO',";
	}
	else if(Ext.getCmp('CN').checked)
	{
		strOutletType += "'CN',";
	}
	
	var formOutletSearch = new Ext.form.BasicForm(null, 
	{
		url: 'outletsearch',
		el: 'default_xact',
		timeout: 10000,
		method: 'post'
	});
	
	Ext.getCmp('gridSearchOutlet').getStore().removeAll();
	
	formOutletSearch.submit(
	{
		waitMsg : 'Searching Outlets Please wait...',
		params: {searchName:strOutletName, outletType:strOutletType},
		success: function(form, action)
		{
			if (action.result && action.result.success)
			{
				console.log("Data: " + action.result.data);
				Ext.getCmp('gridSearchOutlet').getStore().loadData(action.result);
				Ext.getCmp('gridSearchOutlet').getStore().proxy.data = action.result;

				//Ext.getCmp('gridSearchOutlet').getStore().load({params: {searchName:strOutletName, outletType:strOutletType}});
				
				if (Ext.getCmp('gridSearchOutlet').getStore().getCount() == 0 ) 
				{
						Ext.getCmp('gridSearchOutlet').getView().mainBody.update('<br><br><center><span class="x-grid-empty" style="font-size: 16px">No Outlets were found with this search criteria. Please try again.</span></center>');
						//Ext.MessageBox.alert('Search results', "No records were found that match your search criteria. Please try again.");
				}
				else
				{
					Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
					
					Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
					
					Ext.getCmp('gridSearchOutlet').setAutoScroll(true);
					
					//Now show the table card layout
					Ext.getCmp('pnlSearchOutletCardLayout').layout.setActiveItem(1);
					Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
					Ext.getCmp('btnShowPreviousSearch').enable();
					Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
				}
			}
		},
		failure: function(form, action)
		{
			try
			{
				Ext.MessageBox.alert("Error", "Server side error");
			}
			catch(err)
			{
				Ext.MessageBox.alert('An error occured', err);
			}
		},
		scope : this
	});	
}


var hanSearchOutletsBack = function(btn)
{
	Ext.getCmp('pnlSearchOutletCardLayout').layout.setActiveItem(0);
}

var strData = new Ext.data.JsonStore(
{
    url: 'viewoutletdetails/showOutletDetails',
    root: 'data.Outlet',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
    ]
});

var tplData = new Ext.XTemplate(
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

var hanViewOutletDetails = function(grid, rowIndex, colIndex)
{
	var rec = storSearchOutlet.getAt(rowIndex);	
	var strOutletId = rec.get('outletId');
	strData.load({params: {oid:strOutletId}});
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
			        store: strData, 
			        tpl: tplData,
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

var hanViewOpportunitiesDetails = function(grid, rowIndex, colIndex)
{
	var rec = storSearchOutlet.getAt(rowIndex);
	alert("joseph----->" + rec.get('outletName'));
};

var hanViewContactDetails = function(grid, rowIndex, colIndex)
{
	var rec = storSearchOutlet.getAt(rowIndex);
	alert("joseph----->" + rec.get('outletName'));
};

var storSearchOutlet = new Ext.data.JsonStore(
{
	root: 'data.searchOutletResult', 
	//url: 'outletsearch',
	proxy : new Ext.data.MemoryProxy([]),
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
