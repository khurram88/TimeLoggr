chrome.extension.onRequest.addListener(function (request, sender, sendResponse) 
	{
		if(request.userpassword)
		{
			TK.Document.user_password=request.userpassword;
		}
		sendResponse({});
	});
	
chrome.cookies.onChanged.addListener(function(changeInfo) 
{
	if(changeInfo.cookie.name=="security_token")
	{
		if(changeInfo.cause=='explicit')
		{
			if(changeInfo.removed==false)
			{
				/* TK.Background.getUserProfile();
				TK.Plugin.getNotification();
						/* CoVu.FacebookDoc.access_token=changeInfo.cookie.value;
						if(CoVu.Document.login_session_key=='')
						{
							CoVu.FacebookBack.facebook_friends("me/friends?access_token=",CoVu.FacebookDoc.access_token,"friends");
						} */
			}
		}
		
		if(changeInfo.removed==true)
		{
			TK.Plugin.logout();
			TK.Plugin.clearLocalStorage();
		}
	}
	else if(changeInfo.cookie.name=="_at_cvar.assembla.demo.bded")
	{
		if(changeInfo.cause=='explicit')
		{
			if(changeInfo.removed==false)
			{
				if(TK.Document.loginFlagcheck==false)
				{
					TK.Background.getUserProfile();
					TK.Plugin.getNotification();
				}	
			}
		}	
		
	}
});  

TK.Plugin ={
	
		browser : "Chrome",
		notification : null,
		timer_notification : null,
		
		
		
		popups : function()
		{
			var popups = chrome.extension.getViews({type: "popup"});			
			if(popups.length==1)
			   return popups[0];
			return 0;
		},
		createTab : function (ticket)
		{
			chrome.tabs.create({url:ticket}, function(tab) 
			{ 
				chrome.tabs.update({active : true});
			});
		},		
		customalert : function(errortext)
		{ 
		
			try
			{
				var popups = this.popups();
				
				if(popups!=0)
				{
				   popups.TK.Alert.showErrorAlert(errortext);
				}
				else
				{
					this.showcustomNotification(errortext);
				}
			}
			catch(e)
			{
			}
							
		},
		
		openLoginURL : function (type)
		{
			if(type=="getUserProfile")
			{
				this.createTab("https://www.assembla.com/login");
			}
		},
		showcustomNotification : function(message) 
		{
			
			var notification = webkitNotifications.createNotification(
			'',                      // The image.
			"TimeKeepr: Alert", // The title.
			message      // The body.
			);
			notification.show();
			setTimeout(function(){notification.cancel();},4000)
		
		},
		
		counterTime : function()
		{
			var now = new Date();
			var currrentTime = new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds()));
			var starttime = localStorage["startTime"];
			var dat = new Date(starttime);
			var diff = this.counterDifference(currrentTime,dat);
			TK.Document.counter=diff;
			TK.View.startCounter(diff);
   
			setTimeout( function(){TK.Plugin.counterTime();},1000) 
		},
	
		
		counterDifference : function(laterdate,earlierdate) 
		{
		
			laterdate=laterdate.getTime()+laterdate.getTimezoneOffset() * 60000;
			earlierdate=earlierdate.getTime()+earlierdate.getTimezoneOffset() * 60000;
		
		
			var difference = laterdate - earlierdate;
			/* console.log(" current "+laterdate);
			console.log("later  "+earlierdate);
			console.log("seconds "+difference); */
		
			if(difference<0)
			return "0.00";
	 
			var hoursDifference = Math.floor(difference/1000/60/60);
		
			if(hoursDifference<10)
			{
				difference -= hoursDifference*1000*60*60;	 
				var minutesDifference = Math.floor(difference/1000/60);
				
				if(minutesDifference<10 )
				{
					difference -= minutesDifference*1000*60;
					var secondsDifference = Math.floor(difference/1000);
					if(secondsDifference<10)
						return "0"+hoursDifference+":0"+minutesDifference+":0"+secondsDifference;
					if(secondsDifference>=10)
						return "0"+hoursDifference+":0"+minutesDifference+":"+secondsDifference;
					return "0"+hoursDifference+":0"+minutesDifference+":00";
				}
				else if(minutesDifference>=10)
				{
					difference -= minutesDifference*1000*60;
					var secondsDifference = Math.floor(difference/1000);
					if(secondsDifference<10)
						return "0"+hoursDifference+":"+minutesDifference+":0"+secondsDifference;
					if(secondsDifference>=10)
						return "0"+hoursDifference+":"+minutesDifference+":"+secondsDifference;
					return "0"+hoursDifference+":"+minutesDifference+":00";
				}	
			
			}
			
			if(hoursDifference>=10)
			{
				difference -= hoursDifference*1000*60*60;	 
				var minutesDifference = Math.floor(difference/1000/60);
				
				if(minutesDifference<10 )
				{
					difference -= minutesDifference*1000*60;
					var secondsDifference = Math.floor(difference/1000);
					if(secondsDifference<10)
						return hoursDifference+":0"+minutesDifference+":0"+secondsDifference;
					if(secondsDifference>=10)
						return hoursDifference+":0"+minutesDifference+":"+secondsDifference;
					return hoursDifference+":0"+minutesDifference+":00";
				}
				else if(minutesDifference>=10)
				{
					difference -= minutesDifference*1000*60;
					var secondsDifference = Math.floor(difference/1000);
					if(secondsDifference<10)
						return hoursDifference+":"+minutesDifference+":0"+secondsDifference;
					if(secondsDifference>=10)
						return hoursDifference+":"+minutesDifference+":"+secondsDifference;
					return hoursDifference+":"+minutesDifference+":00";
				}	
			
			}
			
			difference -= hoursDifference*1000*60*60
	 
			var minutesDifference = Math.floor(difference/1000/60);
			
			if(minutesDifference<10)
			{
				difference -= minutesDifference*1000*60;
				var secondsDifference = Math.floor(difference/1000);
				if(secondsDifference<10)
					return "00:0"+minutesDifference+":0"+secondsDifference;
				if(secondsDifference>=10)
					return "00:0"+minutesDifference+":"+secondsDifference;
				return "00:0"+minutesDifference+":00";
			}
			else if(minutesDifference>=10)
			{
				difference -= minutesDifference*1000*60;
				var secondsDifference = Math.floor(difference/1000);
				if(secondsDifference<10)
					return "00:"+minutesDifference+":0"+secondsDifference;
				if(secondsDifference>=10)
					return "00:"+minutesDifference+":"+secondsDifference;
				return "00:"+minutesDifference+":00";
			}
			
			difference -= minutesDifference*1000*60;
	 
			var secondsDifference = Math.floor(difference/1000);
			//console.log("secondsDifference " +secondsDifference);
			if(secondsDifference<10)
				return "00:00:0"+secondsDifference;
			if(secondsDifference>=10)	
				return "00:00:"+secondsDifference;
				
			return "00:00:00";
		},
		
		setTime : function(user_id,spaces_id,time,ticket_number,description,ticketID,elemUrl,startTimeHours,startTimeMin)
		{
			localStorage["userID"]=user_id;
			localStorage["spaceID"]=spaces_id;
			localStorage["startTime"]=time;
			localStorage["ticketNumber"]=ticket_number;
			localStorage["description"]=description;
			localStorage["ticketID"]=ticketID;
			localStorage["elemURL"]=elemUrl;
			localStorage["startTimeHours"]=startTimeHours;
			localStorage["startTimeMin"]=startTimeMin;
			this.counterTime();
		},
	
		getTime : function (current,stopBol,stopTimeHours,stopTimeMin)
		{
			var starttime = localStorage["startTime"];
			var user_id = localStorage["userID"];
			var spaces_id = localStorage["spaceID"];
			var ticket_number = localStorage["ticketNumber"];
			var description = localStorage["description"];
			var startTimeHours = localStorage["startTimeHours"];
			var startTimeMin = localStorage["startTimeMin"];
			
			var dat = new Date(starttime);
			var diff = this.timeDifference(current,dat);
			TK.Background.CreateTask(spaces_id,description,ticket_number,diff,stopBol,stopTimeHours,stopTimeMin,startTimeHours,startTimeMin);
			
		},
		
		getLocalStorageDetail : function ()
		{
			var data = [];
			data = [localStorage["spaceID"],localStorage["ticketNumber"]];
			return data;
		},
		
		clearLocalStorage : function ()
		{
			localStorage.removeItem("startTime");
			localStorage.removeItem("userID");
			localStorage.removeItem("spaceID");
			localStorage.removeItem("ticketNumber");
			localStorage.removeItem("description");
			localStorage.removeItem("ticketID");
			localStorage.removeItem("elemURL");
			localStorage.removeItem("startTimeHours");
			localStorage.removeItem("startTimeMin");
			
		},
		
		timeDifference : function(laterdate,earlierdate) 
		{
		
		laterdate=laterdate.getTime()+laterdate.getTimezoneOffset() * 60000;
		earlierdate=earlierdate.getTime()+earlierdate.getTimezoneOffset() * 60000;
		
		
		var difference = laterdate - earlierdate;
		
		if(difference<0)
			return "0.00";
		var daysDifference = Math.floor(difference/1000/60/60/24);
		
		if(daysDifference>0)
		{
			if(daysDifference>1)
				return daysDifference +" days ago";
			else
				return daysDifference +" day ago";
		}
		difference -= daysDifference*1000*60*60*24
	 
		var hoursDifference = Math.floor(difference/1000/60/60);
		
		if(hoursDifference>0)
		{
			difference -= hoursDifference*1000*60*60;
			var minutes = Math.floor(difference/1000/60);
			
			
			if(minutes<10)
				return hoursDifference+".0"+minutes;
			else if(minutes>=10)
				return hoursDifference+"."+minutes;		
			
		}
			
		difference -= hoursDifference*1000*60*60
	 
		var minutesDifference = Math.floor(difference/1000/60);
		
		if(minutesDifference>0)
		{
			if(minutesDifference<10)
				return "0.0"+minutesDifference;
			else if(minutesDifference>=10)
				return "0."+minutesDifference;
		}
			
		difference -= minutesDifference*1000*60;
	 
		var secondsDifference = Math.floor(difference/1000);
		//console.log("secondsDifference " +secondsDifference);
		if(secondsDifference>0)
			return "0.00";
			
			return "0.00";
	},
	
	getNotification : function ()
	{
		this.timer_notification = setInterval(TK.Background.GetNotification, 5000);
	},
	
	stopNotificationCounter : function ()
	{
		clearInterval(this.timer_notification);
		this.timer_notification=null;
	},
	
	logout : function ()
	{
		TK.Document.loginFlag=false;
		TK.Document.loginFlagcheck=false;
		TK.Document.mentionFlag=false;
		TK.Document.new_notification_count='';
		TK.Document.Notification_count='';
		TK.Document.mentionCount='';
		this.stopNotificationCounter();
		this.showLoggedout();
	},
	playSound : function()
	{
		var snd = new Audio("images/NOTIFY.mp3");
		snd.play();
	},
		
	badge_notification : function()
	{
		if(TK.Document.Notification_count==0)
		{
			chrome.browserAction.setBadgeText({ text: ''});
		}
		else
		{
			if(TK.Document.new_notification_count!=TK.Document.Notification_count)
			{
				if(TK.Document.new_notification_count>TK.Document.Notification_count)
				{
					TK.Document.new_notification_count=TK.Document.Notification_count;
					chrome.browserAction.setBadgeBackgroundColor({color : "#FF0000"});
					chrome.browserAction.setBadgeText({ text: '' + TK.Document.Notification_count});
				}
				else
				{
					this.playSound();
					chrome.browserAction.setBadgeText({ text: '' + TK.Document.Notification_count});
					chrome.browserAction.setBadgeBackgroundColor({color : "#FF0000"});
					TK.Document.new_notification_count=TK.Document.Notification_count;
				}
			}	
		}
	},
	
	showLoginIcon : function()
	{
		chrome.browserAction.setIcon({ path: 'icon.png'});
		chrome.browserAction.setBadgeText({ text: ''});
	},
	
	showLoggedout : function()
	{
		chrome.browserAction.setIcon({ path: 'loggedout.png'});
		chrome.browserAction.setBadgeBackgroundColor({color : "#595a5c"});
		chrome.browserAction.setBadgeText({ text: '?'});
	},
		
};

TK.Plugin.showLoggedout();
