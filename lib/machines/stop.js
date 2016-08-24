'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method stop
 * @description Stop an individual machine. If the machine is already stopped
 * or has been shut down, this action is a no-op. If the machine is running, it
 * will be stopped and any users logged in will be immediately kicked out.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine stop parameters
 * @param {string} params.machineId - Id of the machine to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.stop({
 *   machineId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines stop --machineId 123
 * @example
 * # HTTP request:
 * POST /machines/123/stop
 * # Returns 200 on success
 */

function stop(params, cb) {
  return method(stop, params, cb);
}

assign(stop, {
  group: 'machines',
  name: 'stop',
  method: 'post',
  route: '/machines/:machineId/stop',
  requires: {
    machineId: 'number',
  },
  returns: {},
})

module.exports = stop;
