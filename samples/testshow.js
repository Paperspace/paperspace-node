var paperspace_sdk = require('../../paperspace-sdk');

var paperspace = paperspace_sdk({
  apiKey: '1be4f985c4719029be7fbcc732cbda'
});

paperspace.machines.show({
   machineId: "pssiq341",
 }, function(err, resp) {
   if (err) {
     console.log(err);
     return;
   }
   console.log(resp.body);
});
