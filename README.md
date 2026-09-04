# MyPGS

`mypgs` is a shared frontend library for building consistent interfaces through `pgs` attributes, SCSS sources, UI components, and reusable JavaScript behaviors.

The library provides a design-system foundation: layouts, spacing, colors, buttons, forms, alerts, menus, modals, dropdowns, suggestion search, slides, notifications, and recurring patterns are defined once and reused across projects.

## What it includes

- `assets/scss/`: SCSS sources divided into base, layouts, components, patterns, and mixins.
- `assets/javascript/`: the `pgs` helper, JavaScript components, helpers, and patterns.
- `reference/`: canonical HTML references for components, layouts, patterns, and guides.
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

Canonical component and layout examples are available in `reference/`. Use those files as the
reference source before creating new markup.

### Guides

- [css-scss-usage](docs/guides/css-scss-usage.md)
- [npm-export-and-development](docs/guides/npm-export-and-development.md)
- [javascript-helpers](docs/guides/javascript-helpers.md)

### Helper API reference

- [pgs](docs/helper/pgs.md)
- [init](docs/helper/init.md)
- [formValidate](docs/helper/formValidate.md)
- [scrollHorizontal](docs/helper/scrollHorizontal.md)

### Base

- [body](docs/base/body.md)
- [general](docs/base/general.md)
- [heading](docs/base/heading.md)
- [color](docs/base/color.md)
- [darkmode](docs/base/darkmode.md)
- [svg](docs/base/svg.md)
- [border](docs/base/border.md)
- [hover](docs/base/hover.md)

### Components

- [accordion](docs/components/accordion.md)
- [alerts](docs/components/alerts.md)
- [badges](docs/components/badges.md)
- [breadcumbs](docs/components/breadcumbs.md)
- [button](docs/components/button.md)
- [card](docs/components/card.md)
- [dropdown](docs/components/dropdown.md)
- [form](docs/components/form.md)
- [formAddon](docs/components/formAddon.md)
- [icon](docs/components/icon.md)
- [logo](docs/components/logo.md)
- [menu](docs/components/menu.md)
- [modal](docs/components/modal.md)
- [notification](docs/components/notification.md)
- [search](docs/components/search.md)
- [slides](docs/components/slides.md)
- [steps](docs/components/steps.md)
- [stepTabs](docs/components/stepTabs.md)
- [summary](docs/components/summary.md)
- [table](docs/components/table.md)
- [tabs](docs/components/tabs.md)
- [toast](docs/components/toast.md)
- [tooltip](docs/components/tooltip.md)

### Layout

- [section](docs/layout/section.md)
- [header](docs/layout/header.md)
- [footer](docs/layout/footer.md)
- [pageShell](docs/layout/pageShell.md)
- [responsive](docs/layout/responsive.md)
- [breakpoints](docs/layout/breakpoints.md)
- [spacing](docs/layout/spacing.md)
- [utilities](docs/layout/utilities.md)

### Patterns

- [cookieConsent](docs/patterns/cookieConsent.md)
