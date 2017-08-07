'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method utilization
 * @description Show machine utilization data for the machine with the given id. Machine upgrades are not represented in utilization data.
 * @param {string} params.machineId - Id of the machine to show
 * @param {string} params.billingMonth - Billing period to query in `YYYY-MM` format
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The utilization JSON object
 * @example
 * paperspace.machines.utilization({
 *   machineId: 'ps123abc',
 *   billingMonth: '2017-08',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines utilization \
 *     --machineId "ps123abc" \
 *     --billingMonth "2017-08"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /machines/getUtilization?machineId=ps123abc&billingMonth=2017-08
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * {
 *   "machineId": "ps123abc",
 *   "secondsUsed": 1000,
 *   "utilization": {
 *     "machineId": "ps123abc",
 *     "secondsUsed": 1000,
 *     "hourlyRate": "0.40",
 *     "billingMonth": "2017-08",
 *   },
 *   "storageUtilization": {
 *     "machineId": "ps123abc",
 *     "secondsUsed": 3000,
 *     "hourlyRate": "7.00",
 *     "billingMonth": "2017-08",
 *   },
 * }
 */

function utilization(params, cb) {
	return method(utilization, params, cb);
}

assign(utilization, {
	auth: true,
	group: 'machines',
	name: 'utilization',
	method: 'get',
	route: '/machines/getUtilization',
	requires: {
		machineId: 'string',
		billingMonth: 'string',
	},
	returns: {},
});

module.exports = utilization;
