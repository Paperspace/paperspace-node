'use strict';

var path = require('path');
var fs = require('fs');
var os = require('os');
var mkdirp = require('mkdirp');

var config = {};

function read() {
	var configDir = path.resolve(os.homedir(), '.paperspace');
	if (fs.existsSync(configDir) && fs.statSync(configDir).isDirectory()) {
		var configFileName = path.resolve(configDir, 'config.json');
		if (fs.existsSync(configFileName) && fs.statSync(configFileName).isFile()) {
			config = JSON.parse(fs.readFileSync(configFileName, 'utf8'));
		}
	}
}

function write() {
	var configDir = path.resolve(os.homedir(), '.paperspace');
	if (!fs.existsSync(configDir)) mkdirp.sync(configDir);
	if (fs.existsSync(configDir) && fs.statSync(configDir).isDirectory()) {
		var configFileName = path.resolve(configDir, 'config.json');
		fs.writeFileSync(configFileName, JSON.stringify(config, null, 2) + '\n');
	}
}

function getApiKey() {
	read();
	return config.apiKey;
}

function getName() {
	read();
	return config.name;
}

function setApiKey(apiKey, name) {
	if (apiKey) {
		if (config.apiKey !== apiKey || config.name !== name) {
			config.apiKey = apiKey;
			config.name = name;
			write();
		}
	}
}

function clear() {
	config = {};
	write();
}

module.exports = {
	getApiKey: getApiKey,
	getName: getName,
	setApiKey: setApiKey,
	clear: clear,
};

