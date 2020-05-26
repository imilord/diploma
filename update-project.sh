#!/usr/bin/env bash
git pull
pm2 reload all
npm run build --prefix ./frontend/