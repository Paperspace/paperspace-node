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
 * @param {string} params.region - Name of the region: either 'East Coast (NY2)', 'West Coast (CA1)', or 'Europe (AMS1)'
 * @param {string} params.machineType - Machine type: either 'Air', 'Standard', 'Pro', 'Advanced', 'GPU+', 'P4000', 'P5000', 'P6000', 'V100', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', or 'C10'<p>
 * Note:<br>
 * Windows os templates cannot be used to create CPU-only machine types 'C1' - 'C10'.<br>
 * Ubuntu os templates cannot be used to create GRID GPU machine types: 'Air', 'Standard', 'Pro', or 'Advanced'.
 * @param {number} params.size - Storage size for the machine in GB
 * @param {string} params.billingType - Either 'monthly' or 'hourly' billing
 * @param {string} params.machineName - A memorable name for this machine
 * @param {string} params.templateId - Template id of the template to use for creating this machine
 * @param {boolean} [params.assignPublicIp] - Assign a new public ip address on machine creation
 * @param {string} [params.networkId] - If creating on a specific network, specify its id
 * @param {string} [params.teamId] - If creating the machine for a team, specify the team id
 * @param {string} [params.userId] - If assigning to an existing user other than yourself, specify the user id
 * @param {string} [params.email] - If creating a new user for this machine, specify their email address
 * @param {string} [params.password] - If creating a new user, specify their password
 * @param {string} [params.firstName] - If creating a new user, specify their first name
 * @param {string} [params.lastName] - If creating a new user, specify their last name
 * @param {string} [params.notificationEmail] - Send a notification to this email address when complete
 * @param {string} [params.scriptId] - The script id of a script to be run on startup.  See the [Script Guide]{@link https://paperspace.github.io/paperspace-node/scripts.md} for more info on using scripts.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The created machine JSON object
 * @example
 * paperspace.machines.create({
 *   region: 'East Coast (NY2)',
 *   machineType: 'Air',
 *   size: 50,
 *   billingType: 'hourly',
 *   machineName: 'My Machine 1',
 *   templateId: 't123abc',
 *   assignPublicIp: true, // optional - assign a new public ip address
 *   networkId: 'n123abc', // optional - only if creating on a specific network
 *   teamId: 'te456def', // optional - required if creating this machine for a team
 *   userId: 'u123abc', // optional - required if assigning to an existing user other than yourself
 *   email: 'example@example.com', // optional - if creating a new user
 *   password: 'secret123', // optional - if creating a new user
 *   firstName: 'Jon', // optional - if creating a new user
 *   lastName: 'Snow', // optional - if creating a new user
 *   notificationEmail: 'example@example.com', // optional - address to send a notification when complete
 *   scriptId: 'sc123abc', // optional - a script to be run on startup
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace machines create \
 *     --region "East Coast (NY2)" \
 *     --machineType "Air" \
 *     --size 50 \
 *     --billingType "hourly" \
 *     --machineName "My Machine 1" \
 *     --templateId "t123abc" \
 *     --assignPublicIp true \
 *     --networkId "n123abc" \
 *     --teamId "te456def" \
 *     --userId "u123abc" \
 *     --email "example@example.com" \
 *     --password "secret123" \
 *     --firstName "Jon" \
 *     --lastName "Snow" \
 *     --notificationEmail "example@example.com" \
 *     --scriptId "sc123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /machines/createSingleMachinePublic {"region": "East Coast (NY2)", "machineType": "Air", "size": 50, "billingType": "monthly", "machineName": "My Machine 1", "templateId": "t123abc", "assignPublicIp": true, "networkId": "n123abc", "teamId": "te456def", "userId": "u123abc", "email": "example@example.com", "password": "secret123", "firstName": "Jon", "lastName": "Snow", "notificationEmail": "example@example.com"}
 * x-api-key: 1ba4f98e7c0...
 * # Returns 201 on success
 * @example
 * // Example return value:
 * {
 *   "id": "ps123abc",
 *   "name": "My Machine",
 *   "os": null,
 *   "ram": null,
 *   "cpus": 1,
 *   "gpu": null,
 *   "storageTotal": null,
 *   "storageUsed": null,
 *   "usageRate": "Air hourly",
 *   "shutdownTimeoutInHours": 24,
 *   "shutdownTimeoutForces": false,
 *   "performAutoSnapshot": false,
 *   "autoSnapshotFrequency": null,
 *   "autoSnapshotSaveCount": null,
 *   "agentType": "WindowsDesktop",
 *   "dtCreated": "2017-02-16T20:26:54.880Z",
 *   "state": "provisioning",
 *   "networkId": null,
 *   "privateIpAddress": null,
 *   "publicIpAddress": "169.255.255.254",
 *   "region": null,
 *   "userId": "u123abc",
 *   "teamId": "te456def"
 *   "scriptId": "sc123abc"
 *   "dtLastRun": null
 * }
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
		templateId: 'string',
	},
	returns: {},
});

module.exports = create;
