'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof accounts
 * @method destroy
 * @description Destroy an existing user's account. Only the user themself or the team
 * administrator of the team the user belongs to has the privilege to perform this
 * action. All machines that belong to the user will be deactivated immediately, as well
 * as any snapshots created from those machines.
 * @param {object} params - User deletion parameters
 * @param {string} params.userId - The id of the user account
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.accounts.destroy({
 *   userId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace accounts destroy --userId 123
 * @example
 * # HTTP request:
 * POST /users/123/cancelAccount
 * # Returns 204 on success
 */

function destroy(params, cb) {
	return method(destroy, params, cb);
}

assign(destroy, {
	auth: true,
	group: 'accounts',
	name: 'destroy',
	method: 'post',
	route: '/users/:userId/cancelAccount',
	requires: {
		userId: 'number',
	},
	returns: {},
});

module.exports = destroy;
