'use strict';

var method = require('./../method');

/**
 * @memberof machines
 * @method list
 * @description List information about all machines available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned machine objects.
 * @param {object} [filter] - An optional filter object to limit the returned machine objects
 * @param {string} [filter.machineId] - Optional machine id to match on. Note: must be specified as "machineId", not "id".
 * @param {string} [filter.name] - Optional name to match on
 * @param {string} [filter.os] - Optional os to match on
 * @param {string} [filter.ram] - Optional ram value to match on
 * @param {number} [filter.cpus] - Optional cpu count to match on
 * @param {string} [filter.gpu] - Optional gpu to match on
 * @param {string} [filter.storageTotal] - Optional storageTotal value to match on
 * @param {string} [filter.storageUsed] - Optional storageUsed value to match on
 * @param {string} [filter.usageRate] - Optional usageRate value to match on
 * @param {number} [filter.shutdownTimeoutInHours] - Optional shutdownTimeoutInHours value to match on
 * @param {boolean} [filter.performAutoSnapshot] - Optional performAutoSnapshot value to match on, either true or false
 * @param {string} [filter.autoSnapshotFrequency] - Optional autoSnapshotFrequency value to match on
 * @param {number} [filter.autoSnapshotSaveCount] - Optional autoSnapshotSaveCount value to match on
 * @param {string} [filter.agentType] - Optional agentType value to match on
 * @param {string} [filter.dtCreated] - Optional datetime created value to match on
 * @param {string} [filter.state] - Optional state value to match on
 * @param {boolean} [filter.updatesPending] - Optional updatesPending value to match on
 * @param {string} [filter.networkId] - Optional networkId to match on
 * @param {string} [filter.privateIpAddress] - Optional privateIpAddress to match on
 * @param {string} [filter.publicIpAddress] - Optional publicIpAddress to match on
 * @param {string} [filter.region] - Optional region to match on
 * @param {string} [filter.userId] - Optional userId to match on
 * @param {string} [filter.teamId] - Optional teamId to match on
 * @param {string} [filter.scriptId] - Optional scriptId to match on
 * @param {string} [filter.dtLastRun] - Optional script datetime last run value to match on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ machine, ... ] - JSON array of machine objects
 * @example
 * paperspace.machines.list(function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace machines list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /machines/getMachines
 * x-api-key: 1ba4f98e7c0...
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
 *     "updatesPending": false,
 *     "networkId": "n789ghi",
 *     "privateIpAddress": "10.64.21.47",
 *     "publicIpAddress": null,
 *     "region": "East Coast (NY2)",
 *     "userId": "u123abc",
 *     "teamId": "te456def",
 *     "scriptId": "sc123abc",
 *     "dtLastRun": "2017-06-30T07:22:49.763Z",
 *     "dynamicPublicIp": null
 *   }
 * ]
 */

function list(params, cb) {
	return method(list, params, cb);
}

Object.assign(list, {
	auth: true,
	group: 'machines',
	name: 'list',
	method: 'get',
	route: '/machines/getMachines',
	requires: {},
	returns: {},
});

module.exports = list;
