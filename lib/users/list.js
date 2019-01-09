'use strict';

var method = require('./../method');

/**
 * @memberof users
 * @method list
 * @description List information about all users available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned user objects.
 * @param {object} [filter] - An optional filter object to limit the returned user objects
 * @param {string} [filter.id] - Optional user id to match on
 * @param {string} [filter.email] - Optional email to match on
 * @param {string} [filter.firstname] - Optional firstname to match on
 * @param {string} [filter.lastname] - Optional lastname to match on
 * @param {string} [filter.dtCreated] - Optional datetime created value to match on
 * @param {string} [filter.teamId] - Optional teamId to match on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ user, ... ] - JSON array of user objects
 * @example
 * paperspace.users.list(function(err, res) {
 *   // handle error or result
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

Object.assign(list, {
	auth: true,
	group: 'users',
	name: 'list',
	method: 'get',
	route: '/users/getUsers',
	requires: {},
	returns: {},
});

module.exports = list;
