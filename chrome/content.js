// Instantiate the msgStore
var msgStore = [];

function getBase64FromImageUrl(url) {
	return new Promise(function(resolve, reject) {
		var img = new Image();
		img.setAttribute('crossOrigin', 'anonymous');
		img.src = url;
		img.onload = function () {
			var canvas = document.createElement("canvas");
			canvas.width = this.width;
			canvas.height = this.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(this, 0, 0);
			var dataURL = canvas.toDataURL("image/png");
			resolve(chatIcon = dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
		};
	});
};

function getChatHeader() {
	headerNode = document.querySelectorAll('header')[1];
	var msgHeader = {};
	msgHeader.name = headerNode.innerText.trim().split('\n')[0]
	//TODO: This should return 'Group' if group is detected
	msgHeader.type = 'Private';
	return Promise.resolve(msgHeader);
	
	/* Commented till I find a better way to fetch chat icon */
	
	// iconUrl = $('#main header img').attr('src');
	// return new Promise((resolve, reject) => {
	// 	getBase64FromImageUrl(iconUrl)
	// 		.then(icon => msgHeader.icon = icon)
	// 		.then(() => {
	// 			resolve(msgHeader)
	// 		});
	// })

	/* * */
}

function getMessageContent(thisMessage) {
	var content = new Object();
	contentTime = $(thisMessage)
		.find('.copyable-text')
		.attr('data-pre-plain-text')
		.split(']')[0]
		.replace('[', '')
		.trim(); // 11:31 AM, 2/18/2018
	content.time = moment(contentTime, 'hh:mm aa, MM/DD/YYYY')
	content.type = 'text' || 'image';
	content.text = $(thisMessage).find('.selectable-text').text()
	content.replyTo = $(thisMessage)
		.find('.quoted-mention')
		.text() ?
		$(thisMessage)
		.find('.quoted-mention')
		.text() :
		null;
	return(content);
}

function postToServer(msgCache) {
	// Push to store
	axios
		.post('http://localhost:1995/messages/add', msgCache)
		.then(res => console.log('POSTed a batch of messages'))
		.catch(err => console.log('There was an error posting messages!\n', err));
};

$('#pane-side').ready(() => {
	// Start watching for messages
	$(document)
		.arrive(
			'.message-chat',
			thisMessage => {
				var message = new Object();
				getChatHeader()
					.then(function(header) {
						message.header = header
					})
					.then(function() {
						message.content = getMessageContent(thisMessage)
					})
					.then(function() {
						msgStore.push(message)
					})
					// When msgStore reaches 100 messages, push to server
					// and reset msgStore = []
					.then(function() {
						if (msgStore.length > 100) {
							var msgCache = msgStore;
							msgStore = [];
							postToServer(msgCache)
						}
					})
					.catch(function(err) {
						console.log('There was an error! You must report this:\n', err)
					});
			}
		);
});

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.message === "clicked_browser_action") {
			console.error("This doesn't do anything yet.")
		}
	}
)