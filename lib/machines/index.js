'use strict';

/**
 * @namespace machines
 */

module.exports = {
	availability: require('./availability'),
	create: require('./create'),
	destroy: require('./destroy'),
	list: require('./list'),
	restart: require('./restart'),
	show: require('./show'),
	start: require('./start'),
	stop: require('./stop'),
	utilization: require('./utilization'),
	waitfor: require('./waitfor'),
};
