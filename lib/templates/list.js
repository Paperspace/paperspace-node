'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof templates
 * @method list
 * @description List information about all templates that have been created from the machine
 * with the given id. This action
 * is only available if your credentials have the privilege to access the machine from
 * which the template has been created (either the individual user who owns the machine,
 * or the administrator of the team).
 * @param {object} params - Template list parameters
 * @param {number} params.machineId - Id of the machine from which to list the template
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} template - Template info JSON object
 * @example
 * paperspace.templates.list({
 *   machineId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace templates list --machineId 123
 * @example
 * # HTTP request:
 * GET /machines/123/listTemplates
 * # Returns 200 on success
 */

function list(params, cb) {
  return method(list, params, cb);
}

assign(list, {
  group: 'templates',
  name: 'list',
  method: 'get',
  route: '/machines/:machineId/listTemplates',
  requires: {
    machineId: 'number',
  },
  returns: {},
})

module.exports = list;
