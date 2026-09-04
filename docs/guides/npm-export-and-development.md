<!-- Automatically generated from reference/html/guides/npm-export-and-development.html. Edit reference/html/guides/npm-export-and-development.html and run npm run docs:generate:guides again. -->

# npm exports and development

What the package exposes, compiled vs source usage, the local development workflow, and how to add a new module.

The package exposes:

```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./assets/javascript/index.js",
    "default": "./dist/javascript/index.js"
  },
  "./style.css": "./dist/css/index.css",
  "./style.min.css": "./dist/css/index.min.css",
  "./vite-plugin-pgs": {
    "types": "./plugins/vite-plugin-pgs.d.ts",
    "import": "./plugins/vite-plugin-pgs.js",
    "default": "./plugins/vite-plugin-pgs.js"
  }
}
```

Compiled usage:

```js
import "mypgs";
import "mypgs/style.css";
```

SCSS source usage:

```scss
@use "sass:meta";
@use "../../node_modules/mypgs/assets/scss/mixin/mixin.scss" as * ;
@include meta.load-css("../../node_modules/mypgs/assets/scss/index.scss");
```

## Development

One-time build:

```bash
npm run start
```

Build in watch mode:

```bash
npm run "start watch"
```

Creating a local package:

```bash
npm pack
```

Recommended workflow when modifying the library:

1. edit the sources in `assets/`;
2. update the references or the documentation when the public usage changes;
3. rebuild with `npm run start`;
4. check `dist/`;
5. create the package with `npm pack`;
6. install the `.tgz` in the project that consumes the library.

Note: when the Webpack build fails, do not edit `dist/javascript` by hand as the primary source. Fix the toolchain and regenerate the compiled assets.

## Adding a new module

Component example:

```js
export function PGS_myComponent_init(root = document) {
  pgs(root).querySelectorAll("myComponent").forEach((element) => {
    // init
  });
}

export function PGS_myComponent_api(element) {
  // return instance API
}

export const PGS_myComponent = {
  PGS_name: "PGS_myComponent",
  init: PGS_myComponent_init,
  api: PGS_myComponent_api
};
```

Registration in `assets/javascript/_imports.js`:

```js
import { PGS_myComponent } from "./components/_myComponent.js";

pgs.registerImport({
  PGS_myComponent,
});

pgs.registerModules({
  myComponent: PGS_myComponent,
});
```

Usage:

```js
pgs.myComponent.init();
pgs.myComponent.api(element);
```
