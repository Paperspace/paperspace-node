'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof scripts
 * @method show
 * @description Show information for the script with the given id.
 * @param {object} params - Script show parameters
 * @param {string} params.scriptId - Id of the script to show
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} script - The script JSON object
 * @example
 * paperspace.scripts.show({
 *   scriptId: 'sc123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace scripts show \
 *     --scriptId "sc123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /scripts/getScript?scriptId=sc123abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * {
 *   "id": "sc123abc",
 *   "ownerType": "user",
 *   "ownerId": "u456def",
 *   "name": "My Script",
 *   "description": "original file: my_script.sh",
 *   "dtCreated": "2017-05-30T14:49:16.724Z",
 *   "isEnabled": true,
 *   "runOnce": false
 *   "machines": [
 *     {
 *       "machineId": "ps123abc",
 *       "dtLastRun": "2017-07-06T12:38:17.325Z"
 *     },
 *     {
 *       "machineId": "ps456def",
 *       "dtLastRun": null
 *     }
 *   ]
 * }
 */

function show(params, cb) {
	return method(show, params, cb);
}

assign(show, {
	auth: true,
	group: 'scripts',
	name: 'show',
	method: 'get',
	route: '/scripts/getScript',
	requires: {
		scriptId: 'string',
	},
	returns: {},
});

module.exports = show;
