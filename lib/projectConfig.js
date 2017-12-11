'use strict';

var mkdirp = require('mkdirp');
var path = require('path');
var os = require('os');
var fs = require('fs');

var config = {};

function read() {
	var cwd = process.cwd();
	var configDir = path.resolve(cwd, '.ps_project');
	if (fs.existsSync(configDir) && fs.statSync(configDir).isDirectory()) {
		var configFileName = path.resolve(configDir, 'config.json');
		if (fs.existsSync(configFileName) && fs.statSync(configFileName).isFile()) {
			config = JSON.parse(fs.readFileSync(configFileName, 'utf8'));
		}
	}
}

function write() {
	var cwd = process.cwd();
	var configDir = path.resolve(cwd, '.ps_project');
	if (fs.existsSync(configDir) && fs.statSync(configDir).isDirectory()) {
		var configFileName = path.resolve(configDir, 'config.json');
		if (fs.existsSync(configFileName) && fs.statSync(configFileName).isFile()) {
			fs.writeFileSync(configFileName, JSON.stringify(config, null, 2) + '\n');
		}
	}
}

function getProject() {
	read();
	return config.project;
}

function getLastJobId(project, jobId) {
	if (!project && !jobId) {
		read();
		return config.lastJobId;
	}
	return jobId;
}

function setLastJobId(project, jobId) {
	if (jobId) {
		if ((!project || config.project === project) && config.lastJobId !== jobId) {
			config.lastJobId = jobId;
			write();
		}
	}
}


function removeLastJobId(jobId) {
	if (jobId) {
		read();
		if (config.lastJobId && config.lastJobId === jobId) {
			delete config.lastJobId;
			write();
		}
	}
}

function show() {
	read();
	return config;
}

module.exports = {
	getProject: getProject,
	getLastJobId: getLastJobId,
	setLastJobId: setLastJobId,
	removeLastJobId: removeLastJobId,
	show: show,
};
