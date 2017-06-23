#!/bin/bash

PAPERSPACE_API_KEY=1be4f985c4719029be7fbcc732cbda

node ../bin/paperspace accounts script --scriptName "Tom CLI Test 0" \
  --scriptFile "./testcli.sh" --scriptDescription "A script 0"

node ../bin/paperspace machines list

node ../bin/paperspace networks list

node ../bin/paperspace templates list

node ../bin/paperspace users list

m_id=`node ../bin/paperspace machines create --machineName "Tom CLI Test 1" --billingType "hourly" \
  --region "East Coast (NY2)" --size 50 --machineType "C1" --templateId "tqalmii" | jq -r '.id'`

#m_id=psp8b3mo

node ../bin/paperspace machines waitfor --machineId "$m_id" --state "ready"
node ../bin/paperspace machines show --machineId "$m_id"

node ../bin/paperspace machines stop --machineId "$m_id"
node ../bin/paperspace machines waitfor --machineId "$m_id" --state "off"

node ../bin/paperspace machines start --machineId "$m_id"
node ../bin/paperspace machines waitfor --machineId "$m_id" --state "ready"

node ../bin/paperspace accounts script --scriptName "Tom CLI Test 1" \
  --scriptFile "./testcli.sh" --scriptDescription "A script 1" --machineId "$m_id"
node ../bin/paperspace machines restart --machineId "$m_id"
node ../bin/paperspace machines waitfor --machineId "$m_id" --state "ready"

#node ../bin/paperspace machines destroy --machineId "$m_id"
