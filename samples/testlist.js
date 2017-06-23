var paperspace_sdk = require('../../paperspace-sdk');

var paperspace = paperspace_sdk({
  apiKey: '1be4f985c4719029be7fbcc732cbda'
});

paperspace.users.list(
  function(err, resp) {
   if (err) {
     console.log(err);
     process.exit(1);
   }
   console.log(resp.body);

   paperspace.users.list(
     function(err, resp) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log(resp.body);
   });
});
