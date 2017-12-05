'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method logs
 * @description Stream the logs for the job with the given id, while the job is running or after it has stopped.
 * @param {object} params - Job logs parameters
 * @param {string} params.jobId - Id of the job to logs
 * @param {function} cb - Node-style error-first callback function
 * @returns logs - The job logs
 * @example
 * paperspace.jobs.logs({
 *   jobId: 'j123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs logs \
 *     --jobId "j123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /jobs/getLogs?jobId=j123abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 */

function logs(params, cb) {
	params.line = 0;
	if (params.jobId) {
		params.jobID = params.jobId;
		delete params.jobId;
	}
	return method(logs, params, function logsCb(err, data) {
		if (data && data.text && data.text.length) {
			var body = [];
			try {
				body = JSON.parse(data.text);
			} catch (e) {
				console.error(e);
				body = [];
			}
			body.forEach(function itemFunc(item) {
				if (item.message) console.log(item.message);
			});
		}
	});
}

assign(logs, {
	auth: true,
	group: 'jobs',
	name: 'logs',
	method: 'get',
	route: '/jobs/getLogs',
	requires: {
		jobID: 'string',
	},
	returns: {},
});

module.exports = logs;
