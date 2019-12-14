---
title: 2019-12-14-gdg-devfest
date: 2019-12-14 13:11:29
---

## [BigQuery](https://cloud.google.com/bigquery/)

[The 12 components of google bigquery](https://medium.com/google-cloud/the-12-components-of-google-bigquery-c2b49829a7c7)

contianer-based search

完全のSAAS

- Colossus
- Capacitor
- Poseidon

お互い影響しない

- [Avro](https://avro.apache.org/)
- [Dremel](https://ai.google/research/pubs/pub36632)
- [Brog](https://ai.google/research/pubs/pub43438)
- [SDN (jupiter)](https://www.sdxcentral.com/articles/news/google-brings-sdn-public-internet/2017/04/)

AI encrypted sensitive data row/table for dedicated user

11億行...

50+G << 2.6s

like operator performance << 5s

query along talking

[BQML](https://cloud.google.com/bigquery-ml/docs/)

[matrix factorization](https://en.wikipedia.org/wiki/Matrix_factorization_(recommender_systems))

also can import TF models

[GIS](https://www.esri.com/en-us/what-is-gis/overview)

GIS is [avaliable](https://cloud.google.com/bigquery/docs/gis-visualize)

[bigquery geo viz](https://bigquerygeoviz.appspot.com/)

## GCP 101: Getting started through Cloud Run

[cloud.run](cloud.run)

[knative](https://github.com/knative) + tutorials

default

- 80 reqs per instance
- 1000 containers

[gcr.io](gcr.io) <=> Google Container Registry

cloud run + firebase routing coexist

"run" servicID region...

=> k8s for further control

## what's new in firebase 2019

[bit.ly/what-is-firebase](bit.ly/what-is-firebase)

- syncing
- collectionGroup
- realtime usage dashboard
- list api
- automl vision edge => pack in app or download by user
- on-device translation api
- search issues
- real time events viewer
- remote config
- cloud messaging
- improved test results

?> google product search

image resizer
firebase extensions#explore

### testlab

VM and real models

Test sharding

ads or shops based on user

## developing in the dark

?? (edge cases && offline && multiple devices
&& storage && power && connectivity
&& understanding && perception && localization)

cost is different for different people

mobile first + only

orientations

app size matter

offline query && map

offline is not error nor bad

icons with texts
how to get back..

consider gender politics regions ...

! disabilities

build with the global audience in mind

mobile first => global first

## Flutter overview

[skia](https://github.com/google/skia)

Flutterが向いていない場合

- 少数画面機能特化
  > カメラ、動画、地図...
- ゲーム
  > ゲームフレームワークではない

FlutterはReact Nativeのようにplatform componentsを使うじゃなくて直接描画しているのでプラットフォーム間の差異が少ない