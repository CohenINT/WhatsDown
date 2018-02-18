# The idea

## [BACK](../README.md)

## i. Background

Whether you like it or not, WhatsApp is by far the most popular messaging application today. But it also requires you to keep a copy of every message you ever sent on your mobile device, indefinitely. At some point the store is going to grow large enough to fill your phone memory. I know it happened to me. WhatsApp has no solution to it. It simply grows in size until it crashes and then you're forced to let go of old messages. WhatsDown is an attempt to handle this issue.

## ii. How it works

WhatsDown is totally passive. It lives in two parts—a Chrome extension, and a Node server running locally. The Chrome extension reads messages on WhatsApp Web, and posts it to the local WhatsDown server. The server then saves it to a flatfile database. A web or desktop application can then be written to read and display these messages whenever you want, with no connection to the internet or WhatsApp on your phone.

WhatsDown is passive—it does not actively send new requests to WhatsApp, or attempt to reverse engineer the API. It simply reads messages from the browser. Hence there is no risk to your existing messages or your WhatsApp account.

WhatsDown is private—none of your messages are sent to a remote server. It all lives on your computer until you decide to backup to any destination of your choice.

## iii. Caveats

Since WhatsDown passively watches texts on WhatsApp Web, it is impossible to get messages that were never opened on the browser. As a result, WhatsDown is perfect for someone (like me) who spends most of their time on WhatsApp Web as opposed to the Android/iOS app.

## iv. Problems

There are still some unsolved problems, like how to assign a unique ID to each chat? I have worked out separating private chats from group chats, but there is no protection against two private chats with the same contact name, or two group chats with the same name and same members from messing up your chat history.

## [BACK](../README.md)
