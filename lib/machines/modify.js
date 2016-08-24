'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method modify
 * @description Modify a machine's working specifications, including its machine type
 * (Air, Basic, Pro), billing type (monthly, hourly), and storage size (50GB, 100GB...).
 * In order to perform a modification, the machine will be immediately shut down when
 * this action occurs. Billing changes will be prorated to the hour. You can change
 * the machine type and billing type at any time, but the storage size may only be
 * increased (storage decreases are not possible).
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine modification object
 * @param {string} params.machineId - The id of the machine
 * @param {string} params.machineType - The type of machine (Air, Basic, Pro)
 * @param {string} params.billingType - Either 'monthly' or 'hourly'
 * @param {string} params.size - Size value string, formatted as "50GB"
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.modify({
 *   machineId: 123,
 *   machineType: 'Air',
 *   billingType: 'monthly',
 *   size: '50GB',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines modify \
 *     --machineId 123 \
 *     --machineType "Air" \
 *     --billingType "monthly" \
 *     --size "50GB"
 * @example
 * # HTTP request:
 * POST /machines/123/upgradeMachine {"machineType": "Air", "billingType": "monthly", "size": "50GB"}
 * # Returns 200 on success
 */

function modify(params, cb) {
  return method(modify, params, cb);
}

assign(modify, {
  group: 'machines',
  name: 'modify',
  method: 'post',
  route: '/machines/:machineId/upgradeMachine',
  requires: {
    machineType: 'string',
    billingType: 'string',
    size: 'string',
  },
  returns: {},
})

module.exports = modify;
