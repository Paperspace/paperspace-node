'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof accounts
 * @method create
 * @description Create a new user account with the given credentials. If a team id is
 * passed, the user will be assigned as a member to the given team. Note that only the
 * adminstrator of the team is allowed to assign a team member, so if your API credentials
 * do not have admnistrator privileges, this action will fail.
 * @param {object} params - User creation parameters
 * @param {string} params.email - Email address for the user's Paperspace account
 * @param {string} params.password - Password for the user's Paperspace account
 * @param {number} [params.teamId] - If creating a team member, include the id of the team
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} user - User information JSON object
 * @example
 * paperspace.accounts.create({
 *   email: 'example@example.com',
 *   password: 'secret123',
 *   teamId: 1234, // optional
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace accounts create \
 *     --email "example@example.com" \
 *     --password "secret123" \
 *     --teamId 1234
 * @example
 * # HTTP request:
 * POST /users {"email": "example@example.com", "password": "secret123", "teamId": 1234}
 * # Returns 201 on success
 */

function create(params, cb) {
  return method(create, params, cb);
}

assign(create, {
  group: 'accounts',
  name: 'create',
  method: 'post',
  route: '/users',
  requires: {
    email: 'string',
    password: 'string',
  },
  returns: {},
})

module.exports = create;
