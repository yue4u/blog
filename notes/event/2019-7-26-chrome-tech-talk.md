---
title: Chrome tech talk
date: 2019-07-26 23:44:57
---

## amp

> with `pual bakaus`

### blog

[blog.web.dev](https://blog.web.dev)

### questions

[sli.do](https://sli.do)

## productive web dev with amp

### Sticky tape problem

99% of time is to find it. 1% to use it.

### amp's mission

- accelerate dev workflows
- make doing right things easier

### amp in a nutshell

especially for searching / social / sharing referring sites.

amp is more like a service.

### target

- less code
- fast cache
- up to date dependency
- profromance
- workerized
- pwa

#### less code

`html framework` => a shift in dev

`amp` |> `js lib` |> `vanilla js`

> less fexible less complex

#### amp-analytics

keep connection => is wasting energy

do things better for cpu / battery

#### update every week

e2e test / auto test / bi-phase release cycle

#### web workers

muti cores && main thread issue

## new amp-script

all handled by amp-script

`await div.getBoundingClientBox()`

no interaction in the amp cahce.

server-side render without overhead.

- `amp optimizer`
- `amp-sw`

start fast; stay fast

[amp.cards](https://amp.cards)

`go.amp.dev/learn`

## amp-script

manipulate inside amp-script

Cannot use all javascript. Running in sandbox so cannnot use js funtions related to hardwire / permission

150 Kib before gzip(all files total)

### size file

`ls -lh dist/some.js`

cannot mutate html with out interaction => cannot ajax. Coding running will be stop if exceed 5s.(time for accessing server is exclued)

### tips

1. things can't use => find alternatives in amp
2. too difficult => use `amp-iframe`
3. webpack / parcel / rollup is necessary
4. production mode
5. no eval

### `example with jquery`

passed

## feature policies

speaker -> `kiuko`

- bit.ly/2Y3ZCHD
- theannoyingsite.com

1. http header Feature-Policy.
2. iframe allow.

document / frameElement featurePolicy

experiment-web-features only works on canary.

### headers can be set

- `unstable layout`
- `vertical-scroll`
- `unsized-media`
- `over-sized` img self(2.0) > oversized over 2

### production?

for production > report-only
google reverse pictures if not being optimzed inside company.

## 一休

amp + lp

`<amp-story/>`

tracking

`<amp-pixcel/>`

## ploymer japan

amp story live coding

```html
<amp-story />

<amp-story-page />

<amp-story-grid-layer />

<amp-img /> / <amp-video /> ...

<amp-story-bookend />
```

- 6 types of meta info
- 4 types of template

### full amp pros/cons

#### pros

- less components
- best practice
- good UX by default
- really need for SPA?
- using for a relative long time and without problems
- no need to think of state

#### cons

- amp valid html? |> end up making a lib
- is ket exists ...praser is not enough. want to use js/ts platform
- JSX/TSX compile to amp possiblity?

## faq

### 5G / better CPU => will amp be a overkill?

#### two types of performance

- network performance
- runtime performance

some sites are slow even using wifi |> cpu limit.
amp cares both.

### is amp performance to make complex site?

- unsuit for something like Gmail
- specialized to make contentful page/ not spa
- ec site && static ones

### why pual is here

- eccube conference

### recommed for amp site

- [aliexpress](https://www.aliexpress.com)
- [ikyu](https://www.ikyu.com/kankou/story0/)
- [bmw.com](https://www.bmw.com/en/index.html)
