'use strict';

var method = require('./../method');
var projectConfig = require('./../projectConfig');
var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

/**
 * @memberof jobs
 * @method artifactsGet
 * @description Get the artifacts files for the job with the given id.  The name of a particular file,
 * or directory can be specified, and can include a wildcard character at the end, e.g., "myfiles"*.
 * If no specifc file or directory is specified all artifact files will be retrieved.
 * @param {object} params - Artifacts get parameters
 * @param {string} params.jobId - Id of the job to get artifacts for
 * @param {string} [params.files] - Optional; if getting only certain files, a wildcard pattern to match against, e.g., "myfiles*".  Note: if you include a wildcard you must double-quote the files argument.
 * @param {string} [params.dest] - Optional; an existing directory to copy the artifacts files to.
 * @param {boolean} [params.json] - Optional; return JSON object instead of writing to standard out.  '--json' with no value is equivalent to true.
 * @param {function} cb - Node-style error-first callback function
 * @returns one or more artifact files
 * @example
 * paperspace.jobs.artifactsGet({
 *   jobId: 'j123abc'
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace jobs artifactsGet \
 *     --jobId "j123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /jobs/artifactsGet?jobId=j123abc&files=myfiles*
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example output:
 * Downloading myoutput1.txt
 * Downloading myoutput2.txt
 * Downloads finished
 */

function expandHomeDir(pathIn) {
  var homedir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  if (!pathIn) return pathIn;
  if (pathIn == '~') return homedir;
  if (pathIn.slice(0, 2) !== '~/') return pathIn;
  return path.join(homedir, pathIn.slice(2));
 }

function artifactsGet(params, cb) {
  params.jobId = projectConfig.getLastJobId(null, params.jobId);
  var downloadedFiles;
  var json = false;
	if (params.json || !global.paperspace_cli) {
		json = true;
		delete params.json;
    downloadedFiles = [];
	}

	function ifCliPrintErrorOnly(err) {
		if (global.paperspace_cli && !json) {
			console.log(err.message);
			return cb();
		}
		return cb(err);
	}

	var dest;
	if (params.dest) {
		dest = expandHomeDir(params.dest);
		delete params.dest;
		if (!fs.existsSync(dest)) mkdirp.sync(dest);
		else if (!fs.statSync(dest).isDirectory()) {
			return ifCliPrintErrorOnly(new Error('Error: existing file with same name as dest directory.'));
		}
	}

	return method(artifactsGet, params, function artifactsGetCb(err, data) {
		if (err) return cb(err);

		// XXX TODO warn if overwriting an existing file, prompt to overwrite?
		// XXX TODO aws creds cache
		// XXX TODO fully shadow local aws creds

		if (!data || !data.Credentials) {
			err = { error: 'Error: no credentials for artifacts folder.' };
			console.log(err.error);
			return cb(err);
		}
		if (!data.bucket) {
			err = { error: 'Error: no artifacts bucket.' };
			console.log(err.error);
			return cb(err);
		}
		if (!data.folder) {
			err = { error: 'Error: no artifacts folder.' };
			console.log(err.error);
			return cb(err);
		}
		AWS.config = new AWS.Config({
			accessKeyId: data.Credentials.AccessKeyId,
			secretAccessKey: data.Credentials.SecretAccessKey,
			sessionToken: data.Credentials.SessionToken,
		});
		var s3 = new AWS.S3();
		var options = {
				Bucket: data.bucket,
				Prefix: data.folder,
		};

		var folder = data.folder + '/';
		var wildcard = false;
		var files = params.files;
		if (files && typeof files === 'string') {
			if (files.endsWith('*')) {
				wildcard = true;
				files = files.slice(0, -1);
			}
			files = folder + files;
		}

		return s3.listObjects(options, function listObjectsCb(err, objectList) {
			if (err) return cb(err);

			var promises = [];
			var streamError = null;
			var fileError = null;

			objectList.Contents.forEach(function itemFunc(item) {
				var fileName = item.Key;

				if (!fileName.endsWith('/')) {
					if (!files || (wildcard && fileName.startsWith(files)) || (!wildcard && fileName === files)) {
						if (fileName.indexOf(folder) === 0) {

							fileName = fileName.slice(folder.length);

							var lastDirSep = fileName.lastIndexOf('/');
							if (lastDirSep > 0) {
								var dirPath = fileName.slice(0, lastDirSep);
								if (dest) dirPath = path.resolve(dest, dirPath);
								if (!fs.existsSync(dirPath)) mkdirp.sync(dirPath);
								else if (!fs.statSync(dirPath).isDirectory()) {
									return ifCliPrintErrorOnly(new Error('Error: existing file with same name as artifact subdirectory path: ' + dirPath));
								}
							}

							var thisStreamError = null;
							var thisFileError = null;

							promises.push(new Promise((resolve) => {

								var destFileName = fileName;
								if (dest) destFileName = path.resolve(dest, destFileName);
								var fileStream = fs.createWriteStream(destFileName);
								fileStream.on('error',
									function handleError(error) {
										console.error('File ' + fileName + ': error: ' + error);
										thisFileError = error;
										if (!fileError) fileError = error;
										this.end();
									}
								);
								fileStream.on('finish',
									function handleFinish() {
										if (thisFileError || thisStreamError) {
											if (fs.existsSync(fileName)) fs.unlink(fileName);
										}
										if (downloadedFiles) downloadedFiles.push({ file: fileName, destFile: destFileName });
										resolve();
									}
								);
								var optionsGet = {
										Bucket: data.bucket,
										Key: data.folder + '/' + fileName,
								};
								promises.push(new Promise((resolve) => {
									if (global.paperspace_cli && !json) {
										console.log('Downloading ' + fileName );
									}
									var readStream = s3.getObject(optionsGet).createReadStream();
									readStream.on('error',
										function handleError(error) {
											console.error('Pipe ' + fileName + ': error: ' + error);
											thisStreamError = error;
											if (!streamError) streamError = error;
											this.end();
										}
									);
									readStream.on('finish',
										function handleFinish() {
											resolve();
										}
									);
									readStream.pipe(fileStream);
								}));
							}));
						}
					}
				}
			});
			Promise.all(promises).then(() => {
				if (global.paperspace_cli && !json) {
					if (streamError) console.log('Stream error: ' + streamError);
					else if (fileError) console.log('File error: ' + fileError);
					else console.log('Downloads finished');
					return cb();
				}
				return cb(streamError || fileError, downloadedFiles);
			});
		});
	});
}

Object.assign(artifactsGet, {
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
