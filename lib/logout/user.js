'use strict';

var userConfig = require('./../userConfig');

/**
 * @memberof logout
 * @method user
 * @description Logs out the user (removes any cached API key)
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.logout.user(function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace logout
 * @example
 * # HTTP request:
 * # Note: there is no HTTP request corresponding to 'paperspace logout'.
 */

function user(params, cb) {
	userConfig.clear();
	return cb();
}


module.exports = user;