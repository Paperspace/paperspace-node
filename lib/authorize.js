'use strict';

var client = require('./client');

var processEnv = (typeof process !== 'undefined') && process.env || {}

function apiKeyAuth(apiToken, cb) {
  // noop; Just forward the API key to the request handler
  return cb(null, null, apiToken); // HACK: Pass API token as second param
}

function accessTokenAuth(accessToken, cb) {
  // noop; Just forward the token to the request handler
  return cb(null, accessToken);
}

function emailAuth(authEmail, authPassword, cache, cb) {
  // If using email auth, we will hit an endpoint to sign them in, obtain
  // an access_token, and then use that for the request.
  var noHeaders = {};
  return client('post', '/users/login', { email: authEmail, password: authPassword }, noHeaders, function clientCb(clientErr, clientResp) {
    if (clientErr) return cb(clientErr, clientResp);
    return cb(null, clientResp.body.id);
  });
}

function authorize(authEmail, authPassword, accessToken, apiKey, cache, cb) {
  // The preferred way to authorize is via an actual api token
  if (!apiKey) apiKey = processEnv.PAPERSPACE_API_KEY;
  if (apiKey) cache.apiKey = apiKey;
  else apiKey = cache.apiKey;
  if (apiKey) return apiKeyAuth(apiKey, cb);

  // The user can also supply an actual access_token a.k.a. a jwt, for requests
  // Possibly worth adding a deprecation warning here.
  if (!accessToken) accessToken = processEnv.PAPERSPACE_TOKEN;
  if (accessToken) cache.accessToken = accessToken;
  else accessToken = cache.accessToken;
  if (accessToken) return accessTokenAuth(accessToken, cb);

  // Finally, they are also allowed to use their account credentials if they so desire
  // Possibly worth adding a deprecation warning here.
  if (!authEmail) authEmail = processEnv.PAPERSPACE_AUTH_EMAIL;
  if (!authPassword) authPassword = processEnv.PAPERSPACE_AUTH_PASSWORD;
  if (authEmail && authPassword) {
    return emailAuth(authEmail, authPassword, cache, cb);
  }

  // If none of the above are provided, we can't go forward at all
  return cb(new Error('Please provide authentication credentials'));
}

module.exports = authorize;
