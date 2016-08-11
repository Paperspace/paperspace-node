'use strict';

var tape = require('tape');
var paperspace = require('./../lib/paperspace');

tape('paperspace-sdk', function(t) {
  t.plan(2);

  t.ok(paperspace, 'exports an object');

  t.ok(paperspace({
    token: 'abc123'
  }), 'returns an object');
});
