Ext.namespace('prc.contact.basicsearch');

var strContactName = "";
var strDesignation = "";
var winCBSAddContactToMyRemainder;
var winCBSAddContactToMyNote;

var hanContactSearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/contact-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Search Contacts', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmSearchContacts'))
	{
		tabCenter.setActiveTab('tabitmSearchContacts');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Search Contacts',
		tabTip: 'Search Contacts',
		id: 'tabitmSearchContacts',
		closable: true,
		iconCls: 'iconContactSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlSearchContactCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlBASFormPanel',
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
								title: 'Contact Search',
								xtype: 'form',
								width: 370,
								height: 125,
								id: 'pnlSearchContactsForm',
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
										fieldLabel: 'Name', 
										id: 'txtContactName',
										name: 'Contact_name',
										blankText: "Contact name is Required", 
										anchor: '-4',
						                allowBlank: false,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanSearchContactsResult();
												}
											}
										}
									},
									{
										xtype: 'combo',
										id: 'cmbDesignation',
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
											Ext.getCmp('pnlSearchContactCardLayout').layout.setActiveItem(1);  
										}
									},
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/search-icon.gif',
										iconAlign: 'left',
										text: 'Search Contacts',
										width: 120,
										height: 25,
										formBind: true,
										handler: hanSearchContactsResult
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
												handler: hanSearchContactsBack
											},*/
											{
												xtype: 'button',
												icon: '../assets/e/prc/icons/back-icon.gif',
												iconAlign: 'left',
												text: 'Back',
												height: 25,
												handler: hanSearchContactsBack
											}
										]
									},
									{
										border: false,
										region: 'center',
										layout: 'fit',
										xtype: 'panel',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridSearchContact',
												store: storSearchContact,
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
													expContactSearch,
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
												plugins: expContactSearch,
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
																conmnuContactSearch.showAt(intarrLocation);
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
													pageSize: commonConfig.CONTACT_ROW_COUNT,
													store: storSearchContact,
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
	tabCenter.setActiveTab('tabitmSearchContacts');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Contacts Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanSearchContactsResult = function(btn)
{
	//Check for Contact Name not blank.
	strContactName = Ext.getCmp('txtContactName').getValue();
	strDesignation = Ext.getCmp('cmbDesignation').getValue();
	
	if(strContactName.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Contact Name',
			msg: "Contact Name Empty Please enter the Contact name",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	Ext.Msg.progress("Searching...", "Searching contact please wait....", "Searching");
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Contacts', true);
	//Connect to backend and get the JSON object and load it to the table
	
	storSearchContact.on('beforeload', function(store)
	{
		storSearchContact.baseParams = {searchName:strContactName, designation:strDesignation};
	});
	
	storSearchContact.load({callback:function()
	{
		var intSearchResultCount = storSearchContact.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Contact Search Result', true);
			Ext.getCmp('gridSearchContact').setAutoScroll(true);
			//Now show the table card layout
			Ext.getCmp('btnShowPreviousSearch').enable();
			Ext.Msg.hide();
			Ext.getCmp('pnlSearchContactCardLayout').layout.setActiveItem(1);
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

var hanSearchContactsBack = function(btn)
{
	Ext.getCmp('pnlSearchContactCardLayout').layout.setActiveItem(0);
}

var hanCBSViewOutletDetailsByContact = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContact').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storCBSViewOutletDetails.load({params: {contactId:strContactId}});
	var strContactName = rec.get('contactFirstName');
	
	var strTitle = "List of Outlets were " + strContactName + " is working";
	
	var strOutletId = rec.get('outletId');
	showViewOutletDetailsWindow(strTitle, strOutletId, storCBSViewOutletDetails);
}

var hanCBSViewContactDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContact').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewContactDetails.load({params: {contactId:strContactId}});
	var strContactName = rec.get('contactFirstName');
	
	var strTitle = strContactName + " Details";
	showViewContactDetailsWindow(strTitle, strContactId, storViewContactDetails);
}

var hanCBSViewOpportunieyByContact = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContact').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewOpportunityList.load({params: {cid:strContactId}});
	var strContactFirstName = rec.get('contactFirstName');
	var strContactLastName = rec.get('contactLastName');
	var strTitle = strContactFirstName + " " + strContactLastName + " Opportunities Details";
	showViewOpportunityListWindow(strTitle, null, storViewOpportunityList);
};

var storSearchContact = new Ext.data.JsonStore(
{
	root: 'data.searchContactResult', 
	url: 'contactsearch',
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

var storCBSViewOutletDetails = new Ext.data.JsonStore(
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

var expContactSearch = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{contactDescription}</p>'
	)
});


var hanCBSAddToMyContact = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridSearchContact').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
		
	Ext.getCmp('gridSearchContact').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Add Outlet to My List', true);
	//Connect to backend and get the JSON object and load it to the table
	
	Ext.Ajax.request(
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
	Ext.getCmp('gridSearchContact').body.unmask();
}

var hanCBSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContact').getSelectionModel().getSelected();
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
	winCBSAddContactToMyRemainder.setTitle(strTitle);
	winCBSAddContactToMyRemainder.show();
}

var hanCBSAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchContact').getSelectionModel().getSelected();
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
	winCBSAddContactToMyNote.setTitle(strTitle);
	winCBSAddContactToMyNote.show();
}

var hanCBSAddComments = function(grid, rowIndex, colIndex)
{
	
}

var hanCBSViewComments = function(grid, rowIndex, colIndex)
{
	
}

var conmnuContactSearch = new Ext.menu.Menu(
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
						text: 'My Contact',
						tabTip: "Add to My Contact",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanCBSAddToMyContact
					},
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
		}*/
	]
});
