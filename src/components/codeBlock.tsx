import styled from "styled-components"

export const CodeBlock = styled.article`
  pre {
    ::-webkit-scrollbar {
      display: none;
      width: 0px;
      background: transparent;
    }

    background-color: #333;
    padding: 1rem;
    font-size: 0.9rem;
    overflow: scroll;
    text-align: left;
    border: 0;
    box-shadow: 0 0 10px #111;
    border-radius: 10px;
    code {
      font-family: "Fira Code";
      background: none;
      text-shadow: none;
      a {
        text-decoration: underline;
        text-underline-offset: 1px;
        &:hover {
          color: #000;
          background: skyblue;
        }
      }
      .keyword {
        color: hotpink;
      }

      .punctuation {
        color: skyblue;
      }

      .tag {
        color: hotpink;
      }
      .builtin {
        color: mediumpurple;
      }
      .operator {
        color: hotpink;
      }
      .function {
        color: #ffd54f;
      }

      .constant {
        color: mediumpurple;
      }

      .parameter {
        color: #fb8c00;
      }

      .string {
        color: #8bc34a;
      }

      .comment {
        color: #888;
      }

      .class-name {
        color: skyblue;
      }
    }
  }
`
