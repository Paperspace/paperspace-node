// 'use strict';
//
// var method = require('./../method');
// var assign = require('lodash.assign');
//
// /**
//  * @memberof teams
//  * @method show
//  * @description Show information about an individual team using the given team id.
//  * This returns basic information about the team, as well as information about all
//  * members' user accounts, and the team administrator's account. This action is only
//  * permitted for the team's administrator.
//  * @param {object} params - Team lookup parameters
//  * @param {number} params.teamId - Id of the team to show
//  * @param {function} cb - Node-style error-first callback function
//  * @example
//  * paperspace.teams.show({
//  *   teamId: 123,
//  * }, function(err, resp) {
//  *   // handle error or http response
//  * });
//  * @example
//  * $ paperspace teams show --teamId 123
//  * @example
//  * # HTTP request:
//  * GET /teams/123
//  * # Returns 200 on success
//  */
//
// function show(params, cb) {
//   params.filter = { include: ['users', 'adminUser', 'machines'] }
//   return method(show, params, cb);
// }
//
// assign(show, {
//   auth: true,
//   group: 'teams',
//   name: 'show',
//   method: 'get',
//   route: '/teams/:teamId',
//   requires: {
//     teamId: 'number',
//   },
//   returns: {},
// })
//
// module.exports = show;
