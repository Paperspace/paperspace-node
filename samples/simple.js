var paperspace_sdk = require('../../paperspace-sdk');

var paperspace = paperspace_sdk({
  apiKey: '1be4f985c4719029be7fbcc732cbda'
});

console.log('paperspace tempates list');

paperspace.templates.list(
  function(err, resp) {
    if (err) {
      console.log(resp.body);
      process.exit(1);
    }
    console.log(resp.body);

    var t_id = resp.body[5].id; // Ubuntu 16.04 Server

    console.log('paperspace machines create ... --templateId ' + t_id);

    paperspace.machines.create({
        region: 'East Coast (NY2)',
        machineType: 'C1',
        size: 50,
        billingType: 'hourly',
        machineName: 'My Machine',
        templateId: t_id,
      }, function(err, resp) {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        console.log(resp.body);

        var id = resp.body.id;

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

                     console.log('paperspace accounts script ... --machineId ' + id);

                     paperspace.accounts.script({
                         scriptName: "Test API Script 1",
                         scriptFile: "./simple.js",
                         scriptDescription: "A script description 1",
                         machineId: id,
                       }, function(err, resp) {
                         if (err) {
                           console.log(resp.body);
                           process.exit(1);
                         }
                         console.log(resp.body);

                         console.log('paperspace machines start --machineId ' + id);

                         paperspace.machines.start({
                             machineId: id,
                           }, function(err, resp) {
                             if (err) {
                               console.log(resp.body);
                               process.exit(1);
                             }
                             console.log(resp.body);

                             console.log('paperspace machines waitfor --machineId ' + id + ' --state ready');

                             paperspace.machines.waitfor({
                                 machineId: id,
                                 state: "ready",
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
          });
      });
  });
