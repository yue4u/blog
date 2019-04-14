import React from "react"
import styled from "styled-components"

export default styled.article`
  @import url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.206/distr/fira_code.css);

  pre {
    background-color: #333;
    padding: 1rem;
    font-size: 0.9rem;
    overflow: scroll;
    border-left: 3px solid cadetblue;
    text-align: left;
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
