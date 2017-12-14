'use strict';

var method = require('./../method');
var projectConfig = require('./../projectConfig');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method clone
 * @description Clone an exiting job and queue the cloned copy to run.
 * @param {object} params - Job clone parameters
 * @param {string} params.jobId - Id of the job to clone
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.jobs.clone({
 *   jobId: 'j123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs clone --jobId "j123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /jobs/j123abc/clone
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * {
 *   "id": "j345abc",
 *   "name": "My Job",
 *   "state": "running",
 * }
 */

function clone(params, cb) {
	params.jobId = projectConfig.getLastJobId(null, params.jobId);
	return method(clone, params, function _methodCb(err, resp) {
		if (err) return cb(err);
		if (resp) projectConfig.setLastJobId(resp.project, resp.id);
		return cb(err, resp);
	});
}

assign(clone, {
	auth: true,
	group: 'jobs',
	name: 'clone',
	method: 'post',
	route: '/jobs/:jobId/clone',
	requires: {
		jobId: 'string',
	},
	returns: {},
});

module.exports = clone;
