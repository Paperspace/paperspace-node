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
 * @param {string} [params.email] - Email address to change for the user
 * @param {string} [params.password] - Password to change for the user
 * @param {string} [params.cc] - Credit card number to change
 * @param {string} [params.cvv] - Credit card security code to change
 * @param {string} [params.zip] - Postal code / ZIP code for the user's credit card
 * @param {string} [params.ccname] - Name on the credit card for the user account
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} user - User information JSON object
 * @example
 * paperspace.accounts.update({
 *   userId: 123,
 *   email: 'example@example.com', // optional
 *   password: 'secret123', // optional
 *   cc: '1234-4567...', // optional
 *   cvv: '123', // optional
 *   zip: '12345', // optional
 *   ccname: 'Jon Snow', // optional
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace accounts update \
 *     --userId 123 \
 *     --email "example@example.com" \
 *     --password "secret123" \
 *     --cc: "1234-5678" \
 *     --cvv "123" \
 *     --zip "12345" \
 *     --ccname "Jon Snow"
 * @example
 * # HTTP request:
 * PUT /users/123 {"email": "example@example.com", "password": "secret123", "cc": "1234-5678", "cvv": 123, "zip": 12345, "ccname": "Jon Snow"}
 * # Returns 200 on success
 */

function update(params, cb) {
  return method(update, params, cb);
}

assign(update, {
  auth: true,
  group: 'accounts',
  name: 'update',
  method: 'put',
  route: '/users/:userId',
  requires: {
    userId: 'number'
  },
  returns: {},
})

module.exports = update;
