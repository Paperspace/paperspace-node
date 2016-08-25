'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof invoices
 * @method show
 * @description Show an individual invoice, looking it up by its id. This action is only
 * permitted for credentials have privileges for the account that receives the invoice.
 * (In the case of a team, this is the team administrator.)
 * @param {object} params - Invoice lookup parameters
 * @param {string} params.invoiceId - The id of the invoice record
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} invoice - An individual invoice JSON object
 * @example
 * paperspace.invoices.show({
 *   invoiceId: 123,
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace invoices show --invoiceId 123
 * @example
 * # HTTP request:
 * GET /invoices/123/getInvoiceInfo
 * # Returns 200 on success
 */

function show(params, cb) {
  return method(show, params, cb);
}

assign(show, {
  auth: true,
  group: 'invoices',
  name: 'show',
  method: 'get',
  route: '/invoices/:invoiceId/getInvoiceInfo',
  requires: {},
  returns: {},
})

module.exports = show;
