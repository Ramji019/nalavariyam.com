Ext.namespace('prc.opportunity.advancesearch');

var strOPASOpportunityName = "";
var winOPASAddopportunityToMyRemainder;
var winOPASAddOpportunityToMyNote;


var hanOpportunityAdvanceSearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/opportunity-advance-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Opportunity Advance Search ', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmOPASSearchOpportunity'))
	{
		tabCenter.setActiveTab('tabitmOPASSearchOpportunity');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Search OpportunityKeyword',
		tabTip: 'Search OpportunityKeyword',
		id: 'tabitmOPASSearchOpportunity',
		closable: true,
		iconCls: 'iconOpportunityKeywordSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlSearchOpportunityKeywordCardLayout',
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
							    title: 'Opportunity Keyword Search',
								xtype: 'form',
								width: 370,
								height: 100,
								id: 'pnlSearchOpportunityKeywordForm',
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
										fieldLabel: 'Search String', 
										id: 'txtOPASOpportunityName',
										name: 'opportunity_keyword_name',
										blankText: "Opportunity name is Required", 
										width: 250,
						                allowBlank: false,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanOPASResult();
												}
											}
										}
									}
								],
								buttons:
								[
									{
										xtype: 'button',
										id: 'btnShowPreviousOPPKSSearch',
										icon: '../assets/e/prc/icons/previous-search-icon.gif',
										iconAlign: 'left',
										text:'Show Previous Search',
										width: 120,
										disabled: true,
										height: 25,
										formBind: true,
										handler:function()
										{
											Ext.getCmp('pnlSearchOpportunityKeywordCardLayout').layout.setActiveItem(1);  
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
										handler: hanOPASResult
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
										region: 'center',
										layout: 'fit',
										xtype: 'panel',
										id: 'pnlSearchOuletResult',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridOPASOpportunityList',
												store: storSearchOpportunityKeyword,
												viewConfig:
												{
													forceFit:true
												},
												tbar:
												[
													/*{
														xtype: 'button',
														icon: '../assets/e/prc/icons/save-icon.gif',
														iconAlign: 'left',
														text: 'Save Search',
														height: 25,
														handler: conmnuOPASOpportunitySearch
													},*/
													{
														xtype: 'button',
														icon: '../assets/e/prc/icons/back-icon.gif',
														iconAlign: 'left',
														text: 'Back',
														height: 25,
														handler: conmnuOPASOpportunitySearch
													},
													'-',
													{
									            		text: 'Export Excel',
									            		height: 25,
									            		handler : function()
									            		{
									            			var strKeywordValue = Ext.getCmp('txtOutletKeywordSearch').getValue();
									            			Ext.Ajax.request(
															{
																url: 'outletkeywordsearchexcel',
																method: 'POST',
																params: 
																{
																	keywordValue: strKeywordValue
																},
																success: function(responseObject)
																{
																	var strReportFile = "../" + responseObject.responseText;
																
																	Ext.Msg.show(
																	{
																		title: 'Report Generated Successfully',
																		msg: "Are you sure you want to open the excel report?",
																		width: 300,
																		buttons: Ext.MessageBox.YESNO,
																		icon: Ext.MessageBox.QUESTION,
																		fn: extractExcelReport
																	});
																	
																	function extractExcelReport(btnValue)
																	{
																        if(btnValue == "yes")
																		{
																			var win = window.open(strReportFile, "mywindow", 'width=10,height=10');
																		}
																    };
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
														}
											       }
												],
												columns:
												[
													conmnuOPASOpportunitySearch,
													{
														header: "S. No",
														width: 10,
														sortable: true,
														dataIndex: 'sno'
													},
													{
														header: 'Opportunity',
														width: 55,
														sortable: true,
														dataIndex: 'opportunityValue'
													},
													{
														header: 'Publishing Date',
														width: 10,
														sortable: true,
														dataIndex: 'publishingDate'
													},
													{
														header: 'Doc Deadline Date',
														width: 12,
														sortable: true,
														dataIndex: 'docDeadlineDate'
													},
													{
														header: 'Ad Deadline Date',
														width: 10,
														sortable: true,
														dataIndex: 'adDeadlineDate'
													},
													{
										                xtype: 'actioncolumn',
										                width: 4,
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
												plugins: conmnuOPASOpportunitySearch,
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
																conmnuOpportunityKeywordSearch.showAt(intarrLocation);
															}
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanOPASViewOpportunityDetails(grid, rowIndex);
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar({
													pageSize: 50,
													store: storSearchOpportunityKeyword,
													displayInfo: true,
													displayMsg: 'Displaying Opportunities {0} - {1} of {2}',
													emptyMsg: "No Opportunities to display, Change your Search Conditions"
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
	tabCenter.setActiveTab('tabitmOPASSearchOpportunity');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Opportunities Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanOPASResult = function(btn)
{
	//Check for Opportunity Name not blank.
	strOPASOpportunityName = Ext.getCmp('txtOPASOpportunityName').getValue();
	
	if(strOPASOpportunityName.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank opportunity Name',
			msg: "Opportunity Keyword Empty Please enter the Opportunity Keyword",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	Ext.Msg.progress("Searching...", "Searching opportunity please wait....", "Searching");
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Opportunities', true);
	//Connect to backend and get the JSON object and load it to the table
	
	storSearchOpportunityKeyword.on('beforeload', function(store)
	{
		storSearchOpportunityKeyword.baseParams = {opportunityValue:strOPASOpportunityName};
	});
	
	// storSearchOpportunityKeyword.load({params: {opportunityValue:strOPASOpportunityName}});
	
	storSearchOpportunityKeyword.load({callback:function()
	{
		var intSearchResultCount = storSearchOpportunityKeyword.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Opportunity Search Result', true);
			Ext.getCmp('gridOPASOpportunityList').setAutoScroll(true);
			//Now show the table card layout
			Ext.Msg.hide();
			Ext.getCmp('pnlSearchOpportunityKeywordCardLayout').layout.setActiveItem(1);
			Ext.getCmp('pbarPRC').updateProgress(1.0, 'Opportunity Search Loaded Successfully', true);
			Ext.getCmp('btnShowPreviousOPPKSSearch').enable();
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
		else
		{
			Ext.Msg.hide();
			Ext.Msg.show(
			{
				title: 'No Data',
				msg: "No opportunity found for your search criteria",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
	}});
}

var conmnuOPASOpportunitySearch = function(btn)
{
	Ext.getCmp('pnlSearchOpportunityKeywordCardLayout').layout.setActiveItem(0);
}

var hanOPASViewOpportunityDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOPASOpportunityList').getSelectionModel().getSelected();
	var strOpportunityId = rec.get('opportunityId');
	
	storViewOpportunityKeywordDetails.load({params: {opportunityId:strOpportunityId}});
	var strOpportunityValue = rec.get('opportunityValue');
	
	var strTitle = strOpportunityValue + " Details";
	
	showViewOpportunityDetailsWindow(strTitle, strOpportunityId, storViewOpportunityKeywordDetails);
}

var hanOPASViewOutletForOpportunity = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOPASOpportunityList').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
	storOutletsByOpportunityKeyword.load({params: {opportunityId:strOpportunityKeywordId}});
	var strOpportunityKeywordName = rec.get('opportunityValue')

	var strOutletId = rec.get('outletId');
	
	var strTitle = "Outlet were you find " + strOpportunityKeywordName;
	
	showViewOutletDetailsWindow(strTitle, strOutletId, storOutletsByOpportunityKeyword);
}

var hanOPASViewContactForOpportunity = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOPASOpportunityList').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
	storOPASViewContactList.load({params: {opportunityId:strOpportunityKeywordId}});
	var strOpportunityKeywordName = rec.get('opportunityValue');
	
	var strTitle = strOpportunityKeywordName + "'s Contact Details";
	
	showViewContactListWindow(strTitle, null, storOPASViewContactList);
}

var hanOPASAddToMyOpportunity = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridOPASOpportunityList').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
		
	Ext.getCmp('gridOPASOpportunityList').body.mask();
	
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
	Ext.getCmp('gridOPASOpportunityList').body.unmask();
}

var hanOPASAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOPASOpportunityList').getSelectionModel().getSelected();
	var strOpportunityValue = rec.get('opportunityValue');
	var strTitle = strOpportunityValue + " Reminder to Add";
	
	if (!winOPASAddopportunityToMyRemainder)
	{
		winOPASAddopportunityToMyRemainder = new Ext.Window(
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
	winOPASAddopportunityToMyRemainder.items.itemAt(0).items.itemAt(0).setValue("Reminder for " + strOpportunityValue);
	winOPASAddopportunityToMyRemainder.setTitle(strTitle);
	winOPASAddopportunityToMyRemainder.show();
}

var hanOPASAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOPASOpportunityList').getSelectionModel().getSelected();
	var strOpportunityValue = rec.get('opportunityValue');
	var strTitle = strOpportunityValue + " Note to Add";
	
	if (!winOPASAddOpportunityToMyNote)
	{
		winOPASAddOpportunityToMyNote = new Ext.Window(
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
	winOPASAddOpportunityToMyNote.items.itemAt(0).items.itemAt(0).setValue("Note about " + strOpportunityValue);
	winOPASAddOpportunityToMyNote.setTitle(strTitle);
	winOPASAddOpportunityToMyNote.show();
}

var hanOPASAddToOutlook = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridOPASOpportunityList').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
		
	Ext.getCmp('gridOPASOpportunityList').body.mask();
	
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
	Ext.getCmp('gridOPASOpportunityList').body.unmask();
}

var storSearchOpportunityKeyword = new Ext.data.JsonStore(
{
	root: 'data.searchOpportunityResult', 
	url: 'opportunitykeywordsearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'outletId'},{name: 'sno'},{name: 'opportunityId'},{name: 'opportunityValue'},{name: 'opportunityDescription'},{name: 'publishingDate'},{name: 'docDeadlineDate'},{name: 'adDeadlineDate'}
	]
});

var storOutletsByOpportunityKeyword = new Ext.data.JsonStore(
{
    url: 'viewoutletforopportunity',
    root: 'data.viewoutletforopportunity',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'county', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
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

var storOPASViewContactList = new Ext.data.JsonStore(
{
    url: 'viewcontactlistforopportunity',
    root: 'data.viewcontactlistforopportunity',
    fields: 
    [
     	'contactId', 'contactFirstName', 'contactLastName', 'contactDescription', 'contactPhoto', 'designation', 'contactPhone', 'contactEmail', 'contactFacebook', 'contactLinkedin', 'contactTwitter', 'contactURL', 'lastModified'
    ]
});





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

var conmnuOPASOpportunitySearch = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{opportunityDescription}</p>'
	)
});

var conmnuOpportunityKeywordSearch = new Ext.menu.Menu(
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
						handler: hanOPASViewOpportunityDetails
					},
					{
						text: 'Outlet',
						tabTip: "View Opportunity's Outlet Details",
						icon: '../assets/e/prc/icons/outlet-icon.gif',
						handler: hanOPASViewOutletForOpportunity
					},
					{
						text: 'Contact',
						tabTip: "View Opportunity's Outlet Contact",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOPASViewContactForOpportunity
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
						handler: hanOPASAddToMyOpportunity
					},
					{
						text: 'Reminder',
						tabTip: "Add Opportunity to your Reminder",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOPASAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Opportunity to your Notes",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOPASAddToMyNote
					}/*,
					{
						text: 'Outlook',
						tabTip: "Add Opportunity to your Outlook",
						icon: '../assets/e/prc/icons/outlook-icon.gif',
						handler: hanOPASAddToOutlook
					}*/
				]
			}
		}
	]
});
