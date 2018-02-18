# Installation and use

## [BACK](../README.md)

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

## Known issues

Messages within the same minute can get jumbled up in the database because we don't have any order from WhatsApp. Some thought has to go into this before we do something useful with this. Until then... Send only one message a minute maybe? Seriously. We'll find a way soon.

## [BACK](../README.md)
