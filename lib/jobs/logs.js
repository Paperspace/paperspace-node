'use strict';

var method = require('./../method');
var projectConfig = require('./../projectConfig');
var assign = require('lodash.assign');

/**
 * @memberof jobs
 * @method logs
 * @description Stream the logs for the job with the given id, while the job is running or after it has stopped.
 * @param {object} params - Job logs parameters
 * @param {string} params.jobId - Id of the job to logs
 * @param {boolean} [params.tail] - Optional; if tail is specified logs will be streamed until the job stops.
 * @param {boolean} [params.line] - Optional; if line is specified logs only logs after that line will be returned (up to limit).
 * @param {boolean} [params.limit] - Optional; number of log lines to retrieve on each request; default limit is 2000.
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

 function parseLogs(data, allLogs) {
   var line = 0;
   var eof = false;
   data.body = []; // WARNING: will loose any real body if response type changes
	 if (data.text && data.text.length) {
		 try {
			 data.body = JSON.parse(data.text);
		 } catch (e) {
			 console.error(e);
			 data.body = [];
		 }
		 data.body.forEach(function itemFunc(item, index) {
       if (item.message) {
         if (item.message.endsWith('\r')) item.message = item.message.slice(0, -1);
         if (item.message === 'PSEOF') {
           eof = true;
           data.body.splice(index, 1); // remove the PSEOF marker
         }
         else {
           if (item.line) line = item.line;
           if (global.paperspace_cli) {
             console.log(item.message);
           } else if (allLogs) allLogs.push(item);
         }
       } else if (item.line) line = item.line;
		 });
	 }
   return { count: data.body.length, line: line, eof: eof };
 }

function logs(params, cb) {
  params.jobId = projectConfig.getLastJobId(null, params.jobId);
	var tail = false;
	if (params.tail) {
		tail = true;
		delete params.tail;
	}
  var singleChunk = false;
	if (typeof params.line === 'undefined') params.line = 0;
  else singleChunk = true; // if line is specified only a limited chunk will be returned; params.limit defines the limit; default is 2000
  var backoff = 0;
  var allLogs;
  if (!global.paperspace_cli) allLogs = [];

  var MAX_BACKOFF_SECS = 30;

  function _logs() {
  	return method(logs, params, function logsCb(err, data) {
      if (err) cb(err);
      var result = parseLogs(data, allLogs);
      if (result.count > 0) {
        // store new last line in method params
        params.line = result.line;
      }
      if ((result.count > 0 || tail) && !result.eof && !singleChunk) {
        if (result.count > 0) backoff = 0;
        else if (backoff < MAX_BACKOFF_SECS) {
          // increase backoff geometrically
          if (backoff === 0) backoff = 1;
          else backoff *= 2;
        }
        else backoff = MAX_BACKOFF_SECS; // cap backoff at this

        if (backoff > 0) {
          // sleep for backoff secs then query logs again
          return setTimeout(function _interval() {
            return _logs();
          }, backoff * 1000);
        }
        else {
          // querey logs immediately
          return _logs();
        }
      }
      if (global.paperspace_cli) {
        return cb();
      }
      return cb(null, { body: allLogs, line: params.line, eof: result.eof } );
  	});
  }

  return _logs();
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
