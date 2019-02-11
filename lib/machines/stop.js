'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method stop
 * @description Stop an individual machine. If the machine is already stopped
 * or has been shut down, this action is a no-op. If the machine is running, it
 * will be stopped and any users logged in will be immediately kicked out.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine stop parameters
 * @param {string} params.machineId - Id of the machine to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.stop({
 *   machineId: 'ps123abc',
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace machines stop --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /machines/ps123abc/stop
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function stop(params, cb) {
	return method(stop, params, cb);
}

assign(stop, {
	auth: true,
	group: 'machines',
	name: 'stop',
	method: 'post',
	route: '/machines/:machineId/stop',
	requires: {
		machineId: 'string',
	},
	returns: {},
});

module.exports = stop;
