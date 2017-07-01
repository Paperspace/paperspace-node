var assign = require('lodash.assign');

/**
 * @memberof scripts
 * @method destroy
 * @description Destroys the starup script with the given id. When this action is performed,
 * the script is immediately disassociated from any machines it is assigned to as well.
 * @param {object} params - Script destroy parameters
 * @param {string} params.scriptId - The id of the script to destroy
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.scripts.destroy({
 *   scriptId: 'sc123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace scripts destroy --scriptId "sc123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /scripts/sc123abc/destroy
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function destroy(params, cb) {
	return method(destroy, params, cb);
}

assign(destroy, {
	auth: true,
	group: 'scripts',
	name: 'destroy',
	method: 'post',
	route: '/scripts/:scriptId/destroy',
	requires: {
		scriptId: 'string',
	},
	returns: {},
});

module.exports = destroy;
