'use strict';

/**
 * @namespace jobs
 */

module.exports = {
	artifactsDestroy: require('./artifactsDestroy'),
	artifactsGet: require('./artifactsGet'),
	artifactsList: require('./artifactsList'),
	clone: require('./clone'),
	create: require('./create'),
	destroy: require('./destroy'),
	list: require('./list'),
	logs: require('./logs'),
	machineTypes: require('./machineTypes'),
	show: require('./show'),
	stop: require('./stop'),
	waitfor: require('./waitfor'),
};
