'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method start
 * @description Start up an individual machine. If the machine is already started,
 * this action is a no-op. If the machine is off, it will be booted up.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine start parameters
 * @param {string} params.publicMachineId - Id of the machine to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.start({
 *   machineId: 'psabcdef',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines start --machineId "psabcdef"
 * @example
 * # HTTP request:
 * POST /machines/psabcdef/startMachine
 * # Returns 204 on success
 */

function start(params, cb) {
	return method(start, params, cb);
}

assign(start, {
	auth: true,
	group: 'machines',
	name: 'start',
	method: 'post',
	route: '/machines/:machineId/start',
	requires: {
		machineId: 'string',
	},
	returns: {},
});

module.exports = start;
