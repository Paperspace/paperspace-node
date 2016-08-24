'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof snapshots
 * @method create
 * @description Create a snapshot of the machine that has the given id. This action
 * is only available if your credentials have the privilege to access the machine from
 * which the snapshot has been created (either the individual user who owns the machine,
 * or the administrator of the team).
 * @param {object} params - Snapshot create parameters
 * @param {number} params.machineId - Id of the machine from which to create the snapshot
 * @param {string} params.name - Name to give the snapshot (must be unique)
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} snapshot - Snapshot info JSON object
 * @example
 * paperspace.snapshots.create({
 *   machineId: 123,
 *   name: 'My Snapshot 1',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace snapshots create \
 *     --machineId 123 \
 *     --name "My Snapshot 1"
 * @example
 * # HTTP request:
 * POST /machines/123/createSnapshot {"name": "My Snapshot 1"}
 * # Returns 201 on success
 */

function create(params, cb) {
  return method(create, params, cb);
}

assign(create, {
  group: 'snapshots',
  name: 'create',
  method: 'post',
  route: '/machines/:machineId/createSnapshot',
  requires: {
    machineId: 'number',
    name: 'string',
  },
  returns: {},
})

module.exports = create;
