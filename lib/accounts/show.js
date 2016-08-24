'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof accounts
 * @method show
 * @description Retrieve information about the user account with the given user id.
 * This action returns a JSON object that contains information about the user that is
 * accessible to the person making the request. The user's basic information is included
 * (email, first name, last name), as well as a list of machines that belong to the user.
 * @param {object} params - User lookup parameters
 * @param {string} params.userId - The id of the user account
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} user - User information JSON object
 * @example
 * paperspace.accounts.show({
 *   userId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace accounts show --userId 123
 * @example
 * # HTTP request:
 * GET /users/123
 * # Returns 200 on success
 */

function show(params, cb) {
  return method(show, params, cb);
}

assign(show, {
  auth: true,
  group: 'accounts',
  name: 'show',
  method: 'get',
  route: '/users/:userId',
  requires: {
    userId: 'number'
  },
  returns: {},
})

module.exports = show;
