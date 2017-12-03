/*const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.listen(port)

console.log("Server running on port " + port) */

//

const Datastore = require('nedb-promise')

const User = new Datastore({
	autoload: true,
	filename: 'store/User.db'
})
/*
User.ensureIndex({
	fieldName: 'id',
	unique: true
})

User.ensureIndex({
	fieldName: 'name',
	unique: true
})*/

const addUser = ({ id, name = '', chats = [] }) =>
	User.update(
		{ id },
		{
			name,
		},
		{
			chats
		},
		{ upsert: true }
	)
		.catch()

addUser({ id: "1" , user: "Muthu Kumar", chats: []})

const getUser = user => User.findOne(user)

getUser("Muthu Kumar")

/*
var chatstore = [
	{
		user: "Muthu Kumar",
		messages: [
			{
				msgid: "1",
				date: "12",
				message: "Something was said"
			},
			{
				msgid: "2",
				date: "13",
				message: "A man is no one"
			}
		]
	},
	{
		user: "Pouria Ezzati",
		messages: [
			{
				msgid: "1",
				date: "12",
				message: "I see"
			},
			{
				msgid: "2",
				date: "13",
				message: "Just use JavaScript"
			}
		]
	}
]

for (let i; i<chatstore.length; i++) {
	db.update(chatstore[i], function (err, newDoc) {
		if (err) console.log("There was an error adding this chat to datastore")
	})
}*/