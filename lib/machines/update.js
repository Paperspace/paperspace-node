// 'use strict';
//
// var method = require('./../method');
// var assign = require('lodash.assign');
//
// /**
//  * @memberof machines
//  * @method update
//  * @description Edit the attributes of a machine. For now, it is only possible
//  * to change the name (label) of a machine. If you want to up/downgrade a machine,
//  * please see the 'modify' action instead.
//  * This action can only be performed by the user who owns the machine.
//  * @param {object} params - Machine update parameters
//  * @param {number} params.machineId - Id of the machine to update
//  * @param {string} params.name - Name to change the machine to
//  * @param {function} cb - Node-style error-first callback function
//  * @example
//  * paperspace.machines.update({
//  *   machineId:  123,
//  *   name: "Bob's Machine",
//  * }, function(err, resp) {
//  *   // handle error or http response
//  * });
//  * @example
//  * $ paperspace machines update \
//  *     --machineId 123 \
//  *     --name "Bob's Machine"
//  * # HTTP request:
//  * PUT /machines/123/editMachine {"name": "Bob's Machine"}
//  * # Returns 200 on success
//  */
//
// var hoist = [
//   'name',
// ];
//
// function update(params, cb) {
//   params.edits = {};
//   hoist.forEach(function(toHoist) {
//     params.edits[toHoist] = params[toHoist];
//     delete params[toHoist];
//   });
//   return method(update, params, cb);
// }
//
// assign(update, {
//   auth: true,
//   group: 'machines',
//   name: 'update',
//   method: 'put',
//   route: '/machines/:machineId/editMachine',
//   requires: {
//     machineId: 'number',
//   },
//   returns: {},
// })
//
// module.exports = update;
