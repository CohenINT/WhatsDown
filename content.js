function injectthis() {
	var messages = document.getElementsByClassName("bubble")
	var messageContents = document.getElementsByClassName("selectable-text")
	for(var i=0; i<messages.length; i++){
		var messageHeader = (messages[i].dataset['prePlainText']).split("]")
		var messageContent = messageContents[i].innerText
		var content = messageHeader + "\n" + messageContent
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