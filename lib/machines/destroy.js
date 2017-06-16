'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method destroy
 * @description Destroy the machine with the given id. When this action is performed,
 * the machine is immediately shut down and marked for deletion from the datacenter.
 * Any snapshots that were derived from the machine are also deleted. Access to the machine
 * is terminated immediately and billing for the machine is prorated to the hour.
 * This action can only be performed by the user who owns the machine, or in the case of
 * a team, the team administrator.
 * @param {string} params.machineId - The id of the machine to destroy
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.destroy({
 *   machineId: ps123abc,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines destroy --machineId ps123abc
 * @example
 * # HTTP request:
 * POST /machines/ps123abc/destroyMachine
 * # Returns 200 on success
 */

function destroy(params, cb) {
	return method(destroy, params, cb);
}

assign(destroy, {
	auth: true,
	group: 'machines',
	name: 'destroy',
	method: 'post',
	route: '/machines/:machineId/destroyMachine',
	requires: {
		machineId: 'string',
	},
	returns: {},
});

module.exports = destroy;
