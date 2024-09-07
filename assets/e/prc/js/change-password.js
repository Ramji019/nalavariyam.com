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
										icon: '../icons/icon.gif',
										iconAlign: 'left',
										handler: function()
										{
											Ext.getCmp('formChangePassword').getForm().reset();
										} 
									},
									{
										xtype: 'button',
										icon: 'icons/icon.gif',
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

