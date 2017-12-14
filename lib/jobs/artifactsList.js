'use strict';

var method = require('./../method');
var projectConfig = require('./../projectConfig');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method artifactsList
 * @description List job artifact files for the specified job.
 * @param {string} params.jobId - Id of the job to list artifacts for
 * @param {string} [params.files] - Optional; wildcard expression of file(s) to list, e.g., "myfiles*".  Note: if you include a wildcard you must double-quote the files argument.
 * @param {boolean} [params.size] - Optional; include file size in bytes.  '--size' with no value is equivalent to true.
 * @param {boolean} [params.links] - Optional; include https links to artifacts.  Note: links are only valid for 8 hours. '--links' with no value is equivalent to true.
 * @param {boolean} [params.json] - Optional; return JSON object instead of writing to standard out.  '--json' with no value is equivalent to true.
 * @returns artifact files list
 * @example
 * paperspace.jobs.artifactsList({
 *   jobId: 'j123abc',
 * }, function(err, res) {
 *   // handle error or result
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
	var json = false;
	if (params.json) {
		json = true;
		delete params.json;
	}
	params.jobId = projectConfig.getLastJobId(null, params.jobId);
	return method(artifactsList, params, function artifactsListCb(err, data) {
		if (global.paperspace_cli && !json) {
			if (data && data.length) {
				data.forEach(function itemFunc(item) {
					if (item.file) {
						var message = item.file;
						if (item.size) message += '\t' + item.size + ' bytes';
						if (item.url) message += '\t' + item.url;
						console.log(message);
					}
				});
			}
		} else return cb(null, data);
	});
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
