'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method list
 * @description List information about all jobs available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned job objects.
 * @param {object} [filter] - An optional filter object to limit the returned job objects
 * @param {string} [filter.project] - Optional project to match on
 * @param {string} [filter.projectId] - Optional projectId to match on
 * @param {string} [filter.jobId] - Optional job id to match on
 * @param {string} [filter.name] - Optional job name to match on
 * @param {string} [filter.machineType] - Optional machineType to match on
 * @param {string} [filter.state] - Optional state value to mactch on
 * @param {string} [filter.container] - Optional container to mactch on
 * @param {string} [filter.comand] - Optional command to mactch on
 * @param {string} [filter.workspace] - Optional workspace path to mactch on
 * @param {string} [filter.dataset] - Optional dataset to mactch on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ job, ... ] - JSON array of job objects
 * @example
 * paperspace.jobs.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /jobs/getJobs
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
