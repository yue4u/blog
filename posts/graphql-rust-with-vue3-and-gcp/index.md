---
title: "Graphql Rust + Vue3\n ~gcpにDeployするまで~"
date: 2021-02-16 04:35:40
tags:
  - rust
  - graphql
  - vue3
  - GCP
---

2020 年最後の学期で Web 演習の授業を取りました。授業概要として、5 人くらいでチームを組み、役割分担しつつクライエント(指導教員)から新規サイト作成の要望を聞き、デザインからデプロイまでを行う授業です。

普段やらないことをやってみたいという考えのもと、~~チームメンバーの都合で、~~私はバックエンド・インフラ・イベント画面・管理画面を担当して、[偉大なる yama 先生](https://twitter.com/_kwxxw)はトップページのコーディングをやってくれました。

`Repository` => [https://github.com/rainy-me/tsukiyo](https://github.com/rainy-me/tsukiyo)

![サイトイメージ](./tsukiyo-ogp.png)

## 技術選定のプロセス

技術スタックやインフラの選択も提案のうち**自由**ということなので、最近試したかったけど試せなかったものを積み合わせました。

いろんなものを試すことが目的なので、最終的な技術スタックはかなりマニアックの結果になりました。

### フロントエンド

[yama 先生](https://twitter.com/_kwxxw)も[`Vue3`](https://v3.ja.vuejs.org)+[`vite`](https://vitejs.dev)の構成でやりたかったらしいので、フロントエンドの framework としてそれらを採用しました。css の pre processor として[`scss`](https://sass-lang.com)を入れましたが、途中で[`tailwind`](https://tailwindcss.com)も試したくなったので、実際プロジェクト内で`scss`はほとんど使われていません。また、フロントエンド開発のベースラインとして [`TypeScript`](https://www.typescriptlang.org)を使用しました。

### バックエンド

私は最初から[`rust`](https://www.rust-lang.org)で書きたいのと、`sql`データベース上で`graphql`レイヤーを作るという縛りでやりたかったので、`ORM`としての[`diesel`](http://diesel.rs)と graphql ライブラリーの[`juniper`](https://github.com/graphql-rust/juniper)を採用しました。全体の web framework は[`actix`](https://actix.rs)に載せました。

### 開発環境

複数人同時開発なので、[`docker-compose`](https://www.docker.com)で構築しました。

### インフラ

インフラ選択の初期に`VPS`を借りてやるか、`cloud vendor`を利用するのかについて結構悩みました。クライアントから記事の画像を貰ってアップロードし反映したいのと、できればコストを抑えたいという要望がありました。その上大量のアクセスが来ないという想定なので、`Pay as you go`の`cloud vendor`なら無料枠で済ませるという算段でした。

私達のチームは`rust`という相対的にマイナーな言語を選択したので、デプロイするには`Cloud Run`が一番手軽です。さらに、`CI/CD`の構成や自動 revision は`VPS`より楽です。以上を踏まえ、インフラは`GCP`を選択しました。

- [Cloud Storage](https://cloud.google.com/storage) フロントエンド hosting 用
- [Cloud Run](https://cloud.google.com/run)

また、`Cloud Run`のために`Container Registry`も合わせて使用しました。管理画面から backend を経由せず直接アプロードできるという利点があるので、`Identity Platform`を authentication の手段として採用しました。

- [Container Registry](https://cloud.google.com/container-registry)
- [Identity Platform](https://cloud.google.com/identity-platform)

`CI/CD`の pipeline は`github actions`を採用しました。最初に`Cloud Build`を使ってみましたが、一番安いランタイムのパフォーマンスが非常に悪く、~~当時の build 用の Dockerfile に問題もあったけれど~~、10 分のビルドタイムですらアウトしたので、`github actions`に移行しました。

![gcp cloud build timeout](./gcp-cloud-build-timeout.jpg)

## 遭遇した問題と振り返り

### フロントエンド

フロントエンドは計 11 ページで、サイトマップは以下のような感じです。

|     | path                | ページ         | 実装した機能                                    |
| --- | ------------------- | -------------- | ----------------------------------------------- |
| 1   | /                   | LP             | デザイン通りの coding                           |
| 2   | /contact            | Contact        | contact を作成する                              |
| 3   | /contact/success    | ContactSuccess | contact 送信成功の表示                          |
| 4   | /event              | Event          | 公開している event 一覧                         |
| 5   | /event/:id_or_slug  | EventItem      | id か slug からイベントを表示する               |
| 6   | /admin              | Admin          | admin トップページ                              |
| 7   | /admin/login        | Login          | login 機能                                      |
| 8   | /admin/contact-list | ContactList    | 送られた contact 一覧                           |
| 9   | /admin/event-editor | EventEditor    | - 新規イベントの作成 <br/> - 既存イベントの更新 |
| 10  | /admin/event-list   | EventList      | すべての event 一覧                             |
| 11  | /\*                 | 404            | 　                                              |

![イベント作成画面](./tsukiyo_admin_create_event.png)

#### `vue3`、`<script setup/>`と`TypeScript`

今回の制作にあたって、まだ[RFC](https://github.com/vuejs/rfcs/pull/227)である`script setup`を採用しました。`svelte`と似たような感じで`<script/>`の内容を直接 expose してくれるため、`boilerplate`が減り、見通しを良くすることができます。

`tooling`がまだ追いついてないため、`vetur`の設定などに最初は少し苦労しました。その後、`Volar`([johnsoncodehk/volar](https://github.com/johnsoncodehk/volar))という vscode-extension の存在を知りました。これは`script setup`をサポートしている上、`<template/>`の中でも型チェック出来るようになっていて自動補完も効くので、開発効率が爆速になりました。

![typecheck in template with volar](./typecheck-in-template-with-volar.png)

#### `urql`と`graphql-codegen`

Backend の graphql API と通信するため、[`@urql/vue`](https://formidable.com/open-source/urql/)を入れました。使ってみた印象は良く、もし次があればまた使いたいと思いました。`<script setup/>`と合わせて、非常に clean なコンポーネントが書けます。

```vue
<template>
  <div v-if="!data?.events?.length">There is no events</div>
  <div v-else>There is {{ data.events.length }} events</div>
  <div v-if="fetching">Loading...</div>
  <div v-else-if="error">Oh no... {{ error }}</div>
  <div v-else>
    <ul v-if="data">
      <li
        v-for="event in data.events"
        :key="event.id"
        class="event"
        @click="deleteEvent({ id: event.id })"
      >
        {{ event.id }} ) {{ event.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useQuery, useMutation } from "@urql/vue"
  import { Event } from "@/type/gql"

  const { fetching, data, error } = useQuery<{
    events: Pick<Event, "id" | "title">[]
  }>({
    query: `
    {
      events {
        id
        title
      }
    }
  `,
    requestPolicy: "network-only",
  })

  const { executeMutation: deleteEvent } = useMutation(`
  mutation ($id: Int!) {
    deleteEvent(id: $id) {
      id
    }
  }
`)
</script>

<style lang="scss" scoped>
  .event {
    font-size: 2rem;
    cursor: pointer;
    &:hover {
      &::after {
        margin-left: 1rem;
        content: "x";
        color: red;
      }
    }
  }
</style>
```

型生成には`graphql-codegen`を使いました。[`urql`用の plugin](https://graphql-code-generator.com/docs/plugins/typescript-urql)もありますが、ざっくり見た感じそれらは`react`向けです。`@urql/vue`とうまくいくかわからなかったのでそれらは使いませんでした。`graphql-codegen`も buggy でうまく行かないことが多かったため、いい印象はないです。今回は`change-case`を手動で入れて`typeNames: change-case#pascalCase`を指定することで回避しました。

```yml
overwrite: true
schema: "http://localhost:4000/graphql"
generates:
  type/gql.ts:
    plugins:
      - "typescript"
    config:
      skipTypename: true
      useTypeImports: true
      namingConvention:
        typeNames: "change-case#pascalCase"
```

#### `vite`と`esm`

[`vite`](https://vitejs.dev)は`webpack`と違って`commonjs`と`esm`(node と browser)の export の区別に対して厳しいため、`firebase`などの一部`esm`にサポートしていないようです。そのため package の export が怪しいモジュールに対しては特殊の処理が必要です。例えば以下のように`vite.config.ts`の`optimizeDeps`に入れる必要があります。

```ts
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["firebase/app", "firebase/auth", "firebase/storage", "uuid"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})
```

#### state 管理

今回 state 管理が必要なのは event の作成と更新ページだけなので、`vuex`などの state 管理ライブラリーを使わずに`composition api`で全部やりました。

#### 画像の最適化

当初から Pull Request のテストとして[`preactjs/compressed-size-action`](preactjs/compressed-size-action)を入れていたので、予期せぬサイズ変更をすぐに検知できました。普通ならカメラで撮った画像そのままサイトに載せることはないですが、誤って commit した画像に対してわかりやすく warning を出すことができました。もちろん SSG にする時は画像の最適化を組み込むのが一番ですが、raw 画像はそもそも commit するべきではないため検知する意味はあったと思います。

![+22046%](./unminimized_imgs.jpg)

ちゃんとリサイズと圧縮すれば、`14MB` -> `155KB`まで変わるので、無視できないプロセスだと再認識しました。

![圧縮したあと](./minimized_imgs.png)

### バックエンド

今回の`actix`+`diesel`+`juniper`構成でやるのは初めてなので探りながらやる感じでした。

#### `anyhow`

[`anyhow`](https://github.com/dtolnay/anyhow)は rust の error handling するためのライブラリーです。`Try` trait と`?`operator を最大限利用して、理想的な処理 flow が書けました。例えば、contact を DB から取得する時はこんな感じになります。

```rust
pub fn get(ctx: &Context, contact_id: i32) -> anyhow::Result<Contact> {
    let conn = ctx.pool.get()?;
    Ok(contacts.filter(id.eq(contact_id)).get_result(&conn)?)
}
```

しかし、`?`operator は同じ関数の中で、`Option<T>`と`Result<T, E>`に対して混用してはいけないため、`Option<T>`を`Result<T, E>`に変換する必要があります。`.ok_or(MyError::...)`でもいいですが、短くするために`MessageError`を作りました。

```rust
#[derive(Debug)]
pub struct MessageError {
    message: String,
}

impl MessageError {
    pub fn new(message: impl ToString) -> Self {
        Self {
            message: message.to_string(),
        }
    }
}

impl std::error::Error for MessageError {}

pub trait OrMessageError<T> {
    fn or_error(self, message: &str) -> Result<T, MessageError>;
}

impl<T> OrMessageError<T> for Option<T> {
    fn or_error(self, message: &str) -> Result<T, MessageError> {
        match self {
            Some(data) => Ok(data),
            _ => Err(MessageError::new(message).into()),
        }
    }
}
```

例えば、request の header から max-age の`20349`を数値として取り出したい時に、

```json
{
  ...
  "Cache-Control": "public, max-age=20349, must-revalidate, no-transform"
  ...
}
```

こんな感じでかなりスムーズの処理ができます。

```rust
let max_age = res
  .headers()
  .get("Cache-Control")
  .or_error("Cache-Control is not provided")?
  .to_str()?
  .split(',')
  .find_map(|field| field.trim().strip_prefix("max-age="))
  .or_error("max age is not found")?
  .parse::<i64>()?;
```

`actix`自体は`anyhow`でサポートしていませんが、使ってみたところ特に問題はなかったです。

#### juniper

今回使ってみた感想として、`juniper`は非常に良くできています。query と data acess の処理を bind するだけで、graphql レイヤーができます。過去に一度 node の`express-graphql`で resolver 書いたことがありましたが、これより大変だった記憶があります。

```rust
pub struct QueryPublic;

#[graphql_object(
    context = Context,
)]
impl QueryPublic {
    fn api_version() -> &str {
        API_VERSION
    }

    fn event(ctx: &Context, query: EventQueryPublic) -> FieldResult<EventPublic> {
        let event = events::service::get_public(ctx, query)?;
        Ok(event)
    }

    fn events(ctx: &Context, by: Option<EventListQuery>) -> FieldResult<Vec<EventPublic>> {
        let events = events::service::list_public(ctx, by)?;
        Ok(events)
    }
}

pub struct MutationPublic;

#[graphql_object(
    context = Context,
)]
impl MutationPublic {
    async fn create_contact(ctx: &Context, contact: ContactInput) -> FieldResult<Contact> {
        let contact = contacts::create(ctx, contact)?;
        Ok(contact)
    }
}

pub type SchemaPublic = RootNode<'static, QueryPublic, MutationPublic, EmptySubscription<Context>>;
```

`graphiql`もデフォルトでサポートしていて、とても便利です。

![](./tsukiyo_admin_graphiql.png)

`actix`レイヤーの`web::Json<T>`が schema に合わないデータが post されるた時自動で弾くように、juniper も問題のある request を処理してくれるので、これは`nodejs`の`superstruct`や`ajv`が`out of the box`になったような開発体験です。

```rust
pub async fn handler(
    req: HttpRequest,
    pool: web::Data<Pool>,
    schema: web::Data<Schema>,
    data: web::Json<GraphQLRequest>,
) -> impl Responder {
  ...
}
```

#### バリデーション

さらに post されたデータの中身をバリデーションするために[Keats/validator](https://github.com/Keats/validator)を使いました。以下の code のように`#[validate(xxx)]`をつけることで、`model.validate()?`ようにバリデーションができます。

```rust
use serde::Deserialize;
use validator::{Validate, ValidationError};

#[derive(Debug, Validate, Deserialize)]
struct Model {
    #[validate(email)]
    mail: String,
    #[validate(phone)]
    phone: String,
}

fn dummy(model: Model) -> anyhow::Result<()> {
  model.validate()?
  ...
}
```

こんな感じで、~~(min=1)の処理と同じですが、~~カスタムの validator も作成できます

```rust
pub fn not_empty(input: &str) -> Result<(), ValidationError> {
    if input.is_empty() {
        return Err(ValidationError::new("should not be empty"));
    }
    Ok(())
}
```

#### `diesel`

今回初見ですが、触ったことがある ORM の中で[`diesel`](http://diesel.rs)は使いやすい部類に入ると思います。ドキュメントもそれなりにあって、やりたいことがハマることなく直ぐできます。query するたびに接続しないため、`r2d2`を使って connection pool を作ります。

```rust
use diesel::pg::PgConnection;
use diesel::r2d2::{self, ConnectionManager};
use dotenv::dotenv;
use std::env;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub fn create_pool() -> Pool {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.")
}
```

`Cloud SQL`への接続は[`unix socket`になっているため](https://cloud.google.com/sql/docs/mysql/connect-run)、`DATABE_URL`の構成も少し試しました。

```
postgresql:///development?user=<DB-USER>&password=<DB-PASSWORD>&host=/cloudsql/<PROJECT-NAME>:<INSTANCE-REGION>:<INSTANCE-NAME>
```

`diesel`は`Queryable`、`Insertable`といった trait を提供しているので、model と input を`derive`します。`juniper`と`validator`と合わせると、こんな感じになります。

##### Contact model

```rust
#[derive(Queryable, Serialize, Deserialize, GraphQLObject)]
#[graphql(description = "A new contact")]
pub struct Contact {
    pub id: i32,
    pub title: String,
    pub name: String,
    pub email: String,
    pub phone: Option<String>,
    pub body: String,
    pub created_at: NaiveDateTime,
    pub checked: bool,
}
```

##### Contact Input

```rust
#[derive(
    Debug, Default, Clone, Validate, Insertable, Serialize, Deserialize, GraphQLInputObject,
)]
#[graphql(description = "A new contact input")]
#[table_name = "contacts"]
pub struct ContactInput {
    #[validate(length(max = 100), custom = "not_empty")]
    pub title: String,
    #[validate(length(max = 50), custom = "not_empty")]
    pub name: String,
    #[validate(email)]
    pub email: String,
    pub phone: Option<String>,
    #[validate(custom = "not_empty")]
    pub body: String,
}
```

`diesel`で[直接 struct から select はできない](https://github.com/diesel-rs/diesel/issues/2037)ため、取得したい field を一個つづ list しないといけないですが、代わりに型の安全は保証されます。例えば、event の公開データを取得し page view を+1 する操作はこんな感じになります。

```rust
pub fn get_public(ctx: &Context, query_input: EventQueryPublic) -> anyhow::Result<EventPublic> {
    let conn = ctx.pool.get()?;
    let updates = page_view.eq(page_view + 1);
    let returns = (
        id, slug, title, body, genre, tag, fee, ogp_img, start_at, end_at, publish_at, updated_at,
        page_view,
    );
    Ok(
        diesel::update(events.filter(id.eq(query_input.id.or_error("not found")?)))
            .set(updates)
            .returning(returns)
            .get_result::<EventPublic>(&conn)?,
    )
}
```

#### `jsonwebtoken` と openssl

今回`Identity Platform`も使うことになったため、rust 側で firebase の`JWT`token を検証する必要がありました。オフィシャルのライブラリーがないために、[verify_id_tokens_using_a_third-party_jwt_library](https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_a_third-party_jwt_library)の手順を見て実装しました。[Rust と Firebase Authentication でユーザー認証を導入](https://blog.mahoroi.com/posts/2020/08/rust-firebase-authentication/)という記事を参考にしましたが、実際の処理の部分はほとんどリファクタリングしました 😨。

その中で、[`jsonwebtoken`](https://github.com/Keats/jsonwebtoken)の crate を利用しました。crate は現在`x509`の証明書をサポートしていませんが、[issuecomment-753403072](https://github.com/Keats/jsonwebtoken/issues/127#issuecomment-753403072)で書かれている通り、`openssl`そのものを使うことで、`public key`を抽出できます。

```rust
let certificate = openssl::x509::X509::from_pem(v.as_bytes())?;
let pem_bytes = certificate.public_key()?.rsa()?.public_key_to_pem()?;
```

詳細の実装は[auth/mod.rs](https://github.com/rainy-me/tsukiyo/blob/master/backend/src/auth/mod.rs)と[auth/certs.rs](https://github.com/rainy-me/tsukiyo/blob/master/backend/src/auth/certs.rs)にあります。

`graphql`endpoint の authentication 手段もいくつかあります。例えば、`field`、`object`、`mutation`などいくつかのレイヤーで権限を決めることができます。

今回は一番最初の connection をもらう前に、context で user をチェックしましたが、

```rust
let conn = context.check_user()?.get()?;
```

`juniper`で query している field を見る方法がすぐ見つからなかったため、ログインの有無で`schema`ごとに分けることにしました。

```rust
let res = if ctx.user.is_some() {
    data.execute(&schema.admin, &ctx).await
} else {
    data.execute(&schema.public, &ctx).await
};
```

#### Dockerfile for Production Rust

`Cloud run`にデプロイするためには production ビルドの Docker Image が必要です。まず`diesel`crate と`JWT`の検証のため`openssl`が必要なので、muti-stage build にしようとします。そうすると`dynamic linking`が問題になります。そこで、完全`static linking`の`musl`image が選択肢として上がります。musl は最終 image がかなり小さい(~10MB after compression)上、[using-diesel](https://github.com/emk/rust-musl-builder/tree/master/examples/using-diesel)の example もあるので、`musl`に決めました。

ただし、[why-musl-extremely-slow](https://andygrove.io/2020/05/why-musl-extremely-slow/)という記事に書かれているように、`musl`イメージにはパフォーマンス問題が存在しています。今回は benchmark を取っていませんが、できれば避けたほうがいいかもしれません。

![](./tsukiyo-docker-image.png)

さらに、rust のビルドスピードを上げるために少し工夫をしました。

一番最初はこんな感じでした。

```Dockerfile
FROM ekidd/rust-musl-builder:latest AS builder
ADD --chown=rust:rust . ./
RUN cargo build --release
```

`ADD --chown=rust:rust . ./`は source code を全部 copy して、`cargo build --release`すると、依存している crates を全部 download して compile しますす。しかし、source code に変更があった場合 docker の layer cache が無効になり、dependencies を最初から download して再 compile することになるので、遅くなります。

そこで、修正してこうなりました。

```Dockerfile
FROM ekidd/rust-musl-builder:latest AS builder
ADD --chown=rust:rust Cargo.toml Cargo.lock ./
# compile dependencies
RUN mkdir -p src \
 && echo "fn main() {}" > src/main.rs \
 && cargo build --release
ADD --chown=rust:rust . ./
RUN cargo build --release
```

docker の layer cache をちゃんと利用するため、まず`Cargo.toml`と`Cargo.lock`だけ copy して、dummy の main 関数をつくってコンパイルします。そうすれば、あとで source code に変更があったとしても dependencies のコンパイル cache が効いた状態になります。

`github actions`のなかで`--cache-from`を使うことで、`9分`くらい掛かったビルドを`2分半`まで短縮できました。

```sh
docker pull ${{ env.IMAGE }}-cache || true
docker build . -t ${{ env.IMAGE }}:${{  github.sha }} -f Dockerfile.prod --cache-from=${{ env.IMAGE }}-cache
```

最終的な Dockerfile は[ここです](https://github.com/rainy-me/tsukiyo/blob/master/backend/Dockerfile.prod)

### インフラ

#### `google-github-actions/deploy-cloudrun`の不具合

`Cloud run`にデプロイする workflow で`google-github-actions/deploy-cloudrun`を使いましたが、プレゼント日の２日前から突然動かなくなりました。流石に心当たりがないので、[deploy-cloudrun/issues/26](https://github.com/google-github-actions/deploy-cloudrun/issues/26)を立ててみたら、本当にバッグでした。

#### Backend は`Cloud Run`のみの場合、`Cloud SQL`と一緒に使うべきではない

`Cloud Run`と合わせたデータベースとして、[`Cloud SQL`](https://cloud.google.com/sql)の紹介が一番多かったのでデータベースは`postgresql`の instance にしましたが、ここが一番大きなミスでした。なぜなら`Cloud SQL`は`Pay as you go`ではなく、一つの`VM`常に起動する状態になるので、`Cloud Run`の特性と合わない上値段が高くなります。一方、`Cloud Firestore`は~~Rust ライブラリーがないですが~~起動時間で課金されるわけではないので、向いているかもしれません。

### プロジェクトマネージメント

最初に紹介した通り、今回の授業は５人で協力するはずでした。しかし、授業外で yama 先生以外のほか三名のメンバー(チームリーダー含め)と連絡が取れない状態が続いて、デザインの完成もかなり遅れた上、それは一部しかありませんでした。よって残念ながら、デザインの改善について話す機会はありませんでした x。

デザインが遅れることで制作期間がテスト期間とかぶりました。yama 先生も忙しくなり、最終的にコードを書く時間は二週間くらいしかありませんでした。

プロジェクトマネージメント的に一番失敗した点は、進捗管理ができなかったことだと思います。一応プロジェクトマネージメントツールとして、`Backlog`を使いましたが、リーダー担当の人が不在だったせいで、うまく利用できませんでした。

細かく項目を洗い出さなくても、最初からトップページのデザインのようなクリティカルとなるタスクの締め切りと、遅れた時の対策を考えたほうが良かったかもしれません。

### 積み残し

- スケジュール的に、テストを書く余裕はありませんでした。
- vue3 で jest + cypress で setup しましたが、うまく動かないので、まだ調査が必要です。[`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/)は良さそうです。
- `tailwind`使うことになったので、`sass`をやめて`@apply`使うほうが綺麗に収まると思いました。
- `tailwind`最初のビルドタイムが長いですが、[`windicss`(vite-plugin-windicss)](https://github.com/windicss/vite-plugin-windicss)を使用すれば 20~100x 速くなります
- イベント editor ページのコードも綺麗とは言えないので、リファクタリングが必要です。
- 今回 backend でお主に event と contact ２つ独立したテーブルしか操作してなかったので`N+1`など`graphql`で良くある問題について検証できませんでした。
- 提出とほぼ同じタイミングで、`Cloud Run`は[websocket サポートするようになりました](https://cloud.google.com/blog/products/serverless/cloud-run-gets-websockets-http-2-and-grpc-bidirectional-streams)。`juniper`の`subscription`と組み合わせて使用できそうです。
- もともと psql で管理画面の`text search`を実装して予定でしたができませんでした。
- `Cloud Run`は`invoker`に対して権限確認できて、未認可のアクセスに対してそもそも起動しないので、もしかすると公開の API と管理画面の API を別々に deploy したほういいかもしれません。
- 内容少ないですが、cloud インフラの新規作成と管理はやはりそれなり大変です。管理画面で UI を探してクリックするのはつらいので、もし機会があれば次回は`terraform`とかで構築を自動化したいです。そもそも今回のプロジェクトの複雑度的に`VPS`を借りてやると比べて同じかそれ以上大変と感じたので、`VPS`で完結するという選択肢もあります。

## まとめ

今回のプロジェクトを通して、`tailwind`、`urql`、`juniper`、`diesel`及び`Cloud Run`などについて調査、実装しました。最終的な成果物はプロダクションレベルとは言いがたいものの、検証の意味では充分だと思います。`tailwind`に対してやはり不信感を感じてはいますが、`urql`、`juniper`と`Cloud Run`はこれからも使って行きたいです。
