var _class = (className) => Array.prototype.slice.call(document.getElementsByClassName(className))
var _tag = (tagName) => Array.prototype.slice.call(document.getElementsByTagName(tagName))
var _id = (idName) => Array(document.getElementById(idName))

// From StackOverflow.
function toDataURL(url, callback) {
	var xhr = new XMLHttpRequest()
	xhr.onload = function () {
		var reader = new FileReader()
		reader.onloadend = function () {
			callback(reader.result)
		}
		reader.readAsDataURL(xhr.response)
	}
	xhr.open('GET', url)
	xhr.responseType = 'blob'
	xhr.send()
}

function injectthis() {
	setTimeout(() => {
		getChatInfo()
		//getCurrentChat()
	}, 2000)
	// I know this is a huge hack. On load of main chat,
	// there is an unwanted "Click for more details" string.
	// To avoid that, I setTimeout to 2 seconds, and it works.
	// What if someone's network is slower?
}

function getChatInfo() {
	var chatInfo = _class("pane-header")[1].innerText.trim().split("\n")
	var chatName = chatInfo[0]
	var chatType, participants, msgCount
	if (chatInfo[1]) {
		chatType = "Group"
		participants = (chatInfo[1].split(","))
	}
	else chatType = "Private"
	var chatAvatarSrc = (_class("pane-header"))[1]
		.getElementsByTagName("img")[0].src
	console.log(chatAvatarSrc)
	var rxGetData = /data:image\/jpeg;base64,/g
	var chatAvatar

	(async () => {
		await toDataURL(chatAvatarSrc, (res) => {
			chatAvatar = rxGetData.exec(res)
		})
		console.log(chatAvatar)
	})()

	/* toDataURL(chatAvatarSrc, (dataUrl) => {
		chatAvatar = dataUrl.replace(rxGetData, "")
	}).then(dataUrl => {
		console.log(dataUrl) }) */
	console.log("---------- " + chatName + " ----------")
	if (chatType == "Group") console.log("Participants: " + String(participants))
	/*}
	
	function getCurrentChat() { */
	var messages = _class("bubble")
	msgCount = 0

	for (var i = 0; i < messages.length; i++) {
		var messageHeader = messages[i].dataset['prePlainText']
		var messageTime, messageDate, messageUser, Header

		// Extracts Time and Name separately (for use with database)
		if (messageHeader) {
			messageHeader = String(messageHeader)
				.replace('[', '')
				.replace(']', ',')
				.slice(0, -1)
				.split(',')
			messageTime = messageHeader[0]
			messageDate = messageHeader[1].trim()
			messageUser = messageHeader[2].trim().substr(0, messageHeader[2].length - 1)
			Header = messageUser + ' | ' + messageDate + " : " + messageTime + "\n"
		} else {
			Header = ''
		}

		var msgContent = messages[i].innerText.split('\n')

		msgContent = msgContent.slice(0, msgContent.length - 2)
		var msgReplyTo
		var replyCheck = String(Array.prototype.slice.call(messages[i].getElementsByClassName("text-quote")))
		if (replyCheck != "") {
			var replyContent = messages[i].getElementsByClassName("text-quote")[0].innerText.trim().split("\n")
			var replyTo = replyContent[0]
			var replyMsg = replyContent[1]
			msgReplyTo = "> " + replyTo + " : " + replyMsg
		}
		if (replyCheck == "") {
			msgReplyTo = ""
		}

		var msgText = messages[i].querySelector(".emojitext.selectable-text.invisible-space.copyable-text")

		// var msgText = String(msgContent.splice(msgContent.length - 3, 1))
		msgText = msgText ? msgText : '<skipped>'

		//msgReplyTo = msgContent.splice(0, msgContent.length - 2)

		//if (!msgReplyTo[0]) msgReplyTo = ""
		//else msgReplyTo = "> " + msgReplyTo[0] + " : " + msgReplyTo[1] + "\n"
		//if (!msgReplyTo) msgReplyTo = ""

		var content = Header + msgReplyTo + msgText
		msgCount++
		console.log(content)
	}
	console.log("Grabbed " + msgCount + " messages from " + chatName + "...")
}

function startListening() {
	try {
		_id("pane-side")[0].addEventListener("click", injectthis)
		console.log("Listening silently...")
	} catch (e) {
		setTimeout(() => {
			startListening()
		}, 3000)
	}
}

setTimeout(() => {
	startListening()
}, 5000)

// content.js

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.message === "clicked_browser_action") {
			console.error("This doesn't do anything. STOP CLICKING ON IT.")
		}
	}
)

