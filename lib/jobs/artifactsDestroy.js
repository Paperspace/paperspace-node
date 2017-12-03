'use strict';

var method = require('./../method');
var assign = require('lodash.assign');
var AWS = require('aws-sdk');
var fs = require('fs');

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
 * }, function(err, resp) {
 *   // handle error or http response
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
	if (params.files) return console.log('Error: files parameter not currently supported');
	return method(artifactsDestroy, params, function artifactsDestroyCb(err, data) {
		var fileName = params.files;

		// XXX TODO catch exceptions, return as objects in api mode, or error message in cli module
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
			if (err) return cb(err);
			var optionsDelete = {
			 Bucket: data.body.bucket,
			 Delete: {
				Objects: [],
				Quiet: false,
			 }
			};
			objectList.Contents.forEach(function itemFunc(item) {
				if (item.Key !== folder && item.Key.startsWith(folder)) {
					optionsDelete.Delete.Objects.push({ Key: item.Key });
				}
			});
			if (optionsDelete.Delete.Objects.length > 0) {
				s3.deleteObjects(optionsDelete, function listObjectsCb(err, deleteData) {
					if (err) return cb(err);
					if (deleteData && deleteData.Errors && deleteData.Errors.length > 0) {
						return console.log(deleteData.Errors[0].Message);
					} else console.log('Artifacts files deleted.');
				});
			}
		});
	});
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
