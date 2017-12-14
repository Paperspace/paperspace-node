'use strict';

var projectConfig = require('./../projectConfig');

/**
 * @memberof project
 * @method clear
 * @description Clear the project configuration settings.  Only the project name will remain in the config file.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} project config
 * @example
 * paperspace.project.clear(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace project clear
 * @example
 * # Note: there is no HTTP request corresponding to 'paperspace project clear'.
 * @example
 * // Example return value:
 * {
 *   "project": "myproject",
 * }
 */

function clear(params, cb) {
	projectConfig.clear();
	var config = projectConfig.show();
	return cb(null, config);
}

module.exports = clear;
