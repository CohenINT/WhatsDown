module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [{
		name: 'whatsdown-server',
		script: 'server.js',
		env: {
			COMMON_VARIABLE: 'true'
		},
		env_production: {
			NODE_ENV: 'development'
		},
		"watch": true,
		"ignore_watch": ["node_modules", "store"],
		"watch_options": {
			"followSymlinks": false
		}
	}]
};