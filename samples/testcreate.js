var paperspace_sdk = require('../../paperspace-sdk');

var paperspace = paperspace_sdk({
  apiKey: '1be4f985c4719029be7fbcc732cbda'
});

paperspace.machines.create({
   region: 'East Coast (NY2)',
   machineType: 'C1',
   size: 50,
   billingType: 'hourly',
   machineName: 'Test API 7',
   templateId: 'tqalmii',
 }, function(err, resp) {
   if (err) {
     console.log(err);
     process.exit(1);
   }
   console.log(resp.body);
});
