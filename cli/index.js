'use strict';

// Native
var argv = require('yargs').argv;
var givenNamespace = argv._[0];
var givenName = argv._[1];

// Packages
var chalk = require('chalk');

// Ours
var paperspace = require('./../lib/paperspace');

var DEETS_NOTE = 'See https://paperspace.com/api for details';

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

	paperspace.eachEndpoint(function _each(namespace, name, method) {
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

if (!givenNamespace && !givenName) {
	console.log(`
    ${chalk.bold(`paperspace`)} <namespace> <command> [...flags]

    ${chalk.dim('Commands:')}

    ${methodHints()}

    ---
    ${chalk.dim(DEETS_NOTE)}
  `);

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
	console.error('No such command `' + givenNamespace + ' ' + givenName + '`');
	process.exit(1);
}

if (argv.help) {
	console.log(methodHint(foundMethod));
	process.exit();
}

function safeJSON(obj) {
	try {
		return JSON.stringify(obj, null, 2) + '\n';
	} catch (err) {
		console.error(err);
		return '{}';
	}
}

foundMethod.method(argv, function _methodCb(methodErr, methodResp) {
	if (methodErr) {
		process.stdout.write(
			safeJSON({
				error: methodErr.message,
				status: methodResp && methodResp.statusCode,
				response: methodResp && methodResp.body,
			})
		);

		process.exit(1);
	}

	process.stdout.write(safeJSON(methodResp.body || {}));
});
