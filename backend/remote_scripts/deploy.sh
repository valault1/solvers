#!/bin/bash
echo "deploy script - v8"
# ok. This script is responsible for creating the docker container, and running it.

IMAGE_NAME=mtg-be-image
CONTAINER_NAME=mtg-be-container

echo "removing old container"
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

echo "building image..."
# build the docker image. Needs to be done in the main mtg directory.
# names it mtg-be
docker build -t $IMAGE_NAME -f Dockerfile.be .
echo "starting image..."
# -d runs in detached mode
# -p forwards <host port>:<container port>. 1213 is currently used.
# mtg-be is the name of the built container (specified above)
docker run -d --name $CONTAINER_NAME -p 8080:1213 $IMAGE_NAME



# todo: check if the container is running - something like this

echo "\n\nRUNNING HEALTH CHECK..."

INTERVAL=5
MAX_ATTEMPTS=3
attempt=1
sleep $INTERVAL
while [ $attempt -le $MAX_ATTEMPTS ]; do

  echo "ATTEMPT $attempt: Health check..."
  result=$(curl -sS localhost:8080/test)

  if [ -n "$result" ]; then
      echo "server is up!"
      break;
    else
      echo "server still down with error message: $result" 
      docker logs $CONTAINER_NAME
      sleep $INTERVAL
    
  fi
  attempt=$(( $attempt + 1 ))
done

if [ $attempt -gt $MAX_ATTEMPTS ]; then
  echo "server still down after $MAX_ATTEMPTS attempts"
  exit 1
fi

echo "\n\nDOCKER CONTAINER STATUS:"
docker ps


echo "Server successfuly started!"

# if you want to test this:
# curl 10.0.0.20:8080/getDecks

