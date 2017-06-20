'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof accounts
 * @method script
 * @description Uploads a new startup script to the account.  Optionally specify a machine to use this startup script.
 * Note: currently only Linux based machines support startup scripts.  Also, note: script data is limited to 16KB per script.
 * @param {string} scriptName - A unique name for the script
 * @param {string} scriptFile - File path to a file containing the script data
 * @param {string} [scriptDescription] - Description of the script
 * @param {string} [machineId] - Machine id of a machine that should execute this script at startup
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.accounts.script({
 *   scriptName: 'My Script',
 *   scriptFile: './my_script_file.sh',
 *   scriptDescription: 'A startup script', // optional
 *   machineId: 'ps123abc', // optional
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace accounts create \
 *     --scriptName "My Script" \
 *     --scriptFile "./my_script_file.sh" \
 *     --scriptDescription "A startup script" \
 *     --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /account/setStartupScript {"scriptName": "My Script", "scriptDescription": "A startup script", "machineId": "ps123abc"}
 * x-api-key: 1ba4f98e7c0...
 * (file contents as file form data)
 * # Returns 204 on success
 */

function script(params, cb) {
	if (!params.scriptFile) return cb(new Error('Missing required parameter: scriptFile'));
	console.log('here');
	return method(script, params, cb);
}

assign(script, {
	auth: true,
	group: 'accounts',
	name: 'script',
	method: 'post',
	route: '/accounts/setStartupScript',
	requires: {
		scriptName: 'string',
	},
	file: 'scriptFile',
	returns: {},
});

module.exports = script;
