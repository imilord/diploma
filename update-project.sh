#!/usr/bin/env bash
git stash
git pull
pm2 reload all
npm run build --prefix ./frontend/