/*!
 * PR Companion - All Right Reserved.
 */
Ext.BLANK_IMAGE_URL = '../assets/e/extjs/images/default/s.gif';

Ext.onReady(function()
{
    Ext.QuickTips.init();
 	
    var submitLogin = function()
    {
    	login.getForm().submit(
    	{
    		method: 'POST', 
    		waitTitle: 'Connecting', 
    		waitMsg: 'Checking Authentication...',

    		success: function()
    		{
    			window.location = 'main';
    		},
    		failure: function(form, action)
    		{ 
    			if(action.failureType == 'server')
    			{ 
    				obj = Ext.util.JSON.decode(action.response.responseText); 
    				Ext.Msg.show(
    				{
    					title: 'Login Failed!',
    					msg: obj.errors.reason,
    					width: 300,
    					buttons: Ext.MessageBox.OK,
    					icon: Ext.MessageBox.ERROR
    				});
    			}
    			else
    			{
    				Ext.Msg.show(
    				{
    					title: 'Warning!',
    					msg: 'Authentication server is unreachable : ' + action.response.responseText,
    					width: 300,
    					buttons: Ext.MessageBox.OK,
    					icon: Ext.MessageBox.ERROR
    				});
    			} 
    			login.getForm().reset(); 
    		} 
    	}); 
    };
  
    
    var login = new Ext.FormPanel(
	{ 
		labelWidth: 70,
        url: 'login', 
        frame: true, 
        defaultType: 'textfield',
		monitorValid: true,
	    items: 
		[
			{ 
				fieldLabel: 'Username', 
                name: 'userName', 
                allowBlank: false 
            },
			{ 
                fieldLabel: 'Password', 
                name: 'password', 
                inputType: 'password', 
                allowBlank: false,
                listeners: 
                {
            		specialkey: function(field, e)
            		{
            			if(e.getKey() == e.ENTER)
            			{
            				submitLogin();
            			}
            		}
                }
            }
		],
		buttons: 
		[
			{
				text: 'Reset',
				handler: function()
				{
					login.getForm().reset();  
				} 
			},
			{
				text: 'Login',
				formBind: true,	 
				handler: submitLogin
			}
		]
	});
    
   
	var win = new Ext.Window(
	{
        layout: 'fit',
        title: 'PRC Enterprise Edition',
        iconCls: 'iconPRC',
        width: 250,
        height: 125,
        closable: false,
        resizable: false,
        plain: true,
        border: false,
        items: [login]
	});
	win.show();
});

