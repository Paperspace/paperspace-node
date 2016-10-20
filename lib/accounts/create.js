'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof accounts
 * @method create
 * @description Create a new user account with the given parameters.
 * @param {object} params - User parameters
 * @param {string} params.teamId - The team id the user should belong to
 * @param {string} [params.firstName] - First name of the user
 * @param {string} [params.lastName] - Last name of the user
 * @param {string} [params.email] - Email address to change for the user
 * @param {string} [params.password] - Password to change for the user
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} user - User information JSON object
 * @example
 * paperspace.accounts.create({
 *   teamId: 456,
 *   firstName: "Bob", // optional
 *   lastName: "Smith", // optional
 *   email: 'example@example.com', // optional
 *   password: 'secret123', // optional
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace accounts create \
 *     --teamId 456 \
 *     --firstName "Bob" \
 *     --lastName "Smith" \
 *     --email "example@example.com" \
 *     --password "secret123"
 * @example
 * # HTTP request:
 * POST /users/createUser {"teamId": 456, "email": "example@example.com", "password": "secret123", "firstName": "Bob", "lastName": "Smith"}
 * # Returns 200 on success
 */

function create(params, cb) {
  return method(create, params, cb);
}

assign(create, {
  auth: true,
  group: 'accounts',
  name: 'create',
  method: 'post',
  route: '/users/createUser',
  requires: {
    teamId: 'number'
  },
  returns: {},
})

module.exports = create;
