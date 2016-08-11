'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof auth
 * @method signin
 * @description Sign in the user with the given login credentials.
 * @param {object} params - Signin parameters
 * @param {string} params.email - Email address for the user's Paperspace account
 * @param {string} params.password - Password for the user's Paperspace account
 * @param {function} cb - Node-style error-first callback function
 * be used to authenticate further API calls.
 * @example
 * paperspace.auth.signin({
 *   email: 'example@example.com',
 *   password: 'secret123'
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace auth signin --email "example@example.com" --password "secret123"
 */

function signin(params, cb) {
  return method(signin, params, cb);
}

assign(signin, {
  group: 'auth',
  name: 'signin',
  method: 'post',
  route: '/users/login',
  requires: {
    email: 'string',
    password: 'string',
  },
  returns: {},
})

module.exports = signin;
