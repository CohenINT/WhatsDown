// DB Model:
chatStore = [
	{
		chatId: String | Number,
		header: {
			name: String, // Chat name
			type: 'Private' | 'Group',
			icon: String,
		},
		content: [
			{
				messageOrder: Number,
				from: String | 'You', // Chat participant or sender name
				fromSelf: true,
				time: Date,
				type: String,
				text: String | Object,
				replyTo: null | messageId,
			},
		]
	},
]

// Browser model:
message = {
	header: {
		name: String, // Chat name
		type: String,
		icon: String,
	},
	content: {
		messageOrder: Number,
		from: String | 'You', // Chat participant or sender name
		fromSelf: true,
		time: Date,
		type: 'text' | 'image',
		text: String | Object,
		replyTo: null | messageId,
	}
}