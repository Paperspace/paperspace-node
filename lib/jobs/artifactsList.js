'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method artifactsList
 * @description List job artifact files for the specified job.
 * This action can only be performed by the user who owns the job, or in the case of
 * a team, the team administrator.
 * @param {string} params.jobId - Id of the job to list artifacts for
 * @returns artifact files list
 * @example
 * paperspace.jobs.artifactsList({
 *   jobId: 'j123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs artifactsList \
 *     --jobId "j123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /jobs/artifactsList?jobId=j123abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 */

function artifactsList(params, cb) {
	return method(artifactsList, params, cb);
}

assign(artifactsList, {
	auth: true,
	group: 'jobs',
	name: 'artifactsList',
	method: 'get',
	route: '/jobs/artifactsList',
	requires: {
		jobId: 'string',
	},
	returns: {},
});

module.exports = artifactsList;
