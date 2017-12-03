'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

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
 * }, function(err, resp) {
 *   // handle error or http response
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
 *   "name": "My Job",
 *   "state": "running",
 * }
 */

function show(params, cb) {
	return method(show, params, cb);
}

assign(show, {
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
