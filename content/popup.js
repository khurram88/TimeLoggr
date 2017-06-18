const BACKGROUND = chrome.extension.getBackgroundPage();
var EXPORTED_SYMBOLS = [""];
document.addEventListener('DOMContentLoaded', function () 
{
	document.getElementById('stopBtn').addEventListener('click', function(){
		var stopBol=true;
		TK.Popup.stopCounterBlock(stopBol);
		});
	document.getElementById('ticketComment').addEventListener('keypress', function(e)
	{
		TK.Popup.comment(event);
	});
	
	
});

function list()
{
	TK.Popup.loadSpacesList(BACKGROUND.TK.Document.my_spaces);
}
function expand(event)
{
	var elem= event.target;
	var eID=elem.id;
	var elemClass=elem.className;
	var attrib=elem.getAttribute('ticket');
	var ticketChild=document.getElementById(attrib).childNodes;
	var ticktChildLength=ticketChild;
	
	var elemParent=elem.parentNode;
	var elemParentID=elemParent.id;
	var elemParentClass=elemParent.className;
	//var xx=document.getElementById('ticketContainer');
	if(elemClass=='spaces hide')
	{
		elem.className='spaces hide open'
		var childNode=elem.childNodes;
		childNode[3].src='images/arrow_down.png'
		var offHeight=document.getElementById(attrib).offsetHeight+5;
		 var timerId = setTimeout(function()
		 {
			elem.style.webkitTransitionProperty = "height";
			elem.style.webkitTransitionTiming = "linear";
			elem.style.webkitTransitionDuration = "0.2s";
			elem.style.height = 38+offHeight+"px";
		}, 0);
		//document.getElementById('arrow').src='images/arrow_down.png';
	}
	else if(elemParentClass=='spaces hide')
	{
		elemParent.className='spaces hide open';
		var childNode=elemParent.childNodes;
		childNode[3].src='images/arrow_down.png'
		var offHeight=document.getElementById(attrib).offsetHeight+5;
		 var timerId = setTimeout(function()
		 {
			elemParent.style.webkitTransitionProperty = "height";
			elemParent.style.webkitTransitionTiming = "linear";
			elemParent.style.webkitTransitionDuration = "0.2s";
			elemParent.style.height = 38+offHeight+"px";
		}, 0);
		//document.getElementById('arrow').src='images/arrow_down.png';
	}
	
	else if(elemClass=='spaces hide open')
	{
		elem.className='spaces hide';
		var childNode=elem.childNodes;
		childNode[3].src='images/arrow_left.png';
		var offHeight=document.getElementById(attrib).offsetHeight;
		 var timerId = setTimeout(function()
		{
			elem.style.webkitTransitionProperty = "height";
			elem.style.webkitTransitionTiming = "linear";
			elem.style.webkitTransitionDuration = "0.2s";
			elem.style.height = "38px";
		}, 0);
		
	}
	else if(elemParentClass=='spaces hide open')
	{
		elemParent.className='spaces hide';
		var childNode=elemParent.childNodes;
		childNode[3].src='images/arrow_left.png'
		var offHeight=document.getElementById(attrib).offsetHeight;
		var timerId = setTimeout(function()
		{
			elemParent.style.webkitTransitionProperty = "height";
			elemParent.style.webkitTransitionTiming = "linear";
			elemParent.style.webkitTransitionDuration = "0.2s";
			elemParent.style.height = "38px";
		}, 0);
		
	}
}

TK.Popup={
	
	id : function(id) 
	{
		return document.getElementById(id);		
	},
	commentSend : function()
	{
		var content=this.id('ticketComment').value;
		if(content!='')
		{
			this.id('ticketComment').value='';
			this.id('ticketComment').blur();
			BACKGROUND.TK.View.ticketComment(content);				
		}
		
	},
	comment : function(event)
	{
		var content=this.id('ticketComment').value;
		if(event.keyCode==13)
		{
			if(content!='')
			{
				this.id('ticketComment').value='';
				this.id('ticketComment').blur();
				BACKGROUND.TK.View.ticketComment(content);				
			}
		}
	},
	getUserInfo : function()
	{
		var userName=BACKGROUND.TK.Document.login_name;
		var userID=BACKGROUND.TK.Document.user_id;
		var proUrl='https://www.assembla.com/profile/'+userName;
		
		this.id('MemberName').textContent=userName;

		var img = new Image();
		img.onload = function() 
		{
			TK.Popup.id('MemberPic').src='https://assets2.assembla.com/user/picture/'+userID;
		};
		img.onerror = function() 
		{
			TK.Popup.id('MemberPic').src='images/avatar_black.png';
		};

		img.src = 'https://assets2.assembla.com/user/picture/'+userID; // fires off loading of image

		
		
		//this.id('MemberName').parentNode.setAttribute('href',proUrl);
		//this.id('MemberPic').parentNode.setAttribute('href',proUrl);
		if(BACKGROUND.TK.Document.mentionFlag==true)
		{
			this.id('mentionDiv').style.display='block';
			this.id('loadingSmall').style.display='none';
			this.id('mentions').textContent=BACKGROUND.TK.Document.mentionCount;
		}
		
	},
	mentions : function (mentionCount)
	{
		BACKGROUND.TK.Document.mentionFlag=true;
		this.id('mentionDiv').style.display='block';
		this.id('loadingSmall').style.display='none';
		this.id('mentions').textContent=mentionCount;
		BACKGROUND.TK.Document.mentionCount=mentionCount;
	},
	
	timeCounter : function(count)
	{
		this.id('counter').value=count;
	},
 
	startCounter : function(event,elem)
	{
		var copyTicketList=BACKGROUND.TK.Document.my_tickets;
		BACKGROUND.TK.Document.my_ticketsCopy=copyTicketList;
		BACKGROUND.TK.Document.couterFlag=true;
		this.id('spaceAppendDiv').style.maxHeight='405px';
			
		var space_id = elem.getAttribute('data_attrib');
		var ticketNumber = elem.getAttribute('ticketNumber');
		var description = elem.getAttribute('description');
			
			
		var elemParent=elem.parentNode;
		var parentID=elemParent.id;
			
			
			
		BACKGROUND.TK.Document.counterTicketID=parentID;
			
		var childSpan=elemParent.getElementsByTagName('span');
		var childDes=elemParent.getElementsByTagName('a');
		var childTicketNum=childSpan[0].textContent;
		var childSpanTxt=childDes[0].textContent;
		var elemUrl=childDes[0].getAttribute('href');
		BACKGROUND.TK.Document.ticketUrl=elemUrl;
			
			//var copyTicketList=BACKGROUND.TK.Document.my_tickets;
			
			
			
		BACKGROUND.TK.Document.counterArr[0]=childTicketNum;
		BACKGROUND.TK.Document.counterArr[1]=childSpanTxt;
		BACKGROUND.TK.Document.counterArr[2]=space_id;
				
		BACKGROUND.TK.Document.counterArr; 
				
		if(this.id('counterDiv').style.display=='none')
		{
			this.id('counterDiv').style.display='block';
			BACKGROUND.TK.View.setLocalStorage(BACKGROUND.TK.Document.user_id,space_id,ticketNumber,description,parentID,elemUrl);
		}
		else
		{
					
			var stopBol=false;
			BACKGROUND.TK.Document.UserID = BACKGROUND.TK.Document.user_id;
			BACKGROUND.TK.Document.spaceID = space_id;
			BACKGROUND.TK.Document.ticketNumb =ticketNumber;
			BACKGROUND.TK.Document.descript=description;
			BACKGROUND.TK.Document.parID=parentID;
			BACKGROUND.TK.Document.childticknum=childTicketNum;
			BACKGROUND.TK.Document.chilcspntxt=childSpanTxt;
			BACKGROUND.TK.Document.elemulr = elemUrl;
			
			
			/* var starttime = localStorage["startTime"];
			var user_id = localStorage["userID"];
			var spaces_id = localStorage["spaceID"];
			var ticket_number = localStorage["ticketNumber"];
			var descript = localStorage["description"];
			var ticket_id = localStorage["ticketID"];
			var URL = localStorage["elemURL"]; */
					
			this.stopCounterBlock(stopBol);
			
			
		}
		TK.Popup.loadSpacesList();
	},
	
	startSecondCounter : function() 
	{
		var user_id = BACKGROUND.TK.Document.UserID;
		var space_id = BACKGROUND.TK.Document.spaceID;
		var ticketNumber = BACKGROUND.TK.Document.ticketNumb;
		var description = BACKGROUND.TK.Document.descript;
		var parentID = BACKGROUND.TK.Document.parID;
		var childTicketNum = BACKGROUND.TK.Document.childticknum;
		var childSpanTxt = BACKGROUND.TK.Document.chilcspntxt;
		var elemulr = BACKGROUND.TK.Document.elemulr;
		
		BACKGROUND.TK.View.setLocalStorage(BACKGROUND.TK.Document.user_id,space_id,ticketNumber,description,parentID,elemulr);
		document.getElementById('counterTckt').textContent=childTicketNum;
		document.getElementById('counterTicketTxt').textContent=childSpanTxt;
		document.getElementById('counterTicketTxt').setAttribute('href',elemulr);
		this.loadSpacesList();
	},
	
	showCounter : function(CounterTicket)
	{
		this.id('spaceAppendDiv').style.maxHeight='405px';
		this.id('counterDiv').style.display='block';
		var ticktNum=CounterTicket.getElementsByTagName('span');
		var description=CounterTicket.getElementsByTagName('a');
		var elemUrl=description[0].getAttribute('href');
		document.getElementById('counterTckt').textContent=ticktNum[0].textContent;
		document.getElementById('counterTicketTxt').textContent=description[0].textContent;
		document.getElementById('counterTicketTxt').setAttribute('href',elemUrl);
		
		BACKGROUND.TK.View.counterTime();
	},
	
	showCounterFromLocal : function ()
	{
		
		var ticketID = localStorage["ticketID"];
		
		if(ticketID)
		{
			
			var starttime = localStorage["startTime"];
			var user_id = localStorage["userID"];
			var spaces_id = localStorage["spaceID"];
			var ticket_number = localStorage["ticketNumber"];
			var descript = localStorage["description"];
			var ticket_id = localStorage["ticketID"];
			var URL = localStorage["elemURL"];
			
			
			var CounterTicket = this.id('counterDiv');
			this.id('spaceAppendDiv').style.maxHeight='405px';
			CounterTicket.style.display='block';
			var ticktNum=CounterTicket.getElementsByTagName('span');
			var description=CounterTicket.getElementsByTagName('a');
			
			ticktNum[0].textContent="#"+ticket_number;
			description[0].textContent=descript;
			description[0].setAttribute('href',URL);
			
			BACKGROUND.TK.View.counterTime();
			
			
		}
		
	},
	
	stopCounter : function()
	{
		BACKGROUND.TK.Document.couterFlag=false;
		BACKGROUND.TK.Document.counterTicketID='';
		
		this.id('counterDiv').style.display='none';
		this.id('spaceAppendDiv').style.maxHeight='488px';
		
		BACKGROUND.TK.Background.GetMyTickets(); 
		
	},
	
	stopCounterBlock : function(stopBol)
	{
		BACKGROUND.TK.View.getLocalStorage(stopBol);
	},
	
	loadSpacesList: function()
	{
		
		var node=this.id('spaceAppendDiv');
		while (node.hasChildNodes()) 
		{
    		node.removeChild(node.lastChild);
		}
		var spaceList=BACKGROUND.TK.Document.my_spaces;
		//BACKGROUND.TK.Plugin.customalert(spaceList[0],'id');
		//alert(BACKGROUND.TK.Document.getValue(spaceList[0],'id'));
		//id('your-friends-container').innerHTML=''
		for(var i=0;i<spaceList.length;i++)
		{
				
				var spaceNode=this.id('spaceClone');
				spaceNode=spaceNode.cloneNode(true);
				spaceNode.style.display='block';
				spaceNode.id=BACKGROUND.TK.Document.getValue(spaceList[i],'id');
				
				var childNodes=spaceNode.childNodes;
				var spaceName=spaceNode.getElementsByTagName('span');
				var ticketDiv=spaceNode.getElementsByTagName('div');
				//ticketDiv[0].style.display='block';
				var arrowImg=spaceNode.getElementsByTagName('img');
				arrowImg[0].setAttribute('ticket',BACKGROUND.TK.Document.getValue(spaceList[i],'id')+"ticket");
				spaceNode.setAttribute('ticket',BACKGROUND.TK.Document.getValue(spaceList[i],'id')+"ticket");
				spaceName[1].setAttribute('ticket',BACKGROUND.TK.Document.getValue(spaceList[i],'id')+"ticket");
				spaceName[0].setAttribute('ticket',BACKGROUND.TK.Document.getValue(spaceList[i],'id')+"ticket");
				
				ticketDiv[0].id=BACKGROUND.TK.Document.getValue(spaceList[i],'id')+"ticket";
				
				spaceName[0].textContent=BACKGROUND.TK.Document.getValue(spaceList[i],'name');
	
				
				
				//var ticketNode=this.id(BACKGROUND.TK.Document.getValue(spaceList[i],'id')+"ticket");
				var ticketNode=ticketDiv[0];
				BACKGROUND.TK.Document.my_ticketsCopy=BACKGROUND.TK.Document.my_tickets;
				var ticketList=BACKGROUND.TK.Document.my_ticketsCopy;
				
				for(var k=0;k<ticketList.length;k++)
				{
					var ticketAppend=this.id('ticketClone');
					ticketAppend=ticketAppend.cloneNode(true);
					ticketAppend.style.display='block';
					ticketAppend.id=BACKGROUND.TK.Document.getValue(ticketList[k],'id');
					var childNodes=ticketAppend.childNodes;
					var ticketSpan=ticketAppend.getElementsByTagName('span');
					var ticketDes=ticketAppend.getElementsByTagName('a');
					var playIMG = ticketAppend.getElementsByTagName('img');
					ticketSpan[0].textContent="#"+BACKGROUND.TK.Document.getValue(ticketList[k],'number');
					ticketDes[0].textContent=BACKGROUND.TK.Document.getValue(ticketList[k],'summary');
					var wikiName=BACKGROUND.TK.Document.getValue(spaceList[i],'wiki-name');
					var url="https://www.assembla.com/spaces/"+wikiName+"/tickets/"+BACKGROUND.TK.Document.getValue(ticketList[k],'number');
					ticketDes[0].setAttribute('title',BACKGROUND.TK.Document.getValue(ticketList[k],'summary'));
					ticketDes[0].setAttribute('href',url);
					
					playIMG[0].setAttribute('data_attrib',BACKGROUND.TK.Document.getValue(ticketList[k],'space-id'));
					playIMG[0].setAttribute('ticketNumber',BACKGROUND.TK.Document.getValue(ticketList[k],'number'));
					playIMG[0].setAttribute('description',BACKGROUND.TK.Document.getValue(ticketList[k],'summary'));
					playIMG[0].addEventListener("click", function (e) {TK.Popup.startCounter(e,this);}, false);
					storTicketID=localStorage["ticketID"];
					
					if(BACKGROUND.TK.Document.getValue(ticketList[k],'space-id')==BACKGROUND.TK.Document.getValue(spaceList[i],'id') && ticketAppend.id!=storTicketID)
					{
						ticketNode.appendChild(ticketAppend);
					}
					else if(BACKGROUND.TK.Document.getValue(ticketList[k],'space-id')==BACKGROUND.TK.Document.getValue(spaceList[i],'id') && ticketAppend.id==storTicketID)
					{
						this.showCounterFromLocal();
					}
					
				}
				var ticketLength=ticketDiv[0].childNodes;
				var totalTicketSpace=ticketLength.length-1;
				for(var c=1; c<ticketLength.length; c+=2)
					{
						ticketLength[c].style.background='-webkit-gradient(linear, 0% 0%, 0% 100%, from(#C2C2C2), to(#DBDBDB))';
						ticketLength[ticketLength.length-1].style.borderBottom='1px solid grey';
					}
				if(totalTicketSpace!='0')
				{
					spaceName[1].textContent="("+totalTicketSpace+")";
					spaceNode.addEventListener('click',expand ,false);
				}
				if(totalTicketSpace=='0')
				{
					spaceName[1].textContent='';
				}
				BACKGROUND.TK.Document.my_ticketsCopy=ticketList;
				if(totalTicketSpace<1)
				{
					arrowImg[0].style.display='none';
					spaceName[1].style.marginRight='47px';
				}
				
				node.appendChild(spaceNode);
				/* setTimeout(function(){
						//node.addEventListener('click',expand);
					var targeted = document.getElementsByClassName("arrow");
					for(var j=0; j<targeted.length; j++)
					{
						var target_item = targeted.item(j)	
						target_item.addEventListener('click',expand ,false);
						
						//alert(blast_id);
					}
				
					},0) */
		}
		this.id('loading').style.display='none';
		this.id('spaceAppendDiv').style.display='block';
		this.id('ticketTotal').textContent=BACKGROUND.TK.Document.my_ticketsLength;
		
	},
	
	showLoading : function()
	{
		this.id('loading').style.display='block';
		this.id('spaceAppendDiv').style.display='none';
		BACKGROUND.TK.Document.loadingFlag=false;
		
	},
	showLogin : function()
	{
		var loginUrl='https://www.assembla.com/login';
		BACKGROUND.TK.Plugin.createTab(loginUrl);
		//BACKGROUND.TK.Plugin.updateTab(loginUrl);
	}
}


window.onload = function() {
	
	TK.Popup.showCounterFromLocal();
	TK.Popup.getUserInfo();
	TK.Popup.loadSpacesList();
	BACKGROUND.TK.View.updateView();
	if(BACKGROUND.TK.Document.couterFlag==true)
	{
		//TK.Popup.showCounter();
	}
	if(BACKGROUND.TK.Document.loadingFlag==true)
	{
		TK.Popup.showLoading();
	}
	if(BACKGROUND.TK.Document.loginFlag==false)
	{
		TK.Popup.showLogin();
	}
	
	
	//BACKGROUND.TK.Document.setSpacesInfo();
}