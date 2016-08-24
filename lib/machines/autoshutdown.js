'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method autoshutdown
 * @description Configure a machine to shut down automatically after a given interval.
 * The machine will automatically be shut down after this amount of time following the
 * last time a machine was used. (If a machine is used before the end of the interval is
 * reached, the interval will reset and start again at the end of the session.) The interval
 * value must be supplied as one of the following strings: `"1 week", "1 day", "1 hour"`.
 * Any other value passed will be ignored. (We plan to offer more options in the future.)
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Autoshutdown parameters
 * @param {number} params.machineId - Id of the machine on which to configure autoshutdown
 * @param {string} params.interval - Preset interval of time to shut down the machine,
 * e.g. '1 week', '1 day', '1 hour'
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.autoshutdown({
 *   machineId: 123,
 *   interval: '1 week' // You must pass a valid interval string
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines autoshutdown --machineId 123 --interval "1 week"
 * @example
 * # HTTP request:
 * POST /machines/123/autoshutdown {"interval": "1 week"}
 * # Returns 204 on success
 */

function autoshutdown(params, cb) {
  return method(autoshutdown, params, cb);
}

assign(autoshutdown, {
  auth: true,
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
