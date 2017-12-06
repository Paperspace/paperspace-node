'use strict';

var method = require('./../method');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method logs
 * @description Stream the logs for the job with the given id, while the job is running or after it has stopped.
 * @param {object} params - Job logs parameters
 * @param {string} params.jobId - Id of the job to logs
 * @param {function} cb - Node-style error-first callback function
 * @returns logs - The job logs
 * @example
 * paperspace.jobs.logs({
 *   jobId: 'j123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace jobs logs \
 *     --jobId "j123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /jobs/getLogs?jobId=j123abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 */

 function printLogs(data) {
   var body = [];
   var line = 0;
   var eof = false;
	 if (data && data.text && data.text.length) {
		 try {
			 body = JSON.parse(data.text);
		 } catch (e) {
			 console.error(e);
			 body = [];
		 }
		 body.forEach(function itemFunc(item) {
       if (item.line) line = item.line;
       if (item.message) {
         if (item.message === 'PSEOF') eof = true;
         else console.log(item.message);
       }
		 });
	 }
   return { count: body.length, line: line, eof: eof };
 }

function logs(params, cb) {
	var tail = false;
	if (params.tail) {
		tail = true;
		delete params.tail
	}
	if (!params.line) params.line = 0;
	return _logs(params, cb);
}

function _logs(params, cb) {
	return method(logs, params, function logsCb(err, data) {
    if (err) cb(err);
    var result = printLogs(data);
    if (result.count > 0 && !result.eof) {
      result.line += 1;
      params.line = result.line;
      return _logs(params, cb);
    }
    return cb(null);
	});
}

assign(logs, {
	auth: true,
	group: 'jobs',
	name: 'logs',
	method: 'get',
	route: '/jobs/logs',
	requires: {
		jobId: 'string',
	},
	returns: {},
});

module.exports = logs;
