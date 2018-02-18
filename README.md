# WhatsDown

An experiment in backing up your WhatsApp chats using the WhatsApp Web interface and a Chrome extension.

## Current state

A working Chrome extension and webserver exists. There's no webapp to read the messages and display yet, and the APIs for such haven't been implemented either.

## Installation and use

Clone this repository locally and install dependencies.

```shell
git clone https://github.com/codefeathers/whatsdown
cd whatsdown
npm install
```

Run the server (I recommend pm2 though).

```shell
node server
```

Using pm2:

```shell
npm install --global pm2
pm2 server.js --name whatsdown-server # Add --watch if you're developing, as it will reload the server if you change files
```

Install the Chrome extension.

- Open `chrome://extensions`
- Enable Developer Mode
- Click "Load unpacked extension..."
- Browse to this repo, select the "Chrome" directory, and click "Open".
- Open (or reload) WhatsApp Web.

You're good to go. WhatsDown - Chrome extension will keep watching for changes and send it to our server. If you're developing, hot-reload exists, and will reload the current tab on your browser when you save changes to the extension. If your current tab is not WhatsApp Web, you'd have to do it manually.

Once messages are sent for the first time, you should see a `store/Messages.db` file in the project folder's root. This is nedb's store.

### Known issues

Messages within the same minute can get jumbled up in the database because we don't have any order from WhatsApp. Some thought has to go into this before we do something useful with this. Until then... Send only one message a minute maybe? Seriously. We'll find a way soon.

## The idea

### i. Background

Whether you like it or not, WhatsApp is by far the most popular messaging application today. But it also requires you to keep a copy of every message you ever sent on your mobile device, indefinitely. At some point the store is going to grow large enough to fill your phone memory. I know it happened to me. WhatsApp has no solution to it. It simply grows in size until it crashes and then you're forced to let go of old messages. WhatsDown is an attempt to handle this issue.

### ii. How it works

WhatsDown is totally passive. It lives in two parts—a Chrome extension, and a Node server running locally. The Chrome extension reads messages on WhatsApp Web, and posts it to the local WhatsDown server. The server then saves it to a flatfile database. A web or desktop application can then be written to read and display these messages whenever you want, with no connection to the internet or WhatsApp on your phone.

WhatsDown is passive—it does not actively send new requests to WhatsApp, or attempt to reverse engineer the API. It simply reads messages from the browser. Hence there is no risk to your existing messages or your WhatsApp account.

WhatsDown is private—none of your messages are sent to a remote server. It all lives on your computer until you decide to backup to any destination of your choice.

### iii. Caveats

Since WhatsDown passively watches texts on WhatsApp Web, it is impossible to get messages that were never opened on the browser. As a result, WhatsDown is perfect for someone (like me) who spends most of their time on WhatsApp Web as opposed to the Android/iOS app.

### iv. Problems

There are still some unsolved problems, like how to assign a unique ID to each chat? I have worked out separating private chats from group chats, but there is no protection against two private chats with the same contact name, or two group chats with the same name and same members from messing up your chat history.

## Version History

`v. 0.2.5` : A basic node server with `nedb` database now works.

`v. 0.2.0` : Chrome extension now works. As new messages are loaded, they are parsed and stored as objects.

`v. 0.1.1` : This entire enterprise is a wack-a-mole. Deal with one bug, two more arises. Putting the project on hold, because I have to get a life.

`v. 0.1.0` : Bug fixes

`v. 0.0.1` : Initial commit. When the extension icon is clicked, all the messages in current chat will be logged in console.
