import { type GatsbyConfig } from "gatsby"
import packageInfo from "./package.json"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `浅色圆锥曲线爱好者`,
    description: packageInfo.description,
    author: `yue`,
    theme_color: "#333333",
    siteUrl: "https://blog.yue.coffee/",
  },
  plugins: [
    `gatsby-plugin-pnpm`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: __dirname,
        ignore: [
          `**/\.*`,
          `**/.git/**/*`,
          `**/.cache/**/*`,
          `**/.deploy/**/*`,
          `**/public/**/*`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              showCaptions: true,
              quality: 80,
              srcSetBreakpoints: [500],
            },
          },
          {
            resolve: "gatsby-remark-shiki-twoslash",
            options: {
              theme: "github-dark",
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `浅色圆锥曲线爱好者`,
        short_name: `blog`,
        start_url: `/`,
        background_color: `#1d1d1d`,
        theme_color: `#333333`,
        display: `standalone`,
        icon: `static/eon.jpg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}

export default config;
