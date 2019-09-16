import React from "react"
import { createGlobalStyle } from "styled-components"
import { StaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { Spring } from "react-spring/renderprops"

import Header from "./header"
import Footer from "./footer"
import { colors } from "../theme"

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'great-vibes-merge';
  unicode-range: U+0021-007A;
  src: url('/fonts/GreatVibes-Regular.woff2') format('woff2');
}
*{
  ::-webkit-scrollbar{
    display:none;
  }
}
html,
body {
   font-family: sans-serif;
   text-align: center;
   font-size: 20px;
   color: ${colors.font};
   margin: 0;
   padding: 0;
   width: 100%;
   height: 100%;
   background-color: #1d1d1d;
}
ul {
   margin: 0;
   padding: 0;
   list-style: none;
}
a {
  color: inherit;
  text-decoration: none;
}
#___gatsby {
  width: 100%;
  min-height: 100%;
  display:flex;
  flex-direction: column;
  & > div{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
  }
}
main{
  padding-bottom:3rem;
}
`

export default function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet htmlAttributes={{ lang: "ja" }}>
            <link
              rel="preload"
              as="font"
              type="font/woff2"
              crossorigin="anonymous"
              href="/fonts/GreatVibes-Regular.woff2"
            />
          </Helmet>
          <div>
            <GlobalStyle />
            <Header siteTitle={data.site.siteMetadata.title} />

            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {style => <main style={style}>{children}</main>}
            </Spring>
          </div>
          <Footer />
        </>
      )}
    />
  )
}
