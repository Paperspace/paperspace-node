'use strict';

// set paperspace_cli to see if we are being run at the command line
// note: there are four typical entry points to the library: bin/paperspace, lib/paperspace.js, index.js, and lib/cli.js
if (!global.paperspace_cli) global.paperspace_cli = (require.main === module);

var assign = require('lodash.assign');
var pkg = require('./../package.json');
var endpoints = require('./endpoints');

var NO_CREDS = new Error('Please provide Paperspace credentials');

// Iterate through all the endpoints available and return the namespace,
// method name, and method to the iterator function
function eachEndpoint(iterator) {
	for (var namespace in endpoints) {
		var methods = endpoints[namespace];

		for (var name in methods) {
			var method = methods[name];

			iterator(namespace, name, method);
		}
	}

	return endpoints;
}

function wrapMethod(method, options) {
	return function _methodWrapper(params, cb) {
		// Merge the options passed into the paperspace 'constructor' with the params
		// passed to the method call itself, making it more convenient for params to
		// be passed once and then reused when actually making the requests, but allowing
		// each method to live standalone as well
		var full = options;
		if (cb) {
			full = assign({}, full, params);
		} else {
			cb = params;
		}

		return method(full, cb);
	};
}

function isAnyAuthOptionPresent(opts) {
	return (
		(opts.authEmail || opts.email) || // Option 1: email auth
		(opts.accessToken || opts.access_token) || // Option 2: jwt auth
		(opts.apiKey || opts.api_key) // Option 3: API key auth (preferred)
	);
}

// Entrypoint to the API for those who want to use a certain set of credentials
// for authenticating all requests
function paperspace(options) {
	if (options && !isAnyAuthOptionPresent(options)) {
		throw NO_CREDS;
	}

	var api = {};

	eachEndpoint(function _eachEndpoint(namespace, name, method) {
		if (!api[namespace]) api[namespace] = {};
		api[namespace][name] = wrapMethod(method, options);
	});

	return api;
}

// Expose this so the command-line tool can easily autogen its API
paperspace.eachEndpoint = eachEndpoint;

paperspace.VERSION = pkg.version;

module.exports = paperspace;
