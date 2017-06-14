var paperspace_sdk = require('../../paperspace-sdk');

var paperspace = paperspace_sdk({
  apiKey: 'eecdfa3766ec2e0f0a2303ca8bddef'
});

paperspace.machines.create({
   region: 'East Coast (NY2)',
   machineType: 'Air',
   size: 50,
   billingType: 'hourly',
   machineName: 'My Machine 6',
   userId: 418,
 }, function(err, resp) {
   if (err) {
     console.log(err);
     return;
   }
   console.log(resp.body);
});
