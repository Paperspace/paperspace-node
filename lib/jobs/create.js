'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method create
 * @description Create a new Paperspace job.
 * @param {object} params - Job creation parameters
 * @param {string} params.name - A memorable name for this job
 * @param {string} params.machineType - Job type: either 'GPU+', 'P4000', 'P5000', 'P6000', 'V100', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', or 'C10'<p>
 * @param {string} params.container - A required reference to a container name or container link to be used for the job.
 * @param {string} params.project - The name of the project for this job.  If not provided, this is taken from the .ps_project/config.json file, or the current directory name.
 * @param {string} params.command - An optional command to run within the workspace or container.
 * @param {string} params.workspace - An optional path to a workspace to merge with the container.  If a zip file is provided that is used instead.  If no workspace is provieded the current directory is zipped up and transferred.  If the workspace is 'none', no workspace is merged and the container is run as-is.
 * @param {string} params.dataset - An optional reference to a dataset to be merged with the container.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} job - The created job JSON object
 * @example
 * paperspace.jobs.create({
 *   name: 'My Job 1',
 *   machineType: 'P6000',
 *   container: 'http://dockerhub.com/mycontainer',
 *   project: 'My Project' // Optional; if not specified the project name is taken from the current directory or the .ps_project/config.json file.
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs create \
 *     --name "My Job 1" \
 *     --machineType "P6000" \
 *     --container "http://dockerhub.com/mycontainer" \
 *     --project "My Project"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /jobs/createJob { "name": "My Job 1", "machineType": "P6000", "container": "http://dockerhub.com/mycontainer", "project": "My Project"}
 * x-api-key: 1ba4f98e7c0...
 * # Returns 201 on success
 * @example
 * // Example return value:
 * {
 *   "id": "j123abc",
 *   "name": "My Job 1",
 *   "machineType": "P6000",
 *   "project": "My Project",
 *   "state": "Pending",
 * }
 */

function create(params, cb) {
	// if (!params.project && !params.projectId) {}; // default to name of project in .ps_project/config or name of current directory
  // if (workspace != 'none' && workspace != a zip file) {}; // zip up the current directory based on whether it is a git repo or not; if it is a git repo use git archive HEAD
	return method(create, params, cb);
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
