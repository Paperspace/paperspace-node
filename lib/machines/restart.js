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
 * @param {string} params.publicMachineId - UUID of the machine to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.restart({
 *   machineId: pslg3mr3,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines restart --publicMachineId pslg3mr3
 * @example
 * # HTTP request:
 * POST /machines/pslg3mr3/restart
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
  route: '/machines/:publicMachineId/restart',
  requires: {
    publicMachineId: 'string',
  },
  returns: {},
})

module.exports = restart;
