var EXPORTED_SYMBOLS = [""];

TK.View={
	
	
	spaces : function()
	{
		try
		{
			if(TK.Plugin.browser=='Chrome')
			{
				var popups = TK.Plugin.popups();
				if(popups!=0)
				{
					popups.TK.Popup.loadSpacesList();
				}
			}
			else if(TK.Plugin.browser=='Firefox')
			{
				//CoVu.Plugin.showLiveIcon();
//				CoVu.Popup.showLead();
//				CoVu.Popup.setLeadUrl();
			}
		}
		catch(e)
		{
		}
	},
	
	userInfo : function ()
	{
		try
		{
			if(TK.Plugin.browser=='Chrome')
			{
				var popups = TK.Plugin.popups();
				if(popups!=0)
				{
					popups.TK.Popup.getUserInfo();
				}
				
			}
			else if(TK.Plugin.browser=='Firefox')
			{
				//CoVu.Plugin.showLiveIcon();
//				CoVu.Popup.showLead();
//				CoVu.Popup.setLeadUrl();
			}
		}
		catch(e)
		{
		}
	},
	
	showLoginInIcon : function ()
	{
		TK.Plugin.showLoginIcon();
	},
	 startCounter : function(dif)
	 {
		  try
		  {
		   if(TK.Plugin.browser=='Chrome')
		   {
			var popups = TK.Plugin.popups();
			if(popups!=0)
			{
			 popups.TK.Popup.timeCounter(dif);
			}
		   }
		   else if(TK.Plugin.browser=='Firefox')
		   {
			
		   }
		  }
		  catch(e)
		  {
		  }
	},
	
	 Notification : function(notification)
	 {
		  try
		  {
		   if(TK.Plugin.browser=='Chrome')
		   {
			var popups = TK.Plugin.popups();
			if(popups!=0)
			{
			 popups.TK.Popup.mentions(notification);
			}
		   }
		   else if(TK.Plugin.browser=='Firefox')
		   {
			
		   }
		  }
		  catch(e)
		  {
		  }
	},
	updateView : function()
	 {		  
		TK.Background.cbGetUserProfile(true);		  
	},
	
	setLocalStorage : function (user_id,space_id,ticketNumber,description,parentID,elemUrl)
	{
		TK.Background.startTime(user_id,space_id,ticketNumber,description,parentID,elemUrl);
	},
	
	getLocalStorage : function (stopBol)
	{
		TK.Background.stopTime(stopBol);
	},
	counterTime : function()
	{
		TK.Plugin.counterTime();
	},
	
	createTaskResponse : function ()
	{
		if(TK.Plugin.browser=='Chrome')
			{
				var popups = TK.Plugin.popups();
				if(popups!=0)
				{
					popups.TK.Popup.stopCounter();
					TK.Plugin.clearLocalStorage();
				}
				else
				{
					popups.TK.Popup.stopCounter();
					TK.Plugin.clearLocalStorage();
				}
				
			}
			else if(TK.Plugin.browser=='Firefox')
			{
				
			}
		
	},
	
	taskResponseFalse : function ()
	{
		if(TK.Plugin.browser=='Chrome')
			{
				var popups = TK.Plugin.popups();
				if(popups!=0)
				{
					popups.TK.Popup.startSecondCounter();
				}
				else
				{
					popups.TK.Popup.startSecondCounter();
				}
				
			}
			else if(TK.Plugin.browser=='Firefox')
			{
				
			}
		
	},
	ticketComment : function(content)
	{
		TK.Background.ticketComment(content);
	}
}