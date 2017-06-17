'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof templates
 * @method list
 * @description List information about all templates available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ template, ... ] - JSON array of template objects
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
 * @example
 * // Example return value:
 *[
 *  // A public template:
 *  {
 *    "id": "t123abc",
 *    "name": "paperspace/t8dins2",
 *    "label": "Windows 10 (Server 2016)",
 *    "os": "Windows 10",
 *    "dtCreated": "2017-01-03T23:41:06.801Z"
 *  },
 *  // A team-owned template:
 *  {
 *    "id": "t789ghi",
 *    "name": "t789ghi",
 *    "label": "Ubuntu Server",
 *    "os": "",
 *    "teamId": "te456def",
 *    "userId": null,
 *    "region": "East Coast (NY2)",
 *    "dtCreated": "2017-02-06T18:46:44.882Z"
 *  }
 *]
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
