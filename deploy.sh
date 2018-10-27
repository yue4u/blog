#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
rm -rf posts/.vuepress/dist
# 生成静态文件
yarn build

# 进入生成的文件夹
cd posts/.vuepress/dist

# 如果是发布到自定义域名
echo 'blog.rainy.me' > CNAME

git init
git add -A

DATE=`date '+%Y-%m-%d %H:%M:%S'`

git commit -m "site update $DATE"

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:rainy-me/rainy-me.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -