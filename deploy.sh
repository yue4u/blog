#!/usr/bin/env sh

set -e

yarn build

gsutil -m rsync -d -r public gs://blog.yue.coffee

git add -A

DATE=`date '+%Y-%m-%d %H:%M:%S'`

git commit -m "site-source update $DATE"
git push origin master