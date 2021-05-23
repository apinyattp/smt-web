#!/bin/bash
#to init => pm2 deploy production setup
echo Please input commit description
read commit_desc
git add ./ 
git commit -m "$commit_desc"
git push
pm2 deploy ecosystem.json production
