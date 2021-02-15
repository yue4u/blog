import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type Meta = {
  property: string
  content: string
}

type SEOProps = {
  path: string
  lang?: string
  meta?: Meta[]
  description?: string
  title?: string
  ogp?: string
}

const genDescription = (description: string) => {
  description = description
    .replace(/---[\s\S]*?---/g, "")
    .replace(/<[\s\S]*?>/g, "")
    .replace(/[`#]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\!\[\]\((.+?)\)/, "$1")
  description =
    description.length <= 160 ? description : description.substr(0, 160) + "..."
  return description.trim()
}

export function SEO({
  description = "",
  lang = "en",
  meta = [],
  title = "",
  ogp,
  path,
}: SEOProps) {
  const { site } = useStaticQuery(
    graphql`
      query SEOQuery {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const descriptionSource =
    genDescription(description) || title || site.siteMetadata.description
  const metaDescription = `blog of yue: ${descriptionSource}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: "og:image",
          content: ogp ?? "https://blog.yue.coffee/ogp/main.png",
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
      link={[{ rel: "canonical", href: `${site.siteMetadata.siteUrl}${path}` }]}
    />
  )
}
