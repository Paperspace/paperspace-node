'use strict';

/**
 * @namespace machines
 */

module.exports = {
	create: require('./create'),
	list: require('./list'),
	start: require('./start'),
	restart: require('./restart'),
	stop: require('./stop'),
	waitfor: require('./waitfor'),
};
