'use strict';

var client = require('./client');
var Route = require('route-parser');

// This function takes an 'endpointSpec' (an object with properties that describe the
// HTTP endpoint we are going to hit), a 'methodParams' (an object that contains all
// of the params we want to send to that endpoint), and a Node-style callback function,
// and executes the respective request to that endpoint.
//
// An 'endpointSpec' looks like this:
//   {
//     group: 'foo',
//     name: 'bar',
//     method: 'post',
//     route: '/baz/qux',
//     requires: {
//       hello: String,
//       there: String,
//     },
//     returns: {}
//   }
//
// And part of this method's responsibility is to convert this into a URL and request
// parameters that can be sent into the 'client' function.
function method(endpointSpec, methodParams, cb) {
  // Check if any required parameters are missing, or of the wrong type
  if (endpointSpec.requires) {
    for (var requiredKey in endpointSpec.requires) {
      var requiredType = endpointSpec.requires[requiredKey];
      var givenParam = methodParams[requiredKey];

      if (givenParam === void(0) || givenParam === null) {
        return cb(new Error('Missing required parameter `' + requiredKey + '`'));
      }

      if (typeof givenParam !== requiredType) {
        return cb(new Error('Parameter `' + requiredKey + '` expected to be a ' + requiredType));
      }
    }
  }

  // Generate a URL path by substituting route segments with their values
  var route = new Route(endpointSpec.route);
  var path = route.reverse(methodParams);
  var method = endpointSpec.method;

  return client(method, path, methodParams, cb);
}
