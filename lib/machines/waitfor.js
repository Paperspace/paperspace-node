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
 * @param {string} params.machineId - Id of the machine to wait for
 * @param {string} params.state - Name of the state to wait for
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The machine JSON object
 * @example
 * paperspace.machines.waitfor({
 *   machineId: 'ps123abc',
 *   state: 'off',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines waitfor \
 *     --machineId "ps123abc" \
 *     --state "off"
 * @example
 * # HTTP request:
 * # This method is only available using the API client
 */

var INTERVAL = 1000; // ms

function waitfor(params, cb) {
	if (!params.state) {
		return cb(new Error('Missing required parameter state'));
	}
	var state = ('' + params.state).toLowerCase();
	var targetState;
	switch (state) {
	case 'ready':
	case 'off':
		targetState = state;
		break;
	default:
	  console.log(state);
		return cb(new Error('state must be either off or ready'));
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
	route: '/machines/getMachinePublic',
	requires: {
		machineId: 'string',
		state: 'string'
	},
	returns: {},
});

module.exports = waitfor;
