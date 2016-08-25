'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof accounts
 * @method update
 * @description Modify the information for the given user account. Only the passed
 * parameters will be modified on the user's attributes. (Simply omit any fields that
 * you do not want to change.) Only the user or the user's team's administrator can
 * perform this action. Use caution when performing an update to the user's password
 * or MFA configuration, since this interface doesn't prompt for a confirmation.
 * This action returns the updated user information object.
 * @param {object} params - User parameters
 * @param {string} params.userId - The id of the user account to modify
 * @param {string} [params.firstName] - First name of the user
 * @param {string} [params.lastName] - Last name of the user
 * @param {string} [params.email] - Email address to change for the user
 * @param {string} [params.password] - Password to change for the user
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} user - User information JSON object
 * @example
 * paperspace.accounts.update({
 *   userId: 123,
 *   firstName: "Bob", // optional
 *   lastName: "Smith", // optional
 *   email: 'example@example.com', // optional
 *   password: 'secret123', // optional
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace accounts update \
 *     --userId 123 \
 *     --firstName "Bob" \
 *     --lastName "Smith" \
 *     --email "example@example.com" \
 *     --password "secret123"
 * @example
 * # HTTP request:
 * PUT /users/123/edit {"email": "example@example.com", "password": "secret123", "firstName": "Bob", "lastName": "Smith"}
 * # Returns 200 on success
 */

var hoist = [
  'firstName',
  'lastName',
  'email',
  'password',
];

function update(params, cb) {
  params.edits = {};
  hoist.forEach(function(toHoist) {
    params.edits[toHoist] = params[toHoist];
    delete params[toHoist];
  });
  return method(update, params, cb);
}

assign(update, {
  auth: true,
  group: 'accounts',
  name: 'update',
  method: 'put',
  route: '/users/:userId/edit',
  requires: {
    userId: 'number'
  },
  returns: {},
})

module.exports = update;
