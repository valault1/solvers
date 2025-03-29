#!/bin/bash
echo "deploy script - v8"
# This script is responsible for creating the docker container, and running it.
# It will use docker compose. 

# BE_PROJECT_PATH is defined in deploChangesToServer.sh
cd $BE_PROJECT_PATH


IMAGE_NAME=solvers-be-image
CONTAINER_NAME=solvers-be-container

# echo "removing old container"
# docker stop $CONTAINER_NAME
# docker rm $CONTAINER_NAME

#echo "building image..."
# build the docker image. $DEPLOY_PATH is defined in deployChangesToServer.sh
#docker build -t $IMAGE_NAME -f $DEPLOY_PATH/Dockerfile.be .

# -d runs in detached mode
# -p forwards <host port>:<container port>. 1213 is currently used.
# docker run -d --name $CONTAINER_NAME -p 8080:1213 $IMAGE_NAME

echo "running docker compose..."
# the compose.production only specifies the changes for the production version. 
docker compose  -f $DEPLOY_PATH/compose.yaml -f $DEPLOY_PATH/compose.production.yaml up -d --build

echo "making sure it's healthy before quitting..."
services=$(docker compose -f $DEPLOY_PATH/compose.yaml ps -q)
echo "checking services: $services"
tries_left=10
for service_id in $services; do
  echo "checking $service_id"
  service_name=$(docker inspect --format '{{.Name}}' $service_id)
  status="$(docker inspect --format='{{json .State.Health.Status}}' $service_id)"
  echo "current status of $service_name: $status"
  until [ "$status" = '"healthy"' ]; do
    echo "Waiting for $service_name to become healthy - $((tries_left--)) tries left"
    sleep 3
  done
  echo "$service_name is healthy"
done

# todo: check if the container is running - something like this

echo "\n\nDOCKER CONTAINER STATUS:"
docker ps


echo "Server successfuly started!"

# if you want to test this:
# curl 10.0.0.20:8080/getDecks

