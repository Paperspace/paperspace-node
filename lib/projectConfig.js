'use strict';

var path = require('path');
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

function clear() {
	read();
	var project = config.project;
	config = { project: project };
	write();
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

function getContainer(project, container) {
	if (!project && !container) {
		read();
		return config.container;
	}
	return container;
}

function setContainer(project, container) {
	if (container) {
		if ((!project || config.project === project) && config.container !== container) {
			config.container = container;
			write();
		}
	}
}

function getMachineType(project, machineType) {
	if (!project && !machineType) {
		read();
		return config.machineType;
	}
	return machineType;
}

function setMachineType(project, machineType) {
	if (machineType) {
		if ((!project || config.project === project) && config.machineType !== machineType) {
			config.machineType = machineType;
			write();
		}
	}
}

function getCommand(project, command) {
	if (!project && !command) {
		read();
		return config.command;
	}
	return command;
}

function setCommand(project, command) {
	if (command) {
		if ((!project || config.project === project) && config.command !== command) {
			config.command = command;
			write();
		}
	}
}

function getWorkspace(project, workspace) {
	if (!project && !workspace) {
		read();
		return config.workspace;
	}
	return workspace;
}

function setWorkspace(project, workspace) {
	if (workspace) {
		if ((!project || config.project === project) && config.workspace !== workspace) {
			config.workspace = workspace;
			write();
		}
	}
}

function getDataset(project, dataset) {
	if (!project && !dataset) {
		read();
		return config.dataset;
	}
	return dataset;
}

function setDataset(project, dataset) {
	if (dataset) {
		if ((!project || config.project === project) && config.dataset !== dataset) {
			config.dataset = dataset;
			write();
		}
	}
}

function getName(project, name) {
	if (!project && !name) {
		read();
		return config.name;
	}
	return name;
}

function setName(project, name) {
	if (name) {
		if ((!project || config.project === project) && config.name !== name) {
			config.name = name;
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
	getContainer: getContainer,
	setContainer: setContainer,
	getMachineType: getMachineType,
	setMachineType: setMachineType,
	getCommand: getCommand,
	setCommand: setCommand,
	getDataset: getDataset,
	setDataset: setDataset,
	getWorkspace: getWorkspace,
	setWorkspace: setWorkspace,
	getName: getName,
	setName: setName,
	clear: clear,
	show: show,
};
