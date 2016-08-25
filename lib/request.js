'use strict';

var qs = require('qs');
var superagent = require('superagent');

var FSLASH = '/';

function objectToQueryString(obj) {
  return qs.stringify(obj, { encode: false });
}

// General-purpose HTTP request method based on superagent
function request(host, method, path, params, query, headers, options, cb) {
  if (!options) options = {};

  // Remove leading/trailing slash from the path/host so that we can join
  // the two together no matter which way the user chose to provide them.

  if (path[0] === FSLASH) {
    path = path.slice(1);
  }

  if (host[host.length - 1] === FSLASH) {
    host = host.slice(0, host.length - 1);
  }

  var url = host + FSLASH + path;

  var req = superagent[method](url);

  if (!options.withoutCredentials) req.withCredentials();

  if (params) {
    delete params._
    delete params.$0
    req.send(params);
  }

  if (query) {
    delete query._
    delete query.$0
    req.query(objectToQueryString(query));
  }

  if (headers) {
    for (var headerKey in headers) {
      req.set(headerKey, headers[key]);
    }
  }

  return req.end(function _requestCallback(err, res) {
    if (cb) return cb(err, res);

    return res;
  });
}

module.exports = request;
