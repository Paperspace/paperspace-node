'use strict';

var tape = require('tape');
var paperspace = require('./../lib/paperspace');

tape('paperspace-node', function(t) {
  t.plan(2);

  t.ok(paperspace, 'exports an object');

  t.ok(paperspace({
    apiKey: 'abc123'
  }), 'returns an object');
});
