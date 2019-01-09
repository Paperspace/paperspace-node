'use strict';

var method = require('./../method');

/**
 * @memberof machines
 * @method availability
 * @description Get machine availability for the given region and machine type.  Note: availability is only provided for the dedicated GPU machine types.  Also, not all machine types are available in all regions.
 * @param {object} params - Machine utilization parameters
 * @param {string} params.region - Name of the region: either 'East Coast (NY2)', 'West Coast (CA1)', or 'Europe (AMS1)'
 * @param {string} params.machineType - Machine type: either 'GPU+', 'P4000', 'P5000', 'P6000', or 'V100'<p>
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} availability - The availability JSON object, containing a single boolean attribute, "available".  A value of true for "available" means machines of that type can currently be requested in that region.  A value of false means that requests for that machine type are not currently available in that region.
 * @example
 * paperspace.machines.availability({
 *   region: 'East Coast (NY2)',
 *   machineType: 'GPU+',
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace machines availability \
 *     --region "East Coast (NY2)" \
 *     --machineType "GPU+"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /machines/getAvailability?region=East%20Coast%20(NY2)&machineType=GPU%2B
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * {
 *   "available": true
 * }
 */

function availability(params, cb) {
	return method(availability, params, cb);
}

Object.assign(availability, {
	auth: true,
	group: 'machines',
	name: 'availability',
	method: 'get',
	route: '/machines/getAvailability',
	requires: {
		region: 'string',
		machineType: 'string',
	},
	returns: {},
});

module.exports = availability;
