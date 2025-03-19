echo "deploy script - v8"
# ok. This script is responsible for creating the docker container, and running it.

echo "removing old container"
docker stop mtg-be-container
docker rm mtg-be-container

echo "building image..."
# build the docker image. Needs to be done in the main mtg directory.
# names it mtg-be
docker build -t mtg-be-image -f Dockerfile.be .
echo "starting image..."
# -d runs in detached mode
# -p forwards <host port>:<container port>. 1213 is currently used.
# mtg-be is the name of the built container (specified above)
docker run -d --name mtg-be-container -p 8080:1213 mtg-be-image

docker ps

echo "done!"

# if you want to test this:
# curl 10.0.0.20:8080/getDecks

