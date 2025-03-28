#!/bin/bash
# This script will be run from the root of the project, using `npm run deploy`.

REPO_FOLDER="~/src"
REPO_NAME=solvers
REPO_PATH=$REPO_FOLDER/$REPO_NAME
BE_PROJECT_PATH=$REPO_PATH/backend
RELATIVE_DEPLOY_PATH=/backend/deploy
DEPLOY_PATH=$REPO_PATH/deploy
SCRIPTS_PATH=$BE_PROJECT_PATH/remote_scripts
REPO_URL=https://github.com/valault1/$REPO_NAME

source ./$RELATIVE_DEPLOY_PATH/.deploy-script-env

git_script=$'
cd '$REPO_PATH' &&
git pull &&
# this sleep is just so the logs from the git pull are printed before the next logs &&
sleep 0.1s'


cmd=$'echo "##### STEP 1: pull repo." &&
mkdir -p '$REPO_FOLDER' &&
cd '$REPO_FOLDER' &&
if [ ! -d '$REPO_PATH' ]; then echo "repo does not exist - cloning... " && git clone '$REPO_URL'; fi && 
'$git_script' && 
echo "##### STEP 2: run deploy script." &&
export BE_PROJECT_PATH='$BE_PROJECT_PATH' &&
export DEPLOY_PATH='$DEPLOY_PATH' &&
export SCRIPTS_PATH='$SCRIPTS_PATH' &&
sh '$SCRIPTS_PATH'/main.sh'

#echo $cmd
# note: USERNAME and HOST_IP come from the .deploy-script-env file
ssh $USERNAME@$HOST_IP "$cmd"


