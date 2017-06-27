'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof users
 * @method list
 * @description List information about all users available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ user, ... ] - JSON array of user objects
 * @example
 * paperspace.users.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace users list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /users/getUsers
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * [
 *   {
 *     "id": "u123abc",
 *     "email": "jon@example.com",
 *     "firstname": "Jon",
 *     "lastname": "Snow",
 *     "dtCreated": "2017-04-15T16:20:59.609Z",
 *     "teamId": "te456def"
 *   },
 *   {
 *     "id": "u789ghi",
 *     "email": "jeff@example.com",
 *     "firstname": "Jeff",
 *     "lastname": "Green",
 *     "dtCreated": "2016-12-07T15:59:09.769Z",
 *     "teamId": "te456def"
 *   }
 * ]
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
