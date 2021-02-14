// @ts-check
"use strict"
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "esnext",
  },
})
const { config } = require("./gatsby/gatsby-config")

module.exports = config
