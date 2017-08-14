'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method restart
 * @description Restart an individual machine. If the machine is already restarting,
 * this action will request the machine be restarted again.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine restart parameters
 * @param {string} params.machineId - Id of the machine to restart
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.restart({
 *   machineId: 'ps123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines restart --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /machines/ps123abc/restart
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function restart(params, cb) {
	return method(restart, params, cb);
}

assign(restart, {
	auth: true,
	group: 'machines',
	name: 'restart',
	method: 'post',
	route: '/machines/:machineId/restart',
	requires: {
		machineId: 'string',
	},
	returns: {},
});

module.exports = restart;
