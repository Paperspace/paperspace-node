'use strict';

var method = require('./../method');
var projectConfig = require('./../projectConfig');
var assign = require('lodash.assign');
var path = require('path');

/**
 * @memberof jobs
 * @method list
 * @description List information about all jobs available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned job objects.
 * @param {object} [filter] - An optional filter object to limit the returned job objects
 * @param {string} [filter.project] - Optional project to match on.  If neither project nor projectId are provided, this is taken from the .ps_project/config.json file, or the current directory name.  Specify 'all' to list jobs for all projects associated with the user or team if the user is on a team.
 * @param {string} [filter.projectId] - Optional projectId to match on
 * @param {string} [filter.name] - Optional job name to match on
 * @param {string} [filter.machineType] - Optional machineType to match on
 * @param {string} [filter.state] - Optional state value to match on
 * @param {string} [filter.container] - Optional container to match on
 * @param {string} [filter.comand] - Optional command to match on
 * @param {string} [filter.workspace] - Optional workspace path to match on.  Note: the original workspace path will be modified on upload to point to a temporary location.
 * @param {string} [filter.dataset] - Optional dataset to match on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ job, ... ] - JSON array of job objects
 * @example
 * paperspace.jobs.list(
 *   project: 'MyProject'
 * } function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs list --project "MyProject"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /jobs/getJobs?project=MyProject
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * [
 *   {
 *     "id": "j123abc",
 *     "name": "My Job",
 *     "state": "running"
 *   }
 * ]
 */

function list(params, cb) {
	if (!params.project && !params.projectId) {
		// default to name of project in .ps_project/config or name of current directory
		params.project = projectConfig.getProject();
		if (!params.project) {
			var cwd = process.cwd();
			params.project = path.basename(cwd);
			if (params.project == '/') {
				var err = new Error('Error: cannot list project jobs from root directory.  Please specify a project name or run from a project directory other than root.');
				if (global.paperspace_cli) {
			 		console.log(err.message);
			 		return cb();
			 	}
			 	return cb(err);
			}
		}
	}
	return method(list, params, cb);
}

assign(list, {
	auth: true,
	group: 'jobs',
	name: 'list',
	method: 'get',
	route: '/jobs/getJobs',
	requires: {},
	returns: {},
});

module.exports = list;
