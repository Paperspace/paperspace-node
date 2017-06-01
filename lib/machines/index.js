'use strict';

/**
 * @namespace machines
 */

module.exports = {
	start: require('./start'),
	restart: require('./restart'),
	stop: require('./stop'),
	waitfor: require('./waitfor'),
};
