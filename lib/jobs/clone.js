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
 * }, function(err, res) {
 *   // handle error or result
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
 *   "name": "job for project myproject",
 *   "state": "Pending",
 *   "workspaceUrl": "myproject.zip",
 *   "workingDirectory": "/paperspace",
 *   "artifactsDirectory": "/artifacts",
 *   "entrypoint": "echo Hello Paperspace",
 *   "projectId": "pr456def",
 *   "project": "myproject",
 *   "container": "http://dockerhub.com/mycontainer",
 *   "machineType": "P5000",
 *   "cluster": "Jobs",
 *   "usageRate": "P5000 hourly",
 *   "startedByUserId": "u789ghi",
 *   "parentJobId": "j123abc",
 *   "jobError": null,
 *   "dtCreated": "2017-11-30T19:20:38.956Z",
 *   "dtModified": "2017-11-30T19:20:39.744Z",
 *   "dtProvisioningStarted": null,
 *   "dtProvisioningFinished": null,
 *   "dtStarted": null,
 *   "dtFinished": null,
 *   "dtTeardownStarted": null,
 *   "dtTeardownFinished": null,
 *   "dtDeleted": null,
 *   "exitCode": null
 * }
 */

function clone(params, cb) {
	params.jobId = projectConfig.getLastJobId(null, params.jobId);
	return method(clone, params, function _methodCb(err, res) {
		if (err) return cb(err);
		if (res) projectConfig.setLastJobId(res.project, res.id);
		return cb(err, res);
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
