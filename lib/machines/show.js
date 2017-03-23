'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method show
 * @description Show machine information for the machine with the given id.
 * @param {object} params - Machine show parameters
 * @param {string} params.publicMachineId - UUID of the machine to show
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The machine JSON object
 * @example
 * paperspace.machines.show({
 *   publicMachineId:  pslg3mr3,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines show \
 *     --publicMachineId pslg3mr3
 * @example
 * # HTTP request:
 * GET /machines/getMachine?publicMachineId=pslg3mr3
 * Returns 200 on success
 */

function show(params, cb) {
  return method(show, params, cb);
}

assign(show, {
  auth: true,
  group: 'machines',
  name: 'show',
  method: 'get',
  route: '/machines/getMachine',
  requires: {
    publicMachineId: 'string',
  },
  returns: {},
})

module.exports = show;
