'use strict';

var method = require('./../method');
var projectConfig = require('./../projectConfig');

/**
 * @memberof jobs
 * @method show
 * @description Show job information for the job with the given id.
 * @param {object} params - Job show parameters
 * @param {string} params.jobId - Id of the job to show
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} job - The job JSON object
 * @example
 * paperspace.jobs.show({
 *   jobId: 'j123abc',
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace jobs show \
 *     --jobId "j123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /jobs/getJob?jobId=j123abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * {
 *   "id": "j123abc",
 *   "name": "job for project myproject",
 *   "state": "Running",
 *   "workspaceUrl": "myproject.zip",
 *   "workingDirectory": "/paperspace",
 *   "artifactsDirectory": "/artifacts",
 *   "entrypoint": "echo Hello Paperspace",
 *   "projectId": "pr456def",
 *   "project": "myproject",
 *   "container": "http://dockerhub.com/mycontainer",
 *   "machineType": "P5000",
 *   "cluster": "PS Jobs",
 *   "usageRate": "P5000 hourly",
 *   "startedByUserId": "u789ghi",
 *   "parentJobId": null,
 *   "jobError": null,
 *   "dtCreated": "2017-11-30T18:46:10.394Z",
 *   "dtModified": "2017-11-30T18:46:10.394Z",
 *   "dtProvisioningStarted": "2017-11-30T18:46:50.467Z",
 *   "dtProvisioningFinished": "2017-11-30T18:47:12.508Z",
 *   "dtStarted": "2017-11-30T18:47:14.636Z",
 *   "dtFinished": null,
 *   "dtTeardownStarted": null,
 *   "dtTeardownFinished": null,
 *   "dtDeleted": null,
 *   "exitCode": null
 * }
 */

function show(params, cb) {
	params.jobId = projectConfig.getLastJobId(null, params.jobId);
	return method(show, params, cb);
}

Object.assign(show, {
	auth: true,
	group: 'jobs',
	name: 'show',
	method: 'get',
	route: '/jobs/getJob',
	requires: {
		jobId: 'string',
	},
	returns: {},
});

module.exports = show;
