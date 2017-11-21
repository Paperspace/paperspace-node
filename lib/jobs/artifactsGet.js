'use strict';

'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method artifactsGet
 * @description Get the artifacts files for the job with the given id.  The name of a particular file,
 * or directory can be spefified, and can include a wildcard character at the end, e.g., "myfiles"*.
 * If no specifc file or directory is specified all artifact files will be retrieved.
 * This action can only be performed by the user who owns the job, or in the case of
 * a team, the team administrator.
 * @param {object} params - Artifacts get parameters
 * @param {string} params.jobId - Id of the job to get artifacts for
 * @param {string} [params.files] - Optional; if getting only certian files, a file pattern to match against
 * @param {function} cb - Node-style error-first callback function
 * @returns one or more artifact files
 * @example
 * paperspace.jobs.artifactsGet({
 *   jobId: 'j123abc',
 *   files: 'myfiles*' // optional
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs artifactsGet \
 *     --jobId "j123abc" \
 *     --files "myfiles*"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /jobs/artifactsGet?jobId=j123abc&files=myfiles*
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 */

function artifactsGet(params, cb) {
	return method(artifactsGet, params, cb);
}

assign(artifactsGet, {
	auth: true,
	group: 'jobs',
	name: 'artifactsGet',
	method: 'get',
	route: '/jobs/artifactsGet',
	requires: {
		jobId: 'string',
	},
	returns: {},
});

module.exports = artifactsGet;
