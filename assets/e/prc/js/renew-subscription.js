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
}