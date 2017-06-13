'use strict';

'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method waitfor
 * @description Wait for the machine with the given id to enter a certain machine
 * state. This action polls the server and returns only when we detect that the machine
 * has transitioned into the given state. States available are:
 *   - off
 *   - ready
 *
 * When the callback is called, the returned object will be information about the machine.
 * @param {object} params - Machine waitfor parameters
 * @param {number} params.publicMachineId - Id of the machine to wait for
 * @param {string} params.state - Name of the state to wait for
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The machine JSON object
 * @example
 * paperspace.machines.waitfor({
 *   publicMachineId: psabcdef,
 *   state: "off",
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines waitfor \
 *     --publicMachineId psabcdef \
 *     --state "off"
 * @example
 * # HTTP request:
 * # This method is only available using the API client
 */

var INTERVAL = 1000; // ms

function waitfor(params, cb) {
	var state = params.state;
	var targetState;
	switch (state) {
	case 'ready':
		targetState = 'AgentReady';
		break;
	case 'off':
		targetState = 'Off';
		break;
	default:
		return cb(new Error('Missing required parameter `state`'));
	}
	return method(waitfor, params, function _cb(err, resp) {
		if (err) {
			return cb(err);
		}
		var machine = resp.body;
		if (machine && machine.state === targetState) {
			return cb(null, resp);
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
	route: '/machines/getMachine',
	requires: {
		state: 'string',
		publicMachineId: 'string',
	},
	returns: {},
});

module.exports = waitfor;
