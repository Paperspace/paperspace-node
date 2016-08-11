'use strict';

/**
 * @namespace machines
 */

module.exports = {
  autoshutdown: require('./autoshutdown'),
  create: require('./create'),
  destroy: require('./destroy'),
  modify: require('./modify'),
  shutdown: require('./shutdown'),
  start: require('./start'),
  stop: require('./stop'),
  update: require('./update'),
};
