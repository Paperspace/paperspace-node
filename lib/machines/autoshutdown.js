// 'use strict';
//
// var method = require('./../method');
// var assign = require('lodash.assign');
//
// /**
//  * @memberof machines
//  * @method autoshutdown
//  * @description Configure a machine to shut down automatically after a given timeout.
//  * The machine will automatically be shut down after this amount of time following the
//  * last time a machine was used. (If a machine is used before the end of the timeout is
//  * reached, the timeout will reset and start again at the end of the session.) The timeout
//  * value must be supplied as a numeric value representing a number of hours.
//  * This action can only be performed by the user who owns the machine.
//  * @param {object} params - Autoshutdown parameters
//  * @param {number} params.machineId - Id of the machine on which to configure autoshutdown
//  * @param {string} params.timeout - Timout for the machine, in hours
//  * @param {function} cb - Node-style error-first callback function
//  * @example
//  * paperspace.machines.autoshutdown({
//  *   machineId: 123,
//  *   timeout: 1, // 1 hour
//  * }, function(err, resp) {
//  *   // handle error or http response
//  * });
//  * @example
//  * $ paperspace machines autoshutdown --machineId 123 --timeout 1
//  * @example
//  * # HTTP request:
//  * POST /machines/123/autoshutdown {"timeout": 1}
//  * # Returns 204 on success
//  */
//
// function autoshutdown(params, cb) {
//   return method(autoshutdown, params, cb);
// }
//
// assign(autoshutdown, {
//   auth: true,
//   group: 'machines',
//   name: 'autoshutdown',
//   method: 'post',
//   route: '/machines/:machineId/updateShutdownTimeout',
//   requires: {
//     machineId: 'number',
//     timeout: 'number',
//   },
//   returns: {},
// })
//
// module.exports = autoshutdown;
