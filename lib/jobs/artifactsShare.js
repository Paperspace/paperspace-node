'use strict';

var method = require('./../method');
var projectConfig = require('./../projectConfig');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method artifactsShare
 * @description Share the artifacts files for a specified job. The name of a particular file,
 * or directory can be specified, and can include a wildcard character at the end, e.g., "myfiles*".
 * If no specifc file or directory is specified all artifact files will be destroyed.
 * @param {object} params - Artifacts share parameters
 * @param {string} params.jobId - Id of the job to to share artifacts for
 * @param {string} [params.files] - Optional; if sharing only certain files, a wildcard pattern to match against, e.g., "myfiles*".  Note: if you include a wildcard you must double-quote the files argument.
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
	params.jobId = projectConfig.getLastJobId(null, params.jobId);
	if (!params.files || !params.files.length) return console.log('Error: files parameter currently required');
	if (params.files.endsWith('*')) return console.log('Error: wildcards not currently supported');
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
