var paperspace_sdk = require('../../paperspace-sdk');

var paperspace = paperspace_sdk({
  apiKey: 'eecdfa3766ec2e0f0a2303ca8bddef'
});

paperspace.machines.destroy({
   machineId: "WJD655",
 }, function(err, resp) {
   if (err) {
     console.log(err);
     return;
   }
   console.log(resp.body);
});
