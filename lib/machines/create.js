'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof machines
 * @method create
 * @description Create a new Paperspace virtual machine. If you are using an individual account,
 * you will be assigned as the owner of the machine. If you are a team administrator, you must
 * specify who the machine should belong to, either by their user id, or their email address.
 * If you pass a full set of user parameters, we will create a user within your team and assign
 * them the machine.
 * @param {object} params - Machine creation parameters
 * @param {string} params.location - Name of the datacenter (nyc01/ca2)
 * @param {string} params.machineType - Machine preset type (Air/Basic/Pro)
 * @param {string} params.size - Storage size for the machine (50GB/100GB...)
 * @param {string} params.billingType - Either 'monthly' or 'hourly'billing
 * @param {string} params.machineName - A memorable name for this machine
 * @param {number} [params.templateId] - If creating from a template, specify its id
 * @param {string} [params.templateModel] - Either 'xeTemplate' or 'template'
 * @param {string} [params.teamId] - If creating for a team, specify the team id
 * @param {string} [params.userId] - If creating for a user other than yourself, specify the user id
 * @param {string} [params.email] - If creating a new team member, specify their email address
 * @param {string} [params.password] - If creating a new team member, specify their password
 * @param {string} [params.firstName] - If creating a new team member, specify their first name
 * @param {string} [params.lastName] - If creating a new team member, specify their last name
 * @param {string} [params.adUsername] - If creating a new Active Directory user, specify their username
 * @param {string} [params.notificationEmail] - Send a notification to this email address when complete
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.create({
 *   location: 'nyc01',
 *   machineType: 'Air',
 *   size: '50GB',
 *   billingType: 'hourly',
 *   machineName: 'My Machine 1',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines create --location "nyc01" \
 *    --machineType "Air" --size "50GB" --billingType "hourly" \
 *    --machineName "My Machine 1"
 */

function create(params, cb) {
  return method(create, params, cb);
}

assign(create, {
  group: 'machines',
  name: 'create',
  method: 'post',
  route: '/machines/createMachinePublic',
  requires: {
    location: 'string',
    machineType: 'string',
    size: 'string',
    billingType: 'string',
    machineName: 'string'
  },
  returns: {},
})

module.exports = create;
