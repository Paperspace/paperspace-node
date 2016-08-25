'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method restart
 * @description Start up an individual machine. If the machine is already restarted,
 * this action is a no-op. If the machine is off, it will be booted up. If the machine
 * is stopped, it will be restarted.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine restart parameters
 * @param {string} params.machineId - Id of the machine to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.restart({
 *   machineId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines restart --machineId 123
 * @example
 * # HTTP request:
 * POST /machines/123/restart
 * # Returns 200 on success
 */

function restart(params, cb) {
  return method(restart, params, cb);
}

assign(restart, {
  auth: true,
  group: 'machines',
  name: 'restart',
  method: 'post',
  route: '/machines/:machineId/restart',
  requires: {
    machineId: 'number',
  },
  returns: {},
})

module.exports = restart;
