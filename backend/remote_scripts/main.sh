#!/bin/bash

# This script is executed on the server. 
# It's triggered by npm run deploy -> deploy/deployChangesToServer.sh
# Previous to this step, that other script pulled the repo
# (this makes sure that the deploy script is up to date before it is run).
# it is run from the backend folder. 

echo "##### step 3: run deploy script."
# DEPLOY_PATH is defined in deployChangesToServer.sh
sh $DEPLOY_PATH/deploy.sh
