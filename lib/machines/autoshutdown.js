'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method autoshutdown
 * @description Configure a machine to shut down automatically after a given interval.
 * @param {object} params - Autoshutdown parameters
 * @param {number} params.machineId - Id of the machine on which to configure autoshutdown
 * @param {string} params.interval - Preset interval of time to shut down the machine,
 * e.g. '1 week', '1 day', '1 hour'
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.autoshutdown({
 *   machineId: 123,
 *   interval: '1 week'
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines autoshutdown --machineId 123 --interval "1 week"
 */

function autoshutdown(params, cb) {
  return method(autoshutdown, params, cb);
}

assign(autoshutdown, {
  group: 'machines',
  name: 'autoshutdown',
  method: 'post',
  route: '/machines/:machineId/autoshutdown',
  requires: {
    machineId: 'number',
    password: 'string',
  },
  returns: {},
})

module.exports = autoshutdown;
