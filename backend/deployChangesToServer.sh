#!/bin/bash
# This is a comment
# The script will print "Hello, world!" to the console
REPO_FOLDER="~/src"
REPO_NAME=solvers
REPO_PATH=$REPO_FOLDER/$REPO_NAME
BE_PROJECT_PATH=$REPO_PATH/backend
SCRIPTS_PATH=$BE_PROJECT_PATH/remote_scripts
REPO_URL=https://github.com/valault1/$REPO_NAME

source .deploy-script-env

git_script=$'
cd '$REPO_PATH' &&
git pull https://valault1:$(cat ~/.config/mtg-hub-token)@github.com/valault1/'$REPO_NAME' &&
# this sleep is just so the logs from the git pull are printed before the next logs &&
sleep 0.1s'

cmd=$'echo "##### STEP 1: pull repo." &&
mkdir -p '$REPO_FOLDER' &&
cd '$REPO_FOLDER' &&
if [ ! -d '$REPO_PATH' ]; then echo "repo does not exist - cloning... " && git clone '$REPO_URL'; fi && 
'$git_script' && 
echo "##### STEP 2: run deploy script." &&
cd '$BE_PROJECT_PATH'
sh '$SCRIPTS_PATH'/main.sh'

#echo $cmd
# note: USERNAME and HOST_IP come from the .deploy-script-env file
ssh $USERNAME@$HOST_IP "$cmd"


