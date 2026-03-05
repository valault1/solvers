#!/bin/bash
# This script will be run from the root of the project, using `npm run deploy`.

source ./backend/deploy/.deploy-script-env
# note: USERNAME and HOST_IP come from the .deploy-script-env file
ssh $USERNAME@$HOST_IP "$(cat ./backend/remote_scripts/deploy.sh)"


