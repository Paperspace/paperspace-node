'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof templates
 * @method list
 * @description List information about all templates available to either the current
 * authenticated user or the team,, if the user belongs to a team.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} template - Template info JSON object
 * @example
 * paperspace.templates.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace templates list
 * @example
 * # HTTP request:
 * GET /templates/geTemplates
 * # Returns 200 on success
 */

function list(params, cb) {
	return method(list, params, cb);
}

assign(list, {
	auth: true,
	group: 'templates',
	name: 'list',
	method: 'get',
	route: '/templates/getTemplates',
	requires: {},
	returns: {},
});

module.exports = list;
