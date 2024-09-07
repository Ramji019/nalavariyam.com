var winViewAppointmentDetails;

var hanManageAppointments = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/appointment-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Appointment Manage Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmSearchAppointment'))
	{
		tabCenter.setActiveTab('tabitmSearchAppointment');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Manage Appointment',
		tabTip: 'Manage Appointment',
		id: 'tabitmSearchAppointment',
		closable: true,
		iconCls: 'iconAppointmentSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlSearchAppointmentCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlSearchAppointment',
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
								title: 'Search Appointment',
								xtype: 'form',
								width: 440,
								height: 190,
								id: 'formSearchAppointment',
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
										id: 'txtAppointmentSearchSubject',
										name: 'subject',
										fieldLabel: 'Subject',
										allowBlank: false, 
										width: 350,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanSearchAppointment();
												}
											}
										}
									},
									{
										xtype: 'textarea',
										id: 'txtAppointmentSearchDetails',
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
												id: 'txtAppointmentSearchDate',
												fieldLabel: 'Date',
												name: 'date',
												allowBlank: false,
												emptyText: 'Appointment date should not be empty!',
												minLength: 10, 
												maxLength: 10,
												width: 108
											},
											{
												xtype: 'timefield',
												id: 'txtAppointmentSearchFromTime',
												name: 'startTime'
											},
											{
												xtype: 'timefield',
												id: 'txtAppointmentSearchToTime',
												name: 'endTime'
											}
										]
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Contact Name',
										id: 'txtAppointmentAddContactPersonName',
										name: 'contactName',
										width: 350,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanSearchAppointment();
												}
											}
										}
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Phonenumber',
										id: 'txtAppointmentSearchContactPersonPhoneNumber',
										name: 'contactPhoneNumber',
										width: 350,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanSearchAppointment();
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
											Ext.getCmp('pnlSearchAppointmentCardLayout').layout.setActiveItem(1);  
										} 
									},
									{
										text: 'Reset',
										icon: '../assets/e/prc/icons/reset-icon.gif',
										iconAlign: 'left',
										handler: function()
										{
											Ext.getCmp('formSearchAppointment').getForm().reset();
										} 
									},
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/search-icon.gif',
										iconAlign: 'left',
										text: 'Search Appointment',
										width: 120,
										height: 25,
										formBind: true,
										handler: hanSearchAppointment
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
												icon: '../assets/e/prc/icons/back-icon.gif',
												iconAlign: 'left',
												text: 'Back',
												height: 25,
												handler: hanAppointmentSearchBack
											}
										]
									},
									{
										border: false,
										region: 'center',
										layout: 'fit',
										xtype: 'panel',
										id: 'pnlSearchAppointmentResult',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridSearchAppointment',
												store: storAppointmentSearch,
												viewConfig:
												{
													forceFit:true
												},
												columns:
												[
													expManageAppointment,
													{
														header: "S. No",
														width: 10,
														sortable: true,
														dataIndex: 'sno'
													},
													{
														header: 'Appointment Subject',
														width: 50,
														sortable: true,
														dataIndex: 'appointmentSubject'
													},
													{
														header: 'Appointment Date',
														width: 10,
														sortable: true,
														dataIndex: 'appointmentDate'
													},
													{
														header: 'Appointment Start Time',
														width: 10,
														sortable: true,
														dataIndex: 'appointmentStartTime'
													},
													{
														header: 'Appointment End Time',
														width: 10,
														sortable: true,
														dataIndex: 'appointmentEndTime'
													}
												],
												plugins: expManageAppointment,
												listeners:
												{
													render:
													{
														fn: function()
														{
															 Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});
														}
													},
													rowcontextmenu:
													{
														fn: function(grid, rowIndex, event) 
														{
															grid.getSelectionModel().selectRow(rowIndex);
															conmnuManageAppointment.showAt(event.getXY());
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															viewAppointment(grid, rowIndex);
														}
													},
													keydown:
													{
														fn: function(e)
														{
															if(e.getKey() == 46)
															{
																hanDeleteAppointment();
															}
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar({
													pageSize: 20,
													store: storAppointmentSearch,
													displayInfo: true,
													displayMsg: 'Displaying Appointments {0} - {1} of {2}',
													emptyMsg: "No Appointment to display, Change your Search Conditions"
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
	tabCenter.setActiveTab('tabitmSearchAppointment');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Appointment Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanSearchAppointment = function(btn)
{
	//Check for Appointment Subject  not blank.
	strAppointmentSubject = Ext.getCmp('txtAppointmentSearchSubject').getValue();
	strAppointmentDetails = Ext.getCmp('txtAppointmentSearchDetails').getValue();
	strAppointmentDate = Ext.getCmp('txtAppointmentSearchDate').getValue();
	strFromTime = Ext.getCmp('txtAppointmentSearchFromTime').getValue();
	strToTime = Ext.getCmp('txtAppointmentSearchToTime').getValue();
	strContactPerson = Ext.getCmp('txtAppointmentAddContactPersonName').getValue();
	strContactPhoneNumber = Ext.getCmp('txtAppointmentSearchContactPersonPhoneNumber').getValue();
	
	if(strAppointmentSubject.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Appointment Keyword',
			msg: "Appointment keyword is empty Please give a valid keyword",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
	//Connect to backend and get the JSON object and load it to the table
	storAppointmentSearch.load({params: {subject:strAppointmentSubject, details: strAppointmentDetails, date: strAppointmentDate, startTime: strFromTime, endTime: strToTime, contactName: strContactPerson, contactPhoneNumber: strContactPhoneNumber }});
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Appointment Search Result', true);
	
	Ext.getCmp('gridSearchAppointment').setAutoScroll(true);
	
	//Now show the table card layout
	Ext.getCmp('pnlSearchAppointmentCardLayout').layout.setActiveItem(1);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Appointment Search Loaded Successfully', true);
	Ext.getCmp('btnShowPreviousSearch').enable();
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanAppointmentSearchBack = function(btn)
{
	Ext.getCmp('pnlSearchAppointmentCardLayout').layout.setActiveItem(0);
}

var viewAppointment = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchAppointment').getSelectionModel().getSelected();
	var strAppointmentId = rec.get('appointmentId');
	strData.load({params: {aid:strAppointmentId}});
	var strAppointmentName = rec.get('appointmentName');
	
	var strTitle = strAppointmentSubject+ " Details";
	
	if (!winViewAppointmentDetails)
	{
		winViewAppointmentDetails = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewAppointmentDetails',
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
								icon: '../assets/e/prc/icons/add-button-icon.gif',
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
								icon: '../assets/e/prc/icons/close-icon.gif',
								iconAlign: 'left',
								text:'Close',
								width: 120,
								height: 25,
								formBind: true,
								handler:function()
								{
									winViewAppointmentDetails.hide();
								}
							}
						]
					}
			 	}
			]
		});
	}
	winViewAppointmentDetails.show();
};

var hanModifyAppointment = function(grid, rowIndex, colIndex)
{
	var rec = storAppointmentSearch.getAt(rowIndex);
	alert("joseph----->" + rec.get('appointmentSubject'));
};

var hanDeleteAppointment = function(grid, rowIndex, colIndex)
{
	var rec = storAppointmentSearch.getAt(rowIndex);
	alert("joseph----->" + rec.get('appointmentSubject'));
};

var strData = new Ext.data.JsonStore(
{
    url: 'viewappointmentdetails/showAppointmentDetails',
    root: 'data.Appointment',
    fields: 
    [
     	'appointmentId', 'appointmentSubject', 'appointmentDetails', 
    ]
});

var storAppointmentSearch = new Ext.data.JsonStore(
{
	root: 'data.searchAppointmentResult', 
	url: 'appointmentsearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'appointmentId'},{name: 'appointmentSubject'},{name: 'appointmentDetails'},{name: 'appointmentDate'},{name: 'appointmentStartTime'},{name: 'appointmentEndTime'}
	]
});


var tplData = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{appointmentId}">',
    		'<div align="center" class="appointment-heading">{appointmentSubject}</div>',
    		
    		'<br />',
    		
	    		'<div class="appointment-field">Appointment Details</div><div class="appointment-value">{appointmentDetails}</a></div><br />',
    			'<div class="appointment-field">Appointment Date</div><div class="appointment-value">{appointmentDate}</a></div><br />',
    			'<div class="appointment-field">Appointment Start Time</div><div class="appointment-value">{appointmentStartTime}</a></div><br />',
    			'<div class="appointment-field">Appointment End Time</div><div class="appointment-value">{appointmentEndTime}</a></div><br />',
    			'<div class="appointment-field">Contact Person</div><div class="appointment-value">{contactPerson}</a></div><br />',
    			'<div class="appointment-field">Contact Phone Number </div><div class="appointment-value">{contactPhoneNumber}</a></div><br />',
    			
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

var expManageAppointment = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{appointmentDetails}</p>'
	)
});


var conmnuManageAppointment = new Ext.menu.Menu(
{
	items:
	[
		{
			text: 'View Remainder',
			icon: '../assets/e/prc/icons/view-icon.gif',
			handler: viewAppointment
		},
		'-',
		{
			text: 'Edit Remainder',
			icon: '../assets/e/prc/icons/view-icon.gif',
			handler: hanModifyAppointment
		},
		'-',
		{
			text: 'Delete Remainder',
			icon: '../assets/e/prc/icons/view-icon.gif',
			handler: hanDeleteAppointment
		}
	]
});
