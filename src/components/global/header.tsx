import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { colors } from "../../theme"

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
const RightCorner = styled.span`
  & > a {
    margin: 0 10px;
  }
`
export default function Header({ siteTitle }: HeaderProps) {
  return (
    <GlobalHeader>
      <Link to="/">{siteTitle}</Link>

      <RightCorner>
        <Link to="/posts">Posts</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/aboutme">About Me</Link>
      </RightCorner>
    </GlobalHeader>
  )
}
