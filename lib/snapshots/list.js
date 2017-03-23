// 'use strict';
//
// var method = require('./../method');
// var assign = require('lodash.assign');
//
// /**
//  * @memberof snapshots
//  * @method list
//  * @description List information about all snapshots that have been created from the machine
//  * with the given id. This action
//  * is only available if your credentials have the privilege to access the machine from
//  * which the snapshot has been created (either the individual user who owns the machine,
//  * or the administrator of the team).
//  * @param {object} params - Snapshot list parameters
//  * @param {number} params.machineId - Id of the machine from which to list the snapshot
//  * @param {function} cb - Node-style error-first callback function
//  * @returns {object} snapshot - Snapshot info JSON object
//  * @example
//  * paperspace.snapshots.list({
//  *   machineId: 123,
//  * }, function(err, resp) {
//  *   // handle error or http response
//  * });
//  * @example
//  * $ paperspace snapshots list --machineId 123
//  * @example
//  * # HTTP request:
//  * GET /machines/getSnapshots/123
//  * # Returns 200 on success
//  */
//
// function list(params, cb) {
//   return method(list, params, cb);
// }
//
// assign(list, {
//   auth: true,
//   group: 'snapshots',
//   name: 'list',
//   method: 'get',
//   route: '/machines/getSnapshots/:machineId/',
//   requires: {
//     machineId: 'number',
//   },
//   returns: {},
// })
//
// module.exports = list;
