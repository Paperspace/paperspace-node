'use strict';

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

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
	if (!fs.existsSync(configDir)) mkdirp.sync(configDir);
	if (fs.existsSync(configDir) && fs.statSync(configDir).isDirectory()) {
		var configFileName = path.resolve(configDir, 'config.json');
		fs.writeFileSync(configFileName, JSON.stringify(config, null, 2) + '\n');
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
	} else if (config.container) {
		delete config.container
		write();
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
	} else if (config.machineType) {
		delete config.machineType
		write();
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
	} else if (config.command) {
		delete config.command
		write();
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
	} else if (config.workspace) {
		delete config.workspace
		write();
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
	} else if (config.dataset) {
		delete config.dataset
		write();
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
	} else if (config.name) {
		delete config.name
		write();
	}
}

function getCluster(project, cluster) {
	if (!project && !cluster) {
		read();
		return config.cluster;
	}
	return name;
}

function setCluster(project, cluster) {
	if (cluster) {
		if ((!project || config.project === project) && config.cluster !== cluster) {
			config.cluster = cluster;
			write();
		}
	} else if (config.cluster) {
		delete config.cluster
		write();
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
	getCluster: getCluster,
	setCluster: setCluster,
	clear: clear,
	show: show,
};
