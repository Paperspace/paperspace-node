'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method shutdown
 * @description Shut down an individual machine. This action immediately requests
 * that the datacenter shut down the machine. Anyone accessing the machine will be
 * kicked out of the machine immediately. A machine in the shut down state is considered
 * "off" and will need to be booted up again before it can be used.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine shutdown parameters
 * @param {string} params.machineId - Id of the machine to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.shutdown({
 *   machineId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines shutdown --machineId 123
 * @example
 * # HTTP request:
 * POST /machines/123/shutdown
 * # Returns 200 on success
 */

function shutdown(params, cb) {
  return method(shutdown, params, cb);
}

assign(shutdown, {
  auth: true,
  group: 'machines',
  name: 'shutdown',
  method: 'post',
  route: '/machines/:machineId/shutdown',
  requires: {
    machineId: 'number',
  },
  returns: {},
})

module.exports = shutdown;
