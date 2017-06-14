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
   templateId: 'tiddssl', // xe_tempate 45, a public linux template, ml-in-a-box
   //templateId: 'tinjs77', // template 167, belonging to team 113 with admin 20 (Colin) -- a non-public template
   networkId: 'ndj60ob', // vlan record 52 (for team 101)
   teamId: 'te5miig6', // team 101 (AD Test team)
   userId: 'UIOJ2I5', // user 418, tom@paperspace.io
 }, function(err, resp) {
   if (err) {
     console.log(err);
     return;
   }
   console.log(resp.body);
});
