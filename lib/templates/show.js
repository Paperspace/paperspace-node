'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof templates
 * @method show
 * @description Show information about the template with the given id. This returns information
 * about the machine it was created from. This action
 * is only available if your credentials have the privilege to access the machine from
 * which the template has been created (either the individual user who owns the machine,
 * or the administrator of the team).
 * @param {object} params - Template show parameters
 * @param {number} params.templateId - Id of the template record
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} template - Template info JSON object
 * @example
 * paperspace.templates.show({
 *   templateId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace templates show --templateId 123
 * @example
 * # HTTP request:
 * GET /templates/123
 * # Returns 200 on success
 */

function show(params, cb) {
  return method(show, params, cb);
}

assign(show, {
  group: 'templates',
  name: 'show',
  method: 'get',
  route: '/template/:templateId',
  requires: {
    templateId: 'number',
  },
  returns: {},
})

module.exports = show;
