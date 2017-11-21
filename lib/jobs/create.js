'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method create
 * @description Create a new Paperspace job.
 * @param {object} params - Job creation parameters
 * @param {string} params.region - Name of the region: either 'East Coast (NY2)', 'West Coast (CA1)', or 'Europe (AMS1)'
 * @param {string} params.project - The name of the project for this job
 * @param {string} params.machineType - Job type: either 'GPU+', 'P4000', 'P5000', 'P6000', 'V100', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', or 'C10'<p>
 * @param {string} params.jobName - A memorable name for this job
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} job - The created job JSON object
 * @example
 * paperspace.jobs.create({
 *   region: 'East Coast (NY2)',
 *   project: 'My Project',
 *   machineType: 'P6000',
 *   jobName: 'My Job 1',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs create \
 *     --region "East Coast (NY2)" \
 *     --project "My Project" \
 *     --machineType "P6000" \
 *     --jobName "My Job 1"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /jobs/createJob {"region": "East Coast (NY2)", "project": "My Project", "machineType": "P6000", "jobName": "My Job 1"}
 * x-api-key: 1ba4f98e7c0...
 * # Returns 201 on success
 * @example
 * // Example return value:
 * {
 *   "id": "j123abc",
 *   "name": "My Job 1",
 *   "project": "My Project",
 *   "region": "East Coast (NY2)",
 *   "machineType": "P6000",
 *   "state": "pending",
 * }
 */

function create(params, cb) {
	return method(create, params, cb);
}

assign(create, {
	auth: true,
	group: 'jobs',
	name: 'create',
	method: 'post',
	route: '/jobs/createJob',
	requires: {
		region: 'string',
		project: 'string',
		machineType: 'string',
		name: 'string',
	},
	returns: {},
});

module.exports = create;
