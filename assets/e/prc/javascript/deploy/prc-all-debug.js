/*!
 * PR Companion - All Right Reserved.
 */
var hanAdvanceSearchOutlets = function(btn)
{
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Search Outlets', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmAdvanceSearchOutlets'))
	{
		tabCenter.setActiveTab('tabitmAdvanceSearchOutlets');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Advance Search Outlets',
		tabTip: 'Advance Search Outlets',
		id: 'tabitmAdvanceSearchOutlets',
		closable: true,
		iconCls: 'iconPRC',
		layout: 'hbox',
		layoutConfig:
		{
			pack: 'center',
			align: 'middle'
		},
		items: 
		[
		{
            xtype:'htmleditor',
            id:'bio',
            fieldLabel:'Biography',
            height:200,
            anchor:'98%'
        }],

        buttons: [{
            text: 'Save'
        },{
            text: 'Cancel'
        }]

	});
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmAdvanceSearchOutlets');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Outlets Loaded', true);
}
var hanAddAppointments = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/appointment-add.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Appointment Add Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmAddAppointment'))
	{
		tabCenter.setActiveTab('tabitmAddAppointment');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Add Appointment',
		tabTip: 'Add Appointment',
		id: 'tabitmAddAppointment',
		closable: true,
		iconCls: 'iconAppointmentAdd',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlAddAppointmentCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlAddAppointment',
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
								title: 'Add Appointment',
								xtype: 'form',
								width: 440,
								height: 190,
								id: 'formAddAppointment',
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
										id: 'txtAppointmentAddSubject',
										fieldLabel: 'Subject',
										allowBlank: false, 
										width: 350,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAddAppointment();
												}
											}
										}
									},
									{
										xtype: 'textarea',
										id: 'txtAppointmentAddDetails',
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
												id: 'txtAppointmentAddDate',
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
												id: 'txtAppointmentAddFromTime',
												name: 'startTime'
											},
											{
												xtype: 'timefield',
												id: 'txtAppointmentAddToTime',
												name: 'endTime'
											}
										]
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Contact Name',
										id: 'txtAppointmentAddContactPerson',
										name: 'contactName',
										width: 350,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAddAppointment();
												}
											}
										}
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Phonenumber',
										id: 'txtAppointmentAddContactPhoneNumber',
										name: 'contactPhoneNumber',
										width: 350,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAddAppointment();
												}
											}
										}
									}
								],
								buttons:
								[
									{
										text: 'Reset',
										icon: '../assets/e/prc/icons/reset-icon.gif',
										iconAlign: 'left',
										handler: function()
										{
											Ext.getCmp('formAddAppointment').getForm().reset();
										} 
									},
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/add-button-icon.gif',
										iconAlign: 'left',
										text: 'Add Appointment',
										width: 120,
										height: 25,
										formBind: true,
										handler: hanAddAppointment
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
	tabCenter.setActiveTab('tabitmAddAppointment');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Outlets Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanAddAppointment = function(btn)
{
	//Check for Appointment Subject not blank.
	strAppointmentSubject = Ext.getCmp('txtAppointmentAddSubject').getValue();
	strAppointmentDetails = Ext.getCmp('txtAppointmentAddDetails').getValue();
	strAppointmentDate = Ext.getCmp('txtAppointmentAddDate').getValue();
	strFromTime = Ext.getCmp('txtAppointmentAddFromTime').getValue();
	strToTime = Ext.getCmp('txtAppointmentAddToTime').getValue();
	strContactName = Ext.getCmp('txtAppointmentAddContactPerson').getValue();
	strContactPhoneNumber = Ext.getCmp('txtAppointmentAddContactPhoneNumber').getValue();
	
		
	if(strAppointmentSubject.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Appointment Subject ',
			msg: "Appointment Subject is empty Please give a valid keyword",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	Ext.getCmp('formAddAppointment').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
	//Connect to backend and get the JSON object and load it to the table
	
	var conn = new Ext.data.Connection();
	conn.request(
	{
		url: 'appointmentadd',
		method: 'POST',
		params: 
		{
			subject: strAppointmentSubject, 
			details: strAppointmentDetails,
			date: strAppointmentDate,
			startTime: strFromTime,
			endTime: strToTime,
			contactName: strContactName,
			contactPhoneNumber: strContactPhoneNumber
			
		},
		success: function(responseObject)
		{
			Ext.Msg.show(
			{
				title: 'Successful',
				msg: "Appointment added successfully!",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
			
			Ext.getCmp('txtAppointmentAddSubject').setValue("");
			Ext.getCmp('txtAppointmentAddDetails').setValue("");
			Ext.getCmp('txtAppointmentAddDate').setValue("");
			Ext.getCmp('txtAppointmentAddFromTime').setValue("");
			Ext.getCmp('txtAppointmentAddToTime').setValue("");
			Ext.getCmp('txtAppointmentAddContactPerson').setValue("");
			Ext.getCmp('txtAppointmentAddContactPhoneNumber').setValue("");
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
	Ext.getCmp('formAddAppointment').body.unmask();
}

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
Ext.namespace('PRC');

PRC.AppointmentModifyForm = Ext.extend(Ext.form.FormPanel,
{
	strAppointmentIdToModify: "",
	initComponent: function ()
	{
		var config =
		{
			xtype: 'form',
			width: 440,
			height: 240,
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
					fieldLabel: 'Subject',
					name: 'subject',
					allowBlank: false, 
					width: 350,
					listeners: 
					{
						specialkey: function(field, e)
						{
							if(e.getKey() == e.ENTER)
							{
								hanModifyAppointmentResult();
							}
						}
					}
				},
				{
					xtype: 'textarea',
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
							name: 'startTime'
						},
						{
							xtype: 'timefield',
							name: 'endTime'
						}
					]
				},
				{
					xtype: 'compositefield',
					fieldLabel: 'Email Publishing',
					defaults:
					{
						flex: 1
					},
					items:
					[
						{
							xtype: 'checkbox',
							boxLabel: 'Send Email',
							handler: this.hanEnable,
							scope:this
						},
						{
							xtype: 'combo',
							store: storSendEmailValue,
							displayField: 'name',
							valueField:'id',
							typeAhead: true,
							mode: 'local',
							forceSelection: true,
							triggerAction: 'all',
							selectOnFocus: true,
							disabled: true
						},
						{
							xtype: 'combo',
							store: storSendEmailType,
							displayField: 'name',
							valueField:'id',
							typeAhead: true,
							mode: 'local',
							forceSelection: true,
							triggerAction: 'all',
							selectOnFocus: true,
							disabled: true
						}
					]
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Email Address',
					name: 'email_address',
					allowBlank: false,
					width: 350,
					disabled: true,
					listeners: 
					{
						specialkey: function(field, e)
						{
							if(e.getKey() == e.ENTER)
							{
								hanModifyAppointmentResult();
							}
						}
					}
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
						this.findParentByType('form').getForm().reset();
					} 
				},
				{
					xtype: 'button',
					icon: '../assets/e/prc/icons/modify-button-icon.gif',
					iconAlign: 'left',
					text: 'Modify Appointment',
					height: 25,
					formBind: true,
					handler: this.hanModifyAppointmentResult,
					scope:this
				}
			]
		};

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		PRC.AppointmentModifyForm.superclass.initComponent.apply(this, arguments);
	},
	hanEnable: function()
	{
		if(this.items.itemAt(3).items.itemAt(0).getValue())
		{
			this.items.itemAt(3).items.itemAt(1).enable();
			this.items.itemAt(3).items.itemAt(2).enable();
			this.items.itemAt(4).enable();
		}
		else
		{
			this.items.itemAt(3).items.itemAt(1).disable();
			this.items.itemAt(3).items.itemAt(2).disable();
			this.items.itemAt(4).disable();
		}
	},
	hanModifyAppointmentResult: function ()
	{
		//Check for Appointment Subject not blank.
		strAppointmentSubject = this.items.itemAt(0).getValue();
		strAppointmentDetails = this.items.itemAt(1).getValue();
		strAppointmentDate = this.items.itemAt(2).items.itemAt(0).getValue();
		strFromTime = this.items.itemAt(2).items.itemAt(1).getValue();
		strToTime = this.items.itemAt(2).items.itemAt(2).getValue();
		
		boolEmailPublishing = this.items.itemAt(3).items.itemAt(0).getValue();
				
		if(boolEmailPublishing)
		{
			strEmailPublishing = "Y";
			strSendValue = this.items.itemAt(3).items.itemAt(1).getValue();
			strSentType = this.items.itemAt(3).items.itemAt(2).getValue();
			strEmailAddress = this.items.itemAt(4).getValue();
			
		}
		else
		{
			strEmailPublishing = "N";
			strSendValue = 0;
			strSentType = "";
			strEmailAddress = "";
		}
			
		if(strAppointmentSubject.length == 0)
		{
			Ext.Msg.show(
			{
				title: 'Blank Appointment Subject ',
				msg: "Appointment Subject is empty Please give a valid input",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
			return;
		}
		Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
		//Connect to backend and get the JSON object and load it to the table
		
		var conn = new Ext.data.Connection();
		conn.request(
		{
			url: 'appointmentmodify',
			method: 'POST',
			params: 
			{
				id: this.strAppointmentIdToModify,
				subject: strAppointmentSubject, 
				details: strAppointmentDetails,
				date: strAppointmentDate,
				startTime: strFromTime,
				endTime: strToTime,
				emailPublishing: strEmailPublishing,
				sendEmailValue: strSendValue,
				sendEmailType: strSentType,
				sendEmailAddress: strEmailAddress
			},
			success: function(responseObject)
			{
				Ext.Msg.show(
				{
					title: 'Successful',
					msg: "Appointment modifiked successfully!",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
				
				this.getForm().reset();
				var winParent = this.findParentByType('window');
				if(winParent != null)
				{
					winParent.hide();
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
			},
			scope: this
		});
		
		Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Appointment Modify Result', true);
		Ext.getCmp('pbarPRC').updateProgress(1.0, 'Appointment modify Loaded Successfully', true);
		Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	}
});

Ext.reg('formappointmentmodify', PRC.AppointmentModifyForm);
Ext.namespace('prc.mysubscription.changepassword');

var hanChangePassword = function(btn)
{

	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/appointment-add.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Change Password Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmChangePassword'))
	{
		tabCenter.setActiveTab('tabitmChangePassword');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Change Password',
		tabTip: 'Change Password',
		id: 'tabitmChangePassword',
		closable: true,
		iconCls: 'iconChangePassword',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlChangePasswordCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlChangePassword',
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
								title: 'Change Password',
								xtype: 'form',
								width: 400,
								height: 160,
								id: 'formChangePassword',
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
										id: 'txtOldPassword',
										fieldLabel: 'Old Password',
										allowBlank: false, 
										width: 350
									},
									{
										xtype: 'textfield',
										id: 'txtNewPassword1',
										fieldLabel: 'New Password'
									},
									{
										xtype: 'textfield',
										id: 'txtNewPassword2',
										fieldLabel: 'Re enter New Password'
									}
								],
								buttons:
								[
									{
										text: 'Reset',
										icon: '../assets/e/prc/icons/reset-icon.gif',
										iconAlign: 'left',
										handler: function()
										{
											Ext.getCmp('formChangePassword').getForm().reset();
										} 
									},
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/modify-button-icon.gif',
										iconAlign: 'left',
										text: 'Change Password',
										width: 120,
										height: 25,
										formBind: true,
										handler: hanChangePasswordUpdate
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
	tabCenter.setActiveTab('tabitmChangePassword');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Change Password Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanChangePasswordUpdate = function(btn)
{
	//Check for Appointment Subject not blank.
	var strOldPassword = Ext.getCmp('txtOldPassword').getValue();
	var strNewPassword1 = Ext.getCmp('txtNewPassword1').getValue();
	var strNewPassword2 = Ext.getCmp('txtNewPassword2').getValue();
	
	if(strOldPassword.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Old Password ',
			msg: "Old Password is empty Please give a valid keyword",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	if(strNewPassword1.length == 0 || strNewPassword2.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Old Password ',
			msg: "New password should not be empty",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	if(strNewPassword1 != strNewPassword2)
	{
		Ext.Msg.show(
		{
			title: 'Password Mismatch',
			msg: "The new password does not match",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	
	Ext.getCmp('formChangePassword').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Changing Password', true);
	
	
	Ext.Ajax.request(
	{
		url: 'changepassword',
		method: 'POST',
		params: 
		{
			userName: strCurrentUserName, 
			oldPassword: strOldPassword, 
			newPassword1: strNewPassword1,
			newPassword2: strNewPassword2
		},
		success: function(responseObject)
		{
			var o =  Ext.decode(responseObject.responseText);
			if(!o.success)
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
			else
			{
				Ext.Msg.show(
				{
					title: 'Successful',
					msg: "Password Changed successfully!",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
				
				Ext.getCmp('txtOldPassword').setValue("");
				Ext.getCmp('txtNewPassword1').setValue("");
				Ext.getCmp('txtNewPassword2').setValue("");
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
		
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load change password Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Change Password Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('formChangePassword').body.unmask();
}

function wait(millis) 
{
	var date = new Date();
	var curDate = null;

	do { curDate = new Date(); } 
	while(curDate-date < millis);
} 

var showViewOutletDetailsWindow = function(strTitle, strOutletId, storViewOutlet)
{
	winViewOutletsDetails = new Ext.Window(
	{
		title: strTitle, 
		id: 'winViewOutletsDetails',
		iconCls: 'iconPRC',
		width: 600,
		height: 500,
		constrain: true,
		closable: true,
		modal: true,
		autoScroll:true,
		items:
		[
			{
			 	tbar: 
				{
					xtype: 'toolbar',
					border: 0,
					items: 
					[
						'->',
						{
							xtype: 'button',
							id: 'btnAddToMyOutlets',
							icon: '../assets/e/prc/icons/add-button-icon.gif',
							iconAlign: 'left',
							text:'Add to My Outlets',
							height: 25,
							formBind: true,
							handler:function()
							{
								hanAddToMyOutletFromWindow(strOutletId);
							} 
						},
						{
							xtype: 'button',
							id: 'btnClose',
							icon: '../assets/e/prc/icons/close-icon.gif',
							iconAlign: 'left',
							text:'Close',
							height: 25,
							formBind: true,
							handler:function()
							{
								winViewOutletsDetails.close();
								winViewOutletsDetails = null;
							} 
						}
					]
				}
		 	},
		 	{
				xtype: 'dataview',
				autoScroll: true, 
		        store: storViewOutlet, 
		        tpl: tplViewOutletDetails,
		        autoHeight: true, 
		        multiSelect: true, 
		        itemSelector: 'div.thumb-wrap',
		        emptyText: 'No data to display',
		        loadingText: 'Please Wait...',
		        style: 'border:1px solid #99BBE8;background:#fff;'
		 	}
		]
	});
	winViewOutletsDetails.setTitle(strTitle);
	winViewOutletsDetails.show();
}

var hanAddToMyOutletFromWindow = function(strOutletId)
{
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
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridOutletKeywordSearch').body.unmask();
}

var showViewOpportunityListWindow = function(strTitle, strOutletId, storViewOpportunityList)
{
	winViewOpportunityList = null;
	
	winViewOpportunityList = new Ext.Window(
	{
		title: strTitle, 
		id: 'winViewOpportunityList',
		iconCls: 'iconPRC',
		width: 600,
		height: 500,
		constrain: true,
		closable: true,
		modal: true,
		autoScroll:true,
		items:
		[
			{
			 	tbar: 
				{
					xtype: 'toolbar',
					border: 0,
					items: 
					[
						'->',
						{
							xtype: 'button',
							id: 'btnClose',
							icon: '../assets/e/prc/icons/close-icon.gif',
							iconAlign: 'left',
							text:'Close',
							height: 25,
							formBind: true,
							handler:function()
							{
								winViewOpportunityList.close();
								winViewOpportunityList = null;
								storViewOpportunityList.removeAll();
							} 
						}
					]
				}
		 	},
		 	{
				xtype: 'dataview',
				autoScroll: true, 
		        store: storViewOpportunityList, 
		        tpl: tplViewOpportunityList,
		        autoHeight: false, 
		        multiSelect: true, 
		        itemSelector: 'div.thumb-wrap',
		        emptyText: 'No data to display',
		        loadingText: 'Please Wait...',
		        style: 'border:1px solid #99BBE8;background:#fff;'
		 	}
		]
	});
	winViewOpportunityList.setTitle(strTitle);
	winViewOpportunityList.show();
}

var showViewContactListWindow = function(strTitle, strOutletId, storViewContactList1)
{
	winViewContactList = null;
	winViewContactList = new Ext.Window(
	{
		title: strTitle, 
		id: 'winViewContactList',
		iconCls: 'iconPRC',
		width: 600,
		height: 500,
		constrain: true,
		closable: true,
		modal: true,
		autoScroll:true,
		items:
		[
			{
			 	tbar: 
				{
					xtype: 'toolbar',
					border: 0,
					items: 
					[
						'->',
						{
							xtype: 'button',
							id: 'btnClose',
							icon: '../assets/e/prc/icons/close-icon.gif',
							iconAlign: 'left',
							text:'Close',
							height: 25,
							formBind: true,
							handler:function()
							{
								winViewContactList.close();
								winViewContactList = null;
								storViewContactList1.removeAll();
							} 
						}
					]
				}
		 	},
		 	{
				xtype: 'dataview',
				autoScroll: true, 
		        store: storViewContactList1, 
		        tpl: tplViewContactList,
		        autoHeight: false, 
		        multiSelect: true, 
		        itemSelector: 'div.thumb-wrap',
		        emptyText: 'No data to display',
		        loadingText: 'Please Wait...',
		        style: 'border:1px solid #99BBE8;background:#fff;'
		 	}
		]
	});
	winViewContactList.setTitle(strTitle);
	winViewContactList.show();
}

var showViewOpportunityDetailsWindow = function(strTitle, strOpportunityId, storViewOpportunityDetails)
{
	// if (!winViewOpportunityKeywordDetails)
	{
		winViewOpportunityKeywordDetails = null;
		
		winViewOpportunityKeywordDetails = new Ext.Window(
		{
			title: strTitle, 
			closable: true,
			modal: true,
			id: 'winViewOpportunityKeywordDetails',
			iconCls: 'iconPRC',
			width: 400,
			height: 300,
			constrain: true,
			autoScroll:true,
			items:
			[
				{
				 	tbar: 
					{
						xtype: 'toolbar',
						border: 0,
						items: 
						[
							'->',
							{
								xtype: 'button',
								id: 'btnAddToMyOpportunityKeyword',
								icon: '../assets/e/prc/icons/add-button-icon.gif',
								iconAlign: 'left',
								text:'Add to My Opportunity',
								height: 25,
								formBind: true,
								handler: hanOPKSAddToMyOpportunity
							},
							{
								xtype: 'button',
								id: 'btnClose',
								icon: '../assets/e/prc/icons/close-icon.gif',
								iconAlign: 'left',
								text:'Close',
								height: 25,
								formBind: true,
								handler:function()
								{
									winViewOpportunityKeywordDetails.close();
									winViewOpportunityKeywordDetails = null;
									storViewOpportunityDetails.removeAll();
								} 
							}
						]
					}
				},
				{
					xtype: 'dataview',
					autoScroll: true, 
			        store: storViewOpportunityDetails, 
			        tpl: tplOPKSViewOpportunityDetails,
			        autoHeight: false, 
			        height: 300,
			        multiSelect: true, 
			        itemSelector: 'div.thumb-wrap',
			        emptyText: 'No data to display',
			        loadingText: 'Please Wait...',
			        style: 'border:1px solid #99BBE8;background:#fff;'
			 	}
			]
		});
	}
	winViewOpportunityKeywordDetails.setTitle(strTitle);
	winViewOpportunityKeywordDetails.show();
}

var showViewContactDetailsWindow = function(strTitle, strContactId, storViewContactDetails)
{
	winViewContactKeywordDetails = null;
	
	winViewContactKeywordDetails = new Ext.Window(
	{
		title: strTitle, 
		id: 'winViewContactDetails',
		iconCls: 'iconPRC',
		width: 600,
		height: 500,
		constrain: true,
		closable: true,
		modal: true,
		autoScroll:true,
		items:
		[
			{
			 	tbar: 
				{
					xtype: 'toolbar',
					border: 0,
					items: 
					[
						'->',
						{
							xtype: 'button',
							id: 'btnAddToMyContactKeyword',
							icon: '../assets/e/prc/icons/add-button-icon.gif',
							iconAlign: 'left',
							text:'Add to My Contact',
							height: 25,
							formBind: true,
							handler:hanCKSAddToMyContact
						},
						{
							xtype: 'button',
							id: 'btnClose',
							icon: '../assets/e/prc/icons/close-icon.gif',
							iconAlign: 'left',
							text:'Close',
							height: 25,
							formBind: true,
							handler:function()
							{
								winViewContactKeywordDetails.close();
								winViewContactKeywordDetails = null;
								storViewContactDetails.removeAll();
							}
						}
					]
				}
			},
		 	{
				xtype: 'dataview',
				autoScroll: true, 
		        store: storViewContactDetails, 
		        tpl: tplViewContactDetails,
		        autoHeight: false, 
		        height: 500,
		        multiSelect: true, 
		        itemSelector: 'div.thumb-wrap',
		        emptyText: 'No data to display',
		        loadingText: 'Please Wait...',
		        style: 'border:1px solid #99BBE8;background:#fff;'
		 	}
		]
	});
	winViewContactKeywordDetails.setTitle(strTitle);
	winViewContactKeywordDetails.show();
}
var commonMessages =
{
    NO_RESULTS_FOUND: "No Data retrieved matching your search criteria. Please try again later." 
}
var commonConfig = 
{
	OUTLET_ROW_COUNT: 500,
	OPPORTUNITY_ROW_COUNT: 200,
	CONTACT_ROW_COUNT: 50
};Ext.namespace('prc.contact.advancesearch');

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
Ext.namespace('prc.contact.beatslist');

var hanContactBeatList = function(btn)
{
}
var storContactDesignation = new Ext.data.ArrayStore(
{
	data: 
	[
		['D1', 'Editor in Chief'], ['D2', 'Creative Director'], ['D3', 'Managing Editor'], ['D4', 'Executive Editor'], ['D5', 'Senior Editor'], ['D6', 'Editorial Freelancer'], ['D7', 'Executive Content Producer'], ['D8', 'Director'], ['D9', 'Vice President'], ['D10', 'Development Manager'], ['D11', 'Editor']
	],
	fields: ['id', 'name']
});
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
Ext.BLANK_IMAGE_URL = '../assets/e/extjs/images/default/s.gif';
Ext.QuickTips.init();

var strUserName = "Joseph";
var strExiredDate = "12-Dec-2010";	

var strHelpContents = "Use the left link to search Outlets, Opportunities and Contacts";

var winTipOfTheDay;

var strCurrentUserName;

function openEnterprisePRC(strUserName)
{
	strCurrentUserName = strUserName;
	
	Ext.onReady(function()
	{
		var boolFullyLoaded = false;
		new Ext.Viewport(
		{
			layout: 'border',
			layoutConfig: 
			{
				frame: true,
				split: true
			},
			items: 
			[
				{
					region: 'north',
					height: 80,
					minHight: 150,
					collapsible: false,
					layout: 'border',
					border: false,
					items: 
					[
						{
							border: false,
							width: 200,
							region: 'west',
							xtype: 'panel',
							contentEl: 'header-logo'
						},
						{
							border: false,
							region: 'center',
							xtype: 'panel',
							contentEl: 'header-middle-contents'
						},
						{
							//border: false,
							width: 225,
							region: 'east',
							contentEl: 'header-user-details'
						}
					]
				},
				{
					region: 'south',
					height: 22,
					border: false,
					bbar: new Ext.ux.StatusBar(
					{
						id: 'sbarPRC',
						defaultText: 'Welcome to PR Companion Enterprise Edition',
						defaultIconCls: 'iconPRCStatusBar',
						iconCls: 'iconPRCStatusBar',
						items:
						[
							{
								xtype: 'progress',
								id: 'pbarPRC',
								width: 223
							}
						]
					})
				},
				{
					region: 'west',
					title: 'Menu',
					width: 200,
					minWidth: 75,
					collapsible: true,
					maxWidth: 150,
					layout: 'accordion',
					border: false,
					activeOnTop: true,
					layoutConfig: 
					{
						animate: false
					},
					items: 
					[
						{
							xtype: 'panel',
							title: ' Outlets',
							iconCls: 'iconOutlet',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/outlet-keyword-search-icon.gif',
									iconAlign: 'left',
									text: ' Keyword Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOutletKeywordSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/outlet-search-icon.gif',
									iconAlign: 'left',
									text: ' Basic Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOutletSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/outlet-advance-search-icon.gif',
									iconAlign: 'left',
									text: 'Advance Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOutletAdvanceSearch
								}/*,
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/beats-lists-icon.gif',
									iconAlign: 'left',
									text: 'Outlets Beats List &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOutletBeatList
								}*/
							]
						},
						{
							xtype: 'panel',
							title: 'Opportunities',
							iconCls: 'iconOpportunity',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/opportunity-keyword-search-icon.gif',
									iconAlign: 'left',
									text: 'Keyword Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOpportunityKeywordSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/opportunity-search-icon.gif',
									iconAlign: 'left',
									text: 'Basic Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOpportunitySearch
								}/*,
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/opportunity-advance-search-icon.gif',
									iconAlign: 'left',
									text: 'Advance Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOpportunityAdvanceSearch
								}*/
							]
						},
						{
							xtype: 'panel',
							title: 'Contacts',
							iconCls: 'iconContact',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/contact-keyword-search-icon.gif',
									iconAlign: 'left',
									text: 'Keyword Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanContactKeywordSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/contact-search-icon.gif',
									iconAlign: 'left',
									text: 'Basic Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanContactSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/contact-advance-search-icon.gif',
									iconAlign: 'left',
									text: 'Advance Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanContactAdvanceSearch
								}/*,
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/beats-lists-icon.gif',
									iconAlign: 'left',
									text: 'Contact Beats List &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanContactBeatList
								}*/
							]
						},
						{
							xtype: 'panel',
							title: 'Reminder',
							iconCls: 'iconReminder',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/reminder-add-icon.gif',
									iconAlign: 'left',
									text: 'Add Reminder &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanAddReminder
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/reminder-manage-icon.gif',
									iconAlign: 'left',
									text: 'Manage Reminders &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanManageReminder
								},
							
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/reminder-manage-icon.gif',
									iconAlign: 'left',
									text: 'View All Reminders &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanViewAllReminders
								}
							]
						},
						/*{
							xtype: 'panel',
							title: 'Appointments',
							iconCls: 'iconAppointment',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/appointment-add-icon.gif',
									iconAlign: 'left',
									text: 'Add Appointment &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanAddAppointments
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/appointment-manage-icon.gif',
									iconAlign: 'left',
									text: 'Manage Appointments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanManageAppointments
								}
							]
						
						},*/
						{
							xtype: 'panel',
							title: 'Notes',
							iconCls: 'iconNote',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/note-add-icon.gif',
									iconAlign: 'left',
									text: 'Add Note &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanAddNotes
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/note-manage-icon.gif',
									iconAlign: 'left',
									text:'Manage Notes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanManageNotes
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/note-manage-icon.gif',
									iconAlign: 'left',
									text:'View All Notes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanViewAllNotes
								}
							]
						},
						{
							xtype: 'panel',
							title: 'Shortcuts',
							iconCls: 'iconShortcut',
							items: 
							[
								/*{
									xtype: 'button',
									icon: '../assets/e/prc/icons/my-search-icon.gif',
									iconAlign: 'left',
									text: 'My Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanMySearch
								},*/
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/my-outlet-icon.gif',
									iconAlign: 'left',
									text:'My Outlets &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanMyOutlets
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/my-outlet-icon.gif',
									iconAlign: 'left',
									text:'My Opportunities &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanMyOpportunities
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/my-contact-icon.gif',
									iconAlign: 'left',
									text: 'My Contacts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanMyContacts
								}
							]
						},
						{
							xtype: 'panel',
							title: 'My Subscription',
							iconCls: 'iconSubscription',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/my-profile-details-icon.gif',
									iconAlign: 'left',
									text: 'My Profile Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanMyProfileDetails
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/change-password-icon.gif',
									iconAlign: 'left',
									text:'Change Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanChangePassword
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/subscription-renewal-icon.gif',
									iconAlign: 'left',
									text: 'Renew Subscription &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanRenewSubscription
								}
							]
						}
					]
				},
				{
					region: 'east',
					title: 'Help | Customer Care',
					collapsible: true,
					split: true,
					width: 225,
					minSize: 175,
					maxSize: 400,
					layout: 'fit',
					items: 
					[
						{
							xtype: 'tabpanel',
							id: 'tabHelp',
							border: false,
							activeTab: 0,
							tabPosition: 'bottom',
							items: 
							[
								{
									title: 'Help!!',
									id: 'tabitmHelp', 
									iconCls: 'iconHelp',
									html: strHelpContents,
									autoScroll: true
								}, 
								{
									title: 'Customer Care!!',
									id: 'tabitmCustomerCare', 
									autoScroll: true,
									iconCls: 'iconCustomerCare',
									layout: 'fit',
									items: 
									[
										{
											xtype: 'form',
											id: 'pnlAdvanceSearchContactsForm',
											labelWidth: 100,
											defaultType: 'field',
											autoScroll: true,
											order: false,
											buttonAlign: 'right',
											labelAlign: 'top',
											frame: true, 
											items: 
											[
												{
													xtype: 'textfield',
													fieldLabel: 'Name', 
													id: 'txtCCUserName',
													name: 'ccUserName',
													anchor: '-4',
													blankText: "Contact name is Required", 
													width: 200,
													allowBlank: false
												},
												{
													xtype: 'combo',
													id: 'cmbCCIssueType',
													fieldLabel: 'Issue type',
													anchor: '-4',
													store: storCustomerCareIssueType,
													displayField: 'name',
													valueField:'id',
													typeAhead: true,
													mode: 'local',
													forceSelection: true,
													triggerAction: 'all',
													emptyText: 'Select issue type...',
													selectOnFocus: true
												},
												{
													xtype: 'textfield',
													anchor: '-4',
													fieldLabel: 'Phone Number', 
													id: 'txtCCPhoneNumber',
													name: 'ccPhoneNumber',
													emptyText: "xxx-xxx-xxxx",
													width: 200,
													allowBlank: false
												},
												{
													xtype: 'textarea',
													anchor: '-4',
													fieldLabel: 'Issue Details', 
													id: 'txtCCIssueDetails',
													name: 'ccIssueDetails',
													width: 200,
													allowBlank: false
												}
											],
											buttons:
											[
												{
													xtype: 'button',
													icon: '../assets/e/prc/icons/add-button-icon.gif',
													iconAlign: 'left',
													text: 'Submit',
													height: 25,
													formBind: true,
													handler: hanSubmitCustomreCare
												}
											]
										}
									]
								}
							]
						}
					]
				},
				{
					xtype: 'tabpanel',
					id: 'tabCenter',
					region: 'center',
					deferredRender: false,
					enableTabScroll: true,
					resizeTabs: true,
					activeTab: 0,
					minTabWidth: 115,
					tabWidth:135,
					enableTabScroll:true,
					plugins: new Ext.ux.TabCloseMenu(),
					items: 
					[
						{
							id: 'tabitmHome',
							padding: 10,
							iconCls: 'iconHome',
							title: 'Home',
							closable: false,
							autoScroll: true,
							items:
							[
								{
									xtype: 'panel',
									id: 'pnsHomeContentCardLayout',
									layout: 'card',
									activeItem: 0,
									border: false,
									items:
									[
										{
											xtype: 'panel',
											id: 'pnlHomeContent',
											layout: 'hbox',
											width: 400,
											height: 400,
											border: false,
											layoutConfig:
											{
												pack: 'center',
												align: 'middle'
											},
											items:
											[
												{
													xtype: 'box',
													id:'welcomeMessage',
													html:'<center><img src="../assets/e/prc/images/welcome-image.jpg" width=620/>'
												}
											]
										}
									]
								}
							]
						}
					],
					listeners:
					{
						tabchange:
						{
							fn: function(tabPanel, tabItem)
							{
								if(this.getActiveTab() != null)
								{
									var strActiveTabTitle = this.getActiveTab().title;
									if(boolFullyLoaded == true)
									{
										if(strActiveTabTitle == "Home")
										{
											Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/search-outlet.htm');
										}
										else if(strActiveTabTitle == "Home")
										{
											Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/search-outlet.htm');
										}
									}
								}
							}
						}
					}
				}
			]
		});
		boolFullyLoaded = true;
	});
}

var hanHelpWindow = function(btn)
{
	if (! winTipOfTheDay)
	{
		winTipOfTheDay = new Ext.Window(
		{
			animateTarget: btn.el,
			html: 'Search Outlets',
			closeAction: 'hide',
			id: 'winTipOfTheDay',
			iconCls: 'iconPRC',
			height: 200,
			width: 300,
			constrain: true,
			autoScroll:true,
			autoLoad:
			{ 
				url:'autoload-content.php' 
			} 
		});
	}
	winTipOfTheDay.show();
}

var hanSubmitCustomreCare = function(grid, rowIndex, colIndex)
{
	var rec = storAdvanceSearchContact.getAt(rowIndex);
	alert("joseph----->" + rec.get('ContactName'));
};
Ext.namespace('prc.shortcuts.mycontacts');

var winViewOutletByContact;
var winViewContactDetails;
var strContactName = "";
var strDesignation = "";
var winCBSViewOpportunityLisForContact;
var winCBSAddContactToMyRemainder;
var winCBSAddContactToMyNote;

var hanMyContacts = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/contact-my.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening My Contacts', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	storMyContact.load({params: {myName:strContactName, designation:strDesignation}});
	
	if(Ext.getCmp('tabitmMyContacts'))
	{
		tabCenter.setActiveTab('tabitmMyContacts');
		return;
	}
	
	tabCenter.add(
	{
		title: 'My Contacts',
		tabTip: 'My Contacts',
		id: 'tabitmMyContacts',
		closable: true,
		iconCls: 'iconMyContact',
		layout: 'fit',
		items: 
		[
			new Ext.grid.GridPanel(
			{
				id: 'gridMyContact',
				store: storMyContact,
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
								url: 'mycontactsexcel',
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
					expContactMy,
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
								tooltip: 'View My Contact Details'
							}
						]
					}

				],
				plugins: expContactMy,
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
								conmnuContactMy.showAt(intarrLocation);
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
					pageSize: 20,
					store: storMyContact,
					displayInfo: true,
					displayMsg: 'Displaying Contacts {0} - {1} of {2}',
					emptyMsg: "No Contacts to display, Change your My Conditions"
				})
			})
		]
	});
	
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Mying Contacts', true);
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Contact My Result', true);
	
	Ext.getCmp('gridMyContact').setAutoScroll(true);
	
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Contact My Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmMyContacts');
	Ext.getCmp('pbarPRC').updateProgress(1, 'My Contacts Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

	


var hanMyContactsBack = function(btn)
{
	Ext.getCmp('pnlMyContactCardLayout').layout.setActiveItem(0);
}

var xtplOutletByContact = new Ext.XTemplate(
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

var xtplViewContactDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{contactId}">',
    		'<div align="center" class="contact-heading">{contactName}</div>',
    		'<div class="contact-image"><img class=cover-page src="images/{contactPhoto}"><div><div class="contact-description">{contactDescription}</div>',
    		'<br />',
    		'<div class="contact-details" align="left">',
        		'<div class="contact-field">First Name</div><div class="contact-value">{contactFirstName}</a></div><br />',
    			'<div class="contact-field">Last Name</div><div class="contact-value">{contactLastName}</a></div><br />',
    			'<div class="contact-field">Designation</div><div class="contact-value">{designation}</a></div><br />',
    			'<div class="contact-field">Phonenumber</div><div class="contact-value">{contactPhone}</a></div><br />',
    			
				'<tpl if="this.isValidEmail(contactEmail)">',
        			'<div class="contact-field">Email</div><div class="contact-value"><a target="blank" href="{contactEmail}">{contactUrl}</a></div><br />',
        		'</tpl>',
        		'<tpl if="!this.isValidEmail(contactEmail)">',
        			'<div class="contact-field">Email</div><div class="contact-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactFacebook)">',
    			'<div class="contact-field">Facebook</div><div class="contact-value"><a target="blank" href="{contactFacebook}">{contactFacebook}</a></div><br />',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(contactFacebook)">',
        			'<div class="contact-field">Facebook</div><div class="contact-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactLinkedin)">',
    			'<div class="contact-field">Linked In</div><div class="contact-value"><a target="blank" href="{contactLinkedin}">{contactLinkedin}</a></div><br />',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(contactLinkedin)">',
        			'<div class="contact-field">Linked In</div><div class="contact-not-found">Not available. Please check back later</div><br />',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactTwitter)">',
    			'<div class="contact-field">Twitter</div><div class="contact-value"><a target="blank" href="{contactTwitter}">{contactTwitter}</a></div><br />',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(contactTwitter)">',
	    			'<div class="contact-field">Twitter</div><div class="contact-not-found">Not available. Please check back later</div><br />',
	    		'</tpl>',
	    		'<tpl if="this.isValidURL(contactURL)">',
    			'<div class="contact-field">Website/Blog</div><div class="contact-value"><a target="blank" href="{contactURL}">{contactURL}</a></div><br />',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(contactURL)">',
	    			'<div class="contact-field">Website/Blog</div><div class="contact-not-found">Not available. Please check back later</div><br />',
	    		'</tpl>',
    			'<div class="contact-field">Last Modified</div><div class="contact-value">{lastModified}</a></div><br />',
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
    	},
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

var hanCBSViewOutletDetailsByContact = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyContact').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storOutletsByContact.load({params: {contactId:strContactId}});
	var strContactName = rec.get('ContactName');
	
	var strTitle = "List of Outlets were" + strContactName + " is working";
	
	if (!winViewOutletByContact)
	{
		winViewOutletByContact = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewOutletByContact',
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
			        store: storOutletsByContact, 
			        tpl: xtplOutletByContact,
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
								id: 'btnAddToMyContacts',
								icon: '../assets/e/prc/icons/add-button-icon.gif',
								iconAlign: 'left',
								text:'Add to My Contacts',
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
									winViewOutletByContact.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winViewOutletByContact.show();
}

var hanCBSViewContactDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyContact').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewContactDetails.load({params: {contactId:strContactId}});
	var strContactName = rec.get('ContactName');
	
	var strTitle = strContactName + " Details";
	
	if (!winViewContactDetails)
	{
		winViewContactDetails = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
			id: 'winViewContactDetails',
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
			        store: storViewContactDetails, 
			        tpl: xtplViewContactDetails,
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
								id: 'btnAddToMyContacts',
								icon: '../assets/e/prc/icons/add-button-icon.gif',
								iconAlign: 'left',
								text:'Add to My Contacts',
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
									winViewContactDetails.hide();
								} 
							}
						]
					}
			 	}
			]
		});
	}
	winViewContactDetails.show();
}

var hanCBSViewOpportunieyByContact = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyContact').getSelectionModel().getSelected();
	var strContactId = rec.get('contactId');
	storViewOpportunityList.load({params: {cid:strContactId}});
	var strContactFirstName = rec.get('contactFirstName');
	var strContactLastName = rec.get('contactLastName');
	var strTitle = strContactFirstName + " " + strContactLastName + " Opportunities Details";
	
	if (!winCBSViewOpportunityLisForContact)
	{
		winCBSViewOpportunityLisForContact = new Ext.Window(
		{
			animateTarget: grid.el,
			title: strTitle, 
			closeAction: 'hide',
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
			        store: storViewOpportunityList, 
			        tpl: xtplViewOpportunityListForContact,
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
								icon: '../assets/e/prc/icons/add-button-icon.gif',
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
								icon: '../assets/e/prc/icons/close-icon.gif',
								iconAlign: 'left',
								text:'Close',
								height: 25,
								formBind: true,
								handler:function()
								{
									winCBSViewOpportunityLisForContact.hide();
								}
							}
						]
					}
			 	}
			]
		});
	}
	winCBSViewOpportunityLisForContact.show();
};

var storMyContact = new Ext.data.JsonStore(
{
	root: 'data.myContactResult', 
	url: 'mycontacts',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'contactId'},{name: 'contactFirstName'},{name: 'contactLastName'},{name: 'contactDesignation'},{name: 'contactDescription'}
	],
	baseParams: 
	{
        myName: strContactName, 
		designation: strDesignation
    }
});

var storOutletsByContact = new Ext.data.JsonStore(
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

var expContactMy = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{contactDescription}</p>'
	)
});

var hanCBSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyContact').getSelectionModel().getSelected();
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
	winCBSAddContactToMyRemainder.show();
}

var hanCBSAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyContact').getSelectionModel().getSelected();
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
	winCBSAddContactToMyNote.show();
}

var hanCBSAddComments = function(grid, rowIndex, colIndex)
{
	
}

var hanCBSViewComments = function(grid, rowIndex, colIndex)
{
	
}

var xtplViewOpportunityListForContact = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{opportunityId}">',
    		'<div class="outlet-details" align="left">',
    			'<div class="outlet-field">Opportunity</div><div class="outlet-value">{opportunityValue}</a></div><br />',
        		'<div class="outlet-field">Description</div><div class="outlet-value">{opportunityDescription}</a></div><br />',
        		'<div class="outlet-field">Publishing Date</div><div class="outlet-value">{publishingDate}</a></div><br />',
        		'<div class="outlet-field">Doc Date</div><div class="outlet-value">{docDeadlineDate}</a></div><br />',
        		'<div class="outlet-field">Ad Date</div><div class="outlet-value">{adDeadlineDate}</a></div><br />',
        		'<div class="outlet-field">Contact Email</div><div class="outlet-value">{contactEmail}</a></div><br />',
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

var conmnuContactMy = new Ext.menu.Menu(
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
		}
	]
});
Ext.namespace('prc.shortcuts.myopportunities');

var strOpportunityName = "";
var strDesignation = "";

var winOPBSViewOpportunityDetails;
var winOPBSViewOutletByOpportunityKeyword;
var winOPBSViewOpportunityKeywordDetails;
var winOPBSViewContactList;

var winOPBSAddopportunityToMyRemainder;
var winOPBSAddOpportunityToMyNote;

var hanMyOpportunities = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/opportunities-my.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Opportunities My Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	//Connect to backend and get the JSON object and load it to the table
	storMyOpportunityKeyword.load({params: {opportunityValue: ""}});
		
	if(Ext.getCmp('tabitmMyOpportunities'))
	{
		tabCenter.setActiveTab('tabitmMyOpportunities');
		return;
	}
	
	tabCenter.add(
	{
		title: 'My Opportunities',
		tabTip: 'My Opportunities',
		id: 'tabitmMyOpportunities',
		closable: true,
		iconCls: 'iconMyOpportunity',
		layout: 'fit',
		items: 
		[
			new Ext.grid.GridPanel(
			{
				id: 'gridMyOpportunity',
				store: storMyOpportunityKeyword,
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
								url: 'myopportunitiesexcel',
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
					expOpportunityKeywordMy,
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
								tooltip: 'View My Opportunity Details'
							}
						]
					}
				],
				plugins: expOpportunityKeywordMy,
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
								conmnuOpportunityBasicMy.showAt(intarrLocation);
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
					store: storMyOpportunityKeyword,
					displayInfo: true,
					displayMsg: 'Displaying Opportunities {0} - {1} of {2}',
					emptyMsg: "No Opportunities to display, Check the My Conditions"
				})
			})
		]
	});
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Opportunities My Result', true);
	
	Ext.getCmp('gridMyOpportunity').setAutoScroll(true);
	
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmMyOpportunities');
	Ext.getCmp('pbarPRC').updateProgress(1, 'My Opportunities Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}


var hanOpportunityMyBack = function(btn)
{
	Ext.getCmp('pnlMyOpportunitiesCardLayout').layout.setActiveItem(0);	
}

var hanOPBSViewOpportunityDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyOpportunity').getSelectionModel().getSelected();
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
								icon: '../assets/e/prc/icons/add-button-icon.gif',
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
								icon: '../assets/e/prc/icons/close-icon.gif',
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
	var rec = Ext.getCmp('gridMyOpportunity').getSelectionModel().getSelected();
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
								icon: '../assets/e/prc/icons/add-button-icon.gif',
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
								icon: '../assets/e/prc/icons/close-icon.gif',
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
	var rec = Ext.getCmp('gridMyOpportunity').getSelectionModel().getSelected();
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
								icon: '../assets/e/prc/icons/add-button-icon.gif',
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
								icon: '../assets/e/prc/icons/close-icon.gif',
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

var hanOPBSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridMyOpportunity').getSelectionModel().getSelected();
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
	var rec = Ext.getCmp('gridMyOpportunity').getSelectionModel().getSelected();
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
	var rec = Ext.getCmp('gridMyOpportunity').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
		
	Ext.getCmp('gridMyOpportunity').body.mask();
	
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
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Opportunity My Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Opportunity My Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridMyOpportunity').body.unmask();
}


var storMyOpportunityKeyword = new Ext.data.JsonStore(
{
	root: 'data.myOpportunityResult', 
	url: 'myopportunities',
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

var hanViewOpportunitiesMy = function(grid, rowIndex, colIndex)
{
	var rec = storMyOpportunityKeyword.getAt(rowIndex);	
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

var expOpportunityKeywordMy = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{opportunityDescription}</p>'
	)
});


var conmnuOpportunityBasicMy = new Ext.menu.Menu(
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
});Ext.namespace('prc.mysubscription.myprofiledetails');

var hanMyProfileDetails = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/my-profile-details.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening My Profile Details Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmMyProfileDetails'))
	{
		tabCenter.setActiveTab('tabitmMyProfileDetails');
		return;
	}
		
	tabCenter.add(
	{
		title: 'My Profile Details',
		tabTip: 'My Profile Details',
		id: 'tabitmMyProfileDetails',
		closable: true,
		iconCls: 'iconMyProfileDetails',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlMyProfileDetailsCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlMyProfileDetails',
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
								title: 'My Profile Details',
								xtype: 'form',
								width: 400,
								height: 410,
								id: 'formMyProfileDetails',
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
										id: 'txtUserName',
										fieldLabel: 'User Name',
										disabled: true,
										width: 350
									},
									{
										xtype: 'textfield',
										id: 'txtPassword',
										fieldLabel: 'Password',
										inputType: 'password', 
										disabled: true,
										width: 350
									},
									{
										xtype: 'textfield',
										id: 'txtFirstName',
										fieldLabel: 'First Name',
										width: 350
									},
									{
										xtype: 'textfield',
										id: 'txtLastName',
										fieldLabel: 'Last Name',
										width: 350
									},
									{
										xtype: 'textfield',
										id: 'txtSecretQuestion',
										fieldLabel: 'Secret Question',
										width: 350
									},
									{
										xtype: 'textfield',
										id: 'txtSecretAnswer',
										fieldLabel: 'Secret Answer',
										width: 350
									},
									{
										xtype: 'textfield',
										id: 'txtEmail',
										fieldLabel: 'Email',
										width: 350
									},
									{
										xtype: 'compositefield',
										fieldLabel: 'Sub Type / Date',
										defaults:
										{
											flex: 1
										},
										items:
										[
											{
												xtype: 'textfield',
												id: 'txtSubscriptionType',
												fieldLabel: 'Subscription Type',
												disabled: true,
												width: 180
											},
											{
												xtype: 'textfield',
												id: 'txtSubscriptionEndDate',
												fieldLabel: 'Subscription End Date',
												disabled: true,
												width: 87
											}
										]
									},
									{
										xtype: 'textfield',
										id: 'txtAddress1',
										fieldLabel: 'Address 1',
										width: 350
									},
									{
										xtype: 'textfield',
										id: 'txtAddress2',
										fieldLabel: 'Address 2',
										width: 350
									},
									{
										xtype: 'compositefield',
										fieldLabel: 'City / State',
										defaults:
										{
											flex: 1
										},
										items:
										[
											{
												xtype: 'textfield',
												id: 'txtCity',
												fieldLabel: 'City',
												width: 133
											},
											{
												xtype: 'textfield',
												id: 'txtState',
												fieldLabel: 'State',
												width: 133
											}
										]
									},
									{
										xtype: 'compositefield',
										fieldLabel: 'Country / Zip',
										defaults:
										{
											flex: 1
										},
										items:
										[
											{
												xtype: 'textfield',
												id: 'txtCountry',
												fieldLabel: 'Country',
												width: 133
											},
											{
												xtype: 'textfield',
												id: 'txtZipCode',
												fieldLabel: 'zipCode',
												width: 133
											}
										]
									},
									{
										xtype: 'compositefield',
										fieldLabel: 'Contact Numbers',
										defaults:
										{
											flex: 1
										},
										items:
										[
											{
												xtype: 'textfield',
												id: 'txtPhoneNumber',
												fieldLabel: 'Phone Number',
												width: 133
											},
											{
												xtype: 'textfield',
												id: 'txtPFaxNumber',
												fieldLabel: 'Fax Number',
												width: 133
											}
										]
									}
								],
								buttons:
								[
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/save-icon.gif',
										iconAlign: 'left',
										text: 'Update Profile Details',
										height: 25,
										formBind: true,
										handler: hanUpdateMyProfileDetails,
										scope: this
									}
								]
							}
						]
					}
				]
			}
		]
	});
	
	//Load the Store
	Ext.Ajax.request(
	{
		url: 'myprofiledetails',
		method: 'POST',
		params: 
		{
			userName: strCurrentUserName
		},
		success: function(responseObject)
		{
			Ext.getCmp('txtUserName').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].userName);
			Ext.getCmp('txtPassword').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].password);
			Ext.getCmp('txtFirstName').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].firstName);
			Ext.getCmp('txtLastName').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].lastName);
			Ext.getCmp('txtSecretQuestion').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].secretQuestion);
			Ext.getCmp('txtSecretAnswer').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].secretAnswer);
			Ext.getCmp('txtEmail').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].email);
			
			var strSubscriptionType = Ext.decode(responseObject.responseText).data.myprofiledetails[0].subscriptionType;
			strSubscriptionType = getSubscriptionTypeName(strSubscriptionType);
			
			Ext.getCmp('txtSubscriptionType').setValue(strSubscriptionType);
			Ext.getCmp('txtSubscriptionEndDate').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].subscriptionEndDate);
			Ext.getCmp('txtAddress1').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].address1);
			Ext.getCmp('txtAddress2').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].address2);
			Ext.getCmp('txtCity').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].city);
			Ext.getCmp('txtState').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].state);
			Ext.getCmp('txtZipCode').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].zipCode);
			Ext.getCmp('txtCountry').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].country);
			Ext.getCmp('txtPhoneNumber').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].phoneNumber);
			Ext.getCmp('txtPFaxNumber').setValue(Ext.decode(responseObject.responseText).data.myprofiledetails[0].faxNumber);
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
	
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmMyProfileDetails');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Outlets Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanUpdateMyProfileDetails = function(btn)
{
	//Check for Outlet Name not blank.
	var strUserName = Ext.getCmp('txtUserName').getValue();
	var strPassword = Ext.getCmp('txtPassword').getValue();
	var strFirstName = Ext.getCmp('txtFirstName').getValue();
	var strLastName = Ext.getCmp('txtLastName').getValue();
	var strSecretQuestion = Ext.getCmp('txtSecretQuestion').getValue();
	var strSecretAnswer = Ext.getCmp('txtSecretAnswer').getValue();
	var strEmail = Ext.getCmp('txtEmail').getValue();
	var strSubscriptionType = Ext.getCmp('txtSubscriptionType').getValue();
	var strSubscriptionEndDate = Ext.getCmp('txtSubscriptionEndDate').getValue();
	var strAddress1 = Ext.getCmp('txtAddress1').getValue();
	var strAddress2 = Ext.getCmp('txtAddress2').getValue();
	var strCity = Ext.getCmp('txtCity').getValue();
	var strState = Ext.getCmp('txtState').getValue();
	var strZipCode = Ext.getCmp('txtZipCode').getValue();
	var strCountry = Ext.getCmp('txtCountry').getValue();
	var strPhoneNumber = Ext.getCmp('txtPhoneNumber').getValue();
	var strFaxNumber = Ext.getCmp('txtPFaxNumber').getValue();

	var conn = new Ext.data.Connection();
	conn.request(
	{
		url: 'updateprofiledetails',
		method: 'POST',
		params: 
		{
			userName: strUserName, 
			password: strPassword, 
			firstName: strFirstName, 
			lastName: strLastName, 
			secretQuestion: strSecretQuestion, 
			secretAnswer: strSecretAnswer, 
			email: strEmail, 
			subscriptionType: strSubscriptionType, 
			subscriptionEndDate: strSubscriptionEndDate, 
			address1: strAddress1, 
			address2: strAddress2, 
			city: strCity, 
			state: strState, 
			zipCode: strZipCode, 
			country: strCountry, 
			phoneNumber: strPhoneNumber, 
			faxNumber: strFaxNumber
		},
		success: function(responseObject)
		{
			Ext.Msg.show(
			{
				title: 'Successful',
				msg: "Your Profile details are updates Successfully!",
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
		},
		scope: this
	});
	
	//Now show the table card layout
	Ext.getCmp('pnlMyProfileDetailsCardLayout').layout.setActiveItem(1);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
	Ext.getCmp('btnShowPreviousSearch').enable();
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
};Ext.namespace('prc.shortcuts.mysearch');

var hanMySearch = function(btn)
{
}
Ext.namespace('prc.notes.notesaddform');

prc.notes.notesaddform.NoteAddForm = Ext.extend(Ext.form.FormPanel,
{
	initComponent: function ()
	{
		var config =
		{
			//title: 'Add Notes',
			xtype: 'form',
			width: 440,
			height: 165,
			//id: 'formAddNote',
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
					//id: 'txtNoteAddSubject',
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
								hanAddNotesResult();
							}
						}
					}
				},
				{
					xtype: 'textarea',
					//id: 'txtNoteAddDetails',
					name: 'details',
					fieldLabel: 'Details'
				}
			],
			buttons:
			[
				{
					text: 'Reset',
					icon: '../assets/e/prc/icons/reset-icon.gif',
					iconAlign: 'left',
					handler: function()
					{
						Ext.getCmp('formAddNote').getForm().reset();
					} 
				},
				{
					xtype: 'button',
					icon: '../assets/e/prc/icons/add-button-icon.gif',
					iconAlign: 'left',
					text: 'Add Note',
					formBind: true,
					handler: this.hanAddNotesResult,
					scope:this
				}
			]
		};

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		prc.notes.notesaddform.NoteAddForm.superclass.initComponent.apply(this, arguments);
	},
	hanAddNotesResult: function ()
	{
		//Check for Note Subject not blank.
		strNoteSubject = this.items.itemAt(0).getValue();
		strNoteDetails = this.items.itemAt(1).getValue();
		
		if(strNoteSubject.length == 0)
		{
			Ext.Msg.show(
			{
				title: 'Blank Note Subject ',
				msg: "Note Subject is empty Please give a valid keyword",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
			return;
		}
		//Ext.getCmp('tabitmAddNote').body.mask();
		
		Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
		//Connect to backend and get the JSON object and load it to the table
		
		var conn = new Ext.data.Connection();
		conn.request(
		{
			url: 'noteadd',
			method: 'POST',
			params: 
			{
				subject: strNoteSubject, 
				details: strNoteDetails
				
			},
			success: function(responseObject)
			{
				Ext.Msg.show(
				{
					title: 'Successful',
					msg: "Note added successfully!",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
				
				this.getForm().reset();
				var winParent = this.findParentByType('window');
				if(winParent != null)
				{
					winParent.hide();
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
			},
			scope: this
		});
		
		Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
		Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
		Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		//Ext.getCmp('tabitmAddNote').body.unmask();
	}

});

Ext.reg('formnoteadd', prc.notes.notesaddform.NoteAddForm);
Ext.namespace('prc.notes.notesadd');

var hanAddNotes = function(btn)
{
    var sbarPRC = Ext.getCmp('sbarPRC');
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/note-add.htm');
	sbarPRC.showBusy("Loading Add Reminder Screen");
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Note Add Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmAddNote'))
	{
		tabCenter.setActiveTab('tabitmAddNote');
		return;
	}
		
	tabCenter.add(
	{
		title: 'Add Note',
		tabTip: 'Add Note',
		id: 'tabitmAddNote',
		closable: true,
		iconCls: 'iconNoteAdd',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlAddNoteCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlAddNote',
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
								xtype: 'formnoteadd',
								title: 'Add Notes'
							}
						]
					}
				]
			}
		]
	});
	
	sbarPRC.showBusy("Add Note Screen Successfully");
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmAddNote');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Add Note Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	sbarPRC.clearStatus({useDefaults:true});
};Ext.namespace('prc.notes.notesmanage');

var winModifyNote;

var hanManageNotes = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/note-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Note Search Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmManageNote'))
	{
		tabCenter.setActiveTab('tabitmManageNote');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Manage Note',
		tabTip: 'Manage Note',
		id: 'tabitmManageNote',
		closable: true,
		iconCls: 'iconNoteSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlManageNoteCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlSearchNote',
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
								xtype: 'formnotesearch'
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
												handler: hanNoteSearchBack
											}
										]
									},
									{
										border: false,
										region: 'center',
										layout: 'fit',
										xtype: 'panel',
										id: 'pnlSearchNoteResult',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridSearchNote',
												store: storNoteSearch,
												viewConfig:
												{
													forceFit:true
												},
												columns:
												[
													expManageNote,
													{
														header: "S. No",
														width: 10,
														sortable: true,
														dataIndex: 'sno'
													},
													{
														header: 'Note Suject',
														width: 20,
														sortable: true,
														dataIndex: 'noteSubject'
													},
													{
														header: 'Note Details',
														width: 65,
														sortable: true,
														dataIndex: 'noteDetails'
													},
													{
										                xtype: 'actioncolumn',
										                width: 5,
										                sortable: false,
										                items: 
										                [
															{
																icon: '../assets/e/prc/icons/view-icon.gif',
																tooltip: 'View Note Details'
															}
														]
										            }
												],
												plugins: expManageNote,
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
															if(columnIndex == 4)
															{
																var intarrLocation = new Array();
																intarrLocation[0] = event.getXY()[0] - 120;
																intarrLocation[1] = event.getXY()[1];
																conmnuManageNote.showAt(intarrLocation);
															}
														}
													},
													keydown:
													{
														fn: function(e)
														{
															if(e.getKey() == 46)
															{
																hanDeleteNote();
															}
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar(
												{
													pageSize: 20,
													store: storNoteSearch,
													displayInfo: true,
													displayMsg: 'Displaying Notess {0} - {1} of {2}',
													emptyMsg: "No Notes to display, Change your Search Conditions"
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
	tabCenter.setActiveTab('tabitmManageNote');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Notess Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanSearchNote = function(btn)
{
	strNoteSubject = Ext.getCmp('txtNoteSearchSubject').getValue();
	strNoteDetails = Ext.getCmp('txtNoteSearchDetails').getValue();
	
	if(strNoteSubject.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Notes Subject',
			msg: "Note Subject is empty Please give a valid note subject",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	Ext.Msg.progress("Searching...", "Searching note please wait....", "Searching");
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Notes', true);
	//Connect to backend and get the JSON object and load it to the table
	storNoteSearch.load({params: {noteSubject:strNoteSubject, noteDetails: strNoteDetails}});
	var intSearchResultCount = storNoteSearch.getCount();
	alert(intSearchResultCount);
	
	storNoteSearch.on('beforeload', function(store)
	{
		storNoteSearch.baseParams = {noteSubject:strNoteSubject, noteDetails: strNoteDetails};
	});
	
	storNoteSearch.load({callback:function()
	{
		var intSearchResultCount = storNoteSearch.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Note Search Result', true);
			Ext.getCmp('gridSearchNote').setAutoScroll(true);
			Ext.Msg.hide();
			Ext.getCmp('pnlManageNoteCardLayout').layout.setActiveItem(1);
			Ext.getCmp('pbarPRC').updateProgress(1.0, 'Note Search Loaded Successfully', true);
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
		else
		{
			Ext.Msg.hide();
			Ext.Msg.show(
			{
				title: 'No Data',
				msg: "No note found for your search criteria",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
	}});
}

var hanNoteSearchBack = function(btn)
{
	Ext.getCmp('pnlManageNoteCardLayout').layout.setActiveItem(0);
}

var hanModifyNote = function(grid, rowIndex)
{
	var rec = Ext.getCmp('gridSearchNote').getSelectionModel().getSelected();
	var strNoteId = rec.get('noteId');
	
	if (!winModifyNote)
	{
		winModifyNote = new Ext.Window(
		{
			animateTarget: grid.el,
			title: 'Modify Note', 
			closeAction: 'hide',
			iconCls: 'iconPRC',
			width: 454,
			height: 197,
			constrain: true,
			autoScroll:true,
			items:
			[
				{
					xtype: 'formnotemodify'
				}
			]
		});
	}
	
	//Load the Store
	Ext.Ajax.request(
	{
		url: 'viewnotedetails',
		method: 'POST',
		params: 
		{
			nid: strNoteId
		},
		success: function(responseObject)
		{
			var strNoteSubject = Ext.decode(responseObject.responseText).data.viewnotedetails[0].noteSubject;
			var strNoteDetails = Ext.decode(responseObject.responseText).data.viewnotedetails[0].noteDetails;
			
			winModifyNote.items.itemAt(0).strNoteIdToModify = strNoteId;
			
			winModifyNote.items.itemAt(0).items.itemAt(0).setValue(strNoteSubject);
			winModifyNote.items.itemAt(0).items.itemAt(1).setValue(strNoteDetails);
			winModifyNote.show();
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

var hanDeleteNote = function(grid, rowIndex)
{
	var rec = Ext.getCmp('gridSearchNote').getSelectionModel().getSelected();
	var strNoteId = rec.get('noteId');
	
	Ext.Msg.show(
	{
		title: 'Server Error',
		msg: "Are you sure you want to delete the note",
		width: 300,
		buttons: Ext.MessageBox.YESNO,
		icon: Ext.MessageBox.QUESTION,
		fn: checkResult
	});
	
	function checkResult(btnValue)
	{
        if(btnValue == "yes")
		{
			deletenote();
		}
    };
	
	function deletenote()
	{
		Ext.Ajax.request(
		{
			url: 'notedelete',
			method: 'POST',
			params: 
			{
				nid: strNoteId
			},
			success: function(responseObject)
			{
				Ext.Msg.show(
				{
					title: 'Successful',
					msg: "Note deleted successfully!",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
				storNoteSearch.remove(rec);
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


var storNoteSearch = new Ext.data.JsonStore(
{
	root: 'data.noteSearchResult', 
	url: 'notesearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'noteId'},{name: 'noteSubject'},{name: 'noteDetails'}
	]
});

var storNoteDetails = new Ext.data.JsonStore(
{
	url: 'viewnotedetails',
	root: 'data.viewnotedetails', 
	fields:
	[
		{name: 'noteId'},{name: 'noteSubject'},{name: 'noteDetails'}
	]
});

var xtplViewNoteDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{noteId}">',
    		'<div class="outlet-details" align="left">',
    			'<div class="outlet-field">Subject</div><div class="outlet-value">{noteSubject}</a></div><br />',
        		'<div class="outlet-field">Details</div><div class="outlet-value">{noteDetails}</a></div><br />',
        		'<div class="outlet-field">Note Date</div><div class="outlet-value">{noteDate}</a></div><br />',
        		'<div class="outlet-field">Start Time</div><div class="outlet-value">{noteStartTime}</a></div><br />',
        		'<div class="outlet-field">End Time</div><div class="outlet-value">{noteEndTime}</a></div><br />',
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

var expManageNote = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{noteDetails}</p>'
	)
});

var conmnuManageNote = new Ext.menu.Menu(
{
	items:
	[
		{
			text: 'Edit Note',
			icon: '../assets/e/prc/icons/view-icon.gif',
			handler: hanModifyNote
		},
		'-',
		{
			text: 'Delete Note',
			icon: '../assets/e/prc/icons/view-icon.gif',
			handler: hanDeleteNote
		}
	]
});
Ext.namespace('prc.notes.notesmanageform');

prc.notes.notesmanageform.NoteModifyForm = Ext.extend(Ext.form.FormPanel,
{
	strNoteIdToModify: "",
	initComponent: function ()
	{
		var config =
		{
			//title: 'Modify Notes',
			xtype: 'form',
			width: 440,
			height: 165,
			//id: 'formModifyNote',
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
					//id: 'txtNoteModifySubject',
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
								hanModifyNotesResult();
							}
						}
					}
				},
				{
					xtype: 'textarea',
					//id: 'txtNoteModifyDetails',
					name: 'details',
					fieldLabel: 'Details'
				}
			],
			buttons:
			[
				{
					text: 'Reset',
					icon: '../assets/e/prc/icons/reset-icon.gif',
					iconAlign: 'left',
					handler: function()
					{
						Ext.getCmp('formModifyNote').getForm().reset();
					} 
				},
				{
					xtype: 'button',
					icon: '../assets/e/prc/icons/modify-button-icon.gif',
					iconAlign: 'left',
					text: 'Modify Note',
					width: 120,
					height: 25,
					formBind: true,
					handler: this.hanModifyNotesResult,
					scope:this
				}
			]
		};

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		prc.notes.notesmanageform.NoteModifyForm.superclass.initComponent.apply(this, arguments);
	},
	hanModifyNotesResult: function ()
	{
		//Check for Note Subject not blank.
		strNoteSubject = this.items.itemAt(0).getValue();
		strNoteDetails = this.items.itemAt(1).getValue();
		
		if(strNoteSubject.length == 0)
		{
			Ext.Msg.show(
			{
				title: 'Blank Note Subject ',
				msg: "Note Subject is empty Please give a valid keyword",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
			return;
		}
		//Ext.getCmp('tabitmModifyNote').body.mask();
		
		Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
		//Connect to backend and get the JSON object and load it to the table
		
		var conn = new Ext.data.Connection();
		conn.request(
		{
			url: 'notemodify',
			method: 'POST',
			params: 
			{
				id: this.strNoteIdToModify,
				subject: strNoteSubject, 
				details: strNoteDetails
			},
			success: function(responseObject)
			{
				Ext.Msg.show(
				{
					title: 'Successful',
					msg: "Note modified successfully!",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
				
				this.getForm().reset();
				var winParent = this.findParentByType('window');
				if(winParent != null)
				{
					winParent.hide();
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
			},
			scope: this
		});
		
		Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
		Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
		Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		//Ext.getCmp('tabitmModifyNote').body.unmask();
	}

});

Ext.reg('formnotemodify', prc.notes.notesmanageform.NoteModifyForm);
Ext.namespace('prc.notes.notessearchform');

prc.notes.notessearchform.NoteSearchForm = Ext.extend(Ext.form.FormPanel,
{
	initComponent: function ()
	{
		var config =
		{
			title: 'Search Notes',
			width: 440,
			height: 165,
			id: 'formSearchNote',
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
					id: 'txtNoteSearchSubject',
					fieldLabel: 'Subject',
					allowBlank: false, 
					width: 350,
					listeners: 
					{
						specialkey: function(field, e)
						{
							if(e.getKey() == e.ENTER)
							{
								hanSearchNote();
							}
						}
					}
				},
				{
					xtype: 'textarea',
					id: 'txtNoteSearchDetails',
					name: 'details',
					fieldLabel: 'Details'
				}
			],
			buttons:
			[
				{
					text: 'Reset',
					icon: '../assets/e/prc/icons/reset-icon.gif',
					iconAlign: 'left',
					handler: function()
					{
						Ext.getCmp('formSearchNote').getForm().reset();
					} 
				},
				{
					xtype: 'button',
					icon: '../assets/e/prc/icons/search-icon.gif',
					iconAlign: 'left',
					text: 'Search Note',
					width: 120,
					height: 25,
					formBind: true,
					handler: hanSearchNote
				}
			]
		};

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		prc.notes.notessearchform.NoteSearchForm.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg('formnotesearch', prc.notes.notessearchform.NoteSearchForm);Ext.namespace('prc.opportunity.advancesearch');

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
Ext.namespace('prc.opportunity.keywordsearch');

var strOPKSOpportunityName = "";
var winOPKSAddopportunityToMyRemainder;
var winOPKSAddOpportunityToMyNote;

var hanOpportunityKeywordSearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/opportunity-keyword-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Opportunity Keyword Search ', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmSearchOpportunityKeyword'))
	{
		tabCenter.setActiveTab('tabitmSearchOpportunityKeyword');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Search OpportunityKeyword',
		tabTip: 'Search OpportunityKeyword',
		id: 'tabitmSearchOpportunityKeyword',
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
										id: 'txtOpportunityKeywordName',
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
													hanOPKSResult();
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
										handler: hanOPKSResult
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
												id: 'gridSearchOpportunityKeyword',
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
														handler: hanSearchOpportunityKeywordBack
													},*/
													{
														xtype: 'button',
														icon: '../assets/e/prc/icons/back-icon.gif',
														iconAlign: 'left',
														text: 'Back',
														height: 25,
														handler: hanSearchOpportunityKeywordBack
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
													expOpportunityKeywordSearch,
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
																conmnuOpportunityKeywordSearch.showAt(intarrLocation);
															}
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanOPKSViewOpportunityDetails(grid, rowIndex);
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
	tabCenter.setActiveTab('tabitmSearchOpportunityKeyword');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Opportunities Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanOPKSResult = function(btn)
{
	//Check for Opportunity Name not blank.
	strOPKSOpportunityName = Ext.getCmp('txtOpportunityKeywordName').getValue();
	
	if(strOPKSOpportunityName.length == 0)
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
		storSearchOpportunityKeyword.baseParams = {opportunityValue:strOPKSOpportunityName};
	});
	
	// storSearchOpportunityKeyword.load({params: {opportunityValue:strOPKSOpportunityName}});
	
	storSearchOpportunityKeyword.load({callback:function()
	{
		var intSearchResultCount = storSearchOpportunityKeyword.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Opportunity Search Result', true);
			Ext.getCmp('gridSearchOpportunityKeyword').setAutoScroll(true);
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

var hanSearchOpportunityKeywordBack = function(btn)
{
	Ext.getCmp('pnlSearchOpportunityKeywordCardLayout').layout.setActiveItem(0);
}

var hanOPKSViewOpportunityDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOpportunityKeyword').getSelectionModel().getSelected();
	var strOpportunityId = rec.get('opportunityId');
	
	storViewOpportunityKeywordDetails.load({params: {opportunityId:strOpportunityId}});
	var strOpportunityValue = rec.get('opportunityValue');
	
	var strTitle = strOpportunityValue + " Details";
	
	showViewOpportunityDetailsWindow(strTitle, strOpportunityId, storViewOpportunityKeywordDetails);
}

var hanOPKSViewOutletForOpportunity = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOpportunityKeyword').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
	storOutletsByOpportunityKeyword.load({params: {opportunityId:strOpportunityKeywordId}});
	var strOpportunityKeywordName = rec.get('opportunityValue')

	var strOutletId = rec.get('outletId');
	
	var strTitle = "Outlet were you find " + strOpportunityKeywordName;
	
	showViewOutletDetailsWindow(strTitle, strOutletId, storOutletsByOpportunityKeyword);
}

var hanOPKSViewContactForOpportunity = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOpportunityKeyword').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
	storOPKSViewContactList.load({params: {opportunityId:strOpportunityKeywordId}});
	var strOpportunityKeywordName = rec.get('opportunityValue');
	
	var strTitle = strOpportunityKeywordName + "'s Contact Details";
	
	showViewContactListWindow(strTitle, null, storOPKSViewContactList);
}

var hanOPKSAddToMyOpportunity = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridSearchOpportunityKeyword').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
		
	Ext.getCmp('gridSearchOpportunityKeyword').body.mask();
	
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
	Ext.getCmp('gridSearchOpportunityKeyword').body.unmask();
}

var hanOPKSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOpportunityKeyword').getSelectionModel().getSelected();
	var strOpportunityValue = rec.get('opportunityValue');
	var strTitle = strOpportunityValue + " Reminder to Add";
	
	if (!winOPKSAddopportunityToMyRemainder)
	{
		winOPKSAddopportunityToMyRemainder = new Ext.Window(
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
	winOPKSAddopportunityToMyRemainder.items.itemAt(0).items.itemAt(0).setValue("Reminder for " + strOpportunityValue);
	winOPKSAddopportunityToMyRemainder.setTitle(strTitle);
	winOPKSAddopportunityToMyRemainder.show();
}

var hanOPKSAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridSearchOpportunityKeyword').getSelectionModel().getSelected();
	var strOpportunityValue = rec.get('opportunityValue');
	var strTitle = strOpportunityValue + " Note to Add";
	
	if (!winOPKSAddOpportunityToMyNote)
	{
		winOPKSAddOpportunityToMyNote = new Ext.Window(
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
	winOPKSAddOpportunityToMyNote.items.itemAt(0).items.itemAt(0).setValue("Note about " + strOpportunityValue);
	winOPKSAddOpportunityToMyNote.setTitle(strTitle);
	winOPKSAddOpportunityToMyNote.show();
}

var hanOPKSAddToOutlook = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridSearchOpportunityKeyword').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
		
	Ext.getCmp('gridSearchOpportunityKeyword').body.mask();
	
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
	Ext.getCmp('gridSearchOpportunityKeyword').body.unmask();
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

var storOPKSViewContactList = new Ext.data.JsonStore(
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

var expOpportunityKeywordSearch = new Ext.ux.grid.RowExpander(
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
						handler: hanOPKSViewOpportunityDetails
					},
					{
						text: 'Outlet',
						tabTip: "View Opportunity's Outlet Details",
						icon: '../assets/e/prc/icons/outlet-icon.gif',
						handler: hanOPKSViewOutletForOpportunity
					},
					{
						text: 'Contact',
						tabTip: "View Opportunity's Outlet Contact",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOPKSViewContactForOpportunity
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
						handler: hanOPKSAddToMyOpportunity
					},
					{
						text: 'Reminder',
						tabTip: "Add Opportunity to your Reminder",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOPKSAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Opportunity to your Notes",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOPKSAddToMyNote
					}/*,
					{
						text: 'Outlook',
						tabTip: "Add Opportunity to your Outlook",
						icon: '../assets/e/prc/icons/outlook-icon.gif',
						handler: hanOPKSAddToOutlook
					}*/
				]
			}
		}
	]
});
Ext.namespace('prc.opportunity.basicsearch');

var strOPBSOpportunityName = "";
var strOPBSOpportunityFromDate = "";
var strOPBSOpportunityToDate = "";
var winOPBSAddopportunityToMyRemainder;
var winOPBSAddOpportunityToMyNote;


var hanOpportunitySearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/opportunity-basic-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Opportunity Basic Search ', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmOPBSSearchOpportunity'))
	{
		tabCenter.setActiveTab('tabitmOPBSSearchOpportunity');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Opportunity Basic Search',
		tabTip: 'Opportunity Basic Search',
		id: 'tabitmOPBSSearchOpportunity',
		closable: true,
		iconCls: 'iconOpportunitySearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlOPBSCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlSearchOulet',
						layout: 'hbox',
						width: 500,
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
							    title: 'Opportunity Basic Search',
								xtype: 'form',
								width: 400,
								height: 125,
								id: 'pnlOPBSForm',
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
										id: 'txtOPBSOpportunityName',
										name: 'opportunity_basic_value',
										blankText: "Opportunity name is Required", 
										allowBlank: false, 
										width: 283,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanOPBSSearchOpportunities();
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
												xtype: 'displayfield',
												value: 'From:',
												width: 30
											},
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
												xtype: 'displayfield',
												value: 'To:'
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
										id: 'btnShowPreviousOPPKSSearch',
										icon: '../assets/e/prc/icons/previous-search-icon.gif',
										iconAlign: 'left',
										text:'Show Previous Search',
										width: 10,
										disabled: true,
										height: 25,
										formBind: true,
										handler:function()
										{
											Ext.getCmp('pnlOPBSCardLayout').layout.setActiveItem(1);  
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
										handler: hanOPBSSearchOpportunities
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
												id: 'gridOPBSOpportunityList',
												store: storOPBSOpportunityList,
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
														handler: hanOPBSBack
													},*/
													{
														xtype: 'button',
														icon: '../assets/e/prc/icons/back-icon.gif',
														iconAlign: 'left',
														text: 'Back',
														height: 25,
														handler: hanOPBSBack
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
													expOPBSDescription,
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
												plugins: expOPBSDescription,
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
																conmnuOPBSOpportunitySearch.showAt(intarrLocation);
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
													pageSize: 50,
													store: storOPBSOpportunityList,
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
	tabCenter.setActiveTab('tabitmOPBSSearchOpportunity');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Opportunities Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanOPBSSearchOpportunities = function(btn)
{
	//Check for Opportunity Name not blank.
	strOPBSOpportunityName = Ext.getCmp('txtOPBSOpportunityName').getValue();
	
	if(strOPBSOpportunityName.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Opportunity Value',
			msg: "Opportunity Value Empty Please enter the Opportunity value",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	var strOPBSOpportunityFromDate = Ext.getCmp('txtOpportunitiesSearchFromDate').getValue();
	var strOPBSOpportunityToDate = Ext.getCmp('txtOpportunitiesSearchToDate').getValue();

	Ext.Msg.progress("Searching...", "Searching opportunity please wait....", "Searching");
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Opportunities', true);
	//Connect to backend and get the JSON object and load it to the table
	
	storOPBSOpportunityList.on('beforeload', function(store)
	{
		storOPBSOpportunityList.baseParams = {opportunityValue:strOPBSOpportunityName, fromDate: strOPBSOpportunityFromDate, toDate: strOPBSOpportunityToDate};
	});
	
	storOPBSOpportunityList.load({callback:function()
	{
		var intSearchResultCount = storOPBSOpportunityList.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Opportunity Search Result', true);
			Ext.getCmp('gridOPBSOpportunityList').setAutoScroll(true);
			//Now show the table card layout
			Ext.Msg.hide();
			Ext.getCmp('pnlOPBSCardLayout').layout.setActiveItem(1);
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

var hanOPBSBack = function(btn)
{
	Ext.getCmp('pnlOPBSCardLayout').layout.setActiveItem(0);
}

var hanOPBSViewOpportunityDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOPBSOpportunityList').getSelectionModel().getSelected();
	var strOpportunityId = rec.get('opportunityId');
	
	storViewOpportunityKeywordDetails.load({params: {opportunityId:strOpportunityId}});
	var strOpportunityValue = rec.get('opportunityValue');
	
	var strTitle = strOpportunityValue + " Details";
	
	showViewOpportunityDetailsWindow(strTitle, strOpportunityId, storViewOpportunityKeywordDetails);
}

var hanOPBSViewOutletForOpportunity = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOPBSOpportunityList').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
	storOutletsByOpportunityKeyword.load({params: {opportunityId:strOpportunityKeywordId}});
	var strOpportunityKeywordName = rec.get('opportunityValue')

	var strOutletId = rec.get('outletId');
	
	var strTitle = "Outlet were you find " + strOpportunityKeywordName;
	
	showViewOutletDetailsWindow(strTitle, strOutletId, storOutletsByOpportunityKeyword);
}

var hanOPBSViewContactForOpportunity = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOPBSOpportunityList').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
	storOPBSViewContactList.load({params: {opportunityId:strOpportunityKeywordId}});
	var strOpportunityKeywordName = rec.get('opportunityValue');
	
	var strTitle = strOpportunityKeywordName + "'s Contact Details";
	
	showViewContactListWindow(strTitle, null, storOPBSViewContactList);
}

var hanOPBSAddToMyOpportunity = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridOPBSOpportunityList').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
		
	Ext.getCmp('gridOPBSOpportunityList').body.mask();
	
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
	Ext.getCmp('gridOPBSOpportunityList').body.unmask();
}

var hanOPBSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOPBSOpportunityList').getSelectionModel().getSelected();
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
	winOPBSAddopportunityToMyRemainder.setTitle(strTitle);
	winOPBSAddopportunityToMyRemainder.show();
}

var hanOPBSAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOPBSOpportunityList').getSelectionModel().getSelected();
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
	winOPBSAddOpportunityToMyNote.setTitle(strTitle);
	winOPBSAddOpportunityToMyNote.show();
}

var hanOPBSAddToOutlook = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridOPBSOpportunityList').getSelectionModel().getSelected();
	var strOpportunityKeywordId = rec.get('opportunityId');
		
	Ext.getCmp('gridOPBSOpportunityList').body.mask();
	
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
	Ext.getCmp('gridOPBSOpportunityList').body.unmask();
}

var storOPBSOpportunityList = new Ext.data.JsonStore(
{
	root: 'data.searchOpportunityResult', 
	url: 'opportunitysearch',
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

var storOPBSViewContactList = new Ext.data.JsonStore(
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

var expOPBSDescription = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{opportunityDescription}</p>'
	)
});

var conmnuOPBSOpportunitySearch = new Ext.menu.Menu(
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
						handler: hanOPBSAddToMyOpportunity
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
					}/*,
					{
						text: 'Outlook',
						tabTip: "Add Opportunity to your Outlook",
						icon: '../assets/e/prc/icons/outlook-icon.gif',
						handler: hanOPBSAddToOutlook
					}*/
				]
			}
		}
	]
});
Ext.namespace('prc.outlet.advance');

var winViewOutletsDetails;
var strOutletName = "";
var strOutletType = "";

var strOutletURL = "";
var intCirculation = 0;
var strCountyName = "";
var strStateName = "";
var strCountryName = "";

var hanOutletAdvanceSearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/advance-search-outlet.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Advance Search Outlets', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmAdvanceSearchOutlets'))
	{
		tabCenter.setActiveTab('tabitmAdvanceSearchOutlets');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Advance Search Outlets',
		tabTip: 'Advance Search Outlets',
		id: 'tabitmAdvanceSearchOutlets',
		closable: true,
		iconCls: 'iconOutletAdvanceSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlAdvanceSearchOutletCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlAdvanceSearchOulet',
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
							    title: 'Advance Outlets Search',
								xtype: 'form',
								width: 347,
								height: 330,
								id: 'pnlAdvanceSearchOutletsForm',
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
										id: 'txtAdvanceOutletName',
										name: 'outlet_name',
										blankText: "Outlet name is Required", 
										width: 250,
						                allowBlank: false,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
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
												id: 'chkOASMagazine',
												checked: true,
												boxLabel: 'Magazine'
											},
											{
												boxLabel: 'Blog',
												id: 'chkOASBlog'
											},
											{
												boxLabel: 'News Paper',
												id: 'chkOASNewsPaper'
											},
											{
												boxLabel: 'Twitter',
												id: 'chkOASTwitter'
											},
											{
												boxLabel: 'Television',
												id: 'chkOASTelevision'
											},
											{
												boxLabel: 'Websites',
												id: 'chkOASWebsite'
											},
											{
												boxLabel: 'Radio',
												id: 'chkOASRadio'
											},
											/*{
												boxLabel: 'College Newspaper',
												id: 'chkOASCollegeNewspaper'
											},*/
											{
												boxLabel: 'Forum',
												id: 'chkOASForum'
											}
										]
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Outlet URL', 
										id: 'txtAdvanceOutletURL',
										name: 'outlet_url',
										width: 250,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
												}
											}
										}
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Circulation', 
										id: 'txtAdvanceOutletCirculation',
										name: 'outlet_circulation',
										width: 250,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
												}
											}
										}
									},
									{
										xtype: 'textfield',
										fieldLabel: 'County', 
										id: 'txtAdvanceOutletCounty',
										name: 'outlet_county',
										width: 250,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
												}
											}
										}
									},
									{
										xtype: 'textfield',
										fieldLabel: 'State', 
										id: 'txtAdvanceOutletState',
										name: 'outlet_state',
										width: 250,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
												}
											}
										}
									},
									{
										xtype: 'textfield',
										fieldLabel: 'Country', 
										id: 'txtAdvanceOutletCountry',
										name: 'outlet_country',
										width: 250,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanAdvanceSearchOutletsResult();
												}
											}
										}
									}
								],
								buttons:
								[
									{
										xtype: 'button',
										id: 'btnShowPreviousAdvanceSearch',
										icon: '../assets/e/prc/icons/previous-search-icon.gif',
										iconAlign: 'left',
										text:'Show Previous Search',
										disabled: true,
										height: 25,
										formBind: true,
										handler:function()
										{
											Ext.getCmp('pnlAdvanceSearchOutletCardLayout').layout.setActiveItem(1);
										} 
									},
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/search-icon.gif',
										iconAlign: 'left',
										text: 'Search Outlets',
										height: 25,
										formBind: true,
										handler: hanAdvanceSearchOutletsResult
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
										id: 'pnlAdvanceSearchOuletResult',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridAdvanceSearchOutlet',
												store: storAdvanceSearchOutlet,
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
														handler: hanAdvanceSearchOutletsBack
													},*/
													{
														xtype: 'button',
														icon: '../assets/e/prc/icons/back-icon.gif',
														iconAlign: 'left',
														text: 'Back',
														height: 25,
														handler: hanAdvanceSearchOutletsBack
													},
													'-',
													{
									            		text: 'Export Excel',
									            		handler : function()
									            		{
															strOutletName = Ext.getCmp('txtAdvanceOutletName').getValue();
															strOutletType = "";
															
															if(Ext.getCmp('chkOASMagazine').checked)
															{
																strOutletType += "'MA',";
															}
															if(Ext.getCmp('chkOASNewsPaper').checked)
															{
																strOutletType += "'NP',";
															}
															if(Ext.getCmp('chkOASTelevision').checked)
															{
																strOutletType += "'TV',";
															}
															if(Ext.getCmp('chkOASRadio').checked)
															{
																strOutletType += "'RD',";
															}
															if(Ext.getCmp('chkOASWebsite').checked)
															{
																strOutletType += "'WS',";
															}
															if(Ext.getCmp('chkOASBlog').checked)
															{
																strOutletType += "'BL',";
															}
															if(Ext.getCmp('chkOASForum').checked)
															{
																strOutletType += "'FO',";
															}
															/*if(Ext.getCmp('chkOASCollegeNewspaper').checked)
															{
																strOutletType += "'CN',";
															}*/
															
															strOutletURL = Ext.getCmp('txtAdvanceOutletURL').getValue();
															intCirculation = Ext.getCmp('txtAdvanceOutletCirculation').getValue();
															strCountyName = Ext.getCmp('txtAdvanceOutletCounty').getValue();
															strStateName = Ext.getCmp('txtAdvanceOutletState').getValue();
															strCountryName = Ext.getCmp('txtAdvanceOutletCountry').getValue();
															
									            			Ext.Ajax.request(
															{
																url: 'outletadvancesearchexcel',
																method: 'POST',
																params: 
																{
																	searchName: strOutletName, 
																	outletType: strOutletType,
																	outletURL: strOutletURL,
																	circulation: intCirculation,
																	countyName: strCountyName,
																	stateName: strStateName,
																	countryName: strCountryName
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
													expOUASOutlet,
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
												plugins: expOUASOutlet,
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
																conmnuOutletAdvanceSearch.showAt(intarrLocation);
															}
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanOASViewOutletDetails(grid, rowIndex);
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar(
												{
													pageSize: commonConfig.OUTLET_ROW_COUNT,
													store: storAdvanceSearchOutlet,
													displayInfo: true,
													displayMsg: 'Displaying Outlets {0} - {1} of {2}',
													emptyMsg: "No Outlets to display, Change your Advance Search Conditions"
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
	tabCenter.setActiveTab('tabitmAdvanceSearchOutlets');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Advance Search Outlets Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanAdvanceSearchOutletsResult = function(btn)
{
	//Check for Outlet Name not blank.
	strOutletName = Ext.getCmp('txtAdvanceOutletName').getValue();
	// if(strOutletName.length == 0)
	// {
		// Ext.Msg.show(
		// {
			// title: 'Blank Outlet Name',
			// msg: "Outlet Name Empty Please enter the outlet name",
			// width: 300,
			// buttons: Ext.MessageBox.OK,
			// icon: Ext.MessageBox.ERROR
		// });
		// return;
	// }
	Ext.Msg.progress("Searching...", "Searching Outlet please wait....", "Searching");	
	strOutletType = "";
	
	if(Ext.getCmp('chkOASMagazine').checked)
	{
		strOutletType += "'MA',";
	}
	if(Ext.getCmp('chkOASNewsPaper').checked)
	{
		strOutletType += "'NP',";
	}
	if(Ext.getCmp('chkOASTelevision').checked)
	{
		strOutletType += "'TV',";
	}
	if(Ext.getCmp('chkOASRadio').checked)
	{
		strOutletType += "'RD',";
	}
	if(Ext.getCmp('chkOASWebsite').checked)
	{
		strOutletType += "'WS',";
	}
	if(Ext.getCmp('chkOASBlog').checked)
	{
		strOutletType += "'BL',";
	}
	if(Ext.getCmp('chkOASForum').checked)
	{
		strOutletType += "'FO',";
	}
	/*if(Ext.getCmp('chkOASCollegeNewspaper').checked)
	{
		strOutletType += "'CN',";
	}*/
	
	strOutletURL = Ext.getCmp('txtAdvanceOutletURL').getValue();
	intCirculation = Ext.getCmp('txtAdvanceOutletCirculation').getValue();
	strCountyName = Ext.getCmp('txtAdvanceOutletCounty').getValue();
	strStateName = Ext.getCmp('txtAdvanceOutletState').getValue();
	strCountryName = Ext.getCmp('txtAdvanceOutletCountry').getValue();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'AdvanceSearching Outlets', true);
	//Connect to backend and get the JSON object and load it to the table
	storAdvanceSearchOutlet.on('beforeload', function(store)
	{
		storAdvanceSearchOutlet.baseParams = 
		{
			searchName: strOutletName, 
			outletType: strOutletType,
			outletURL: strOutletURL,
			circulation: intCirculation,
			countyName: strCountyName,
			stateName: strStateName,
			countryName: strCountryName
		};
	});
	
	// storAdvanceSearchOutlet.load(
	// {
		// params: 
		// {
			// searchName: strOutletName, 
			// outletType: strOutletType,
			// outletURL: strOutletURL,
			// circulation: intCirculation,
			// stateName: strStateName,
			// countryName: strCountryName
		// }
	// });
	
	storAdvanceSearchOutlet.load({callback:function()
	{
		var intSearchResultCount = storAdvanceSearchOutlet.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Advance Search Result', true);
			Ext.getCmp('gridAdvanceSearchOutlet').setAutoScroll(true);
			//Now show the table card layout
			Ext.Msg.hide();
			Ext.getCmp('pnlAdvanceSearchOutletCardLayout').layout.setActiveItem(1);
			Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Advance Search Loaded Successfully', true);
			Ext.getCmp('btnShowPreviousAdvanceSearch').enable();
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
			
			strOutletType = "";
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

var hanAdvanceSearchOutletsBack = function(btn)
{
	Ext.getCmp('pnlAdvanceSearchOutletCardLayout').layout.setActiveItem(0);
}

var storOASViewOutlet = new Ext.data.JsonStore(
{
    url: 'viewoutletdetails/showOutletDetails',
    root: 'data.Outlet',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'county', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
    ]
});

var storAdvanceSearchOutlet = new Ext.data.JsonStore(
{
	root: 'data.advanceSearchOutletResult', 
	url: 'outletadvancesearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'outletId'},{name: 'outletName'},{name: 'outletDescription'},{name: 'outletUrl'},{name: 'outletCirculation'},{name: 'outletFrequency'},{name: 'outletType'}
	]
});


var hanOASViewOutletDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	storOASViewOutlet.load({params: {oid:strOutletId}});
	var strOutletName = rec.get('outletName');
	
	var strTitle = strOutletName + " Details";
	
	showViewOutletDetailsWindow(strTitle, strOutletId, storOASViewOutlet);
}


var storOASViewOpportunityList = new Ext.data.JsonStore(
{
    url: 'viewopportunitylist',
    root: 'data.viewopportunitylist',
    fields: 
    [
     	'opportunityId', 'opportunityValue', 'opportunityDescription', 'publishingDate', 'docDeadlineDate', 'adDeadlineDate', 'contactEmail', 'lastModified'
    ]
});

var storOASViewContactList = new Ext.data.JsonStore(
{
    url: 'viewcontactlist',
    root: 'data.viewcontactlist',
    fields: 
    [
     	'contactId', 'contactFirstName', 'contactLastName', 'contactDescription', 'contactPhoto', 'designation', 'contactPhone', 'contactEmail', 'contactFacebook', 'contactLinkedin', 'contactTwitter', 'contactURL', 'lastModified'
    ]
});

var hanOASViewOpportunitiesList = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	// storOASViewOpportunityList.load({params: {oid:strOutletId}});
	
	storOASViewOpportunityList.on('beforeload', function(store)
	{
		storOASViewOpportunityList.baseParams = {oid:strOutletId};
	});
	
	storOASViewOpportunityList.load({callback:function()
	{
		var intCount = storOASViewOpportunityList.getCount();
		if(intCount > 0)
		{
			Ext.Msg.hide();
			var strOutletNameToView = rec.get('outletName');
			var strTitle = strOutletNameToView + " Opportunities Details";
			showViewOpportunityListWindow(strTitle, strOutletId, storOASViewOpportunityList);
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

var hanOASViewContactList = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	storOASViewContactList.load({params: {oid:strOutletId}});

	var strOutletNameToView = rec.get('outletName');
	
	var strTitle = strOutletNameToView + " Contact Details";
	
	showViewContactListWindow(strTitle, strOutletId, storOASViewContactList);
}

var hanOASAddToMyOutletFromWindow = function(strOutletId)
{
	Ext.getCmp('gridAdvanceSearchOutlet').body.mask();
	
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
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridAdvanceSearchOutlet').body.unmask();
}

var hanOASAddToMyOutlet = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
		
	Ext.getCmp('gridAdvanceSearchOutlet').body.mask();
	
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
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridAdvanceSearchOutlet').body.unmask();
}

var hanOASAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
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

var hanOASAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
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
	winAddOutletToMyNote.items.itemAt(0).items.itemAt(0).setValue("joseph");
	winAddOutletToMyNote.setTitle(strTitle);
	winAddOutletToMyNote.show();
}

var hanAddOutletToNote = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridAdvanceSearchOutlet').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
		
	Ext.getCmp('formAddOutletToNote').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Add Outlet to My List', true);
	//Connect to backend and get the JSON object and load it to the table
	
	strNoteSubject = Ext.getCmp('txtAddOutletToNoteSubject').getValue();
	strNoteDetails = Ext.getCmp('txtAddOutletToNoteDetails').getValue();
	
	if(strNoteSubject.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Note Subject ',
			msg: "Note Subject is empty Please give a valid keyword",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	Ext.getCmp('gridAdvanceSearchOutlet').body.mask();
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
	//Connect to backend and get the JSON object and load it to the table
	
	var conn = new Ext.data.Connection();
	conn.request(
	{
		url: 'noteadd',
		method: 'POST',
		params: 
		{
			subject: strNoteSubject, 
			details: strNoteDetails
			
		},
		success: function(responseObject)
		{
			Ext.Msg.show(
			{
				title: 'Successful',
				msg: "Note added successfully!",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
			
			Ext.getCmp('txtAddOutletToNoteSubject').setValue("");
			Ext.getCmp('txtAddOutletToNoteDetails').setValue("");
			
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
	Ext.getCmp('formAddOutletToNote').body.unmask();
}

var hanOASAddComments = function(grid, rowIndex, colIndex)
{
	
}

var hanOASViewComments = function(grid, rowIndex, colIndex)
{
	
}

var conmnuOutletAdvanceSearch = new Ext.menu.Menu(
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
						handler: hanOASViewOutletDetails
					},
					{
						text: 'Opportunities',
						tabTip: "View All Opportunities",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOASViewOpportunitiesList
					},
					{
						text: 'Contact',
						tabTip: "View All contact Details",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOASViewContactList
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
						handler: hanOASAddToMyOutlet
					},
					{
						text: 'Reminder',
						tabTip: "Add Outlet to your Reminder",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOASAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Outlet to your Notes",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOASAddToMyNote
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
						handler: hanOASAddComments
					},
					{
						text: 'View Comments',
						icon: '../assets/e/prc/icons/comment-view-icon.gif',
						tabTip: "View All comments",
						handler: hanOASViewComments
					}
				]
			}
		}*/
	]
});

var expOUASOutlet = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{outletDescription}</p>'
	)
});Ext.namespace('prc.outlet.basicsearch');

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
});Ext.namespace('prc.outlet.beatslist');

var hanOutletBeatList = function(btn)
{
}
Ext.namespace('prc.outlet.keywordsearch');

var hanOutletKeywordSearch = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/outlet-search-keyword.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Keyword Search Outlets', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmOutletsKeywordSearch'))
	{
		tabCenter.setActiveTab('tabitmOutletsKeywordSearch');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Outlet Keyword Search',
		tabTip: 'Outlet Keyword Search',
		id: 'tabitmOutletsKeywordSearch',
		closable: true,
		iconCls: 'iconOutletKeywordSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlSearchOutletKeywordCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlOuletKeywordSearch',
						layout: 'hbox',
						border: false,
						layoutConfig:
						{
							pack: 'center',
							align: 'middle'
						},
						items:
						[
							{   title: 'Outlet Keyword Search',
								xtype: 'form',
								width: 350,
								height: 100,
								id: 'pnlOutletKeywordSearchForm',
								labelWidth: 90,
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
										id: 'txtOutletKeywordSearch',
										name: 'outlet_keyword',
										blankText: "Outlet keyword is Required", 
										width: 236,
						                allowBlank: false,
										listeners: 
										{
											specialkey: function(field, e)
											{
												if(e.getKey() == e.ENTER)
												{
													hanOutletKeywordSearchResult();
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
										text:'Previous Search',
										width: 120,
										disabled: true,
										height: 25,
										formBind: true,
										handler:function()
										{
											Ext.getCmp('pnlSearchOutletKeywordCardLayout').layout.setActiveItem(1);  
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
										handler: hanOutletKeywordSearchResult
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
										id: 'pnlOuletKeywordSearchResult',
										items:
										[
											new Ext.grid.GridPanel(
											{
												id: 'gridOutletKeywordSearch',
												store: storOutletKeywordSearch,
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
													expOUKSOutlet,
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
												plugins: expOUKSOutlet,
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
																conmnuOutletKeywordSearch.showAt(intarrLocation);
															}
														}
													},
													rowdblclick:
													{
														fn: function(grid, rowIndex, e)
														{
															hanOKSViewOutletDetails(grid, rowIndex);
														}
													}
												},
												stripeRows: true,
												loadMask: true,
												bbar: new Ext.PagingToolbar(
												{
													pageSize: commonConfig.OUTLET_ROW_COUNT,
													store: storOutletKeywordSearch,
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
	tabCenter.setActiveTab('tabitmOutletsKeywordSearch');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Outlets Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanOutletKeywordSearchResult = function(btn)
{
	//Check for Outlet Name not blank.
	strOutletName = Ext.getCmp('txtOutletKeywordSearch').getValue();
	if(strOutletName.length == 0)
	{
		Ext.Msg.show(
		{
			title: 'Blank Outlet Keyword',
			msg: "Outlet keyword is empty Please give a valid keyword",
			width: 300,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
		});
		return;
	}
	
	Ext.Msg.progress("Searching...", "Searching Outlet please wait....", "Searching");
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
	//Connect to backend and get the JSON object and load it to the table
	storOutletKeywordSearch.on('beforeload', function(store)
	{
		storOutletKeywordSearch.baseParams = {keywordValue:strOutletName};
	});
	
	storOutletKeywordSearch.load({callback:function()
	{
		var intSearchResultCount = storOutletKeywordSearch.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('gridOutletKeywordSearch').setAutoScroll(true);
			//Now show the table card layout
			Ext.getCmp('pnlSearchOutletKeywordCardLayout').layout.setActiveItem(1);
			Ext.Msg.hide();
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
			
			Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
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

var hanOutletKeywordSearchBack = function(btn)
{
	Ext.getCmp('pnlSearchOutletKeywordCardLayout').layout.setActiveItem(0);
}

var storOKSViewOutlet = new Ext.data.JsonStore(
{
    url: 'viewoutletdetails/showOutletDetails',
    root: 'data.Outlet',
    fields: 
    [
     	'outletId', 'outletName', 'outletDescription', 'outletUrl', 'outletFacebookUrl', 'outletTwitterUrl', 'circulation', 'frequency', 'medium', 'language', 'coverImage', 'outletType', 'publisherName', 'publisherWebsite', 'address1', 'address2', 'city', 'county', 'state', 'country', 'zipCode', 'phoneNumber', 'faxNumber', 'lastModified'
    ]
});

var hanOKSViewOutletDetails = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOutletKeywordSearch').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	storOKSViewOutlet.load({params: {oid:strOutletId}});
	var strOutletName = rec.get('outletName');
	
	var strTitle = strOutletName + " Details";
	
	showViewOutletDetailsWindow(strTitle, strOutletId, storOKSViewOutlet);
}

var storOKSViewOpportunityList = new Ext.data.JsonStore(
{
    url: 'viewopportunitylist',
    root: 'data.viewopportunitylist',
    fields: 
    [
     	'opportunityId', 'opportunityValue', 'opportunityDescription', 'publishingDate', 'docDeadlineDate', 'adDeadlineDate', 'contactEmail', 'lastModified'
    ]
});

var storOKSViewContactList = new Ext.data.JsonStore(
{
    url: 'viewcontactlist',
    root: 'data.viewcontactlist',
    fields: 
    [
     	'contactId', 'contactFirstName', 'contactLastName', 'contactDescription', 'contactPhoto', 'designation', 'contactPhone', 'contactEmail', 'alternativeEmail', 'contactUniversity', 'contactFacebook', 'contactLinkedin', 'contactTwitter', 'contactURL', 'lastModified'
    ]
});

var hanOKSViewOpportunitiesList = function(grid, rowIndex, colIndex)
{
	Ext.Msg.progress("Searching...", "Retriving opportunities please wait....", "Searching");
	
	var rec = Ext.getCmp('gridOutletKeywordSearch').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	
	storOKSViewOpportunityList.on('beforeload', function(store)
	{
		storOKSViewOpportunityList.baseParams = {oid:strOutletId};
	});
	
	storOKSViewOpportunityList.load({callback:function()
	{
		var intCount = storOKSViewOpportunityList.getCount();
		if(intCount > 0)
		{
			Ext.Msg.hide();
			var strOutletNameToView = rec.get('outletName');
			var strTitle = strOutletNameToView + " Opportunities Details";
			
			showViewOpportunityListWindow(strTitle, strOutletId, storOKSViewOpportunityList);
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

var hanOKSViewContactList = function(grid, rowIndex, colIndex)
{
	Ext.Msg.progress("Searching...", "Retriving contacts please wait....", "Searching");
	var rec = Ext.getCmp('gridOutletKeywordSearch').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
	
	storOKSViewContactList.on('beforeload', function(store)
	{
		storOKSViewContactList.baseParams = {oid:strOutletId};
	});
	
	storOKSViewContactList.load({callback:function()
	{
		var intCount = storOKSViewContactList.getCount();
		if(intCount > 0)
		{
			Ext.Msg.hide();
			var strOutletNameToView = rec.get('outletName');
			var strTitle = strOutletNameToView + " Contact Details";
			showViewContactListWindow(strTitle, strOutletId, storOKSViewContactList);
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

var hanOKSAddToMyOutlet = function(grid, rowIndex, colIndex)
{
	//Check for Reminder Subject not blank.
	var rec = Ext.getCmp('gridOutletKeywordSearch').getSelectionModel().getSelected();
	var strOutletId = rec.get('outletId');
		
	Ext.getCmp('gridOutletKeywordSearch').body.mask();
	
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
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridOutletKeywordSearch').body.unmask();
}

var hanOKSAddToMyReminder = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOutletKeywordSearch').getSelectionModel().getSelected();
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

var hanOKSAddToMyNote = function(grid, rowIndex, colIndex)
{
	var rec = Ext.getCmp('gridOutletKeywordSearch').getSelectionModel().getSelected();
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
	winAddOutletToMyNote.items.itemAt(0).items.itemAt(0).setValue("joseph");
	winAddOutletToMyNote.setTitle(strTitle);
	winAddOutletToMyNote.show();
}

var storOutletKeywordSearch = new Ext.data.JsonStore(
{
	root: 'data.searchOutletResult', 
	url: 'outletkeywordsearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'outletId'},{name: 'outletName'},{name: 'outletDescription'},{name: 'outletUrl'},{name: 'outletCirculation'},{name: 'outletFrequency'},{name: 'outletType'}
	]
},this);

var hanOKSAddComments = function(grid, rowIndex, colIndex)
{
	
}

var hanOKSViewComments = function(grid, rowIndex, colIndex)
{
	
}

var conmnuOutletKeywordSearch = new Ext.menu.Menu(
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
						handler: hanOKSViewOutletDetails
					},
					{
						text: 'Opportunities',
						tabTip: "View All Opportunities",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOKSViewOpportunitiesList
					},
					{
						text: 'Contact',
						tabTip: "View All contact Details",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOKSViewContactList
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
						handler: hanOKSAddToMyOutlet
					},
					{
						text: 'Reminder',
						tabTip: "Add Outlet to your Reminder",
						icon: '../assets/e/prc/icons/opportunity-icon.gif',
						handler: hanOKSAddToMyReminder
					},
					{
						text: 'Notes',
						tabTip: "Add Outlet to your Notes",
						icon: '../assets/e/prc/icons/contact-icon.gif',
						handler: hanOKSAddToMyNote
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
						handler: hanOKSAddComments
					},
					{
						text: 'View Comments',
						icon: '../assets/e/prc/icons/comment-view-icon.gif',
						tabTip: "View All comments",
						handler: hanOKSViewComments
					}
				]
			}
		}*/
	]
});
var expOUKSOutlet = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{outletDescription}</p>'
	)
});Ext.namespace('prc.reminder.reminderaddform');

prc.reminder.reminderaddform.ReminderAddForm = Ext.extend(Ext.form.FormPanel,
{
	initComponent: function ()
	{
		var config =
		{
			xtype: 'form',
			width: 440,
			height: 240,
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
					fieldLabel: 'Subject',
					name: 'subject',
					allowBlank: false, 
					width: 350,
					listeners: 
					{
						specialkey: function(field, e)
						{
							if(e.getKey() == e.ENTER)
							{
								hanAddReminderResult();
							}
						}
					}
				},
				{
					xtype: 'textarea',
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
							allowBlank: false,
							emptyText: 'From Time',
							name: 'startTime'
						},
						{
							xtype: 'timefield',
							allowBlank: false,
							emptyText: 'To Time',
							name: 'endTime'
						}
					]
				},
				{
					xtype: 'compositefield',
					fieldLabel: 'Email Publishing',
					defaults:
					{
						flex: 1
					},
					items:
					[
						{
							xtype: 'checkboxgroup',
							fieldLabel: 'Outlet Type', 
							columns: 1,
							items:
							[
								{
									boxLabel: 'Send Email before',
									handler: this.hanEnable,
									scope:this
								}
							]
						},
						{
							xtype: 'combo',
							store: storSendEmailValue,
							displayField: 'name',
							valueField:'id',
							typeAhead: true,
							mode: 'local',
							forceSelection: true,
							triggerAction: 'all',
							selectOnFocus: true,
							disabled: true
						},
						{
							xtype: 'combo',
							store: storSendEmailType,
							displayField: 'name',
							valueField:'id',
							typeAhead: true,
							mode: 'local',
							forceSelection: true,
							triggerAction: 'all',
							selectOnFocus: true,
							disabled: true
						}
					]
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Email Address',
					name: 'email_address',
					allowBlank: false,
					width: 350,
					disabled: true,
					listeners: 
					{
						specialkey: function(field, e)
						{
							if(e.getKey() == e.ENTER)
							{
								hanAddReminderResult();
							}
						}
					}
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
						this.findParentByType('form').getForm().reset();
					} 
				},
				{
					xtype: 'button',
					icon: '../assets/e/prc/icons/add-button-icon.gif',
					iconAlign: 'left',
					text: 'Add Reminder',
					height: 25,
					formBind: true,
					handler: this.hanAddReminderResult,
					scope:this
				}
			]
		};

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		prc.reminder.reminderaddform.ReminderAddForm.superclass.initComponent.apply(this, arguments);
	},
	hanEnable: function()
	{
		if(this.items.itemAt(3).items.itemAt(0).items.itemAt(0).getValue())
		{
			this.items.itemAt(3).items.itemAt(1).enable();
			this.items.itemAt(3).items.itemAt(2).enable();
			this.items.itemAt(4).enable();
		}
		else
		{
			this.items.itemAt(3).items.itemAt(1).disable();
			this.items.itemAt(3).items.itemAt(2).disable();
			this.items.itemAt(4).disable();
		}
	},
	hanAddReminderResult: function ()
	{
		//Check for Reminder Subject not blank.
		strReminderSubject = this.items.itemAt(0).getValue();
		strReminderDetails = this.items.itemAt(1).getValue();
		strReminderDate = this.items.itemAt(2).items.itemAt(0).getValue();
		strFromTime = this.items.itemAt(2).items.itemAt(1).getValue();
		strToTime = this.items.itemAt(2).items.itemAt(2).getValue();
		
		boolEmailPublishing = this.items.itemAt(3).items.itemAt(0).items.itemAt(0).getValue();
				
		if(boolEmailPublishing)
		{
			strEmailPublishing = "Y";
			strSendValue = this.items.itemAt(3).items.itemAt(1).getValue();
			strSentType = this.items.itemAt(3).items.itemAt(2).getValue();
			strEmailAddress = this.items.itemAt(4).getValue();
			
		}
		else
		{
			strEmailPublishing = "N";
			strSendValue = 0;
			strSentType = "";
			strEmailAddress = "";
		}
			
		if(strReminderSubject.length == 0)
		{
			Ext.Msg.show(
			{
				title: 'Blank Reminder Subject ',
				msg: "Reminder Subject is empty Please give a valid keyword",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
			return;
		}
		Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
		//Connect to backend and get the JSON object and load it to the table
		
		var conn = new Ext.data.Connection();
		conn.request(
		{
			url: 'reminderadd',
			method: 'POST',
			params: 
			{
				subject: strReminderSubject, 
				details: strReminderDetails,
				date: strReminderDate,
				startTime: strFromTime,
				endTime: strToTime,
				emailPublishing: strEmailPublishing,
				sendEmailValue: strSendValue,
				sendEmailType: strSentType,
				sendEmailAddress: strEmailAddress
			},
			success: function(responseObject)
			{
				Ext.Msg.show(
				{
					title: 'Successful',
					msg: "Reminder added successfully!",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
				
				this.getForm().reset();
				var winParent = this.findParentByType('window');
				if(winParent != null)
				{
					winParent.hide();
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
			},
			scope: this
		});
		
		Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
		Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
		Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	}

});

Ext.reg('formreminderadd', prc.reminder.reminderaddform.ReminderAddForm);
Ext.namespace('prc.reminder.reminderadd');

var hanAddReminder = function(btn)
{
	var sbarPRC = Ext.getCmp('sbarPRC');
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/reminder-add.htm');
	sbarPRC.showBusy("Loading Add Reminder Screen");
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Reminder Add Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmAddReminder'))
	{
		tabCenter.setActiveTab('tabitmAddReminder');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Add Reminder',
		tabTip: 'Add Reminder',
		id: 'tabitmAddReminder',
		closable: true,
		iconCls: 'iconReminderAdd',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlAddReminderCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
						{
						xtype: 'panel',
						id: 'pnlAddReminder',
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
								xtype: 'formreminderadd',
								title: 'Add Reminder'
							}
						]
					}
				]
			}
		]
	});
	sbarPRC.showBusy("Add Reminder Screen Successfully");
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmAddReminder');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Add Reminder Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	sbarPRC.clearStatus({useDefaults:true});
}

Ext.namespace('prc.reminder.remindermanage');

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
												icon: '../assets/e/prc/icons/back-icon.gif',
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
	
	Ext.Msg.progress("Searching...", "Searching reminder please wait....", "Searching");
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Reminders', true);
	//Connect to backend and get the JSON object and load it to the table
	
	storReminderSearch.on('beforeload', function(store)
	{
		storReminderSearch.baseParams = {subject: strReminderSubject, details: strReminderDetails, date: strReminderDate, startTime: strFromTime, endTime: strToTime };
	});
	
	storReminderSearch.load({callback:function()
	{
		var intSearchResultCount = storReminderSearch.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Reminder Search Result', true);
			Ext.getCmp('gridSearchReminder').setAutoScroll(true);
			//Now show the table card layout
			Ext.Msg.hide();
			Ext.getCmp('pnlManageReminderCardLayout').layout.setActiveItem(1);
			Ext.getCmp('pbarPRC').updateProgress(1.0, 'Reminder Search Loaded Successfully', true);
			//Ext.getCmp('btnShowPreviousSearch').enable();
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
		else
		{
			Ext.Msg.hide();
			Ext.Msg.show(
			{
				title: 'No Data',
				msg: "No remainder found for your search criteria",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
	}});
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
								id: 'btnClose',
								icon: '../assets/e/prc/icons/close-icon.gif',
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
		title: 'Delete Reminder',
		msg: "Are you sure you want to delete the reminder",
		width: 300,
		buttons: Ext.MessageBox.YESNO,
		icon: Ext.MessageBox.QUESTION,
		fn: checkResult
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
Ext.namespace('prc.reminder.remindermanageform');

prc.reminder.remindermanageform.ReminderModifyForm = Ext.extend(Ext.form.FormPanel,
{
	strReminderIdToModify: "",
	initComponent: function ()
	{
		var config =
		{
			xtype: 'form',
			width: 440,
			height: 240,
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
					fieldLabel: 'Subject',
					name: 'subject',
					allowBlank: false, 
					width: 350,
					listeners: 
					{
						specialkey: function(field, e)
						{
							if(e.getKey() == e.ENTER)
							{
								hanModifyReminderResult();
							}
						}
					}
				},
				{
					xtype: 'textarea',
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
							name: 'startTime'
						},
						{
							xtype: 'timefield',
							name: 'endTime'
						}
					]
				},
				{
					xtype: 'compositefield',
					fieldLabel: 'Email Publishing',
					defaults:
					{
						flex: 1
					},
					items:
					[
						{
							xtype: 'checkbox',
							boxLabel: 'Send Email',
							handler: this.hanEnable,
							scope:this
						},
						{
							xtype: 'combo',
							store: storSendEmailValue,
							displayField: 'name',
							valueField:'id',
							typeAhead: true,
							mode: 'local',
							forceSelection: true,
							triggerAction: 'all',
							selectOnFocus: true,
							disabled: true
						},
						{
							xtype: 'combo',
							store: storSendEmailType,
							displayField: 'name',
							valueField:'id',
							typeAhead: true,
							mode: 'local',
							forceSelection: true,
							triggerAction: 'all',
							selectOnFocus: true,
							disabled: true
						}
					]
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Email Address',
					name: 'email_address',
					allowBlank: false,
					width: 350,
					disabled: true,
					listeners: 
					{
						specialkey: function(field, e)
						{
							if(e.getKey() == e.ENTER)
							{
								hanModifyReminderResult();
							}
						}
					}
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
						this.findParentByType('form').getForm().reset();
					} 
				},
				{
					xtype: 'button',
					icon: '../assets/e/prc/icons/modify-button-icon.gif',
					iconAlign: 'left',
					text: 'Modify Reminder',
					height: 25,
					formBind: true,
					handler: this.hanModifyReminderResult,
					scope:this
				}
			]
		};

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		prc.reminder.remindermanageform.ReminderModifyForm.superclass.initComponent.apply(this, arguments);
	},
	hanEnable: function()
	{
		if(this.items.itemAt(3).items.itemAt(0).getValue())
		{
			this.items.itemAt(3).items.itemAt(1).enable();
			this.items.itemAt(3).items.itemAt(2).enable();
			this.items.itemAt(4).enable();
		}
		else
		{
			this.items.itemAt(3).items.itemAt(1).disable();
			this.items.itemAt(3).items.itemAt(2).disable();
			this.items.itemAt(4).disable();
		}
	},
	hanModifyReminderResult: function ()
	{
		//Check for Reminder Subject not blank.
		strReminderSubject = this.items.itemAt(0).getValue();
		strReminderDetails = this.items.itemAt(1).getValue();
		strReminderDate = this.items.itemAt(2).items.itemAt(0).getValue();
		strFromTime = this.items.itemAt(2).items.itemAt(1).getValue();
		strToTime = this.items.itemAt(2).items.itemAt(2).getValue();
		
		boolEmailPublishing = this.items.itemAt(3).items.itemAt(0).getValue();
				
		if(boolEmailPublishing)
		{
			strEmailPublishing = "Y";
			strSendValue = this.items.itemAt(3).items.itemAt(1).getValue();
			strSentType = this.items.itemAt(3).items.itemAt(2).getValue();
			strEmailAddress = this.items.itemAt(4).getValue();
			
		}
		else
		{
			strEmailPublishing = "N";
			strSendValue = 0;
			strSentType = "";
			strEmailAddress = "";
		}
			
		if(strReminderSubject.length == 0)
		{
			Ext.Msg.show(
			{
				title: 'Blank Reminder Subject ',
				msg: "Reminder Subject is empty Please give a valid input",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
			return;
		}
		Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Outlets', true);
		//Connect to backend and get the JSON object and load it to the table
		
		var conn = new Ext.data.Connection();
		conn.request(
		{
			url: 'remindermodify',
			method: 'POST',
			params: 
			{
				id: this.strReminderIdToModify,
				subject: strReminderSubject, 
				details: strReminderDetails,
				date: strReminderDate,
				startTime: strFromTime,
				endTime: strToTime,
				emailPublishing: strEmailPublishing,
				sendEmailValue: strSendValue,
				sendEmailType: strSentType,
				sendEmailAddress: strEmailAddress
			},
			success: function(responseObject)
			{
				Ext.Msg.show(
				{
					title: 'Successful',
					msg: "Reminder modifiked successfully!",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
				
				this.getForm().reset();
				var winParent = this.findParentByType('window');
				if(winParent != null)
				{
					winParent.hide();
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
			},
			scope: this
		});
		
		Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
		Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
		Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	}
});

Ext.reg('formremindermodify', prc.reminder.remindermanageform.ReminderModifyForm);
Ext.namespace('prc.mysubscription.changepassword');

var hanRenewSubscription = function(btn)

{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/my-profile-details.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening My Profile Details Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmMyProfileDetails'))
	{
		tabCenter.setActiveTab('tabitmMyProfileDetails');
		return;
	}
	
	tabCenter.add(
	{
		title: 'My Profile Details',
		tabTip: 'My Profile Details',
		id: 'tabitmMyProfileDetails',
		closable: true,
		iconCls: 'iconMyProfileDetails',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlMyProfileDetailsCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						id: 'pnlMyProfileDetails',
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
								title: 'Renew Subscription',
								xtype: 'form',
								width: 400,
								height: 110,
								id: 'formMyProfileDetails',
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
										xtype: 'combo',
										id: 'cmbSubscritionType',
										fieldLabel: 'Subscription Type',
										store: storSubscriptionType,
										displayField: 'name',
										valueField:'id',
										typeAhead: true,
										mode: 'local',
										forceSelection: true,
										triggerAction: 'all',
										selectOnFocus: true
									}
								],
								buttons:
								[
									{
										xtype: 'button',
										icon: '../assets/e/prc/icons/save-icon.gif',
										iconAlign: 'left',
										text: 'Renew Subscription',
										height: 25,
										formBind: true,
										handler: hanRenewSubscriptionSubmit,
										scope: this
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
	tabCenter.setActiveTab('tabitmMyProfileDetails');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Outlets Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanRenewSubscriptionSubmit = function(btn)
{
	var strUserName = Ext.getCmp('cmbSubscritionType').getValue();

	var conn = new Ext.data.Connection();
	conn.request(
	{
		url: 'renewsubscription',
		method: 'POST',
		params: 
		{
			userName: strUserName
		},
		success: function(responseObject)
		{
			Ext.Msg.show(
			{
				title: 'Successful',
				msg: "Your Profile details are updates Successfully!",
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
		},
		scope: this
	});
	
	//Now show the table card layout
	Ext.getCmp('pnlMyProfileDetailsCardLayout').layout.setActiveItem(1);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
	Ext.getCmp('btnShowPreviousSearch').enable();
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
};var storSendEmailValue = new Ext.data.ArrayStore(
{
	data: 
	[
		['1', '1'],['2', '2'],['3', '3'],['4', '4'],['5', '5'],['6', '6'],['7', '7'],['8', '8'],['9', '9'],['10', '10'],['11', '11'],['12', '12'],['13', '13'],['14', '14'],['15', '15'],['16', '16'],['17', '17'],['18', '18'],['19', '19'],['20', '20'],['21', '21'],['22', '22'],['23', '23'],['24', '24'],['25', '25'],['26', '26'],['27', '27'],['28', '28'],['29', '29'],['30', '30'],['31', '31']
	],
	fields: ['id', 'name']
});

var storSendEmailType = new Ext.data.ArrayStore(
{
	data: 
	[
		['D', 'Day (s)']//,['W', 'Week (s)']
	],
	fields: ['id', 'name']
});
var storSubscriptionType = new Ext.data.ArrayStore(
{
	data: 
	[
		['PRO', 'Pro'],['ENT', 'Enterprise']
	],
	fields: ['id', 'name']
});


var storCustomerCareIssueType = new Ext.data.ArrayStore(
{
	data: 
	[
		['I1', 'Website Not Working'], ['I2', 'Search Error'], ['I3', 'Data not Found'], ['I4', 'Custom Research Request'], ['I5', 'Other']
	],
	fields: ['id', 'name']
});
var storViewContactDetails = new Ext.data.JsonStore(
{
    url: 'viewcontactdetails',
    root: 'data.ViewContactDetails',
    fields: 
    [
    	'contactId', 'contactFirstName', 'contactLastName', 'contactDescription', 'contactPhoto', 'designation', 'contactPhone', 'contactEmail', 'alternativeEmail', 'contactUniversity', 'contactFacebook', 'contactLinkedin', 'contactTwitter', 'contactURL', 'lastModified'
    ]
});var hanDeleteTask = function(btn)
{
}
var hanModifyTask = function(btn)
{
}
var hanSearchTask = function(btn)
{
}
var tplViewOutletDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{outletId}">',
    		'<div align="center" class="outlet-heading">{outletName}</div>',
    		'<div class="outlet-image"><img class=cover-page src="../assets/e/prc/images/no-image-available.jpg"><div><div class="outlet-description">{outletDescription}</div>',
    		// '<div class="outlet-image"><img class=cover-page src="../assets/e/prc/images/{coverImage}"><div><div class="outlet-description">{outletDescription}</div>',
    		'<br />',
    		'<table width=100%>',
    			'<tpl if="this.isValidURL(outletUrl)">',
        			'<tr><td class="outlet-field">Outlet URL</td><td class="outlet-value"><a target="blank" href="{outletUrl}">{outletUrl}</a></td></tr>',
        		'</tpl>',
        		'<tpl if="!this.isValidURL(outletUrl)">',
        			'<tr><td class="outlet-field">Outlet URL</td><td class="outlet-value">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(outletFacebookUrl)">',
    			'<tr><td class="outlet-field">Facebook</td><td class="outlet-value"><a target="blank" href="{outletFacebookUrl}">{outletFacebookUrl}</a></td></tr>',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(outletFacebookUrl)">',
        			'<tr><td class="outlet-field">Facebook</td><td class="outlet-value">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(outletTwitterUrl)">',
    			'<tr><td class="outlet-field">Twitter</td><td class="outlet-value"><a target="blank" href="{outletTwitterUrl}">{outletTwitterUrl}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(outletTwitterUrl)">',
	    			'<tr><td class="outlet-field">Twitter</td><td class="outlet-value">Not available. Please check back later</td></tr>',
	    		'</tpl>',
	    		
    			'<tr><td class="outlet-field">Circulation</td><td class="outlet-value">{circulation}</a></td></tr>',
    			'<tr><td class="outlet-field">Frequency</td><td class="outlet-value">{frequency}</a></td></tr>',
    			'<tr><td class="outlet-field">Medium</td><td class="outlet-value">{medium}</a></td></tr>',
    			'<tr><td class="outlet-field">Language</td><td class="outlet-value">{language}</a></td></tr>',
    			'<tr><td class="outlet-field">Type</td><td class="outlet-value">{outletType}</a></td></tr>',
    			'<tr><td class="outlet-field">Pub Name</td><td class="outlet-value">{publisherName}</a></td></tr>',

        		'<tpl if="this.isValidURL(publisherWebsite)">',
    			'<tr><td class="outlet-field">Pub Website</td><td class="outlet-value"><a target="blank" href="{publisherWebsite}">{publisherWebsite}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(publisherWebsite)">',
	    			'<tr><td class="outlet-field">Pub Website</td><td class="outlet-value">Not available. Please check back later</td></tr>',
	    		'</tpl>',

    			'<tr><td class="outlet-field">Address 1</td><td class="outlet-value">{address1}</a></td></tr>',
    			'<tr><td class="outlet-field">Address 2</td><td class="outlet-value">{address2}</a></td></tr>',
    			'<tr><td class="outlet-field">City</td><td class="outlet-value">{city}</a></td></tr>',
    			'<tr><td class="outlet-field">County</td><td class="outlet-value">{county}</a></td></tr>',
    			'<tr><td class="outlet-field">State</td><td class="outlet-value">{state}</a></td></tr>',
    			'<tr><td class="outlet-field">Country</td><td class="outlet-value">{country}</a></td></tr>',
    			'<tr><td class="outlet-field">ZipCode</td><td class="outlet-value">{zipCode}</a></td></tr>',
    			'<tr><td class="outlet-field">Phone Number</td><td class="outlet-value">{phoneNumber}</a></td></tr>',
    			'<tr><td class="outlet-field">Fax Number</td><td class="outlet-value">{faxNumber}</a></td></tr>',
    			'<tr><td class="outlet-field">Last Modified</td><td class="outlet-value">{lastModified}</a></td></tr>',
    		'</table>',
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

var tplViewOpportunityList = new Ext.XTemplate(
	'<div align="center" class="opportunity-heading">List of Opportunities</div>',
	'<tpl for=".">',
    	'<tpl if="this.getFirstTwoCharacters(opportunityId) == ' + "'OP'" + '">',
	    	'<div id="{opportunityId}">',
	    		'<table width=100%>',
	    			'<tr><td class="opportunity-field">Opportunity</td><td class="opportunity-value">{opportunityValue}</a></td></tr>',
	        		'<tr><td class="opportunity-field">Description</td><td class="opportunity-value">{opportunityDescription}</a></td></tr>',
	        		'<tr><td class="opportunity-field">Publishing Date</td><td class="opportunity-value">{publishingDate}</a></td></tr>',
	        		'<tr><td class="opportunity-field">Doc Date</td><td class="opportunity-value">{docDeadlineDate}</a></td></tr>',
	        		'<tr><td class="opportunity-field">Ad Date</td><td class="opportunity-value">{adDeadlineDate}</a></td></tr>',
	        		'<tr><td class="opportunity-field">Contact Email</td><td class="opportunity-value">{contactEmail}</a></td></tr>',
	        		//'<tr><td class="opportunity-field">Last modified</td><td class="opportunity-value">{lastModified}</a></td></tr>',
	        		'<hr />',
	    		'</table>',
	    	'</div>',
    	'</tpl>',
    '</tpl>',
    '<div class="x-clear"></div>',
    {
    	getFirstTwoCharacters: function(strOpportunityId)
    	{
    		return strOpportunityId.substring(0, 2);
    	}
    }
);

var tplViewContactList = new Ext.XTemplate(
	'<tpl for=".">',
	   	'<tpl if="this.getFirstCharacters(contactId) == ' + "'C'" + '">',
	    	'<div id="{contactId}">',
	    		'<div align="center" class="outlet-heading">{contactFirstName} {contactLastName}</div>',
	    		'<div class="outlet-image"><img class=cover-page src="images/{contactPhoto}"></td><td class="outlet-description">{contactDescription}</div>',
	    		'<br />',
	    		'<table width=100%>',
	    			'<tr><td class="contact-field">Designation</td><td class="contact-value">{designation}</td></tr>',
	        		'<tr><td class="contact-field">Phone Number</td><td class="contact-value">{contactPhone}</td></tr>',
	        		'<tr><td class="contact-field">Email</td><td class="contact-value">{contactEmail}</td></tr>',
	        		
	        		'<tpl if="this.isValidURL(contactURL)">',
	        			'<tr><td class="contact-field">Contact Website</td><td class="contact-value"><a target="blank" href="{contactURL}">{contactURL}</a></td></tr>',
	        		'</tpl>',
	        		'<tpl if="!this.isValidURL(contactURL)">',
	        			'<tr><td class="contact-field">Contact Website</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
	        		'</tpl>',
	        		
	        		'<tr><td class="contact-field">Alternative Email</td><td class="contact-value">{alternativeEmail}</a></td></tr>',
	        		'<tr><td class="contact-field">University</td><td class="contact-value">{contactUniversity}</a></td></tr>',
	        		'<tpl if="this.isValidURL(contactFacebook)">',
	    					'<tr><td class="contact-field">Facebook</td><td class="contact-value"><a target="blank" href="{contactFacebook}">{contactFacebook}</a></td></tr>',
		        	'</tpl>',
	        		'<tpl if="!this.isValidURL(contactFacebook)">',
	        			'<tr><td class="contact-field">Facebook</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
	        		'</tpl>',
	        		'<tpl if="this.isValidURL(contactLinkedin)">',
	    					'<tr><td class="contact-field">Linked In</td><td class="contact-value"><a target="blank" href="{contactLinkedin}">{contactLinkedin}</a></td></tr>',
		        	'</tpl>',
	        		'<tpl if="!this.isValidURL(contactLinkedin)">',
	        			'<tr><td class="contact-field">Linked In</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
	        		'</tpl>',
	        		'<tpl if="this.isValidURL(contactTwitter)">',
	    					'<tr><td class="contact-field">Twitter</td><td class="contact-value"><a target="blank" href="{contactTwitter}">{contactTwitter}</a></td></tr>',
		    			'</tpl>',
		    			'<tpl if="!this.isValidURL(contactTwitter)">',
		    				'<tr><td class="contact-field">Twitter</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
		    			'</tpl>',
	    			'<tr><td class="contact-field">Last modified</td><td class="contact-value">{lastModified}</a></td></tr>',
	    		'</table>',
	    		'<br /><br /><br />',
	    	'</div>',
	    '</tpl>',
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
    	},
    	getFirstCharacters: function(strContactId)
    	{
    		return strContactId.substring(0, 1);
    	}
    }
);

//Opportunities
var tplOPKSViewOpportunityDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{opportunityId}">',
    		'<div align="center" class="opportunity-heading">{opportunityValue}</div>',
    		'<table>',
        		'<tr><td class="opportunity-field">Description</td><td class="opportunity-value">{opportunityDescription}</a></td></tr>',
    			'<tr><td class="opportunity-field">Publishing Date</td><td class="opportunity-value">{publishingDate}</a></td></tr>',
    			'<tr><td class="opportunity-field">Doc Deadline Date</td><td class="opportunity-value">{docDeadlineDate}</a></td></tr>',
    			'<tr><td class="opportunity-field">Ad Deadline Date</td><td class="opportunity-value">{adDeadlineDate}</a></td></tr>',
    			
				'<tpl if="this.isValidEmail(contactEmail)">',
        			'<tr><td class="opportunity-field">Email</td><td class="opportunity-value"><a target="blank" href="{contactEmail}">{contactEmail}</a></td></tr>',
        		'</tpl>',
        		'<tpl if="!this.isValidEmail(contactEmail)">',
        			'<tr><td class="opportunity-field">Email</td><td class="opportunity-not-found">NA</td></tr>',
        		'</tpl>',
        		
    			'<tr><td class="opportunity-field">Last Modified</td><td class="opportunity-value">{lastModified}</a></td></tr>',
    		'</table>',
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

var tplOPKSViewOuttletDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{outletId}">',
    		'<div align="center" class="outlet-heading">{outletName}</div>',
    		'<div class="outlet-image"><img class=cover-page src="../assets/e/prc/images/no-image-available.jpg"><div><div class="outlet-description">{outletDescription}</div>',
    		// '<div class="outlet-image"><img class=cover-page src="../assets/e/prc/images/{coverImage}"><div><div class="outlet-description">{outletDescription}</div>',
    		'<br />',
    		'<table width=100%>',
    			'<tpl if="this.isValidURL(outletUrl)">',
        			'<tr><td class="outlet-field">Outlet URL</td><td class="outlet-value"><a target="blank" href="{outletUrl}">{outletUrl}</a></td></tr>',
        		'</tpl>',
        		'<tpl if="!this.isValidURL(outletUrl)">',
        			'<tr><td class="ocontact-value>Outlet URL</td><td class="outlet-value">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(outletFacebookUrl)">',
    			'<tr><td class="outlet-field">Facebook</td><td class="outlet-value"><a target="blank" href="{outletFacebookUrl}">{outletFacebookUrl}</a></td></tr>',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(outletFacebookUrl)">',
        			'<tr><td class="outlet-field">Facebook</td><td class="outlet-value">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(outletTwitterUrl)">',
    			'<tr><td class="outlet-field">Twitter</td><td class="outlet-value"><a target="blank" href="{outletTwitterUrl}">{outletTwitterUrl}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(outletTwitterUrl)">',
	    			'<tr><td class="outlet-field">Twitter</td><td class="outlet-value">Not available. Please check back later</td></tr>',
	    		'</tpl>',
	    		
    			'<tr><td class="outlet-field">Circulation</td><td class="outlet-value">{circulation}</a></td></tr>',
    			'<tr><td class="outlet-field">Frequency</td><td class="outlet-value">{frequency}</a></td></tr>',
    			'<tr><td class="outlet-field">Medium</td><td class="outlet-value">{medium}</a></td></tr>',
    			'<tr><td class="outlet-field">Language</td><td class="outlet-value">{language}</a></td></tr>',
    			'<tr><td class="outlet-field">Type</td><td class="outlet-value">{outletType}</a></td></tr>',
    			'<tr><td class="outlet-field">Pub Name</td><td class="outlet-value">{publisherName}</a></td></tr>',

        		'<tpl if="this.isValidURL(publisherWebsite)">',
    			'<tr><td class="outlet-field">Pub Website</td><td class="outlet-value"><a target="blank" href="{publisherWebsite}">{publisherWebsite}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(publisherWebsite)">',
	    			'<tr><td class="outlet-field">Pub Website</td><td class="outlet-value">Not available. Please check back later</td></tr>',
	    		'</tpl>',

    			'<tr><td class="outlet-field">Address 1</td><td class="outlet-value">{address1}</a></td></tr>',
    			'<tr><td class="outlet-field">Address 2</td><td class="outlet-value">{address2}</a></td></tr>',
    			'<tr><td class="outlet-field">City</td><td class="outlet-value">{city}</a></td></tr>',
    			'<tr><td class="outlet-field">County</td><td class="outlet-value">{county}</a></td></tr>',
    			'<tr><td class="outlet-field">State</td><td class="outlet-value">{state}</a></td></tr>',
    			'<tr><td class="outlet-field">Country</td><td class="outlet-value">{country}</a></td></tr>',
    			'<tr><td class="outlet-field">ZipCode</td><td class="outlet-value">{zipCode}</a></td></tr>',
    			'<tr><td class="outlet-field">Phone Number</td><td class="outlet-value">{phoneNumber}</a></td></tr>',
    			'<tr><td class="outlet-field">Fax Number</td><td class="outlet-value">{faxNumber}</a></td></tr>',
    			'<tr><td class="outlet-field">Last Modified</td><td class="outlet-value">{lastModified}</a></td></tr>',
    		'</table>',
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

var tplViewContactDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{contactId}">',
    		'<div align="center" class="contact-heading">{contactName}</div>',
    		'<div class="contact-image"><img class=cover-page src="images/{contactPhoto}"><div><div class="contact-description">{contactDescription}</div>',
    		'<br />',
    		'<table width="100%">',
        		'<tr><td class="contact-field">First Name</td><td class="contact-value">{contactFirstName}</a></td></tr>',
    			'<tr><td class="contact-field">Last Name</td><td class="contact-value">{contactLastName}</a></td></tr>',
    			'<tr><td class="contact-field">Designation</td><td class="contact-value">{designation}</a></td></tr>',
    			'<tr><td class="contact-field">Phone Number</td><td class="contact-value">{contactPhone}</a></td></tr>',
    			
				'<tpl if="this.isValidEmail(contactEmail)">',
        			'<tr><td class="contact-field">Email</td><td class="contact-value"><a target="blank" href="{contactEmail}">{contactEmail}</a></td></tr>',
        		'</tpl>',
        		'<tpl if="!this.isValidEmail(contactEmail)">',
        			'<tr><td class="contact-field">Email</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		
        		'<tpl if="this.isValidEmail(alternativeEmail)">',
        			'<tr><td class="contact-field">Alternative Email</td><td class="contact-value"><a target="blank" href="{alternativeEmail}">{alternativeEmail}</a></td></tr>',
        		'</tpl>',
        		'<tpl if="!this.isValidEmail(alternativeEmail)">',
        			'<tr><td class="contact-field">Alternative Email</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		
        		'<tr><td class="contact-field">University</td><td class="contact-value">{contactUniversity}</a></td></tr>',
        		'<tpl if="this.isValidURL(contactFacebook)">',
    			'<tr><td class="contact-field">Facebook</td><td class="contact-value"><a target="blank" href="{contactFacebook}">{contactFacebook}</a></td></tr>',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(contactFacebook)">',
        			'<tr><td class="contact-field">Facebook</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactLinkedin)">',
    			'<tr><td class="contact-field">Linked In</td><td class="contact-value"><a target="blank" href="{contactLinkedin}">{contactLinkedin}</a></td></tr>',
	        		'</tpl>',
        		'<tpl if="!this.isValidURL(contactLinkedin)">',
        			'<tr><td class="contact-field">Linked In</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
        		'</tpl>',
        		'<tpl if="this.isValidURL(contactTwitter)">',
    			'<tr><td class="contact-field">Twitter</td><td class="contact-value"><a target="blank" href="{contactTwitter}">{contactTwitter}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(contactTwitter)">',
	    			'<tr><td class="contact-field">Twitter</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
	    		'</tpl>',
	    		'<tpl if="this.isValidURL(contactURL)">',
    			'<tr><td class="contact-field">Website/Blog</td><td class="contact-value"><a target="blank" href="{contactURL}">{contactURL}</a></td></tr>',
	    		'</tpl>',
	    		'<tpl if="!this.isValidURL(contactURL)">',
	    			'<tr><td class="contact-field">Website/Blog</td><td class="contact-not-found">Not available. Please check back later</td></tr>',
	    		'</tpl>',
    			'<tr><td class="contact-field">Last Modified</td><td class="contact-value">{lastModified}</a></td></tr>',
    		'</table>',
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
    	},
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
);Ext.BLANK_IMAGE_URL = '../assets/e/extjs/images/default/s.gif';

var winTipOfTheDay;

Ext.onReady(function()
{
    if (! winTipOfTheDay)
	{
		winTipOfTheDay = new Ext.Window(
		{
			title: 'Tip of the Day!',
			closeAction: 'hide',
			id: 'winTipOfTheDay',
			iconCls: 'iconPRC',
			width: 400,
			height: 250,
			layout: 'border',
			border: false,
			items: 
			[
				{
					border: true,
					width: 50,
					region: 'west',
					xtype: 'panel',
					bodyStyle: 'background-image: url(../assets/e/extjs/images/default/window/icon-info.gif); background-repeat: no-repeat;padding: 10px;'
				},
				{
					border: true,
					region: 'center',
					xtype: 'panel',
					autoLoad:
					{ 
						url:'autoload-content.php' 
					}
				},
				{
					region: 'south',
					height: 22,
					border: false,
					bbar: 
					{
						xtype: 'toolbar',
						border: 0,
						items: 
						[
							{
								xtype: 'checkbox',
								boxLabel: 'Don\'t show this again'
							},'->',
							{
								xtype: 'button',
								text:'Next'
							},
							{
								xtype: 'button',
								text:'Previous'
							},
							{
								xtype: 'button',
								text: 'Close',
								handler: function()
								{
									winTipOfTheDay.hide();
								}
							}
						]
					}
				}
			]
		});
	}
	//winTipOfTheDay.show();

});

function getSubscriptionTypeName(strSubscriptionType)
{
	if(strSubscriptionType == "EN")
	{
		strSubscriptionType = "Enterprise Edition";
	}
	else if(strSubscriptionType == "PR")
	{
		strSubscriptionType = "Pro Edition";
	}
	return strSubscriptionType;
}
