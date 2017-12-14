'use strict';

var method = require('./../method');
var projectConfig = require('./../projectConfig');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method artifactsDestroy
 * @description Destroy artifact files of the job with the given id. The name of a particular file,
 * or directory can be specified, and can include a wildcard character at the end, e.g., "myfiles*".
 * If no specifc file or directory is specified all artifact files will be destroyed.
 * @param {object} params - Artifacts destroy parameters
 * @param {string} params.jobId - The id of the job to destroy artifacts for
 * @param {string} [params.files] - Optional; if destroying only certain files, a wildcard pattern to match against, e.g., "myfiles*".  Note: if you include a wildcard you must double-quote the files argument.
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.jobs.artifactsDestroy({
 *   jobId: 'j123abc',
 *   files: 'myfiles*' // optional
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace jobs artifactsDestroy \
 *     --jobId "j123abc" \
 *     --files "myfiles*"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /jobs/j123abc/artifactsDestroy?files=myfiles*
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function artifactsDestroy(params, cb) {
	params.jobId = projectConfig.getLastJobId(null, params.jobId);
	return method(artifactsDestroy, params, cb);
}

assign(artifactsDestroy, {
	auth: true,
	group: 'jobs',
	name: 'artifactsDestroy',
	method: 'post',
	route: '/jobs/:jobId/artifactsDestroy',
	requires: {
		jobId: 'string',
	},
	returns: {},
});

module.exports = artifactsDestroy;
