'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method list
 * @description List information about all machines available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ machine, ... ] - JSON array of machine objects
 * @example
 * paperspace.machines.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines list
 * @example
 * # HTTP request:
 * GET /machines/getMachines
 * # Returns 200 on success
 * @example
 * //Example return value:
 * [
 *   {
 *     "id": "ps123abc",
 *     "name": "My Machine",
 *     "os": "Microsoft Windows Server 2016 Datacenter",
 *     "ram": "8589938688",
 *     "cpus": 4,
 *     "gpu": "GRID K160Q (2GB)",
 *     "storageTotal": "53687091200",
 *     "storageUsed": "110080",
 *     "usageRate": "Air monthly",
 *     "shutdownTimeoutInHours": 168,
 *     "shutdownTimeoutForces": false,
 *     "performAutoSnapshot": false,
 *     "autoSnapshotFrequency": null,
 *     "autoSnapshotSaveCount": null,
 *     "agentType": "WindowsDesktop",
 *     "dtCreated": "2016-11-18T05:18:29.533Z",
 *     "state": "ready",
 *     "networkId": "n789ghi",
 *     "privateIpAddress": "10.64.21.47",
 *     "publicIpAddress": null,
 *     "region": "East Coast (NY2)",
 *     "userId": "u123abc",
 *     "teamId": "te456def"
 *   }
 * ]
 */

function list(params, cb) {
	return method(list, params, cb);
}

assign(list, {
	auth: true,
	group: 'machines',
	name: 'list',
	method: 'get',
	route: '/machines/getMachines',
	requires: {},
	returns: {},
});

module.exports = list;
