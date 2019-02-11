'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method waitfor
 * @description Wait for the machine with the given id to enter a certain machine
 * state. This action polls the server and returns only when we detect that the machine
 * has transitioned into the given state. States available to check for are:
 *   - off
 *   - serviceready  - services are running on the machine but the Paperspace agent is not yet available
 *   - ready  - services are running on machine and the Paperspace agent is ready to stream or accept logins
 *
 * When the callback is called, the returned object will be information about the machine.
 * @param {object} params - Machine waitfor parameters
 * @param {string} params.machineId - Id of the machine to wait for
 * @param {string} params.state - Name of the state to wait for, either 'off', 'serviceready', 'ready'
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The machine JSON object
 * @example
 * paperspace.machines.waitfor({
 *   machineId: 'ps123abc',
 *   state: 'off',
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace machines waitfor \
 *     --machineId "ps123abc" \
 *     --state "off"
 * @example
 * # HTTP request:
 * # The waitefor method is only available using the API client.
 * # Use the show method to query the state of the machine via HTTP.
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
 *   "updatesPending": false,
 *   "networkId": "n789ghi",
 *   "privateIpAddress": "10.64.21.47",
 *   "publicIpAddress": null,
 *   "region": "East Coast (NY2)",
 *   "userId": "u123abc",
 *   "teamId": "te456def",
 *   "scriptId": "sc123abc",
 *   "dtLastRun": "2017-06-30T07:22:49.763Z",
 *   "dynamicPublicIp": null
 * }
 */

var INTERVAL = 5000; // ms

function waitfor(params, cb) {
	if (!params.state) {
		return cb(new Error('Missing required parameter state'));
	}
	var state = ('' + params.state).toLowerCase();
	var targetState;
	switch (state) {
		case 'ready':
		case 'serviceready':
		case 'off':
			targetState = state;
			break;
		default:
			return cb(new Error('state must be either off, serviceready, or ready'));
	}
	return method(waitfor, params, function _cb(err, machine) {
		if (err) {
			return cb(err);
		}
		if (machine && machine.state === targetState) {
			return cb(null, machine);
		}
		var interval = setTimeout(function _interval() {
			return waitfor(params, cb);
		}, INTERVAL);
		return interval;
	});
}

assign(waitfor, {
	auth: true,
	group: 'machines',
	name: 'waitfor',
	method: 'get',
	route: '/machines/getMachinePublic',
	requires: {
		machineId: 'string',
		state: 'string',
	},
	returns: {},
});

module.exports = waitfor;
