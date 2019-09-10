import React from "react"
import styled from "styled-components"

import { colors } from "../theme"

const GlobalFooter = styled.footer`
  font-size: 1rem;
  background-color: ${colors.black};
  box-shadow: 0 1px 3px #000;
  color: #fff;
  padding: 0.5rem;
`

export default function Footer() {
  return <GlobalFooter>© {new Date().getFullYear()}</GlobalFooter>
}
