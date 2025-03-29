#!/bin/bash
echo "deploy script - v8"

# this script pulls the git repo and runs docker compose up, then waits for a healthy container

REPO_FOLDER=~/src
REPO_NAME=solvers
REPO_PATH=$REPO_FOLDER/$REPO_NAME
BE_PROJECT_PATH=$REPO_PATH/backend
DEPLOY_PATH=$BE_PROJECT_PATH/deploy
SCRIPTS_PATH=$BE_PROJECT_PATH/remote_scripts
REPO_URL=https://github.com/valault1/$REPO_NAME

echo "##### STEP 1: pull repo."
mkdir -p $REPO_FOLDER
cd $REPO_FOLDER
if [ ! -d "$REPO_PATH" ]; then echo "repo does not exist - cloning... " && git clone $REPO_URL; fi && 
cd $REPO_PATH
git pull 
# this sleep is just for the output to show up right
sleep 0.1s
echo "##### STEP 2: run deploy script." 

echo "running docker compose..."
# the compose.production only specifies the changes for the production version. 
docker compose  -f $DEPLOY_PATH/compose.yaml -f $DEPLOY_PATH/compose.production.yaml up -d --build

echo "Running health check..."
services=$(docker compose -f $DEPLOY_PATH/compose.yaml ps -q)
tries_left=10
for service_id in $services; do
  service_name=$(docker inspect --format '{{.Name}}' $service_id)
  status="$(docker inspect --format='{{json .State.Health.Status}}' $service_id)"
  echo "Waiting for $service_name to become healthy"
  echo "$tries_left attempts left. current status: $status"
  until [ "$status" = '"healthy"' ]  || [ "$tries_left" -eq 0 ]; do
    sleep 3
    tries_left=$((tries_left - 1))
    status="$(docker inspect --format='{{json .State.Health.Status}}' $service_id)"
    echo "$tries_left attempts left. current status: $status"

  done
  echo "current status: $status"
done

echo "\n\nDOCKER CONTAINER STATUS:"
docker ps