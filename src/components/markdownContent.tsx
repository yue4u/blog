import styled from "styled-components"
import CodeBlock from "./codeBlock"

export default styled(CodeBlock)`
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
    margin: 0 auto;
    max-width: 100%;
    object-fit: contain;
    opacity: 0.6;
    &:hover {
      opacity: 0.9;
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
    margin: 1rem;
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
    background-color: #333;
  }
  code {
    text-shadow: 0 0 5px #000;
    word-break: break-word;
    border-radius: 5px;
    margin: 0 2px;
    padding: 1px 5px;
    font-family: "Fira Code";
    background-image: linear-gradient(100deg, #455a64 47%, #757575);
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
  }
`
