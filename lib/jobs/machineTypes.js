'use strict';

var method = require('./../method');

/**
 * @memberof jobs
 * @method machineTypes
 * @description Return a list of available cluster machine types. If the isBusy property is true then all machines of the specified type and cluster are currently running jobs.
 * The machineTypes method takes an optional first argument to limit the returned cluster machine type objects.
 * @param {object} [filter] - An optional filter object to limit the returned job objects
 * @param {string} [filter.region] - Optional region to match on
 * @param {string} [filter.cluster] - Optional cluster to match on
 * @param {string} [filter.machineType] - Optional machine type to macth on
 * @param {boolean} [filter.isBusy] - Optional busy status value to match on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ clusterMachineType, ... ] - JSON array of available cluster machine type objects
 * @example
 * paperspace.jobs.machineTypes({
 *   // region: 'East Coast (NY2)', // optional filter on region
 *   // cluster: 'PS Jobs', // optional filter on cluster
 *   // machineType: 'P5000', // optional filter on machine type 	
 *   // isBusy: false, // optional filter on busy status 	
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace jobs machineTypes
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /jobs/getClusterAvailableMachineTypes
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * [
 *   {
 *     "region": "East Coast (NY2)",
 *     "cluster": "PS Jobs",
 *     "machineType": "P5000",
 *     "isBusy": false,
 *   },
 *   {
 *     "region": "East Coast (NY2)",
 *     "cluster": "PS Jobs",
 *     "machineType": "V100",
 *     "isBusy": false,
 *   },
 *   {
 *     "region": "GCP West",
 *     "cluster": "PS Jobs on GCP",
 *     "machineType": "K80",
 *     "isBusy": false,
 *   },
 *   {
 *     "region": "GCP West",
 *     "cluster": "PS Jobs on GCP",
 *     "machineType": "P100",
 *     "isBusy": false,
 *   }
 * ]
 */

function machineTypes(params, cb) {
	return method(machineTypes, params, cb);
}

Object.assign(machineTypes, {
	auth: true,
	group: 'jobs',
	name: 'machineTypes',
	method: 'get',
	route: '/jobs/getClusterAvailableMachineTypes',
	requires: {},
	returns: {},
});

module.exports = machineTypes;
