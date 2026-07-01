# AI Guidelines for `mypgs`

This guide is for any AI/Codex agent that initializes or modifies a project based on the `mypgs` NPM library. Before writing custom CSS, JavaScript, or markup, always check whether `mypgs` already provides suitable `pgs` tokens, components, layouts, mixins, variables, or APIs.

## 1. Library Overview

`mypgs` is a shared frontend library for building consistent interfaces through:

- HTML `pgs` attributes as the contract between markup, SCSS, and JavaScript;
- SCSS sources with base styles, layouts, components, patterns, CSS variables, and mixins;
- JavaScript modules for recurring behaviors such as accordions, dropdowns, menus, modals, slides, steps, step tabs, notifications, header, cookie consent, and dark mode;
- example HTML templates in `templates/`;
- compiled assets in `dist/`.

It solves the problem of rewriting layouts, buttons, forms, modals, menus, tabs, spacing, states, and base interactions every time. It should be used as the design system foundation because it centralizes naming, spacing, colors, radii, shadows, accessible behaviors, and reusable patterns.

Prefer `mypgs` over custom CSS/JS when:

- you need standard layouts, sections, containers, grids, flex utilities, or a page shell;
- you need components that already exist in the library;
- you need to add states, options, or behaviors already handled by the `pgs`, `pgs-state`, and `pgs-option` attributes;
- the request is about visual consistency, development speed, or reuse.

Write custom code only when the pattern does not exist, or when you are adding a new reusable feature to the library.

## 2. General Usage Rules

- Use `mypgs` as the first choice for layouts, components, helpers, variables, utilities, and available patterns.
- Do not recreate existing components from scratch: buttons, forms, dropdowns, modals, menus, slides, accordions, steps, stepTabs, notifications, tooltips, tables, searchbars, logos, headers, footers, and cookie consent.
- Do not duplicate logic already handled by the `mypgs` JS modules, such as modal open/close, accordion state, Popover API dropdowns, step tabs, notifications, or form validation.
- Keep `pgs` tokens in markup, SCSS selectors, and JS queries consistent.
- Prefer composing `pgs` tokens over adding new CSS classes.
- Classes are acceptable for external integrations or local details, but they must not replace existing PGS tokens.
- Keep markup semantic and accessible: the library adds many ARIA attributes, but the base structure still needs to be correct.

## 3. Existing File Analysis

Files analyzed:

- `assets/javascript/_pgs.js`
- `assets/javascript/index.js`
- `assets/javascript/_imports.js`
- `assets/javascript/pgs.d.ts`
- `dist/index.d.ts`
- `assets/javascript/base/_darkmode.js`
- `assets/javascript/base/_object.js`
- `assets/javascript/components/_accordion.js`
- `assets/javascript/components/_dropdown.js`
- `assets/javascript/components/_menu.js`
- `assets/javascript/components/_modals.js`
- `assets/javascript/components/_slides.js`
- `assets/javascript/components/_steps.js`
- `assets/javascript/components/_stepTabs.js`
- `assets/javascript/components/_notifications.js`
- `assets/javascript/functions/_formValidate.js`
- `assets/javascript/functions/_scrollY.js`
- `assets/javascript/patterns/_header.js`
- `assets/javascript/patterns/_cookieConsent.js`
- `assets/scss/index.scss`
- `assets/scss/base/*`
- `assets/scss/layout/*`
- `assets/scss/components/*`
- `assets/scss/patterns/*`
- `assets/scss/mixin/*`
- `templates/components/*`
- `templates/layout/*`
- `templates/patterns/*`

Patterns found:

- `pgs` is the main attribute: tokens are separated by spaces, for example `pgs="button modal-button"`.
- `assets/scss/index.scss` imports base, layout, components, and patterns; layouts/components/patterns are almost all scoped under `[pgs~=initP]`.
- The main markup must enable the library with `htmlBase initP`, and the body with base body tokens. Use `templates/demo.html` and `templates/layout/body.html` as the canonical references.
- Components use a root token and child tokens with a consistent prefix. Use `templates/components/` as the canonical markup source.

- Runtime states use `pgs-state`, for example `open`, `is-active`, `is-completed`, `is-locked`, `success`, `error`, `warning`, and `info`.
- Configurable options use `pgs-option`, with simple tokens or values inside square brackets. Prefer copying the current option syntax from the relevant template rather than duplicating examples in this guide.

- Naming is mostly camelCase for compound tokens (`menuHorizontal`, `buttonStrong`, `flexColumnElements`) and kebab-like for component sub-elements (`accordion-button`, `modal-dialog-content`, `cookieConsent-actionAccept`).
- JS modules export objects with `init` and/or `api`; `_imports.js` registers them with `pgs.registerModules` for direct `pgs.*` access.

## 4. SCSS Guidelines

Recommended imports in a project that consumes the library:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
@import "../../node_modules/mypgs/assets/scss/index.scss";
```

If you only need the mixins:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
```

Direct usage of the compiled CSS:

```js
import "mypgs/style.css";
```

SCSS rules:

- Use the existing custom properties, for example `--color-primary`, `--color-box`, `--color-text`, `--padding`, `--padding-page`, `--gap-texts`, `--gap-elements`, `--gap-sections`, `--border-radius`, `--border-radius-input`, `--border-complete`, `--box-shadow`, and `--focus-visible`.
- Use existing mixins and tokens instead of rewriting layouts: `flexColumn`, `flexRow`, `grid-*`, `section`, `container`, `card`, `button`, `form`.
- Configure dropdown placement with `pgs-option="position[side align]"`, for example `position[top left]`, `position[bottom right]`, or `position[left center]`; do not use a SCSS/CSS custom property for dropdown placement.
- Prefer overrides through custom properties on the component:

```scss
#dropdownMenuPrimary { //[pgs~="dropdown"]
  --dropdown-background: var(--color-box);
  --dropdown-padding: var(--padding-2);
  --dropdown-maxwidth: min(420px, 90vw);
}
```

- Avoid aggressive overrides of `padding`, `gap`, `display`, `position`, and `overflow` when they are already handled by the design system.
- You may customize colors, border-radius, borders, shadows, and visual details while keeping token consistency.
- If new reusable styles are needed, add them modularly in the correct group: `base`, `layout`, `components`, `patterns`, or `mixin`.
- If you add a new PGS component, keep the same contract: root token, child tokens, optional states in `pgs-state`, optional options in `pgs-option`.

Recommended:

```scss
#products .products-card {
    --card-background: var(--color-box);
    --button-background: var(--color-primary);
    border-radius: var(--border-radius)
  }
```

Allowed, but less recommended:

```scss
[pgs~="card"].products-card {
    --card-background: var(--color-box);
    --button-background: var(--color-primary);
    border-radius: var(--border-radius)
}
```

Avoid:

```scss
.products-card {
  padding: 37px;
  border-radius: 19px;
  background: #f8f8f8;
}
```

## 5. JS/TS Guidelines

Base import:

```js
import "mypgs";
```

Or, if you need to access the helper:

```js
import { pgs } from "mypgs";
```

The entrypoint automatically initializes the global `pgs` helper, dark mode, SVG object handling, accordion, dropdown, menu, modals, slides, steps, stepTabs, notifications, header, and cookie consent.

Available `pgs` helper:

```js
const modal = pgs(document).querySelector("modal");
pgs(modal).add("custom-token");
pgs(modal).remove("custom-token");
pgs(modal).toggle("custom-token", true);
pgs(modal).contains("modal");
pgs(modal).state.add("open");
pgs(modal).state.toggle("open", false);
pgs(modal).option.contains("history");
pgs(modal).option.getValueBrackets("containerID");
```

Recommended direct access:

```js
pgs.notification.toast.success("Saved");
pgs.modal.api(modalEl)?.open();
```

`assets/javascript/_imports.js` registers modules with `pgs.registerModules`:

```js
pgs.registerModules({
    notification: PGS_notification,
});
```

- `pgs.registerModules` exposes the module directly on `pgs`, for example `pgs.notification`.

Before using a module shortcut, verify the current key in `assets/javascript/_imports.js`. If `_imports.js` registers `{ notification: PGS_notification }`, the public shortcut is `pgs.notification`. Do not rely on a hardcoded shortcut list in this guide.

JS/TS rules:

- Prefer existing APIs and init functions before writing new functions.
- Do not duplicate existing helpers, modules, or services exposed through `pgs.*`.
- Initialization functions should accept a root when possible.
- Use `WeakMap` for instance APIs if you add components, as accordion, dropdown, menu, modals, slides, steps, and stepTabs do.
- Keep events and states consistent: visual states belong in `pgs-state`, not arbitrary classes.
- Do not rely on `.open` classes for PGS components when the component uses `pgs-state~="open"`.

Existing API example:

```js
const modalEl = pgs(document).querySelector("modal");

pgs.modal.api(modalEl)?.open();
```

## 6. Components and Markup

Use the templates as the single source of truth for component and layout markup. Do not copy full HTML examples into this guide; this avoids drift when templates change.

Canonical template references:

- Layouts: `templates/layout/body.html`, `templates/layout/flex.html`, `templates/layout/grid.html`, `templates/layout/pageShell.html`, `templates/layout/section.html`
- Components: `templates/components/accordion.html`, `templates/components/breadcumbs.html`, `templates/components/button.html`, `templates/components/card.html`, `templates/components/dropdown.html`, `templates/components/form.html`, `templates/components/logo.html`, `templates/components/menu.html`, `templates/components/modal.html`, `templates/components/notification.html`, `templates/components/searchbar.html`, `templates/components/slides.html`, `templates/components/stepTabs.html`, `templates/components/steps.html`, `templates/components/table.html`, `templates/components/tooltip.html`
- Patterns: `templates/patterns/cookieConsent.html`, `templates/patterns/footer.html`, `templates/patterns/header.html`
- Complete demo assembly. DO NOT use this for inspiration. It is only used to show all the modules: `templates/demo.html`

Before creating markup, open the relevant template and reuse its current structure, tokens, ARIA attributes, and `pgs-option` syntax.

To extend a component:

- keep the required root and child tokens;
- add a specific `pgs` token or a local class only for the variant;
- configure through custom properties or `pgs-option`;
- do not remove elements that JS looks up with `pgs(...).querySelector(...)`.

## 7. What NOT To Do

- Do not replace `mypgs` with custom solutions without a clear technical reason.
- Do not hardcode colors if variables or custom properties exist; always use `var(--color-primary)`, etc.
- Do not create duplicate components for buttons, forms, modals, dropdowns, slides, tabs, notifications, or menus.
- Do not duplicate open, close, state, or accessibility logic already handled by the modules.
- Do not make the code more complex than necessary.
- Do not invent APIs: if a method is not present in `assets/javascript/*` or in the `.d.ts` files, it must be verified or explicitly added.

## 8. Practical Examples

Recommended import in a project:

```js
import "mypgs";
import "mypgs/style.css";
```

Source SCSS import:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
@import "../../node_modules/mypgs/assets/scss/index.scss";
```

Recommended: use PGS layout tokens from `templates/layout/`.

Avoid: equivalent custom layout with ad hoc classes when a PGS layout token already exists.

Recommended: customize a button with variables.

```scss
#danger-action {
  --button-background: var(--color-error);
  --button-color: var(--color-whiteFixed);
}
```

Avoid: rewriting the whole button.

```scss
.danger-action {
  display: inline-flex;
  gap: 12px;
  padding: 14px 22px;
  border-radius: 999px;
  background: #ff6161;
}
```

Recommended: PGS state.

```js
const accordion = pgs(document).querySelector("accordion");
pgs(accordion).state.toggle("open", true);
```

Avoid: parallel class not read by the library.

```js
accordion.classList.add("open");
```

Recommended: use the notification API registered on `pgs`.

```js
pgs.notification.toast.success("Saved");
```

Avoid: creating a separate toast system outside `pgs.notification`.

## 9. Rules for New Features

Before developing a new feature:

- check `README.md`, `templates/`, `assets/scss/`, and `assets/javascript/`;
- search for existing tokens or APIs with `rg "featureName|pgs-token"`;
- verify whether `mypgs` already provides suitable components, helpers, mixins, or variables;
- use naming consistent with the existing project;
- clearly separate HTML structure, SCSS styling, and JS logic;
- write simple, modular, maintainable code;
- update this guide if you introduce an important new pattern.

For a new reusable component:

- create SCSS in `assets/scss/components/` or `assets/scss/patterns/`;
- import the file from `assets/scss/index.scss` in the correct block;
- create JS in `assets/javascript/components/` or `assets/javascript/patterns/` only if behavior is needed;
- export an object with `init` and/or `api` when the module needs a public API;
- register it in `assets/javascript/_imports.js` with `pgs.registerModules` if it must be available as `pgs.moduleName`;
- add a template in `templates/components/` or `templates/layout/`;
- update `README.md` and this guide if the usage changes.

Example for a new module:

```js
import { PGS_myNewComponent } from "./components/_myNewComponent.js";

pgs.registerModules({
    myNewComponent: PGS_myNewComponent,
});
```

## 10. Quick AI Checklist

- Did I check whether a suitable `pgs` token or component already exists?
- Did I consult `templates/` to copy the correct markup?
- Did I enable `htmlBase initP` and the base body tokens when the full library is needed?
- Am I using PGS CSS variables and mixins instead of hardcoded values?
- Am I using `pgs-state` for runtime states and `pgs-option` for configuration?
- Am I avoiding custom classes when a PGS token is enough?
- Did I verify JS APIs in the source or TypeScript declarations?
- Did I keep markup, style, and logic separate?
- Did I avoid direct edits to `dist/` as the source of truth?
- If I introduced a new pattern, did I update this guide?
