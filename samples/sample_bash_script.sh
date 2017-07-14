#!/bin/bash

# Note: this script requires the 'jq' tool for JSON parsing.  See https://stedolan.github.io/jq/
# To install jq run 'sudo apt-get install jq'

# Substitute your apiKey here
export PAPERSPACE_API_KEY=1be4f97...

# List out all the templates
echo "paperspace templates list"
paperspace templates list

# Select the first template with a label of "Ubuntu 14.04 Server", using the 'jq' tool
# NOTE: to use the "ML in a Box" template change "Ubuntu 14.04 Server" to "ML in a Box"
t_label="Ubuntu 14.04 Server"
echo "Finding a template with label \"$t_label\" ..."
t_id=`paperspace templates list | jq -r --arg t "$t_label" '.[] | select(.label==$t) | .id'`
echo "Found template id \"$t_id\""

# Create a machine and parse out the new machine id
# NOTE: to create a machine from the "ML in a Box" template use "GPU+" or "P5000" instead of "C1"
m_machineType="C1"
echo "paperspace machines create --machineName \"Test Machine\" \\"
echo " --billingType \"hourly\" --region \"East Coast (NY2)\" --size 50 \\"
echo " --machineType \"$m_machineType\" --templateId \"$t_id\""

m_id=`paperspace machines create --machineName "Test Machine" --billingType "hourly" \
  --region "East Coast (NY2)" --size 50 --machineType "$m_machineType" --templateId "$t_id" | jq -r '.id'`
echo "Created machine with machine id $m_id"

echo "paperspace machines waitfor --machineId $m_id --state ready"
paperspace machines waitfor --machineId "$m_id" --state "ready"

echo "paperspace machines show --machineId $m_id"
paperspace machines show --machineId "$m_id"

echo "paperspace machines stop --machineId $m_id"
paperspace machines stop --machineId "$m_id"

echo "paperspace machines waitfor --machineId $m_id --state ready"
paperspace machines waitfor --machineId "$m_id" --state "off"

echo "paperspace machines destroy --machineId $m_id"
paperspace machines destroy --machineId "$m_id"

echo "done"
