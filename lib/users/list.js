'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof users
 * @method list
 * @description List information about all users available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} template - Template info JSON object
 * @example
 * paperspace.users.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace users list
 * @example
 * # HTTP request:
 * GET /getUsers
 * # Returns 200 on success
 */

function list(params, cb) {
	return method(list, params, cb);
}

assign(list, {
	auth: true,
	group: 'users',
	name: 'list',
	method: 'get',
	route: '/users/getUsers',
	requires: {},
	returns: {},
});

module.exports = list;
