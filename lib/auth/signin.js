'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof auth
 * @method signin
 * @description Sign in the user with the given login credentials. This action will return
 * a login token (JSON web token) that can be appended to subsequent requests on behalf
 * of the logged-in user. (`?access_token={TOKEN}` when part of the query string, or `'token'`
 * as a configuration option when using the Paperspace API client.)
 * @param {object} params - Signin parameters
 * @param {string} params.email - Email address for the user's Paperspace account
 * @param {string} params.password - Password for the user's Paperspace account
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} token - Secure access token for a user session
 * @example
 * paperspace.auth.signin({
 *   email: 'example@example.com',
 *   password: 'secret123',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace auth signin --email "example@example.com" --password "secret123"
 * @example
 * # HTTP request:
 * POST /users/login {"email": "example@example.com", "password": "secret123"}
 * # Returns 204 on success
 */

function signin(params, cb) {
  return method(signin, params, cb);
}

assign(signin, {
  auth: false,
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
