import React from "react"
import styled, { keyframes } from "styled-components"
import { animation } from "../../theme"

const PostTitle = styled.h3`
  transition: ${animation.fastIn};
  background-size: 200%, 150%;
  text-shadow: 0 0 5px #000;
  border-radius: 10px;
  box-shadow: 0 5px 3px #151515;
  cursor: pointer;
  padding: 0.3rem;
  padding-left: 0.8rem;
  background-image: linear-gradient(
    105deg,
    #333 calc(47% - 1px),
    #00bcd4 47%,
    #90a4ae
  );
  transform: rotate(2deg);
  &:hover {
    background-position: 100%, 5%;
  }

  position: relative;
  text-align: left;
  font-size: 1.4rem;
  margin-bottom: 0;
`

const PostContent = styled.div`
  z-index: 1;
  transition: 0.3s all ease-in-out;
  border-radius: 10px;
  background-color: #1d1d1d;
  padding: 5px 0 10px 0;
  position: relative;
  cursor: pointer;
`
const HashTagAnimation = keyframes`
    100% {
        transform: rotate(1turn);
    }
`

const HashTag = styled.span`
  padding: 0.3rem;
  font-size: inherit;
  position: absolute;
  display: block;
  visibility: hidden;
  text-shadow: none;
  background: radial-gradient(#e91e63, skyblue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ${PostTitle}:hover & {
    animation: ${HashTagAnimation} 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    visibility: visible;
  }
  left: -1.4rem;
  top: 0;
`

const PostBlock = styled.div`
  position: relative;
  margin: 2rem;
  @media screen and (max-width: 700px) {
    margin: 1rem;
  }
`

const Divider = styled.div`
  margin-top: 0.5rem;
  width: 80%;
  height: 1px;
  background-image: linear-gradient(60deg, skyblue, #9e9e9e);
`

const PostTime = styled.p`
  color: #757575;
  text-align: left;
  padding: 0;
  margin: 0;
`

const getDate = (date: any) => {
  return typeof date === "string" ? date.split("T")[0] : ""
}

export default function PostSummary({ detail }: any) {
  return (
    <PostBlock>
      <PostContent>
        <PostTitle>
          <HashTag>#</HashTag>
          {detail.title}
        </PostTitle>
        <Divider />
        <PostTime>{getDate(detail.date)}</PostTime>
      </PostContent>
    </PostBlock>
  )
}
