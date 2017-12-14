// Assumes you have installed the paperspace-node package globally.
// Use "require('../../paperspace-node')" if running from the repository tree.
var paperspace_node = require('paperspace-node');

// Set apkKey for use of the paperspace api
var paperspace = paperspace_node({
  apiKey: '1be4f97...' // Substitue your actual apiKey here
});

// Retrieve a list of all the templates as a json array
console.log('\npaperspace.tempates.list(...);');

paperspace.templates.list(
  function(err, resp) {
    if (err) {
      console.log(resp);
      process.exit(1);
    }
    console.log(resp);

    // Search the response body for a template with the label 'Ubuntu 14.04 Server'
    // NOTE: to use the 'ML in a Box' template substitute 'ML in a Box' for 'Ubuntu 14.04 Server'
    // and substitute 'GPU+' or 'P5000' for the machineType value.  The 'C1' machineType is CPU-only.
    var t_label = 'Ubuntu 14.04 Server'; // or 'ML in a Box'
    var m_machineType = 'C1'; // or 'GPU+' or 'P5000' if choosing the 'ML in a Box' template

    var t_id;
    for(var i = 0; i < resp.length; i++) {
      if(resp[i].label === t_label) {
        t_id = resp[i].id;
        break;
      }
    }
    if (!t_id) {
      console.log('Error: \'' + t_label + '\' template not found.');
      process.exit(1);
    }

    // Create a machine using the found template id, and the specified machine typ from above
    console.log('\npaperspace.machines.create({\n  region: \'East Coast (NY2)\',\n  machineType: \'' + m_machineType + '\',');
    console.log('  size: 50,\n  billingType: \'hourly\',\n  machineName: \'Test Machine\',');
    console.log('  templateId: \'' + t_id + '\'}, ...);');

    paperspace.machines.create({
        region: 'East Coast (NY2)',
        machineType: m_machineType,
        size: 50,
        billingType: 'hourly',
        machineName: 'Test Machine',
        templateId: t_id,
      }, function(err, resp) {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        console.log(resp);

        var id = resp.id;  // Extract the id of the newly created machine

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
            console.log(resp);

            // Stop the machine
            console.log('\npaperspace.machines.stop({machineId: \'' + id + '\'}, ...);');

            paperspace.machines.stop({
                machineId: id,
              }, function(err, resp) {
                 if (err) {
                   console.log(resp);
                   process.exit(1);
                 }
                 console.log(resp);

                 // Wait for machine to enter the 'off' state
                 console.log('\npaperspace.machines.waitfor({machineId: \'' + id + '\', state: \'off\'}, ...);');

                 paperspace.machines.waitfor({
                     machineId: id,
                     state: "off",
                   }, function(err, resp) {
                     if (err) {
                       console.log(resp);
                       process.exit(1);
                     }
                     console.log(resp);

                     // Destroy the machine
                     console.log('\npaperspace.machines.destroy({machineId: \'' + id + '\'}, ...);');

                     paperspace.machines.destroy({
                         machineId: id,
                       }, function(err, resp) {
                         if (err) {
                           console.log(resp);
                           process.exit(1);
                         }
                         console.log(resp);

                         console.log('\ndone');
                      });
                  });
              });
          });
      });
  });
