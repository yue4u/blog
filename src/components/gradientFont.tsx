import styled from "styled-components"
import { fonts } from "../theme"

export const GradientFont = styled.span`
  font-size: inherit;
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
