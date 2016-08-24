'use strict';

'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method show
 * @description Show machine information for the machine with the given id.
 * @param {object} params - Machine show parameters
 * @param {number} params.machineId - Id of the machine to wait for
 * @param {function} cb - Node-style error-first callback function
 * @returns {objectt} machine - The machine JSON object
 * @example
 * paperspace.machines.show({
 *   machineId:  123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines show \
 *     --machineId 123
 * @example
 * # HTTP request:
 * # This method is only available using the API client
 */

function show(params, cb) {
  return method(show, params, cb);
}

assign(show, {
  auth: true,
  group: 'machines',
  name: 'show',
  method: 'get',
  route: '/machines/:machineId',
  requires: {},
  returns: {},
})

module.exports = show;
