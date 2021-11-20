import React, { memo, useState } from "react"
import styled from "styled-components"
import { useSpring, animated, SpringValue } from "react-spring"

import { useMeasure, usePrevious } from "./helpers"
import * as Icons from "./icons"
import { Link } from "gatsby"
import { NotePageQueryQuery } from "@/types"

const Frame = styled.div`
  position: relative;
  padding: 4px 0px 0px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  vertical-align: middle;
  color: white;
  fill: white;
`

const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  font-size: 0.9rem;
  border-left: 1px dashed rgba(255, 255, 255, 0.4);
  overflow: hidden;
`

const toggle = {
  width: "1em",
  height: "1em",
  marginRight: 10,
  cursor: "pointer",
  verticalAlign: "middle",
}

type TreeProps = {
  children?: any
  name: string | JSX.Element
  style?: object
  open?: boolean
}

const TreeName = styled.span`
  color: #ccc;
  vertical-align: middle;
  a {
    display: table-cell;
    width: 100%;
    max-width: 10rem;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0.3s all ease-in-out;
    color: #fff;
    text-shadow: 0 0 5px #000;
    word-break: break-word;
    border-radius: 5px;
    padding: 1px 5px;
    background-color: #616161;
    &:hover {
      background-color: #0097a7;
    }
  }
`

const Tree = memo(({ children, name, style, open = false }: TreeProps) => {
  const [isOpen, setOpen] = useState(open)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
    },
  })
  const Icon =
    Icons[
      `${
        children ? (isOpen ? "Minus" : "Plus") : "Close"
      }SquareO` as keyof typeof Icons
    ]
  return (
    <Frame>
      <Icon
        style={{ ...toggle, opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <TreeName>{name}</TreeName>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height,
        }}
      >
        <animated.div style={{ transform }} {...bind}>
          {children}
        </animated.div>
      </Content>
    </Frame>
  )
})

const SideBarBlock = styled(animated.aside)`
  text-align: left;
  max-width: 25%;
  @media screen and (min-width: 700px) {
    opacity: 1 !important;
    visibility: visible !important;
  }
  @media screen and (max-width: 700px) {
    opacity: 0;
    visibility: hidden;
    left: 0;
    padding: 1rem;
    position: absolute;
    width: -webkit-fill-available;
    max-width: initial;
    z-index: 100;
    min-height: 100vh;
    background-color: #333;
    box-shadow: 0 0 1rem #000;
  }
`

const Line = styled.span`
  transition: 0.3s all ease-in-out;
  height: 0.5rem;
  width: 80%;
  border-bottom: 3px solid #607d8b;
`

const HamburgerWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0.3rem;
  right: 5px;
  height: 1.4rem;
  z-index: 50;
  display: none;
  width: 2rem;
  flex-direction: column;
  @media screen and (max-width: 700px) {
    display: inline-flex;
  }
`

export default function NoteList({
  data,
}: {
  data: NotePageQueryQuery["sideBar"]
}) {
  const [open, setOpen] = useState(false)
  const [props, set] = useSpring(() => ({
    visibility: "hidden",
    opacity: 0,
    transform: "translateY(1rem)",
  }))

  const toggleSideBar = () => {
    set({
      visibility: open ? "hidden" : "visible",
      opacity: open ? 0 : 1,
      transform: `translateY(${open ? "1rem" : "0"})`,
    })
    setOpen(!open)
  }
  return (
    <>
      <HamburgerWrapper onClick={toggleSideBar}>
        <Line />
        <Line />
        <Line />
      </HamburgerWrapper>
      {/* @ts-ignore */}
      <SideBarBlock style={props}>
        <Tree name="" open>
          {data.edges.map(({ node }, i) => (
            <Tree
              name={
                <Link to={`/${node.fields?.slug}`}>
                  {node.frontmatter?.title}
                </Link>
              }
              key={`node-${i}`}
            >
              {node.headings?.map((heading, i) => (
                <Tree name={heading?.value!} key={`heading-${i}`} />
              ))}
            </Tree>
          ))}
        </Tree>
      </SideBarBlock>
    </>
  )
}
