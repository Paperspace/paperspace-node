'use strict';

module.exports = {
	production: {
		host: 'https://api.paperspace.io',
		logHost: 'https://logs.paperspace.io',
	},
	local: {
		host: 'http://localhost:3102',
		logHost: 'https://localhost:3103',
	},
	test: {
		host: 'http://localhost:3102',
		logHost: 'https://localhost:3103',
	},
};
