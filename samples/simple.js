var paperspace_sdk = require('../../paperspace-sdk');

var paperspace = paperspace_sdk({
  apiKey: '1be4f985c4719029be7fbcc732cbda'
});

paperspace.templates.list(
  function(err, resp) {
    if (err) {
      console.log(resp.body);
      process.exit(1);
    }
    console.log(resp.body);
  });

/*
paperspace.machines.create({
    region: 'East Coast (NY2)',
    machineType: 'C1',
    size: 50,
    billingType: 'hourly',
    machineName: 'My Machine',
    templateId: "tqalmii", // Ubuntu 16.04 Server
  }, function(err, resp) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(resp.body);
  });

paperspace.machines.waitfor({
    machineId: "ps123abc",
    state: "ready",
  }, function(err, resp) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(resp.body);
  });

paperspace.machines.list(
  function(err, resp) {
    if (err) {
      console.log(resp.body);
      process.exit(1);
    }
    console.log(resp.body);
  });
*/
/*
var id = "ps3osym0";

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

                 console.log('done');
              });
          });
      });
  });
*/

/*
paperspace.machines.destroy({
    machineId: "ps123abc",
  }, function(err, resp) {
    if (err) {
      console.log(resp.body);
      process.exit(1);
    }
    console.log(resp.body);
  });
*/
