# MyPGS

`mypgs` e' una libreria frontend condivisa per costruire interfacce coerenti tramite attributi `pgs`, SCSS sorgenti, componenti UI e comportamenti JavaScript riutilizzabili.

La libreria nasce come base di design system: layout, spacing, colori, bottoni, form, menu, modali, dropdown, ricerca con suggerimenti, slides, notifiche e pattern ricorrenti vengono definiti una volta sola e riusati nei progetti.

## Cosa contiene

- `assets/scss/`: SCSS sorgenti divisi in base, layout, componenti, pattern e mixin.
- `assets/javascript/`: helper `pgs`, componenti JS, funzioni e pattern.
- `templates/`: esempi HTML pronti per componenti e layout.
- `dist/css/`: CSS compilato.
- `dist/javascript/`: bundle JavaScript compilato.
- `dist/index.d.ts`: dichiarazioni TypeScript esportate dal pacchetto.
- `AGENTS.md`: guida operativa per AI.

## Installazione

Da registry **npm**:

```bash
npm install mypgs
```

### JavaScript

```js
import "mypgs";
```

Se ti serve accedere direttamente all'helper:

```js
import { pgs } from "mypgs";
```

**React/TSX con Vite:**

Configura il plugin che converte `pgsHtml` in `pgs`:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";
import pgsVite from "mypgs/vite-plugin-pgs";

export default {
  plugins: [pgsVite(), react()],
};
```

### SCSS

Se il progetto vuole compilare un CSS unico, importa gli SCSS sorgenti:

```scss
@use "sass:meta";
@use "../../node_modules/mypgs/assets/scss/mixin/mixin.scss" as * ;
@include meta.load-css("../../node_modules/mypgs/assets/scss/index.scss");
```

Se servono solo i mixin:

```scss
@use "../../node_modules/mypgs/assets/scss/mixin/mixin.scss" as * ;
```

### Markup

`initP` e' importante: tutti i layout, componenti e pattern SCSS sono definiti sotto `[pgs~=initP]`.

```html
<html lang="it" pgs="htmlBase initP">
  <body pgs="bodyBase bodyImg bodyText bodyHeading">
    <main pgs="main"></main>
  </body>
</html>
```

## Documentazione

- [Utilizzo CSS/SCSS](docs/utilizzo-css-scss.md)
- [Helper JavaScript](docs/helper-javascript.md)
- [Componenti e markup](docs/componenti-e-markup.md)
- [Export npm e sviluppo](docs/export-e-sviluppo.md)
- [Convenzioni](docs/convenzioni.md)
