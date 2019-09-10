import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { animation } from "../../theme"

const CourseItem = styled.div`
  transition: ${animation.fastIn};
  position: relative;
  box-shadow: 1px 1px 1rem #000;
  padding: 10px;
  padding-bottom: 3rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  height: 6rem;
  transition: ${animation.fastIn};
  background-size: 200%, 150%;
  background-image: linear-gradient(
    100deg,
    #333 calc(47% - 1px),
    #00bcd4 47%,
    #90a4ae
  );
  border-radius: 10px;
  text-shadow: 0 0 5px #000;
  cursor: pointer;
  a {
    width: 100%;
    height: 100%;
    display: block;
  }
  &:hover {
    transform: translateY(-3px);
    background-position: 100%, 5%;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`
const CourseDetail = styled.div`
  position: absolute;
  height: 2rem;
  bottom: 0;
  left: 1rem;
`
export default function Course({ node }: any) {
  const { name, modifiedTime } = node
  const date = modifiedTime.split("T")[0]
  return (
    <CourseItem>
      <Link to={`/notes/${name}`}>
        <div>
          <h2>{node.fields.courseTitle}</h2>
        </div>

        <CourseDetail>
          <time>{date}</time>
        </CourseDetail>
      </Link>
    </CourseItem>
  )
}
