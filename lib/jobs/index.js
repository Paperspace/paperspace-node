'use strict';

/**
 * @namespace jobs
 */

module.exports = {
	artifactsDestroy: require('./artifactsDestroy'),
	aritfactsGet: require('./aritfactsGet'),
	aritfactsList: require('./aritfactsList'),
	aritfactsShare: require('./aritfactsShare'),
	create: require('./create'),
	destroy: require('./destroy'),
	list: require('./list'),
	logs: require('./logs'),
	show: require('./show'),
	stop: require('./stop'),
	waitfor: require('./waitfor'),
};
