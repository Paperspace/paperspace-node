'use strict';

var method = require('./../method');
var assign = require('lodash.assign');
var AWS = require('aws-sdk');
var fs = require('fs');

/**
 * @memberof jobs
 * @method artifactsGet
 * @description Get the artifacts files for the job with the given id.  The name of a particular file,
 * or directory can be specified, and can include a wildcard character at the end, e.g., "myfiles"*.
 * If no specifc file or directory is specified all artifact files will be retrieved.
 * @param {object} params - Artifacts get parameters
 * @param {string} params.jobId - Id of the job to get artifacts for
 * @param {string} [params.files] - Optional; if getting only certain files, a wildcard pattern to match against, e.g., "myfiles*".  Note: if you include a wildcard you must double-quote the files argument.
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
	if (!params.files || !params.files.length) return console.log('Error: files parameter currently required');
	if (params.files.endsWith('*')) return console.log('Error: wildcards not currently supported');
	return method(artifactsGet, params, function artifactsGetCb(err, data) {
		var fileName = params.files;

		// XXX TODO warn if overwriting an existing file, prompt to overwrite?
		// XXX TODO catch exceptions from pipe, return as objects in api mode, or error message in cli module
		// XXX TODO add progress per file
		// XXX TODO support wildcards
		// XXX TODO clean up empty file on error
		// XXX TODO make sure s3 version is correct
		// XXX TODO aws creds cache
		// XXX TODO fully shadow local aws creds

		if (!data.body || !data.body.Credentials) {
			var err = { error: 'Error: no credentials for artifacts folder.' };
			console.log(err.error);
			return cb(err);
		}
		if (!data.body.bucket) {
			var err = { error: 'Error: no artifacts bucket.' };
			console.log(err.error);
			return cb(err);
		}
		if (!data.body.folder) {
			var err = { error: 'Error: no artifacts folder.' };
			console.log(err.error);
			return cb(err);
		}
		AWS.config.update({
			accessKeyId: data.body.Credentials.AccessKeyId,
      secretAccessKey: data.body.Credentials.SecretAccessKey,
      sessionToken: data.body.Credentials.SessionToken,
		});
		var s3 = new AWS.S3();
		var options = {
				Bucket: data.body.bucket,
				Key: data.body.folder + '/' + fileName,
		};
		var file = fs.createWriteStream(fileName);
		var fileStream = s3.getObject(options).createReadStream();
		console.log('Downloading ' + fileName);
		fileStream.pipe(file);
		console.log('Download complete');
	});
}

assign(artifactsGet, {
	auth: true,
	group: 'jobs',
	name: 'artifactsGet',
	method: 'get',
	route: '/jobs/artifactsGet',
	requires: {
		jobId: 'string',
		files: 'string',
	},
	returns: {},
});

module.exports = artifactsGet;
