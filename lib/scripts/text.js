'use strict';

var method = require('./../method');

/**
 * @memberof scripts
 * @method text
 * @description Gets the text of the script with the given id.
 * @param {object} params - Script text parameters
 * @param {string} params.scriptId - Id of the script to get text for
 * @param {function} cb - Node-style error-first callback function
 * @returns {string} script - The script JSON object
 * @example
 * paperspace.scripts.text({
 *   scriptId: 'sc123abc',
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace scripts text \
 *     --scriptId "sc123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /scripts/getScriptText?scriptId=sc123abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * "services start nginx"
 */

function text(params, cb) {
	return method(text, params, cb);
}

Object.assign(text, {
	auth: true,
	group: 'scripts',
	name: 'text',
	method: 'get',
	route: '/scripts/getScriptText',
	requires: {
		scriptId: 'string',
	},
	returns: {},
});

module.exports = text;
