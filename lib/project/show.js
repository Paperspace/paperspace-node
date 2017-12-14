'use strict';

var projectConfig = require('./../projectConfig');

/**
 * @memberof project
 * @method show
 * @description Show the project configuration settings.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} project config
 * @example
 * paperspace.project.show(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace project show
 * @example
 * # Note: there is no HTTP request corresponding to 'paperspace project show'.
 * @example
 * // Example return value:
 * {
 *   "project": "myproject",
 *   "lastJobId": "j123abc",
 * }
 */

function show(params, cb) {
	var config = projectConfig.show();
	return cb(null, config);
}

module.exports = show;
