// Assumes you have installed the paperspace-node package globally.
// Use "require('../../paperspace-node')" if running from the repository tree.
const paperspace_node = require('paperspace-node');

// Set apkKey for use of the paperspace api
const paperspace = paperspace_node({
  apiKey: process.env.PAPERSPACE_API_KEY // DON'T Substitute your actual apiKey here - use environment variables
});

const {
  promisify
} = require('util');


function logResponse(res) {
  console.log(res);
  return res;
}

(async function main() {

  // Retrieve a list of all the templates as a json array
  console.log('\npaperspace.tempates.list();');
  const templates = await promisify(paperspace.templates.list)();

  // Search the result for a template with the label 'Ubuntu 14.04 Server'
  // NOTE: to use the 'ML in a Box' template substitute 'ML in a Box' for 'Ubuntu 14.04 Server'
  // and substitute 'GPU+' or 'P5000' for the machineType value.  The 'C1' machineType is CPU-only.
  var t_label = 'Ubuntu 14.04 Server'; // or 'ML in a Box'
  var m_machineType = 'C1'; // or 'GPU+' or 'P5000' if choosing the 'ML in a Box' template

  const templateId = (templates.find(t => t.label === t_label) || {}).id

  if (!templateId) throw new Error(`Error: '${t_label}' template not found.`);

  const createMachineParams = {
    region: 'East Coast (NY2)',
    machineType: m_machineType,
    size: 50,
    billingType: 'hourly',
    machineName: 'Test Machine',
    templateId
  };

  console.log(`paperspace.machines.create(${JSON.stringify(createMachineParams)}`);
  const {
    id: machineId
  } = await promisify(paperspace.machines.create)(createMachineParams).then(logResponse);

  console.log(`paperspace.machines.waitfor({ machineId: ${machineId}, stateId: "ready" })`)
  await promisify(paperspace.machines.waitfor)({
    machineId,
    state: "ready",
  }).then(logResponse);

  console.log(`paperspace.machines.stop({ machineId: ${machineId} })`)
  await promisify(paperspace.machines.stop)({
    machineId
  }).then(logResponse);


  console.log(`paperspace.machines.destroy({ machineId: ${machineId} })`)
  await promisify(paperspace.machines.destroy)({
    machineId
  }).then(logResponse);

  console.log('done.')

})().catch(error => console.error(error))