import { PropsWithChildren, useEffect } from "react"
import styled from "styled-components"
import React from "react"
import { CodeBlock } from "./codeBlock"

export function MarkdownContent({ children }: PropsWithChildren<{}>) {
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

export const MarkdownContentBlock = styled(CodeBlock)`
  & > * {
    max-width: 100%;
  }
  line-height: 1.5;
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
    color: #888;
    margin: 0 5px;
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
    display: inline-block;
    z-index: 1;
    transition: 0.2s all ease-in-out;
    text-decoration: underline;
    text-underline-offset: 5px;
    text-decoration-color: #607d8b;
    &::after {
      transition: 0.2s all ease-in-out;
      content: " ";
      margin: 2px 0;
      position: absolute;
      width: 100%;
      height: 0;
      bottom: 0;
      background-color: transparent;
      left: 0;
      z-index: -1;
    }
    &:hover {
      color: #fff;
      text-shadow: 0 0 3px #000;
      &::after {
        height: 100%;
        z-index: -1;
        background-color: #607d8b;
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
    border-left: 10px solid #455a64;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0 0 5px #000;
  }
  pre {
    code {
      &::after {
        background: none;
      }
    }
  }
  code {
    text-shadow: 1px 1px 4px #000;
    color: #fff;
    word-break: break-word;
    margin: 4px 4px;
    display: inline-block;
    padding: 0 5px;
    font-family: "Fira Code";
    position: relative;
    z-index: 0;
    &::after {
      transition: 0.2s all ease-in-out;
      content: "";
      border-radius: 5px;
      opacity: 0.8;
      z-index: -1;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(100deg, #ec407a 47%, #00bcd4);
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
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
