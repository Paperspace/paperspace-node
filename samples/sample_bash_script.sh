#!/bin/bash

# Note: this script requires the 'jq' tool for JSON parsing.  See https://stedolan.github.io/jq/

# Substitute your apiKey here
PAPERSPACE_API_KEY=1be4f97...

# List out all the templates
echo "paperspace templates list"
paperspace templates list

# Select the 6th template in the list  using the 'jq' tool
echo "selecting the 6th template id..."
t_id=`paperspace templates list | jq -r '.[5].id'`

# Create the machine and parse out the new machine id
echo "paperspace machines create ... --templateId $t_id"
m_id=`paperspace machines create --machineName "Test Machine" --billingType "hourly" \
  --region "East Coast (NY2)" --size 50 --machineType "C1" --templateId "$t_id" | jq -r '.id'`

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
