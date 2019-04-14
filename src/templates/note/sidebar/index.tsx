import React, { memo, useState } from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import { useMeasure, usePrevious } from "./helpers"
import * as Icons from "./icons"
import { Link } from "gatsby"

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

type TreeSpringProps = {
  height: number
  opacity: number
  transform: string
}

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
  }) as TreeSpringProps
  const Icon =
    Icons[`${children ? (isOpen ? "Minus" : "Plus") : "Close"}SquareO`]
  return (
    <Frame>
      <Icon
        style={{ ...toggle, opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <span style={{ verticalAlign: "middle", ...style }}>{name}</span>
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

const SideBarBlock = styled.aside`
  text-align: left;
`

export default function SideBar({data}: any) {
  return (
    <SideBarBlock>
      <Tree name={""} open={true}>
        {data.edges.map(({ node }, i) => (
          <Tree
            name={<Link to={node.fields.slug}>{node.frontmatter.title}</Link>}
            key={`node-${i}`}
          >
            {node.headings.map((heading, i) => (
              <Tree name={heading.value} key={`heading-${i}`} />
            ))}
          </Tree>
        ))}
      </Tree>
    </SideBarBlock>
  )
}
