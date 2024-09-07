Ext.namespace('prc.shortcuts.myoutlets');

var winViewOutletDetails;
var winViewOpportunityDetails;
var winViewContactList;
var winAddOutletToMyRemainder;
var winAddOutletToMyNote;

var strOutletName = "";
var strOutletType = "";

var hanMyOutlets = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/my-outlets.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening My Outlets', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	storMyOutlet.load({params: {myName:strOutletName, outletType:strOutletType}});
	
	if(Ext.getCmp('tabitmMyOutlet'))
	{
		tabCenter.setActiveTab('tabitmMyOutlet');
		return;
	}
		
	tabCenter.add(
	{
		title: 'My Outlets',
		tabTip: 'My Outlets',
		id: 'tabitmMyOutlet',
		closable: true,
		iconCls: 'iconMyOutlet',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				layout: 'fit',
				items:
				[
					new Ext.grid.GridPanel(
					{
						id: 'gridMyOutlet',
						store: storMyOutlet,
						viewConfig:
						{
							forceFit:true
						},
						tbar:
						[
							{
			            		text: 'Export Excel',
			            		handler : function()
			            		{
			            			Ext.Ajax.request(
									{
										url: 'myoutletsexcel',
										method: 'POST',
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
							expMYOOutletMy,
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
										tooltip: 'View My Outlet Details'
									}
								]
							}
						],
						plugins: expMYOOutletMy,
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
										conmnuOutletMy.showAt(intarrLocation);
									}
								}
							},
							rowdblclick:
							{
								fn: function(grid, rowIndex, e)
								{
									hanViewMyOutletDetails(grid, rowIndex);
								}
							}
						},
						stripeRows: true,
						loadMask: true,
						bbar: new Ext.PagingToolbar(
						{
							pageSize: commonConfig.OUTLET_ROW_COUNT,
							store: storMyOutlet,
							displayInfo: true,
							displayMsg: 'Displaying Outlets {0} - {1} of {2}',
							emptyMsg: "No Outlets to display, Change your My Conditions"
						})
					})
				]
			}
		]
	});
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Mying Outlets', true);
	//Connect to backend and get the JSON object and load it to the table
	
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet My Result', true);
	
	Ext.getCmp('gridMyOutlet').setAutoScroll(true);
	
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet My Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmMyOutlet');
	Ext.getCmp('pbarPRC').updateProgress(1, 'My Outlets Loaded successfully', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanMyOutletsBack = function(btn)
{
	Ext.getCmp('pnlMyOutletCardLayout').layout.setActiveItem(0);
}

var storMOViewOutletDetails = new Ext.data.JsonStore(
{
    url: 'viewoutletdetails/showOutletDetails',
    root: 'data.Outlet',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'county', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
    ]
});

var storMOViewOpportunityList = new Ext.data.JsonStore(
{
    url: 'viewopportunitylist',
    root: 'data.viewopportunitylist',
    fields: 
    [
     	'opportunityId', 'opportunityValue', 'opportunityDescription', 'publishingDate', 'docDeadlineDate', 'adDeadlineDate', 'contactEmail', 'lastModified'
    ]
});

var storMOViewContactList = new Ext.data.JsonStore(
{
    url: 'viewcontactlist',
    root: 'data.viewcontactlist',
    fields: 
    [
     	'contactId', 'contactFirstName', 'contactLastName', 'contactDescription', 'contactPhoto', 'designation', 'contactPhone', 'contactEmail', 'contactFacebook', 'contactLinkedin', 'contactTwitter', 'contactURL', 'lastModified'
    ]
});

var hanViewMyOutletDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyOutlet').getSelectionModel().getSelected();
	
	var strOutletId = rec.get('outletId');
	storMOViewOutletDetails.load({params: {oid:strOutletId}});
	var strOutletNameToView = rec.get('outletName');
	
	var strTitle = strOutletNameToView + " Details";
	
	showViewOutletDetailsWindow(strTitle, strOutletId, storMOViewOutletDetails);
}

var hanViewOSOpportunityList = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	storMOViewOpportunityList.load({params: {oid:strOutletId}});
	var strOutletNameToView = rec.get('outletName');
	var strTitle = strOutletNameToView + " Opportunities Details";
	
	showViewOpportunityListWindow(strTitle, strOutletId, storMOViewOpportunityList);
}

var hanOSViewContactList = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	storMOViewContactList.load({params: {oid:strOutletId}});
	var strOutletNameToView = rec.get('outletName');
	
	var strTitle = strOutletNameToView + " Contact Details";
	
	showViewContactListWindow(strTitle, strOutletId, storMOViewContactList);
}

var hanOSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyOutlet').getSelectionModel().getSelected();
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

var hanOSAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyOutlet').getSelectionModel().getSelected();
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
	winAddOutletToMyNote.show();
}

var storMyOutlet = new Ext.data.JsonStore(
{
	root: 'data.myOutletResult', 
	url: 'myoutlets',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'outletId'},{name: 'outletName'},{name: 'outletDescription'},{name: 'outletUrl'},{name: 'outletCirculation'},{name: 'outletFrequency'},{name: 'outletType'}
	]
},this);

var expMYOOutletMy = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{outletDescription}</p>'
	)
});


var hanOSAddComments = function(grid, rowIndex, colIndex)
{
	
}

var hanOSViewComments = function(grid, rowIndex, colIndex)
{
	
}

var conmnuOutletMy = new Ext.menu.Menu(
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
						handler: hanViewMyOutletDetails
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
		}
	]
});

var expMYOOutlet = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{outletDescription}</p>'
	)
});