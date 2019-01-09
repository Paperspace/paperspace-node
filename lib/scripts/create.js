'use strict';

var method = require('./../method');

/**
 * @memberof scripts
 * @method create
 * @description Creates a new startup script.  Optionally specify a machine to use this startup script.
 * For Linux machines the script should be a bash script.  For Windows machines the script should be a powershell script.
 * See the samples directory for sample startup scripts for Windows.  Note: script data is limited to 16KB per script.
 * See the [Script Guide]{@link https://paperspace.github.io/paperspace-node/scripts.md} for more info on using scripts.
 * @param {object} params - Script create parameters
 * @param {string} params.scriptName - A unique name for the script
 * @param {string} [params.scriptFile] - File path to a file containing the script data; either scriptFile or scriptText must be provide.
 * @param {string} [params.scriptText] - A string containing the script text; either scriptFile or scriptText must be provide.
 * @param {string} [params.scriptDescription] - Description of the script
 * @param {boolean} [params.isEnabled] - Determines if the script is enabled or not.  Defaults to true
 * @param {boolean} [params.runOnce] - Determines if the script is run on first boot or every boot.  Defaults to false
 * @param {string} [params.machineId] - Machine id of a machine that should execute this script at startup
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} script - The created script JSON object
 * @example
 * paperspace.scripts.create({
 *   scriptName: 'My Script',
 *   scriptFile: './my_script_file.sh', // must specify either scriptFile or scriptText
 *   scriptDescription: 'A startup script', // optional
 *   isEnabled: true, // optional
 *   runOnce: false, // optional
 *   machineId: 'ps123abc', // optional
 * }, function(err, res) {
 *   // handle error or result
 * });
 * @example
 * $ paperspace scripts create \
 *     --scriptName "My Script" \
 *     --scriptDescription "A startup script" \
 *     --scriptText "services start nginx" \
 *     --isEnabled true \
 *     --runOnce false \
 *     --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /scripts/createScript {"scriptName": "My Script", "scriptDescription": "A startup script", "isEnabled": true, "runOnce": false, "machineId": "ps123abc"}
 * x-api-key: 1ba4f98e7c0...
 * (file contents as multipart form data)
 * # Returns 200 on success
 * @example
 * // Example return value:
 * {
 *   "id": "sc123abc",
 *   "ownerType": "user",
 *   "ownerId": "u456def",
 *   "name": "My Script",
 *   "description": "my_script_file.sh",
 *   "dtCreated": "2017-06-15T19:22:13.507Z",
 *   "isEnabled": true,
 *   "runOnce": false
 * }
 */

function create(params, cb) {
	if (!params.scriptFile && !params.scriptText) return cb(new Error('Missing required parameter: either scriptFile or scriptText'));
	if (params.scriptFile && params.scriptText) return cb(new Error('Only one of scriptFile or scriptText allowed'));
	return method(create, params, cb);
}

Object.assign(create, {
	auth: true,
	group: 'scripts',
	name: 'create',
	method: 'post',
	route: '/scripts/createScript',
	requires: {
		scriptName: 'string',
	},
	file: 'scriptFile',
	returns: {},
});

module.exports = create;
