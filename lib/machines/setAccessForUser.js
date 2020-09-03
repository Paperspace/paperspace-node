'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method setAccessForUser
 * @description Show machine information for the machine with the given id.
 *
 * The state property can take on the follow values:
 *   - off
 *   - starting  - machine is in the process of changing to the ready or serviceready state
 *   - stopping  - machine is in the process of changing to the off state
 *   - restarting  - combines stopping follow immediately by starting
 *   - serviceready  - services are running on the machine but the Paperspace agent is not yet available
 *   - ready  - services are running on machine and the Paperspace agent is ready to stream or accept logins
 *   - upgrading   - the machine specification are being upgraded, which involves a shutdown and startup sequence
 *   - provisioning  - the machine is in the process of being created for the first time
 *
 * The updatesPending property is either true or false and reflects whether the operating system has scheduled updates
 * for the next machine state transition, e.g, stopping, starting, restarting or upgrading.
 *
 * Note: in some cases the operating system can force installation of critical updates immediately upon a state
 * transition, or automatically restart a machine to install updates.  In such cases the updatesPending property
 * may not always be set accurately by the underlying os.
 * @param {object} params - Machine show parameters
 * @param {string} params.machineId - Id of the machine to show
 * @param {string} params.userId - Id of the user to enable machine access for
 * @param {boolean} params.enabeAccess- releases any assigned public ip address for the machine; defaults to false
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The machine JSON object
 * @example
 * paperspace.machines.setAccessForUser({
 *   machineId: 'ps123abc',
 *   userId: 'u123abc,
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace machines setAccessForUser \
 *     --machineId "ps123abc" --userId "u12abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /machines/:machineId/setMachineAccessPublic?userId=u123abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 */

function setAccessForUser(params, cb) {
	return method(setAccessForUser, params, cb);
}

assign(setAccessForUser, {
	auth: true,
	group: 'machines',
	name: 'setAccessForUser',
	method: 'post',
	route: '/machines/:machineId/setMachineAccess',
	requires: {
		machineId: 'string',
		userId: "string",
		enableAccess: 'boolean',
	},
	returns: {},
});

module.exports = setAccessForUser;
