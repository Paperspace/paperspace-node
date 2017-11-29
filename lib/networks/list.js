'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof networks
 * @method list
 * @description List information about all networks available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned network objects.
 * @param {object} [filter] - An optional filter object to limit the returned network objects
 * @param {string} [filter.id] - Optional network id to match on
 * @param {string} [filter.name] - Optional name to match on
 * @param {string} [filter.region] - Optional region to match on
 * @param {string} [filter.dtCreated] - Optional datetime created value to match on
 * @param {string} [filter.network] - Optional network to match on
 * @param {string} [filter.netmask] - Optional netmask to match on
 * @param {string} [filter.teamId] - Optional teamId to match on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ network, ... ] - JSON array of network objects
 * @example
 * paperspace.networks.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace networks list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /networks/getNetworks
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * [
 *   {
 *     "id": "n123abc",
 *     "name": "Example Network",
 *     "region": "East Coast (NY2)",
 *     "dtCreated": "2016-12-22T16:36:42.613Z",
 *     "network": "10.64.21.0",
 *     "netmask": "255.255.255.0",
 *     "teamId": "te456def"
 *   }
 * ]
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
