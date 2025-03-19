#!/bin/bash

#ok. This script will be executed on the server.
# first, pull the git repo. Then execute the real deploy script.
# (this makes sure that the deploy script is up to date before it is run).

#echo "SCRIPT NOT IMPLEMENTED YET"

echo "in the main script!"



echo "##### step 3: run deploy script."
sh remote_scripts/deploy.sh
