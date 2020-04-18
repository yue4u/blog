import React from "react"
import styled from "styled-components"

import { Link } from "gatsby"
import { Layout, SEO, GradientFont } from "../components"

const Title404 = styled.h1`
  font-size: 6rem;
  margin-bottom: 1rem;
`
const BackHome = styled.span`
  margin-top: 0.5rem;
  display: inline-block;
  transition: 0.5s all cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 5px #000;
  background: #333;
  border-radius: 5px;
  padding: 0.5rem;
  background-size: 200%, 150%;
  &:hover {
    background-color: #e91e63;
  }
`
const NotFoundPage = () => (
  <Layout>
    <SEO title="404" path="/404" />
    <Title404>
      <GradientFont>404</GradientFont>
    </Title404>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <BackHome>
      <Link to="/">Back Home ></Link>
    </BackHome>
  </Layout>
)

export default NotFoundPage
