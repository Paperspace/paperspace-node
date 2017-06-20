'use strict';

var client = require('./client');
var authorize = require('./authorize');
var Route = require('route-parser');

var API_KEY_HEADER = 'x-api-key';

// This function takes an 'endpointSpec' (an object with properties that describe the
// HTTP endpoint we are going to hit), a 'methodParams' (an object that contains all
// of the params we want to send to that endpoint), and a Node-style callback function,
// and executes the respective request to that endpoint.
//
// An 'endpointSpec' looks like this:
//   {
//     group: 'foo',
//     name: 'bar',
//     method: 'post',
//     route: '/baz/qux',
//     requires: {
//       hello: String,
//       there: String,
//     },
//     file: 'paramName',
//     returns: {}
//   }
//
// And part of this method's responsibility is to convert this into a URL and request
// parameters that can be sent into the 'client' function.
function method(endpointSpec, methodParams, cb) {
	// Check if any required parameters are missing, or of the wrong type
	if (endpointSpec.requires) {
		for (var requiredKey in endpointSpec.requires) {
			var requiredType = endpointSpec.requires[requiredKey];
			var givenParam = methodParams[requiredKey];

			if (givenParam === void 0 || givenParam === null) {
				return cb(
					new Error('Missing required parameter `' + requiredKey + '`')
				);
			}

			if (typeof givenParam !== requiredType) {
				return cb(
					new Error(
						'Parameter `' + requiredKey + '` expected to be a ' + requiredType
					)
				);
			}
		}
	}

	// Generate a URL path by substituting route segments with their values
	var route = new Route(endpointSpec.route);
	var path = route.reverse(methodParams);
	var method = endpointSpec.method;

	// Used for caching auth credentials between multiple requests in the same process
	var cacheObject = {};

	var maybeAuthEmail = methodParams.authEmail;
	var maybeAuthPassword = methodParams.authPassword;
	var maybeAuthAccessToken =
		methodParams.accessToken || methodParams.access_token;
	var maybeAuthApiKey = methodParams.apiKey || methodParams.api_key;

	var methodHeaders = {};

	var file;
	if (endpointSpec.file) {
		 file = methodParams[endpointSpec.file];
		 methodParams[endpointSpec.file] = undefined;
	}

	// Only bother with the auth ritual if the endpoint is defined as requiring it.
	if (endpointSpec.auth) {
		// Authorize takes a handful of optional auth credentials and returns
		// a token or an api key, depending on the precedence it defines.
		return authorize(
			maybeAuthEmail,
			maybeAuthPassword,
			maybeAuthAccessToken,
			maybeAuthApiKey,
			cacheObject,
			function _authCb(authErr, foundAccessToken, foundApiKey) {
				if (authErr) return cb(authErr);

				// The API key should always get the highest precedence
				if (foundApiKey) {
					methodHeaders[API_KEY_HEADER] = foundApiKey;
				} else if (foundAccessToken) {
					if (!methodParams.access_token) {
						methodParams.access_token = foundAccessToken;
					}
				}

				return client(method, path, methodParams, methodHeaders, file, cb);
			}
		);
	}

	return client(method, path, methodParams, methodHeaders, file, cb);
}

module.exports = method;
