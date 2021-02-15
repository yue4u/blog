// @ts-check
"use strict"
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "esnext",
  },
})
const {
  onCreateNode,
  onCreateWebpackConfig,
  createPages,
  onPreBuild,
} = require("./gatsby/gatsby-node")

exports.onCreateNode = onCreateNode
exports.onCreateWebpackConfig = onCreateWebpackConfig
exports.createPages = createPages
exports.onPreBuild = onPreBuild
// 