// Assumes you have installed the paperspace-node package globally.
// Use "require('../../paperspace-node')" if running from the repository tree.
var paperspace_node = require('paperspace-node');

var paperspace = paperspace_node({
  apiKey: '1be4f97...' // Substitue your actual apiKey here
});

console.log('paperspace tempates list');

paperspace.templates.list(
  function(err, resp) {
    if (err) {
      console.log(resp.body);
      process.exit(1);
    }
    console.log(resp.body);

    var t_id = resp.body[5].id; // e.g., the 6th template was os type 'Ubuntu 16.04 Server'

    console.log('paperspace machines create ... --templateId ' + t_id);

    paperspace.machines.create({
        region: 'East Coast (NY2)',
        machineType: 'C1',
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

        console.log('paperspace machines waitfor --machineId ' + id + ' --state ready');

        paperspace.machines.waitfor({
            machineId: id,
            state: "ready",
          }, function(err, resp) {
            if (err) {
              console.log(err);
              process.exit(1);
            }
            console.log(resp.body);

            console.log('paperspace machines stop --machineId ' + id);

            paperspace.machines.stop({
                machineId: id,
              }, function(err, resp) {
                 if (err) {
                   console.log(resp.body);
                   process.exit(1);
                 }
                 console.log(resp.body);

                 console.log('paperspace machines waitfor --machineId ' + id + ' --state off');

                 paperspace.machines.waitfor({
                     machineId: id,
                     state: "off",
                   }, function(err, resp) {
                     if (err) {
                       console.log(resp.body);
                       process.exit(1);
                     }
                     console.log(resp.body);

                     console.log('paperspace machines destroy --machineId ' + id);

                     paperspace.machines.destroy({
                         machineId: id,
                       }, function(err, resp) {
                         if (err) {
                           console.log(resp.body);
                           process.exit(1);
                         }
                         console.log(resp.body);

                         console.log('done');
                      });
                  });
              });
          });
      });
  });
