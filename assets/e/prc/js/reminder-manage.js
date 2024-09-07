var winViewReminderDetails;
var winModifyReminder;

var hanManageReminder = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/reminder-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Reminder Search Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmManageReminder'))
	{
		tabCenter.setActiveTab('tabitmManageReminder');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Manage Reminder',
		tabTip: 'Manage Reminder',
		id: 'tabitmManageReminder',
		closable: true,
		iconCls: 'iconReminderSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlManageReminderCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlSearchReminder',
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
								title: 'Search Reminder',
								xtype: 'form',
								width: 440,
								height: 190,
								id: 'formSearchReminder',
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
										id: 'txtReminderSearchSubject',
										fieldLabel: 'Subject',
										allowBlank: false, 
										width: 350,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanSearchReminderResult();
												}
											}
										}
									},
									{
										xtype: 'textarea',
										id: 'txtReminderSearchDetails',
										name: 'details',
										fieldLabel: 'Details'
									},
									{
										xtype: 'compositefield',
										fieldLabel: 'Date & Time',
										defaults:
										{
											flex: 1
										},
										items:
										[
											{
												xtype: 'datefield',
												id: 'txtReminderSearchDate',
												fieldLabel: 'Date',
												name: 'date',
												allowBlank: false,
												emptyText: 'Reminder date should not be empty!',
												minLength: 10, 
												maxLength: 10,
												width: 108
											},
											{
												xtype: 'timefield',
												id: 'txtReminderSearchFromTime',
												name: 'startTime'
											},
											{
												xtype: 'timefield',
												id: 'txtReminderSearchToTime',
												name: 'endTime'
											}
										]
									}
								],
								buttons:
								[
									{
										text: 'Reset',
										icon: '../assets/e/prc/icons/reset-icon.gif',
										iconAlign: 'left',
										height: 25,
										handler: function()
										{
											Ext.getCmp('formSearchReminder').getForm().reset();
										} 
									},
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/search-icon.gif',
										iconAlign: 'left',
										text: 'Search Reminder',
										height: 25,
										formBind: true,
										handler: hanSearchReminderResult
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
												icon: 'icons/icon.gif',
												iconAlign: 'left',
												text: 'Back',
												height: 25,
												handler: hanReminderSearchBack
											}
										]
									},
									{
										border: false,
										region: 'center',
										layout: 'fit',
										xtype: 'panel',
										id: 'pnlSearchReminderResult',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridSearchReminder',
												store: storReminderSearch,
												viewConfig:
												{
													forceFit:true
												},
												columns:
												[
													expManageReminder,
													{
														header: "S. No",
														width: 10,
														sortable: true,
														dataIndex: 'sno'
													},
													{
														header: 'Subject',
														width: 20,
														sortable: true,
														dataIndex: 'reminderSubject'
													},
													{
														header: 'Details',
														width: 65,
														sortable: true,
														dataIndex: 'reminderDetails'
													},
													{
														header: 'Date',
														width: 10,
														sortable: true,
														dataIndex: 'reminderDate'
													},
													{
														header: 'Start',
														width: 65,
														sortable: true,
														dataIndex: 'reminderStartTime'
													},
													{
														header: 'End',
														width: 65,
														sortable: true,
														dataIndex: 'reminderEndTime'
													},
													{
										                xtype: 'actioncolumn',
										                width: 5,
										                sortable: false,
										                items: 
										                [
															{
																icon: '../assets/e/prc/icons/view-icon.gif',
																tooltip: 'View Reminder Details'
															}
														]
										            }
												],
												plugins: expManageReminder,
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
																conmnuManageReminder.showAt(intarrLocation);
															}
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanViewReminder(grid, rowIndex);
														}
													},
													keydown:
													{
														fn: function(e)
														{
															if(e.getKey() == 46)
															{
																hanDeleteReminder();
															}
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar(
												{
													pageSize: 20,
													store: storReminderSearch,
													displayInfo: true,
													displayMsg: 'Displaying Reminder {0} - {1} of {2}',
													emptyMsg: "No Reminder to display, Check the Search Conditions"
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
	tabCenter.setActiveTab('tabitmManageReminder');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Reminder Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanSearchReminderResult = function(btn)
{
	//Check for Reminder Subject not blank.
	strReminderSubject = Ext.getCmp('txtReminderSearchSubject').getValue();
	strReminderDetails = Ext.getCmp('txtReminderSearchDetails').getValue();
	strReminderDate = Ext.getCmp('txtReminderSearchDate').getValue();
	strFromTime = Ext.getCmp('txtReminderSearchFromTime').getValue();
	strToTime = Ext.getCmp('txtReminderSearchToTime').getValue();
	
	if(strReminderSubject.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Reminder Keyword',
			msg: "Reminder keyword is empty Please give a valid keyword",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Reminders', true);
	//Connect to backend and get the JSON object and load it to the table
	storReminderSearch.load({params: {subject: strReminderSubject, details: strReminderDetails, date: strReminderDate, startTime: strFromTime, endTime: strToTime }});
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Reminder Search Result', true);
	
	Ext.getCmp('gridSearchReminder').setAutoScroll(true);
	
	//Now show the table card layout
	Ext.getCmp('pnlManageReminderCardLayout').layout.setActiveItem(1);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Reminder Search Loaded Successfully', true);
	//Ext.getCmp('btnShowPreviousSearch').enable();
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanReminderSearchBack = function(btn)
{
	Ext.getCmp('pnlManageReminderCardLayout').layout.setActiveItem(0);
}

var hanViewReminder = function(grid, rowIndex)
{
	var rec = Ext.getCmp('gridSearchReminder').getSelectionModel().getSelected();
	var strReminderId = rec.get('reminderId');
	storReminderDetails.load({params: {rid:strReminderId}});
	
	var strReminderSubjectToView = rec.get('reminderSubject');
	var strTitle = strReminderSubjectToView + " Reminder";
	
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
			height: 300,
			constrain: true,
			autoScroll:true,
			items:
			[
			 	{
					xtype: 'dataview',
					autoScroll: true, 
			        store: storReminderDetails, 
			        tpl: xtplViewReminderDetails,
			        autoHeight: false, 
			        multiSelect: true, 
			        itemSelector: 'div.thumb-wrap',
			        emptyText: 'No data to display',
			        loadingText: 'Loading Please Wait...',
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
									winViewReminderDetails.hide();
								}
							}
						]
					}
			 	}
			]
		});
	}
	winViewReminderDetails.show();
}

var hanModifyReminder = function(grid, rowIndex)
{
	var rec = Ext.getCmp('gridSearchReminder').getSelectionModel().getSelected();
	var strReminderId = rec.get('reminderId');
	
	if (!winModifyReminder)
	{
		winModifyReminder = new Ext.Window(
		{
			animateTarget: grid.el,
			title: 'Modify Reminder', 
			closeAction: 'hide',
			iconCls: 'iconPRC',
			width: 454,
			height: 272,
			constrain: true,
			autoScroll:true,
			items:
			[
				{
					xtype: 'formremindermodify'
				}
			]
		});
	}
	
	//Load the Store
	Ext.Ajax.request(
	{
		url: 'viewreminderdetails',
		method: 'POST',
		params: 
		{
			rid: strReminderId
		},
		success: function(responseObject)
		{
			var strReminderSubject = Ext.decode(responseObject.responseText).data.viewreminderdetails[0].reminderSubject;
			var strReminderDetails = Ext.decode(responseObject.responseText).data.viewreminderdetails[0].reminderDetails;
			var strReminderDate = Ext.decode(responseObject.responseText).data.viewreminderdetails[0].reminderDate;
			var strReminderStartTime = Ext.decode(responseObject.responseText).data.viewreminderdetails[0].reminderStartTime;
			var strReminderEndTime = Ext.decode(responseObject.responseText).data.viewreminderdetails[0].reminderEndTime;
			var strReminderEmailPublishing = Ext.decode(responseObject.responseText).data.viewreminderdetails[0].emailPublishing;
			var strReminderEmailAddress = Ext.decode(responseObject.responseText).data.viewreminderdetails[0].emailAddress;
			var strReminderTimeValue = Ext.decode(responseObject.responseText).data.viewreminderdetails[0].sendTimeValue;
			var strReminderTimeType = Ext.decode(responseObject.responseText).data.viewreminderdetails[0].sendTimeType;
			
			winModifyReminder.items.itemAt(0).strReminderIdToModify = strReminderId;
			
			winModifyReminder.items.itemAt(0).items.itemAt(0).setValue(strReminderSubject);
			winModifyReminder.items.itemAt(0).items.itemAt(1).setValue(strReminderDetails);
			winModifyReminder.items.itemAt(0).items.itemAt(2).items.itemAt(0).setValue(strReminderDate);
			winModifyReminder.items.itemAt(0).items.itemAt(2).items.itemAt(1).setValue("2:15 AM");
			winModifyReminder.items.itemAt(0).items.itemAt(2).items.itemAt(2).setValue(strReminderEndTime);
			
			if(strReminderEmailPublishing == "Y")
			{
				winModifyReminder.items.itemAt(0).items.itemAt(3).items.itemAt(0).setValue(true);
				winModifyReminder.items.itemAt(0).items.itemAt(3).items.itemAt(1).setValue(strReminderTimeValue);
				winModifyReminder.items.itemAt(0).items.itemAt(3).items.itemAt(2).setValue(strReminderTimeType);
				winModifyReminder.items.itemAt(0).items.itemAt(4).setValue(strReminderEmailAddress);
			}
			winModifyReminder.show();
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

var hanDeleteReminder = function(grid, rowIndex)
{
	var rec = Ext.getCmp('gridSearchReminder').getSelectionModel().getSelected();
	var strReminderId = rec.get('reminderId');
	
	Ext.Msg.show(
	{
		title: 'Server Error',
		msg: "Are you sure you want to delete the reminder",
		width: 300,
		buttons: Ext.MessageBox.YESNO,
		icon: Ext.MessageBox.QUESTION,
		fn: checkResult,
	});
	
	function checkResult(btnValue)
	{
        if(btnValue == "yes")
		{
			deletereminder();
		}
    };
	
	function deletereminder()
	{
		Ext.Ajax.request(
		{
			url: 'reminderdelete',
			method: 'POST',
			params: 
			{
				rid: strReminderId
			},
			success: function(responseObject)
			{
				Ext.Msg.show(
				{
					title: 'Successful',
					msg: "Reminder deleted successfully!",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
				
				storReminderSearch.remove(rec);
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

var storReminderSearch = new Ext.data.JsonStore(
{
	root: 'data.searchReminderResult', 
	url: 'remindersearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'reminderId'},{name: 'reminderSubject'},{name: 'reminderDetails'},{name: 'reminderDate'},{name: 'reminderStartTime'},{name: 'reminderEndTime'}
	]
});

var storReminderDetails = new Ext.data.JsonStore(
{
	url: 'viewreminderdetails',
	root: 'data.viewreminderdetails', 
	fields:
	[
		{name: 'reminderId'},{name: 'reminderSubject'},{name: 'reminderDetails'},{name: 'reminderDate'},{name: 'reminderStartTime'},{name: 'reminderEndTime'},{name: 'emailPublishing'},{name: 'emailAddress'},{name: 'sendTimeValue'},{name: 'sendTimeType'},{name: 'lastModified'}
	]
});

var xtplViewReminderDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{reminderId}">',
    		'<div class="outlet-details" align="left">',
    			'<div class="outlet-field">Subject</div><div class="outlet-value">{reminderSubject}</a></div><br />',
        		'<div class="outlet-field">Details</div><div class="outlet-value">{reminderDetails}</a></div><br />',
        		'<div class="outlet-field">Reminder Date</div><div class="outlet-value">{reminderDate}</a></div><br />',
        		'<div class="outlet-field">Start Time</div><div class="outlet-value">{reminderStartTime}</a></div><br />',
        		'<div class="outlet-field">End Time</div><div class="outlet-value">{reminderEndTime}</a></div><br />',
        		'<div class="outlet-field">Email Publishing</div><div class="outlet-value">{emailPublishing}</a></div><br />',
        		'<div class="outlet-field">Email Address</div><div class="outlet-value">{emailAddress}</a></div><br />',
        		'<div class="outlet-field">Email Time</div><div class="outlet-value">{sendTimeValue}</a></div><br />',
        		'<div class="outlet-field">Email Type</div><div class="outlet-value">{sendTimeType}</a></div><br />',
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

var expManageReminder = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{reminderDetails}</p>'
	)
});

var conmnuManageReminder = new Ext.menu.Menu(
{
	items:
	[
		{
			text: 'View Reminder',
			icon: '../assets/e/prc/icons/view-icon.gif',
			handler: hanViewReminder
		},
		'-',
		{
			text: 'Edit Reminder',
			icon: '../assets/e/prc/icons/view-icon.gif',
			handler: hanModifyReminder
		},
		'-',
		{
			text: 'Delete Reminder',
			icon: '../assets/e/prc/icons/view-icon.gif',
			handler: hanDeleteReminder
		}
	]
});
