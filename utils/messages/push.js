const db = require('../../database');

const push = messagesArray => {
	messagesArray.map(message => {
		header = message.header;
		content = message.content
		db.update({
			header
		}, {
			$set: {
				header
			},
			$addToSet: {
				content
			}
		}, {
			upsert: true
		})
	})
}

module.exports = push;