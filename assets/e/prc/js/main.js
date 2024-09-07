Ext.BLANK_IMAGE_URL = '../assets/e/extjs4/resources/themes/images/default/tree/s.gif';
Ext.QuickTips.init();

var strUserName = "Joseph";
var strExiredDate = "12-Dec-2010";	

var strHelpContents = "Use the left link to search Outlets, Opportunities and Contacts";

var winTipOfTheDay;

var strCurrentUserName;

function openEnterprisePRC(strUserName)
{
	strCurrentUserName = strUserName;
	
	Ext.onReady(function()
	{
		var boolFullyLoaded = false;
		new Ext.Viewport(
		{
			layout: 'border',
			layoutConfig: 
			{
				frame: true,
				split: true
			},
			items: 
			[
				{
					region: 'north',
					height: 100,
					minHight: 150,
					collapsible: false,
					layout: 'border',
					border: false,
					items: 
					[
						{
							border: false,
							width: 200,
							region: 'west',
							xtype: 'panel',
							contentEl: 'header-logo'
						},
						{
							border: false,
							region: 'center',
							xtype: 'panel',
							contentEl: 'header-middle-contents'
						},
						{
							//border: false,
							width: 225,
							region: 'east',
							contentEl: 'header-user-details'
						}
					]
				},
				/*{
					region: 'south',
					height: 22,
					border: false,
					bbar: new Ext.ux.StatusBar(
					{
						id: 'sbarPRC',
						defaultText: 'Welcome to PR Companion Enterprise Edition',
						defaultIconCls: 'iconPRCStatusBar',
						iconCls: 'iconPRCStatusBar',
						items:
						[
							{
								xtype: 'progress',
								id: 'pbarPRC',
								width: 223
							}
						]
					})
				},*/
				{
					region: 'west',
					title: 'Menu',
					width: 200,
					minWidth: 75,
					collapsible: true,
					collapseMode: 'mini',
					maxWidth: 150,
					layout: 'accordion',
					border: false,
					activeOnTop: true,
					layoutConfig: 
					{
						animate: false
					},
					items: 
					[
						{
							xtype: 'panel',
							title: ' Outlets',
							iconCls: 'iconOutlet',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/outlet-keyword-search-icon.gif',
									iconAlign: 'left',
									text: ' Keyword Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOutletKeywordSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/outlet-search-icon.gif',
									iconAlign: 'left',
									text: ' Basic Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOutletSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/outlet-advance-search-icon.gif',
									iconAlign: 'left',
									text: 'Advance Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOutletAdvanceSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/beats-lists-icon.gif',
									iconAlign: 'left',
									text: 'Outlets Beats List &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOutletBeatList
								}
							]
						},
						{
							xtype: 'panel',
							title: 'Opportunities',
							iconCls: 'iconOpportunity',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/opportunity-keyword-search-icon.gif',
									iconAlign: 'left',
									text: 'Keyword Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOpportunityKeywordSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/opportunity-search-icon.gif',
									iconAlign: 'left',
									text: 'Basic Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOpportunitySearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/opportunity-advance-search-icon.gif',
									iconAlign: 'left',
									text: 'Advance Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanOpportunityAdvanceSearch
								}
							]
						},
						{
							xtype: 'panel',
							title: 'Contacts',
							iconCls: 'iconContact',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/contact-keyword-search-icon.gif',
									iconAlign: 'left',
									text: 'Keyword Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanContactKeywordSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/contact-search-icon.gif',
									iconAlign: 'left',
									text: 'Basic Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanContactSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/contact-advance-search-icon.gif',
									iconAlign: 'left',
									text: 'Advance Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanContactAdvanceSearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/beats-lists-icon.gif',
									iconAlign: 'left',
									text: 'Contact Beats List &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanContactBeatList
								}
							]
						},
						{
							xtype: 'panel',
							title: 'Reminder',
							iconCls: 'iconReminder',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/reminder-add-icon.gif',
									iconAlign: 'left',
									text: 'Add Reminder &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25/*,
									handler: hanAddReminder*/
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/reminder-manage-icon.gif',
									iconAlign: 'left',
									text: 'Manage Reminders &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25/*,
									handler: hanManageReminder*/
								}
							]
						},
						/*{
							xtype: 'panel',
							title: 'Appointments',
							iconCls: 'iconAppointment',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/appointment-add-icon.gif',
									iconAlign: 'left',
									text: 'Add Appointment &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanAddAppointments
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/appointment-manage-icon.gif',
									iconAlign: 'left',
									text: 'Manage Appointments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanManageAppointments
								}
							]
						
						},*/
						{
							xtype: 'panel',
							title: 'Notes',
							iconCls: 'iconNote',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/note-add-icon.gif',
									iconAlign: 'left',
									text: 'Add Note &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25/*,
									handler: hanAddNotes*/
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/note-manage-icon.gif',
									iconAlign: 'left',
									text:'Manage Notes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25/*,
									handler: hanManageNotes*/
								}
							]
						},
						{
							xtype: 'panel',
							title: 'Shortcuts',
							iconCls: 'iconShortcut',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/my-search-icon.gif',
									iconAlign: 'left',
									text: 'My Search &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanMySearch
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/my-outlet-icon.gif',
									iconAlign: 'left',
									text:'My Outlets &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanMyOutlets
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/my-outlet-icon.gif',
									iconAlign: 'left',
									text:'My Opportunities &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanMyOpportunities
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/my-contact-icon.gif',
									iconAlign: 'left',
									text: 'My Contacts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanMyContacts
								}
							]
						},
						{
							xtype: 'panel',
							title: 'My Subscription',
							iconCls: 'iconSubscription',
							items: 
							[
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/my-profile-details-icon.gif',
									iconAlign: 'left',
									text: 'My Profile Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanMyProfileDetails
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/change-password-icon.gif',
									iconAlign: 'left',
									text:'Change Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanChangePassword
								},
								{
									xtype: 'button',
									icon: '../assets/e/prc/icons/subscription-renewal-icon.gif',
									iconAlign: 'left',
									text: 'Renew Subscription &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
									width: 199,
									height: 25,
									handler: hanRenewSubscription
								}
							]
						}
					]
				},
				{
					region: 'east',
					title: 'Help | Customer Care',
					collapsible: true,
					collapseMode: 'mini',
					split: true,
					width: 225,
					minSize: 175,
					maxSize: 400,
					layout: 'fit',
					items: 
					[
						{
							xtype: 'tabpanel',
							id: 'tabHelp',
							border: false,
							activeTab: 0,
							tabPosition: 'bottom',
							items: 
							[
								{
									title: 'Help!!',
									id: 'tabitmHelp', 
									iconCls: 'iconHelp',
									html: strHelpContents,
									autoScroll: true
								}, 
								{
									title: 'Customer Care!!',
									id: 'tabitmCustomerCare', 
									autoScroll: true,
									iconCls: 'iconCustomerCare',
									layout: 'fit',
									items: 
									[
										{
											xtype: 'form',
											id: 'pnlAdvanceSearchContactsForm',
											labelWidth: 100,
											defaultType: 'field',
											autoScroll: true,
											order: false,
											buttonAlign: 'right',
											labelAlign: 'top',
											frame: true, 
											items: 
											[
												{
													xtype: 'textfield',
													fieldLabel: 'Name', 
													id: 'txtASContactName',
													name: 'contact_name',
													anchor: '-4',
													blankText: "Contact name is Required", 
													width: 200,
													allowBlank: false
												},
												{
													xtype: 'combo',
													id: 'cmbASContactType',
													fieldLabel: 'Issue type',
													anchor: '-4',
													store: storContactDesignation,
													displayField: 'name',
													valueField:'id',
													typeAhead: true,
													mode: 'local',
													forceSelection: true,
													triggerAction: 'all',
													emptyText: 'Select issue type...',
													selectOnFocus: true
												},
												{
													xtype: 'textfield',
													anchor: '-4',
													fieldLabel: 'Phone Number', 
													id: 'txtASContactPhoneNumber',
													name: 'contact_phonenumber',
													emptyText: "xxx-xxx-xxxx",
													width: 200,
													allowBlank: false
												}
											],
											buttons:
											[
												{
													xtype: 'button',
													icon: 'icons/icon.gif',
													iconAlign: 'left',
													text: 'Submit',
													height: 25,
													formBind: true,
													handler: hanSubmitCustomreCare
												}
											]
										}
									]
								}
							]
						}
					]
				},
				{
					xtype: 'tabpanel',
					id: 'tabCenter',
					region: 'center',
					deferredRender: false,
					enableTabScroll: true,
					resizeTabs: true,
					activeTab: 0,
					minTabWidth: 115,
					tabWidth:135,
					enableTabScroll:true,
					plugins: new Ext.ux.TabCloseMenu(),
					items: 
					[
						{
							id: 'tabitmHome',
							padding: 10,
							iconCls: 'iconHome',
							title: 'Home',
							closable: false,
							autoScroll: true,
							items:
							[
								{
									xtype: 'panel',
									id: 'pnsHomeContentCardLayout',
									layout: 'card',
									activeItem: 0,
									items:
									[
										{
											xtype: 'panel',
											id: 'pnlHomeContent',
											layout: 'hbox',
											width: 400,
											height: 150,
											border: false,
											layoutConfig:
											{
												pack: 'center',
												align: 'middle'
											},
											items:
											[
												{
													title: 'Search Outlets',
													xtype: 'form',
													width: 400,
													id: 'pnlHomeContentForm',
													labelWidth: 80,
													defaultType: 'field',
													autoScroll: true,
													border: false,
													buttonAlign: 'right',
													frame: true, 
													items: 
													[
														{
															xtype: 'textfield',
															fieldLabel: 'Outlet Name', 
															id: 'txtHomeContent1',
															name: 'outlet_name',
															blankText: "Outlet name is Required", 
															width: 253,
															allowBlank: false
														}
													],
													buttons:
													[
														{
															xtype: 'button',
															id: 'btnShowPreviousSearch',
															icon: '../assets/e/prc/icons/previous-search-icon.gif',
															iconAlign: 'left',
															text:'Show Previous Search',
															width: 120,
															disabled: true,
															height: 25,
															formBind: true,
															handler:function()
															{
																Ext.getCmp('pnsHomeContentCardLayout').layout.setActiveItem(1);  
															} 
														},
														{
															xtype: 'button',
															icon: '../assets/e/prc/icons/search-icon.gif',
															iconAlign: 'left',
															text: 'Search Outlets',
															width: 120,
															height: 25,
															formBind: true,
															handler: hanSearchOutletsResult
														}
													]
												}
											]
										}
									]
								}
							]
						}
					],
					listeners:
					{
						tabchange:
						{
							fn: function(tabPanel, tabItem)
							{
								if(this.getActiveTab() != null)
								{
									var strActiveTabTitle = this.getActiveTab().title;
									if(boolFullyLoaded == true)
									{
										if(strActiveTabTitle == "Home")
										{
											Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/search-outlet.htm');
										}
										else if(strActiveTabTitle == "Home")
										{
											Ext.getCmp('tabHelp').getItem('tabitmHelp').load('../assets/e/prc/help/search-outlet.htm');
										}
									}
								}
							}
						}
					}
				}
			]
		});
		boolFullyLoaded = true;
	});
}

var hanHelpWindow = function(btn)
{
	if (! winTipOfTheDay)
	{
		winTipOfTheDay = new Ext.Window(
		{
			animateTarget: btn.el,
			html: 'Search Outlets',
			closeAction: 'hide',
			id: 'winTipOfTheDay',
			iconCls: 'iconPRC',
			height: 200,
			width: 300,
			constrain: true,
			autoScroll:true,
			autoLoad:
			{ 
				//url:'autoload-content.php' 
			} 
		});
	}
	winTipOfTheDay.show();
}

var hanSubmitCustomreCare = function(grid, rowIndex, colIndex)
{
	var rec = storAdvanceSearchContact.getAt(rowIndex);
	alert("joseph----->" + rec.get('ContactName'));
};
