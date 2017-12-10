'use strict';

var method = require('./../method');
var assign = require('lodash.assign');
var AWS = require('aws-sdk');
var fs = require('fs');

/**
 * @memberof jobs
 * @method artifactsList
 * @description List job artifact files for the specified job.
 * @param {string} params.jobId - Id of the job to list artifacts for
 * @param {bool} [params.files] - Optional; wildcard expression of file(s) to list, e.g., "myfiles*".  Note: if you include a wildcard you must double-quote the files argument.
 * @param {bool} [params.size] - Optional; '--size' with no value is equivalent to true.
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
	return method(artifactsList, params, function artifactsListCb(err, data) {
		if (global.paperspace_cli) {
			if (data && data.body && data.body.length) {
				data.body.forEach(function itemFunc(item) {
					if (item.file) {
						if (item.size) console.log(item.file + '\t' + item.size + ' bytes');
						else console.log(item.file);
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
