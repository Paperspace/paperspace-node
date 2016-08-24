'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof snapshots
 * @method destroy
 * @description Create a snapshot of the machine that has the given id. This action
 * is only available if your credentials have the privilege to access the machine from
 * which the snapshot has been destroyd (either the individual user who owns the machine,
 * or the administrator of the team).
 * @param {object} params - Snapshot destroy parameters
 * @param {number} params.snapshotId - Id of the machine from which to destroy the snapshot
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.snapshots.destroy({
 *   snapshotId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace snapshots destroy --snapshotId 123
 * @example
 * # HTTP request:
 * POST /snapshots/123/deleteSnapshot
 * # Returns 204 on success
 */

function destroy(params, cb) {
  return method(destroy, params, cb);
}

assign(destroy, {
  group: 'snapshots',
  name: 'destroy',
  method: 'post',
  route: '/snapshot/:snapshotId/deleteSnapshot',
  requires: {
    snapshotId: 'number',
  },
  returns: {},
})

module.exports = destroy;
