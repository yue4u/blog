import React, {
  useState,
  useEffect,
  createContext,
  type FC,
  useContext,
  type PropsWithChildren,
} from "react"
import styled from "styled-components"

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  min-height: 8rem;
`
const StyledItem = styled.li`
  text-align: center;
  width: 10%;
  height: 1.5rem;
  background-color: #333;
  box-shadow: 0 0 5px #000;
  margin: 1rem;
  padding: 5px 10px;
  list-style: none;
`
export const ItemsContext = createContext<number[]>([])

export const ItemsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [items, setItems] = useState<number[]>([])

  useEffect(() => {
    if (items.length >= 12) return
    setTimeout(() => {
      setItems([...items, items.length + 1])
    }, Math.random() * 1000)
  }, [items])

  return <ItemsContext.Provider value={items}>{children}</ItemsContext.Provider>
}

function Sync() {}

type Item1Props = {
  time: number
}

Sync.Item1 = ({ time }: Item1Props) => {
  const [_time, setTime] = useState(time)

  useEffect(() => {
    const id = setTimeout(() => {
      setTime((_time + 1) % 60)
    }, 1000)
    return () => clearTimeout(id)
  }, [_time])

  return <StyledItem>{_time}</StyledItem>
}

Sync.List1 = () => {
  const items = useContext(ItemsContext)
  return (
    <ItemsProvider>
      <StyledList>
        {items.map(time => (
          <Sync.Item1 key={`i-${time}`} time={time} />
        ))}
      </StyledList>
    </ItemsProvider>
  )
}

type ExampleProps = {
  List: FC
}

Sync.Example = ({ List }: ExampleProps) => {
  return (
    <ItemsProvider>
      <List />
    </ItemsProvider>
  )
}
Sync.Item2 = ({ time, parentTime }: Item2Props) => {
  return <StyledItem>{parentTime + time}</StyledItem>
}

Sync.List2 = () => {
  const items = useContext(ItemsContext)

  const [_time, setTime] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => {
      setTime((_time + 1) % 60)
    }, 1000)
    return () => clearTimeout(id)
  }, [_time])

  return (
    <ItemsProvider>
      <StyledList>
        {items.map(time => (
          <Sync.Item2 key={`i-${time}`} time={time} parentTime={_time} />
        ))}
      </StyledList>
    </ItemsProvider>
  )
}

type Item2Props = {
  time: number
  parentTime: number
}
type Item3Props = Item1Props

Sync.Item3 = ({ time }: Item3Props) => {
  const [_time, setTime] = useState(time)

  useEffect(() => {
    const start = performance.now()

    const now = new Date()
    let delta =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds() + 1,
        0
      ).getTime() - now.getTime()
    const end = performance.now()

    const id = setTimeout(() => {
      setTime((_time + 1) % 60)
    }, delta - end + start)
    return () => clearTimeout(id)
  }, [_time])

  return <StyledItem>{_time}</StyledItem>
}

Sync.List3 = () => {
  const items = useContext(ItemsContext)

  return (
    <ItemsProvider>
      <StyledList>
        {items.map(time => (
          <Sync.Item3 key={`i-${time}`} time={time} />
        ))}
      </StyledList>
    </ItemsProvider>
  )
}

Sync.Example1 = () => <Sync.Example List={Sync.List1} />
Sync.Example2 = () => <Sync.Example List={Sync.List2} />
Sync.Example3 = () => <Sync.Example List={Sync.List3} />

export default Sync
