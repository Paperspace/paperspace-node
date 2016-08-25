'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof templates
 * @method destroy
 * @description Create a template of the machine that has the given id. This action
 * is only available if your credentials have the privilege to access the machine from
 * which the template has been destroyd (either the individual user who owns the machine,
 * or the administrator of the team).
 * @param {object} params - Template destroy parameters
 * @param {number} params.templateId - Id of the machine from which to destroy the template
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.templates.destroy({
 *   templateId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace templates destroy --templateId 123
 * @example
 * # HTTP request:
 * DELETE /templates/123
 * # Returns 204 on success
 */

function destroy(params, cb) {
  return method(destroy, params, cb);
}

assign(destroy, {
  auth: true,
  group: 'templates',
  name: 'destroy',
  method: 'delete',
  route: '/templates/:templateId',
  requires: {
    templateId: 'number',
  },
  returns: {},
})

module.exports = destroy;
