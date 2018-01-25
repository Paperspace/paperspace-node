'use strict';

// set paperspace_cli to see if we are being run at the command line
// note: there are four typical entry points to the library: bin/paperspace, lib/paperspace.js, index.js, and lib/cli.js
if (!global.paperspace_cli) global.paperspace_cli = (require.main === module);

// Native
var argv = require('yargs').argv;

// Convert arg values that look boolean to boolean
for (var arg in argv) {
	if (arg !== '$0' && typeof argv[arg] === 'string') {
		var val = argv[arg];
		if (val === 'true' || argv[arg] === 'false') {
			argv[arg] = (val === 'true');
		}
	}
}

var givenNamespace = argv._[0];
var givenName = argv._[1];
if (givenNamespace === 'login') givenName = 'user';
if (givenNamespace === 'logout') givenName = 'user';

// Packages
var chalk = require('chalk');
var pkginfo = require('pkginfo')(module, 'version'); // eslint-disable-line no-unused-vars

// Ours
var paperspace = require('./../lib/paperspace');

var DEETS_NOTE = 'See https://paperspace.github.io/paperspace-node for details';

function methodHint(spec) {
	return [
		'Usage:',
		'  paperspace ' + spec.method.group + ' ' + spec.name,
		'',
		DEETS_NOTE,
	].join('\n');
}

function methodHints() {
	var namespaces = {};

	paperspace.eachEndpoint(function _each(namespace, name, method) { // eslint-disable-line no-unused-vars
		if (!namespaces[namespace]) namespaces[namespace] = [];
		namespaces[namespace].push(name);
	});

	var hints = '';

	for (var namespace in namespaces) {
		hints += '\t  ' + namespace + '\n';

		var names = namespaces[namespace];

		names.forEach(function(name) {
			hints += '\t    ' + name + '\n';
		});
	}

	return hints;
}

function versionStr() {
	return 'paperspace cli ' + module.exports.version;
}
if (givenNamespace === 'version' || ((argv.version === true || argv.v === true)) && givenNamespace === undefined) {
	console.log(versionStr());
	process.exit();
}

if (!givenNamespace && !givenName) {
	console.log(versionStr());
	console.log();
	console.log('    ' + chalk.bold('paperspace') + ' <namespace> <command> [...flags]');
	console.log();
	console.log('    ' + chalk.dim('Commands:'));
	console.log();
	console.log('    ' + methodHints());
	console.log();
	console.log('    ---');
	console.log('    ' + chalk.dim(DEETS_NOTE));
	console.log('');

	process.exit();
}

var foundMethod;

paperspace.eachEndpoint(function _each(namespace, name, method) {
	if (namespace === givenNamespace && name == givenName) {
		foundMethod = {
			namespace: namespace,
			name: name,
			method: method,
		};
	}
});

if (!foundMethod) {
	if (givenName === undefined) console.error('No such namespace: `' + givenNamespace + '`');
	else console.error('No such command: `' + givenNamespace + ' ' + givenName + '`');
	process.exit(1);
}

if (argv.help && givenNamespace !== 'login') {
	console.log(methodHint(foundMethod));
	process.exit(1);
}

function safeJSON(obj) {
	try {
		if (obj instanceof Error) return JSON.stringify(obj, Object.getOwnPropertyNames(obj), 2) + '\n';
		else return JSON.stringify(obj, null, 2) + '\n';
	} catch (err) {
		console.error(err);
		return '{}';
	}
}

foundMethod.method(argv, function _methodCb(methodErr, methodResp) {
	if (methodErr) {
		var errorSummary = {
			error: methodErr.response && methodErr.response.body && (methodErr.response.body.error && methodErr.response.body.error.message || methodErr.response.body.message) || methodErr.error || methodErr.message,
			status: methodErr.response && methodErr.response.body && (methodErr.response.body.error && methodErr.response.body.error.status || methodErr.response.body.status) || methodErr.response && methodErr.response.statusCode || methodErr.status,
		};
		if (!global.paperspace_cli) errorSummary.response = methodErr.response;

		if (methodResp === 'nojson') process.stdout.write('Error: ' + errorSummary.error + '\n');
		else process.stdout.write(safeJSON(errorSummary));

		process.exit(1);
	}

	if (methodResp != null)	process.stdout.write(safeJSON(methodResp || {})); // null means suppress output here
});
