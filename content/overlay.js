




try {
	var elem = document.getElementById('user_password');
	var click = document.getElementsByClassName('button');
	elem.addEventListener('keypress', function(e){onsubmit(e);}, false);
	click[0].addEventListener('click', function(e){onsubmitclick(e);}, false);
}
catch (e) {
   // alert(e);
} 

function onsubmit(event)
{
	if(event.keyCode==13)
	{
		var elem = document.getElementById('user_password').value;
		chrome.extension.sendRequest({userpassword: elem});
	}	
}

function onsubmitclick(event)
{
	var elem = document.getElementById('user_password').value;
	chrome.extension.sendRequest({userpassword: elem});
}