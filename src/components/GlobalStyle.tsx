import { createGlobalStyle } from "styled-components"
import { colors } from "../theme"
export default createGlobalStyle`

@font-face {
  font-family: 'great-vibes-merge';
  unicode-range: U+0021-007A;
  src: url('/fonts/GreatVibes-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'noto-serif-sc';
  src: url('/fonts/NotoSerifSC-Regular.subset.woff2') format('woff2');
  unicode-range: U+3000-9FFF;
}
*{
  box-sizing: border-box;
  -ms-overflow-style: none; 
  scrollbar-width: none;
  ::selection {
    color: #fff;
    background: skyblue;
  }
}

::-webkit-scrollbar {
  display:none;
  width: 0px;
  background: transparent;
}

html,
body {
   font-family: sans-serif;
   text-align: center;
   font-size: 20px;
   color: ${colors.font};
   margin: 0;
   padding: 0;
   width: 100%;
   height: 100%;
   background-color: #1d1d1d;
}
ul {
   margin: 0;
   padding: 0;
   list-style: none;
}
a {
  color: inherit;
  text-decoration: none;
}
#___gatsby {
  width: 100%;
  min-height: 100%;
  display:flex;
  flex-direction: column;
  & > div{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
  }
}
main{
  padding-bottom:3rem;
}
`
