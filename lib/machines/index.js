'use strict';

/**
 * @namespace machines
 */

module.exports = {
	show: require('./show'),
	start: require('./start'),
	restart: require('./restart'),
	stop: require('./stop'),
	waitfor: require('./waitfor'),
};
