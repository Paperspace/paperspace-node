'use strict';

var method = require('./../method');
var assign = require('lodash.assign');
var AWS = require('aws-sdk');
var fs = require('fs');

/**
 * @memberof jobs
 * @method artifactsList
 * @description List job artifact files for the specified job.
 * This action can only be performed by the user who owns the job, or in the case of
 * a team, the team administrator.
 * @param {string} params.jobId - Id of the job to list artifacts for
 * @param {bool} [params.files] - Optional; wildcard expression of files to list, e.g. 'myfiles*'.
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
	if (params.files) return console.log('Error: files parameter not currently supported');
	return method(artifactsList, params, function artifactsListCb(err, data) {
		var fileName = params.files;

		// XXX TODO catch exceptions, return as objects in api mode, or error message in cli module
		// XXX TODO add progress per file
		// XXX TODO support wildcards
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
				Prefix: data.body.folder,
		};
		var folder = data.body.folder + '/';
		s3.listObjects(options, function listObjectsCb(err, objectList) {
			if (err) return cb(err)
			objectList.Contents.forEach(function itemFunc(item) {
				var file = item.Key;
				if (!file.endsWith('/')) {
					if (file.indexOf(folder) === 0) file = file.slice(folder.length);
					if (params.size) console.log(file + '\t' + item.Size + ' bytes');
					else console.log(file);
				}
			});
		});
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
