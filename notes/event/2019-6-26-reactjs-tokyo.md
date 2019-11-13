---
title: ReactJS Tokyo 19-06-26
date: 2019-06-26 19:44:59
---

## About Mercari Frontend

[slide](https://speakerdeck.com/nullpoo/26)

- web
- item transaction page
- cs(Customer Support) tool

PHP => SPA

`Be Professional Day`

## Expo side React SSR

screen for printing

### pdf gen?

- paper-css

rendering in Expo without Lamda...etc.

performance on the low-end machine?

## Rakuten Travel with 20+ engineers

[slides](https://speakerdeck.com/taka66/large-react-product-with-20-plus-frontend-engineers-in-rakuten-travel)

### background

different service => different arch

How to globalize?

SPA => API Gateway => Microserive

|> made a full-stack framework

#### stub

- contract
- review
- UI Automation

|> as a contract

i18n translations file gen in build

### dev case study

- consumer
- admin
- ui
- framework
- other

#### UI

storybook 75+

##### issues?

- 2PR most of the time
- inject domain logic in component lib
- misunderstanding designer & engineer |> together

well-generalized |> not easy

#### Testing

- Jest
- Enzyme
- Cypress

snapshot not enough

Monolith / Micro

java => ? => future separation

#### Org

Feature => Performance => Fix => Feature

SLI/SLO target not clear

### relaibility

DX X UX

Measure => tool

- coverage
- complexity

=> build slow
=> parallelize

20 \* 3 |> 2h => .5h

run tests selectively

lighthouse

## User-centric TDD with react-testing-lib

[repo](https://github.com/testing-library/react-testing-library)

test case => Docs / TODOS / Evidence /etc.

Design Phase |> Dev Phase |> Test Phase |> Bug handling Phase

Jest CLI --json => to share

`it{.todo/.skip}()`

### tips

- NO TECH WORDS
- think what user cares

## reactjs.tokyo

[reactjs.tokyo](reactjs.tokyo)

[repo](https://github.com/jamesknelson/reactjs.tokyo)

## Nextjs / TypeScript renewal

KDDI -> mediba

Akamai CDN

- fight next.config.js
- performance need a second thought
