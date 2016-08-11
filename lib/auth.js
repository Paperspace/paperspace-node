'use strict';

var client = require('./client');

function tokenAuth(token, cb) {

}

function emailAuth(email, password, cache, cb) {

}

function auth(email, password, token, cache, cb) {
  if (token) {
    cache.token = token;
  }
  else {
    token = cache.token;
  }

  if (token) return tokenAuth(token, cb);

  if (email && password) {
    return emailAuth(email, password, cache, cb);
  }

  return cb(new Error('Please provide authentication credentials'));
}

module.exports = auth;
