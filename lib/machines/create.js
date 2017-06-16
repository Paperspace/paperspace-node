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
 * them the machine. This action can only be performed by the account owner. (Team members cannot
 * create machines themselves; only the team administrator may do so.)
 * @param {object} params - Machine creation parameters
 * @param {string} params.region - Name of the region ('East Coast (NY2)' or 'West Coast (CA1)')
 * @param {string} params.machineType - Machine preset type (Air/Basic/Pro)
 * @param {number} params.size - Storage size for the machine in GB
 * @param {string} params.billingType - Either 'monthly' or 'hourly' billing
 * @param {string} params.machineName - A memorable name for this machine
 * @param {string} [params.networkId] - If creating on a specific network, specify its id
 * @param {string} [params.templateId] - If creating from a template, specify its id
 * @param {string} [params.teamId] - If creating for a team, specify the team id
 * @param {string} [params.userId] - If creating for a user other than yourself, specify the user id
 * @param {string} [params.email] - If creating a new team member, specify their email address
 * @param {string} [params.password] - If creating a new team member, specify their password
 * @param {string} [params.firstName] - If creating a new team member, specify their first name
 * @param {string} [params.lastName] - If creating a new team member, specify their last name
 * @param {string} [params.notificationEmail] - Send a notification to this email address when complete
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The created machine JSON object
 * @example
 * paperspace.machines.create({
 *   region: 'East Coast (NY2)',
 *   machineType: 'Air',
 *   size: 50,
 *   billingType: 'hourly',
 *   machineName: 'My Machine 1',
 *   networkId: 'n123abc', // optional - only if creating on a specific network
 *   templateId: 't123abc', // optional - only if creating from a template
 *   teamId: 'te456def', // optional - required if creating for an team member
 *   userId: 'u123abc', // optional - required if creating for an user
 *   email: 'example@example.com', // optional - if creating a new user
 *   password: 'secret123', // optional - if creating a new user
 *   firstName: 'Jon', // optional - if creating a new user
 *   lastName: 'Snow', // optional - if creating a new user
 *   notificationEmail: 'example@example.com', // optional - to send a notification here when ready
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines create \
 *     --region "East Coast (NY2)" \
 *     --machineType "Air" \
 *     --size 50 \
 *     --billingType "hourly" \
 *     --machineName "My Machine 1" \
 *     --networkId "n123abc" \
 *     --templateId "t123abc" \
 *     --teamId "te456def" \
 *     --userId "u123abc" \
 *     --email "example@example.com" \
 *     --password "secret123" \
 *     --firstName "Jon" \
 *     --lastName "Snow" \
 *     --notificationEmail "example@example.com"
 * @example
 * # HTTP request:
 * POST /machines/createMachinePublic {"region": "East Coast (NY2)", "machineType": "Air", "size": 50, "billingType": "monthly", "machineName": "My Machine 1", "networkId": "n123abc", "templateId": "t123abc", "teamId": "te456def", "userId": "u123abc", "email": "example@example.com", "password": "secret123", "firstName": "Jon", "lastName": "Snow", "notificationEmail": "example@example.com"}
 * # Returns 201 on success
 */

function create(params, cb) {
	return method(create, params, cb);
}

assign(create, {
	auth: true,
	group: 'machines',
	name: 'create',
	method: 'post',
	route: '/machines/createSingleMachinePublic',
	requires: {
		region: 'string',
		machineType: 'string',
		size: 'number',
		billingType: 'string',
		machineName: 'string',
	},
	returns: {},
});

module.exports = create;
