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
