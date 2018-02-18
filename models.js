// DB Model:
chatStore = [
	{
		chatId: String | Number,
		header: {
			name: String,
			type: String,
			icon: String,
		},
		content: [
			{
				messageId: String,
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
		name: String,
		type: String,
		icon: String,
	},
	content: {
		time: Date,
		type: 'text' | 'image',
		text: String | Object,
		replyTo: null | messageId,
	}
}