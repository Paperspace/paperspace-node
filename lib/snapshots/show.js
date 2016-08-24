'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof snapshots
 * @method show
 * @description Show information about the snapshot with the given id. This returns information
 * about the machine it was created from, at the time the snapshot was taken. This action
 * is only available if your credentials have the privilege to access the machine from
 * which the snapshot has been created (either the individual user who owns the machine,
 * or the administrator of the team).
 * @param {object} params - Snapshot show parameters
 * @param {number} params.snapshotId - Id of the snapshot record
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} snapshot - Snapshot info JSON object
 * @example
 * paperspace.snapshots.show({
 *   snapshotId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace snapshots show --snapshotId 123
 * @example
 * # HTTP request:
 * GET /snapshots/123
 * # Returns 200 on success
 */

function show(params, cb) {
  return method(show, params, cb);
}

assign(show, {
  group: 'snapshots',
  name: 'show',
  method: 'get',
  route: '/snapshot/:snapshotId',
  requires: {
    snapshotId: 'number',
  },
  returns: {},
})

module.exports = show;
