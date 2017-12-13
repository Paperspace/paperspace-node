// Assumes you have installed the paperspace-node package globally.
// Use "require('../../paperspace-node')" if running from the repository tree.
var paperspace_node = require('paperspace-node');

// Set apkKey for use of the paperspace api
var paperspace = paperspace_node({
  apiKey: '1be4f97...' // Substitue your actual apiKey here
});

// Retrieve a list of all the templates as a json array
console.log('\npaperspace.jobs.create(...);');

// Create a machine using the found template id, and the specified machine typ from above
console.log('\npaperspace.jobs.create({\n  name: \'mytestjob\',\n  machineType: \'GPU+\',');
console.log('  container: \'Test-Container\'}, ...);');

paperspace.jobs.create({
    name: 'mytestjob',
    machineType: 'GPU+',
    container: 'Test-Container',
    workspace: '~/myproject3',
    command: './do.sh',
  }, function(err, resp) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(resp.body);

    var id = resp.body.id;  // Extract the id of the newly created job

    // Wait for job to enter the 'Stopped' state
    console.log('\npaperspace.jobs.waitfor({jobId: \'' + id + '\', state: \'Stopped\'}, ...);');

    paperspace.jobs.waitfor({
        jobId: id,
        state: 'Stopped',
      }, function(err, resp) {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        console.log(resp.body);

        console.log('\npaperspace.jobs.logs({jobId: \'' + id + '\'}, ...);');

        paperspace.jobs.logs({
            jobId: id,
          },
          function(err, resp) {
            if (err) {
              console.log(err);
              process.exit(1);
            }
            console.log(resp.body);
            console.log(resp.line);
            console.log(resp.eof);

            console.log('\npaperspace.jobs.artifactsList({jobId: \'' + id + '\'}, ...);');

            paperspace.jobs.artifactsList({
                jobId: id,
                size: true,
              }, function(err, resp) {
                if (err) {
                  console.log(err);
                  process.exit(1);
                }
                console.log(resp.body);

                console.log('\npaperspace.jobs.artifactsGet({jobId: \'' + id + '\'}, ...);');

                paperspace.jobs.artifactsGet({
                    jobId: id,
                  }, function(err, resp) {
                    if (err) {
                      console.log('err: ' + err);
                      process.exit(1);
                    }
                    console.log(resp);

                    console.log('done');
                });
            });
        });
    });
});
