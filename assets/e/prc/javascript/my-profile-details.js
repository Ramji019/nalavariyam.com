Ext.namespace('prc.mysubscription.myprofiledetails');

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
};