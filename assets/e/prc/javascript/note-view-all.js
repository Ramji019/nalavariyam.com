Ext.namespace('prc.notes.notesviewall');

var winModifyNote;

var hanViewAllNotes = function(btn)
{
	Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/note-search.htm');
	
	Ext.getCmp('pbarPRC').updateProgress(0.3, 'Opening Note View All Screen', true);
	var tabCenter = Ext.getCmp('tabCenter');
	Ext.getCmp('pbarPRC').updateProgress(0.5, 'Initilizing Tab', true);
	
	hanLoadAllNotes();
	
	if(Ext.getCmp('tabitmViewAllNote'))
	{
		tabCenter.setActiveTab('tabitmViewAllNote');
		return;
	}
	
	tabCenter.add(
	{
		title: 'View All Note',
		tabTip: 'View All Note',
		id: 'tabitmViewAllNote',
		closable: true,
		iconCls: 'iconNoteSearch',
		layout: 'fit',
		items: 
		[
			{
				xtype: 'panel',
				id: 'pnlViewAllNoteCardLayout',
				layout: 'card',
				activeItem: 0,
				items:
				[
					{
						xtype: 'panel',
						layout: 'fit',
						items:
						[
							new Ext.grid.GridPanel(
							{
								id: 'gridSearchNote',
								store: storNoteViewAll,
								viewConfig:
								{
									forceFit:true
								},
								columns:
								[
									expViewAllNote,
									{
										header: "S. No",
										width: 10,
										sortable: true,
										dataIndex: 'sno'
									},
									{
										header: 'Note Suject',
										width: 20,
										sortable: true,
										dataIndex: 'noteSubject'
									},
									{
										header: 'Note Details',
										width: 65,
										sortable: true,
										dataIndex: 'noteDetails'
									},
									{
						                xtype: 'actioncolumn',
						                width: 5,
						                sortable: false,
						                items: 
						                [
											{
												icon: '../assets/e/prc/icons/view-icon.gif',
												tooltip: 'View Note Details'
											}
										]
						            }
								],
								plugins: expViewAllNote,
								listeners:
								{
									render:
									{
										fn: function()
										{
											 Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});
										}
									},
									cellclick:
									{
										fn: function(grid, rowIndex, columnIndex, event) 
										{
											grid.getSelectionModel().selectRow(rowIndex);
											if(columnIndex == 4)
											{
												var intarrLocation = new Array();
												intarrLocation[0] = event.getXY()[0] - 120;
												intarrLocation[1] = event.getXY()[1];
												conmnuViewAllNote.showAt(intarrLocation);
											}
										}
									},
									keydown:
									{
										fn: function(e)
										{
											if(e.getKey() == 46)
											{
												hanDeleteNote();
											}
										}
									}
								},
								stripeRows: true,
								loadMask: true,
								bbar: new Ext.PagingToolbar(
								{
									pageSize: 20,
									store: storNoteViewAll,
									displayInfo: true,
									displayMsg: 'Displaying Notess {0} - {1} of {2}',
									emptyMsg: "No Notes to display, Change your Search Conditions"
								})
							})
						]
					}
				]
			}
		]
	});
	
	Ext.getCmp('pbarPRC').updateProgress(0.8, 'Forms Loaded...', true);
	tabCenter.setActiveTab('tabitmViewAllNote');
	Ext.getCmp('pbarPRC').updateProgress(1, 'Search Notess Form Loaded', true);	
	Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
}

var hanLoadAllNotes = function(btn)
{
	strNoteSubject = "a";
	strNoteDetails = "";
	
	
	Ext.Msg.progress("Searching...", "Searching note please wait....", "Searching");
	
	Ext.getCmp('pbarPRC').updateProgress(0.1, 'Searching Notes', true);
	//Connect to backend and get the JSON object and load it to the table
	storNoteViewAll.load({params: {noteSubject:strNoteSubject, noteDetails: strNoteDetails}});
	var intSearchResultCount = storNoteViewAll.getCount();
	
	storNoteViewAll.on('beforeload', function(store)
	{
		storNoteViewAll.baseParams = {noteSubject:strNoteSubject, noteDetails: strNoteDetails};
	});
	
	storNoteViewAll.load({callback:function()
	{
		var intSearchResultCount = storNoteViewAll.getCount();
		if(intSearchResultCount > 0)
		{
			Ext.getCmp('pbarPRC').updateProgress(0.7, 'Load Note Search Result', true);
			Ext.getCmp('gridSearchNote').setAutoScroll(true);
			Ext.Msg.hide();
			Ext.getCmp('pbarPRC').updateProgress(1.0, 'Note Search Loaded Successfully', true);
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
		else
		{
			Ext.Msg.hide();
			Ext.Msg.show(
			{
				title: 'No Data',
				msg: "No note found for your search criteria",
				width: 300,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			});
			Ext.getCmp('pbarPRC').updateProgress(0, ' ', true);
		}
	}});
}

var hanModifyNote = function(grid, rowIndex)
{
	var rec = Ext.getCmp('gridSearchNote').getSelectionModel().getSelected();
	var strNoteId = rec.get('noteId');
	
	if (!winModifyNote)
	{
		winModifyNote = new Ext.Window(
		{
			animateTarget: grid.el,
			title: 'Modify Note', 
			closeAction: 'hide',
			iconCls: 'iconPRC',
			width: 454,
			height: 197,
			constrain: true,
			autoScroll:true,
			items:
			[
				{
					xtype: 'formnotemodify'
				}
			]
		});
	}
	
	//Load the Store
	Ext.Ajax.request(
	{
		url: 'viewnotedetails',
		method: 'POST',
		params: 
		{
			nid: strNoteId
		},
		success: function(responseObject)
		{
			var strNoteSubject = Ext.decode(responseObject.responseText).data.viewnotedetails[0].noteSubject;
			var strNoteDetails = Ext.decode(responseObject.responseText).data.viewnotedetails[0].noteDetails;
			
			winModifyNote.items.itemAt(0).strNoteIdToModify = strNoteId;
			
			winModifyNote.items.itemAt(0).items.itemAt(0).setValue(strNoteSubject);
			winModifyNote.items.itemAt(0).items.itemAt(1).setValue(strNoteDetails);
			winModifyNote.show();
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
}

var hanDeleteNote = function(grid, rowIndex)
{
	var rec = Ext.getCmp('gridSearchNote').getSelectionModel().getSelected();
	var strNoteId = rec.get('noteId');
	
	Ext.Msg.show(
	{
		title: 'Server Error',
		msg: "Are you sure you want to delete the note",
		width: 300,
		buttons: Ext.MessageBox.YESNO,
		icon: Ext.MessageBox.QUESTION,
		fn: checkResult
	});
	
	function checkResult(btnValue)
	{
        if(btnValue == "yes")
		{
			deletenote();
		}
    };
	
	function deletenote()
	{
		Ext.Ajax.request(
		{
			url: 'notedelete',
			method: 'POST',
			params: 
			{
				nid: strNoteId
			},
			success: function(responseObject)
			{
				Ext.Msg.show(
				{
					title: 'Successful',
					msg: "Note deleted successfully!",
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
				storNoteViewAll.remove(rec);
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
	}
	
}


var storNoteViewAll = new Ext.data.JsonStore(
{
	root: 'data.noteSearchResult', 
	url: 'notesearch',
	totalProperty: 'totalCount',
	autoLoad: false,
	fields:
	[
		{name: 'sno'},{name: 'noteId'},{name: 'noteSubject'},{name: 'noteDetails'}
	]
});

var storNoteDetails = new Ext.data.JsonStore(
{
	url: 'viewnotedetails',
	root: 'data.viewnotedetails', 
	fields:
	[
		{name: 'noteId'},{name: 'noteSubject'},{name: 'noteDetails'}
	]
});

var xtplViewNoteDetails = new Ext.XTemplate(
    '<tpl for=".">',
    	'<div id="{noteId}">',
    		'<div class="outlet-details" align="left">',
    			'<div class="outlet-field">Subject</div><div class="outlet-value">{noteSubject}</a></div><br />',
        		'<div class="outlet-field">Details</div><div class="outlet-value">{noteDetails}</a></div><br />',
        		'<div class="outlet-field">Note Date</div><div class="outlet-value">{noteDate}</a></div><br />',
        		'<div class="outlet-field">Start Time</div><div class="outlet-value">{noteStartTime}</a></div><br />',
        		'<div class="outlet-field">End Time</div><div class="outlet-value">{noteEndTime}</a></div><br />',
        		'<div class="outlet-field">Email Publishing</div><div class="outlet-value">{emailPublishing}</a></div><br />',
        		'<div class="outlet-field">Email Address</div><div class="outlet-value">{emailAddress}</a></div><br />',
        		'<div class="outlet-field">Email Time</div><div class="outlet-value">{sendTimeValue}</a></div><br />',
        		'<div class="outlet-field">Email Type</div><div class="outlet-value">{sendTimeType}</a></div><br />',
        		'<div class="outlet-field">Last modified</div><div class="outlet-value">{lastModified}</a></div><br /><br /><br />',
    		'</div>',
    	'</div>',
    '</tpl>',
    '<div class="x-clear"></div>',
    {
    	isValidURL: function(strURL)
    	{
    		var strHTTP = strURL.substring(0, 4);
    		if(strHTTP == "http")
    		{
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	}
    }
);

var expViewAllNote = new Ext.ux.grid.RowExpander(
{
	tpl: new Ext.Template
	(
		'<p style="background-color: #D9E7F8; padding: 5px;">{noteDetails}</p>'
	)
});

var conmnuViewAllNote = new Ext.menu.Menu(
{
	items:
	[
		{
			text: 'Edit Note',
			icon: '../assets/e/prc/icons/view-icon.gif',
			handler: hanModifyNote
		},
		'-',
		{
			text: 'Delete Note',
			icon: '../assets/e/prc/icons/view-icon.gif',
			handler: hanDeleteNote
		}
	]
});
