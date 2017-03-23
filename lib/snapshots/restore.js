// 'use strict';
//
// var method = require('./../method');
// var assign = require('lodash.assign');
//
// /**
//  * @memberof snapshots
//  * @method restore
//  * @description Restore a machine to an existing snapshot of that
//  * machine. This has the effect of shutting down the machine, then starting
//  * the machine with the state as it was at the time of the snapshot.
//  * @param {object} params - Snapshot restore parameters
//  * @param {number} params.machineId - Id of the machine
//  * @param {string} params.snapshotId - Id of the snapshot at which to restore the machine
//  * @param {function} cb - Node-style error-first callback function
//  * @returns {object} snapshot - Snapshot info JSON object
//  * @example
//  * paperspace.snapshots.restore({
//  *   machineId: 123,
//  *   snapshotId: 888,
//  * }, function(err, resp) {
//  *   // handle error or http response
//  * });
//  * @example
//  * $ paperspace snapshots restore \
//  *     --machineId 123 \
//  *     --snapshotId 888
//  * @example
//  * # HTTP request:
//  * POST /machines/123/restoreSnapshot {"snapshotId": 888}
//  * # Returns 200 on success
//  */
//
// function restore(params, cb) {
//   return method(restore, params, cb);
// }
//
// assign(restore, {
//   auth: true,
//   group: 'snapshots',
//   name: 'restore',
//   method: 'post',
//   route: '/machines/:machineId/restoreSnapshot',
//   requires: {
//     machineId: 'number',
//     snapshotId: 'number',
//   },
//   returns: {},
// })
//
// module.exports = restore;
