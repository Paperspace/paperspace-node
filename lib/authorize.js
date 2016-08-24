'use strict';

var client = require('./client');

var processEnv = (typeof process !== 'undefined') && process.env || {}

function tokenAuth(token, cb) {
  return cb(null, token);
}

function emailAuth(authEmail, authPassword, cache, cb) {
  return client('post', '/users/login', { email: authEmail, password: authPassword }, function clientCb(clientErr, clientResp) {
    if (clientErr) return cb(clientErr, clientResp);

    return cb(null, clientResp.body.id);
  });
}

function auth(authEmail, authPassword, token, cache, cb) {
  if (!authEmail) authEmail = processEnv.PAPERSPACE_AUTH_EMAIL;
  if (!authPassword) authPassword = processEnv.PAPERSPACE_AUTH_PASSWORD;
  if (!token) token = processEnv.PAPERSPACE_TOKEN;

  if (token) {
    cache.token = token;
  }
  else {
    token = cache.token;
  }

  if (token) return tokenAuth(token, cb);

  if (authEmail && authPassword) {
    return emailAuth(authEmail, authPassword, cache, cb);
  }

  return cb(new Error('Please provide authentication credentials'));
}

module.exports = auth;
