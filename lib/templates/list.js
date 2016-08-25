'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof templates
 * @method list
 * @description List information about all templates available to either the current
 * authenticated user or the team, if a team id is passed.
 * @param {object} params - Template list parameters
 * @param {number} params.teamId - If looking for a team's templates, provide this
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} template - Template info JSON object
 * @example
 * paperspace.templates.list({
 *   teamId: 456,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace templates list --teamId 456
 * @example
 * # HTTP request:
 * GET /{teams|users}/getAvailableTemplates {"teamId": 456}
 * # Returns 200 on success
 */

function list(params, cb) {
  if (params.teamId) {
    params.prefix = 'teams/' + params.teamId;
    delete params.teamId;
  }
  else {
    params.prefix = 'users';
  }
  return method(list, params, cb);
}

assign(list, {
  auth: true,
  group: 'templates',
  name: 'list',
  method: 'get',
  route: '/:prefix/getAvailableTemplates',
  requires: {},
  returns: {},
})

module.exports = list;
