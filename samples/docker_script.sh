#!/bin/bash

if [ -f /etc/firstrun ]; then
  echo already ran
else
  logger installing docker
  apt-get -y install apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
  add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  apt-get update
  apt-get -y install docker-ce
  touch /etc/firstrun
fi

docker run hello-world
