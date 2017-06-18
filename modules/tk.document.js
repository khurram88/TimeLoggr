var EXPORTED_SYMBOLS = [""];

TK.Document={
	login_name : '',
	user_id : 0,
	my_spaces : [],
	my_tickets : [],
	my_ticketsCopy : [],
	my_ticketsLength : '',
	xmlll : '',
	utcc : '',
	timedifference : '',
	couterFlag : false,
	counterArr : [],
	Notification_count : '',
	new_notification_count : '',
	ticketUrl : '',
	loadingFlag : false,
	mentionFlag : false,
	mentionCount : '',
	loginFlag : false,
	counterTicketID : '',
	UserID : '',
	spaceID : '',
	ticketNumb : '',
	descript : '',
	parID : '',
	childticknum : '',
	chilcspntxt : '',
	elemulr : '',
	user_password : '',
	user_loginid : '',
	loginFlagcheck : false,
	
	getValue : function(doc,name)
	{
	
		return  doc.getElementsByTagName(name)[0].childNodes[0].nodeValue;
		
	},
	getElement : function(doc,name)
	{
	 	return  doc.getElementsByTagName(name)
	},
	setUserInfo : function(doc)
	{
		this.loginFlag=true;
		this.loginFlagcheck=true;
		this.loadingFlag=true;
		this.login_name= this.getValue(doc,'name');
		this.user_id= this.getValue(doc,'id');
		this.user_loginid= this.getValue(doc,'login');
		TK.View.showLoginInIcon();
		TK.View.userInfo();
		
		TK.Background.cbGetUserProfile(true);
	},
	
	setSpacesInfo : function(doc)
	{
		this.my_spaces=this.getElement(doc,'space');
		
		TK.Background.GetMyTickets();
		//sp=XMLObjectifier.xmlToJSON(sp);
		
	},
	
	setTicketsInfo : function(doc)
	{
		this.loadingFlag=false;
		this.my_tickets=this.getElement(doc,'ticket');
		this.my_ticketsLength=this.my_tickets.length;
		TK.View.spaces();
		//TK.View.tickets(this.my_tickets);
	},
	setNotificationCount : function(doc)
	{
		var regex = /[a-zA-Z]\(\"\#mentions\-counter\"\)\.html\(\"([0-9-]+)\"\)/i;
		var count = doc.split(";");
		var countString = count[0];
		this.Notification_count = countString.match(regex)[1];
		TK.View.Notification(this.Notification_count);
		TK.Plugin.badge_notification();
		//TK.View.Notification(this.Notification_count);
	},
	
	createTaskResponse : function (type)
	{
		if(type==true)
		{
			TK.View.createTaskResponse();
		}
		else if(type==false)
		{
			TK.View.taskResponseFalse();
		}
		
	}
	
}

