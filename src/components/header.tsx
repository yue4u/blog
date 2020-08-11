import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { colors } from "../theme"

const GlobalHeader = styled.header`
  background: ${colors.black};
  box-shadow: 0 0 3px #000;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: #ccc;
  text-align: left;
  font-size: 1rem;
  padding: 0.5rem;
`

type HeaderProps = {
  siteTitle: string
}

const LeftCorner = styled.span``
const RightCorner = styled.span`
  & > a {
    margin: 0 10px;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
`
export default function Header({ siteTitle }: HeaderProps) {
  return (
    <GlobalHeader>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/tonsky/FiraCode@4/distr/fira_code.css"
        />
      </Helmet>
      <LeftCorner>
        <Link to="/">{siteTitle}</Link>
      </LeftCorner>
      <RightCorner>
        <Link to="/posts">Posts</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/aboutme">About</Link>
      </RightCorner>
    </GlobalHeader>
  )
}
