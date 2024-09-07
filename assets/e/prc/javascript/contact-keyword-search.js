Ext.namespace('prc.contact.keywordsearch');

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
						id: 'pnlKASFormPanel',
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
								width: 400,
								height: 100,
								id: 'pnlSearchContactKeywordForm',
								labelWidth: 105,
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
										width: 270,
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
											/*{
												xtype: 'button',
												icon: '../assets/e/prc/icons/save-icon.gif',
												iconAlign: 'left',
												text: 'Save Search',
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
										id: 'pnlKASFormPanelResult',
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
												tbar:
												[
													/*{
														xtype: 'button',
														icon: '../assets/e/prc/icons/save-icon.gif',
														iconAlign: 'left',
														text: 'Save Search',
														height: 25,
														handler: hanOutletKeywordSearchBack
													},*/
													{
														xtype: 'button',
														icon: '../assets/e/prc/icons/back-icon.gif',
														iconAlign: 'left',
														text: 'Back',
														height: 25,
														handler: hanOutletKeywordSearchBack
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
													pageSize: commonConfig.CONTACT_ROW_COUNT,
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
	
	Ext.Msg.progress("Searching...", "Searching contact please wait....", "Searching");
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Contacts', true);
	//Connect to backend and get the JSON object and load it to the table
	
	storSearchContactKeyword.on('beforeload', function(store)
	{
		storSearchContactKeyword.baseParams = {searchName:strContactName};
	});
	
	// storSearchContactKeyword.load({params: {searchName:strContactName}});
	storSearchContactKeyword.load({callback:function()
	{
		var intSearchResultCount = storSearchContactKeyword.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Contact Search Result', true);
			Ext.getCmp('gridSearchContactKeyword').setAutoScroll(true);
			Ext.Msg.hide();
			Ext.getCmp('pnlSearchContactKeywordCardLayout').layout.setActiveItem(1);
			Ext.getCmp('pbarPRC').updateProgress(1.0, 'Contact Search Loaded Successfully', true);
			Ext.getCmp('btnShowPreviousSearch').enable();
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
		else
		{
			Ext.Msg.hide();
			Ext.Msg.show(
			{
				title: 'No Data',
				msg: "No contact found for your search criteria",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
	}});
}

var hanSearchContactKeywordBack = function(btn)
{
	Ext.getCmp('pnlSearchContactKeywordCardLayout').layout.setActiveItem(0);
}

var hanViewContactKeywordDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactKeyword').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewContactDetails.load({params: {contactId:strContactId}});
	var strContactName = rec.get('contactFirstName');
	
	var strTitle = strContactName + " Details";
	showViewContactDetailsWindow(strTitle, strContactId, storViewContactDetails);
}

var hanViewOutletDetailsByContactKeyword = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactKeyword').getSelectionModel().getSelected();
	var strContactKeywordId = rec.get('contactId');
	storCKSViewOutletDetails.load({params: {contactId:strContactKeywordId}});
	var strContactKeywordName = rec.get('contactFirstName');
	var strTitle = "List of Outlets were" + strContactKeywordName + " is working";
	
	var strOutletId = rec.get('outletId');
	showViewOutletDetailsWindow(strTitle, strOutletId, storCKSViewOutletDetails);
}

var hanCKSViewOpportunieyByContact = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactKeyword').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewOpportunityList.load({params: {cid:strContactId}});
	var strContactFirstName = rec.get('contactFirstName');
	var strContactLastName = rec.get('contactLastName');
	var strTitle = strContactFirstName + " " + strContactLastName + " Opportunities Details";
	
	showViewOpportunityListWindow(strTitle, null, storViewOpportunityList);
};

var storSearchContactKeyword = new Ext.data.JsonStore(
{
	root: 'data.searchContactResult', 
	url: 'contactkeywordsearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'outletId'},{name: 'sno'},{name: 'contactId'},{name: 'contactFirstName'},{name: 'contactLastName'},{name: 'contactDesignation'},{name: 'contactDescription'}
	],
	baseParams: 
	{
        searchName: strContactName, 
		designation: strDesignation
    }
});

var storCKSViewOutletDetails = new Ext.data.JsonStore(
{
    url: 'viewoutletdetailsbycontact',
    root: 'data.OutletByContact',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'county', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
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
	winCKSAddContactToMyRemainder.setTitle(strTitle);
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
	winCKSAddContactToMyNote.setTitle(strTitle);
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
		}
		/*,
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
		}*/
	]
});
