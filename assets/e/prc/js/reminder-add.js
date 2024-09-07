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

