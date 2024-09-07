var strOpportunityName = "";
var strDesignation = "";

var winOPBSViewOpportunityDetails;
var winOPBSViewOutletByOpportunityKeyword;
var winOPBSViewOpportunityKeywordDetails;
var winOPBSViewContactList;

var winOPBSAddopportunityToMyRemainder;
var winOPBSAddOpportunityToMyNote;

var hanOpportunitySearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/opportunities-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Opportunities Search Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmSearchOpportunities'))
	{
		tabCenter.setActiveTab('tabitmSearchOpportunities');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Search Opportunities',
		tabTip: 'Search Opportunities',
		id: 'tabitmSearchOpportunities',
		closable: true,
		iconCls: 'iconOpportunitySearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlSearchOpportunitiesCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlSearchOpportunities',
						layout: 'hbox',
						width: 600,
						border: false,
						layoutConfig:
						{
							pack: 'center',
							align: 'middle'
						},
						items:
						[
							{
								title: 'Search Opportunities',
								xtype: 'form',
								width: 350,
								height: 130,
								id: 'formSearchOpportunities',
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
										id: 'txtOpportunitiesSearchValue',
										fieldLabel: 'Opportunity',
										name : 'value',
										allowBlank: false, 
										width: 350,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanSearchOpportunitiesResult();
												}
											}
										}
									},
									
									{
										xtype: 'compositefield',
										fieldLabel: 'Deadline Date',
										defaults:
										{
											flex: 1
										},
										items:
										[
											{
												xtype: 'datefield',
												id: 'txtOpportunitiesSearchFromDate',
												fieldLabel: 'FromDate',
												name: 'fromDate',
												allowBlank: false,
												emptyText: 'mm/dd/yyyy',
												minLength: 10, 
												maxLength: 10,
												width: 108
											},
											{
												xtype: 'datefield',
												id: 'txtOpportunitiesSearchToDate',
												fieldLabel: 'ToDate',
												name: 'toDate',
												allowBlank: false,
												emptyText: 'mm/dd/yyyy',
												minLength: 10, 
												maxLength: 10,
												width: 108
											},
											
										]
									}
								],
								buttons:
								[
									{
										xtype: 'button',
										id: 'btnShowPreviousOPSSearch',
										icon: '../assets/e/prc/icons/previous-search-icon.gif',
										iconAlign: 'left',
										text:'Show Previous Search',
										width: 120,
										disabled: true,
										height: 25,
										formBind: true,
										handler:function()
										{
											Ext.getCmp('pnlSearchOpportunitiesCardLayout').layout.setActiveItem(1);  
										}
									},
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/search-icon.gif',
										iconAlign: 'left',
										text: 'Search Opportunity',
										width: 120,
										height: 25,
										formBind: true,
										handler: hanSearchOpportunitiesResult
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
												text: 'Back',
												height: 25,
												handler: hanOpportunitySearchBack
											},
											/*{
												xtype: 'button',
												icon: 'icons/icon.gif',
												iconAlign: 'left',
												text: 'Show all Result',
												height: 25,
												handler: hanSearchOpportunityKeywordBack
											},*/
											{
												xtype: 'button',
												icon: '../assets/e/prc/icons/back-icon.gif',
												iconAlign: 'left',
												text: 'Back',
												height: 25,
												handler: hanSearchOpportunityKeywordBack
											}
										]
									},
									{
										border: false,
										region: 'center',
										layout: 'fit',
										xtype: 'panel',
										id: 'pnlSearchOpportunitiesResult',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridSearchOpportunity',
												store: storSearchOpportunityKeyword,
												viewConfig:
												{
													forceFit:true
												},
												columns:
												[
													expOpportunityKeywordSearch,
													{
														header: "S. No",
														width: 10,
														sortable: true,
														dataIndex: 'sno'
													},
													{
														header: 'Opportunity',
														width: 20,
														sortable: true,
														dataIndex: 'opportunityValue'
													},
													{
														header: 'Publishing Date',
														width: 15,
														sortable: true,
														dataIndex: 'publishingDate'
													},
													{
														header: 'Doc Deadline Date',
														width: 30,
														sortable: true,
														dataIndex: 'docDeadlineDate'
													},
													{
														header: 'Ad Deadline Date',
														width: 30,
														sortable: true,
														dataIndex: 'adDeadlineDate'
													},
													{
										                xtype: 'actioncolumn',
										                width: 5,
										                sortable: false,
										                items: 
										                [
															{
																icon: '../assets/e/prc/icons/view-icon.gif',
																tooltip: 'View Opportunity Details'
															}
														]
										            }
												],
												plugins: expOpportunityKeywordSearch,
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
															if(columnIndex == 6)
															{
																var intarrLocation = new Array();
																intarrLocation[0] = event.getXY()[0] - 120;
																intarrLocation[1] = event.getXY()[1];
																conmnuOpportunityBasicSearch.showAt(intarrLocation);
															}
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanOPBSViewOpportunityDetails(grid, rowIndex);
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar({
													pageSize: 20,
													store: storSearchOpportunityKeyword,
													displayInfo: true,
													displayMsg: 'Displaying Opportunities {0} - {1} of {2}',
													emptyMsg: "No Opportunities to display, Check the Search Conditions"
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
	tabCenter.setActiveTab('tabitmSearchOpportunities');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Opportunities Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanSearchOpportunitiesResult = function(btn)
{
	//Check for Opportunities Value not blank.
	strOpportunitiesValue1 = Ext.getCmp('txtOpportunitiesSearchValue').getValue();
	strOpportunitiesFomDate = Ext.getCmp('txtOpportunitiesSearchFromDate').getValue();
	strOpportunitiesToDate = Ext.getCmp('txtOpportunitiesSearchToDate').getValue();
	
	if(strOpportunitiesValue1.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Opportunities Keyword',
			msg: "Opportunities keyword is empty Please give a valid keyword",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Opportunities', true);
	//Connect to backend and get the JSON object and load it to the table
	storSearchOpportunityKeyword.load({params: {opportunityValue: strOpportunitiesValue1, fromDate: strOpportunitiesFomDate, toDate: strOpportunitiesToDate}});
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Opportunities Search Result', true);
	
	Ext.getCmp('gridSearchOpportunity').setAutoScroll(true);
	
	//Now show the table card layout
	Ext.getCmp('pnlSearchOpportunitiesCardLayout').layout.setActiveItem(1);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Opportunities Search Loaded Successfully', true);
	//Ext.getCmp('btnShowPreviousSearch').enable();
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanOpportunitySearchBack = function(btn)
{
	Ext.getCmp('pnlSearchOpportunitiesCardLayout').layout.setActiveItem(0);	
}

var hanOPBSViewOpportunityDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOpportunity').getSelectionModel().getSelected();
	var strOpportunityId = rec.get('opportunityId');
	
	storViewOpportunityKeywordDetails.load({params: {opportunityId:strOpportunityId}});
	var strOpportunityValue = rec.get('opportunityValue');
	
	var strTitle = strOpportunityValue + " Details";
	
	if (!winOPBSViewOpportunityKeywordDetails)
	{
		winOPBSViewOpportunityKeywordDetails = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winOPBSViewOpportunityKeywordDetails',
			iconCls: 'iconPRC',
			width: 400,
			height: 300,
			constrain: true,
			autoScroll:true,
			items:
			[
			 	{
					xtype: 'dataview',
					autoScroll: true, 
			        store: storViewOpportunityKeywordDetails, 
			        tpl: xtplViewOpportunityKeywordDetails,
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
								id: 'btnAddToMyOpportunityKeyword',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Add to My OpportunityKeyword',
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
									winOPBSViewOpportunityKeywordDetails.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winOPBSViewOpportunityKeywordDetails.show();
}

var hanOPBSViewOutletForOpportunity = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOpportunity').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
	storOutletsByOpportunityKeyword.load({params: {opportunityId:strOpportunityKeywordId}});
	var strOpportunityKeywordName = rec.get('OpportunityName');
	
	var strTitle = "Outlet were you find " + strOpportunityKeywordName;
	
	if (!winOPBSViewOutletByOpportunityKeyword)
	{
		winOPBSViewOutletByOpportunityKeyword = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winOPBSViewOutletByOpportunityKeyword',
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
			        store: storOutletsByOpportunityKeyword, 
			        tpl: xtplOutletByOpportunityKeyword,
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
								id: 'btnAddToMyOpportunityKeyword',
								icon: 'icons/icon.gif',
								iconAlign: 'left',
								text:'Add to My OpportunityKeyword',
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
									winOPBSViewOutletByOpportunityKeyword.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winOPBSViewOutletByOpportunityKeyword.show();
}

var hanOPBSViewContactForOpportunity = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOpportunity').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
	storViewContactList.load({params: {opportunityId:strOpportunityKeywordId}});
	var strOpportunityKeywordName = rec.get('OpportunityName');
	
	var strTitle = strOpportunityKeywordName + "'s Contact Details";
	
	if (!winOPBSViewContactList)
	{
		winOPBSViewContactList = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winOPBSViewContactList',
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
									winOPBSViewContactList.hide();
								}
							}
						]
					}
			 	}
			]
		});
	}
	winOPBSViewContactList.show();
}

var hanOPBSAddToMyContact = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridSearchOpportunity').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
		
	Ext.getCmp('gridSearchOpportunity').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Add Oppotunity to My List', true);
	//Connect to backend and get the JSON object and load it to the table
	
	var conn = new Ext.data.Connection();
	conn.request(
	{
		url: 'myopportunityadd',
		method: 'POST',
		params: 
		{
			opportunityId: strOpportunityKeywordId
		},
		success: function(responseObject)
		{
			Ext.Msg.show(
			{
				title: 'Successful',
				msg: "Opportunity added to list successfully!",
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
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Opportunity Search Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Opportunity Search Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridSearchOpportunity').body.unmask();
}

var hanOPBSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOpportunity').getSelectionModel().getSelected();
	var strOpportunityValue = rec.get('opportunityValue');
	var strTitle = strOpportunityValue + " Reminder to Add";
	
	if (!winOPBSAddopportunityToMyRemainder)
	{
		winOPBSAddopportunityToMyRemainder = new Ext.Window(
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
	winOPBSAddopportunityToMyRemainder.items.itemAt(0).items.itemAt(0).setValue("Reminder for " + strOpportunityValue);
	winOPBSAddopportunityToMyRemainder.show();
}

var hanOPBSAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOpportunity').getSelectionModel().getSelected();
	var strOpportunityValue = rec.get('opportunityValue');
	var strTitle = strOpportunityValue + " Note to Add";
	
	if (!winOPBSAddOpportunityToMyNote)
	{
		winOPBSAddOpportunityToMyNote = new Ext.Window(
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
	winOPBSAddOpportunityToMyNote.items.itemAt(0).items.itemAt(0).setValue("Note about " + strOpportunityValue);
	winOPBSAddOpportunityToMyNote.show();
}

var hanOPBSAddToOutlook = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridSearchOpportunity').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
		
	Ext.getCmp('gridSearchOpportunity').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Add Opportunity to My List', true);
	//Connect to backend and get the JSON object and load it to the table
	
	var conn = new Ext.data.Connection();
	conn.request(
	{
		url: 'generateopportunityoutlookcalendar',
		method: 'POST',
		params: 
		{
			opportunityId: strOpportunityKeywordId
		},
		success: function(responseObject)
		{
			Ext.Msg.show(
			{
				title: 'Successful',
				msg: "Opportunity added to list successfully!",
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
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Opportunity Search Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Opportunity Search Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridSearchOpportunity').body.unmask();
}


var storSearchOpportunityKeyword = new Ext.data.JsonStore(
{
	root: 'data.searchOpportunityResult', 
	url: 'opportunitykeywordsearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'opportunityId'},{name: 'opportunityValue'},{name: 'opportunityDescription'},{name: 'publishingDate'},{name: 'docDeadlineDate'},{name: 'adDeadlineDate'}
	]
});

var storOutletsByOpportunityKeyword = new Ext.data.JsonStore(
{
    url: 'viewoutletforopportunity',
    root: 'data.viewoutletforopportunity',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
    ]
});

var storViewOpportunityKeywordDetails = new Ext.data.JsonStore(
{
    url: 'viewopportunitydetails',
    root: 'data.viewOpportunityDetails',
    fields: 
    [
     	'opportunityId', 'opportunityValue', 'opportunityDescription', 'publishingDate', 'docDeadlineDate', 'adDeadlineDate', 'contactEmail', 'lastModified'
    ]
});

var storViewContactList = new Ext.data.JsonStore(
{
    url: 'viewcontactlistforopportunity',
    root: 'data.viewcontactlistforopportunity',
    fields: 
    [
     	'contactId', 'contactFirstName', 'contactLastName', 'contactDescription', 'contactPhoto', 'designation', 'contactPhone', 'contactEmail', 'contactFacebook', 'contactLinkedin', 'contactTwitter', 'contactURL', 'lastModified'
    ]
});

var strData = new Ext.data.JsonStore(
{
    url: 'viewopportunitiesdetails/showOpportunitiesDetails',
    root: 'data.Opportunities',
    fields: 
    [
     	'OpportunitiesId', 'OpportunitiesValue', 'OpportunitiesFromDate', 'OpportunitiesToDate'
    ]
});

var hanViewOpportunitiesSearch = function(grid, rowIndex, colIndex)
{
	var rec = storSearchOpportunityKeyword.getAt(rowIndex);	
	var strOpportunitiesId = rec.get('opportunitiesId');
	strData.load({params: {oid:strOutletId}});
	var strOpportunitiesValue = rec.get('opportunitiesValue');
	
	var strTitle = strOpportunitiesValue+ " Details";
	
	if (!winViewReminderDetails)
	{
		winViewReminderDetails = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewReminderDetails',
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
									winViewOpportunitiesDetails.hide();
								}
							}
						]
					}
			 	}
			]
		});
	}
	winViewOpportunitiesDetails.show();
}

var xtplOutletByOpportunityKeyword = new Ext.XTemplate(
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

var xtplViewOpportunityKeywordDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{opportunityId}">',
    		'<div align="center" class="opportunity-heading">{opportunityValue}</div>',
    		'<div class="opportunity-details" align="left">',
        		'<div class="opportunity-field">Description </div><div class="opportunity-value">{opportunityDescription}</a></div><br />',
    			'<div class="opportunity-field">Publishing Date</div><div class="opportunity-value">{publishingDate}</a></div><br />',
    			'<div class="opportunity-field">Doc Deadline Date</div><div class="opportunity-value">{docDeadlineDate}</a></div><br />',
    			'<div class="opportunity-field">Ad Deadline Date</div><div class="opportunity-value">{adDeadlineDate}</a></div><br />',
    			
				'<tpl if="this.isValidEmail(contactEmail)">',
        			'<div class="opportunity-field">Email</div><div class="opportunity-value"><a target="blank" href="{contactEmail}">{contactEmail}</a></div><br />',
        		'</tpl>',
        		'<tpl if="!this.isValidEmail(contactEmail)">',
        			'<div class="opportunity-field">Email</div><div class="opportunity-not-found">NA</div><br />',
        		'</tpl>',
    			'<div class="opportunity-field">Last Modified</div><div class="opportunity-value">{lastModified}</a></div><br />',
    		'</div>',
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

var expOpportunityKeywordSearch = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{opportunityDescription}</p>'
	)
});


var conmnuOpportunityBasicSearch = new Ext.menu.Menu(
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
						text: 'Opportunity',
						tabTip: "View Opportunity Details",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOPBSViewOpportunityDetails
					},
					{
						text: 'Outlet',
						tabTip: "View Opportunity's Outlet Details",
						icon: '../assets/e/prc/icons/outlet-icon.gif',
						handler: hanOPBSViewOutletForOpportunity
					},
					{
						text: 'Contact',
						tabTip: "View Opportunity's Outlet Contact",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOPBSViewContactForOpportunity
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
						text: 'My Opportunity',
						tabTip: "Add to My Opportunity",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOPBSAddToMyContact
					},
					{
						text: 'Reminder',
						tabTip: "Add Opportunity to your Reminder",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOPBSAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Opportunity to your Notes",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOPBSAddToMyNote
					},
					{
						text: 'Outlook',
						tabTip: "Add Opportunity to your Outlook",
						icon: '../assets/e/prc/icons/outlook-icon.gif',
						handler: hanOPBSAddToOutlook
					}
				]
			}
		}
	]
});
