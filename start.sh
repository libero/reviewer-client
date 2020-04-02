#!/bin/sh

tmux new-window -n "deps"

tmux send-keys "cd ../reviewer-mocks; yarn && yarn start:dev" Enter
tmux split-window
tmux send-keys "yarn && yarn start:dev" Enter

tmux select-layout tiled
