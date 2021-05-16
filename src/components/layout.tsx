import React, { PropsWithChildren } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { useSpring, animated } from "react-spring"
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

  const props = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <>
      <Helmet htmlAttributes={{ lang: "ja" }}></Helmet>
      <div>
        <GlobalStyle />
        <Header siteTitle={data.site?.siteMetadata?.title} />
        <animated.main style={props}>{children}</animated.main>
      </div>
      <Footer />
    </>
  )
}
