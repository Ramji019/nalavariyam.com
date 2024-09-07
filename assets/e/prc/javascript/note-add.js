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
};