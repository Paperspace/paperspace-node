'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method update
 * @description Update attributes of a machine.
 * @param {object} params - Machine update parameters
 * @param {string} params.machineId - Id of the machine to update
 * @param {string} [params.machineName] - New name for the machine
 * @param {number} [params.shutdownTimeoutInHours] - Number of hours before machine is shutdown if no one is logged in via the Paperspace client
 * @param {boolean} [params.shutdownTimeoutForces] - Force shutdown at shutdown timeout, even if there is a Paperspace client connection
 * @param {number} [params.autoSnapshotFrequency] - One of 'hour', 'day', 'week', or null
 * @param {number} [params.autoSnapshotSaveCount] - Number of snapshots to save
 * @param {boolean} [params.performAutoSnapshot] - Perform auto snapshots
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.update({
 *   machineId: 'ps123abc',
 *   machineName: 'New Machine Name',
 *   shutdownTimeoutInHours: 24,
 *   shutdownTimeoutForces: true,
 *   performAutoSnapshot: true,
 *   autoSnapshotFrequency: 'week',
 *   autoSnapshotSaveCount: 4
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace machines update --machineId "ps123abc"
 *     --machineName "New Machine Name" \
 *     --shutdownTimeoutInHours 24 \
 *     --shutdownTimeoutForces true \
 *     --performAutoSnapshot true \
 *     --autoSnapshotFrequency "week" \
 *     --autoSnapshotSaveCount 4
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /machines/ps123abc/updateMachinePublic {"machineId": "ps123abc", "machineName": "New Machine Name", "shutdownTimeoutInHours": 24, "shutdownTimeoutForces": true, "performAutoSnapshot": true, "autoSnapshotFrequency": "week", "autoSnapshotSaveCount": 4}
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function update(params, cb) {
	return method(update, params, cb);
}

assign(update, {
	auth: true,
	group: 'machines',
	name: 'update',
	method: 'post',
	route: '/machines/:machineId/updateMachinePublic',
	requires: {
		machineId: 'string',
	},
	returns: {},
});

module.exports = update;
