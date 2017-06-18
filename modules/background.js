TK.Background = {

	xmlll : '',
	
	cbGetUserProfile : function(result)
	{
       if(result)
	   {
			TK.API.getMySpaces();
	   }
	},
   
	GetMyTickets : function ()
	{
		
		TK.API.getMyTickets();
	},
	
	GetNotification : function ()
	{
		TK.API.GetNotification();
	},
	
	CreateTask : function (spaces_id,description,ticketNumber,difference,stopBol,stopTimeHours,stopTimeMin,startTimeHours,startTimeMin)
	{
		this.xmlll='';
		var currentDate = new Date()
		var day = currentDate.getDate()
		var month = currentDate.getMonth() + 1
		var year = currentDate.getFullYear()
		
		var encode_description=description.replace(/&/g, '&amp;').replace(/</g, '&lt;');
		
		this.element("task");
		this.element("hours",difference);
		this.element("description",encode_description);
		this.element("space_id",spaces_id);
		this.element("begin_at",escape(year + "/" + month + "/" + day)+" "+startTimeHours+":"+startTimeMin);
		this.element("end_at",escape(year + "/" + month + "/" + day)+" "+stopTimeHours+":"+stopTimeMin);
		this.element("ticket_number",ticketNumber);
		this.element("/task");
		
	TK.API.createTask(this.xmlll,stopBol);
	},
	
	
	element : function(name,content)
	{
		
		if (!content)
		{
			this.xmlll=this.xmlll+'<' + name + '>'
		}
		else 
		{
			this.xmlll=this.xmlll+'<'+ name + '>' + content + '</' + name + '>'
			
		}
		
	},
	
	startTime : function (user_id,spaces_id,ticket_number,description,ticketID,elemUrl)
	{
		var now = new Date();
		var utc = new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds()));
		TK.Document.utcc=utc;
		var startTimeHours = now.getHours();
		var startTimeMin = now.getMinutes();
	    TK.Plugin.setTime(user_id,spaces_id,utc,ticket_number,description,ticketID,elemUrl,startTimeHours,startTimeMin);
	},
	
	stopTime : function (stopBol)
	{
		var now = new Date();
		var utc = new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds()));
		var stopTimeHours = now.getHours();
		var stopTimeMin = now.getMinutes();
		
		TK.Plugin.getTime(utc,stopBol,stopTimeHours,stopTimeMin);
	},
	
	splt : function ()
	{
		//jQuery("#mentions-counter").html("12345678998");
		
		//regex = /[a-zA-Z]\(\"\#mentions\-counter\"\)\.html\(\"(\w{1})\"\)/;  
		regex = /[a-zA-Z]\(\"\#mentions\-counter\"\)\.html\(\"([0-9-]+)\"\)/i;
		url = 'jQuery("#mentions-counter").html("123")';
		id = url.match(regex)[1];
		console.log(id);
	},
	getUserProfile : function()
	{
		TK.API.getUserProfile();
	},
	
	ticketComment : function (description)
	{
		var newMessage=description.replace(/&/g, '&amp;').replace(/</g, '&lt;');
		this.element("ticket");
		this.element("user-comment",newMessage);
		this.element("/ticket");
		var data = TK.Plugin.getLocalStorageDetail();
		TK.API.ticketComment(this.xmlll, data);
	}
}
TK.Background.getUserProfile();
TK.Plugin.getNotification();


