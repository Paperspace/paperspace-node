'use strict';

var configInfo = require('./config');
var request = require('./request');

var processEnv = (typeof process !== 'undefined') && process.env || {}
var nodeEnv = processEnv.NODE_ENV;
var config = configInfo[nodeEnv || 'development'];

// Simple wrapper over the request function that inserts a 'host' parameter
// as the first argument, since most use cases are always going to use the
// same host as provided via the baked-in config.
function client(method, path, inputs, cb) {
  var body = null;
  var query = {};
  var headers = {};
  var options = {};

  // Send input params as the query string if this is a GET, otherwise send
  // with the HTTP request body
  switch (method.toLowerCase()) {
    case 'get':
      query = inputs;
      break;

    default:
      query.access_token = inputs.access_token;
      delete inputs.access_token;
      body = inputs;
      break;
  }

  return request(config.host, method, path, body, query, headers, options, cb);
}

module.exports = client;
