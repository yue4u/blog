import React, { PropsWithChildren } from "react"
import { useStaticQuery, graphql, Script } from "gatsby"
import { Helmet } from "react-helmet"
import { useSpring, animated } from "react-spring"
import { Header } from "./header"
import { Footer } from "./footer"
import { GlobalStyle } from "./GlobalStyle"

export function Layout({ children }: PropsWithChildren<{}>) {
  const data = useStaticQuery<Queries.SiteTitleQuery>(graphql`
    query SiteTitle {
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
      <Script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "47a0f5bfd51b4b2b947eae2b6a705d3f"}' />
    </>
  )
}
