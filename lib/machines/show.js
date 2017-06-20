'use strict';

'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method show
 * @description Show machine information for the machine with the given id.
 * @param {object} params - Machine show parameters
 * @param {string} params.machineId - Id of the machine to show
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The machine JSON object
 * @example
 * paperspace.machines.show({
 *   machineId: 'ps123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines show \
 *     --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /machines/getMachinePublic?machineId=ps13abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * {
 *   "id": "ps123abc",
 *   "name": "My Machine",
 *   "os": "Microsoft Windows Server 2016 Datacenter",
 *   "ram": "8589938688",
 *   "cpus": 4,
 *   "gpu": "GRID K160Q (2GB)",
 *   "storageTotal": "53687091200",
 *   "storageUsed": "110080",
 *   "usageRate": "Air monthly",
 *   "shutdownTimeoutInHours": 168,
 *   "shutdownTimeoutForces": false,
 *   "performAutoSnapshot": false,
 *   "autoSnapshotFrequency": null,
 *   "autoSnapshotSaveCount": null,
 *   "agentType": "WindowsDesktop",
 *   "dtCreated": "2016-11-18T05:18:29.533Z",
 *   "state": "ready",
 *   "networkId": "n789ghi",
 *   "privateIpAddress": "10.64.21.47",
 *   "publicIpAddress": null,
 *   "region": "East Coast (NY2)",
 *   "userId": "u123abc",
 *   "teamId": "te456def"
 * }
 */

function show(params, cb) {
	return method(show, params, cb);
}

assign(show, {
	auth: true,
	group: 'machines',
	name: 'show',
	method: 'get',
	route: '/machines/getMachinePublic',
	requires: {
		machineId: 'string',
	},
	returns: {},
});

module.exports = show;
