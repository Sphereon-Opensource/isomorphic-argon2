<h1 align="center">
  <br>
  <a href="https://www.sphereon.com"><img src="https://sphereon.com/content/themes/sphereon/assets/img/logo.svg" alt="Sphereon" width="400"></a>
  <br>Isomorphic Argon2 Hash
  <br>
</h1>

[![CI](https://github.com/Sphereon-Opensource/isomorphic-argon2/actions/workflows/main.yaml/badge.svg)](https://github.com/Sphereon-Opensource/isomorphic-argon2/actions/workflows/main.yaml) [![NPM Version](https://img.shields.io/npm/v/@sphereon/isomorphic-argon2.svg)](https://npm.im/@sphereon/isomorphic-argon2)

### Isomorphic Argon2

Argon2 is a password-hashing function, the winner of Password Hashing Competition.

This is an isomorphic library which can be ran in a browser, NodeJS or React-Native.

For browser and NodeJS it is using the [argon2-browser](https://github.com/antelle/argon2-browser) package and for
React-Native it is using the [@sphereon/react-native-argon2](https://github.com/Sphereon-Opensource/react-native-argon2)
package.

### NodeJS and Browser notice

When using this package in the browser or a node environment, you can ignore the warning about the missing peer dependency for `@sphereon/react-native-argon2` and `react-native`. Obviously these are not needed for non react-native projects.

### React Native notice

Next to NodeJS and Browser support, this package also works with react-native. You do need to install the following
package using your package manager. This has to do with auto-linking not being available for transitive dependencies. We
need some native Argon2 Android/IOS modules on React Native because WASM isn't available. As such you will have to
install the dependency directly into your app.
See https://github.com/react-native-community/cli/issues/870

npm: `npm install @sphereon/react-native-argon2`

yarn: `yarn add @sphereon/react-native-argon2`

#### Examples

Although NodeJS and React-Native have different entry points in the package, using them is exactly the same

##### NodeJS and React-Native

```typescript
import { Argon2, Argon2Mode } from '@sphereon/isomorphic-argon2';

await Argon2.hash('test input', 'my salt value here', {
  hashLength: 32,
  memory: 1024,
  parallelism: 1,
  mode: Argon2Mode.Argon2id,
  iterations: 1,
}).then((hash) => console.log(`${hash.hex}\n${hash.encoded}`));

// output:
// e5db767555a025f007b3b9f4176ef51ef7bd3aea1dcb99b8c382ca68bdf959cc
// $argon2id$v=19$m=1024,t=1,p=1$c2FsdHNhbHNhbHNhbHRzYWxzYWx0$5dt2dVWgJfAHs7n0F271Hve9Ouody5m4w4LKaL35Wcw
```

##### Browser

HTML file contains a reference to the browser bundle called, isomorphic-argon2.browser.js from this package. The sample
code is in browser.demo.js (see below).

`index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Isomorphic-Argon2 Browser Demo</title>
  </head>
  <body>
    <h1>Isomorphic-Argon2 Browser Demo</h1>
    <script src="isomorphic-argon2.browser.js"></script>
    <pre>Output should appear here. If not, please check DevTools in your browser.</pre>
    <script src="browser.demo.js"></script>
  </body>
</html>
```

The `browser.demo.js` file looks like this:

```typescript
Argon2.hash('test', 'my salt value here', {
  hashLength: 32,
  memory: 1024,
  parallelism: 1,
  mode: Argon2Mode.Argon2id,
  iterations: 1,
}).then((hash) => {
  document.querySelector('pre').innerText = 'Seems like it worked:\n' + `Encoded: ${hash.encoded}\n` + `Hex: ${hash.hex}\n`;
});
```

The output in your browser would be something like:

> Isomorphic-Argon2 Browser Demo
>
> Seems like it worked:
> Encoded: $argon2id$v=19$m=1024,t=1,p=1$c2FsdHNhbHNhbHNhbHRzYWxzYWx0$5dt2dVWgJfAHs7n0F271Hve9Ouody5m4w4LKaL35Wcw
> Hex: e5db767555a025f007b3b9f4176ef51ef7bd3aea1dcb99b8c382ca68bdf959cc

### Build

```shell
yarn build
```

### Test

The test command runs:

- `eslint`
- `prettier`
- `unit`

You can also run only a single section of these tests, using for example `yarn test:unit`.

```shell
yarn test
```

### Utility scripts

There are several other utility scripts that help with development.

- `yarn fix` - runs `eslint --fix` as well as `prettier` to fix code style.
- `yarn cov` - generates code coverage report.
