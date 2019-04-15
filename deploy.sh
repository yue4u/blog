#!/usr/bin/env sh

set -e

rm -rf .deploy/*
yarn build

cd .deploy
git pull origin master

cp -rf ../public/* .

git add -A

DATE=`date '+%Y-%m-%d %H:%M:%S'`

git commit -m "site update $DATE"

git push origin master

cd ..

git add -A

DATE=`date '+%Y-%m-%d %H:%M:%S'`

git commit -m "site-source update $DATE"
git push origin master