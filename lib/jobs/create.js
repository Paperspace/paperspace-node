'use strict';

var method = require('./../method');
var assign = require('lodash.assign');
var path = require('path');
var os = require('os');
var fs = require('fs');
var AdmZip = require('adm-zip');

/**
 * @memberof jobs
 * @method create
 * @description Create a new Paperspace job.
 * @param {object} params - Job creation parameters
 * @param {string} params.name - A memorable name for this job
 * @param {string} params.machineType - Job type: either 'GPU+', 'P4000', 'P5000', 'P6000', 'V100', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', or 'C10'<p>
 * @param {string} params.container - A required reference to a container name or container link to be used for the job.
 * @param {string} [params.project] - The name of the project for this job.  If not provided, this is taken from the .ps_project/config.json file, or the current directory name.
 * @param {string} [params.projectId] - The poject id of an existing project for this job.  Note: if projectId is specified, the project parameter cannot be specified.
 * @param {string} [params.command] - An optional command to run within the workspace or container.
 * @param {string} [params.workspace] - An optional path to a workspace, or link to a git repository to upload and merge with the container.  If a zip file name is provided it is uploaded instead.  If no workspace is provided the current directory is zipped up and transferred.  If the workspace is 'none', no workspace is merged and the container is run as-is.
 * @param {string} [params.dataset] - An optional reference to a dataset to be merged with the container.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} job - The created job JSON object
 * @example
 * paperspace.jobs.create({
 *   name: 'myjob',
 *   machineType: 'P6000',
 *   container: 'http://dockerhub.com/mycontainer',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs create \
 *     --name "myjob" \
 *     --machineType "P6000" \
 *     --container "http://dockerhub.com/mycontainer"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /jobs/createJob { "name": "myjob", "machineType": "P6000", "container": "http://dockerhub.com/mycontainer"}
 * x-api-key: 1ba4f98e7c0...
 * # Returns 201 on success
 * @example
 * // Example return value:
 * {
 *   "id": "j123abc",
 *   "name": "myjob",
 *   "state": "Pending",
 *   "workspaceUrl": "myproject.zip",
 *   "workingDirectory": "/paperspace",
 *   "artifactsDirectory": "/artifacts",
 *   "entrypoint": "echo Hello Paperspace",
 *   "projectId": "pr456def",
 *   "project": "myproject",
 *   "container": "http://dockerhub.com/mycontainer",
 *   "machineType": "P6000",
 *   "cluster": "Jobs",
 *   "usageRate": "P6000 hourly",
 *   "startedByUserId": "u789ghi",
 *   "parentJobId": null,
 *   "jobError": null,
 *   "dtCreated": "2017-11-30T18:46:10.394Z",
 *   "dtModified": "2017-11-30T18:46:10.394Z",
 *   "dtProvisioningStarted": null,
 *   "dtProvisioningFinished": null,
 *   "dtStarted": null,
 *   "dtFinished": null,
 *   "dtTeardownStarted": null,
 *   "dtTeardownFinished": null,
 *   "dtDeleted": null
 * }
 */

function create(params, cb) {
	var cwd = process.cwd();
	// XXX TODO test code  DO NOT CHECK IN:
	// cwd = '/home/sanfilip/myproject';
	if (!params.project && !params.projectId) {
		// default to name of project in .ps_project/config or name of current directory
		params.project = path.basename(cwd);
		if (params.project === '/') {
			var err = { error: 'Error: cannot create project from root dir. Please create a project dir and run from there.' };
			console.log(err.error);
			return err;
		}
	}

  // XXX TODO trim leading/trailing spaces from input paths
	// XXX TODO allow directory for workspace
	// XXX TODO allow file for workspace?
	// XXX TODO whitelist git services
	// XXX TODO add progress
	// XXX TODO convert to gzip
	// XXX TODO stream compress

	if (params.workspace) {
		if (params.workspace !== 'none' && !params.workspace.startsWith('https://') && !params.workspace.startsWith('git+https://')) {
			if (!fs.existsSync(params.workspace)) {
				var err = { error: 'Error: cannot find workspace file.' };
				console.log(err.error);
				return err;
			}
			// TODO check that workspace file is a zip file

			// save workspace file name as a extra parameter since we are not using multer to parse the files on the server
			params.workspaceFileName = path.basename(params.workspace);
		}
	}
	if (!params.workspace) {
		// no workspace provided; zip the current directory

		// don't allow zipping of the root directory
		if (cwd === '/') {
			var err = { error: 'Error: cannot zip workspace from root dir.' };
			console.log(err.error);
			return err;
		}

		// construct zip file name in tmpdir
		var zip_file = path.resolve(os.tmpdir(), path.basename(cwd) + '.zip');

		// delete prior zip file if it exists
		if (fs.existsSync(zip_file)) {
			fs.unlinkSync(zip_file);
		}

		// zip up current working directory
		var zip = new AdmZip();
    zip.addLocalFolder(cwd);
    zip.writeZip(zip_file);

		//check it does not exceed the current limit for upload using loopback storage component with s3
		if (getFilesizeInBytes(zip_file) > 10485760) {
			var err = { error: 'Error: zipped workspace ' + zip_file + ' cannot exceed 10485760 bytes.' };
			console.log(err.error);
			return err;
		}

		// save name of the workspace file for superagent to attach it
		params.workspace = zip_file;

		// save workspace file name as a extra parameter since we are not using multer to parse the files on the server
		params.workspaceFileName = path.basename(zip_file);
	} else {
		// workspace is either a file, a link or 'none'

		// if link pass in workspaceFileName param for jobs service to download it when running the job
		if (params.workspace.startsWith('https://') || params.workspace.startsWith('git+https://')) params.workspaceFileName = params.workspace;

		// if 'none' or link don't try to upload it; we normally attempt to upload anything in the workspace param specified in assign() below
		if (params.workspace === 'none' || params.workspace.startsWith('https://') || params.workspace.startsWith('git+https://')) delete params.workspace;
	}
	return method(create, params, cb);
}

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}

assign(create, {
	auth: true,
	group: 'jobs',
	name: 'create',
	method: 'post',
	route: '/jobs/createJob',
	requires: {
		name: 'string',
		machineType: 'string',
		container: 'string',
	},
	file: 'workspace',
	returns: {},
});

module.exports = create;
