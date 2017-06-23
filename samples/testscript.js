var paperspace_sdk = require('../../paperspace-sdk');
var superagent = require('superagent');

var paperspace = paperspace_sdk({
  apiKey: '1be4f985c4719029be7fbcc732cbda'
});

paperspace.accounts.script({
   scriptName: 'Tom Script 10',
   scriptFile: 'testshow.js',
   scriptDescription: 'Another script',
   machineId: 'pssiq341',
 }, function(err, resp) {
   if (err) {
     console.log(err);
     process.exit(1);
   }
   console.log(resp.body);
});
/*
superagent
  .post( 'http://localhost:3102/accounts/setStartupScript' )
  .set('x-api-key', '1be4f985c4719029be7fbcc732cbda')
  .accept('application/json')
  .query('scriptName=TomScript 9')
  .query('scriptDestription=Ascript')
  .query('machineId=psm0ircf')
  .attach('file', 'testscript.js')
  .end(function(err, res){
      if (err) {
        console.log(JSON.stringify(err));
        process.exit(1);
      }
      console.log(JSON.stringify(res));
  });*/
