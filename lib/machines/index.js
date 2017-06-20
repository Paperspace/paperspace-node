'use strict';

/**
 * @namespace machines
 */

module.exports = {
	create: require('./create'),
	destroy: require('./destroy'),
	list: require('./list'),
	restart: require('./restart'),
	show: require('./show'),
	start: require('./start'),
	stop: require('./stop'),
	waitfor: require('./waitfor'),
};
