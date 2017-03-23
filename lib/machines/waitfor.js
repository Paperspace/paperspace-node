// 'use strict';
//
// 'use strict';
//
// var method = require('./../method');
// var assign = require('lodash.assign');
//
// /**
//  * @memberof machines
//  * @method waitfor
//  * @description Wait for the machine with the given id to enter a certain machine
//  * state. This action polls the server and returns only when we detect that the machine
//  * has transitioned into the given state. States available are:
//  *   - Off
//  *   - OffWithUpdatesPending
//  *   - StartingUp
//  *   - StartingUpAndInstallingUpdates
//  *   - ShuttingDown
//  *   - ShuttingDownAndInstallingUpdates
//  *   - Restarting
//  *   - RestartingAndInstallingUpdates
//  *   - ServiceReady
//  *   - AgentReady - The machine has fully started and is available for use
//  *   - Upgrading - The machine is undergoing an upgrade
//  *   - Destroyed - The machine is destroyed (no longer available)
//  * When the callback is called, the returned object will be information about the machine.
//  * @param {object} params - Machine waitfor parameters
//  * @param {number} params.machineId - Id of the machine to wait for
//  * @param {string} params.state - Name of the state to wait for
//  * @param {function} cb - Node-style error-first callback function
//  * @returns {objectt} machine - The machine JSON object
//  * @example
//  * paperspace.machines.waitfor({
//  *   machineId:  123,
//  *   state: "Off",
//  * }, function(err, resp) {
//  *   // handle error or http response
//  * });
//  * @example
//  * $ paperspace machines waitfor \
//  *     --machineId 123 \
//  *     --state "Off"
//  * @example
//  * # HTTP request:
//  * # This method is only available using the API client
//  */
//
// var INTERVAL = 1000 // ms
//
// function waitfor(params, cb) {
//   var state = params.state;
//   delete params.state;
//   var interval = setInterval(function _interval() {
//     return method(waitfor, params, function _cb(err, resp) {
//       if (err) {
//         clearInterval(interval);
//         return cb(err)
//       }
//       var machine = resp.body;
//       if (machine && machine.state === state) {
//         clearInterval(interval);
//         return cb(null, resp);
//       }
//     });
//   }, INTERVAL);
//   return interval;
// }
//
// assign(waitfor, {
//   auth: true,
//   group: 'machines',
//   name: 'waitfor',
//   method: 'get',
//   route: '/machines/getMachine',
//   requires: {
//     machineId: 'number',
//   },
//   returns: {},
// })
//
// module.exports = waitfor;
