---
title: Switch from yarn to pnpm
date: 2021-09-25 19:25:54
tags:
 - package manager
 - yarn
 - pnpm
---

Today I migrated 6 repos from `yarn` v1 to `pnpm` in about 4 hours and I decided to put the process into this article to share some issues I encountered.

## Basic info

The repos are:

- [https://github.com/rainy-me/blog](https://github.com/rainy-me/blog) *this blog*
- [https://github.com/rainy-me/dhu](https://github.com/rainy-me/dhu) a library/cli/website monorepo
- [https://github.com/rainy-me/lab](https://github.com/rainy-me/lab) a monorepo website deployed on `netlify`
- [https://github.com/rainy-me/holoframe](https://github.com/rainy-me/holoframe) another website deployed on `netlify`
- [https://github.com/rainy-me/leetcode](https://github.com/rainy-me/leetcode) a repo only using jest for testing
- [https://github.com/rainy-me/rss](https://github.com/rainy-me/rss) a simple library

## The script

Since I think I'll be migrating more repos in the future so I put some basic logics to an [zx](https://github.com/google/zx) script.

```js
#!/usr/bin/env zx

// https://github.com/google/zx/issues/124#issuecomment-898469918
process.env.FORCE_COLOR = 3;

await $`find . -type d -name node_modules -prune -ok rm -rv {} \\;`;
await $`find . -type f -name yarn.lock -prune -ok rm -rv {} \\;`;
await $`find . -type f -name "yarn*log" -prune -ok rm -rv {} \\;`;

const w = (m) => console.log(chalk.yellow(m));

const pkg = await fs.readJson("./package.json");

if (pkg.scripts?.preinstall) {
  w(
    `package.json already has 'scripts.preinstall', skipping add 'only-allow pnpm'`
  );
} else {
  pkg.scripts ??= {};
  pkg.scripts.preinstall = "npx -y only-allow pnpm";
  await fs.writeJson("./package.json", pkg, { spaces: 2 });
}

const refs =
  await $`grep --exclude-dir={node_modules,.git,dist} -rl "yarn" . | tee /dev/tty || true`;
if (refs.stdout) {
  w("Found reference to yarn, better check them out.");
}

await $`pnpm i`;

```

Things this script does:

1. delete node_modules and yarn related files
2. adding ` "preinstall": "npx only-allow pnpm"` to package.json [https://pnpm.io/only-allow-pnpm](https://pnpm.io/only-allow-pnpm)
3. warn about potential usage of `yarn` in build scripts / ci commands
4. run the `pnpm i` command

## Issues

### `gastby` does not build

- [https://github.com/pnpm/pnpm/issues/991](https://github.com/pnpm/pnpm/issues/991)

Fix: use the `gatsby-plugin-pnpm` package. [change commit](https://github.com/rainy-me/blog/commit/a35b2d89365cc0c3ee449f8c150be02838b63817)

Since this blog is deployed directly to GCP bucket by myself without CI, the migration is done as soon as the local build succeeded. 

### mono repo & `lerna`

see [https://pnpm.io/workspaces](https://pnpm.io/workspaces)

#### changes made:

##### 1. add `pnpm-workspace.yaml` file

Could also delete `workspaces` in `package.json`.

##### 2. change dependencies reference to use `workspace:` protocol

```diff
-    "@dhu/core": "^0.5.0",
+    "@dhu/core": "workspace:*",
```

##### 3. change some `yarn workspace` command usage 

e.g. `yarn workspace @dhu/cli dev` -> `pnpm dev --filter @dhu/cli`

##### 4. using `@changesets/cli` instead of `lerna`

Since [`lerna` doesn't really support `pnpm`](https://github.com/lerna/lerna/issues/1818), 
[`@changesets/cli`](https://github.com/atlassian/changesets) seems to be a better choice. `pnpm` is using `changesets` itself and even has detailed official docs: [Using Changesets with pnpm](https://pnpm.io/using-changesets), which also includes the releasing flow and how to step up `GitHub Actions`. Awesome!

##### 5. move `patch-package` to package dir

`pnpm` does not hoist deps to the root `node_modules` by default, we need move the `"postinstall": "patch-package"` to sub dirs.

### using `pnpm` with frameworks and providers

It might be super[(1)](https://github.com/gridsome/gridsome/issues/551) hacky[(2)](https://github.com/vercel/next.js/issues/16471) to use `pnpm` with frameworks like `gridsome` or `nextjs`. And I'm afraid it's not easy to deploy on hosting providers like `vercel` currently.

`Netlify` also does not support `pnpm` yet, however, by adding the config below to `netlify.toml`, it's possible to deploy `pnpm` managed repos on it. Related issue: [Feature request: Add PNPM support #1633](https://github.com/netlify/build/issues/1633).

```toml
[build.environment]
  NPM_FLAGS = "--version"
[build]
  command = "npx pnpm install --store=node_modules/.pnpm-store && npx pnpm build"
```

There is another issue though... If you have `"preinstall": "npx only-allow pnpm"` in package.json, it will fail the build process. So for `netlify` sites it's better to skip the preinstall script when `$CI` env variable is presented or just remove it for now.

## Conclusions

As long as using `pnpm` locally or in managed environment, the migration process should be easy and straightforward. 

In general, I think I'll start new projects using `pnpm` by default from now on. At the same time, I still feels `pnpm` does not work out-of-the-box when it comes to major frameworks and hosting providers at this moment.