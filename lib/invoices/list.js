'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof invoices
 * @method list
 * @description List the invoices for a given team account or user account. If a user id
 * is passed, invoices for that user will be returned. If the user is a team administrator,
 * invoices for the team will be returned. If a team id is passed, invoices for the team will
 * be returned. This action is only permitted for credentials that have privileges for
 * the account in question.
 * @param {object} params - Invoice lookup parameters
 * @param {string} params.userId - If looking up a user's invoices, the id of the user account
 * @param {string} params.teamId - If looking up a team's invoices, the id of the team account
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} invoices - A list of invoice JSON objects
 * @example
 * paperspace.invoices.list({
 *   userId: 123, // optional - Either userId or teamId, not both!
 *   teamId: 456, // optional - Either userId or teamId, not both!
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace invoices list --userId 123
 * @example
 * # HTTP request:
 * GET /invoices/listInvoices {"userId": 123, "teamId": 456} # One or the other, but not both!
 * # Returns 200 on success
 */

function list(params, cb) {
  return method(list, params, cb);
}

assign(list, {
  auth: true,
  group: 'invoices',
  name: 'list',
  method: 'get',
  route: '/invoices/listInvoices',
  requires: {},
  returns: {},
})

module.exports = list;
