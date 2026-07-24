# Export npm

Il pacchetto espone:

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

Uso compilato:

```js
import "mypgs";
import "mypgs/style.css";
```

Uso sorgente SCSS:

```scss
@use "sass:meta";
@use "../../node_modules/mypgs/assets/scss/mixin/mixin.scss" as * ;
@include meta.load-css("../../node_modules/mypgs/assets/scss/index.scss");
```

## Sviluppo

One-time build:

```bash
npm run start
```

Build in watch mode:

```bash
npm run "start watch"
```

Creare un pacchetto locale:

```bash
npm pack
```

Recommended workflow when modifying the library:

1. modifica i sorgenti in `assets/`;
2. aggiorna i riferimenti o la documentazione se cambia il modo d'uso;
3. ricompila con `npm run start`;
4. verifica `dist/`;
5. crea il pacchetto con `npm pack`;
6. installa il `.tgz` nel progetto che consuma la libreria.

Nota: se la build Webpack fallisce, non modificare manualmente `dist/javascript` come sorgente primaria. Sistema la toolchain e rigenera gli asset compilati.

## Aggiungere un nuovo modulo

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

Registrazione in `assets/javascript/_imports.js`:

```js
import { PGS_myComponent } from "./components/_myComponent.js";

pgs.registerImport({
  PGS_myComponent,
});

pgs.registerModules({
  myComponent: PGS_myComponent,
});
```

Uso:

```js
pgs.myComponent.init();
pgs.myComponent.api(element);
```
