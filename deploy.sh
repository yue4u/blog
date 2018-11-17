#!/usr/bin/env sh


set -e
rm -rf posts/.vuepress/dist

yarn build

cp -rf posts/.vuepress/dist .deploy

git add -A

DATE=`date '+%Y-%m-%d %H:%M:%S'`

git commit -m "site update $DATE"

git push git@github.com:rainy-me/rainy-me.github.io.git master

cd -

git add -A

DATE=`date '+%Y-%m-%d %H:%M:%S'`

git commit -m "site-source update $DATE"
