Ext.namespace('PRC');

PRC.ReminderModifyForm = Ext.extend(Ext.form.FormPanel,
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
		PRC.ReminderModifyForm.superclass.initComponent.apply(this, arguments);
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

Ext.reg('formremindermodify', PRC.ReminderModifyForm);
