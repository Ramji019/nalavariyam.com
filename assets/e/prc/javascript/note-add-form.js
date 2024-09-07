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
