'use strict';

/**
 * @namespace jobs
 */

module.exports = {
	artifactsDestroy: require('./artifactsDestroy'),
	artifactsGet: require('./artifactsGet'),
	artifactsList: require('./artifactsList'),
	artifactsShare: require('./artifactsShare'),
	clone: require('./clone'),
	create: require('./create'),
	destroy: require('./destroy'),
	list: require('./list'),
	logs: require('./logs'),
	show: require('./show'),
	stop: require('./stop'),
	waitfor: require('./waitfor'),
};
