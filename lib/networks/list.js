'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof networks
 * @method list
 * @description List information about all networks available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} template - Template info JSON object
 * @example
 * paperspace.networks.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace networks list
 * @example
 * # HTTP request:
 * GET /getNetworks
 * # Returns 200 on success
 */

function list(params, cb) {
	return method(list, params, cb);
}

assign(list, {
	auth: true,
	group: 'networks',
	name: 'list',
	method: 'get',
	route: '/networks/getNetworks',
	requires: {},
	returns: {},
});

module.exports = list;
