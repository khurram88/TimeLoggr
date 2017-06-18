var EXPORTED_SYMBOLS = [""];

TK.API = {
	
	response : function (doc,type,exParam)
	{
		
			if(type=="getUserProfile")
			{
			 	//j=JSON.parse(xml2json(r));
				TK.Document.setUserInfo(doc);
				//CoVu.FacebookDoc.friends_FB(doc);
			}
			else if(type=="getMySpaces")
			{
				TK.Document.setSpacesInfo(doc);
			}
			else if(type=="getMyTickets")
			{
				TK.Document.setTicketsInfo(doc);
			}
			else if(type=="createTask")
			{
				TK.Background.xmlll='';
				TK.Document.createTaskResponse(exParam);
			}
			else if(type="sendComments")
			{
				TK.Background.xmlll='';
				TK.Plugin.customalert("Comment Submitted Succefully");
			}
	},
	
	LoadResponse : function (doc,type,exParam)
	{
		if(type=="getNotification")
		{
			TK.Document.setNotificationCount(doc);
		}
	},
	
	getUserProfile : function()
	{
		TK.HttpRequest.sendGetRequest('user/best_profile','','getUserProfile');
	},
	
	getMySpaces : function()
	{
		TK.HttpRequest.sendGetRequest('spaces/my_spaces','','getMySpaces');
	},
	getMyTickets : function ()
	{
		TK.HttpRequest.sendGetRequest('tickets','','getMyTickets');
	},
	createTask : function (postData,stopBol)
	{
		TK.HttpRequest.sendPOSTRequest('user/time_entries','','createTask',postData,stopBol);
	},
	
	GetNotification : function()
	{
		TK.HttpRequest.sendLoadRequest('user/load_mentions','','getNotification');
	},
	
	ticketComment : function (description, data)
	{
		TK.HttpRequest.sendPUTRequest('spaces/'+data[0]+'/tickets/'+data[1],'','sendComments',description);
	}
}