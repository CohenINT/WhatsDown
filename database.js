const config = require('./config');

const dbFile = config.dbFile;

const Datastore = require('nedb');

db = new Datastore({
	filename: dbFile,
	autoload: true
});

module.exports = db