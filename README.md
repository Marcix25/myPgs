# MyPGS

`mypgs` is a shared frontend library for building consistent interfaces through `pgs` attributes, SCSS sources, UI components, and reusable JavaScript behaviors.

The library provides a design-system foundation: layouts, spacing, colors, buttons, forms, alerts, menus, modals, dropdowns, suggestion search, slides, notifications, and recurring patterns are defined once and reused across projects.

## What it includes

- `assets/scss/`: SCSS sources divided into base, layouts, components, patterns, and mixins.
- `assets/javascript/`: the `pgs` helper, JavaScript components, helpers, and patterns.
- `reference/`: canonical HTML and React references for components, layouts, and patterns.
- `dist/css/`: compiled CSS.
- `dist/javascript/`: compiled JavaScript bundle.
- `dist/index.d.ts`: TypeScript declarations exported by the package.
- `AGENTS.md`: operating guide for AI agents.

## Installation

From the **npm** registry:

```bash
npm install mypgs
```

### JavaScript

```js
import "mypgs";
```

To access the helper directly:

```js
import { pgs } from "mypgs";
```

**React/TSX with Vite:**

Configure the plugin that converts `pgsHtml` into `pgs`:

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

To compile a single CSS file, import the SCSS sources:

```scss
@use "sass:meta";
@use "../../node_modules/mypgs/assets/scss/mixin/mixin.scss" as * ;
@include meta.load-css("../../node_modules/mypgs/assets/scss/index.scss");
```

To import only the mixins:

```scss
@use "../../node_modules/mypgs/assets/scss/mixin/mixin.scss" as * ;
```

### Markup

```html
<html lang="en" pgs="htmlBase">
  <body pgs="bodyBase bodyImg bodyText bodyHeading">
    <main pgs="main"></main>
  </body>
</html>
```

## Documentation

- [CSS/SCSS usage](docs/css-scss-usage.md)
- [JavaScript helpers](docs/helper/README.md)
- [Components and markup](docs/components-and-markup.md)
- [npm exports and development](docs/npm-export-and-development.md)
- [Conventions](docs/conventions.md)
