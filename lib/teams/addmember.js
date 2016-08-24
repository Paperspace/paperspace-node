'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof teams
 * @method addmember
 * @description Add a new member (user account) to the team with the given id. When created,
 * the account will immediately be available for login by the person with the credentials
 * assigned. No machine is created with this action. This action can only be performed by
 * the administrator of the team.
 * @param {object} params - Team member creation parameters
 * @param {number} params.teamId - Id of the team in which to add the member
 * @param {string} params.email - Email address for the user's Paperspace account
 * @param {string} params.password - Password for the user's Paperspace account
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.teams.addmember({
 *   teamId: 123,
 *   email: 'example@example.com',
 *   password: 'secret123',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace teams addmember \
 *     --teamId 123 \
 *     --email "example@example.com" \
 *     --password "secret123"
 * @example
 * # HTTP request:
 * POST /teams/123/addMember {"email": "example@example.com", "password": "secret123"}
 * # Returns 201 on success
 */

function addmember(params, cb) {
  return method(addmember, params, cb);
}

assign(addmember, {
  group: 'teams',
  name: 'addmember',
  method: 'post',
  route: '/teams/:teamId/addMember',
  requires: {
    teamId: 'number',
    email: 'string',
    password: 'string',
  },
  returns: {},
})

module.exports = addmember;
