import React from "react"
import Link from "gatsby-link"
import styled from "styled-components"

export const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  margin: 4rem;

  a {
    margin: 1rem;
  }
  flex-wrap: wrap;
  align-items: baseline;
  @media screen and (max-width: 700px) {
    margin: 0;
    margin-bottom: 3rem;
    a {
      margin: 1rem 5px;
    }
  }
`
type PaginationLinkProps = {
  active?: any
}

export const PaginationLink = styled.span<PaginationLinkProps>`
  transition: 0.5s all cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => (props.active ? "#0 0 5px #000;" : "none")};
  background: ${props => (props.active ? "#333" : "none")};
  color: ${props => (props.active ? "none" : "#555")};
  border-radius: 5px;
  padding: 0.5rem;
  background-size: 200%, 150%;
  &:hover {
    background-color: ${props => (props.active ? "#e91e63" : "none")};
  }
`

const PaginationButton = ({ current, content }) => {
  const active = content == current
  const link = content === 1 ? `/posts/` : `/posts/${content}`
  return (
    <Link to={link}>
      {!active ? (
        <PaginationLink active>{content}</PaginationLink>
      ) : (
        <PaginationLink>{content}</PaginationLink>
      )}
    </Link>
  )
}

export default function Pagination({ pageContext }) {
  const { currentPage, numPages } = pageContext

  return (
    <PaginationNav>
      {Array.from({ length: numPages }, (_, i) => (
        <PaginationButton
          key={`page-${i}`}
          current={currentPage}
          content={i + 1}
        />
      ))}
    </PaginationNav>
  )
}
