'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof templates
 * @method create
 * @description Create a template of the machine that has the given id. This action
 * is only available if your credentials have the privilege to access the machine from
 * which the template has been created (either the individual user who owns the machine,
 * or the administrator of the team).
 * @param {object} params - Template create parameters
 * @param {number} params.machineId - Id of the machine from which to create the template
 * @param {string} params.name - Name to give the template (must be unique)
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} template - Template info JSON object
 * @example
 * paperspace.templates.create({
 *   machineId: 123,
 *   name: 'My Template 1',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace templates create \
 *     --machineId 123 \
 *     --name "My Template 1"
 * @example
 * # HTTP request:
 * POST /machines/123/createTemplate {"name": "My Template 1"}
 * # Returns 201 on success
 */

function create(params, cb) {
  return method(create, params, cb);
}

assign(create, {
  auth: true,
  group: 'templates',
  name: 'create',
  method: 'post',
  route: '/machines/:machineId/createTemplate',
  requires: {
    machineId: 'number',
    name: 'string',
  },
  returns: {},
})

module.exports = create;
