'use strict';

var configInfo = require('./config');
var request = require('./request');

var processEnv = (typeof process !== 'undefined' && process.env) || {};
var nodeEnv = processEnv.NODE_ENV;
var config = configInfo[nodeEnv || 'production'];

// Simple wrapper over the request function that inserts a 'host' parameter
// as the first argument, since most use cases are always going to use the
// same host as provided via the baked-in config.
function client(method, path, inputs, headers, file, cb) {
	var body = null;
	var query = {};
	var options = {};

	// It's assumed these will be provided, but just in case...
	if (!headers) headers = {};

	// Send input params as the query string if this is a GET, otherwise send
	// with the HTTP request body
	switch (method.toLowerCase()) {
		case 'get':
			query = inputs;
			break;

		case 'post':
			if (file) {
				query = inputs;
				break;
			}

		default: // eslint-disable-line no-fallthrough
			// Don't leave the access token on the inputs object since the jwt
			// really belongs on the query string (at least, per the way the interface
			// to the Paperspace API is currently set up).
			query.access_token = inputs.access_token;
			delete inputs.access_token;
			body = inputs;
			break;
	}
	// The rubber finally meets the road with 'request', which initiates
	// the request via Superagent
	return request(
		path === '/jobs/logs' ? config.logHost : config.host,
		method,
		path,
		body,
		query,
		headers,
		options,
		file,
		cb,
		inputs.debug
	);
}

module.exports = client;
