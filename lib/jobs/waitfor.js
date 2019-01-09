'use strict';

var method = require('./../method');
var projectConfig = require('./../projectConfig');

/**
 * @memberof jobs
 * @method waitfor
 * @description Wait for the job with the given id to enter a certain job
 * state. This action polls the server and returns only when we detect that the job
 * has transitioned into the given state, or to the 'Error' state. States available to query for are:
 *   - Pending - the job has not started setting up on a machine yet
 *   - Running - the job is setting up on a machine, running, or tearing down
 *   - Stopped - the job finished with a job command exit code of 0
 *   - Error - the job was unable to setup or run to normal completion
 *   - Failed - the job finished but the job command exit code was non-zero
 *   - Cancelled - the job was manual stopped before completion
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
 *   state: 'Stopped',
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace jobs waitfor \
 *     --jobId "j123abc" \
 *     --state "Stopped"
 * @example
 * # HTTP request:
 * # The waitefor method is only available using the API client.
 * # Use the jobs show method to query the state of the job via HTTP.
 * @example
 * //Example return value:
 * {
 *   "id": "j123abc",
 *   "name": "job for project myproject",
 *   "state": "Stopped",
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
 *   "dtFinished": "2017-11-30T18:52:44.209Z",
 *   "dtTeardownStarted": "2017-11-30T18:52:56.889Z",
 *   "dtTeardownFinished": "2017-11-30T18:53:31.734Z",
 *   "dtDeleted": null,
 *   "exitCode": 0
 * }
 */

var INTERVAL = 5000; // ms

function Capitalize(str) {
		str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function waitfor(params, cb) {
	params.jobId = projectConfig.getLastJobId(null, params.jobId);
	if (!params.state) {
		return cb(new Error('Missing required parameter state'));
	}
	var state = Capitalize('' + params.state);
	var targetState;
	switch (state) {
		case 'Pending':
		case 'Running':
		case 'Stopped':
		case 'Preempted':
		case 'Failed':
		case 'Error':
				targetState = state;
			break;
		default:
			return cb(new Error('state must be either Pending, Running, Stopped, Failed, or Error'));
	}
	return method(waitfor, params, function _cb(err, job) {
		if (err) return cb(err);
		if (!job) return cb(new Error('Job not found'));
		if (job.state === targetState ||
			(job.state === 'Running' && params.state === 'Pending') ||
			job.state === 'Error' ||
			job.state === 'Stopped' ||
			job.state === 'Preempted' ||
			job.state === 'Failed' ||
			job.state === 'Cancelled') {
			return cb(null, job);
		}
		var interval = setTimeout(function _interval() {
			return waitfor(params, cb);
		}, INTERVAL);
		return interval;
	});
}

Object.assign(waitfor, {
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
