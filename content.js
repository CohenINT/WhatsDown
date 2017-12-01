function injectthis() {
	messages = document.getElementsByClassName("bubble")
	for(var i=0; i<messages.length; i++){
		var messageHeader = (messages[i].dataset['prePlainText'])//.split("]")
		var messageContent = messagecontent = /( -->)(.+)?(<!-- \/react-text)/g.exec(messages[i].innerHTML)
		var content = messageHeader + "\n" + messagecontent[2]
		console.log(content)
	}
}

// content.js
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if( request.message === "clicked_browser_action" ) {
			injectthis()
		}
	}
)