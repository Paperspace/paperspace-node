// Assumes you have installed the paperspace-node package globally.
// Use "require('../../paperspace-node')" if running from the repository tree.
var paperspace_node = require('paperspace-node');

// Set apkKey for use of the paperspace api
var paperspace = paperspace_node({
  apiKey: '1be4f97...' // Substitue your actual apiKey here
});

// Retrieve a list of all the templates as a json array
console.log('\npaperspace.scripts.create(...);');

paperspace.scripts.create({
    scriptName: 'Test Script',
    scriptDescription: 'scripts_create.js',
    machineId: 'ps123abc',
    //scriptFile: './my_script_file.sh',  // either scriptFile or scriptText is required
    scriptText: 'services start nginx16',
    isEnabled: true,
    runOnce: false
  }, function(err, resp) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(resp);
  });
