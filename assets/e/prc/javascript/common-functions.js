function wait(millis) 
{
	var date = new Date();
	var curDate = null;

	do { curDate = new Date(); } 
	while(curDate-date < millis);
} 

var showViewOutletDetailsWindow = function(strTitle, strOutletId, storViewOutlet)
{
	winViewOutletsDetails = new Ext.Window(
	{
		title: strTitle, 
		id: 'winViewOutletsDetails',
		iconCls: 'iconPRC',
		width: 600,
		height: 500,
		constrain: true,
		closable: true,
		modal: true,
		autoScroll:true,
		items:
		[
			{
			 	tbar: 
				{
					xtype: 'toolbar',
					border: 0,
					items: 
					[
						'->',
						{
							xtype: 'button',
							id: 'btnAddToMyOutlets',
							icon: '../assets/e/prc/icons/add-button-icon.gif',
							iconAlign: 'left',
							text:'Add to My Outlets',
							height: 25,
							formBind: true,
							handler:function()
							{
								hanAddToMyOutletFromWindow(strOutletId);
							} 
						},
						{
							xtype: 'button',
							id: 'btnClose',
							icon: '../assets/e/prc/icons/close-icon.gif',
							iconAlign: 'left',
							text:'Close',
							height: 25,
							formBind: true,
							handler:function()
							{
								winViewOutletsDetails.close();
								winViewOutletsDetails = null;
							} 
						}
					]
				}
		 	},
		 	{
				xtype: 'dataview',
				autoScroll: true, 
		        store: storViewOutlet, 
		        tpl: tplViewOutletDetails,
		        autoHeight: true, 
		        multiSelect: true, 
		        itemSelector: 'div.thumb-wrap',
		        emptyText: 'No data to display',
		        loadingText: 'Please Wait...',
		        style: 'border:1px solid #99BBE8;background:#fff;'
		 	}
		]
	});
	winViewOutletsDetails.setTitle(strTitle);
	winViewOutletsDetails.show();
}

var hanAddToMyOutletFromWindow = function(strOutletId)
{
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Add Outlet to My List', true);
	//Connect to backend and get the JSON object and load it to the table
	
	var conn = new Ext.data.Connection();
	conn.request(
	{
		url: 'myoutletadd',
		method: 'POST',
		params: 
		{
			outletid: strOutletId
		},
		success: function(responseObject)
		{
			Ext.Msg.show(
			{
				title: 'Successful',
				msg: "Outlet added to list successfully!",
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
		}
	});
	
	Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Outlet Search Result', true);
	Ext.getCmp('pbarPRC').updateProgress(1.0, 'Outlet Search Loaded Successfully', true);
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
	Ext.getCmp('gridOutletKeywordSearch').body.unmask();
}

var showViewOpportunityListWindow = function(strTitle, strOutletId, storViewOpportunityList)
{
	winViewOpportunityList = null;
	
	winViewOpportunityList = new Ext.Window(
	{
		title: strTitle, 
		id: 'winViewOpportunityList',
		iconCls: 'iconPRC',
		width: 600,
		height: 500,
		constrain: true,
		closable: true,
		modal: true,
		autoScroll:true,
		items:
		[
			{
			 	tbar: 
				{
					xtype: 'toolbar',
					border: 0,
					items: 
					[
						'->',
						{
							xtype: 'button',
							id: 'btnClose',
							icon: '../assets/e/prc/icons/close-icon.gif',
							iconAlign: 'left',
							text:'Close',
							height: 25,
							formBind: true,
							handler:function()
							{
								winViewOpportunityList.close();
								winViewOpportunityList = null;
								storViewOpportunityList.removeAll();
							} 
						}
					]
				}
		 	},
		 	{
				xtype: 'dataview',
				autoScroll: true, 
		        store: storViewOpportunityList, 
		        tpl: tplViewOpportunityList,
		        autoHeight: false, 
		        multiSelect: true, 
		        itemSelector: 'div.thumb-wrap',
		        emptyText: 'No data to display',
		        loadingText: 'Please Wait...',
		        style: 'border:1px solid #99BBE8;background:#fff;'
		 	}
		]
	});
	winViewOpportunityList.setTitle(strTitle);
	winViewOpportunityList.show();
}

var showViewContactListWindow = function(strTitle, strOutletId, storViewContactList1)
{
	winViewContactList = null;
	winViewContactList = new Ext.Window(
	{
		title: strTitle, 
		id: 'winViewContactList',
		iconCls: 'iconPRC',
		width: 600,
		height: 500,
		constrain: true,
		closable: true,
		modal: true,
		autoScroll:true,
		items:
		[
			{
			 	tbar: 
				{
					xtype: 'toolbar',
					border: 0,
					items: 
					[
						'->',
						{
							xtype: 'button',
							id: 'btnClose',
							icon: '../assets/e/prc/icons/close-icon.gif',
							iconAlign: 'left',
							text:'Close',
							height: 25,
							formBind: true,
							handler:function()
							{
								winViewContactList.close();
								winViewContactList = null;
								storViewContactList1.removeAll();
							} 
						}
					]
				}
		 	},
		 	{
				xtype: 'dataview',
				autoScroll: true, 
		        store: storViewContactList1, 
		        tpl: tplViewContactList,
		        autoHeight: false, 
		        multiSelect: true, 
		        itemSelector: 'div.thumb-wrap',
		        emptyText: 'No data to display',
		        loadingText: 'Please Wait...',
		        style: 'border:1px solid #99BBE8;background:#fff;'
		 	}
		]
	});
	winViewContactList.setTitle(strTitle);
	winViewContactList.show();
}

var showViewOpportunityDetailsWindow = function(strTitle, strOpportunityId, storViewOpportunityDetails)
{
	// if (!winViewOpportunityKeywordDetails)
	{
		winViewOpportunityKeywordDetails = null;
		
		winViewOpportunityKeywordDetails = new Ext.Window(
		{
			title: strTitle, 
			closable: true,
			modal: true,
			id: 'winViewOpportunityKeywordDetails',
			iconCls: 'iconPRC',
			width: 400,
			height: 300,
			constrain: true,
			autoScroll:true,
			items:
			[
				{
				 	tbar: 
					{
						xtype: 'toolbar',
						border: 0,
						items: 
						[
							'->',
							{
								xtype: 'button',
								id: 'btnAddToMyOpportunityKeyword',
								icon: '../assets/e/prc/icons/add-button-icon.gif',
								iconAlign: 'left',
								text:'Add to My Opportunity',
								height: 25,
								formBind: true,
								handler: hanOPKSAddToMyOpportunity
							},
							{
								xtype: 'button',
								id: 'btnClose',
								icon: '../assets/e/prc/icons/close-icon.gif',
								iconAlign: 'left',
								text:'Close',
								height: 25,
								formBind: true,
								handler:function()
								{
									winViewOpportunityKeywordDetails.close();
									winViewOpportunityKeywordDetails = null;
									storViewOpportunityDetails.removeAll();
								} 
							}
						]
					}
				},
				{
					xtype: 'dataview',
					autoScroll: true, 
			        store: storViewOpportunityDetails, 
			        tpl: tplOPKSViewOpportunityDetails,
			        autoHeight: false, 
			        height: 300,
			        multiSelect: true, 
			        itemSelector: 'div.thumb-wrap',
			        emptyText: 'No data to display',
			        loadingText: 'Please Wait...',
			        style: 'border:1px solid #99BBE8;background:#fff;'
			 	}
			]
		});
	}
	winViewOpportunityKeywordDetails.setTitle(strTitle);
	winViewOpportunityKeywordDetails.show();
}

var showViewContactDetailsWindow = function(strTitle, strContactId, storViewContactDetails)
{
	winViewContactKeywordDetails = null;
	
	winViewContactKeywordDetails = new Ext.Window(
	{
		title: strTitle, 
		id: 'winViewContactDetails',
		iconCls: 'iconPRC',
		width: 600,
		height: 500,
		constrain: true,
		closable: true,
		modal: true,
		autoScroll:true,
		items:
		[
			{
			 	tbar: 
				{
					xtype: 'toolbar',
					border: 0,
					items: 
					[
						'->',
						{
							xtype: 'button',
							id: 'btnAddToMyContactKeyword',
							icon: '../assets/e/prc/icons/add-button-icon.gif',
							iconAlign: 'left',
							text:'Add to My Contact',
							height: 25,
							formBind: true,
							handler:hanCKSAddToMyContact
						},
						{
							xtype: 'button',
							id: 'btnClose',
							icon: '../assets/e/prc/icons/close-icon.gif',
							iconAlign: 'left',
							text:'Close',
							height: 25,
							formBind: true,
							handler:function()
							{
								winViewContactKeywordDetails.close();
								winViewContactKeywordDetails = null;
								storViewContactDetails.removeAll();
							}
						}
					]
				}
			},
		 	{
				xtype: 'dataview',
				autoScroll: true, 
		        store: storViewContactDetails, 
		        tpl: tplViewContactDetails,
		        autoHeight: false, 
		        height: 500,
		        multiSelect: true, 
		        itemSelector: 'div.thumb-wrap',
		        emptyText: 'No data to display',
		        loadingText: 'Please Wait...',
		        style: 'border:1px solid #99BBE8;background:#fff;'
		 	}
		]
	});
	winViewContactKeywordDetails.setTitle(strTitle);
	winViewContactKeywordDetails.show();
}
