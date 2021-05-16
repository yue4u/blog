import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Layout, SEO } from "../components"
import { animation, fonts } from "../theme"
import { useTransition, animated } from "react-spring"

const H1 = styled.h1`
  font-size: 6rem;
  margin-bottom: 2rem;
  padding: 1rem;
  font-family: ${fonts.title};
  filter: drop-shadow(0 0 3px #000);
  width: fit-content;
  display: inline-block;
  font-weight: normal;
  text-align: center;
  background: linear-gradient(180deg, skyblue, #e91e63);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  @media screen and (max-width: 700px) {
    font-size: 4rem;
  }
`
const Nav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: space-around;
  width: 80%;
  li {
    width: 60%;
  }
  @media screen and (max-width: 700px) {
    width: 90%;
    li {
      width: 90%;
    }
  }
`
const NavLink = styled.div`
  transition: ${animation.fastIn};
  background-size: 200%, 150%;
  background-image: linear-gradient(
    105deg,
    #333 calc(47% - 1px),
    #00bcd4 47%,
    #90a4ae
  );
  color: #fff;
  font-size: 1.4rem;
  border-radius: 10px;
  text-shadow: 0 0 5px #000;
  box-shadow: 0 5px 5px #000;
  cursor: pointer;
  padding: 0.3rem;
  margin: 0.5rem 0;
  a {
    width: 100%;
    display: block;
  }
  &:hover {
    transform: translateY(-3px);
    background-position: 100%, 5%;
  }
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`
const Callout = styled.blockquote`
  color: #fff;
  text-shadow: 0 0 3px #000;
`

export default function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" path="/" />
      <H1>Blog of yue</H1>
      <Callout>
        正しさ よりも 明るい場所を 見つけながら 走ればいいんだね。
      </Callout>
      <NavBlock />
    </Layout>
  )
}

const navList = [
  { label: "Posts", link: "/posts" },
  { label: "Notes", link: "/notes" },
] as const

function NavBlock() {
  const transitions = useTransition(navList, {
    keys: (nav) => nav.label,
    from: { opacity: 0, transform: "translateY(40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(40px)" },
  })

  return (
    <Nav>
      {transitions((style, nav) => (
        <animated.li style={style}>
          <NavLink>
            <Link to={nav.link}>{nav.label}</Link>
          </NavLink>
        </animated.li>
      ))}
    </Nav>
  )
}
