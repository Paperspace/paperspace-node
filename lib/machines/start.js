'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method start
 * @description Start up an individual machine. If the machine is already started,
 * this action is a no-op. If the machine is off, it will be booted up. If the machine
 * is stopped, it will be started.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine start parameters
 * @param {string} params.machineId - Id of the machine to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.start({
 *   machineId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines start --machineId 123
 * @example
 * # HTTP request:
 * POST /machines/123/start
 * # Returns 200 on success
 */

function start(params, cb) {
  return method(start, params, cb);
}

assign(start, {
  auth: true,
  group: 'machines',
  name: 'start',
  method: 'post',
  route: '/machines/:machineId/start',
  requires: {
    machineId: 'number',
  },
  returns: {},
})

module.exports = start;
