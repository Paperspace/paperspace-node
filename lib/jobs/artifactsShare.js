'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method artifactsShare
 * @description Share the artifacts files for a specified job. The name of a particular file,
 * or directory can be spefified, and can include a wildcard character at the end, e.g., "myfiles*".
 * If no specifc file or directory is specified all artifact files will be destroyed.
 * This action can only be performed by the user who owns the job, or in the case of
 * a team, the team administrator.
 * @param {object} params - Artifacts share parameters
 * @param {string} params.jobId - Id of the job to to share artifacts for
 * @param {string} [params.files] - Optional; if sharing only certian files, a file pattern to match against
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.jobs.artifactsShare({
 *   jobId: 'j123abc',
 *   files: 'myfiles*' // optional
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs artifactsShare \
 *     --jobId "j123abc" \
 *     --files "myfiles*"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /jobs/j123abc/artifactsShare?files=myfiles*
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function artifactsShare(params, cb) {
	return method(artifactsShare, params, cb);
}

assign(artifactsShare, {
	auth: true,
	group: 'jobs',
	name: 'artifactsShare',
	method: 'post',
	route: '/jobs/:jobId/artifactsShare',
	requires: {
		jobId: 'string',
	},
	returns: {},
});

module.exports = artifactsShare;
