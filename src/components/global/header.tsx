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

const LeftCorner = styled.span`
  @media screen and (max-width: 700px) {
    font-size: 10px;
    visibility: hidden;
  }
`
const RightCorner = styled.span`
  & > a {
    margin: 0 10px;
  }
`
export default function Header({ siteTitle }: HeaderProps) {
  return (
    <GlobalHeader>
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
