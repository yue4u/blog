import { useEffect } from "react"
import styled from "styled-components"
import React from "react"
import CodeBlock from "./codeBlock"

export default function MarkdownContent({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    window.addEventListener(
      "message",
      function (e) {
        // message passed can be accessed in "data" attribute of the event object
        const { bid, height } = e.data
        if (!bid) {
          return
        }
        const el = document.querySelector<HTMLIFrameElement>(`#${bid}`)
        if (el) {
          el.style.height = height + 30 + "px"
        }
      },
      false
    )
  }, [])

  return <MarkdownContentBlock>{children}</MarkdownContentBlock>
}

const MarkdownContentBlock = styled(CodeBlock)`
  & > * {
    max-width: 100%;
  }
  margin: 0 auto;
  padding-bottom: 1rem;
  text-align: left;
  max-width: 1000px;
  word-break: break-all;
  width: 90%;
  color: #ccc;
  font-family: "Fira Code";
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 3rem;
    color: #eee;
    position: relative;
    &::before {
      content: "○";
      position: absolute;
      color: #607d8b;
      top: 0;
      left: -1.5rem;
    }
  }

  h2 {
    &::before {
      content: "#";
    }
  }

  h3 {
    &::before {
      content: "◆";
    }
  }
  del {
    color: #555;
  }
  img {
    transition: 0.3s all ease-in-out;
    display: block;
    margin: 2rem auto;
    max-width: 100%;
    object-fit: contain;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
  a {
    position: relative;
    z-index: 1;
    &::after {
      transition: 0.3s all ease-in-out;
      content: " ";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #607d8b;
      left: 0;
      bottom: 0;
      z-index: -1;
    }
    &:hover {
      color: #fff;
      text-shadow: 0 0 3px #000;
      &::after {
        background-color: hotpink;
      }
    }
  }
  ul {
    list-style: disc;
    padding-left: 1rem;
  }
  table {
    margin: 3rem auto;
    border-collapse: collapse;
    th,
    tr,
    td {
      padding: 10px;
      border: 3px solid #333;
    }
  }
  blockquote {
    padding: 1rem;
    margin: 1rem 0;
    background-color: #333;
  }
  code {
    text-shadow: 0 0 5px #000;
    word-break: break-word;
    border-radius: 5px;
    margin: 5px 2px;
    display: inline-block;
    padding: 1px 5px;
    font-family: "Fira Code";
    background-image: linear-gradient(100deg, #455a64 47%, #757575);
  }
  iframe {
    width: 80%;
    margin: 0 auto;
    display: inherit;
  }
  @media screen and (max-width: 700px) {
    h2,
    h3,
    h4,
    h5,
    h6 {
      &::before {
        top: 0.2rem;
        font-size: 1rem;
        left: -1rem;
      }
    }
    iframe {
      max-width: 100%;
      width: 100%;
    }
  }
`
