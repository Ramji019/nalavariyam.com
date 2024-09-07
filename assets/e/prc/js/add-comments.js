var hanAdvanceSearchOutlets = function(btn)
{
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Search Outlets', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	if(Ext.getCmp('tabitmAdvanceSearchOutlets'))
	{
		tabCenter.setActiveTab('tabitmAdvanceSearchOutlets');
		return;
	}
	
	tabCenter.add(
	{
		title: 'Advance Search Outlets',
		tabTip: 'Advance Search Outlets',
		id: 'tabitmAdvanceSearchOutlets',
		closable: true,
		iconCls: 'iconPRC',
		layout: 'hbox',
		layoutConfig:
		{
			pack: 'center',
			align: 'middle'
		},
		items: 
		[
		{
            xtype:'htmleditor',
            id:'bio',
            fieldLabel:'Biography',
            height:200,
            anchor:'98%'
        }],

        buttons: [{
            text: 'Save'
        },{
            text: 'Cancel'
        }]

	});
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmAdvanceSearchOutlets');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Outlets Loaded', true);
}
