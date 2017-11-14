'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof scripts
 * @method list
 * @description List information about all scripts assigned to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned script objects.
 * @param {object} [filter] - An optional filter object to limit the returned script objects
 * @param {string} [filter.id] - Optional script id to match on
 * @param {string} [filter.ownerType] - Optional ownerType to match on, either 'user' or 'team'
 * @param {string} [filter.ownerId] - Optional ownerId to match on, either a userId or teamId
 * @param {string} [filter.name] - Optional name to match on
 * @param {string} [filter.description] - Optional description to mactch on
 * @param {string} [filter.dtCreated] - Optional datetime created value to match on
 * @param {boolean} [filter.isEnabled] - Optional isEnabled value to match on, either true or false
 * @param {boolean} [filter.runOnce] - Optional runOnce value to match on, either true or false
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ script, ... ] - JSON array of script objects
 * @example
 * paperspace.scripts.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace scripts list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /scripts/getScripts
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * [
 *   {
 *     "id": "sc123abc",
 *     "ownerType": "user",
 *     "ownerId": "u456def",
 *     "name": "My Script",
 *     "description": "original file: my_script.sh",
 *     "dtCreated": "2017-05-30T14:49:16.724Z",
 *     "isEnabled": true,
 *     "runOnce": false
 *   }
 * ]
 */

function list(params, cb) {
	return method(list, params, cb);
}

assign(list, {
	auth: true,
	group: 'scripts',
	name: 'list',
	method: 'get',
	route: '/scripts/getScripts',
	requires: {},
	returns: {},
});

module.exports = list;
