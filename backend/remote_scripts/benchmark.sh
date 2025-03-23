#!/bin/bash
BENCHMARK_PATH=~/benchmark
ARCHIVE_PATH=$BENCHMARK_PATH/archive
YABS_FILE=yabs.sh
ARCHIVE_JSON_FILE=$ARCHIVE_PATH/output_$(date +%Y-%m-%d_%H-%M-%S).json
MOST_RECENT_OUTPUT_FILE=results.txt
MOST_RECENT_JSON_FILE=results.json
SCRIPT_PATH=$(realpath "$0")
SCRIPT_NAME=benchmark.sh


mkdir -p $BENCHMARK_PATH
cd $BENCHMARK_PATH
ln -sf $SCRIPT_PATH $SCRIPT_NAME

if [ ! -e $YABS_FILE ]
then
    echo "fetching yabs file..."
    wget -q yabs.sh -O $YABS_FILE
fi

# write the file both to archive and to "results.txt"
mkdir -p $ARCHIVE_PATH
nohup bash yabs.sh -w $MOST_RECENT_JSON_FILE > $MOST_RECENT_OUTPUT_FILE && cp $MOST_RECENT_JSON_FILE $ARCHIVE_JSON_FILE &

#nohup ./long_operation.sh && cp /path/to/output /path/to/destination &