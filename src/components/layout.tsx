import React, { PropsWithChildren } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { Spring } from "react-spring/renderprops"
import { SiteTitleQueryQuery } from "@/types/gql"
import { Header } from "./header"
import { Footer } from "./footer"
import { GlobalStyle } from "./GlobalStyle"

export function Layout({ children }: PropsWithChildren<{}>) {
  const data = useStaticQuery<SiteTitleQueryQuery>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet htmlAttributes={{ lang: "ja" }}></Helmet>
      <div>
        <GlobalStyle />
        <Header siteTitle={data.site?.siteMetadata?.title} />

        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {(style) => <main style={style}>{children}</main>}
        </Spring>
      </div>
      <Footer />
    </>
  )
}
