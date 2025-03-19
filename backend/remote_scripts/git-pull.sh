echo "pulling git repo..."
cd ~/src/mtg
git pull https://valault1:$(cat ~/.config/mtg-hub-token)@github.com/valault1/mtg
# this sleep is just so the logs from the git pull are printed before the next logs
sleep 0.1s


