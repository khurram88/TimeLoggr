var EXPORTED_SYMBOLS = [""];

TK.Alert={
	
	showErrorAlert : function(errorText)
	{
		$.noticeAdd({text:errorText, title: 'Just saying hi', position: 'bottom', type: 'error', stay: false});
	}

}