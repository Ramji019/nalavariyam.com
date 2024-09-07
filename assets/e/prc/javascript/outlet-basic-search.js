Ext.namespace('prc.outlet.basicsearch');

var strOutletName = "";
var strOutletType = "";

var hanOutletSearch = function(btn)
{showViewOutletDetailsWindow
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/search-outlet.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Basic Search Outlets', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmSearchOutlet'))
	{
		tabCenter.setActiveTab('tabitmSearchOutlet');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Search Outlets',
		tabTip: 'Basic Search Outlets',
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
       							title: 'Basic Search Outlets',
								xtype: 'form',
								width: 400,
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
												tbar:
												[
													/*{
														xtype: 'button',
														icon: '../assets/e/prc/icons/save-icon.gif',
														iconAlign: 'left',
														text: 'Save Search',
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
													},
													'-',
													{
									            		text: 'Export Excel',
									            		handler : function()
									            		{
									            			var strOutletName = Ext.getCmp('txtOutletName').getValue();
															var strOutletType = "";
															
															if(Ext.getCmp('chkOSMagazine').checked)
															{
																strOutletType += "'MA',";
															}
															if(Ext.getCmp('chkOSNewsPaper').checked)
															{
																strOutletType += "'NP',";
															}
															if(Ext.getCmp('chkOSTelevision').checked)
															{
																strOutletType += "'TV',";
															}
															if(Ext.getCmp('chkOSRadio').checked)
															{
																strOutletType += "'RD',";
															}
															if(Ext.getCmp('chkOSWebsite').checked)
															{
																strOutletType += "'WS',";
															}
															if(Ext.getCmp('chkOSBlog').checked)
															{
																strOutletType += "'BL',";
															}
															if(Ext.getCmp('chkOSForum').checked)
															{
																strOutletType += "'FO',";
															}
															/*if(Ext.getCmp('chkOSCollegeNewspaper').checked)
															{
																strOutletType += "'CN',";
															}*/
									            			Ext.Ajax.request(
															{
																url: 'outletsearchexcel',
																method: 'POST',
																params: 
																{
																	searchName:strOutletName,
																	outletType:strOutletType
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
													expOUBSOutlet,
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
												plugins: expOUBSOutlet,
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
																conmnuOutletBasicSearch.showAt(intarrLocation);
															}
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanViewOSDetails(grid, rowIndex);
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar(
												{
													pageSize: commonConfig.OUTLET_ROW_COUNT,
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
	Ext.getCmp('pbarPRC').updateProgress(1, 'Basic Search Outlets Form Loaded', true);	
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
	Ext.Msg.progress("Searching...", "Searching Outlet please wait....", "Searching");
	strOutletType = "";
	
	if(Ext.getCmp('chkOSMagazine').checked)
	{
		strOutletType += "'MA',";
	}
	if(Ext.getCmp('chkOSNewsPaper').checked)
	{
		strOutletType += "'NP',";
	}
	if(Ext.getCmp('chkOSTelevision').checked)
	{
		strOutletType += "'TV',";
	}
	if(Ext.getCmp('chkOSRadio').checked)
	{
		strOutletType += "'RD',";
	}
	if(Ext.getCmp('chkOSWebsite').checked)
	{
		strOutletType += "'WS',";
	}
	if(Ext.getCmp('chkOSBlog').checked)
	{
		strOutletType += "'BL',";
	}
	if(Ext.getCmp('chkOSForum').checked)
	{
		strOutletType += "'FO',";
	}
	/*if(Ext.getCmp('chkOSCollegeNewspaper').checked)
	{
		strOutletType += "'CN',";
	}*/
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
	//Connect to backend and get the JSON object and load it to the table
	
	storSearchOutlet.on('beforeload', function(store)
	{
		storSearchOutlet.baseParams = {searchName:strOutletName, outletType:strOutletType};
	});
	
	// storSearchOutlet.load({params: {searchName:strOutletName, outletType:strOutletType}});
	
	storSearchOutlet.load({callback:function()
	{
		var intSearchResultCount = storSearchOutlet.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Basic Search Result', true);
			Ext.getCmp('gridSearchOutlet').setAutoScroll(true);
			//Now show the table card layout
			Ext.Msg.hide();
			Ext.getCmp('pnlSearchOutletCardLayout').layout.setActiveItem(1);
			Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Basic Search Loaded Successfully', true);
			Ext.getCmp('btnShowPreviousSearch').enable();
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
		else
		{
			Ext.Msg.hide();
			Ext.Msg.show(
			{
				title: 'No Data',
				msg: "No outlet found for your search criteria",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
	}});
	
	
	
}
var hanSearchOutletsBack = function(btn)
{
	Ext.getCmp('pnlSearchOutletCardLayout').layout.setActiveItem(0);
}

var storViewOutletSearchDetails = new Ext.data.JsonStore(
{
    url: 'viewoutletdetails/showOutletDetails',
    root: 'data.Outlet',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'county', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
    ]
});

var storOSViewOpportunityList = new Ext.data.JsonStore(
{
    url: 'viewopportunitylist',
    root: 'data.viewopportunitylist',
    fields: 
    [
     	'opportunityId', 'opportunityValue', 'opportunityDescription', 'publishingDate', 'docDeadlineDate', 'adDeadlineDate', 'contactEmail', 'lastModified'
    ]
});

var storOBSViewContactList = new Ext.data.JsonStore(
{
    url: 'viewcontactlist',
    root: 'data.viewcontactlist',
    fields: 
    [
     	'contactId', 'contactFirstName', 'contactLastName', 'contactDescription', 'contactPhoto', 'designation', 'contactPhone', 'contactEmail', 'contactFacebook', 'contactLinkedin', 'contactTwitter', 'contactURL', 'lastModified'
    ]
});

var hanViewOSDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	storViewOutletSearchDetails.load({params: {oid:strOutletId}});
	var strOutletNameToView = rec.get('outletName');
	
	var strTitle = strOutletNameToView + " Details";
	
	showViewOutletDetailsWindow(strTitle, strOutletId, storViewOutletSearchDetails);
}

var hanViewOSOpportunityList = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	// storOSViewOpportunityList.load({params: {oid:strOutletId}});
	
	storOSViewOpportunityList.on('beforeload', function(store)
	{
		storOSViewOpportunityList.baseParams = {oid:strOutletId};
	});
	
	storOSViewOpportunityList.load({callback:function()
	{
		var intCount = storOSViewOpportunityList.getCount();
		if(intCount > 0)
		{
			Ext.Msg.hide();
			var strOutletNameToView = rec.get('outletName');
			var strTitle = strOutletNameToView + " Opportunities Details";
			showViewOpportunityListWindow(strTitle, strOutletId, storOSViewOpportunityList);
		}
		else
		{
			Ext.Msg.hide();
			Ext.Msg.show(
			{
				title: 'No Data',
				msg: "No oportuntity found for this outlet",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
		}
	}});
}

var hanOSViewContactList = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	// storOBSViewContactList.load({params: {oid:strOutletId}});
	
	storOBSViewContactList.on('beforeload', function(store)
	{
		storOBSViewContactList.baseParams = {oid:strOutletId};
	});
	
	storOBSViewContactList.load({callback:function()
	{
		var intCount = storOBSViewContactList.getCount();
		if(intCount > 0)
		{
			Ext.Msg.hide();
			var strOutletNameToView = rec.get('outletName');
			var strTitle = strOutletNameToView + " Contact Details";
			showViewContactListWindow(strTitle, strOutletId, storOBSViewContactList);
		}
		else
		{
			Ext.Msg.hide();
			Ext.Msg.show(
			{
				title: 'No Data',
				msg: "No contacts found for this outlet",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
		}
	}});
}

var hanOSAddToMyOutlet = function(grid, rowIndex, colIndex)
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
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Basic Search Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Basic Search Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridSearchOutlet').body.unmask();
}

var hanOSAddToMyOutletFromWindow = function(strOutletId)
{
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
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Basic Search Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Basic Search Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridSearchOutlet').body.unmask();
}


var hanOSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
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
	winAddOutletToMyRemainder.setTitle(strTitle);
	winAddOutletToMyRemainder.show();
}

var hanOSAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOutlet').getSelectionModel().getSelected();
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
	winAddOutletToMyNote.items.itemAt(0).items.itemAt(0).setValue("Note about " + strOutletNameToView);
	winAddOutletToMyNote.setTitle(strTitle);
	winAddOutletToMyNote.show();
}

var storSearchOutlet = new Ext.data.JsonStore(
{
	root: 'data.searchOutletResult', 
	url: 'outletsearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'outletId'},{name: 'outletName'},{name: 'outletDescription'},{name: 'outletUrl'},{name: 'outletCirculation'},{name: 'outletFrequency'},{name: 'outletType'}
	]
},this);

var hanOSAddComments = function(grid, rowIndex, colIndex)
{
	
}

var hanOSViewComments = function(grid, rowIndex, colIndex)
{
	
}

var conmnuOutletBasicSearch = new Ext.menu.Menu(
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
						handler: hanViewOSDetails
					},
					{
						text: 'Opportunities',
						tabTip: "View All Opportunities",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanViewOSOpportunityList
					},
					{
						text: 'Contact',
						tabTip: "View All contact Details",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOSViewContactList
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
						handler: hanOSAddToMyOutlet
					},
					{
						text: 'Reminder',
						tabTip: "Add Outlet to your Reminder",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOSAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Outlet to your Notes",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOSAddToMyNote
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
						handler: hanOSAddComments
					},
					{
						text: 'View Comments',
						icon: '../assets/e/prc/icons/comment-view-icon.gif',
						tabTip: "View All comments",
						handler: hanOSViewComments
					}
				]
			}
		}*/
	]
});

var expOUBSOutlet = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{outletDescription}</p>'
	)
});