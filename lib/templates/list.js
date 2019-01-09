'use strict';

var method = require('./../method');

/**
 * @memberof templates
 * @method list
 * @description List information about all templates available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned template objects.
 * @param {object} [filter] - An optional filter object to limit the returned template objects
 * @param {string} [filter.id] - Optional template id to match on
 * @param {string} [filter.name] - Optional name to match on
 * @param {string} [filter.label] - Optional label to match on
 * @param {string} [filter.os] - Optional os to match on
 * @param {string} [filter.dtCreated] - Optional datetime created value to match on
 * @param {string} [filter.teamId] - Optional teamId to match on
 * @param {string} [filter.userId] - Optional userId to match on
 * @param {string} [filter.region] - Optional region to match on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ template, ... ] - JSON array of template objects
 * @example
 * paperspace.templates.list(function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace templates list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /templates/getTemplates
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * // Example return value:
 *[
 *  // A public template:
 *  {
 *    "id": "t123abc",
 *    "name": "paperspace/t123abc",
 *    "label": "Windows 10",
 *    "os": "Windows 10 (Server 2016)",
 *    "dtCreated": "2017-01-03T23:41:06.801Z"
 *  },
 *  // A team-owned template:
 *  {
 *    "id": "t456def",
 *    "name": "t456def",
 *    "label": "New Template 1",
 *    "os": "Ubuntu 14.04.5 LTS; uname: 4.2.0-27-generic; distro: ubuntu; major: 14; minor: 04",
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

Object.assign(list, {
	auth: true,
	group: 'templates',
	name: 'list',
	method: 'get',
	route: '/templates/getTemplates',
	requires: {},
	returns: {},
});

module.exports = list;
