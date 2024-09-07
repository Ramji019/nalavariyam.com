Ext.namespace('PRC');

PRC.NoteSearchForm = Ext.extend(Ext.form.FormPanel,
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
					icon: '../icons/icon.gif',
					iconAlign: 'left',
					handler: function()
					{
						Ext.getCmp('formSearchNote').getForm().reset();
					} 
				},
				{
					xtype: 'button',
					icon: 'icons/icon.gif',
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
		PRC.NoteSearchForm.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg('formnotesearch', PRC.NoteSearchForm);