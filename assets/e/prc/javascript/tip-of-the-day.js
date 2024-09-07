Ext.BLANK_IMAGE_URL = '../assets/e/extjs/images/default/s.gif';

var winTipOfTheDay;

Ext.onReady(function()
{
    if (! winTipOfTheDay)
	{
		winTipOfTheDay = new Ext.Window(
		{
			title: 'Tip of the Day!',
			closeAction: 'hide',
			id: 'winTipOfTheDay',
			iconCls: 'iconPRC',
			width: 400,
			height: 250,
			layout: 'border',
			border: false,
			items: 
			[
				{
					border: true,
					width: 50,
					region: 'west',
					xtype: 'panel',
					bodyStyle: 'background-image: url(../assets/e/extjs/images/default/window/icon-info.gif); background-repeat: no-repeat;padding: 10px;'
				},
				{
					border: true,
					region: 'center',
					xtype: 'panel',
					autoLoad:
					{ 
						url:'autoload-content.php' 
					}
				},
				{
					region: 'south',
					height: 22,
					border: false,
					bbar: 
					{
						xtype: 'toolbar',
						border: 0,
						items: 
						[
							{
								xtype: 'checkbox',
								boxLabel: 'Don\'t show this again'
							},'->',
							{
								xtype: 'button',
								text:'Next'
							},
							{
								xtype: 'button',
								text:'Previous'
							},
							{
								xtype: 'button',
								text: 'Close',
								handler: function()
								{
									winTipOfTheDay.hide();
								}
							}
						]
					}
				}
			]
		});
	}
	//winTipOfTheDay.show();

});

