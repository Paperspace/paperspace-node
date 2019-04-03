'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof resourceDelegations
 * @method create
 * @description Create resourceDelegation with limited access, e.g. for users who needs to stream a machine you created.
 * The create method takes a delegation object as the only argument with resource name as key and an object with ids to list resource ids to give access to.
 * @param {object} [delegation] - A delegation object to grant access to reources
 * @param {object} [delegation.machine] - Optional resource 'machine' to grant access to.
 * @param {array} [delegation.machine.ids] - Optional list of machine ids to grant access to.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} {
 *     delegation: { machine: ['m123abc', 'm456def', ... ] },
 *     accessToken: 'resource-delegation-token-123abc...',
 *     ...
 *   } - JSON object with provided delegation and newly generated resourceDelegation accessToken
 * @example
 * var delegation = {
 *   machine: {
 *     ids: ['m123abc', 'm456def']
 *   }
 * };
 * paperspace.resourceDelegations.create(delegation, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace resourceDelegations create
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /resourceDelegations/create
 * x-api-key: 1ba4f98e7c0...
 * {
  "machine": {
    "ids": ["m123abc", "m456def"]
  }
}
 * # Returns 200 on success
 * @example
 * // Example return value:
 * [
 *   {
 *     "delegation": {
 *       "machine": {
 *         "ids": [
 *           "m123abc",
 *           "m456def"
 *         ]
 *       }
 *     },
 *     "isEnabled": true,
 *     "accessTokenId": "resource-delegation-token-123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc",
 *     "dtCreated": "2019-04-03T12:31:40.061Z",
 *     "id": 123
 *   }
 * ]
 */

function create(params, cb) {
  return method(create, params, cb);
}

assign(create, {
  auth: true,
  group: 'resourceDelegations',
  name: 'create',
  method: 'post',
  route: '/resourceDelegations/create',
  requires: {},
  returns: {},
});

module.exports = create;
