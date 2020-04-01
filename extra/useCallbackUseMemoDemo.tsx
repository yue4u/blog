import React, { memo, useMemo, useState, useCallback } from "react"
import styled from "styled-components"

const Button = styled.button<{ color: string; colorHover: string }>`
  padding: 3px 10px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${props => props.color};
  border: 0;
  border-radius: 5px;
  &:hover {
    background-color: ${props => props.colorHover};
  }
`

const ChildBlock = styled.div`
  margin: 20px 0;
  & > * {
    margin: 0 10px;
  }
`

const Child = ({
  index,
  decrease,
}: {
  index: number
  decrease: () => void
}) => {
  const [state, setState] = useState(0)
  console.log(`${index} rerender`)
  return (
    <ChildBlock>
      <p>
        Child-{index}: {state}
      </p>
      <Button color="hotpink" colorHover="pink" onClick={decrease}>
        parent -
      </Button>
      <Button
        color="skyblue"
        colorHover="cyan"
        onClick={() => setState(state + 1)}
      >
        child +
      </Button>
    </ChildBlock>
  )
}

const MemoizedChild = memo(Child)

const DemoBlock = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  text-align: center;
`
const Title = styled.p``

export default function Parent() {
  const [count, setCount] = useState(0)
  const increase = () => setCount(count => count + 1)
  const decrease = () => setCount(count => count - 1)
  const decreaseCallback = useCallback(() => decrease(), [])

  const UseMemoChild1 = useMemo(() => <Child index={5} decrease={decrease} />, [
    decrease,
  ])
  const UseMemoChild2 = useMemo(
    () => <Child index={6} decrease={decreaseCallback} />,
    [decreaseCallback]
  )

  return (
    <DemoBlock>
      <Title>Parent: {count}</Title>
      <Button color="hotpink" colorHover="pink" onClick={increase}>
        parent +
      </Button>
      <Child index={1} decrease={decrease} />
      <Child index={2} decrease={decreaseCallback} />
      <MemoizedChild index={3} decrease={decrease} />
      <MemoizedChild index={4} decrease={decreaseCallback} />
      {UseMemoChild1}
      {UseMemoChild2}
    </DemoBlock>
  )
}
