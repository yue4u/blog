import styled from "styled-components"

export default styled.article`
  pre {
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
        color: yellowgreen;
      }

      .comment {
        color: #555;
      }

      .class-name {
        color: skyblue;
      }
    }
  }
`
