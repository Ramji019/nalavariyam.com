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
										icon: '../icons/icon.gif',
										iconAlign: 'left',
										handler: function()
										{
											Ext.getCmp('formAddAppointment').getForm().reset();
										} 
									},
									{
										xtype: 'button',
										icon: 'icons/icon.gif',
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

