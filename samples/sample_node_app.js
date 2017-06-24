// Assumes you have installed the paperspace-node package globally.
// Use "require('../../paperspace-node')" if running from the repository tree.
var paperspace_node = require('../../paperspace-node');

// Set apkKey for use of the paperspace api
var paperspace = paperspace_node({
  apiKey: '1be4f97...' // Substitue your actual apiKey here
});

// Retrieve a list of all the templates as a json array
console.log('\npaperspace.tempates.list(...);');

paperspace.templates.list(
  function(err, resp) {
    if (err) {
      console.log(resp.body);
      process.exit(1);
    }
    console.log(resp.body);

    // Search the response body for a template with the label 'ML in a Box'
    var t_id;
    for(var i = 0; i < resp.body.length; i++) {
      if(resp.body[i].label === 'ML in a Box') {
        t_id = resp.body[i].id;
        break;
      }
    }
    if (!t_id) {
      console.log('Error: \'ML in a Box\' template not found.');
      process.exit(1);
    }

    // Create a machine using the found template id
    console.log('\npaperspace.machines.create({\n  region: \'East Coast (NY2)\',\n  machineType: \'GPU+\',');
    console.log('  size: 50,\n  billingType: \'hourly\',\n  machineName: \'Test Machine\',');
    console.log('  templateId: \'' + t_id + '\'}, ...);');

    paperspace.machines.create({
        region: 'East Coast (NY2)',
        machineType: 'GPU+',
        size: 50,
        billingType: 'hourly',
        machineName: 'Test Machine',
        templateId: t_id,
      }, function(err, resp) {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        console.log(resp.body);

        var id = resp.body.id;  // Extract the id of the newly created machine

        // Wait for machine to enter the 'ready' state
        console.log('\npaperspace.machines.waitfor({machineId: \'' + id + '\', state: \'ready\'}, ...);');

        paperspace.machines.waitfor({
            machineId: id,
            state: "ready",
          }, function(err, resp) {
            if (err) {
              console.log(err);
              process.exit(1);
            }
            console.log(resp.body);

            // Stop the machine
            console.log('\npaperspace.machines.stop({machineId: \'' + id + '\'}, ...);');

            paperspace.machines.stop({
                machineId: id,
              }, function(err, resp) {
                 if (err) {
                   console.log(resp.body);
                   process.exit(1);
                 }
                 console.log(resp.body);

                 // Wait for machine to enter the 'off' state
                 console.log('\npaperspace.machines.waitfor({machineId: \'' + id + '\', state: \'off\'}, ...);');

                 paperspace.machines.waitfor({
                     machineId: id,
                     state: "off",
                   }, function(err, resp) {
                     if (err) {
                       console.log(resp.body);
                       process.exit(1);
                     }
                     console.log(resp.body);

                     // Destroy the machine
                     console.log('\npaperspace.machines.destroy({machineId: \'' + id + '\'}, ...);');

                     paperspace.machines.destroy({
                         machineId: id,
                       }, function(err, resp) {
                         if (err) {
                           console.log(resp.body);
                           process.exit(1);
                         }
                         console.log(resp.body);

                         console.log('\ndone');
                      });
                  });
              });
          });
      });
  });
