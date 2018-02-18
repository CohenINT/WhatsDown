const path = require('path');
const env = process.env.NODE_ENV;

let dbFile = path.resolve(path
	.dirname(require.main.filename),
	'store'
);

if (env === 'development' || 'DEVELOPMENT') {
	dbFile = path.join(dbFile, 'test.db');
} else {
	dbFile = path.join(dbFile, 'Messages.db');
};

module.exports = {
	env,
	dbFile,
	port: 1995,
}