'use strict';

var method = require('./../method');

/**
 * @memberof machines
 * @method start
 * @description Start up an individual machine. If the machine is already started,
 * this action is a no-op. If the machine is off, it will be booted up.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine start parameters
 * @param {string} params.machineId - Id of the machine to start
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.start({
 *   machineId: 'ps123abc',
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace machines start --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /machines/ps123abc/start
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function start(params, cb) {
	return method(start, params, cb);
}

Object.assign(start, {
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
