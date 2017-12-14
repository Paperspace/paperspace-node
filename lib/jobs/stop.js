'use strict';

var method = require('./../method');
var projectConfig = require('./../projectConfig');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method stop
 * @description Stop an individual job. If the job is already stopped,
 * this action is a no-op. If the job is running, it will be stopped.
 * @param {object} params - Job stop parameters
 * @param {string} params.jobId - Id of the job to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.jobs.stop({
 *   jobId: 'j123abc',
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace jobs stop --jobId "j123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /jobs/j123abc/stop
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function stop(params, cb) {
	params.jobId = projectConfig.getLastJobId(null, params.jobId);
	return method(stop, params, cb);
}

assign(stop, {
	auth: true,
	group: 'jobs',
	name: 'stop',
	method: 'post',
	route: '/jobs/:jobId/stop',
	requires: {
		jobId: 'string',
	},
	returns: {},
});

module.exports = stop;
