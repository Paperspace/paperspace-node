'use strict';

var method = require('./../method');
var assign = require('lodash.assign');
var userConfig = require('./../userConfig');

/**
 * @memberof login
 * @method user
 * @description Logs in the user and acquires an api key.  If run from the command line and no email or password option is specified
 * the user is prompted to enter them.  Note: the api key is cached in the user's home directory in ~/.paperspace/config.json. 
 * You can execute paperspace logout to clear the cached api key. 
 * An optional apiToken parameter may also be specified; if specified, an API token with that name must already exist in the user's account.
 * @param {object} params - Login user parameters
 * @param {string} params.email - Email address of the paperspace user to log in
 * @param {string} params.password - Password for the specified email address
 * @param {string} [params.apiToken] - Optional name of an existing API token for the user's account
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.login.user({
 *   email: 'user@domain.com',
 *   password: 'secretpw',
 *   apiToken: 'API token', // optional; if specified, an API token with that name must already exist in the user's account
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace login --email user@mail.com --password "secretpw" --apiToken "API token"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /apiToken/createPublic
 * # Returns 200 on success
 */

function user(params, cb) {
	if (params.apitoken && !params.apiToken) {
		params.apiToken = params.apitoken;
		delete params.apitoken;
	}
	if (params.api_token && !params.apiToken) {
		params.apiToken = params.api_token;
		delete params.api_token;
	}
	return method(user, params, function _cb(err, res) {
		if (err) {
			if (global.paperspace_cli) {
				return cb(err, 'nojson');
			}
			return cb(err);
		}
		userConfig.setApiKey(res.key, res.name);
		return cb();
	});
}

assign(user, {
	auth: true,
	group: 'login',
	name: 'user',
	method: 'post',
	route: '/apiTokens/createPublic',
	requires: {},
	returns: {},
});

module.exports = user;