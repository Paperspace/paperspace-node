// 'use strict';
//
// var method = require('./../method');
// var assign = require('lodash.assign');
//
// /**
//  * @memberof machines
//  * @method modify
//  * @description Modify a machine's working specifications, including its machine type
//  * (Air, Basic, Pro), billing type (monthly, hourly), and storage size in GB.
//  * In order to perform a modification, the machine will be immediately shut down when
//  * this action occurs. Billing changes will be prorated to the hour. You can change
//  * the machine type and billing type at any time, but the storage size may only be
//  * increased (storage decreases are not possible).
//  * This action can only be performed by the user who owns the machine.
//  * @param {object} params - Machine modification object
//  * @param {string} params.machineId - The id of the machine
//  * @param {string} params.machineType - The type of machine (Air, Basic, Pro)
//  * @param {string} params.billingType - Either 'monthly' or 'hourly'
//  * @param {number} params.size - Size value in GB
//  * @param {function} cb - Node-style error-first callback function
//  * @example
//  * paperspace.machines.modify({
//  *   machineId: 123,
//  *   machineType: 'Air',
//  *   billingType: 'monthly',
//  *   size: 50,
//  * }, function(err, resp) {
//  *   // handle error or http response
//  * });
//  * @example
//  * $ paperspace machines modify \
//  *     --machineId 123 \
//  *     --machineType "Air" \
//  *     --billingType "monthly" \
//  *     --size 50
//  * @example
//  * # HTTP request:
//  * POST /machines/123/upgradeMachine {"machineType": "Air", "billingType": "monthly", "size": 50}
//  * # Returns 200 on success
//  */
//
// var hoist = [
//   'machineType',
//   'billingType',
//   'size',
// ];
//
// function modify(params, cb) {
//   params.specs = {};
//   hoist.forEach(function(toHoist) {
//     params.specs[toHoist] = params[toHoist];
//     delete params[toHoist];
//   });
//   return method(modify, params, cb);
// }
//
// assign(modify, {
//   auth: true,
//   group: 'machines',
//   name: 'modify',
//   method: 'post',
//   route: '/machines/:machineId/upgradeMachine',
//   requires: {
//     machineId: 'number',
//   },
//   returns: {},
// })
//
// module.exports = modify;
