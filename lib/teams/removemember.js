'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof teams
 * @method removemember
 * @description Remove a member from a team. This action only works if the user with the
 * given user id belongs to the team with the given team id. This action may only be performed
 * by the team's administrator. All of the user's machines are deactivated immediately when
 * this action succeeds. Any snapshots of those machines are also destroyed. Access to the user
 * account will also be terminated.
 * @param {object} params - Team member creation parameters
 * @param {number} params.teamId - Id of the team in which to add the member
 * @param {number} params.userId - Id of the user to remove from the team
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.teams.removemember({
 *   teamId: 123,
 *   userId: 456,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace teams removemember \
 *     --teamId 123 \
 *     --userId 456
 * @example
 * # HTTP request:
 * POST /teams/123/cancelTeamMember {"userId": 456}
 * # Returns 204 on success
 */

function removemember(params, cb) {
  return method(removemember, params, cb);
}

assign(removemember, {
  auth: true,
  group: 'teams',
  name: 'removemember',
  method: 'post',
  route: '/teams/:teamId/cancelTeamMember',
  requires: {
    teamId: 'number',
    userId: 'number',
  },
  returns: {},
})

module.exports = removemember;
