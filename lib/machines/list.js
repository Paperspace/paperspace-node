'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method list
 * @description List information about all machines available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} template - Template info JSON object
 * @example
 * paperspace.machines.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines list
 * @example
 * # HTTP request:
 * GET /machines/getMachines
 * # Returns 200 on success
 */

function list(params, cb) {
	return method(list, params, cb);
}

assign(list, {
	auth: true,
	group: 'machines',
	name: 'list',
	method: 'get',
	route: '/machines/getMachines',
	requires: {},
	returns: {},
});

module.exports = list;
