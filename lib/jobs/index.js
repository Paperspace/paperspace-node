'use strict';

/**
 * @namespace jobs
 */

module.exports = {
	create: require('./create'),
	destroy: require('./destroy'),
	list: require('./list'),
	show: require('./show'),
	stop: require('./stop'),
	waitfor: require('./waitfor'),
};
