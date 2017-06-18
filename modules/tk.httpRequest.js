var EXPORTED_SYMBOLS = [""];


TK.HttpRequest = {
	
	RestClientParameters : function() {
		var _pl = new Array();
		var _name = new Array();

		this.add = function(name, value) {
			for (var i = 0; i < name.length; i++) {
				_pl[i] = value[i];
				_name[i] = name[i];
			}

			return this;
		}
		this.toXml = function() {
			var xml = "";
			for (var i = 0; i < _pl.length; i++) {
				if (typeof(_pl[i]) != "function")
					xml += _name[i] + "=" + _pl[i] + "&";
			}
			xml = xml.slice(0, xml.length - 1);
			return xml;
		}

	},
	
	comment : function(method,value,type,callback,exParam) 
	{
		
			var url = "https://"+TK.Document.user_loginid+":"+TK.Document.user_password+"@www.assembla.com/"+method+value;
							
			var req =  new XMLHttpRequest();   
            req.open('PUT', url);
            req.setRequestHeader("Content-type","application/xml;charset=UTF-8 ");
            req.setRequestHeader("Accept","application/xml");
			req.type = type;
			req.onreadystatechange = function response(event) 
			{
				if (req.readyState == 4) 
				{
					if (req.status == 200) 
					{
						callback(req.responseXML,req.type,req.exParam);
					} 
					else if(req.status == 422)
					{
						//TK.Plugin.customalert('422');
					}
					else if(req.status==401)
					{
						TK.Plugin.logout();
					}
					else 
					{
						TK.Background.xmlll='';
						TK.Plugin.customalert('Unable to process your request check your network connection.');
					}
				}
			};
			req.send("<?xml version='1.0' encoding='UTF-8'?>"+exParam);
	},
	
	invoke : function(method,value,type,callback) 
	{
		
			var url = "https://"+TK.Document.user_loginid+":"+TK.Document.user_password+"@www.assembla.com/"+method+value;
							
			var req =  new XMLHttpRequest();   
            req.open('GET', url);
            req.setRequestHeader("Content-type","application/xml");
            req.setRequestHeader("Accept","application/xml");
			            req.type = type;
			req.onreadystatechange = function response(event) 
			{
				if (req.readyState == 4) 
				{
					if (req.status == 200) 
					{
						callback(req.responseXML,req.type,req.exParam);
					} 
					else if(req.status == 404)
					{
						TK.Plugin.logout();
					}
					else if(req.status==401)
					{
						TK.Plugin.logout();
					}
					else 
					{
						TK.Plugin.customalert('Unable to process your request check your network connection.');
					}
				}
			};
			req.send(null);
	},
	
	invokePOST : function(method,value,type,callback,data,exParam) 
	{
		
			var url = "https://"+TK.Document.user_loginid+":"+TK.Document.user_password+"@www.assembla.com/"+method+value;
							
			var req =  new XMLHttpRequest();   
            req.open('POST', url);
            req.setRequestHeader("Content-type","application/xml");
            req.setRequestHeader("Accept","application/xml");
			req.type = type;
			req.exParam = exParam
			req.onreadystatechange = function response(event) 
			{
				if (req.readyState == 4) 
				{
					if (req.status == 201) 
					{
						callback(req.responseXML,req.type,req.exParam);
					} 
					else if(req.status == 403)
					{
						//TK.Plugin.customalert('403 Unable to process your request check your network connection.');
					}
					else if(req.status==401)
					{
						TK.Background.xmlll='';
						TK.Plugin.logout();
					}
					else 
					{
						TK.Background.xmlll='';
						TK.Plugin.customalert('Unable to process your request check your network connection.');
					}
				}
			};
			req.send("<?xml version='1.0' encoding='UTF-8'?>"+data);
	},
	
	loadRequest : function(method,value,type,callback) 
	{
		
			var url = "https://"+TK.Document.user_loginid+":"+TK.Document.user_password+"@www.assembla.com/"+method+value;
							
			var req =  new XMLHttpRequest();   
            req.open('GET', url);
            req.setRequestHeader("Content-type","text/javascript");
            req.setRequestHeader("Accept","text/javascript, application/javascript, */*; q=0.01");
			req.setRequestHeader("X-Requested-With","XMLHttpRequest");
			req.type = type;
			req.onreadystatechange = function response(event) 
			{
				if (req.readyState == 4) 
				{
					
					if (req.status == 200) 
					{
						callback(req.responseText,req.type,req.exParam);
					} 
					else if(req.status == 302)
					{
						TK.Plugin.logout();
					}
					else if(req.status==404)
					{
						TK.Plugin.logout();
						TK.Plugin.clearLocalStorage();
					}
					else 
					{
						//TK.Plugin.customalert('Unable to process your request check your network connection.');
					}
				}
				
			};
		
			req.send(null);
	},
	
	response : function(doc, type, exParam) 
	{
		TK.API.response(doc, type, exParam)
	},
	
	LoadResponse : function (doc, type, exParam)
	{
		TK.API.LoadResponse(doc, type, exParam)
	},	
	
	commentresponse : function (doc, type, exParam)
	{
		TK.API.response(doc, type, exParam)
	},
	
	sendPOSTRequest: function(method,value,type,data,exParam) 
	{
		var pl = new this.RestClientParameters();
		//if(param)
			//pl.add(param, values);
		this.invokePOST(method, value, type, this.response,data,exParam);
	},
	
	sendGetRequest : function(method,value,type) 
	{	
		var pl = new this.RestClientParameters();
		//if(param)
			//pl.add(param, values);
		this.invoke(method, value, type, this.response);
	},
	
	sendLoadRequest : function(method,value,type) 
	{	
		var pl = new this.RestClientParameters();
		//if(param)
			//pl.add(param, values);
		this.loadRequest(method, value, type, this.LoadResponse);
	},
	sendPUTRequest : function (method,value,type,exParam)
	{
		var pl = new this.RestClientParameters();
		this.comment(method, value, type, this.commentresponse,exParam);
	}
}