'use strict';

var method = require('./../method');
var assign = require('lodash.assign');
var mkdirp = require('mkdirp');
var path = require('path');
var os = require('os');
var fs = require('fs');

/**
 * @memberof project
 * @method init
 * @description Create a new Paperspace project.  A project is simply a directory or name for a set of related files and jobs.  If you do not init a particular name or directory job commands will be given a project name corresponding to the current directory name.
 * 'paperspace project init' creates a .ps_project/config.json file in the current directory to cache information about the project, such as the name, or the last job created.
 * @param {string} [params.project] - The name of the project.  If provided, this stored in the .ps_project/config.json file of the directory name.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} project
 * @example
 * paperspace.project.init({
 *   name: 'myproject',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace project init
 * @example
 * # Note: there is no HTTP request corresponding to 'paperspace project init'.
 * @example
 * // Example return value:
 * {
 *   "project": "myproject",
 * }
 */

function init(params, cb) {
	function ifCliPrintErrorOnly(err) {
		if (global.paperspace_cli) {
			console.log(err.message);
			return cb();
		}
		return cb(err);
	}

	var cwd = process.cwd();
	if (!params.name) {
		// default to name of project in .ps_project/config or name of current directory
		params.name = path.basename(cwd);
		if (params.name === '/') {
			return ifCliPrintErrorOnly(new Error('Error: cannot create project from root dir. Please create a project dir and run from there, or use the --name option.'));
		}
	}

	var config = { 'project': params.name };
	var configDir = path.resolve(cwd, '.ps_project');
	if (!fs.existsSync(configDir)) mkdirp.sync(configDir);
	else if (!fs.statSync(configDir).isDirectory()) {
		return ifCliPrintErrorOnly(new Error('Error: existing file with same name as .ps_project directory.'));
	}

	var configFileName = path.resolve(configDir, 'config.json');
	if (fs.existsSync(configFileName) && !fs.statSync(configFileName).isFile()) {
		return ifCliPrintErrorOnly(new Error('Error: config file not accessible: ' + configFileName));
	}

	fs.writeFileSync(configFileName, JSON.stringify(config, null, 2) + '\n');

	if (global.paperspace_cli) {
		console.log('Project name: ' + config.project);
		return cb();
	}
	return cb(null, config);
}

assign(init, {
	auth: false,
	group: 'project',
	name: 'init',
	method: 'post',
	route: '/projects/createProject',
	requires: {
	},
	returns: {},
});

module.exports = init;
