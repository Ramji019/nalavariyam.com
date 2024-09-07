Ext.namespace('prc.contact.advancesearch');

var strContactName = "";
var strDesignation = "";
var strOutletName = "";
var winViewContactAdvanceSearchDetails;
var winCASViewOpportunityLisForContact;

var winCASAddContactToMyRemainder;
var winCASAddContactToMyNote;

var hanContactAdvanceSearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/contact-advance-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening ContactAdvanceSearch', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmSearchContactAdvanceSearch'))
	{
		tabCenter.setActiveTab('tabitmSearchContactAdvanceSearch');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Search ContactAdvanceSearch',
		tabTip: 'Search ContactAdvanceSearch',
		id: 'tabitmSearchContactAdvanceSearch',
		closable: true,
		iconCls: 'iconContactAdvanceSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlSearchContactAdvanceSearchCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlCASFormPanel',
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
								title: 'Contact Advance Search',
								xtype: 'form',
								width: 370,
								height: 155,
								id: 'pnlSearchContactAdvanceSearchForm',
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
										fieldLabel: 'Name', 
										id: 'txtASContactName',
										name: 'contact_name',
										anchor: '-4',
										blankText: "Contact name is Required", 
										width: 200,
						                allowBlank: false,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanContactAdvanceSearchResult();
												}
											}
										}
									},
									{
										xtype: 'combo',
										id: 'cmbASContactType',
										fieldLabel: 'Designation',
										anchor: '-4',
									    store: storContactDesignation,
									    displayField: 'name',
									    valueField:'id',
									    typeAhead: true,
									    mode: 'local',
									    forceSelection: true,
									    triggerAction: 'all',
									    emptyText: 'Select a designation...',
									    selectOnFocus: true
									},
									{
										xtype: 'textfield',
										anchor: '-4',
										fieldLabel: 'Outlet Name', 
										id: 'txtASOutletName',
										name: 'contact_outlet_name',
										width: 200,
						                allowBlank: false,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanContactAdvanceSearchResult();
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
											Ext.getCmp('pnlSearchContactAdvanceSearchCardLayout').layout.setActiveItem(1);  
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
										handler: hanContactAdvanceSearchResult
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
												handler: hanSearchContactAdvanceSearchBack
											},*/
											{
												xtype: 'button',
												icon: '../assets/e/prc/icons/back-icon.gif',
												iconAlign: 'left',
												text: 'Back',
												height: 25,
												handler: hanSearchContactAdvanceSearchBack
											}
										]
									},
									{
										border: false,
										region: 'center',
										layout: 'fit',
										xtype: 'panel',
										id: 'pnlCASFormPanelResult',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridSearchContactAdvanceSearch',
												store: storSearchContactAdvanceSearch,
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
													expContactAdvanceSearch,
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
																tooltip: 'View Outlet Details'
															}
														]
										            }
												],
												plugins: expContactAdvanceSearch,
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
																conmnuContactAdvanceSearch.showAt(intarrLocation);
															}
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanViewOutletDetailsByContactAdvanceSearch(grid, rowIndex);
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar({
													pageSize: commonConfig.CONTACT_ROW_COUNT,
													store: storSearchContactAdvanceSearch,
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
	tabCenter.setActiveTab('tabitmSearchContactAdvanceSearch');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Contacts Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanContactAdvanceSearchResult = function(btn)
{
	//Check for Contact Name not blank.
	strContactName = Ext.getCmp('txtASContactName').getValue();
	strDesignation = Ext.getCmp('cmbASContactType').getValue();
	strOutletName = Ext.getCmp('txtASOutletName').getValue();
	
	if(strContactName.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Contact Name',
			msg: "Contact AdvanceSearch Empty Please enter the Contact AdvanceSearch",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	Ext.Msg.progress("Searching...", "Searching contact please wait....", "Searching");
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Contacts', true);
	//Connect to backend and get the JSON object and load it to the table
	storSearchContactAdvanceSearch.on('beforeload', function(store)
	{
		storSearchContactAdvanceSearch.baseParams = {searchName:strContactName, designation:strDesignation, contactOutlet:strOutletName};
	});
	
	// storSearchContactAdvanceSearch.load({params: {searchName:strContactName, designation:strDesignation, contactOutlet:strOutletName}});
	
	storSearchContactAdvanceSearch.load({callback:function()
	{
		var intSearchResultCount = storSearchContactAdvanceSearch.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Contact Search Result', true);
			Ext.getCmp('gridSearchContactAdvanceSearch').setAutoScroll(true);
			//Now show the table card layout
			Ext.Msg.hide();
			Ext.getCmp('pnlSearchContactAdvanceSearchCardLayout').layout.setActiveItem(1);
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


var hanSearchContactAdvanceSearchBack = function(btn)
{
	Ext.getCmp('pnlSearchContactAdvanceSearchCardLayout').layout.setActiveItem(0);
}

var hanViewOutletDetailsByContactAdvanceSearch = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactAdvanceSearch').getSelectionModel().getSelected();
	var strContactAdvanceSearchId = rec.get('contactId');
	storCASViewOutletDetails.load({params: {contactId:strContactAdvanceSearchId}});
	var strContactAdvanceSearchName = rec.get('contactFirstName');
	
	var strTitle = "Outlet were " + strContactAdvanceSearchName + " is working";
	
	var strOutletId = rec.get('outletId');
	showViewOutletDetailsWindow(strTitle, strOutletId, storCASViewOutletDetails);
}

var hanViewContactAdvanceSearchDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactAdvanceSearch').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewContactDetails.load({params: {contactId:strContactId}});
	var strContactName = rec.get('contactFirstName');
	
	var strTitle = strContactName + " Details";
	
	showViewContactDetailsWindow(strTitle, strContactId, storViewContactDetails);
	
}

var hanCASViewOpportunieyByContact = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactAdvanceSearch').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewOpportunityList.load({params: {cid:strContactId}});
	var strContactFirstName = rec.get('contactFirstName');
	var strContactLastName = rec.get('contactLastName');
	var strTitle = strContactFirstName + " " + strContactLastName + " Opportunities Details";
	showViewOpportunityListWindow(strTitle, null, storViewOpportunityList);
};

var storSearchContactAdvanceSearch = new Ext.data.JsonStore(
{
	root: 'data.searchContactASResult', 
	url: 'contactadvancesearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'outletId'},{name: 'sno'},{name: 'contactId'},{name: 'contactFirstName'},{name: 'contactLastName'},{name: 'contactDesignation'},{name: 'contactDescription'}
	],
	baseParams: 
	{
        searchName: strContactName, 
		designation: strDesignation,
		contactOutlet: strOutletName
    }
});

var storCASViewOutletDetails = new Ext.data.JsonStore(
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

var expContactAdvanceSearch = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{outletDescription}</p>'
	)
});

var hanCASAddToMyContact = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridSearchContactAdvanceSearch').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
		
	Ext.getCmp('gridSearchContactAdvanceSearch').body.mask();
	
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
	Ext.getCmp('gridSearchContactAdvanceSearch').body.unmask();
}

var hanCASAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactAdvanceSearch').getSelectionModel().getSelected();
	var strContactNameToAdd = rec.get('contactFirstName');
	var strTitle = strContactNameToAdd + " reminder to Add";
	
	if (!winCASAddContactToMyRemainder)
	{
		winCASAddContactToMyRemainder = new Ext.Window(
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
	winCASAddContactToMyRemainder.items.itemAt(0).items.itemAt(0).setValue("Reminder for " + strContactNameToAdd);
	winCASAddContactToMyRemainder.setTitle(strTitle);
	winCASAddContactToMyRemainder.show();
}

var hanCASAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContactAdvanceSearch').getSelectionModel().getSelected();
	var strContactNameToAdd = rec.get('contactFirstName');
	var strTitle = strContactNameToAdd + " Note to Add";
	
	if (!winCASAddContactToMyNote)
	{
		winCASAddContactToMyNote = new Ext.Window(
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
	winCASAddContactToMyNote.items.itemAt(0).items.itemAt(0).setValue("Note about " + strContactNameToAdd);
	winCASAddContactToMyNote.setTitle(strTitle);
	winCASAddContactToMyNote.show();
}

var hanCASAddComments = function(grid, rowIndex, colIndex)
{
	
}

var hanCASViewComments = function(grid, rowIndex, colIndex)
{
	
}

var conmnuContactAdvanceSearch = new Ext.menu.Menu(
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
						handler: hanViewContactAdvanceSearchDetails
					},
					{
						text: 'Outlet',
						tabTip: "View Outlet Details",
						icon: '../assets/e/prc/icons/outlet-icon.gif',
						handler: hanViewOutletDetailsByContactAdvanceSearch
					},
					{
						text: 'Opportunities',
						tabTip: "View All Opportunities",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanCASViewOpportunieyByContact
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
						handler: hanCASAddToMyContact
					},
					{
						text: 'Reminder',
						tabTip: "Add Contact to your Reminder",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanCASAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Contact to your Notes",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanCASAddToMyNote
					}
				]
			}
		}/*,
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
						handler: hanCASAddComments
					},
					{
						text: 'View Comments',
						icon: '../assets/e/prc/icons/comment-view-icon.gif',
						tabTip: "View All comments",
						handler: hanCASViewComments
					}
				]
			}
		}*/
	]
});
