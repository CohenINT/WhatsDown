function injectthis() {
	var messages = document.getElementsByClassName("bubble")
	for(var i=0; i<messages.length; i++){
		headerPattern = /[^[\]][\sa-zA-Z:,/\d]*/g // Extracts Time and Name separately (use later)
		var messageHeader = messages[i].dataset['prePlainText']
		messageHeader = messageHeader ? messageHeader : ''

		var messageContent = ''
		regexp = /-->[^<][\s\S]+?<!--/g // Takes the innerHTML from markup between (and including) --> and <!--
		while ((match = regexp.exec(messages[i].innerHTML)) != null) { // Gets all matches and adds them together
			var addTo = (/[^(-->)].*[^(<!--)]/g.exec(match[0]))[0] // Removes --> and <!--
			messageContent = messageContent + addTo
		}

		var content =  messageHeader + "\n" + (messageContent ? messageContent : '<emoji skipped>')
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