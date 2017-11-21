'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method waitfor
 * @description Wait for the job with the given id to enter a certain job
 * state. This action polls the server and returns only when we detect that the job
 * has transitioned into the given state. States available are:
 *   - running
 *   - stopped
 *
 * When the callback is called, the returned object will be information about the job.
 * @param {object} params - Job waitfor parameters
 * @param {string} params.jobId - Id of the job to wait for
 * @param {string} params.state - Name of the state to wait for
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} job - The job JSON object
 * @example
 * paperspace.job.waitfor({
 *   jobId: 'j123abc',
 *   state: 'stopped',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs waitfor \
 *     --jobId "j123abc" \
 *     --state "stopped"
 * @example
 * # HTTP request:
 * # The waitefor method is only available using the API client.
 * # Use the jobs show method to query the state of the job via HTTP.
 * @example
 * //Example return value:
 * {
 *   "id": "j123abc",
 *   "name": "My Job",
 *   "state": "stopped"
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
		case 'running':
		case 'stopped':
			targetState = state;
			break;
		default:
			console.log(state);
			return cb(new Error('state must be either running or stopped'));
	}
	return method(waitfor, params, function _cb(err, resp) {
		if (err) {
			return cb(err);
		}
		var job = resp.body;
		if (job && job.state === targetState) {
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
	group: 'jobs',
	name: 'waitfor',
	method: 'get',
	route: '/jobs/getJob',
	requires: {
		jobId: 'string',
		state: 'string',
	},
	returns: {},
});

module.exports = waitfor;
