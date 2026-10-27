# Migrating from `master` to this version

`master` is the published 4.7.1 (2026-08-19). This guide is the net difference between that version and
this one (5.0.0), written for whoever updates a project that consumes `mypgs` (a theme, a plugin, a site): for each
change it says what the project contains today (the "master" column, exactly what `master` shipped) and what
to write instead (the "now" column). Names from the work in between never appear: a name in a "master"
column is one that `master` really had, and a name in a "now" column is one this version really has.

## How to use it

1. **Run the sweeps.** Every part ends with a "Sweep" of `grep` lines, one per rename or removal, each with
   what to do with a hit. Start with the sweeps of [Core](#part-1-core-attribute-grammar-javascript-packaging)
   (`pgs-option`, the moved JavaScript API) and go on with the part of each component the project uses.
   Most hits are mechanical.
2. **Read the "Same name, new meaning" table of each part you use.** Those are the changes that break nothing
   loudly: the name survived and the behavior or the look moved under it, so nothing errors and the page
   just looks wrong. A grep cannot find all of them; the tables say what to check.
3. **Open the pages.** The palette, the link color, the focus ring, the radii, the spacing scale, the borders
   and the hover look are different by default ([Foundation](#part-2-foundation-tokens-palette-base-icons)),
   so every page looks different even where no markup had to change.

Each part has the same sections:

| section | what it holds |
| --- | --- |
| A. Same name, new meaning | silent changes: same name, different behavior or look |
| B. Renames and removals | tokens, flags, states, data keys, generated markup: master form, current form |
| C. Custom properties | renamed, removed, and kept with a different default |
| D. Sass | mixins, variables and partials a project imports |
| E. JavaScript | API, events, states, lifecycle |
| F. New | opt-in features worth knowing about |
| G. Sweep | `grep` lines to find what to migrate |

Reading the tables: a flag is written inside the bracket of the component that owns it, `pgs="button['btnStrong']"`
(on `master`: `pgs="button" pgs-option="buttonStrong"`). `(none)` in a "master" column means the thing is new.
`-> see` points to the part that owns the item.

## The changes that reach almost every project

1. **`pgs-option` is gone.** A boolean flag goes into the bracket of the component that owns it, a
   `key[payload]` value into the new `pgs-data` attribute, and most flags took a short prefix of their
   component on the way (`buttonStrong` is `btnStrong`, `dropdownHover` is `drpHover`,
   `marginTexts` is `mgTexts`). Project CSS selectors, PHP templates and scripts that build `pgs` strings
   change with it. See [Core](#part-1-core-attribute-grammar-javascript-packaging).
2. **Utility tokens are brackets.** `bgPrimary` is `background['bgPrimary']`, `colorPrimary` is
   `textColor['txtPrimary']`, `brPrimary` is `borderColor['bdPrimary']`, margins, paddings, overflow,
   position and the rest follow. See [Utilities](#part-3-utilities).
3. **`<body>` needs its tokens in a bracket**, `body['bodyBase' 'bodyImg' 'bodyText' 'bodyHeading']`; the bare
   names match nothing and the page silently loses its background, text, image and heading rules. See
   [Foundation](#part-2-foundation-tokens-palette-base-icons).
4. **Layout primitives changed meaning.** `flexRow` and `flexColumn` are `flex['row']` and `flex['column']`,
   a bare `flex` is only `display: flex`, a `section` is no longer a flex column with a gap, a bare
   `<section>` or `<aside>` is no longer a query container, the header no longer hides on scroll unless
   `headerScroll` is written and its buttons need `btnForHeader`. See [Layout](#part-4-layout).
5. **`pgs="form"` styles nothing.** Every control, label, legend, fieldset and submit button needs its own
   token. See [Buttons and forms](#part-5-buttons-and-forms).
6. **Buttons.** `buttonStrong`-style options are `button['btnStrong']`-style flags, the hover and focus
   look changed, `twoState` is `button['btnTwoState']`, and the links of a `menu` are no longer styled by
   the menu: each needs `button['btnTransparent']`. See [Buttons and forms](#part-5-buttons-and-forms) and
   [Overlays and feedback](#part-6-overlays-and-feedback).
7. **Icons.** The library no longer draws or themes Font Awesome. `pgs="icon"` is the glyph itself, 13 glyphs
   are built in, and every other one comes from the separate `@marcix/myicons` pack loaded after `mypgs`; a missing
   glyph draws nothing and warns about nothing. The theme switch holds one icon per theme. See
   [Core](#part-1-core-attribute-grammar-javascript-packaging) and [Foundation](#part-2-foundation-tokens-palette-base-icons).
8. **The defaults look different.** New palette, darker link color in light mode, links underlined in
   running text, a focus ring with no offset, smaller radii, thinner borders, a new spacing scale, a softer
   hover. See [Foundation](#part-2-foundation-tokens-palette-base-icons).
9. **Removed, with nothing in the library to replace them:** the tooltip (every dropdown has an arrow
   now), the `twoState` token, the cookie consent (it moved to `PGS_theme`), `pgs.scrollHorizontal`, the
   legacy notification trigger and `toastExe`, the shared hover system, the `required` token and the
   breadcrumb separator `<span>`, the `card` legacy geometry.
10. **JavaScript.** `pgs.init` and `pgs.formValidate` live under `pgs.helper`, the events carry the `pgs:`
    prefix and bubble, every instance has `destroy()` and `refresh()`, messages are English, and
    `pgs(el).option.add("btnStrong")` is not the new spelling of the old call. See
    [Core](#part-1-core-attribute-grammar-javascript-packaging).
11. **Components that behave differently under the same name:** accordions need `accordionContainer` to close
    each other, a card image needs `card-img`, a clickable card is the `<a>` itself, the slides arrows sit
    above the slides, alerts, toasts and notifications are one card, the side modals are no longer 400px.
    See [Content components](#part-7-content-components) and [Overlays and feedback](#part-6-overlays-and-feedback).

## Parts

1. [Core: attribute grammar, JavaScript, packaging](#part-1-core-attribute-grammar-javascript-packaging)
2. [Foundation: tokens, palette, base, icons](#part-2-foundation-tokens-palette-base-icons)
3. [Utilities](#part-3-utilities)
4. [Layout](#part-4-layout)
5. [Buttons and forms](#part-5-buttons-and-forms)
6. [Overlays and feedback](#part-6-overlays-and-feedback)
7. [Content components](#part-7-content-components)

## Part 1: Core: attribute grammar, JavaScript, packaging

Per-component flag/token/state renames are NOT here: they belong to [Foundation](#part-2-foundation-tokens-palette-base-icons), [Utilities](#part-3-utilities), [Layout](#part-4-layout), [Buttons and forms](#part-5-buttons-and-forms), [Overlays and feedback](#part-6-overlays-and-feedback), [Content components](#part-7-content-components).

### Net mechanical rule (state once, applies everywhere)

1. `pgs-option` no longer exists. Nothing reads it (JS) and nothing styles it (CSS). Every value that was in `pgs-option` goes to one of two places:
   - a boolean flag, CSS-facing or JS-only: into the bracket of the component root that owns it, in single quotes, in the `pgs` attribute: `pgs="flex['column' 'wrap' 'flexCenter']"`, `pgs="button['btnStrong']"`. The flag name itself usually changed too (prefix per component: `btn`, `acc`, `drp`, `mg`, `pd`, `bd`, `otl`, ...): look it up in the owning area's sheet.
   - a genuine `key[payload]` value: `pgs-data="key[payload]"` (new attribute, master never had it). The key keeps the component prefix, the payload syntax is unchanged (nested `[...]` and JSON strings allowed). `pgs-data` holds ONLY `key[payload]`, never a bare flag. One exception: `tabsHistory`, bare or with payload, lives in `pgs-data`.
2. A component root that carries flags is written `root['flag' 'flag2']`; a root with no flags stays bare (`pgs="button"`). Several roots on one element keep separate brackets: `pgs="section flex['column'] textBlock"`. Child tokens (`accordion-button`, `modal-dialog-content`, ...) never carry a bracket. Utility tokens listed under `@pgs` (not under "PGS Options") stay bare.
3. `pgs-state` is unchanged in form (`pgs-state="open active"`, space separated, no brackets).
4. A flag written bare (`pgs="button btnStrong"`) matches nothing: CSS only reads `'flag'` inside a bracket.
5. Consumer CSS selectors:
   - root token with flags possible: master `[pgs~="x"]` -> `:is([pgs~="x"], [pgs*="x["])` (in SCSS source the library writes `[pgs*="x\5B"]`; `\5B` and a literal `[` inside the quotes compile to the same CSS). `[pgs~="x"]` alone does NOT match `pgs="x['flag']"`.
   - flag: master `[pgs-option~="flag"]` -> `[pgs*="'flag'"]`, ideally scoped to its root and in `:where()`: `:is([pgs~="button"], [pgs*="button["]):where([pgs*="'btnStrong'"])`. The quotes are part of the match, so `'column'` never hits `'columnReverse'`.
   - payload: master `[pgs-option*="key["]` -> `[pgs-data*="key["]`.
   - child token: unchanged, `[pgs~="accordion-button"]`.
   - state: unchanged, `[pgs-state~="open"]`.
6. PHP / templates / JS that build `pgs` strings: write the attribute with double quotes and the flags with single quotes (`'<div pgs="flex[\'column\']">'` in a single-quoted PHP string, or `` `pgs="flex['column']"` `` in a JS template). Code that splits the `pgs` value on spaces breaks (`flex['column' 'wrap']` contains spaces): read it with `pgs(el).contains/option.contains/data.getValueBrackets` instead of string splitting. In JSX use `pgsHtml="flex['column']"` (Vite plugin turns it into `pgs`). Hand-written kses/sanitizer allowlists that named `pgs-option` must name `pgs-data` instead.
7. JS: `pgs(el).option.add("btnStrong")` is NOT the new spelling of the old call. Use `pgs(el).add("button['btnStrong']")` (see the `pgs(el).option.add("flag")` row of section A).

### A. Same name, new meaning (silent)

| name | master | now |
| --- | --- | --- |
| `pgs` attribute value | flat space-separated tokens; options in a second attribute | a component token may carry `['flag' ...]`; flags live there; whitespace inside the bracket |
| `pgs(el).option` | read/write the tokens of `pgs-option` | reads/writes the FLAGS inside `pgs` (bare or in a bracket); never `pgs-data`. `.querySelectorAll` returns an Array, not a NodeList |
| `pgs(el).option.add("flag")` | appended the token to `pgs-option` | derives the owner from the lowercase run before the first uppercase letter or `-`; merges into that root's bracket only when that run equals the root's full name (`cardMini`->`card`, `boxMini`, `badgeDot`, `menuVertical`, `icon-moon`, `slides*`, `header*`, `logo*`). Otherwise writes a BARE token that no CSS rule reads and raises no error (`option.add("btnStrong")` on `pgs="button"` gives `pgs="button btnStrong"`; `option.add("column")` on `flex` gives `flex column`). Use `pgs(el).add("root['flag']")` |
| `pgs(el).contains(x)` / `.remove(x)` / `.toggle(x)` / `.add(x)` | exact whitespace token | compared by KEY (text before `[`): `contains("button")` is true for `button['btnMini']`; `contains("btnMini")` is false (use `.option.contains`); `remove("flex")` deletes `flex['column' ...]` with its whole bracket; `add("flex['gapTexts']")` merges into an existing `flex[...]` (set union, no duplicate root); `add("flex")` on `flex['column']` keeps the flags |
| `pgs(root).querySelector(All)` | `[pgs~="x"]` | `:is([pgs~="x"], [pgs*="x["])`: also finds roots written with a bracket; value is quote-escaped; `pgs(el).closest(x)` is new |
| `pgs(el).remove(last)`, `pgs(el).state.remove(last)` | left `pgs=""` / `pgs-state=""` | removes the attribute when nothing is left (`[pgs-state]` no longer matches an emptied element) |
| `require("mypgs")`, `dist/javascript/index.js` | non-UMD IIFE: exported nothing, and THREW under Node (`ReferenceError: localStorage is not defined`) | UMD (`library: { name: "mypgs", type: "umd" }`, `globalObject: globalThis`): `require("mypgs")` returns `{ pgs }`, loads without a DOM; a plain `<script>` publishes `globalThis.mypgs` and `globalThis.pgs` |
| `pgs.<module>.init(root)` on accordion, menu, steps, stepTabs, summary, notification, toast | looked only INSIDE `root`: `pgs.init(el)` on a freshly inserted `pgs="accordion"` element did nothing | the root element itself is initialized too, like every other module (`pgs.helper.roots(root, token)`) |
| `refresh()` on an instance | different per module: search re-ran the query and returned a Promise, summary re-measured (void), modal/slides/accordion/menu/stepTabs/dropdown/steps re-ran their init | one meaning: `destroy()` then re-initialize that element, returns the NEW instance (search's old `refresh()` is `search()`) |
| `destroy()` on an instance | existed on modal, slides, search only | every component instance (accordion, dropdown, menu, modal, pageNav, range, search, slides, steps, stepTabs, summary, tabs, header, navSmart) has `element`, `destroy()`, `refresh()`; destroy removes listeners/observers, keeps generated markup |
| every `pgs:*` event | some bubbled, some did not, `detail` had no common field | all bubble (`bubbles: true`), `detail.element` is always the element the event was dispatched on, plus module fields; only `pgs:alert:buttonClick` is cancelable. A listener on an ancestor now also hears events of nested components. `pgs:search:error` detail gains `element`; `pgs:svg:changeColor` was dispatched on `document` (not bubbling), now on `document.documentElement` and bubbles (a `window` listener now hears it) |
| specificity of component CSS | most rules `[pgs~=x] [pgs~=child]`, `[pgs~=x][pgs-option~=flag]` = (0,2,0) | root in `:is(...)`, children, tags and flags in `:where()` = (0,1,0): one class written by a project now beats them where it used to tie or lose; a project rule that relied on losing to a library rule may now win |
| `new pgs.formValidate(form)` twice on the same form | stacked a second click listener and a second set of `validator()` callbacks | the last one built wins and the previous instance is destroyed; `validate()` no longer attaches listeners, one click listener on the form clears errors |
| error / warning text | Italian or mixed ("pgs(root): root richiesto", `Rule must be a function`), several plain `Error` | English, one voice `pgs.<module>.<method>(): <what>`; invalid argument to a public method is always a `TypeError` (`pgs.helper.invalid`), invalid markup or a skippable request is a `console.warn` (`pgs.helper.warn`). Code matching message text breaks |
| `plugins/vite-plugin-pgs` | `code.replace(/\bpgsHtml(\s*)=/g, "pgs$1=")` over every .jsx/.tsx, so `props.pgsHtml = x`, `{ pgsHtml = "" }` defaults and `a == pgsHtml` were rewritten too | rewrites only where `pgsHtml` is written as a JSX attribute (after a tag name, a closing quote or `}`); skips member access, `==`/`=>`, declarations and destructuring defaults; ignores `?query` in the module id |
| npm package contents | no `files` field: published `demo/`, `scripts/`, `.vscode/`, `pgs-html-suggestions.vsix`, `webpack.config.js` (193 files, 5.4 MB) | `files` whitelist: `assets/` (SCSS and JavaScript sources), `dist/`, `plugins/`, `reference/html/` and `reference/pgs-map.json`, `AGENTS.md`, `AGENTS-USAGE.md`, `README.md`, `migration.md` (148 files, 0.56 MB). Not published any more: `docs/` (the generated pages of `reference/html`, still linked from the README and readable in the repository), `AGENTS-DEVELOPMENT.md`, `site/`, `scripts/`, `tools/`, `webpack.config.js`, `pgs-html-suggestions.vsix` |

### B. Renames and removals (net)

#### B1. Attribute grammar

| master | now | note |
| --- | --- | --- |
| attribute `pgs-option="a b"` | gone | boolean -> `pgs="root['a' 'b']"`; `key[payload]` -> `pgs-data` (rule 1 above) |
| `pgs="x" pgs-option="flag"` | `pgs="x['flag']"` | flag goes in the bracket of the root that owns it, not of "the first token" |
| `pgs="x" pgs-option="key[payload]"` | `pgs="x" pgs-data="key[payload]"` | several: `pgs-data="k1[a] k2[b]"`, space separated |
| `pgs-option="tabsHistory"` / `tabsHistory[name]` | `pgs-data="tabsHistory"` / `pgs-data="tabsHistory[name]"` | the one flag that stays in `pgs-data`, bare or with payload; written from JS with `pgs(el).data.value = "tabsHistory"` |
| JS-only boolean in `pgs-option` (e.g. `headerScroll`) | inside the bracket in `pgs`, read with `pgs(el).option.contains("headerScroll")` | NOT `pgs-data` |
| `[pgs-option~="flag"]`, `[pgs-option*="key["]` in project CSS/JS | `[pgs*="'flag'"]`, `[pgs-data*="key["]` | rule 5 |
| `[pgs~="root"]` for a root that can take flags | `:is([pgs~="root"], [pgs*="root["])` | sweep G11 lists the 73 roots that take flags (`reference/pgs-map.json`) |

#### B2. pgs-data key renames (the payload keys of master `pgs-option`; component owners may repeat them)

| master `pgs-option` key | now `pgs-data` key | note |
| --- | --- | --- |
| `containerID[..]` | `modalContainerID[..]` | -> see [Overlays and feedback](#part-6-overlays-and-feedback) |
| `containerPGS[..]` | `modalContainerPGS[..]` | -> see [Overlays and feedback](#part-6-overlays-and-feedback) |
| `position[side align]` | `dropdownPosition[side align]` | -> see [Overlays and feedback](#part-6-overlays-and-feedback) |
| `message[..]` | `formMessage[..]` | field-level message, -> see [Buttons and forms](#part-5-buttons-and-forms) |
| `messageTitle[..]` | `formMessageTitle[..]` | -> see [Buttons and forms](#part-5-buttons-and-forms) |
| `fieldErrorTitle[..]` `fieldError[..]` `fieldsError[..]` `successTitle[..]` `success[..]` | `formFieldErrorTitle[..]` `formFieldError[..]` `formFieldsError[..]` `formSuccessTitle[..]` `formSuccess[..]` | on the `<form>`; same keys are the `options.message` keys of `new pgs.helper.formValidate` (E) |
| `tabIcon[..]` | `stepTabsIcon[..]` | -> see [Content components](#part-7-content-components) |
| `showMore[..]` `showLess[..]` | `summaryShowMore[..]` `summaryShowLess[..]` | -> see [Content components](#part-7-content-components) |
| `notification[{json}]`, `toast[{json}]` | same key, now in `pgs-data` | -> see [Overlays and feedback](#part-6-overlays-and-feedback) |
| `cookieConsent[..]` | gone | cookieConsent left the library (B3) |
| `headerCompactFrom[..]` (new in `pgs-data`, no master equivalent) | | -> see [Layout](#part-4-layout) |

#### B3. JavaScript API

| master | now | note |
| --- | --- | --- |
| `pgs(el).option.getValueBrackets(k)` | `pgs(el).data.getValueBrackets(k)` | `.option` has no such method now: calling it throws `TypeError ... is not a function` |
| `pgs(el).option.setValueBrackets(k, v)` | `pgs(el).data.setValueBrackets(k, v)` | |
| `pgs(el).option.value` (get/set the whole `pgs-option`) | `pgs(el).data.value` for payloads (assigning `null` removes the attribute); `pgs(el).value` for the `pgs` attribute | `.option.value` is now `undefined` |
| `pgs(el).option.add("flag")` | `pgs(el).add("root['flag']")` | A3 |
| `pgs(el).option.remove/toggle/contains(key)` | same calls | now act on `pgs`; `contains`/`remove` find a flag bare or inside any bracket |
| `pgs.init(root)` | `pgs.helper.init(root)` | walks every registered module with `init(root)` (insertion order of `registerModules`), skipping the `helper` key; returns `root`; throws `TypeError` unless `root` is a Document or Element |
| `new pgs.formValidate(form, opts)` | `new pgs.helper.formValidate(form, opts)` | `opts.message` keys renamed like B2 (`fieldErrorTitle` -> `formFieldErrorTitle`, ...). Unknown key or non-string value: `TypeError`. Adds `instance.destroy()` |
| `pgs.import(...names)` -> `{ PGS_init, PGS_formValidate }` | removed | use `pgs.helper.init`, `pgs.helper.formValidate` |
| `pgs.registerImport(...modules)` | removed | no replacement; use `pgs.registerModules({ name: module })` |
| `pgs.scrollHorizontal(el, speed)` (returned a remover function) | gone | write your own `wheel` listener; the Slides flag that used it went too -> see [Content components](#part-7-content-components) |
| `pgs.cookieConsent`, `cookieConsent[..]`, `cookieConsent-*` tokens, `reference/html/patterns/cookieConsent.html`, `docs/patterns/cookieConsent.md` | gone | moved to PGS_theme; a project must carry its own -> see [Content components](#part-7-content-components) |
| `pgs.legacyNotification` / `<div pgs="hidden notificationTrigger" pgs-option='notification[{"element":"toast"}]'>` | gone | -> see [Overlays and feedback](#part-6-overlays-and-feedback) |
| `pgs.alert.{error,success,info,warning}` | adds `neutral` (also on toast, notification) | -> see [Overlays and feedback](#part-6-overlays-and-feedback) |
| `pgs.registerModules({ name })` | same, but `name === "helper"` is reserved and a clash throws `TypeError` `"name" is already defined on pgs` | |
| `import "mypgs"` entry ordering: `index.js` imported `_object.js`, `_header.js`, `_cookieConsent.js` one by one | `index.js` = `export { pgs }` + `import "./_imports.js"`; `_imports.js` imports and registers every module | deep imports of removed files fail, see D |

Module registry (`pgs.<name>`), net:

| master | now |
| --- | --- |
| `init`, `formValidate`, `scrollHorizontal`, `cookieConsent`, `legacyNotification` | removed from `pgs` (B3 above) |
| `darkmode`, `svg`, `accordion`, `alert`, `dropdown`, `menu`, `modal`, `notification`, `toast`, `search`, `slides`, `stepTabs`, `steps`, `summary` | kept |
| (none) | new: `helper`, `pageNav`, `header`, `navSmart`, `range`, `tabs` |

#### B4. Events (names and shapes; the component areas own the behavior)

| master | now | note |
| --- | --- | --- |
| `modal:open`, `modal:close` (no prefix, no bubbling, no detail, fired on wrapper and on `<dialog>`) | `pgs:modal:open`, `pgs:modal:close`, detail `{ element, modal, dialog }` | fires on the `<dialog>` and bubbles; if the dialog was moved out of its wrapper the wrapper gets its own copy (each ancestor hears it once) -> see [Overlays and feedback](#part-6-overlays-and-feedback) |
| `stepTabs:change` (no prefix, no bubbling), detail `{ current, total }` | `pgs:stepTabs:change`, detail `{ element, current, total }` | -> see [Content components](#part-7-content-components) |
| `pgs:notification:close`, detail `{ id, type, title, description }` | `pgs:alert:close`, detail `{ element, id, type, title, description }` | one event for alert, toast and notification cards |
| `pgs:notification:buttonClick` (cancelable) | `pgs:alert:buttonClick` (cancelable), detail `{ element, id, buttonId, type, title, description, link }` | |
| `pgs:notification:deleteAll`, detail `{ ids }` | gone | `pgs.notification.deleteAll()` closes each card: one `pgs:alert:close` each |
| `pgs:search:select`, `pgs:search:error` | same names | `error` detail `{ element, error, query }` |
| `pgs:svg:changeColor` | same name | detail `{ element, isDarkMode }`, target `<html>` |
| (none) | new: `pgs:tabs:change` `{ element, current, tab, panel }`, `pgs:pageNav:change` `{ element, panel, items }` | typed in `dist/index.d.ts` `PgsEventMap` |

#### B5. Packaging, files and layout a consumer sees

| master | now | note |
| --- | --- | --- |
| `package.json` without `files` | `files` whitelist (A, last row) | anything a project read from `node_modules/mypgs/{demo,scripts,webpack.config.js,.vscode,pgs-html-suggestions.vsix,docs}` is gone from the tarball |
| `demo/demo.html`, `demo.css`, `demo.js` | gone from the package | the demo site is built from the repository and is not published; the reference pages are in `reference/html/` |
| `reference/react/**` (24 `.jsx` examples) | gone | use `reference/html/**` and write `pgsHtml="..."` in JSX (plugin unchanged in purpose) |
| `reference/html/layout/body.html` | `reference/html/base/body.html` (title "Html and Body") | |
| `reference/html/layout/responsive.html` | `reference/html/layout/breakpoints.html`, plus new `layout/flex.html`, `layout/grid.html`, `layout/size.html` | -> see [Layout](#part-4-layout) |
| `reference/html/components/breadcumbs.html` | `reference/html/components/breadcrumb.html` | spelling fix; same for `docs/components/breadcumbs.md` -> `breadcrumb.md` |
| `reference/html/components/tooltip.html`, `docs/components/tooltip.md` | gone | -> see [Content components](#part-7-content-components) |
| `reference/html/patterns/cookieConsent.html`, `docs/patterns/cookieConsent.md` | gone | B3 |
| (none) | new reference pages: `base/{border,darkmode,general,svg,typography}`, `components/{formControls,icon,pageNav,tabs}`, `guides/welcome`, `helper/{pgs,init,formValidate,helper}`, `layout/{navSmart}` | |
| `docs/componenti-e-markup.md`, `convenzioni.md`, `export-e-sviluppo.md`, `utilizzo-css-scss.md` (Italian guides) | gone | replaced by `README.md`, `AGENTS-USAGE.md` and the generated `docs/<group>/<page>.md` (English, one per reference page, header "Automatically generated from reference/html/...") |
| `docs/helper/README.md` | `docs/helper/helper.md` | and new `docs/helper/pgs.md`, `init.md`, `formValidate.md`; `docs/helper/scrollHorizontal.md` gone |
| `docs/layout/body.md`, `docs/layout/responsive.md` | `docs/base/body.md`, `docs/layout/breakpoints.md` (+ `flex`, `grid`, `size`) | |
| `pgs-html-suggestions.vsix` in the package root (5.1 MB) | not in the package | the VS Code extension now reads `reference/pgs-map.json`; see F |
| `AGENTS.md`, `AGENTS-USAGE.md` | rewritten for brackets / `pgs-data` / `pgs.helper` / `@marcix/myicons`; `AGENTS.md` gets one word changed (`pgs-option` -> `pgs-data`) | consumer rules now say: flags in brackets, `pgs-data` for payloads, one JS entry point per page (second bundle must read `globalThis.pgs` / use `externals`), icons outside the core 13 need `@marcix/myicons` |

#### B6. Icon pack split and Font Awesome (packaging only; the `icon` component is [Foundation](#part-2-foundation-tokens-palette-base-icons))

| master | now | note |
| --- | --- | --- |
| mypgs examples, generated markup and `demo.html` (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css`) assumed Font Awesome was loaded: `<i class="fa-solid fa-chevron-down">`, `fa-duotone fa-solid fa-bell`, `fa-search`, `fa-xmark`, ... | no Font Awesome anywhere (0 hits for `fa-*` / "font awesome" in N assets, reference, docs, README, site) | a project that kept FA only because mypgs examples used it can drop it; a project that uses FA for its OWN icons keeps loading it itself and writes `<i class="fa-solid fa-x">` as before |
| markup the library BUILT with FA classes (M/assets/javascript): modal close `fa-close`, slides arrows `fa-arrow-left/right`, alert/toast/notification marks `fa-circle-xmark/-check/-info`, `fa-triangle-exclamation`, stepTabs dot `fa-circle` (+ `tabIcon[fa-..]` payload), dark-mode toggle swapping `fa-moon`/`fa-sun` classes, cookieConsent `fa-cookie-bite`/`fa-sliders` | built as `<i pgs="icon['icon-close']">`, `icon-chevronDown` (rotated), `icon-circleXmark`, `icon-circleCheck`, `icon-circleInfo`, `icon-triangleExclamation`, `icon-circle`; the theme switch draws no icon itself and holds one per theme | project CSS targeting `i.fa-*` inside library components no longer matches -> see [Overlays and feedback](#part-6-overlays-and-feedback), [Content components](#part-7-content-components), [Foundation](#part-2-foundation-tokens-palette-base-icons) |
| `[pgs~=footer] [pgs~=toggleDarkmode]:has(i.fa-moon)::after` rules in the library CSS | gone | -> see [Foundation](#part-2-foundation-tokens-palette-base-icons) |
| every glyph came from FA | mypgs carries only 13 glyphs inside its stylesheet: `chevronDown`, `check`, `close`, `magnifyingGlass`, `circle`, `circleXmark`, `circleCheck`, `circleInfo`, `triangleExclamation`, `moon`, `sun`, `hamburger`, `hamburgerTwo` (`--icon-glyph-*` in `dist/css/index.css`). Written `pgs="icon['icon-NAME']"` | every other glyph needs the separate `@marcix/myicons` pack; without it the element draws NOTHING and nothing warns |

What a consumer loads for the other glyphs: the separate `@marcix/myicons` icon pack (repository `Marcix25/myIcons`; 284 glyphs, each an `svg/icon-<name>.svg`). It is not a dependency or a peer dependency of mypgs, so install it yourself: `npm install @marcix/myicons`. Load its `dist/icons.min.css` (or `dist/icons.css`) **after** the mypgs stylesheet; it also contains the 13 core glyphs, so loading it alone never leaves a glyph out, and the order does not change the drawing:

```html
<link rel="stylesheet" href="node_modules/mypgs/dist/css/index.min.css">
<link rel="stylesheet" href="node_modules/@marcix/myicons/dist/icons.min.css">
<i pgs="icon['icon-star']"></i>
<i pgs="icon['iconLarge' 'icon-heart']"></i>
```

SCSS route: `@use "@marcix/myicons/scss"` emits the same CSS; `@use "@marcix/myicons/scss/glyphs" as pack; @use "@marcix/myicons/scss/icons" as icons; @include icons.icons((cookie: pack.$icon-cookie))` builds a stylesheet of only the glyphs wanted. Custom glyph: an SVG named `icon-<camelCase>.svg` in `myIcons/svg`, `npm run build` there.

Font Awesome name -> @marcix/myicons glyph, for the names the master examples used (all verified to exist in `myIcons/svg`; core = already inside mypgs): `chevron-down` -> `icon-chevronDown` (core), `search` -> `icon-magnifyingGlass` (core), `xmark`/`close` -> `icon-close` (core), `check` -> `icon-check` (core), `moon` -> `icon-moon` (core), `sun` -> `icon-sun` (core), `circle-info`/`info-circle` -> `icon-circleInfo` (core), `triangle-exclamation` -> `icon-triangleExclamation` (core), `arrow-left` -> `icon-arrowLeft`, `arrow-right` -> `icon-arrowRight`, `star` -> `icon-star`, `heart` -> `icon-heart`, `bell` -> `icon-bell`, `gear` -> `icon-gear`, `house` -> `icon-home`, `share` -> `icon-share`, `paper-plane` -> `icon-send`, `floppy-disk` -> `icon-save`, `circle-question` -> `icon-circleQuestion`, `arrow-up-right-from-square` -> `icon-externalLink`, `cookie-bite` -> `icon-cookie`, `layer-group` -> `icon-layers`, `store` -> `icon-store`. No @marcix/myicons glyph with that meaning: `dragon`, `dove`, `crow`, `fire`, `bread-slice-butter`, `window-maximize`, `list-check`.

### C. Custom properties written by JavaScript (generic contract; owners repeat their own)

Every property a module writes at runtime now starts with `_` ("read it, never set it"). Net renames:

| master | now |
| --- | --- |
| `--heightOfHeader`, `--heightOfHeaderScroll` | `--_header-height`, `--_header-heightScroll` (also `--_navSmart-height`, `--_navSmart-heightScroll` new) |
| `--dropdown-left`, `--dropdown-top` | `--_dropdown-left`, `--_dropdown-top` (new `--_dropdown-arrowLeft`, `--_dropdown-arrowTop`) |
| `--notification-timeout` | `--_alert-timeout` |
| `--visible-percent` | `--_slides-visiblePercent` (new `--_slides-height`) |
| `--summary-content-max-height` | `--_summary-content-height` |

Removed without replacement: none. New JS-written (no master equivalent): `--_modal-drag-progress`, `--_modal-drag-y`, `--_modal-zoom-scaleX/-scaleY/-x/-y`, `--_range-progress`. Verified with `grep setProperty` over M and N assets/javascript. A project that SETS one of these (e.g. `--_header-height: 75px` as a fallback before JS measures) is already the pattern in PGS_theme children.

### D. Sass

Entry points are unchanged: `assets/scss/index.scss` (the whole library, `meta.load-css`) and `assets/scss/mixin/mixin.scss` (the `@forward` of every mixin partial). A project that only uses those two paths needs no change here. Mixin/variable NAMES -> see the owning areas.

Partials a project may have imported or forwarded by path (net, M -> N):

| master | now |
| --- | --- |
| `components/_modals.scss` | `components/_modal.scss` |
| `components/_breadcumbs.scss` | `components/_breadcrumb.scss` |
| `components/_tooltip.scss`, `patterns/_cookieConsent.scss` (+ the `patterns/` folder) | gone |
| `layout/_layout.scss`, `layout/_responsive.scss` | gone; split into `layout/_section.scss`, `_flex.scss`, `_grid.scss`, `_flexGrid.scss`, `_breakpoints.scss`, `_size.scss` -> see [Layout](#part-4-layout) |
| `base/_html.scss`, `base/_heading.scss` | gone; new `base/_typography.scss`, `_zIndex.scss`, `_darkmode.scss`, `_border.scss` -> see [Foundation](#part-2-foundation-tokens-palette-base-icons) |
| `mixin/_mx-base.scss` | gone: `h1..h5`, `heading` -> `_mx-typography.scss` (adds `$h6`/`h6`), `list` -> `_mx-elements.scss`, `textarea` -> `_mx-form.scss`; `iconSvgBase64` gone (`svgBase64` is new) |
| `mixin/_mx-card.scss` | gone: `box` -> `_mx-box.scss`; `card` mixin and `_cardContent*`, `_selectorLink*` gone |
| `mixin/_mx-hover.scss` | gone: `hover`, `_hoverColor`, `_hoverContent1` have no equivalent (`box`, `button`, `card` carry a plain CSS hover; `boxHover` is new in `_mx-box.scss`) |
| (none) | new: `components/_icon.scss`, `_formControls.scss`, `_pageNav.scss`, `_tabs.scss`, `layout/_navSmart.scss`, `mixin/_mx-icons.scss` (the core glyph data, generated: do not edit), `_mx-elements.scss`, `_mx-typography.scss`, `_mx-box.scss` |
| `index.scss` started with `@use "./mixin/mixin" as *;` | line removed (no consumer effect) |


In your own SCSS, selectors on library tokens follow rule 5; write the bracket as `[pgs*="x["]` or `[pgs*="x\5B"]` (identical output).

### E. JavaScript

Entry and bundle
- `import "mypgs"` runs every module on import, publishes `globalThis.pgs` (`??=`) and `globalThis.mypgs = { pgs }` (`??=`: an already published copy is kept, never replaced). `import { pgs } from "mypgs"` unchanged; `exports["."]`: `import` -> `./assets/javascript/index.js` (un-bundled ESM source, all relative imports now carry `.js`; master's `_menu.js` imported `"./_dropdown"` with no extension and failed in native ESM), `default` -> `./dist/javascript/index.js` (UMD, now exports `{ pgs }`); `./style.css`, `./style.min.css`, `./vite-plugin-pgs` unchanged; `main`, `module`, `types`, `style` unchanged.
- Second bundle on the same page: do not import `mypgs` again (each import re-runs all module side effects). Webpack: `externals: { mypgs: "mypgs" }` resolves `import ... from "mypgs"` to `globalThis.mypgs`; a shared helper can read the ambient `pgs`. (PGS_theme child themes already do this.) master had no `globalThis.mypgs`.
- SSR / non-DOM: importing and `require`-ing the bundle no longer touches `document`/`localStorage` at load (`pgs.helper.onDocumentReady(cb)` is a no-op without a document, `watchDocument` returns `null`, `localStorage` access is in try/catch). `pgs.helper.init(root)` still needs a real Document or Element.

`pgs(root)` helper
- `root` must support `querySelector/querySelectorAll`, else `TypeError` ("pgs.pgs(): root is required" / "root must support querySelector/querySelectorAll"). On a Document only `querySelector(All)` exist; `add/remove/toggle/contains/closest/value` throw `TypeError` ("... is available on an Element only"), `.state`/`.option`/`.data` are `undefined`.
- Instance (Element): `querySelector`, `querySelectorAll`, `closest` (new), `add`, `remove`, `toggle(v, force)`, `contains`, `value`, `state`, `option`, `data` (new). Callable: `pgs(el)()` returns itself.
- `.state` = `pgs-state`, space list: callable, `add`, `remove`, `toggle(v, force)`, `contains`, `value`, plus new `querySelector`, `querySelectorAll`, `closest` (match `[pgs-state~="v"]`).
- `.option` = flags inside `pgs`: `add`, `remove`, `toggle`, `contains` (bare or in any bracket), new `querySelector`, `querySelectorAll` (Array), `closest` (the element itself counts). No `value`, no `*ValueBrackets`.
- `.data` = `pgs-data`: `getValueBrackets(key)` (returns `undefined` when absent), `setValueBrackets(key, value)` (replaces the same key, appends otherwise), `value` (assigning `null`/`undefined` removes the attribute). No `contains/add/remove/toggle`.
- Tokenizer keeps `key[...]` whole across spaces and nested `[ ]`; a `[` or `]` inside a JSON string in a payload is ignored.

`pgs.helper` (new namespace, all public; master had none, `pgs.init` and `pgs.formValidate` were top-level)
`init(root)`, `formValidate` (constructor), `roots(root, token)` (the root itself first when it carries the token, then descendants), `directChildren(parent, token)`, `directChild(parent, token)`, `uniqueId(prefix)` (`prefix-1`, `prefix-2`, ...), `dispatch(target, name, detail, { cancelable })` (bubbling `CustomEvent`, `detail.element` = target, returns the event), `rafThrottle(fn)` (last args of the frame, `.cancel()`), `watchDocument(cb, options)` (MutationObserver on `<html>`, one call per frame, `null` without a document), `onDocumentReady(cb)`, `escapeHtml(v)`, `formatText(v)` (escape then `**bold**` and line breaks), `warn(scope, msg, ...details)` (`console.warn("pgs.<scope>(): msg")`), `invalid(scope, msg)` (returns a `TypeError`, you `throw` it). `scrollY` helper removed (B3). Typed as `PgsHelper` in `dist/index.d.ts`.

Module lifecycle (every component module)
- `pgs.<module>.init(root = document)`: resolves its elements with the root included, skips what it already initialized (a WeakMap, no `data-*` marker), validates markup before touching the DOM and, if invalid, `console.warn`s `pgs.<module>.init(): ...` and skips. Safe to call any number of times (`pgs.helper.init(container)` after inserting markup).
- `pgs.<module>.api(el)` returns the instance or `undefined` (only for the module's ROOT element). Instance = `{ element, destroy(), refresh(), ...module methods }`. `destroy()` removes listeners/observers/timers (one AbortController per instance), keeps generated markup, a later `init` reuses it; `refresh()` = destroy + rebuild, returns the new instance. Modules without instances: `alert`, `toast`, `notification`, `darkmode`, `svg`.
- Methods that take an index/id throw `TypeError` on a bad value (`goTo` on tabs, slides, stepTabs; `pageNav.select`; `toggleLock`); `pageNav.getCurrent()` is now an index, `getCurrentPanel()` the element -> see [Content components](#part-7-content-components).
- Every module registers itself through `pgs.registerModules` in `_imports.js`; a project module that exposes `init(root)` and is registered the same way is picked up by `pgs.helper.init`.

Markers
- Removed (do not select or read them): `data-step-tabs-initialized`, `data-initialize` (toast, notification, legacy notification), `data-notification-id`, `data-header-scroll` (now `pgs-state` on the header, -> see [Layout](#part-4-layout)), `data-ga-id` / `data-cookie-*` (cookieConsent). Still honored: `data-required="true"` in `formValidate`. Internal `data-index` of search options remains.

formValidate (helper) — see [Buttons and forms](#part-5-buttons-and-forms) for markup
- Constructor `new pgs.helper.formValidate(form, { typeNotice: "alert"|"toast", showSuccessOnValidate, alertContainer, message: {...} })`: `form` must be an Element (`TypeError`), `alertContainer` may now sit outside the form. Messages are read from the form's `pgs-data` (B2); `options.message` and library defaults only fill missing ones. Instance: `validate()`, `success(description, title)`, `validator(cb, eventName="submit")`, `addNewRule(fn)`, `temporaryFieldError.{set,remove,clear}`, `destroy()`. States set: `errorForm`, `errorField`, new `errorFieldset` (a failing radio/checkbox group, controls inside are not marked), new `errorLabel`.

TypeScript (`dist/index.d.ts`: 176 -> 513 lines)
- `export function pgs(...)` overloads -> `export const pgs: PgsFunction`.
- Removed: `PgsBag`, `PgsFunction.registerImport`, `.import`, `.init`, `.cookieConsent`, `.scrollHorizontal`, `.formValidate` (module), `PgsOptionApi.getValueBrackets/setValueBrackets/value`, `PgsSearchInstance.refresh(): Promise`, `PgsSummaryInstance.refresh(): void`.
- Added: `PgsDataApi` (`PgsElementApi.data`), `PgsElementApi.closest`, `PgsStateApi.{querySelector,querySelectorAll,closest}`, `PgsOptionApi.{querySelector,querySelectorAll,closest}`, `PgsInstance<Self>` (`element`, `destroy`, `refresh`), `PgsModule<Instance>`, `PgsEventDetail`, `PgsHelper` and `PgsFunction.helper`, typed modules `pageNav`, `header`, `navSmart`, `range`, `tabs`, `alert`, `toast`, `svg`, per-component instance/detail interfaces, `PgsEventMap` plus `ElementEventMap`/`DocumentEventMap`/`WindowEventMap` augmentation (so `addEventListener("pgs:tabs:change", e => e.detail.current)` is typed), `PgsFormValidate*`.
- `PgsFunction` keeps `[moduleName: string]: any`, so a project's own `registerModules` entries still type.


### F. New (opt-in)

- `pgs-data` attribute + `pgs(el).data` accessor: the only home of `key[payload]` values.
- `pgs.helper.*` (14 functions): the same utilities the modules use, for themes and projects (`roots`, `directChild(ren)`, `uniqueId`, `dispatch`, `rafThrottle`, `watchDocument`, `onDocumentReady`, `escapeHtml`, `formatText`, `warn`, `invalid`, plus `init`, `formValidate`).
- `pgs(el).closest(token)`, `.state.querySelector/closest`, `.option.querySelector/closest`: no hand-written attribute selector needed in project code.
- `globalThis.mypgs` and the UMD bundle: one library copy shared by several bundles; `require("mypgs").pgs` for Node/tests.
- Typed event map (`PgsEventMap`) and `PgsInstance`/`PgsModule` generics in `dist/index.d.ts`.
- `reference/pgs-map.json`: machine-readable token surface (the roots, flags and data keys of each component), read by the VS Code extension that autocompletes `pgs="flex["` with only that component's flags and `pgs-data="` with that component's keys.
- `reference/html/helper/*` and `docs/helper/*` pages for `pgs`, `init`, `formValidate`, `helper`.
- Modules `pgs.pageNav`, `pgs.tabs`, `pgs.header`, `pgs.navSmart`, `pgs.range` with the common instance API.

### G. Sweep

Run from the project root (add `--include` or `--exclude-dir=node_modules,dist,vendor` as needed). A hit is a place to migrate.

```sh
# G1 the retired attribute, in HTML, PHP, JSX, JS, SCSS, CSS, kses allowlists. Hit: move to a bracket or pgs-data (rule 1)
grep -rnE '(^|[^@a-zA-Z-])pgs-option\b' .

# G2 JS: the three methods that left `.option`. Hit: .data.getValueBrackets / .data.setValueBrackets / .data.value (or pgs(el).value)
grep -rnE '\.option\.(getValueBrackets|setValueBrackets|value)\b' .

# G3 top-level API that moved or went. Hit: pgs.helper.init / pgs.helper.formValidate / delete (registerImport, import, scrollHorizontal, cookieConsent, legacyNotification have no replacement)
grep -rnE '\bpgs\.(init|formValidate|import|registerImport|scrollHorizontal(WithMouse)?|cookieConsent|legacyNotification)\b' .

# G4 old event names. Hit: pgs:modal:open|close, pgs:stepTabs:change, pgs:alert:close|buttonClick (deleteAll event is gone)
grep -rnE "['\"]modal:(open|close)['\"]|['\"]stepTabs:change['\"]|pgs:notification:" .

# G5 removed data-* markers. Hit: stop reading/selecting them (use pgs-state / the instance API)
grep -rnE 'dataset\.(stepTabsInitialized|initialize|notificationId|gaId|cookieComponent)|data-(header-scroll|step-tabs-initialized|initialize|notification-id|ga-id|cookie-[a-z]+)' .

# G6 Font Awesome. Hit: remove the font if only mypgs needed it; for icons the project still draws replace with pgs="icon['icon-NAME']" (table B6) and load @marcix/myicons for non-core glyphs
grep -rniE '\bfa-(solid|regular|brands|duotone|light|thin)\b|\bfa-[a-z0-9]+(-[a-z0-9]+)*\b|font-?awesome' .

# G7 old formValidate message keys (options.message and pgs-option keys). Hit: formFieldErrorTitle, formFieldError, formFieldsError, formSuccessTitle, formSuccess (on the form, in pgs-data)
grep -rnE '\b(fieldErrorTitle|fieldsError|fieldError|successTitle)\b' .

# G8 JS adding flags with .option.add/toggle. Hit: review; unless the flag is `card*`, `box*`, `badge*`, `menu*`, `logo*`, `slides*`, `header*` or `icon-*` rewrite as pgs(el).add("root['flag']")
grep -rnE '\.option\.(add|toggle)\(' .

# G9 SCSS partial / mixin file paths that moved
grep -rnE 'mx-(base|card|hover)\b|load-css\("(components/(modals|breadcumbs|tooltip)|layout/(layout|responsive)|base/(html|heading)|patterns/)' .

# G10 links into removed or moved package files
grep -rnE 'reference/(react|html/(layout/(body|responsive)|components/(breadcumbs|tooltip)|patterns))|docs/(helper/(README|scrollHorizontal)|patterns|convenzioni|componenti-e-markup|export-e-sviluppo|utilizzo-css-scss)|demo/demo\.(html|css|js)|pgs-html-suggestions\.vsix' .
# (add the .vsix only matters for scripts that copied it out of node_modules/mypgs)

# G11 project CSS/JS selectors on a root that now takes a bracket and is written without the alternative.
# Hit: replace [pgs~="x"] with :is([pgs~="x"], [pgs*="x["]) (rule 5)
R=$(node -e 'const m=JSON.parse(require("fs").readFileSync("node_modules/mypgs/reference/pgs-map.json","utf8"));console.log(Object.entries(m).filter(([k,v])=>!k.startsWith("_")&&v["pgs-options"].length).map(([k])=>k).join("|"))')
grep -rnP "\[pgs~=[\"']?($R)[\"']?\](?!(, ?|\)?, ?)\[pgs\*=[\"']\1(\\\\5B|\[)[\"']\])" --include=*.scss --include=*.css --include=*.js --include=*.php --include=*.html .

# G12 JS-written custom properties that were renamed
grep -rnE -e '--(heightOfHeader(Scroll)?|dropdown-(left|top)|notification-timeout|visible-percent|summary-content-max-height)\b' .

```

Sweep for hand-built `pgs="..."` strings in PHP/JS templates is manual: after G1, grep `pgs="` and `pgs=\\"` and move each flag per the owning area's table. Code that splits the `pgs` value on spaces must switch to `pgs(el).contains`, `.option.contains`, `.data.getValueBrackets` (no reliable grep).

## Part 2: Foundation: tokens, palette, base, icons

Values below are the compiled defaults (`dist/css/index.css` of each side, `:root` blocks diffed by script) unless stated.

### A. Same name, new meaning (silent)

| name | master | now |
|---|---|---|
| `--color-primary` | `#3a7750` | `#80ed99` |
| `--color-secondary` | `#d38f19` | `#57cc99` |
| `--color-tertiary` | `#17c2cb` | `#329597` |
| `--color-quaternary` | `#b5e050` | `#22577a` |
| every derived `-soft` / `-light` / `-strong` / `-dark` variant | computed from the old four | same formulas (`color-mix` with white/black, 78% / 60%), so they all change with the palette |
| `--color-link` | `#009EFF` (light and dark) | light `#0065a3`, dark `#009EFF` (`light-dark`). `--color-focus`, `--color-info`, `--focus-visible`, `bgInfo` follow it |
| `--color-link-soft` | `light-dark(#c1e7ff, #002a44)` | `color-mix(in srgb, var(--color-link) 20%, var(--color-white) 80%)`: light = pale tint of `#0065a3`, dark = dark tint of `#009EFF` |
| `--color-background` | light `#ffffff`, dark `#080808` | light `#fcfcfc`, dark `#080808` |
| `--color-box`, `--color-boxDark` | `#F8F8F8` (box light / boxDark dark) | `#f5f5f8` |
| `--color-white-transparent`, `--color-black-transparent` | `color-mix(white 50%, transparent 100%)`: the percentages sum to 150%, so by the spec they normalise to 1/3 colour, alpha about 0.33 | `... 50%, transparent 50%`: alpha 0.5 (more opaque; `bgWhiteTransparent`, `bgBlackTransparent`) |
| `--border-color` | `light-dark(#ebebeb, #353535)`, opaque | `color-mix(in srgb, var(--color-black) 8%, transparent)`: translucent, light = 8% black, dark = 8% white |
| `--border-complete` | `var(--border) var(--border-color)` = `1.5px solid <color>` | `var(--border-width) var(--border-color) var(--border-style)` = `0.1rem` (1px) `solid <color>`: lines are thinner |
| `--backdrop` | `#0000003e` (alpha 0.24) | `#0000007a` (alpha 0.48) |
| `--gap-texts` | `1.0rem` | `var(--SIZE-texts)` = `1.5rem` |
| `--gap-elements` | `4.0rem` | `var(--SIZE)` = `3rem` |
| `--gap-sections` | `calc(1.0rem + 15svh)`; <=430px `calc(7.3rem + 8svh)` | `var(--SIZE-sections)` = `calc(6rem + 10svh)`; <=430px `calc(7.3rem + 8svh)`. `--SIZE-sections` also drives `--padding-sections` and `--margin-sections`, so they shrink together on mobile |
| `--page-top` | `calc(var(--heightOfHeader) + 10lvh)` | `calc(var(--_header-height) + 7lvh)`: less room under the header |
| `--hover-background`, `--hover-color` | per-element variables written by the hover mixin: background `--color-primary-strong`, text `--color-white`. They did not exist on `:root` | global tokens on `:root`: `--hover-background` = `--color-secondary-soft`, `--hover-color` = `--color-secondary-strong`, plus `--hover-borderColor` = `--border-color`. A rule that wrote them on one element to recolour its hover still works where the component reads them (see B, Hover); set them on `:root` to recolour every hover |
| hover look of every interactive component (button, link card, link box, row, ...) | instant (`unset 0ms`), filled `--color-primary-strong`, white text, glow `box-shadow: 0 0 38px` of the same colour, applied on `:hover` **and** `:focus-visible`, gated by `(hover: hover) and (pointer: fine)` | secondary soft fill, secondary strong text, no glow, `--clickable-transition` (400 ms, `none` under `prefers-reduced-motion`), `:hover` only (focus shows the ring), still gated by `(hover: hover) and (pointer: fine)` |
| `bodyBase` `:focus-visible` ring, `focusRing`, `skipLink` | `outline: 3px solid var(--color-focus); outline-offset: 3px` | `outline: var(--focus-visible)` only: no `outline-offset` anywhere, the ring touches the element. `@include focusRing()` / `focus()` give the same |
| `bodyBase`, plain `<section>` and `<aside>` | `container-type: inline-size; width: 100%` (the width kept it from collapsing): every plain section was the container for `@container` rules inside it (flex/grid `column-N`, pageShell) | nothing: a plain `<section>` or `<aside>` is an ordinary block. Only `pgs="section"` (and card, slides, pageShell, footer, ...) is a container; a container query inside a plain section now measures the nearest container above (none = it never matches) |
| `bodyBase` `ul` | `color: var(--color-black)` | `color: var(--color-text)` |
| `bodyBase` `hr` | `border-color: var(--color-primary-soft)` | `border-color: var(--color-box)`, `align-self: stretch; width: auto` |
| `bodyBase` `fieldset` | browser border | `border: unset` |
| `bodyBase` `::selection` | background `--color-secondary`, text `--color-whiteFixed` | gone: the selected text takes the browser's colors. To keep the old look write `::selection { background: var(--color-secondary); color: var(--color-secondary-text); }` in the project |
| `bodyText` plain `<a>` (no `pgs`) | `color: var(--color-black)`, no underline, on hover `color-mix(link, white 50%)` + underline | `color: var(--color-link)`, always underlined (`underline-offset: .15em`); no hover change. Inside `<p>` or `pgs="text"` hover adds `background: var(--color-link-soft)`, radius 5px. An `<a>` that has a `pgs` token is no longer underlined; its colour is the link colour unless its component sets one |
| `bodyText` | `letter-spacing: 0.4px` on `body` (inherited by headings and everything) | none; headings read `--heading-letterSpacing` (`normal`). `span { overflow-wrap }` rule dropped; `p` keeps `overflow-wrap: anywhere` via `--text-overflowWrap` |
| `bodyHeading` / `h1`-`h5` / `heading()` | line-height not set (browser `normal`); h5 `1.7rem` weight 900 | `line-height: 1.1` everywhere; `text-wrap: balance`; h5 `1.6rem` weight 700; h1-h4 sizes/weights unchanged (7.2 / 4.45 / 2.75 / 1.7rem, 900); `h6` styled (1.6rem, 500) |
| `bodyImg` `img`, `object`, `lottie-player` | no `object-fit` (fill) | `object-fit: contain` (an image given a fixed width and height is no longer stretched). `img['imgFill']` restores fill |
| `bodyImg` `<i>` | `line-height: 1.2; font-size: var(--fa-size)` | not styled by the library |
| `html` scroll and view transitions | `scroll-behavior: smooth` and `@view-transition { navigation: auto }` always | only under `prefers-reduced-motion: no-preference`; hover transitions are `none` under `reduce`; many component transitions are `no-preference`-only. The OS setting is honoured without `motionReduce` |
| the `hidden` attribute on a component | the browser's own `[hidden] { display: none }`, which any `display` a component sets beats: an element with `hidden` and `flex['column']`, `grid[...]`, `card` or `button` stayed visible | under `body['bodyBase']` an element with `hidden` is `display: none` whatever its component sets (`!important`). `hidden="until-found"` and the accordion panel (`accordion-content`, which is hidden while it animates closed) are left alone. A project that hid something by removing the attribute keeps working; one that kept an element with `hidden` visible through its own `display` rule now needs a different way to show it |
| `html` text size on a phone | the browser's default: iOS enlarges the text when the screen turns to landscape | `text-size-adjust: 100%` on `htmlBase`: the size does not change |
| `textarea` token | on any element: a column of running text (list styles, stretched `hr`, 25px above h1-h3) | the form-field look of a real `<textarea>`. The text-block behaviour is `textBlock` |
| `icon` token | round surface (padding .5rem, `--color-white-transparent` fill, width 3x `--icon-size`) around an `<i class="fa-...">` | the glyph itself: a `::before` mask sized `--icon-size` (default `1em`), painted `--icon-color` (default `currentColor`). Write the glyph option on the same element (`icon['icon-star']`). The round surface is `icon['iconBoxed']`, written next to a glyph option |
| `--icon-size` | set by the surface mixin to `var(--fa-size)` (inherit) | glyph size read with fallback `1em`; set by `iconMedium` (1.25em), `iconLarge` (1.5em) |
| `toggleDarkmode` | JS flipped `fa-moon` / `fa-sun` on the first `<i>` inside; the footer wrote "Attiva Light Mode" / "Attiva Dark Mode" next to the glyph by itself | draws no icon: it holds a `toggleDarkmode-light` and a `toggleDarkmode-dark` child and the stylesheet hides the one of the other theme. Label is opt-in, `toggleDarkmode['tglLabeled']`, text "Dark mode" / "Light mode" (`--darkmode-label-toDark`, `--darkmode-label-toLight`) |
| `svgChangeColor` | recoloured `<object type="image/svg+xml">` only; Lottie needed a second token `lottieChangeColor` | one token recolours both, from the same `--svg-color-N` pairs (0-19) |
| `logo` | no colour of its own (took the `bodyText` link colour, black), `--logo-finter` filter | `color: var(--color-black)`, `background-color: transparent`, filter in `--logo-filter`; text variant weight `var(--font-weight-bold)` (600), family `--font-heading` |
| `--hover-*`, `--current-*`, `--twoState-*` | `twoState` was a pgs token (the form-addon toggle button); no global state tokens | global state tokens on `:root` (see F). `twoState` token -> see [Buttons and forms](#part-5-buttons-and-forms) |

### B. Renames and removals (net)

#### Body and html
| master | now | note |
|---|---|---|
| `<body pgs="bodyBase bodyImg bodyText bodyHeading">` | `<body pgs="body['bodyBase' 'bodyImg' 'bodyText' 'bodyHeading']">` | bare `bodyBase`, `bodyImg`, `bodyText`, `bodyHeading` no longer match anything: the page loses its background, text, image and heading rules silently. Write only the ones you used. |
| `<html pgs="htmlBase">` | unchanged | `font-size` is read from `--font-rem-base: 62.5%` now |
| `<body class="object-loaded">` (class added by `_object.js`) | `pgs-state="objectLoaded"` on `<body>` (written by `pgs.svg`) | `bodyImg` holds `object[type="image/svg+xml"]` and `lottie-player` at `opacity: 0` until it is set. A project rule on `.object-loaded` must read `[pgs-state~=objectLoaded]`. |

#### Hover (global)
| master | now | note |
|---|---|---|
| `pgs="hover"` (any element) | gone | write the rule yourself from the global tokens: `@media (hover: hover) and (pointer: fine) { .x:hover { background: var(--hover-background); color: var(--hover-color); border-color: var(--hover-borderColor); } }` with `transition: var(--clickable-transition)` on the element. Components (button, link card, link box, table row, search suggestion, slides dot, checkbox/radio box, file input) already do it. |
| `pgs="hover-text"` (child recoloured on hover of a `hover` parent) | gone | write `.parent:hover .child { color: var(--hover-color); }` |
| mixin `hover()` and the file `mixin/_mx-hover.scss` | gone | see D |
| `--hover-primaryColor`, `--hover-shadow-color`, `--fa-*` set by the hover mixin | gone | see C |

#### General
| master | now | note |
|---|---|---|
| `pgs="imgCover"` | `pgs="img['imgCover']"` | `img` is the token, the flag lives in its bracket. A bare `img` does nothing. |
| `pgs="imgContain"` | `pgs="img['imgContain']"` | |
| (none) | `img['imgFill']` | new: `object-fit: fill`, to undo the `contain` that `bodyImg` now sets |
| `pgs="textarea"` on a block of running text | `pgs="textBlock"` (`base/_general.scss`) | same look: column, items at start, list markers, stretched `hr`, 25px above h1-h3 (`:where`, so a project rule wins) |
| `pgs="blur"`, `textShadow`, `boxShadow` | unchanged bare; each also takes a bracket with `blrUnset`, `txsUnset`, `bxsUnset` | |
| `pgs="skipLink"`, `visuallyHidden`, `visuallyHiddenFocusable`, `focusRing`, `motionReduce`, `pointer`, `appearanceNone`, `hidden`, `lightmode`, `darkmode` | unchanged | `skipLink` focus box uses `--gap-texts` (now 1.5rem), `--padding-texts`, `--borderRadius-texts`, `--zIndex-skipLink` (9999) |

#### Colour flags

`bgX`, `colorX`, `brX` and `iconColorPrimary` / `iconColorSecondary` are in [Utilities](#part-3-utilities).

#### Icon
| master | now | note |
|---|---|---|
| `<span pgs="icon"><i class="fa-solid fa-star"></i></span>` (round surface) | `<i pgs="icon['iconBoxed' 'icon-star']" aria-hidden="true"></i>` | the glyph and the surface are the same element now: `iconBoxed` goes next to a glyph option on that element, it is not a wrapper for an icon of another set |
| `<i class="fa-solid fa-xxx">` written by the library | `<i pgs="icon['icon-xxx']">` | the library draws its own glyphs as inline SVG masks: no Font Awesome needed for its controls |
| Font Awesome names | glyph keys, camelCase, `icon['icon-<key>']` | 13 glyphs are inside mypgs, the other 270 or so come from the separate `@marcix/myicons` pack, loaded after mypgs: the name table, the install note and the missing-glyph warning are in [Core](#part-1-core-attribute-grammar-javascript-packaging) (Icon pack split and Font Awesome) |
| (none) | `iconMedium` (`--icon-size: 1.25em`), `iconLarge` (`1.5em`), `iconBoxed`, `iconDuo` | flags in the `icon[...]` bracket |

#### Dark mode and SVG
| master | now | note |
|---|---|---|
| `<button pgs="button toggleDarkmode"><i class="fa-solid fa-moon"></i></button>` | `<button pgs="button['btnIconOnly'] toggleDarkmode"><i pgs="toggleDarkmode-light icon['icon-moon']" aria-hidden="true"></i><i pgs="toggleDarkmode-dark icon['icon-sun']" aria-hidden="true"></i></button>` | write both children: the one that does not match the theme is `display: none` from the root state before first paint; a switch with neither draws nothing. Moon on the light child, sun on the dark child = each shows the theme the click leads to. Any icon, svg, img or text works. (`btnIconOnly` -> see [Buttons and forms](#part-5-buttons-and-forms)) |
| footer auto-label "Attiva Light Mode" / "Attiva Dark Mode" | `toggleDarkmode['tglLabeled']` | opt-in, everywhere (not footer-only); English strings, retitle with `--darkmode-label-toDark: "..."`, `--darkmode-label-toLight: "..."` (CSS strings, quotes included) |
| `lottieChangeColor` (JS-only token) | `svgChangeColor` | one token for SVG and Lottie |
| `pgs="svgChangeColor"` + `--svg-color-N` pairs | unchanged | the defaults `--svg-color-1/2: white & black` were never compiled on either side (`base/_svg.scss` is not imported) |

#### Logo
| master | now | note |
|---|---|---|
| `pgs="logo" pgs-option="logoDarkmode"` | `pgs="logo['logoDarkmode']"` | |
| `pgs="logo" pgs-option="logoDarkmodeFixed"` | `pgs="logo['logoDarkmodeFixed']"` | `logo`, `logo-image`, `logo-text` otherwise unchanged. `pgs-option` itself -> see [Core](#part-1-core-attribute-grammar-javascript-packaging) |
| `--logo-finter` (typo) | `--logo-filter` | same default `invert(1) hue-rotate(180deg) brightness(1.5)` |

#### Typography
| master | now | note |
|---|---|---|
| `--font-titoli` | `--font-heading` | |
| (none) | `pgs="h6"`, `pgs="text"`, `pgs="list"` | new tokens |

### C. Custom properties

Renamed:

| master | now |
|---|---|
| `--padding` (30px) | `--padding-elements` (`3rem`, same px) |
| `--padding-2` (calc(padding/2)) | `--padding-texts` (`1.5rem`, same px) |
| (none) | `--padding-groups` 6rem, `--padding-sections` `calc(6rem + 10svh)` |
| `--padding-page` (`5vw`) | `--page-padding` (`min(3vw, 3rem)`: narrower gutters on wide screens) |
| `--border-radius` (4.5rem) | `--borderRadius-elements` (3rem) |
| `--border-radius-input` (2.25rem) | `--borderRadius-texts` (1.5rem) |
| `--border-radius-external` (7.5rem) | `--borderRadius-groups` (6rem) |
| `--border` (`1.5px solid`) | `--border-width` (`0.1rem`) + `--border-style` (`solid`) |
| `--font-titoli` | `--font-heading` |
| `--logo-finter` | `--logo-filter` |
| `--heightOfHeader`, `--heightOfHeaderScroll` | `--_header-height`, `--_header-heightScroll` (written by the header script; leading underscore = read, do not set; see [Layout](#part-4-layout)) |
| `--icon-padding`, `--icon-background` (of the round surface) | `--boxed-padding`, `--boxed-background` (now `--color-box-transparent`, not `--color-white-transparent`); width is 3x `--boxed-size` (= `--icon-size` / 1.5), so the surface is smaller |
| `--color-icon-primary`, `--color-icon-secondary` | `--icon-color` (per icon) |
| `--hover-background`, `--hover-color` | same names, new global meaning (A) |
| `--section-width`, `--margin-size`, `--padding-size`, `--flex-gap` ... | -> see [Layout](#part-4-layout) / [Utilities](#part-3-utilities) |

Removed without replacement:
- `--fa-primary-color`, `--fa-primary-opacity`, `--fa-secondary-color`, `--fa-secondary-opacity`, `--fa-size`: the library no longer themes Font Awesome. Duotone FA icons fall back to FA's own colours; set `--fa-*` yourself in your CSS if you load FA.
- `--border-complete-hover` (`var(--border) var(--color-white)`): use `--hover-borderColor`.
- `--hover-primaryColor`, `--hover-shadow-color`: no glow, no strong fill any more.
- `--page-space`: `clamp(var(--padding-page), calc((100% - var(--section-width)) / 2 + var(--padding-page)), 100%)`. `--page-edge` (`max(0px, calc((100% - var(--page-width)) / 2 - var(--page-padding)))`) is a different formula, not a drop-in.
- `--heading-size`: was written by `heading()` on each heading; now `--heading-size-h1` ... `--heading-size-h6`.

Kept, default changed (visible): `--color-primary`, `--color-secondary`, `--color-tertiary`, `--color-quaternary`, all their `-soft/-light/-strong/-dark`, `--color-link` (light), `--color-link-soft`, `--color-background` (light), `--color-box`, `--color-boxDark`, `--color-white-transparent`, `--color-black-transparent`, `--border-color`, `--border-complete`, `--backdrop`, `--gap-texts`, `--gap-elements`, `--gap-sections`, `--page-top`, `--page-topScroll` (values in A).
Kept, same default: `--font` (`'Urbanist', sans-serif`), `--page-width` (1280px), `--box-shadow`, `--text-shadow`, `--blur`, `--focus-visible` (`3px solid var(--color-focus)`), `--color-text`, `--color-black`, `--color-white`, `--color-whiteFixed`, `--color-blackFixed`, `--color-gray`, `--color-focus`, `--color-error/-warning/-success` and their `-soft`, `--color-info`, `--color-info-soft` (now = `--color-link-soft`, which changed). Light and dark values were compared for every shared token; the list above is every difference.

New (opt-in tuning, all on `:root`): the `--SIZE` scale (`--SIZE` 3rem, `--SIZE-texts` 1.5rem, `--SIZE-groups` 6rem, `--SIZE-sections`), `--padding-*`, `--margin-*`, `--gap-*` (steps texts / elements / groups / sections), `--borderRadius-*` (texts / elements / groups), `--border-width`, `--border-style`, `--outline-width/-style/-color`, `--font-heading`, `--font-weight-title` 800 / `-bold` 600 / `-text` 500, `--font-size-text` 1.6rem, `--font-rem-base`, `--heading-{color,family,weight,lineHeight,letterSpacing}` and the same with `-h1` ... `-h6`, `--heading-size-h1` ... `-h6`, `--text-{color,family,size,lineHeight,overflowWrap}`, `--color-{primary,secondary,tertiary,quaternary}-text`, `--clickable-*`, `--hover-*`, `--current-*`, `--twoState-*`, `--zIndex-{skipLink 9999, dropdown 1000, search 1000, header 100, navSmart 100, toast 98, modal 90}` (same numbers master hard-coded), `--icon-glyph-<key>`, `--icon`, `--icon-color`, `--icon-size`, `--icon-before/-after`, `--boxed-*`, `--darkmode-label-toDark/-toLight`, `--logo-filter`.

### D. Sass

Partials (`@import ".../mixin/mixin.scss"`; the entry file keeps its name):

| master | now |
|---|---|
| `mixin/_mx-base.scss` | split: `_mx-elements.scss` (`list`, new `focusRing`, `focus`), `_mx-typography.scss` (`heading`, `h1`-`h6`, new `text`), `_mx-icons.scss` (new) |
| `mixin/_mx-hover.scss` | gone, no replacement (see B Hover) |
| `mixin/_mx-card.scss` | gone; `box()` moved to `_mx-box.scss` (new, with `boxHover()`, `boxNavSmart()`); `card()` and the private card mixins are gone (card styles live in `components/_card.scss`; -> see [Content components](#part-7-content-components)) |
| forwards in `mixin.scss`: settings, hover, base, responsive, form, formAddon, button, semantic, card | settings, icons, elements, typography, responsive, form, formAddon, button, semantic, box |
| `assets/scss/base/_html.scss`, `_heading.scss` | merged into `_body.scss` (html + body) and `_typography.scss` (headings + text) |
| `assets/scss/base/_variables.scss`, `_color.scss` | `_variables.scss` (all `:root`), `_color.scss` (the flags only), new `_border.scss`, `_darkmode.scss`, `_zIndex.scss`; `_svg.scss` exists but is not imported (as in master) |
| `components/_breadcumbs.scss`, `_modals.scss`, `_tooltip.scss`, `patterns/_cookieConsent.scss` | -> see their owners ([Content components](#part-7-content-components) / [Overlays and feedback](#part-6-overlays-and-feedback)) |

Mixins and variables of this area:

| master | now |
|---|---|
| `hover()` (+ private `_hoverColor`, `_hoverContent1`) | removed. Write the rule from the global tokens (B Hover) |
| `heading($size)` | `heading($size, $tag: "", $weight: 900)`: output is `var(--heading-*-hN, fallback)`; `$size` is only the fallback (the `:root` block of `base/_typography.scss` is the source). `h1()`-`h4()` same call; `h5()` weight 700 and size `$h5 - 0.1rem`; new `h6()` and `$h6` (1.7rem) in `_settings.scss` |
| `list()` | `list()` in `_mx-elements.scss`: `ul`/`ol` get `margin-left: 25px`; `li` loses `padding-left: 5px` and `margin-left: 21px`; text colour is `var(--text-color)` (was `--color-text`) |
| `textarea()` (a column + `list()` + stretched `hr` + 25px above h1-h3) | removed. `textarea()` now exists in `_mx-form.scss` with another meaning (the form field; replaces `formTextarea()`). For the old behaviour write `@include column(); @include list();` or use `pgs="textBlock"` |
| `icon()` (round surface, no arguments) | `icon($icon, $on: "::before")`: draws glyph `$icon` (a `url(...)` or `var(--icon-glyph-x)`) on the pseudo-element, or on the element itself with `$on: ""`. `icon()` with no argument is a Sass error. The round surface is `boxed()` |
| `iconSvgBase64($url, $size: 2.0rem, $color: var(--color-primary-strong))` | `svgBase64($url)` (mask only) + `iconBase()` (box: `--icon-size`/1em, `--icon-color`/currentColor), or `icon($url)`. The fixed 2rem size and the primary-strong colour are gone |
| (none) | `duo($iconBefore, $iconAfter)`, `boxed()`, `focusRing()` (`outline: var(--focus-visible)`), `focus()` (adds `:focus-visible` itself, skips disabled) |
| (none) | `$icons-builtin` (13 glyphs, keys = bare names), `$icons-duo`, `$icon-chevronDown` ... `$icon-hamburgerTwo-after` (data URIs, generated from the @marcix/myicons pack) |
| `$watch`, `$mobile`, `$big-mobile`, `$tablet`, `$big-tablet`, `$laptop`, `fibonacci()`, `$h1`-`$h5`, `$base-fibonacci-size` | unchanged |

Mixins seen, owner elsewhere: `flexColumn`/`flexRow` -> `column`/`row`; `columnFlex($columns: 4)` -> `columnFlex($columns)` (argument required); `sectionSpecifity-child($child)` -> `sectionSpecificity($child, $section: true)`; `sectionMax`, `sectionFull`, `sectionNoPadding` take `$section: true`; new `sectionEdge`; `main()` same name, variables renamed (`--main-padding-top` -> `--main-paddingTop`, `--section-width` -> `--section-maxWidth`); `box()` moved; `card()` gone; button: `buttonContent`, `buttonIcon`, `buttonNohover`, `buttonStrong`, `buttonBig`, `buttonClose`, `button_header` gone, `buttonCurrent($tag)` -> `buttonCurrent()`, new `buttonTwoState`, `buttonReverseIcon`, `buttonIconOnly`, `buttonVertical`, `buttonText`, `buttonPaddingEqual`, `buttonForHeader`, `buttonForNavSmart`; form: `file`, `rage`, `select`, `formTextarea`, `inputcolor` gone, `input($padding)` -> `input()`, `label($borderadius, $left)` -> `label()`, new `inputBase`, `inputPicker`, `labelCheckboxAndRadio`, `radio`, `fieldset`; formAddon: `twoState` gone, new `field`.

### E. JavaScript

| master | now |
|---|---|
| `pgs:svg:changeColor` dispatched on `document`, not bubbling, `detail = { isDarkMode }` | dispatched on `document.documentElement`, bubbles, `detail = { element, isDarkMode }`. `document.addEventListener` still hears it; `window` and `documentElement` listeners now hear it too |
| `pgs.darkmode.init(root)` re-applied the theme and re-fired the event on every call | binds only the switches in `root` that are not bound yet; does not re-apply the theme nor fire the event. The first pass runs on load in `<head>` (theme on `<html>`) and again at document ready (also on `<body>`) |
| `pgs.darkmode` swapped `fa-moon` / `fa-sun` on the `<i>` of each switch | no icon handling: CSS shows `toggleDarkmode-light` or `toggleDarkmode-dark` from `html[pgs-state~=darkmode]` |
| `localStorage` key `screenIsDarkMode` (`"true"` / `"false"`), unguarded | same key; reads and writes are in try/catch, with an in-memory fallback when storage is blocked |
| `pgs-state="darkmode"` on `<html>` and `<body>` | same |
| `pgs.svg.init()` no argument | `pgs.svg.init(root = document)`; `root` must be a `Document` or `Element`, otherwise it throws |
| `pgs.svg.applyColorsLottie` ran only for `lottieChangeColor` | runs when `svgChangeColor` is on the page |
| `pgs.svg.eventChangeColor`, `applyColorsSVG(isDarkMode)` | unchanged |
| `assets/javascript/base/_object.js` (adds `object-loaded` class to `<body>`, one `ResizeObserver` per `<object>` kept in `obj.__objectResizeObserver`) | file gone; the `preserveAspectRatio` pass (slice for `object-fit: cover`, meet otherwise) is in `_svg.js`, re-synced on every `load` and on resize; `obj.__objectResizeObserver` no longer exists; `<body>` gets `pgs-state="objectLoaded"` after the first pass |
| `PGS_darkmode` / `PGS_svg` imported from `_darkmode.js`, `_svg.js` | same files and same `pgs.darkmode` / `pgs.svg` names. How `pgs.*` is reached (`pgs.helper.*`) -> see [Core](#part-1-core-attribute-grammar-javascript-packaging) |

### F. New (opt-in)

- `--clickable-{background,borderColor,color,onlyText-color,transition}`: the resting look of anything that answers the pointer; transition is `none` under `prefers-reduced-motion`.
- `--hover-{background,borderColor,color}`, `--current-{background,borderColor,color}` (primary soft / primary strong), `--twoState-{background,borderColor,color}` (tertiary soft / tertiary strong): global state looks read by button, link card/box, table row, search suggestion, slides dot, checkbox/radio box, breadcrumb, steps; override on `:root` to recolour all of them.
- `--color-{primary,secondary,tertiary,quaternary}-text` = `contrast-color()` of the surface, used by `button`, `badge`, `steps`, `stepTabs`; flags `txtPrimaryText` ...
- `--zIndex-*` layer tokens (skipLink, dropdown, search, header, navSmart, toast, modal): override instead of fighting numbers.
- `--SIZE` scale: change `--SIZE` once and padding, margin, gap and radius steps follow (`--SIZE-sections` for the section step).
- `--heading-*` / `--text-*` property sets, set once per page in `:root` of `base/_typography.scss`; `pgs="h6"`, `pgs="text"` (the paragraph look on any element), `pgs="list"`, `pgs="textBlock"`.
- `outline` token with `--outline-width/-style/-color` and `border`, `borderColor` roots -> see [Utilities](#part-3-utilities).
- `img['imgFill']`, `blur['blrUnset']`, `textShadow['txsUnset']`, `boxShadow['bxsUnset']`.
- `icon['icon-<key>']` (13 core glyphs), `iconBoxed`, `iconMedium`, `iconLarge`, `iconDuo` (hamburgerTwo only), `--icon-size`, `--icon-color`; the whole set via the separate `@marcix/myicons` stylesheet.
- `toggleDarkmode-light`, `toggleDarkmode-dark`, `toggleDarkmode['tglLabeled']`.
- Sass: `icon($icon, $on)`, `svgBase64()`, `iconBase()`, `duo()`, `boxed()`, `focusRing()`, `focus()`, `text()`, `h6()`.
- `htmlBase` sets `--font-rem-base: 62.5%`; override it to change the rem root.

### G. Sweep

Run each over the consuming project (markup, scss, js).

1. Bare body tokens (rewrite as `body['...']`):
   `grep -rnE 'pgs="([^"]* )?(bodyBase|bodyImg|bodyText|bodyHeading)( [^"]*)?"' .`
2. `hover` / `hover-text` token (delete, write the rule from `--hover-*`):
   `grep -rnE 'pgs~=hover|hover-text|pgs="([^"]* )?(hover|hover-text)( [^"]*)?"' .`
3. `imgCover` / `imgContain` bare -> `img['imgCover']` / `img['imgContain']`:
   `grep -rnE 'pgs="([^"]* )?(imgCover|imgContain)( [^"]*)?"' .`
4. `borderRadiusInput` / `borderRadiusExternal` (gone, pick `borderRadius['radTexts']` / `['radGroups']`):
   `grep -rnE 'borderRadius(Input|External)\b' .`
5. Colour flags in the old bare form -> `background['bgX']`, `textColor['txtX']` (`color` -> `txt`), `borderColor['bdX']` (`br` -> `bd`):
   `grep -rnE 'pgs="([^"]* )?(bg|color|br)(Primary|Secondary|Tertiary|Quaternary|White|Black|Text|Box|BoxDark|Link|LinkSoft|Gray|Info|Error|Warning|Success|Background)[A-Za-z]*( [^"]*)?"' .`
   `grep -rnE 'pgs="([^"]* )?(bglink-soft|iconColorPrimary|iconColorSecondary)( [^"]*)?"' .`
6. Removed or renamed custom properties (replace per C):
   `grep -rnE -- '--(border-radius(-input|-external)?|padding-page|padding-2|font-titoli|fa-(primary|secondary)-(color|opacity)|fa-size|color-icon-(primary|secondary)|heightOfHeader(Scroll)?|logo-finter|hover-primaryColor|hover-shadow-color|border-complete-hover|page-space|icon-(padding|background))([^-A-Za-z0-9]|$)' .`
   `grep -rnE -- '--(padding|border)([^-A-Za-z0-9]|$)' .`: `--padding` -> `--padding-elements`, `--border` -> `--border-width` + `--border-style`
7. Font Awesome on the theme switch -> `toggleDarkmode-light` / `-dark` children:
   `grep -rnE 'fa-(moon|sun)\b' .`
8. `.object-loaded`, `lottieChangeColor` (use `[pgs-state~=objectLoaded]`, `svgChangeColor`):
   `grep -rnE 'object-loaded|lottieChangeColor' .`
9. Logo flag in `pgs-option` -> `logo['logoDarkmode']`:
   `grep -rnE 'pgs-option="[^"]*logoDarkmode' .`
10. Bare `icon` wrapper around an `<i class="fa-...">`:
    `grep -rnE 'pgs="([^"]* )?icon( [^"]*)?"' .`
11. Removed Sass: `grep -rnE '@include (hover|iconSvgBase64|flexColumn|flexRow|sectionSpecifity-child|twoState|card|icon\(\))' .`. Also `grep -rnE '@(forward|use) ["'"'"'][^"'"'"']*(mx-hover|mx-base|mx-card)' .`. `@include textarea` is not in the pattern because it still exists with another meaning: check each hit by hand.
12. `pgs="textarea"` on something that is not a `<textarea>` (-> `textBlock`):
    `grep -rnP '<(?!textarea)[a-z][^>]*pgs="([^"]* )?textarea( [^"]*)?"' .`
13. Plain `<section>` / `<aside>` that hold flex/grid `column-N` or `@container` rules (they stop being containers; add `pgs="section"` or write `container-type: inline-size`):
    `grep -rnP '<(section|aside)\b(?![^>]*\bpgs=)' .`
14. Your own overrides of the hover tokens (now global): `grep -rnE -- '--hover-(background|color|shadow-color|primaryColor)\b' .` (read each hit; the library files define the two global ones)
15. Look-only changes with no name to grep: palette, link colour, `<a>` underline, `letter-spacing`, focus ring offset, heading line-height, `object-fit: contain`: check visually (A).

## Part 3: Utilities

Shape of the change: every utility family is one root token with its flags inside a bracket, `root['flag' 'flag']`, written in `pgs=""`. `pgs-option` no longer exists for any of them (-> see [Core](#part-1-core-attribute-grammar-javascript-packaging)). A flag is only read inside its own root's bracket. Master files: `assets/scss/layout/_utilities.scss`, `layout/_spacing.scss`, `base/_color.scss`, `base/_general.scss`, `layout/_responsive.scss` (gap). Current files: `layout/_utilities.scss`, `layout/_spacing.scss`, `layout/_size.scss`, `layout/_breakpoints.scss`, `layout/_flexGrid.scss` (gap), `base/_color.scss`, `base/_border.scss`, `base/_general.scss`, `base/_zIndex.scss`.

Bare roots that still work with no bracket: `margin*`/`padding*` (the text scale), `borderRadius`, `blur`, `textShadow`, `boxShadow`, `rotate`, `hide`, `zIndex`, `border`, `borderTop`... (default border), `outline` (default outline). Bare `aspect`, `position`, `overflow`, `userSelect`, `pointerEvents`, `textAlign`, `img`, `background`, `textColor`, `borderColor` do nothing: they need a flag.

### A. Same name, new meaning (silent)

| name | master | now |
| --- | --- | --- |
| every colour flag, after the rename (`bgX` -> `background['bgX']`) | `background-color: var(--color-x)`: leaves `background-image`/gradients alone | `background: var(--color-x)` shorthand: resets `background-image`, `-position`, `-size`, `-repeat` on the same element |
| specificity of every flag (`background`, `textColor`, `borderColor`, margin/padding sides, `position`, `overflow`, `aspect`, `userSelect`, `pointerEvents`, `textAlign`, `img`, `rotate`, `zIndex`, `outline`, `border*`) | `[pgs~=x]` = (0,1,0); a spacing option was `[pgs~=x][pgs-option~=y]` | `[pgs*="root["][pgs*="'flag'"]` / `:is(root)[pgs*="'flag'"]` = (0,2,0). A consumer rule written as one class or one attribute selector that used to beat a utility now loses to it; a utility now beats a component's own one-attribute rule |
| margin / padding scale values (what `marginTexts`, `marginElements`, `marginSections`, `paddingTexts`, ... resolve to) | read `--gap-texts` 1.0rem, `--gap-elements` 4.0rem, `--gap-sections` calc(1.0rem + 15svh) (<=430px: calc(7.3rem + 8svh)) | read their own `--margin-*` / `--padding-*`: texts 1.5rem, elements 3.0rem, groups 6.0rem (new), sections calc(6.0rem + 10svh) (<=430px: calc(7.3rem + 8svh), unchanged). A theme that overrode `--gap-texts` to move margins must now override `--margin-texts` and `--padding-texts` too |
| `gapTexts` / `gapElements` / `gapSections` (the gap side, -> see [Layout](#part-4-layout) for flex/grid) | same `--gap-*` names | values changed as in the row above (1.5rem / 3.0rem / calc(6.0rem + 10svh)); `--gap-groups` (6.0rem) is new |
| `gapNone` | `gap: unset` | `gap: 0px` and `--gap: 0px` |
| `positionSticky` -> `position['posSticky']` | `position: sticky` only | `position: sticky; top: 0` |
| `brX` -> `borderColor['bdX']` | `border-color: var(--color-x)` on the element: recolors any border the element already has | sets only the custom property `--border-color` (it inherits to descendants). It paints where an element draws its border from `--border-color`: the `border`/`borderTop`... flags, and components that read it (alert, card, accordion, dropdown, search, input, table...). A border that a component draws from `--button-borderColor`, `--clickable-borderColor`, `--checkbox-borderColor`, `--toggle-rail-borderColor` is NOT recolored (those are resolved from `:root`); set that component's own variable |
| `borderRadius` (bare) | `border-radius: var(--border-radius)` = 4.5rem | `border-radius: var(--borderRadius-elements)` = 3.0rem |
| `borderRadiusInput` | `var(--border-radius-input)` = 2.25rem | gone as a token; nearest is `borderRadius['radTexts']` = 1.5rem (inputs, labels, badges now use it) |
| `borderRadiusExternal` | `var(--border-radius-external)` = 4.5rem + 30px = 7.5rem | gone as a token; nearest is `borderRadius['radGroups']` = 6.0rem |
| `skipLink` (shown state) | visible while it has any focus (`:not(:focus):not(:focus-visible)` hides it); `outline-offset: 3px`; radius `--border-radius-input` (2.25rem); padding `--padding-2` (15px); `z-index: 9999` | visible only while `:focus-visible` (a mouse or script focus hides it again); no offset; radius `--borderRadius-texts` (1.5rem); padding `--padding-texts` (15px); `z-index: var(--zIndex-skipLink)` = 9999 |
| position of the utilities in the bundle | `base/general` (`hidden`, `pointer`, `appearanceNone`, `blur`, `textShadow`, `boxShadow`, `visuallyHidden`, `skipLink`, `focusRing`, `motionReduce`, `imgCover`...) was loaded 4th, before every component; `base/color` last | `base/color`, `base/border`, `base/typography`, `base/general` are the last four partials: a utility of equal specificity now beats a component's own rule (`boxShadow`/`textShadow`/`blur`/`pointer`/`appearanceNone` on a card, button, box...) |

-> see [Foundation](#part-2-foundation-tokens-palette-base-icons): every `--color-*` default changed (new palette, `--color-link` darker in light mode, ...), so `background[...]` and `textColor[...]` look different with no markup change. `--border-color`, `--border-width` and `--backdrop` defaults changed too (C below).

### B. Renames and removals (net)

#### Background colours: `bgX` -> `background['bgX']`
Same flag name, now only read inside the `background[...]` bracket. Exhaustive (43 master tokens), one exception marked.

| master | now | note |
| --- | --- | --- |
| `bgWhite` `bgBlack` `bgWhiteTransparent` `bgBlackTransparent` `bgText` `bgBox` `bgBoxDark` `bgBoxTransparent` `bgBoxDarkTransparent` `bgBackground` `bgWhiteFixed` `bgBlackFixed` `bgLink` `bgGray` | `background['bgWhite']` ... the same names | 14 tokens |
| `bglink-soft` | `background['bgLinkSoft']` | the only one that changes its name (hyphen and case); the matching text flag was already `colorLinkSoft` |
| `bgPrimary` `bgPrimarySoft` `bgPrimaryLight` `bgPrimaryStrong` `bgPrimaryDark` | `background['bgPrimary']` ... | same for Secondary, Tertiary, Quaternary: 20 tokens in all |
| `bgInfo` `bgError` `bgWarning` `bgSuccess` | `background['bgInfo']` ... | |
| `bgInfoSoft` `bgErrorSoft` `bgWarningSoft` `bgSuccessSoft` | `background['bgInfoSoft']` ... | |
| `bgInfoBackground` (named in master `reference/html/layout/utilities.html` and `docs/layout/utilities.md`, absent from master CSS: it never did anything) | `background['bgInfoSoft']` | |
| (none) | `background['bgTransparent']` | new |

Several flags in one bracket: `background['bgPrimary']`; a second background flag in the same bracket is not meaningful (same property).

#### Text colours: `colorX` -> `textColor['txtX']`
`color` -> `txt` prefix, then into the `textColor[...]` bracket. Not `text[...]`: that is the typography root. Exhaustive (38 master tokens):

| master | now | note |
| --- | --- | --- |
| `colorWhite` `colorBlack` `colorGray` `colorText` `colorBox` `colorBoxDark` `colorWhiteFixed` `colorBlackFixed` `colorLink` | `textColor['txtWhite']` `['txtBlack']` `['txtGray']` `['txtText']` `['txtBox']` `['txtBoxDark']` `['txtWhiteFixed']` `['txtBlackFixed']` `['txtLink']` | |
| `colorLinkSoft` | `textColor['txtLinkSoft']` | |
| `colorPrimary` `colorPrimarySoft` `colorPrimaryLight` `colorPrimaryStrong` `colorPrimaryDark` | `textColor['txtPrimary']` `['txtPrimarySoft']` `['txtPrimaryLight']` `['txtPrimaryStrong']` `['txtPrimaryDark']` | same for Secondary, Tertiary, Quaternary: 20 tokens in all |
| `colorInfo` `colorError` `colorWarning` `colorSuccess` | `textColor['txtInfo']` `['txtError']` `['txtWarning']` `['txtSuccess']` | |
| `colorInfoSoft` `colorErrorSoft` `colorWarningSoft` `colorSuccessSoft` | `textColor['txtInfoSoft']` `['txtErrorSoft']` `['txtWarningSoft']` `['txtSuccessSoft']` | |
| `clInfo` (named in master `utilities.html`, absent from master CSS) | `textColor['txtInfo']` | never worked on master |
| `clInfoBackground` (same) | `textColor['txtInfoSoft']` | never worked on master |
| `iconColorPrimary`, `iconColorSecondary` | gone | defined by nothing now; a project that wants them writes `:root{--color-icon-primary:var(--color-primary)}` and `[pgs~="iconColorPrimary"]{color:var(--color-icon-primary)}` itself (`--color-icon-*` are gone too, C) |

#### Border colours: `brX` -> `borderColor['bdX']`
Own root, independent of the side root. Exhaustive (14 master tokens): `brPrimary` `brSecondary` `brTertiary` `brQuaternary` `brWhite` `brBlack` `brBox` `brBoxDark` `brLink` `brInfo` `brError` `brWarning` `brSuccess` `brGray` -> `borderColor['bdPrimary']` ... `['bdGray']` (`br` -> `bd`, same suffix). Behaviour differs, see A.

| master | now | note |
| --- | --- | --- |
| `brInfo` as shown in master `utilities.html` with a border drawn by the page | `border borderColor['bdInfo']` | `borderColor` only recolors; draw the border with `border` (or a side root) next to it, or rely on a component that reads `--border-color` |

#### Miscellaneous utilities

| master | now | note |
| --- | --- | --- |
| `aspectSquare` | `aspect['aspSquare']` | |
| `aspectVideo` | `aspect['aspVideo']` | |
| `overflowAuto` | `overflow['ovAuto']` | |
| `overflowHidden` | `overflow['ovHidden']` | |
| `overflowXAuto` | `overflow['ovAutoX']` | word order flips: `XAuto` -> `AutoX` |
| `positionRelative` | `position['posRelative']` | |
| `positionAbsolute` | `position['posAbsolute']` | |
| `positionSticky` | `position['posSticky']` | now also `top: 0` (A) |
| `selectNone` | `userSelect['selNone']` | |
| `selectText` | `userSelect['selText']` | |
| `pointerEventsNone` | `pointerEvents['peNone']` | |
| `pointerEventsAuto` | `pointerEvents['peAuto']` | |
| `imgCover` | `img['imgCover']` | |
| `imgContain` | `img['imgContain']` | |
| `borderRadius` | `borderRadius` (bare) or `borderRadius['radElements']` | value 4.5rem -> 3.0rem (A). `radTexts` 1.5rem, `radGroups` 6.0rem, `radUnset` 0 |
| `borderRadiusInput` | `borderRadius['radTexts']` | 2.25rem -> 1.5rem (A) |
| `borderRadiusExternal` | `borderRadius['radGroups']` | 7.5rem -> 6.0rem; no exact equivalent; for "radius + padding" write `calc(var(--borderRadius-texts) + <padding>)` like card does |
| `hover`, `hover-text` | gone | the shared hover system was removed; each component has its own plain hover from `--hover-background`, `--hover-borderColor`, `--hover-color` (-> see [Buttons and forms](#part-5-buttons-and-forms)) |
| `flex-flex1` `flex-flexNone` `flex-flexOrderFirst` `flex-flexOrderLast` `flex-flexFull` `flex-flexInitial` | `flexChild['flex1']` ... | -> see [Layout](#part-4-layout) |
| `flexColumn` `flexRow` `nowrap` `wrap` `inlineFlex` `flexCenter` | -> see [Layout](#part-4-layout) | |
| `block` `minWidth0` `truncate` `cursorNotAllowed` `pointer` `hidden` `appearanceNone` `darkmode` `lightmode` `visuallyHidden` `visuallyHiddenFocusable` `skipLink` `focusRing` `motionReduce` | unchanged names, same bare form | behaviour deltas for `focusRing`, `skipLink` in A |
| `blur`, `textShadow`, `boxShadow` | unchanged names, bare form still works; each also takes a bracket with an `Unset` flag (F) | `--blur`, `--text-shadow`, `--box-shadow` keep their values |
| `list` | unchanged name | -> see [Content components](#part-7-content-components) for the look |

#### Margin: the option moves into the side's own bracket
Master: `pgs="marginTop" pgs-option="marginElements"`, one `--margin-size` per element, so one option served every margin root on it. Now each root has its own bracket and its own flags: short prefix `mg` + side code (`Bl` block, `In` inline, `Tp` top, `Rt` right, `Bt` bottom, `Lt` left) + scale. A bare root with no bracket is still the text scale.

```
before: <p pgs="marginTop marginBottom" pgs-option="marginElements">
now:    <p pgs="marginTop['mgTpElements'] marginBottom['mgBtElements']">   (or marginBlock['mgBlElements'])
```

| master (root + option) | now |
| --- | --- |
| `marginBlock` + `marginTexts` / `marginElements` / `marginSections` / `marginAuto` | `marginBlock['mgBlTexts']` / `['mgBlElements']` / `['mgBlSections']` / `['mgBlAuto']` |
| `marginInline` + same four | `marginInline['mgInTexts']` / `['mgInElements']` / `['mgInSections']` / `['mgInAuto']` |
| `marginTop` + same four | `marginTop['mgTpTexts']` / `['mgTpElements']` / `['mgTpSections']` / `['mgTpAuto']` |
| `marginRight` + same four | `marginRight['mgRtTexts']` / `['mgRtElements']` / `['mgRtSections']` / `['mgRtAuto']` |
| `marginBottom` + same four | `marginBottom['mgBtTexts']` / `['mgBtElements']` / `['mgBtSections']` / `['mgBtAuto']` |
| `marginLeft` + same four | `marginLeft['mgLtTexts']` / `['mgLtElements']` / `['mgLtSections']` / `['mgLtAuto']` |
| a root with no option (`marginTop`) | unchanged: `marginTop`, `marginTop['mgTp']` is the explicit spelling; the value is now 1.5rem (A) |
| `--margin-size` set inline | gone, C |

#### Padding: same move
No `auto` in master or now. Side codes as above.

| master (root + option) | now |
| --- | --- |
| `paddingBlock` + `paddingTexts` / `paddingElements` / `paddingSections` | `paddingBlock['pdBlTexts']` / `['pdBlElements']` / `['pdBlSections']` |
| `paddingInline` + same three | `paddingInline['pdInTexts']` / `['pdInElements']` / `['pdInSections']` |
| `paddingTop` + same three | `paddingTop['pdTpTexts']` / `['pdTpElements']` / `['pdTpSections']` |
| `paddingRight` + same three | `paddingRight['pdRtTexts']` / `['pdRtElements']` / `['pdRtSections']` |
| `paddingBottom` + same three | `paddingBottom['pdBtTexts']` / `['pdBtElements']` / `['pdBtSections']` |
| `paddingLeft` + same three | `paddingLeft['pdLtTexts']` / `['pdLtElements']` / `['pdLtSections']` |
| a root with no option | unchanged; value now 1.5rem (A) |

#### Gap (standalone side; -> see [Layout](#part-4-layout) for `flex[...]`/`grid[...]`)
| master | now | note |
| --- | --- | --- |
| `gapTexts` / `gapElements` / `gapSections` as a bare `pgs` token on any flex/grid container | `gap['gapTexts']` / `gap['gapElements']` / `gap['gapSections']` | the bare token no longer matches. Needs `display:flex`/`grid` from somewhere else, as before |
| `gapNone` (bare token) | `gap['gapNone']` | `unset` -> `0px` (A) |
| same four as `pgs-option` of `flexRow`/`flexColumn`/`flex`/`grid` | flags inside `flex[...]`/`grid[...]` | -> see [Layout](#part-4-layout) |
| (none) | `gap['gapGroups']` | new scale step, F |

### C. Custom properties

Renamed: `--padding`, `--padding-2`, `--padding-page`, `--border-radius`, `--border-radius-input` and `--border` are in [Foundation](#part-2-foundation-tokens-palette-base-icons) (custom properties).


Removed with no replacement:
- `--margin-size`, `--padding-size` (per-element spacing value). To get an arbitrary value, set the scale property the flag reads on that element: `style="--margin-texts: 2rem"` with `marginTop`, `--margin-elements` with `mgTpElements`, `--padding-texts` with `paddingTop`, and so on.
- `--border-radius-external` (7.5rem): use `--borderRadius-groups` (6.0rem) or compute it.
- `--border-complete-hover` (`1.5px solid var(--color-white)`).
- `--color-icon-primary`, `--color-icon-secondary` and `--fa-primary-color`, `--fa-secondary-color`, `--fa-primary-opacity`, `--fa-secondary-opacity`, `--fa-size` -> see [Content components](#part-7-content-components) / [Foundation](#part-2-foundation-tokens-palette-base-icons).
- `--hover-primaryColor`, `--hover-shadow-color` and the rest of the old hover set -> see [Buttons and forms](#part-5-buttons-and-forms).

Kept, default changed: `--gap-*`, `--border-color`, `--border-complete` and `--backdrop` are in [Foundation](#part-2-foundation-tokens-palette-base-icons).

Kept, unchanged value: `--blur` (`blur(20px)`), `--box-shadow`, `--text-shadow`, `--focus-visible` (`3px solid var(--color-focus)`).

### D. Sass

- Partials: unchanged paths `layout/_spacing.scss`, `layout/_utilities.scss`, `base/_color.scss`, `base/_general.scss`. New: `base/_border.scss`, `base/_zIndex.scss`, `layout/_size.scss`, `layout/_breakpoints.scss`, `layout/_flexGrid.scss`. Gone: `layout/_layout.scss`, `layout/_responsive.scss` (flex/grid/gap/columns -> see [Layout](#part-4-layout)), `base/_html.scss`, `base/_heading.scss` (-> see [Foundation](#part-2-foundation-tokens-palette-base-icons)), `mixin/_mx-hover.scss`, `mixin/_mx-base.scss`.
- Load order in `index.scss`: `base/color`, `base/border`, `base/typography`, `base/general` are now last (after the components); in master `base/general` came before the layout and `base/color` was last (A).
- Mixins removed: `hover()`, `_hoverColor()`, `_hoverContent1()` (the file `_mx-hover.scss` is gone) -> see [Buttons and forms](#part-5-buttons-and-forms). `list()` stays, now in `mixin/_mx-elements.scss`.
- Mixins added (`mixin/_mx-elements.scss`, forwarded by `mixin/mixin`): `focusRing()` (`outline: var(--focus-visible)`, no offset), `focus()` (`:focus-visible` rule that applies `focusRing()` unless disabled).
- Sass variables: `$watch`, `$mobile`, `$big-mobile`, `$tablet`, `$big-tablet`, `$laptop` unchanged in `mixin/_settings.scss`. The `hide` option maps (`$hide-media-down`, ...) live inside `layout/_breakpoints.scss` and are not exported.

### E. JavaScript

No JS module belongs to this area. Notes a script can notice:
- `pgs(el).add("hidden")` and `.add("pointer")`-style calls on the unchanged bare tokens keep working. A script that adds or tests a renamed token (`bgPrimary`, `overflowAuto`, `gapTexts`, ...) must write the root with its bracket: the string is now `background['bgPrimary']`, `overflow['ovAuto']`, `gap['gapTexts']` (-> see [Core](#part-1-core-attribute-grammar-javascript-packaging) for how the helper reads brackets).
- Markup the library generates now carries utility brackets of its own (`rotate['rot90']` on the slides arrows): -> see [Content components](#part-7-content-components).
- No `pgs-state`, `pgs-data` or event is attached to a utility.

### F. New (opt-in)

- `margin` / `padding` (all four sides) as roots of their own: flags `mg`/`pd`, `mgTexts`, `mgElements`, `mgGroups`, `mgSections`, `mgPage`, `mgUnset`, `mgAuto` (margin only), `mgNegative` (margin only; each side root has its own `mgBlNegative`, `mgInNegative`, `mgTpNegative`, `mgRtNegative`, `mgBtNegative`, `mgLtNegative`, read through `--margin-sign`, `--marginTop-sign`, ...). Every side root also gets `Groups`, `Page` (= `--page-padding`) and `Unset` flags: `mgTpGroups`, `mgTpPage`, `mgTpUnset`, `pdBlPage`, ...
- `gap` root (standalone, only effective on a flex/grid container) with `gapTexts`, `gapElements`, `gapGroups`, `gapSections`, `gapNone`; each also sets `--gap`.
- `--margin-texts|elements|groups|sections`, `--padding-*`, `--gap-groups`, `--SIZE`, `--SIZE-texts|groups|sections`: one size ladder (`--SIZE` 3.0rem), all three scales read it.
- Border family: `border` (default width bare; flags `bd`, `bdThin` 1px, `bdThick` 3px, `bdThicker` 4.5px, `bdUnset`), per side `borderBlock` / `borderInline` / `borderTop` / `borderRight` / `borderBottom` / `borderLeft` with `bdBl*`, `bdIn*`, `bdTp*`, `bdRt*`, `bdBt*`, `bdLt*` (`...`, `Thin`, `Thick`, `Thicker`, `Unset`). Variables `--border-width`, `--border-style`, `--border-color`.
- `borderColor[...]`: `bdTransparent` (new), then the 14 palette flags in B.
- `borderRadius[...]`: `radTexts`, `radElements`, `radGroups`, `radUnset`; variables `--borderRadius-texts|elements|groups`.
- `outline`: bare = `--outline-width` / `--outline-style` / `--outline-color`; flags `otlThin`, `otlThick`, `otlThicker`, `otlUnset`, colours `otlPrimary`, `otlSecondary`, `otlTertiary`, `otlQuaternary`, `otlWhite`, `otlBlack`, `otlBox`, `otlBoxDark`, `otlLink`, `otlInfo`, `otlError`, `otlWarning`, `otlSuccess`, `otlGray`.
- `background['bgTransparent']`; `textColor['txtInherit']`; `textColor['txtPrimaryText']`, `['txtSecondaryText']`, `['txtTertiaryText']`, `['txtQuaternaryText']` (`--color-*-text` = `contrast-color()` of the palette colour, the text for a `bgPrimary` surface).
- Size family: `width` / `widthMax` / `widthMin` (`min(100%, --width-size)`; flags `widthFull`, `widthPage`, `widthPageHalf`/`Third`/`Quarter`/`Fifth`/`Sixth`/`Seventh`/`Eighth`, `widthText` = 65ch, `widthFillAvailable`, plus `widthAuto`, `widthMaxNone`, `widthMinAuto`) and `height` / `heightMax` / `heightMin` (flags `heightFull`, `height100svh`, `height100dvh`, `height100lvh`, `height50svh`, `heightUnderHeader`, `heightUnderMain`, `heightAuto`; `heightMaxNone` / `heightMaxAuto`). Names of the viewport-height flags: `height100svh`, `100dvh`, `100lvh`, `50svh` (with the `Max`/`Min` infix on the other two roots). Inline overrides: `--width-size`, `--widthMax-size`, `--widthMin-size`, `--height-size`, `--heightMax-size`, `--heightMin-size`. Full list: `layout/_size.scss`.
- `hide` (`layout/_breakpoints.scss`): bare hides always; `hide['hideMediaDownMobile']`, `hideMediaUpTablet`, `hideContainerDownLaptop`, `hideContainerUpWatch`, ... six breakpoints x {Media,Container} x {Down,Up}; options combine for a range.
- `zIndex`: bare reads `--zIndex` (set inline); `zIndex['ziOne']` = 1, `['ziTen']` = 10, `['ziAuto']`. Library layers as custom properties: `--zIndex-skipLink` 9999, `--zIndex-dropdown` 1000, `--zIndex-search` 1000, `--zIndex-header` 100, `--zIndex-navSmart` 100, `--zIndex-toast` 98, `--zIndex-modal` 90.
- `rotate` (bare = 180deg), `rotate['rot0']`, `['rot90']`, `['rot180']`, `['rot270']`.
- `textAlign['taLeft']`, `['taCenter']`, `['taRight']`, `['taJustify']`, `['taStart']`.
- `aspect['aspAuto']`; `overflow['ovVisible']`, `['ovAutoY']`, `['ovHiddenX']`, `['ovHiddenY']`; `position['posStatic']`; `img['imgFill']`.
- `blur['blrUnset']`, `textShadow['txsUnset']`, `boxShadow['bxsUnset']`: take the effect off an element that inherits it from its own component.
- `textBlock` (`base/_general.scss`): a left-aligned column of running text with list markers and room above h1-h3 (-> see [Content components](#part-7-content-components)).

### G. Sweep

Run from the consuming project root (restrict with `--include` to the file types you use, and exclude `node_modules`/`vendor`). They use GNU grep -P.

```
# S1  dead colour tokens in markup: bg*, color*, br*, cl*, iconColor*  -> background['bgX'], textColor['txtX'], borderColor['bdX']; iconColor* -> write it yourself
grep -rnP 'pgs="[^"]*(?<=[ "])(bg[A-Z]\w*|bglink-soft|color[A-Z]\w*|cl[A-Z]\w*|br[A-Z]\w*|iconColor(Primary|Secondary))(?=[ "])' .

# S2  a spacing scale written as pgs-option  -> move into the side's bracket (marginTop['mgTpElements'], paddingInline['pdInSections'])
grep -rnP 'pgs-option="[^"]*(?<=[ "])(margin|padding)(Texts|Elements|Sections|Auto)(?=[ "])' .

# S3  gap, aspect, overflow, position, select, pointer-events, img, radius written bare  -> gap['gapTexts'], aspect['aspSquare'], overflow['ovAutoX'], position['posRelative'], userSelect['selNone'], pointerEvents['peNone'], img['imgCover'], borderRadius['radTexts'|'radGroups']
grep -rnP 'pgs="[^"]*(?<=[ "])(gap(Texts|Elements|Sections|None)|aspect(Square|Video)|overflow(Auto|XAuto|Hidden)|position(Relative|Absolute|Sticky)|select(None|Text)|pointerEvents(None|Auto)|img(Cover|Contain)|borderRadius(Input|External))(?=[ "])' .

# S3b gap as pgs-option of flex/grid  -> flag inside flex[...]/grid[...] (-> see [Layout](#part-4-layout))
grep -rnP 'pgs-option="[^"]*(?<=[ "])gap(Texts|Elements|Sections|None)(?=[ "])' .

# S4  the same tokens as selectors in your own CSS/SCSS (also [pgs-option~=...])  -> rewrite to [pgs*="root["][pgs*="'flag'"] or use the bracket form in markup; check specificity (A)
grep -rnP '\[pgs(-option)?[~|^*$]?=["'"'"']?(bg[A-Z]\w*|bglink-soft|color[A-Z]\w*|br[A-Z]\w*|(margin|padding)(Texts|Elements|Sections|Auto)|gap(Texts|Elements|Sections|None)|aspect(Square|Video)|overflow(Auto|XAuto|Hidden)|position(Relative|Absolute|Sticky)|select(None|Text)|pointerEvents(None|Auto)|img(Cover|Contain)|borderRadius(Input|External)|hover(-text)?)["'"'"']?\]' .

# S5  removed custom properties of the spacing/border family  -> --margin-size/--padding-size: set --margin-texts etc. instead; --padding -> --padding-elements; --padding-2 -> --padding-texts; --padding-page -> --page-padding; --border-radius* -> --borderRadius-*; --border -> --border-width + --border-style; --border-complete-hover: gone
grep -rnP -e '--(margin-size|padding-size|padding-2|padding-page|border-radius(-input|-external)?|border-complete-hover)(?![-\w])|--(padding|border)(?![-\w])' .

# S6  hover token in markup  -> delete; each component hovers by itself
grep -rnP 'pgs="[^"]*(?<=[ "])(hover|hover-text)(?=[ "])' .

# S7  the same dead tokens passed to pgs() in scripts  -> write root['flag']
grep -rnP '\.(add|remove|has|toggle)\(\s*["'"'"'](bg[A-Z]\w*|bglink-soft|color[A-Z]\w*|br[A-Z]\w*|gap(Texts|Elements|Sections|None)|aspect(Square|Video)|overflow(Auto|XAuto|Hidden)|position(Relative|Absolute|Sticky)|select(None|Text)|pointerEvents(None|Auto)|img(Cover|Contain)|margin(Texts|Elements|Sections|Auto)|padding(Texts|Elements|Sections)|borderRadius(Input|External)|hover)["'"'"']' .
```

Not greppable: a template that builds a token by concatenation (`pgs="<?= $color ?>"`, `'bg' . $name`, `'margin' . ucfirst($side)`) slips through S1-S3; read those by hand, and in PHP the bracket form needs the quotes inside the attribute (`pgs="background['<?= $c ?>']"`).

## Part 4: Layout

Scope: header, navSmart, footer, pageShell, main / section / container, flex, grid, gap, breakpoints (the master `responsive.html` split), the page tokens (`--page-*`, `--gap-*` as layout reads them) and the layout Sass.

### A. Same name, new meaning (silent)

| name | master | now |
| --- | --- | --- |
| `pgs="flex"` (bare) | `display:flex`, `flex-direction:row`, `flex-wrap:wrap`, `gap:var(--gap-texts)` (it was `flexRow`) | `display:flex` and nothing else: no wrap, no gap. Write `flex['row']` where a bare `flex` stood (row + wrap + text gap) |
| `pgs="grid"` default gap | `gap: var(--gap-elements)` (4rem) | `gap: var(--gap-texts)` (1.5rem), also written to `--gap`. Add `grid['gapElements']` (now 3rem) to approximate the old spacing. `grid['gridNotDefault']` keeps only `display:grid` |
| `flex['column-N']`, `grid['column-N']` inside a bare `<section>` / `<aside>` / `<div pgs="section">` | breakpoints were measured against the nearest container, and every bare `<section>` and `<aside>` under `body bodyBase` was one (`container-type:inline-size`) | a bare `<section>` or `<aside>` is an ordinary block, not a container (a project that centers or shrinks its children with `align-items` and wants a plain section to fill the row writes `width: 100%` itself). The `@container` rules (column-N drops, `hide[...Container...]`, `cardHorizontal`, pageShell) measure the nearest ancestor that is a container: `section` (pgs), `container`, `pageShell`, `pageShell-aside`, `footer`, `slides`, the children of `section['sctMax']` / `['sctFull']`, `section-specificity`. With none at all the query never matches and N columns stay at every width. Write `pgs="section"` or `pgs="container"` on the element that must measure |
| `pgs="section"` on a `<div>` or any non-`<section>` | width + padding only, not a container | also a container (`container-type:inline-size` now comes from the `section()` mixin, on whatever element carries the token); `container['cntNone']` cancels it |
| `pgs="section"` | `display:flex; flex-direction:column; gap:var(--gap-elements)` | no `display`, no `gap`: width, margin, padding, `position`, container only. A section with several children stacks them as plain blocks. Add `flex['column' 'gapElements']` next to it |
| `pgs="sectionNoPadding"` | flex column, `gap:var(--gap-texts)`, `max-width:var(--page-width)` | `section['sctNoPadding']`: the max-width and zero padding only, no flex. Add `flex['column']` for the old text gap |
| `pgs="sectionMax"` | `padding-block: gap-sections/2` and `margin-block: -(gap-sections/2)`: the section pulled itself into the gap `main` leaves | `section['sctMax']`: the padding stays (`var(--main-gap, var(--gap-sections))/2`), the negative margin is gone. Add `mainChild['mainRemoveGap']` to get the old meeting of neighbouring backgrounds (`mainRemoveGapTop` / `mainRemoveGapBottom` for one edge) |
| `pgs="sectionFull"`, `sectionSpecificity` | no `display`, no gap | `section['sctFull']`, `section['sctSpecificity']` start from `section()` now: they also get `position:relative`, `container-type:inline-size`, `--section-*` properties. Visible only where a project styled the same element |
| `flex['column-N']` columns | at ≤615px N=7,8 gave 2 columns (`ceil(N*0.15)`); `m2e` gave `ceil(N*0.33)` (N=2,3 -> 1 column, N=4,5,6 -> 2, N=7,8 -> 3); the basis was computed with `--flex-gap` = `--gap-elements` while the gap drawn was `--gap-texts` | ≤615px always 1 column; `m2e` = `min(2, N)`; basis computed with the gap actually drawn (`--gap`, default `--gap-texts`, set by `column-N` and by every `gap*` flag). `column-1` exists (every child a full row) |
| `grid['column-N']` columns | `repeat(N, 1fr)`; `m2e` always 2 columns even for `column-1` | `repeat(N, minmax(0,1fr))` (wide content no longer stretches a track); `m2e` = `min(2, N)` |
| `pgs-option="selfStart…selfBaseline"` | matched on any element (`[pgs-option~=selfStart]`) | only inside the bracket of `flexChild` / `gridChild`: `flexChild['selfEnd']`, `gridChild['selfEnd']` |
| `pgs="header"` collapse rule | below `window.innerWidth < 600` always mobile; above it mobile only when the sum of the children widths exceeded the row | no fixed width: compact only when `header-element` overflows (`scrollWidth > clientWidth`, 2px tolerance), the `header-element-*` children no longer shrink (`>*>*{flex-shrink:0}`) so overflow is detected. Default `--header-compact-breakpoint: 100px`. To keep the 600px rule: `pgs-data="headerCompactFrom[600]"`, or `header['headerCompactBigMobile']` (615px) |
| `pgs="header"` scroll behavior | hid `header-element` on scroll down (viewport height <= 900px, after 80px) on every header, wrote `data-header-scroll="true/false"` | does nothing on scroll. Opt in with `header['headerScroll']`; the hidden moment is `pgs-state="hiddenByScroll"` on the header |
| every `button` inside `header-element` | sized automatically (`--button-size:1.2rem; --button-border:unset; height:4.8rem`, mixin `button_header()`) | not touched by the header: write `btnForHeader` on each (`min-height: var(--header-size)` = 4.4rem). Links of the menu are plain `button['btnTransparent' 'btnForHeader' 'btnPaddingEqual']` (the menu no longer styles them) -> see [Buttons and forms](#part-5-buttons-and-forms) / [Content components](#part-7-content-components) (menu) |
| hamburger glyph | `header-element-hamburger-button` drew two CSS bars that turned into a cross when `aria-expanded="true"` | the library draws nothing on a plain button: write `<i pgs="icon['icon-hamburgerTwo']">`; the glyph swaps to `icon-close` while the modal is open (CSS) -> see B |
| `header-element-onlyMobile` area when compact | `display:flex !important; margin-left:auto; align-items:center` (a real box that pushed its siblings right) | `header-element-onlyCompact` is `display:contents` while compact: no auto margin, the items are placed by document order and `justify-content:space-between` |
| `pgs="header"` `mobileBottom` | applied only at `@media (max-width: 430px)`, made the header transparent and fixed `header-element` to the bottom | `header['headerCompactBottom']` follows the compact state (any breakpoint) but does not move `header-element` by itself: it only flips `--header-compactBottom-active`, which the JavaScript reads to measure the header height from `header-element`. For a header pinned to the bottom use `header['headerBottom']` (always at the bottom, frosted box) |
| `pgs="footer"` colors | `--footer-color: var(--color-whiteFixed)`, `--footer-background: var(--color-blackFixed)`, `color-scheme: dark` forced, `background-attachment:fixed` | `--footer-color: var(--color-black)`, `--footer-background: var(--color-box)`, `--footer-colorScheme: inherit`: the footer follows the page theme. Old look: `--footer-color: var(--color-whiteFixed); --footer-background: var(--color-blackFixed); --footer-colorScheme: dark` |
| `toggleDarkmode` inside `footer` | absolutely positioned at the top right edge of the footer (`right: calc(20px + 5vw); top:0; translate:0 -50%`), `border-radius: var(--border-radius-input)`, and wrote "Attiva Dark Mode" / "Attiva Light Mode" through `::after` | no positioning (an ordinary button where you put it), no label unless `toggleDarkmode['tglLabeled']`; the text is `--darkmode-label-toDark: "Dark mode"` / `--darkmode-label-toLight: "Light mode"` on `:root`. Old strings: `--darkmode-label-toDark: "Attiva Dark Mode"; --darkmode-label-toLight: "Attiva Light Mode"` -> see [Foundation](#part-2-foundation-tokens-palette-base-icons) (darkmode) |
| `footer` other looks | `logo-image` max 250x100px; mobile `padding-top: calc(var(--padding-page)*2)` and `background-image: unset`; legal links gap `calc(var(--gap-texts)*2)`, only `p a` styled (white, no underline); `.footer-legal button {outline:none}`; `h2/h3 --heading-size` 2.0rem / 1.6rem | `logo-image` `aspect-ratio:1; height:200px`; the mobile rule is gone; legal row `row()` (`--gap-texts`); every `a` of the legal area is `--footer-color`, underlined on hover; the legal button keeps the focus ring; `--heading-size-h2: 2.0rem`, `--heading-size-h3: var(--font-size-text)`; `footer` adds `padding-bottom: var(--_navSmart-heightScroll)` |
| `pageShell` engine | `display:flex; flex-wrap:wrap`; stacks below a container width of 940px (one aside) / 1280px (two); content `flex:999 1 600px` | `display:grid` with one track per area (a missing aside leaves no track and no gap); one aside stacks at 900px (`$big-tablet`), two asides at 1100px (`$laptop`) then 900px, everything at 615px (`$big-mobile`) |
| `--pageShell-aside-width` | `300px` | `20rem` (200px with the 62.5% root): sidebars are narrower |
| `pageShell-aside` sticky | sticky only when it held a `pageShell-aside-scroll` child, at `top: var(--pageShell-aside-sticky-top)` (0), with a bottom fade (`::after`) | sticky only with `pageShell['shellAsideScroll']`, at `top: var(--pageShell-asideScroll-top)` which defaults to `--_header-height` (below the header); the fade is `pageShell['shellAsideShadow']` (a mask on both edges) |
| `pageShell` `shellFullPage` | `--pageShell-padding-inline: var(--padding)` (30px) | the padding stays `--pageShell-paddingInline` (`--page-padding`) |
| `pageShell` vertical padding | `padding-top: var(--pageShell-padding-top)` on content and aside, `padding-bottom: var(--gap-elements)` (x2 for the scrolling aside) | on the shell itself: `padding-top: var(--pageShell-offsetTop)`, `padding-bottom: var(--pageShell-paddingBottom)` (default `--gap-elements`); `shellAsideScroll` zeroes the shell top and moves it to the content |
| `main` | `--main-padding-top/-bottom` | same values, renamed `--main-paddingTop/-paddingBottom` -> C |

### B. Renames and removals (net)

Every master `pgs-option` flag below moves into the bracket named in the "now" cell. Hits of `pgs-option="…"` of any other component -> see the owning area.

#### Header
| master | now | note |
| --- | --- | --- |
| `header-element-onlyDesktop` | `header-element-onlyFull` | the group shown while the full layout is on |
| `header-element-onlyMobile` | `header-element-onlyCompact` | `display:contents` while compact, no `margin-left:auto` (see A) |
| `header-element-alwaysOnLast` | `header-element-alwaysOn` | `alwaysOn` can be written as many times as needed; the groups carry no styling, document order decides the position |
| `header-element-hamburger` (merged with `modal` on one element) | gone: a `header-element-onlyCompact` group, with a `modal` nested inside it (they no longer share an element) | markup below |
| `header-element-hamburger-button` | gone: a plain `button['btnIconOnly' 'btnForHeader'] modal-button modal-close` holding `<i pgs="icon['icon-hamburgerTwo']">` | the CSS bars are gone (see A) |
| `pgs-option="mobileBottom"` | `pgs="header['headerCompactBottom']"` | the flag no longer positions anything (see A); use `header['headerBottom']` |
| `pgs-state="mobileActive"` (on `header` and `header-element`) | `pgs-state="compact"` | same two elements; also toggled by the new forced-breakpoint flags |
| `data-header-scroll="true\|false"` on `header` | `pgs-state~="hiddenByScroll"` on `header`, added/removed (no `false` value) | only present on a `header['headerScroll']` |
| implicit hide on scroll | `header['headerScroll']` | opt in |
| `pgs-option="horizontal"` / `"vertical"` / `"menuHeader"` on the header menus | `menu['menuHorizontal']` / `menu['menuVertical']` / gone (`menuHeader`: links become `button['btnTransparent' 'btnForHeader' 'btnPaddingEqual']`) | -> see [Content components](#part-7-content-components) (menu) and [Buttons and forms](#part-5-buttons-and-forms) |
| `pgs-option="containerPGS[header]"` on the modal | `pgs-data="modalContainerPGS[header]"` | -> see [Overlays and feedback](#part-6-overlays-and-feedback) |
| `pgs-option="right"` on `modal-dialog` | `modal['dialogRight']` on the wrapper, the `<dialog>` is bare | -> see [Overlays and feedback](#part-6-overlays-and-feedback) |
| `pgs-option="buttonIcon"` on header buttons | `button['btnIconOnly' 'btnForHeader']` | -> see [Buttons and forms](#part-5-buttons-and-forms) |
| `button_header()` mixin | `buttonForHeader()` | -> D |
| `modal-dialogpopover` (selector in the header dialog rule) | gone | -> see [Overlays and feedback](#part-6-overlays-and-feedback) |
| header dialog rules (`padding-top: var(--heightOfHeader)`, `--modal-padding:10px`, `--modal-background: color-mix(primary-soft/white)`, flex column + gap + `overflow:auto` when open, `nav a {--button-background}`) | gone from the header: only `--modal-background: var(--color-background)` and `z-index:-1` remain; the offset now comes from the modal reading `--_header-heightScroll` | -> see [Overlays and feedback](#part-6-overlays-and-feedback) |

Hamburger group, before / after (current):
```html
<div pgs="header-element-hamburger modal" pgs-option="containerPGS[header]">
    <button pgs="button modal-button modal-close header-element-hamburger-button" pgs-option="buttonIcon" type="button"></button>
    <dialog pgs="modal-dialog" pgs-option="right"><div pgs="modal-dialog-content">…</div></dialog>
</div>

<div pgs="header-element-onlyCompact">
    <div pgs="modal['dialogRight']" pgs-data="modalContainerPGS[header]">
        <button pgs="button['btnIconOnly' 'btnForHeader'] modal-button modal-close" type="button" aria-label="Open menu"><i pgs="icon['icon-hamburgerTwo']" aria-hidden="true"></i></button>
        <dialog><div pgs="modal-dialog-content">…</div></dialog>
    </div>
</div>
```

#### Footer
| master | now | note |
| --- | --- | --- |
| `footer-brand-motto` | gone | master had no CSS for it either (a documented hook only): write a plain `<p>` or your own selector |
| `pgs="footer-top-content flexRow" pgs-option="column-3"` | `pgs="footer-top-content flex['row' 'column-3']"` | `footer-top-content` now adds `row-gap: var(--gap-elements)` |
| the `toggleDarkmode` label written by the footer | `toggleDarkmode['tglLabeled']` | see A |
| `cookieConsent-actionOpen` button in `footer-legal-content` | gone with the cookie consent | -> see the cookieConsent owner (not [Layout](#part-4-layout)) |
| `footer-legal-content` markup `<p><a>` | any `<a>` / `<p>` | the `a` rule is no longer scoped to `p a` |

#### pageShell
| master | now | note |
| --- | --- | --- |
| `pageShell-aside-scroll` (child of the aside) | `pgs="pageShell['shellAsideScroll']"` on the shell | sticky + own scroll for every aside, released when it stacks; the wrapper `div` can go |
| fade of the scrolling aside | `pageShell['shellAsideShadow']` | independent of `shellAsideScroll` |
| `pgs-option="shellFullPage"` | `pageShell['shellFullPage']` | padding changed, see A |

#### section, main, container
| master | now | note |
| --- | --- | --- |
| `sectionFull` | `section['sctFull']` | master `sectionFull` had no flex/gap either, so nothing to add |
| `sectionMax` | `section['sctMax']` | + `mainChild['mainRemoveGap']` where the background must meet its neighbours (A) |
| `sectionNoPadding` | `section['sctNoPadding']` | + `flex['column']` for the old flex column |
| `sectionSpecificity` | `section['sctSpecificity']` | |
| `sectionSpecificity-child` | `section-specificity` | child token, bare |
| `section` | `section` | + `flex['column' 'gapElements']` (A) |
| (mixin) `sectionSpecifity-child` | `sectionSpecificity` | -> D |
| `main` | `main` | unchanged name; `mainChild['mainRemoveGap' \| 'mainRemoveGapTop' \| 'mainRemoveGapBottom']` is the new opt-in on any child of `main` |
| `container` | `container` | same; `container['cntNone']` is new |
| `--section-width` | `--section-maxWidth` | -> C |

#### flex (tokens, options, children)
| master | now | note |
| --- | --- | --- |
| `pgs="flexColumn"` | `pgs="flex['column']"` | display flex, column, text gap |
| `pgs="flexRow"` | `pgs="flex['row']"` | display flex, row, wrap, text gap |
| `pgs="flex"` (bare) | `pgs="flex['row']"` | the bare `flex` no longer wraps nor gaps (A) |
| `pgs-option="flexColumn"` / `"flexRow"` / `"flexColumnReverse"` / `"flexRowReverse"` on `flex` | `flex['column']` / `['row']` / `['columnReverse']` / `['rowReverse']` | |
| `pgs-option="wrap"` / `"nowrap"` | `flex['wrap']` / `['nowrap']` | |
| bare `pgs="wrap"` / `pgs="nowrap"` (e.g. `pgs="flexRow nowrap"`) | `flex['row' 'nowrap']` | the bare tokens are gone; `wrapReverse`, `wrapBalance` are new |
| `inlineFlex`, `flexCenter` | same names, in `flex[…]` | `flexPlaceCenter` new (center + `gapTexts`) |
| `column-2` … `column-8` | `flex['column-N']` / `grid['column-N']` | N = 1…8 |
| `m2e` | `flex['m2e']` / `grid['m2e']` | meaning in A |
| `itemStart…itemBaseline`, `justifyStart…justifyEvenly`, `contentStart…contentEvenly` | same names, in `flex[…]` / `grid[…]` | |
| `selfStart…selfBaseline` | `flexChild[…]` / `gridChild[…]` | on the item, A |
| `pgs="flex-flexInitial"` / `flex-flexNone` / `flex-flex1` / `flex-flexFull` | `flexChild['flexInitial']` / `['flexNone']` / `['flex1']` / `['flexFull']` | `flexChild` is its own root, it needs no `flex` ancestor |
| `pgs="flex-flexOrderFirst"` / `flex-flexOrderLast` | `flexChild['flexOrderFirst']` / `['flexOrderLast']` | |

#### gap
| master | now | note |
| --- | --- | --- |
| `pgs-option="gapTexts"` / `gapElements` / `gapSections` / `gapNone` on `flex`/`grid` | same names in `flex[…]` / `grid[…]` | they also set `--gap`; `gapGroups` is new |
| bare `pgs="gapTexts"` / `gapElements` / `gapSections` / `gapNone` (retro-compat tokens) | `gap['gapTexts']` / … or the flag in the `flex[…]` / `grid[…]` bracket | `gap` is a root of its own, only the gap, for an element that is already a flex/grid container (a `main`, a `section`) |
| `--flex-gap` | `--gap` | -> C |

### C. Custom properties

Renamed:
| master | now |
| --- | --- |
| `--heightOfHeader` | `--_header-height` (written by JS; `0px` when the page has no header) |
| `--heightOfHeaderScroll` | `--_header-heightScroll` (same; `0px` while hidden by scroll) |
| `--header-padding-inline` | `--header-paddingInline` |
| `--header-padding-block` | `--header-paddingBlock` |
| `--header-mobile-bottom-active` | `--header-compactBottom-active` |
| `--padding-page` | `--page-padding` (value changed, see A) |
| `--main-padding-top` / `--main-padding-bottom` | `--main-paddingTop` / `--main-paddingBottom` |
| `--section-width` | `--section-maxWidth` (the `max-width` of a `section`; `sctMax`, `sctFull`, `sctSpecificity`, `sctEdge` set it to `none`, `sctNoPadding` to `--page-width`) |
| `--pageShell-padding-inline` | `--pageShell-paddingInline` |
| `--pageShell-padding-top` | `--pageShell-offsetTop` |
| `--pageShell-aside-sticky-top` | `--pageShell-asideScroll-top` (default `--_header-height`, was `0`) |
| `--flex-gap` | `--gap` (set by `column()`, `row()`, `center()`, `column-N`, every `gap*` flag). A `flex['column-N']` row sizes its columns from `--gap`: to change its gap write `--gap: ...` on it (or a `gap*` flag), never `gap` alone, or the columns are sized for another gap and the last one wraps |

Removed without replacement:
- `--header-borderRadius`, `--header-color-hover`: declared in master, read by nothing; delete.
- `--page-space` (`clamp(--padding-page, (100% - --section-width)/2 + --padding-page, 100%)`): gone. The nearest are `--page-edge` (below) plus `--page-padding`; the formula is not identical below the column width.
- `--adaptiveFlex-width`, `--adaptiveGrid-width`, `--adaptiveFlex-gap`: belonged to the removed private mixins `_columnAdaptiveFlex` / `_columnAdaptiveGrid` (D).

New (not in master):
`--page-edge`, `--section-maxWidth`, `--section-marginInline`, `--section-paddingInline`, `--section-paddingBlock`, `--section-edge-gap`, `--section-edge-textDivisor`, `--section-edge-mediaDivisor`, `--pageShell-paddingBottom`, `--pageShell-asideScroll-top`, `--pageShell-asideScroll-maxHeight`, `--pageShell-asideShadow-sizeMaskImage`, `--header-compact-breakpoint`, `--footer-colorScheme`, `--_navSmart-height`, `--_navSmart-heightScroll`, `--navSmart-gap`, `--navSmart-edge`, `--navSmart-edgePWA`, `--navSmart-itemMinWidth`, `--navSmart-iconSize`, `--navSmart-itemHeight`, `--zIndex-header`, `--zIndex-navSmart`, `--gap`, `--gap-groups`, `--flexChild-size-s…xxl`, `--flexChild-colSpan-s…xxl`, `--gridChild-colSpan-s…xxl`, `--flex-flexValue` (set inline for `flexValue`), `--darkmode-label-toDark/-toLight`.
Internal (`--_flex-cols`, `--_flex-gap`, `--_flexChild-*`, `--_grid-cols`, `--_gridChild-col`): do not set.

Kept name, changed default (value visible):
| property | master | now |
| --- | --- | --- |
| `--page-topScroll` | `calc(var(--heightOfHeaderScroll) + var(--heightOfHeader))` | same formula on the renamed properties |
| `--page-width` | `1280px` | `1280px` (unchanged) |
| `--gap-texts` / `--gap-elements` / `--gap-sections` | `1.0rem` / `4.0rem` / `calc(1.0rem + 15svh)` | `1.5rem` / `3.0rem` / `calc(6rem + 10svh)` |
| `--pageShell-aside-width` | `300px` | `20rem` |
| `--footer-color` | `var(--color-whiteFixed)` | `var(--color-black)` |
| `--footer-background` | `var(--color-blackFixed)` | `var(--color-box)` |
| `--header-gap` | `var(--gap-elements)` | `var(--gap-elements)` (value moves with the scale); compact still `--gap-texts` |
| `--header-padding*` (30px / 10px), `--header-size` (4.4rem), `--header-background`, `--header-color` | unchanged | unchanged |
| `--main-gap`, `--pageShell-gap`, `--pageShell-content-width` | unchanged | unchanged |
| `--heightOfHeader` preload | `6.8rem` | `--_header-height: 6.8rem` (and a `--_navSmart-height: 8.9rem` preload); both are published as `0px` when the page has no header / pinned navSmart |

### D. Sass

| master | now | note |
| --- | --- | --- |
| `@mixin flexColumn($gap: var(--gap-texts))` | `@mixin column($gap: var(--gap-texts))` | also sets `--gap` |
| `@mixin flexRow($wrap: wrap, $gap: var(--gap-texts))` | `@mixin row($wrap: wrap, $gap: var(--gap-texts))` | also sets `--gap` |
| `@mixin center($gap)` | `@mixin center($gap)` | same name, also sets `--gap` |
| `@mixin columnFlex($columns: 4)` | `@mixin columnFlex($columns)` | no default; sets `--gap` and `gap`, `--_flex-cols`; breakpoint ratios unchanged, ≤615px always one column, `m2e` `min(2,N)` |
| `@mixin columnGrid($columns: 4)` | `@mixin columnGrid($columns: 4)` | `minmax(0,1fr)`, `--_grid-cols`, `m2e` `min(2,N)` |
| `@function _basis($ratio,$gap,$columns)` | same | `_cols`, `_basisOf` are new private helpers |
| `@mixin _columnAdaptiveFlex`, `@mixin _columnAdaptiveGrid` | gone | private, no replacement (they sized columns from `--page-width`): copy from master if a project calls them |
| `@mixin main()` | `@mixin main()` | custom properties renamed (C) |
| `@mixin section()` | `@mixin section()` | no `display:flex`, no `gap`; adds `container-type:inline-size`, `position:relative`, `--section-*` |
| `@mixin sectionSpecifity-child($child)` | `@mixin sectionSpecificity($child, $section: true)` | spelling fixed; includes `section()` unless `$section: false` |
| `@mixin sectionMax()`, `sectionFull()`, `sectionNoPadding()` | `sectionMax($section: true)`, `sectionFull($section: true)`, `sectionNoPadding($section: true)` | standalone in master; now each includes `section()` first unless `$section: false`; `sectionMax` no longer sets the negative `margin-block` |
| (none) | `@mixin sectionEdge($left, $right, $section: true)` | new |
| `@mixin button_header()` | `@mixin buttonForHeader()` | `min-height: var(--header-size)` only; -> see [Buttons and forms](#part-5-buttons-and-forms) |
| `$watch $mobile $big-mobile $tablet $big-tablet $laptop` | same, same values (315 / 430 / 615 / 800 / 900 / 1100px) | `$h6` is new |
| partial `mixin/_mx-responsive.scss`, `_mx-semantic.scss`, `_settings.scss` | same file names | `mixin/mixin.scss` forwards: master `settings, mx-hover, mx-base, mx-responsive, mx-form, mx-formAddon, mx-button, mx-semantic, mx-card`; now `settings, mx-icons, mx-elements, mx-typography, mx-responsive, mx-form, mx-formAddon, mx-button, mx-semantic, mx-box`. `@use "…/mixin/mixin"` still resolves; `textarea`/`list`/`heading`/`h1-h5`/`iconSvgBase64` (`_mx-base`), `card`/`box` (`_mx-card`), `hover` (`_mx-hover`) -> see [Core](#part-1-core-attribute-grammar-javascript-packaging) / [Content components](#part-7-content-components) / [Buttons and forms](#part-5-buttons-and-forms) |
| layout partials `layout/_layout.scss`, `layout/_responsive.scss` | `layout/_section.scss`, `layout/_flex.scss`, `layout/_grid.scss`, `layout/_flexGrid.scss` (gap + alignment shared), `layout/_breakpoints.scss` | `_header`, `_footer`, `_pageShell`, `_spacing`, `_utilities` keep their names; `_size`, `_navSmart` are new. A project that builds its own index from the partials must load the new set (`index.scss` order: section, flex, grid, flexGrid, breakpoints, utilities, spacing, size, pageShell, header, navSmart, footer) |

### E. JavaScript

| master | now |
| --- | --- |
| no `pgs.header` | `pgs.header.init(root)` (also for a header added later through `pgs.helper.init(root)`) and `pgs.header.api(element)` -> `{ element, destroy(), refresh() }`; `destroy()` disconnects the observers and listeners, `refresh()` destroys and rebuilds and returns the new instance. Types: `PgsHeaderInstance`, `pgs.header` in `dist/index.d.ts` |
| first `header` of the page only | any number of headers, each collapses on its own; the one with `header['headerMain']` (or the first) owns `--_header-height` / `--_header-heightScroll` |
| `pgs-state="mobileActive"` on `header` and `header-element` | `pgs-state="compact"` on both; `pgs-state="hiddenByScroll"` on the header while `headerScroll` hides it |
| `data-header-scroll="true\|false"` on the header | removed, see above |
| `documentElement.style` `--heightOfHeader`, `--heightOfHeaderScroll` | `--_header-height`, `--_header-heightScroll` (also written as `0px` when no header exists) |
| `window.innerWidth < 600` forces mobile; width-sum comparison of the children | measured `scrollWidth > clientWidth` (2px tolerance), `--header-compact-breakpoint` from the `headerCompact*` flags, `pgs-data="headerCompactFrom[600]"` wins over them (read with `pgs(header).data.getValueBrackets("headerCompactFrom")`); the header re-measures when its children change (MutationObserver) |
| scroll-hide always on; `header.style.transform = "translateY(0)"` on resize above 768px | only with `headerScroll`; the resize reset is gone |
| (none) | `pgs.navSmart.init(root)`, `pgs.navSmart.api(element)` (same instance shape), `pgs-state="installedApp"` written on a bar in an installed app; publishes `--_navSmart-height` / `--_navSmart-heightScroll` |

### F. New (opt-in)

- `navSmart` / `navSmart-element`: bottom-pinned floating tab bar of frosted pills (items are `button['btnForNavSmart']`); `installedApp` state, `--navSmart-*`, `--_navSmart-height(Scroll)`; the footer and modal/toast pad themselves by it.
- `header['headerBottom']`: header pinned to the bottom, each `header-element` a frosted rounded box as wide as its content.
- `header['headerCompactWatch' | 'headerCompactMobile' | 'headerCompactBigMobile' | 'headerCompactTablet' | 'headerCompactBigTablet' | 'headerCompactLaptop']` and `pgs-data="headerCompactFrom[600]"`: force the compact layout from a width down.
- `header['headerMain']`: owner of the content push-down properties on a page with several headers; `header['headerScroll']`: hide on scroll down.
- `flexChild` (own root): `flexInitial`, `flexNone`, `flex1`, `flexFull`, `flexValue` (`--flex-flexValue`), `flexS…flexXxl` (1:2:3:4:5 on a zero basis), `colSpanS…colSpanXxl` (span inside `flex['column-N']`, capped by the columns of the breakpoint), `flexOrderFirst`, `flexOrderLast`, `selfStart…selfBaseline`.
- `gridChild`: `colSpanS…colSpanXxl`, `selfStart…selfBaseline`; `grid['gridDense']`, `grid['gridNotDefault']`.
- `flex['flexPlaceCenter' | 'wrapReverse' | 'wrapBalance' | 'column-1']`, `grid['column-1']`; `gap[...]` root and `gapGroups` (`--gap-groups`).
- `section['sctEdge']` with `section-edgeLeft` / `section-edgeRight`, `--page-edge`, `--section-edge-*`; `mainChild['mainRemoveGap' | 'mainRemoveGapTop' | 'mainRemoveGapBottom']`; `container['cntNone']`.
- `pageShell['shellAsideScroll' | 'shellAsideShadow']`, `--pageShell-asideScroll-*`.
- `hide[...]` breakpoint family, `width`/`height` families (`layout/size`) -> see [Utilities](#part-3-utilities).

### G. Sweep

```
# header: renamed tokens, state, flag, scroll attribute (rename by section B; read the JS/CSS hits)
grep -rnE 'header-element-(onlyDesktop|onlyMobile|alwaysOnLast|hamburger)|\b(mobileBottom|mobileActive)\b|data-header-scroll' .
# header: master custom properties (rename by section C; delete the two unused)
grep -rnE -- '--(heightOfHeader(Scroll)?|header-(padding-(inline|block)|mobile-bottom-active|borderRadius|color-hover))\b' .
# header: a bare pgs="header" that relied on scroll-hide (read: add header['headerScroll'] or leave)
grep -rnE '<header[^>]*pgs="header"' .
# header: a script that forced mobile under 600px (read: pgs-data="headerCompactFrom[600]")
grep -rnE 'innerWidth\s*<\s*600' .
# footer
grep -rnE 'footer-brand-motto|footer-top-content[^"]*flexRow' .
# pageShell
grep -rnE 'pageShell-aside-scroll|--pageShell-(aside-sticky-top|padding-(inline|top))' .
# section tokens as pgs values (rename by section B), then Sass includes and properties
grep -rnE 'pgs="[^"]*\bsection(Full|Max|NoPadding|Specificity)(-child)?\b' .
grep -rnE '@include (flexColumn|flexRow|sectionSpecifity-child|button_header|_columnAdaptive(Flex|Grid))\b|--(flex-gap|section-width|padding-page|page-space|adaptive(Flex|Grid)-width|main-padding-(top|bottom))\b' .
# every section (read: add flex['column' 'gapElements'] where it has several children; hits without flex in the same attribute)
grep -rnP 'pgs="(?![^"]*flex\[)(?:[^"]* )?section(?: [^"]*)?"' .
# bare <section>/<aside> without pgs (read: add pgs="section" or pgs="container" where a container query inside must measure it)
grep -rnP '<(section|aside)(?![^>]*\bpgs=)[ >]' .
# flex tokens and options -> flex['…']
grep -rnE '(pgs|pgs-option)="[^"]*\b(flexColumn|flexRow|flexColumnReverse|flexRowReverse)\b' .
grep -rnE 'pgs="([^"]* )?flex( [^"]*)?"' .
grep -rnE '\bflex-flex(Initial|None|1|Full|OrderFirst|OrderLast)\b' .
# bare gap and wrap tokens -> flex['gapTexts'] / gap['gapTexts'] / flex['nowrap']
grep -rnE 'pgs="([^"]* )?(gap(Texts|Elements|Sections|None)|wrap|nowrap)( [^"]*)?"' .
# layout flags still written as pgs-option (move to the bracket of flex / grid / flexChild / gridChild)
grep -rnE 'pgs-option="[^"]*\b(column-[2-8]|m2e|item(Start|Center|End|Stretch|Baseline)|justify[A-Z][a-z]+|content(Start|Center|End|Between|Around|Evenly)|self[A-Z][a-z]+|gap(Texts|Elements|Sections|None)|wrap|nowrap|inlineFlex|flexCenter)\b' .
# pgs-option of pageShell / header flags
grep -rnE 'pgs-option="[^"]*\b(shellFullPage|mobileBottom|menuHeader)\b' .
```
The three "read" lines list places to open, not places to replace.

## Part 5: Buttons and forms

Flag syntax: the old `pgs="button" pgs-option="buttonA buttonB"` is now `pgs="button['btnA' 'btnB']"`. Writing a flag from JS: `pgs(el).add("button['btnNotHover']")` (the bracket API itself -> see [Core](#part-1-core-attribute-grammar-javascript-packaging)). Message keys move to `pgs-data="key[payload]"` (-> see [Core](#part-1-core-attribute-grammar-javascript-packaging) for `.data`).
Global tokens the buttons and controls now read (`--clickable-*`, `--hover-*`, `--current-*`, `--twoState-*`, `--focus-visible`, `--border-width|style|color`, `--SIZE*`, `--borderRadius-*`) and the default palette -> see [Foundation](#part-2-foundation-tokens-palette-base-icons); only their visible effect on buttons and controls is listed here.

### A. Same name, new meaning (silent)

| name | master | now |
| --- | --- | --- |
| `button` hover and focus | on `:hover` and on `:focus-visible` the button fills with `--color-primary-strong`, text `--color-white`, plus a `0 0 38px` glow (`box-shadow`); every child gets `transition: unset` | hover only, and only under `(hover:hover) and (pointer:fine)`; the look is `--button-background-hover` / `--button-color-hover` / `--button-borderColor-hover` / `--button-shadow-hover`, which default to the global `--hover-*` (soft secondary fill, strong secondary text), no glow; `:focus-visible` no longer looks like hover, it draws the global focus ring; a disabled button never hovers |
| `button` border | an `outline` (`--button-border` = `1.5px solid #ebebeb`), takes no room | a real `border` (`--button-borderWidth` .1rem, `--button-borderStyle`, `--button-borderColor` = `--clickable-borderColor`): the box grows by the border, radius clips it |
| `button` geometry | radius `--border-radius-input` (2.25rem); gap between icon and text `--button-size/2` (.75rem); `line-height` inherited; content `justify-content: flex-start`; `--fa-size: 2rem` for icons (a Font Awesome `<i>` in a button was 2rem) | radius `--borderRadius-elements` (3rem); gap `--button-gap` = `--button-size/3` (.5rem); `line-height: 1`; `justify-content: center`; the button sets no icon size: a `pgs="icon"` glyph is `1em` (or `--icon-size`), a font icon takes the button's `font-size` (1.6rem); the `--fa-*` the button used to set are gone |
| `button` disabled | `opacity: .2` | `opacity: .5`, `not-allowed` cursor, no hover |
| `button` + `aria-current="page"` | nothing unless the markup came from menu/header (`buttonCurrent($tag)` was only a mixin) | nothing unless the button also has `btnCurrent`; with it `aria-current="page"` or `aria-selected="true"` gives the current look: `--current-*` (soft primary fill, strong primary text) instead of the old mixin's primary fill with white text |
| `button` on a `<label>` wrapping a checkbox/radio | an ordinary button, input stays visible, nothing changes when checked (the checked look was `twoState`'s) | same, until `btnTwoState` is written: then the input is hidden (still the semantics and keyboard), the checked look is `--button-*-twoState` (tertiary soft fill, strong tertiary text, was primary fill + white text), the focus ring is drawn on the label |
| `buttonStrong` -> `btnStrong` | background `--button-background-strong` = `--color-primary`, text `--color-whiteFixed`; hover filled primary-strong | background `--color-primary-strong`, text `--color-white` (a theme color: it flips in dark mode, `whiteFixed` did not); hover is the generic hover fill |
| `buttonSecondary` / `buttonTertiary` / `buttonQuaternary` -> `btnSecondary` / `btnTertiary` / `btnQuaternary` | only changed `--button-primaryColor` (read by strong/current/active) and the hover color: alone it changed nothing at rest, so it was always written next to `buttonStrong` | a solid fill by itself: `--button-background` = `--color-secondary`, text `--color-secondary-text` (same for tertiary, quaternary). `btnStrong btnSecondary` still works (palette flag is later in the rule, so it wins); `btnStrong` is redundant next to a palette flag |
| `buttonTransparent` -> see B | no border, transparent background in every state (rest, hover, strong, current, checked), label turns `--color-primary` on hover/current/strong/checked; never fills | `btnTransparent`: no border/background at rest only; on hover it fills like any other button, and strong/current/checked still fill. The master behavior (never fills, in any state) is now `btnText` (black label, 3px bottom edge secondary on hover, primary when current, no radius) |
| `buttonMini` -> `btnMini` | a small circle, icon only (the `buttonIcon()` rules were included with it: `--button-size: .5rem`, radius 50%, `aspect-ratio: 1`, 2rem icon box) | a smaller button of any content (`--button-size: .9rem`, `display:inline-flex`), no circle, no square. The master look is `btnIconOnly btnMini` |
| `buttonIcon` -> `btnIconOnly` | circle: `--button-borderRadius: 50%`, 2rem icon box | square (`aspect-ratio: 1`, padding `--button-paddingBlock`) with the normal `--borderRadius-elements`: it is a circle only while that radius is at least half the size (it is by default); a theme that lowers `--borderRadius-elements` gets rounded squares. Icon box is `--icon-size`/1em, not 2rem |
| `buttonBig` -> `btnVertical` | icon above label, `aspect-ratio: 1`, left/right padding 30px, icon `2em`, `height: 100%` | icon above label, same padding on all four sides (`--button-paddingInline`), icon `1.2em`, `height: 100%`, no `aspect-ratio` (not a square any more) |
| `buttonNohover` -> `btnNotHover` | `cursor: inherit`, `transition: all 200ms` | only omits the hover rule: the cursor stays `pointer`, the transition is the normal one. Add `cursor: default` yourself on a button that must not look clickable |
| a bare `<button type="submit">` inside `pgs="form"` | styled by the form as a strong button with hover | no styling at all: write `pgs="button['btnStrong']"` on it |
| `pgs="form"` | styled every `label`, `input`, `select`, `textarea`, checkbox, radio, range, file, color, `fieldset`, `legend`, submit button it held, plus disabled and hidden controls | only a column spaced by `--form-gap` (= `--gap-texts`, `1rem` -> `1.5rem`, see [Foundation](#part-2-foundation-tokens-palette-base-icons)): it styles no control. Every control takes its own token (`label`, `input`, `textarea`, `select`, `checkbox`, `radio`, `range`, `file`, `inputColor`, `legend`, `fieldset`, `button`); a bare control is the browser's |
| `label` | tab-shaped (`1rem 1rem 0 0`), grey `--border-color` background, no border, shifted right by `--label-left` (`--border-radius-input`), `i` inside it got margin; inside `pgs="form"` any label right before an input/select/textarea got it automatically | a white box with a border and rounded on every corner (`--label-borderRadius`), no shift, no `i` rule. The master shape is `label['labelTab']` (top corners only, open at the bottom, shifted by `--label-left`); the master "touching the control" is `label['labelTabNoGap']` (cancels the form gap). The label needs the token: a bare `<label>` is plain |
| `legend` | tab-like, `--color-box` background; a bare `legend` in a form got it | the same box as `label` (white, border, all corners); needs `pgs="legend"` |
| `input` (text-like) | padding 15px, radius `--border-radius-input`, margin-bottom `--gap-texts`, placeholder `opacity: 20%`, hover = `outline: solid --color-primary`; search/number/date/time/datetime-local/month/week were `width: clamp(50px,100%,300px)` with a grey rounded picker button; password `font-size: 1.74rem` | padding `--input-padding` (1.5rem), radius `--input-borderRadius` (`--borderRadius-texts`), no margin (the form's gap spaces it), placeholder `opacity: 60%`, hover = border color `--hover-borderColor` (no outline), those types are `width: 100%` (a flex row, picker icon first, plain), password keeps only `font-family: initial`. In a `field` the input also takes the field's padding |
| `textarea` | the token `pgs="textarea"` was a *text block* (flex column, list markers, `hr` stretched, 25px above h1-h3); the `<textarea>` element itself was styled by `form()` | `pgs="textarea"` styles a `<textarea>` (input look, `resize: vertical`, `height: 120px`, `min-height: 100px`, bottom-right radius 40px) and nothing else; the old text block is `pgs="textBlock"` (base/_general.scss, same look) |
| `select` | `input()` look plus option styling, no arrow (`appearance: none`) | same token; draws a chevron (two gradients, `--select-chevronSize`, `--select-chevronInset`) unless `multiple`; a `multiple` list is always open with spaced options colored by the current/hover tokens; a `field` first option `value=""` disabled is the placeholder |
| `checkbox` / `radio` (label and box) | `radio` and `checkbox` were the same mixin, put on the container (`fieldset`) or label; box 2rem, outline `--color-boxDark`, white fill, check in `--color-primary`, radio checked = primary dot with a white ring; space = `margin-right: 1rem` on the box plus `padding-inline: 1rem` on the label, `margin-bottom: --gap-texts` on the label; a bare `label:has(input[type=checkbox\|radio])` in a form got it | two mixins; the box is the global clickable look (`--checkbox-background`, `-borderColor`, `-color`, each with `-hover`, `-checked`, which default to clickable/hover/twoState), the checked fill is the two-state color (tertiary soft); space is `gap: --checkbox-gap`/`--radio-gap` (= half `--gap-texts`) and the label has no margin; a bare `<label><input type=checkbox>` is a native checkbox; the text of the label must be in a `<span>` (a bare link or `<strong>` is a separate flex item and loses its spaces); focus ring is `--focus-visible` on the input |
| `fieldset` | `border: unset` only | `border: unset`, a flex column spaced by `--form-gap`, `padding-top: --form-gap`; needs `pgs="fieldset"` (the master form did it for any fieldset). `flexColumn` next to `radio` is no longer needed |
| required asterisk | `*` at 40px, absolutely positioned outside the right edge of the label/legend (`translate(20px)`), drawn for `label:has(+ input[required])`, `fieldset:has(...[required]) legend`, `fieldset[required] legend`, and the label of a required checkbox | `" *"` inline after the text (same size, `--color-error`), for a `label`/`legend` with a required control after it or inside the element that follows it (`~ :required`, `~ * :required`) and for the label of a lone required checkbox/radio; `fieldset[required] legend` draws nothing (`required` is not a fieldset attribute) |
| `checkboxBackground` | drew the box and the text itself (it included `checkbox()`); background `--color-box-transparent`, checked `--color-primary-soft`, padding `--padding-2` (15px), radius `--border-radius-input`, no border | draws only the surface: write `checkbox` or `radio` next to it (`pgs="checkboxBackground checkbox"`); a bordered surface with the clickable/hover/two-state colors, padding `.75rem` (right `1.5rem`), radius `--borderRadius-elements` |
| `chip` | alone made a complete chip: `twoState(false)` (button look, no hover) + `--button-size: 1rem` | only shapes it (hides the input, dims the icon, `--button-size: 1rem`, focus ring, glyph mark when checked and no icon); the button look is `button['btnMini' 'btnTwoState']` on the same label; it answers hover now (it is a button) |
| `chips` | every `label` inside got the full chip look | every `label` inside still gets `chip()` (input hidden, marks) but no button look: each label needs `pgs="button['btnMini' 'btnTwoState']"` |
| `toggle` | rail `--toggle-color-rail` `#cbcbcb`, checked `--color-primary`, thumb white, size `--border-radius-input` (2.25rem, rail 4.5rem), thumb always grew on hover | rail/thumb read the clickable/hover/two-state tokens (thumb black-ish, checked rail tertiary soft), size `2rem` (rail 4rem), the thumb grows on hover only when motion is allowed; the text is the label of `labelCheckboxAndRadio()` (a flex row, nowrap) |
| `range` | an `input[type=range]` in a form (`rage()`): a static gradient from `--color-box-transparent` to `--color-primary` | `pgs="range"` required; the track is `--range-background`, the part before the thumb is filled with `--range-background-progress` by `pgs.range` (it sets `--_range-progress` on the input; without the script the fill is empty); the thumb is `--range-background-thumb` |
| `file` | `input[type=file]` in a form: white box, button `width: 40%`, hover primary/white | `pgs="file"` required; the box is an input, the button is a button (clickable and hover tokens, no `width: 40%`) |
| `inputColor` | `input[type=color]` in a form: `200px x 50px`, swatch inset 5px | `pgs="inputColor"` required; `--inputColor-width` 10rem x `--inputColor-height` 5rem (half the width), swatch fills the box |
| `formValidate` error look | outline `solid 3px --color-error` and error text on a failed field; a failed checkbox label got the outline | outline of `--border-width` (.1rem) in `--formValidate-outlineColor`, plus `--color-error-soft` background; labels and legends of a failed field go error-colored through `errorLabel`/`errorFieldset` |
| `errorField` on a group | a failed radio/checkbox group put `errorField` on its `fieldset` (or, with no fieldset, on the first control) | the fieldset gets `errorFieldset` and nothing else; `errorField` is for single controls. A single required checkbox that sits in a fieldset now fails the fieldset |
| `alertContainer` option of `formValidate` | had to be inside the form (the alert engine threw `TypeError: container deve essere un elemento contenuto in root`) | may be anywhere in the document (element or selector, found outside the form too); without it the alert is placed before the submit |
| a second `new pgs.helper.formValidate(form)` on the same form | stacked: every submit validated and called back twice | replaces the first (it is destroyed); the click-to-clear listener is one per form, not one per `validate()` call |

### B. Renames and removals (net)

#### Button options (written `pgs="button['flag' ...]"`)

| master | now | note |
| --- | --- | --- |
| `buttonReverse` | `btnReverse` | with an icon it swaps the two paddings (shorter side on the icon's side) |
| `buttonStrong` | `btnStrong` | see A for the color change |
| `buttonIcon` | `btnIconOnly` | |
| `buttonMini` | `btnIconOnly` + `btnMini` | `btnMini` alone is now a small text button |
| `buttonBig` | `btnVertical` | not a square any more; no equivalent of `aspect-ratio: 1` (write it) |
| `buttonClose` | `btnIconOnly` + `btnMini` | the master `--color-primary-soft` background (and the `$isRed` variant) is gone; the generated modal close is `button['btnIconOnly' 'btnMini']` (-> see [Overlays and feedback](#part-6-overlays-and-feedback)) |
| `buttonTransparent` | `btnText` (never fills) or `btnTransparent` (fills on hover) | see A; `btnText` is not a drop-in: black label, bottom edge |
| `buttonSecondary`, `buttonTertiary`, `buttonQuaternary` | `btnSecondary`, `btnTertiary`, `btnQuaternary` | solid fill by themselves; drop the `buttonStrong` next to them (or keep it, harmless) |
| `buttonNohover` | `btnNotHover` | JS: `pgs(b).option.add("buttonNohover")` -> `pgs(b).add("button['btnNotHover']")` |
| (none: `button_header()` mixin used by header/menu scss) | `btnForHeader` | sizes a button for the header: `min-height: --header-size`, `overflow-wrap: break-word` |
| (none: scss of the header) | `btnForNavSmart` | -> see [Layout](#part-4-layout) (navSmart) |
| `pgs="twoState"` on a label | `pgs="button['btnTwoState']"` | add other button flags in the same bracket (`btnStrong`, `btnMini`, `btnIconOnly`, palettes); the mixin `twoState()` and `[pgs~=twoState]` are gone; the label keeps `display:flex` |
| `pgs="icon"` (round surface in button.html) | -> see [Content components](#part-7-content-components) (icon) | |

Where a flag lives: always inside the bracket of `button`, never of another token. `pgs="button['btnStrong' 'btnMini']"`; `pgs="button flex[...]"` keeps the two tokens separate.

#### Form message keys (pgs-option -> pgs-data, all prefixed `form`)

| master (`pgs-option="key[text]"`) | now (`pgs-data="formKey[text]"`) | note |
| --- | --- | --- |
| `message[...]` | `formMessage[...]` | on the field, or on a descendant of a failing fieldset |
| `messageTitle[...]` | `formMessageTitle[...]` | |
| `fieldErrorTitle[...]` | `formFieldErrorTitle[...]` | on the form |
| `fieldError[...]` | `formFieldError[...]` | |
| `fieldsError[...]` | `formFieldsError[...]` | |
| `successTitle[...]` | `formSuccessTitle[...]` | |
| `success[...]` (option) | `formSuccess[...]` | the `success` pgs-state is unchanged |

#### Form tokens, children and states

| master | now | note |
| --- | --- | --- |
| `pgs="required"` | gone | the asterisk is drawn by CSS on the label/legend of a required control (see A). Elements that are not labels of a required control (a note, a missing-image button) need your own rule: `.x::after { content: " *"; color: var(--color-error); }` or `@include required()` |
| `pgs="required-here"` | `pgs="form-requiredHere"` | inside the required label/legend: the asterisk is drawn on this element instead of at the end |
| `labelUnset`, `inputUnset` (tokens read by `form()`) | gone | nothing styles a bare label or input any more: delete them |
| `label` (shape default) | `label` (pill) / `label['labelTab']` / `label['labelTabNoGap']` | `labelTab*` are flags in the label's own bracket |
| `<label pgs="label" for="x">` + sibling `<input pgs="input" id="x">` | same works, or `<label><span pgs="label['labelTab']">Name</span><input pgs="input"></label>` | the label styles itself only through its token; a label before the control is still found by the asterisk rule (`~ :required`) and by `errorLabel` |
| `<fieldset pgs="radio flexColumn">` | `<fieldset pgs="fieldset radio">` | `flexColumn` was [Layout](#part-4-layout)'s (`flex['column']`); the fieldset is a column itself |
| `<fieldset pgs="checkbox ...">` | `<fieldset pgs="fieldset checkbox">` | |
| `<label>` holding a checkbox/radio, in a form, no token | `<label pgs="checkbox">` / `<label pgs="radio">` | text in a `<span>` |
| `<legend>` in a form, no token | `<legend pgs="legend">` | |
| `<select>` / `<input type=range\|file\|color>` in a form, no token | `pgs="select"`, `pgs="range"`, `pgs="file"`, `pgs="inputColor"` | `file` and `textarea` inside a `field` also take `input` (`pgs="file input"`, `pgs="textarea input"`) |
| `<label pgs="checkboxBackground">` | `<label pgs="checkboxBackground checkbox">` / `... radio` | |
| `<label pgs="chip">` | `<label pgs="button['btnMini' 'btnTwoState'] chip">` | |
| `<fieldset pgs="chips"><label>` | `<label pgs="button['btnMini' 'btnTwoState']">` per label | |
| `<button pgs="button" pgs-option="buttonStrong" type="submit">` in a form | `<button pgs="button['btnStrong']" type="submit">` | a submit without `pgs="button"` is unstyled |
| `pgs-state="errorField"` on a `fieldset` | `pgs-state="errorFieldset"` | the group's controls, labels and legend are not marked |
| (none) `pgs-state="errorLabel"` | new, set by `formValidate` on the labels of a failed field | CSS hook: `[pgs-state~=errorLabel]` |
| `pgs.formValidate` and `pgs="formValidate"` | `pgs.helper.formValidate`; the `formValidate` token is still added to the form by the constructor | see E |
| `textarea` token on a non-`<textarea>` | `pgs="textBlock"` | see A |

### C. Custom properties

Renamed:

| master | now |
| --- | --- |
| `--button-padding-block` | `--button-paddingBlock` |
| `--button-padding-left`, `--button-padding-right`, `--button-padding` (shorthand) | `--button-paddingInline` (the long side, `size*2`) and `--button-paddingInline-short` (the side with an icon, `size*1.5`); `padding` is `block inline`. `--button-padding: ...` does nothing and `var(--button-padding)` is invalid |
| `--button-border` (value of the outline; `unset` removed it) | `--button-borderWidth`, `--button-borderStyle`, `--button-borderColor`; `--button-border: unset` -> `--button-borderWidth: 0px` |
| `--button-background-active`, `--button-color-active` | `--button-background-twoState`, `--button-color-twoState` (new: `--button-borderColor-twoState`, `--button-shadow-twoState`) |
| `--button-icon-size` | `--icon-size` (on the button or the icon; read by the icon token, `btnIconOnly`, `btnVertical`) |
| `--label-borderadius` | `--label-borderRadius` |
| `--label-padding` | `--label-paddingInline` + `--label-paddingBlock` |
| `--checkbox-box-background` | `--checkbox-background` (also `--checkbox-background-hover`, `-checked`) |
| `--checkbox-check-color` | `--checkbox-color` (also `-hover`, `-checked`); the radio has its own `--radio-background`, `--radio-color`, `--radio-borderColor` with the same states |
| `--checkbox-padding-inline` (padding on both sides of the label) | `--checkbox-gap` / `--radio-gap` (gap between box and text) |
| `--toggle-color-thumb` | `--toggle-thumb-background` (+ `-hover`, `-checked`) |
| `--toggle-color-rail` | `--toggle-rail-background` (+ `-hover`, `-checked`) |
| `--toggle-color-rail-checked` | `--toggle-rail-background-checked` |

Removed without replacement:
- `--button-background-strong`, `--button-color-strong`: nothing reads them; `btnStrong` sets `--button-background`/`--button-color` itself. A theme that tuned the strong look sets those two on `[pgs*="'btnStrong'"]`.
- `--button-primaryColor`: gone; use `--color-primary-strong` or set `--button-background`.
- `--hover-primaryColor`, `--hover-shadow-color`, and the `0 0 38px` glow: gone with the hover mixin (-> see [Foundation](#part-2-foundation-tokens-palette-base-icons)).
- `--fa-size`, `--fa-primary-color`, `--fa-secondary-color`, `--fa-secondary-opacity` set by the button and by `twoState`: gone (-> see [Foundation](#part-2-foundation-tokens-palette-base-icons) for the global ones).
- `--icon-padding`, `--icon-background` -> see [Content components](#part-7-content-components).

Kept, default changed:

| property | master | now |
| --- | --- | --- |
| `--button-borderRadius` | `--border-radius-input` (2.25rem) | `--borderRadius-elements` (3rem) |
| `--button-background-current` | `--button-primaryColor` (primary) | `--current-background` (primary soft) |
| `--button-color-current` | `--color-whiteFixed` | `--current-color` (primary strong) |
| `--button-background`, `--button-color` | `--color-box`, `--color-black` | `--clickable-background`, `--clickable-color` (same values by default) |
| `--button-size` | `1.5rem` | `--SIZE-texts` (1.5rem, scales with `--SIZE`) |
| `--label-background` | `--border-color` (grey) | `--color-white` (legend too; the legend was `--color-box`) |
| `--label-left` | `--border-radius-input` | `--label-borderRadius` (`--borderRadius-texts`); now read only by `labelTab` (translate) and the label's `max-width` |
| `--input-padding` | `15px` | `--padding-texts` (1.5rem) |
| `--checkbox-icon` | inline SVG data URI | `--icon-glyph-check` |
| `--checkboxBackground-background` | `--color-box-transparent` | `--clickable-background` |
| `--checkboxBackground-background-checked` | `--color-primary-soft` | `--twoState-background` |
| `--checkboxBackground-color` | `--color-text` | `--clickable-color` |
| `--checkboxBackground-padding` | `--padding-2` (15px) | `calc(var(--padding-texts)/2)` (.75rem); right side is the new `--checkboxBackground-paddingRight` (1.5rem) |
| `--checkboxBackground-borderRadius` | `--border-radius-input` | `--borderRadius-elements` |
| `--toggle-size` | `--border-radius-input` (2.25rem) | `2.0rem` |
| `--range-size` | `--border-radius-input` | `--borderRadius-texts` |
| `--formValidate-outline` | a whole shorthand, `solid 3px var(--color-error)` | width and style only (`var(--border-width) var(--border-style)`); the color is the new `--formValidate-outlineColor` (an `outline-color` rule overrides a color written in `--formValidate-outline`) |
| `--hover-background`, `--hover-color` (as read by buttons) | primary strong, white | -> see [Foundation](#part-2-foundation-tokens-palette-base-icons) (secondary soft, secondary strong) |

New per-element tokens a theme can set on a button or a container: `--button-{color,background,borderColor,shadow}` and their `-hover`, `-current`, `-twoState` states, `--button-borderWidth|borderStyle`, `--button-gap`, `--button-fontSize`, `--button-height`; `--twoState-*`, `--current-*`, `--clickable-*` are the global defaults they read.

### D. Sass

Partials: `mixin/_mx-button.scss`, `_mx-form.scss`, `_mx-formAddon.scss`, `components/_button.scss`, `_form.scss`, `_formAddon.scss` keep their names; `components/_formControls.scss` is new (range, file, inputColor, select: if you load component partials one by one, add `components/formControls`). `mixin/_mx-hover.scss` is gone (`hover()` too; -> see [Foundation](#part-2-foundation-tokens-palette-base-icons)). `mixin/mixin.scss` forwards `mx-icons`, `mx-elements`, `mx-box` (new) instead of `mx-hover`, `mx-base`, `mx-card`. Load order in `index.scss`: form, formAddon, formControls, button, icon.

| master | now | note |
| --- | --- | --- |
| `buttonBase()` | `buttonBase()` | declares every `--button-*` incl. hover/current/twoState from the global tokens; includes the icon padding that `buttonContent()` used to give |
| `buttonContent()` | gone | folded into `buttonBase()` (icon side padding) and `buttonReverseIcon()` |
| `buttonIcon()` | `buttonIconOnly()` | |
| `buttonHover()` | `buttonHover()` | now reads `--button-*-hover`; `hover()` is gone |
| `buttonNohover()` | gone | `btnNotHover` is "do not include `buttonHover()`" |
| `buttonCurrent($tag: '[aria-current=page]')` | `buttonCurrent()` | no argument; matches `[aria-current=page]` and `[aria-selected=true]` |
| `buttonStrong()` | gone | `--button-background: var(--color-primary-strong); --button-color: var(--color-white)` (rule of `btnStrong`) |
| `buttonMini()` | `buttonMini()` | different look (see A) |
| `buttonBig()` | `buttonVertical()` | |
| `buttonClose($isRed: false)` | gone | `buttonIconOnly()` + `buttonMini()` |
| `button_header()` | `buttonForHeader()` | |
| `buttonTransparent()` | `buttonTransparent()` | different look; the old "never fills" is `buttonText()` |
| `twoState($ifHover: true)` | `buttonTwoState()` | the label also includes `buttonBase()` itself; no hover argument (`btnNotHover` removes the hover) |
| `_buttonColor($for)` | `_buttonColor($for)` | now sets `color`, `background`, `border-color`, `box-shadow` (no `--fa-*`) |
| (none) | `buttonReverseIcon()`, `buttonVertical()`, `buttonText()`, `buttonPaddingEqual()`, `buttonForNavSmart()` | new |
| `icon()` (the round surface, in `mx-button`) | `icon($icon, $on)` in `mx-icons` | different signature and meaning -> see [Content components](#part-7-content-components) |
| `input($padding: 15px)` | `input()` | no argument; `--input-padding` is the knob. `inputBase($opacityPlaceholder)` and `inputPicker()` are new |
| `label($borderadius, $left)` | `label()` | no arguments; `--label-borderRadius`, `--label-left` |
| `legend()` | `legend()` | no longer built from `label(1rem, 0)`: it declares the same `--label-*` itself |
| `required()` | `required()` | same name, new look (see A) |
| `disabled()` | `disabled()` | unchanged |
| `file()`, `rage()`, `select()`, `formTextarea()`, `inputcolor()` | gone | the rules sit in the token's own rule (`[pgs~=file]`, `[pgs~=range]`, `select`, `[pgs~=inputColor]`); a stylesheet that included one writes the token on the element or copies the rules. `textarea()` (the field) replaces `formTextarea()`; the master `textarea()` text block is `[pgs~=textBlock]` |
| `checkbox()` | `checkbox()` + `radio()` + `labelCheckboxAndRadio()` | `checkbox()` no longer draws radios |
| `form()` | `form()` | a column only |
| (none) | `fieldset()` | new |
| `formValidate()` | `formValidate()` | same name |
| `checkboxBackground()` | `checkboxBackground()` | no longer includes `checkbox()` |
| `toggle()`, `chips()` | `toggle()`, `chips()` | `toggle()` includes `labelCheckboxAndRadio()` |
| `chip()` | `chip()` | no longer includes `twoState()`/`buttonBase()` |
| (none) | `field()` | new (`components/_formAddon.scss`) |
| `flexRow()` / `flexColumn()` used inside `chips()` | `row()` / `column()` | -> see [Layout](#part-4-layout) |

No `$variable` of these partials changed (`_settings.scss` only gained `$h6`).

### E. JavaScript

- `pgs.formValidate` -> `pgs.helper.formValidate` (no alias: `new pgs.formValidate(...)` throws `TypeError: pgs.formValidate is not a constructor`). Class, methods (`validator`, `validate`, `success`, `addNewRule`, `temporaryFieldError.set|remove|clear`) and options (`typeNotice`, `showSuccessOnValidate`, `alertContainer`, `message`) keep their names.
- `options.message` keys are the new data keys: `{ formFieldErrorTitle, formFieldError, formFieldsError, formSuccessTitle, formSuccess }`. The old keys (`fieldErrorTitle`, `fieldError`, `fieldsError`, `successTitle`, `success`) throw `TypeError: pgs.helper.formValidate(): unknown form message option "..."`. Messages are completed on the form's `pgs-data` (existing values win, then `options.message`, then library defaults), no longer on `pgs-option`.
- A rule or script that rewrites a message: `pgs(el).option.setValueBrackets("message", text)` -> `pgs(el).data.setValueBrackets("formMessage", text)` (same for `formMessageTitle`, and for the form-level keys).
- Invalid arguments now throw through `pgs.helper.invalid` (`TypeError` with a `pgs.helper.formValidate():` prefix): `form` not an Element, `options` not an object, `message` not an object, `callback` not a function, `eventName` empty, `rule` not a function, `temporaryFieldError.set` with a field outside the form. (Master did not check `form`.)
- New `destroy()`: removes the listeners the instance added (click-to-clear and every `validator()`); state, `novalidate` and messages stay.
- States set at runtime: `errorField` (single controls), `errorFieldset` (a fieldset: radio/checkbox group, also a single checkbox that sits in a fieldset), `errorLabel` (labels of the failed field: `label[for]`, the wrapping label, a label or `[pgs~=label]` right before the control or before its wrapping label), plus `errorForm` and `success` on the form. All are removed with the error. A script that listened for or styled `[pgs-state~=errorField]` on a fieldset must read `errorFieldset`.
- The error click handler is one listener on the form (event delegation): fields added after construction clear on click too; `validate()` adds no listeners.
- The first failing field still scrolls into view and speaks for the form; for a fieldset the message source is the first descendant carrying `formMessage`/`formMessageTitle` in `pgs-data`.
- `alertContainer` may sit outside the form (see A).
- `pgs.range` (new module): `pgs.range.init(root)` (runs on document ready), `pgs.range.api(input)` -> `{ element, update(), destroy(), refresh() }`. It writes `--_range-progress` (0..1) as an inline style on every `input[type=range]`; content added later needs `pgs.helper.init(root)`; a value set by script needs `pgs.range.api(input).update()` (no event is raised). It styles nothing without `pgs="range"` on the input, but the property is written on every range.
- Button markup written by the library in this area: none besides the alert's and modal's own buttons (-> see [Overlays and feedback](#part-6-overlays-and-feedback), `button['btnIconOnly' 'btnMini'] _modal-close`).

### F. New (opt-in)

- `btnPrimary`: solid primary fill (the default button is the neutral clickable one).
- `btnText`: text only, black in every state, 3px bottom edge (secondary on hover, primary when current), no radius, no shadow.
- `btnCurrent`: switches on the current look for `aria-current="page"` / `aria-selected="true"`; without it those attributes change nothing.
- `btnTwoState`: a `<label pgs="button['btnTwoState']">` around its own checkbox/radio; checked look from `--button-*-twoState`, focus ring on the label.
- `btnVertical`, `btnPaddingEqual` (same padding on all sides), `btnForHeader`, `btnForNavSmart` (-> see [Layout](#part-4-layout)).
- `field` and `field['noInput']`: wrapper with a floating label (needs `placeholder=" "` on the input and the label right before it); `noInput` for checkbox, radio group, range, color, toggle, chips. Reads `--field-background`, `--field-padding`, `--field-borderRadius`, `--field-gap`.
- `label['labelTab']`, `label['labelTabNoGap']`; `form-requiredHere`; `--form-gap`; tokens `fieldset`, `checkbox`, `radio`, `legend`, `range`, `file`, `inputColor`, `select` as stand-alone tokens usable outside a form.
- `select` with `multiple` is an always-open list; a single select has a chevron.
- `pgs.range` module and the filled range track.
- `errorFieldset`, `errorLabel`, `formValidate.destroy()`, `alertContainer` outside the form.
- Per-state button custom properties (`--button-*-hover|current|twoState`, `--button-shadow*`, `--button-borderColor*`) and `--checkbox|radio-{background,color,borderColor}-{hover,checked}`, `--toggle-rail-*`, `--toggle-thumb-*`, `--checkboxBackground-*-{hover,checked}`.

### G. Sweep

Use `grep -rnP`.

```sh
# 1 button options -> btn* flags (delete the pgs-option, move the flag into pgs="button['...']"); see table B. Current hit: only the prose of reference/html/guides/welcome.html naming the buttonTransparent mixin
grep -rnP '\bbutton(Reverse|Strong|Icon|Mini|Big|Close|Transparent|Secondary|Tertiary|Quaternary|Nohover)\b(?![(\w])' .
# 2 twoState label and mixin -> pgs="button['btnTwoState']" / buttonTwoState()
grep -rnP 'pgs="([^"]* )?twoState[ "]|pgs~="?twoState|@include twoState' .
# 3 form message options -> pgs-data="formMessage[...]" etc.
grep -rnP '\b(message|messageTitle|fieldErrorTitle|fieldError|fieldsError|successTitle|success)\[' .
# 4 JS message rewrites and options.message keys -> .data + form-prefixed keys
grep -rnP '\.option\.\w+\(\s*["\x27](message|messageTitle|fieldErrorTitle|fieldError|fieldsError|successTitle|success)["\x27]|\b(fieldErrorTitle|fieldsError|successTitle)\s*:' .
# 5 the helper moved
grep -rnP '\bpgs\.formValidate\b' .
# 6 fieldset error state -> errorFieldset (read: a single control keeps errorField)
grep -rnP 'fieldset\[pgs-state~=?"?errorField(?!set)|label:has\(\+\[pgs-state~=errorField' .
# 7 removed tokens: required, required-here, labelUnset, inputUnset (CSS draws the asterisk; delete)
grep -rnP 'pgs~?="?([^" ]* )?required[ "\]]|\brequired-here\b|\b(inputUnset|labelUnset)\b' .
# 8 removed custom properties (see C)
grep -rnP -e '--button-(padding(-block|-left|-right)?|border|icon-size|primaryColor|background-(active|strong)|color-(active|strong))(?![\w-])|--hover-(primaryColor|shadow-color)\b|--(label-(borderadius|padding)|checkbox-(box-background|check-color|padding-inline)|toggle-color-(thumb|rail))(?![\w])' .
# 9 removed button padding/border read (var(--button-padding), var(--button-border))
grep -rnP -e 'var\(--button-(padding|border)\)' .
# 10 Sass: removed or re-signatured mixins (see D)
grep -rnP '@include (buttonContent|buttonIcon|buttonNohover|buttonStrong|buttonBig|buttonClose|button_header|twoState|file|rage|inputcolor|formTextarea|select)\b|@include (label|legend|input|buttonCurrent)\([^)]' .
# 11 chip and checkboxBackground without the tokens they now need (add button['btnMini' 'btnTwoState'] / checkbox|radio)
grep -rnP 'pgs="(?![^"]*\bbutton)[^"]*\bchip\b|pgs="(?![^"]*\b(checkbox|radio)\b)[^"]*\bcheckboxBackground\b' .
# 12 radio/checkbox fieldsets written the old way (add pgs="fieldset", drop flexColumn)
grep -rnP '<fieldset pgs="(radio|checkbox)\b' .
# 13 read: every label/legend/fieldset/form that relied on pgs="form" to be styled (decide labelTab / field / radio / checkbox)
grep -rnP 'pgs="([^"]* )?label[ "]' .
```

Patterns 14 and 15 only list candidates (a hit is not a proof): controls that no longer get styled when they carry no token.

```sh
# 14 bare checkbox/radio inputs: the label must carry pgs="checkbox"/"radio"; bare submit buttons need pgs="button['btnStrong']"
grep -rnP '<input(?![^>]*pgs=)[^>]*type="(checkbox|radio)"|<button(?![^>]*pgs=)[^>]*type="submit"' .
# 15 range/file/color inputs and selects/textareas with no token inside a form
grep -rnP '<input(?![^>]*pgs=)[^>]*type="(range|file|color)"|<(select|textarea)(?![^>]*pgs=)' .
```

## Part 6: Overlays and feedback
Components: modal, dropdown (+ tooltip), menu, alerts, notification, toast, legacyNotification, search, summary.

### A. Same name, new meaning (silent)

| name | master | now |
| --- | --- | --- |
| modal side options `left` / `right` (now `dialogLeft` / `dialogRight`) | besides aligning, fixed the panel width at `min(400px, 100%)` | only align the panel. Width is the page width (`--page-width`, 1280px) unless `dialogSmall` (`--page-width / 3`, about 427px) or `dialogMedium` (`/ 2`, 640px). To get the old look write `modal['dialogRight' 'dialogSmall']` |
| modal `topLevel` (now `dialogTopLevel`) | centered the panel vertically and horizontally, width `min(600px, 100%)`, `padding-inline: 1rem` | `showModal()` on the top layer only; the panel is at the top like any modal, as wide as the page. Old look: `modal['dialogTopLevel' 'dialogCenter' 'dialogMedium']` (640px) |
| modal wrapper / dialog options | `containerID`, `containerPGS`, `disableBackdropClose`, `history` read on the wrapper; `topLevel`, `left`, `right` read on the `<dialog>` | every flag is written on the wrapper (`modal[...]`); the module copies each one it finds on wrapper OR dialog onto the generated `_dialog` token. The two `modalContainer*` keys are `pgs-data`, read on either element |
| focus when a modal opens | the browser's default: first focusable descendant (often a nav link, looks pre-selected) | focus goes to `modal-dialog-content-header`, or to the dialog when there is no header; the module writes `tabindex="-1"` on it. An element with `autofocus` inside the dialog still wins |
| accessible name of `modal-button` | always overwritten with `role="button"` and `aria-label="apri modale"`; `aria-expanded` also set on the `<dialog>` | `role="button"` only on a non-button without a role; `aria-label="Open modal"` only when the button has no name of its own (text, `title`, `aria-label(ledby)`, `img[alt]`); `aria-expanded` on the opener only, not on the dialog |
| generated close button of a modal | `<button pgs="button modal-close" pgs-option="buttonClose" aria-label="Chiudi">` with `<i class="fa-solid fa-close">`; a project rule on `[pgs~="modal-close"]` styled it | `<button pgs="button['btnIconOnly' 'btnMini'] _modal-close" aria-label="Close">` with `<i pgs="icon['icon-close']">`. A rule that must also reach the generated button targets `_modal-close` too. A hand-written `modal-close` keeps the bare name and is never duplicated |
| modal events | `modal:open` / `modal:close`, not bubbling, on wrapper and dialog; `modal:close` only when closed through the module's own close (Escape and a native `dialog.close()` fired none) | `pgs:modal:open` / `pgs:modal:close`, bubbling, once per listener whatever its position; `close` fires for every closure (button, backdrop, Escape, drag, back button, `dialog.close()`); `detail = { element, modal, dialog }` |
| modal `history` (now `dialogHistory`) | pushed a history entry on every change of `open`, including the ones caused by back/forward; popstate called `showModal()` directly | no second entry when the URL already says so; back/forward go through `openModal()` / `closeModal()` (events, animation, focus) |
| modal base look | `--modal-background: var(--color-box)`, `--modal-padding: var(--padding)`, `min-height: 100svh`, `html:has(dialog[open])` = `overflow: hidden; position: relative` | `--modal-background: var(--color-background)`, `--modal-content-padding: var(--padding-elements)`, `100dvh`, the page stops scrolling with `overflow: clip` (no `position: relative`) only on an `<html>` that carries `htmlBase` while a `modal-dialog` is open, not on any `<html>` with any `<dialog>` open: a project whose `<html>` has no `htmlBase` keeps scrolling behind the modal; the dialog has `overscroll-behavior: contain`, bottom padding for the navSmart bar |
| `modal-dialog` + `dialog` tokens on the `<dialog>` | the module added `pgs="dialog modal-dialog"` | the module adds `modal-dialog` (bare) and `_dialog` (carries the flags); `dialog` is no longer added |
| dropdown trigger and panel clicks | `stopPropagation()` on the trigger click and on every click inside `dropdown-content`: a listener on an ancestor never heard them | clicks propagate normally (the document-level outside-click handler already ignores clicks inside an open dropdown) |
| every dropdown panel | no arrow; `overflow: auto` always | an arrow pointing back at the trigger by default (`drpNotArrow` removes it); with the arrow the panel is `overflow: visible` (it needs it), `--dropdown-maxBlockSize` (`calc(100dvh - 2rem)`) only scrolls it when `drpNotArrow` is on |
| hover dropdown (`dropdownHover` -> `drpHover`) | a pointer click on the trigger toggled it like any dropdown (closing what the hover had just opened) | a pointer click does nothing; Enter and Space still toggle |
| submenus of a vertical menu, and every level below the first of a horizontal one | every `li` with a `ul` became a floating `dropdown` | only the first level of `menuHorizontal` floats; all the others open in place (generated `_menu-accordion`, `pgs-state="open"` on the `li`, indented list with a left border) |
| floating submenu placement | `position[bottom right]` (panel right-aligned to the toggle) | `dropdownPosition[bottom center]` |
| links inside a `menu` | every `li > a` was turned into a button by the menu itself (`buttonBase/Hover/Content/Current`, transparent background, `aria-current` filled with the primary color) | the menu styles no link: each `<a>` gets `pgs="button['btnTransparent']"` (+ `'btnCurrent'` for the current page). A bare `<a>` is just a link |
| menu item with a submenu | the toggle went after the first `a` found anywhere inside the `li` | the `li` needs a direct-child `<a>`; one without is skipped with a warning (`pgs.menu.init(): a menu item with a submenu needs a direct link of its own`) |
| `pgs.menu.api(el).type` | always `"horizontal"` | `"horizontal"` only with `menuHorizontal`, otherwise `"vertical"` |
| `menuShort`, `menuIconOnlyCurrent` | `menuShort` forced `--button-background-current` / `--button-color-current` (soft primary); `menuIconOnlyCurrent` rewrote `--button-padding-left` | neither sets colors any more (the current look is `btnCurrent`'s); `menuIconOnlyCurrent` sets `padding-left: var(--button-paddingInline)`; `menuShort`'s negative margin uses `--button-paddingBlock` |
| bare `alert` (no severity) | primary color: `--alert-accent: var(--color-primary)`, `--alert-background: var(--color-primary-soft)` | neutral box surface: `--alert-accent: initial`, `--alert-background: var(--color-box)`; `alert['alertNeutral']` is the same thing written out |
| alert card geometry | `--alert-padding: var(--padding-2)`, radius `--border-radius-input`, title weight 800, icon `font-size: 2rem` / `--fa-size: 2rem`, `margin-block: var(--gap-texts)`, 2 grid columns | `--alert-padding: var(--padding-texts)`, radius `--borderRadius-elements`, title `--font-weight-title`, icon drawn at `--icon-size: var(--alert-iconSize)` (3.5rem), `margin-block: calc(var(--gap-texts) / 2)`, 3 columns (icon, content, dismiss) + a button row, `overflow: hidden` |
| text of `pgs.alert.*` | title and description escaped only | `**bold**` becomes `<strong>` and a newline `<br>` in title and description (as notification and toast already did); the defaults are English (`Error`, `Success`, `Information`, `Warning`) instead of `Errore`, `Aggiornato`, `Aggiornamento`, `Attenzione`; errors thrown by `pgs.alert.*` are English and start `pgs.alert.<type>():` |
| button `link` of an alert, notification or toast | any string went into `href` | only relative, `http:`, `https:`, `mailto:`, `tel:`; another scheme (`javascript:`, `data:`) is warned about and the entry becomes a plain button |
| look of notification and toast cards | each had its own markup and CSS; buttons were filled `button`s, a visible text "Close" button under the content, a colored `box-shadow` on a toast, the notification slid out with `translate: 120%` | both are the alert card (`_alert`): dismiss is an icon-only button at the top right (`closeTitle` is its accessible name only, default `Close notification` / `Close toast`), action buttons are `button['btnTransparent']` in a tinted row, no severity shadow, closing fades the card out |
| notification panel | `notificationBell` had to sit in a `modal` wrapper; the module added the `<dialog>` there; with no bell wrapper the list was appended inline to the body | the module builds ONE modal `modal['dialogRight' 'dialogTop' 'dialogSmall' 'dialogAnimationRight']` itself and every `notificationBell` toggles it; a bell never needs a modal wrapper nor `modal-button`. A leftover `<div pgs="modal">` without a dialog around a bell only produces a console warning |
| a toast or notification JSON entry with `link` / `title-link` (and a `pgs.toast.*({ link, linkTitle })` call) | produced a link button | silently ignored: only `buttons[]` builds buttons. Convert to `"buttons": [{ "title": "Open", "link": "/x" }]` |
| `pgs.toast.deleteAll()`, a toast replaced by a new one | emptied the container at once, no event | each card closes through its own close: fade out, `pgs:alert:close` raised (immediately when replaced) |
| a toast container with no card | an empty `pgs="toast"` box | `display: none` until a card is in it; the container covers the screen (`inset: 0`, `pointer-events: none`), the card is clickable and at most `$mobile` wide |
| `role` of a toast / notification | `alert` for `error`, `status` otherwise | `alert` for `error` and `warning` |
| search root | `pgs="button search"`: the form was a button (button colors, `button_header()` shape), min-width 21.4rem from the mobile breakpoint, every `button` inside it restyled (no border or background, padding-left) | `pgs="search"` draws its own surface (`--search-background`, `--search-color`, `--search-border`, `--search-borderRadius`, `--search-height`, `--search-paddingBlock`); no min-width unless `search['searchMinWidth']`; buttons inside are plain buttons: write `button['btnIconOnly' 'btnTransparent']` on the submit and the close |
| search suggestion labels | `innerHTML = icon + item.label`: a source could inject HTML | the label is escaped (text only); the icon is the markup of `searchIconSuggestion` (default `icon-magnifyingGlass`) |
| search list below `minLength`, and with no result | the list stayed closed | with a source set, the list opens with a message instead: `_search-suggestions-placeholder` ("Type at least {minLength} characters") below `minLength`, `_search-suggestions-empty` ("No results found") for an empty result |
| search list items | `search-suggestions-item flexRow` (flex row, fixed padding) | `_search-suggestions-item`, flex row and gap in the component itself; hover/selected colors read the button tokens (`--current-*`, `--hover-*`) |
| search instance | `refresh()` re-ran the query and returned the Promise; Tab only closed the list; a click outside only closed it | `refresh()` is destroy + rebuild keeping `configure()` options (the query re-run is `search()`); Tab and an outside pointerdown also cancel the pending debounce and request so the list cannot reopen |
| summary collapsed height | JS wrote `--summary-content-max-height` (px) on the content; the CSS default before the script was `5.7rem`; always 3 lines | the author sets `--summary-lines` (number, default 3) on the summary or its content; the module reads it, never writes it, and animates `--_summary-content-height`; before the script runs `max-height` is `--summary-lines * 1lh`; a `ResizeObserver` re-measures (hidden tabs, resized content) instead of a window `resize` |

### B. Renames and removals (net)

#### Modal
| master | now | note |
| --- | --- | --- |
| `pgs-option="containerID[x]"` | `pgs-data="modalContainerID[x]"` | on the wrapper (or the dialog); id without `#` |
| `pgs-option="containerPGS[x]"` | `pgs-data="modalContainerPGS[x]"` | first element carrying that pgs token |
| `pgs-option="disableBackdropClose"` | `modal['dialogDisableBackdropClose']` | also sets `cursor: auto` on the backdrop |
| `pgs-option="history"` | `modal['dialogHistory']` | still needs a `modal-button` with an `id` |
| `pgs-option="topLevel"` (on `<dialog>`) | `modal['dialogTopLevel']` | see A for the size and position it no longer gives |
| `pgs-option="left"` / `"right"` (on `<dialog>`) | `modal['dialogLeft']` / `modal['dialogRight']` | add `'dialogSmall'` for the old 400px-ish width |
| `pgs-option="buttonClose"` (generated close) | gone | the generated close is `button['btnIconOnly' 'btnMini'] _modal-close` |
| `pgs-option="buttonStrong"` on a modal's action button | `button['btnStrong']` | -> see [Buttons and forms](#part-5-buttons-and-forms) |
| token `dialog` (added by JS to the `<dialog>`) | `_dialog` (generated, carries `_dialog['dialogRight' ...]`) | never write it; a project selector on `[pgs~="dialog"]` becomes `[pgs~="_dialog"]` |
| `modal-close` (generated) | `_modal-close` (generated); `modal-close` stays for the hand-written button | `pgs.modal.api(el).closeButton` is either |
| (no master equivalent: the panel was always full width) | `dialogSmall` (1/3 page), `dialogMedium` (1/2), `dialogFull` | `dialogFull` = `max-width: 100%` |
| (no master equivalent: always top, centered horizontally) | `dialogTop`, `dialogBottom`, `dialogCenter` (both axes; do not combine with the others) | |
| unchanged names | `modal`, `modal-button`, `modal-dialog`, `modal-dialog-content`, `modal-dialog-content-header`, `modal-dialog-content-scroll` | `modal-dialog-content-scroll` max-height is `100%` of the fixed-height dialog now (was `90svh - header`) |

#### Dropdown and tooltip
| master | now | note |
| --- | --- | --- |
| `pgs-option="dropdownHover"` | `dropdown['drpHover']` | see A for the click change |
| `pgs-option="position[side align]"` | `pgs-data="dropdownPosition[side align]"` | same values: side top/right/bottom/left, align top/right/bottom/left/center; default `bottom center` |
| `pgs-option="buttonReverse"` on the trigger | `button['btnReverse']` | -> see [Buttons and forms](#part-5-buttons-and-forms) |
| `pgs="dropdown tooltip"` | `pgs="dropdown"` | |
| `pgs="dropdown-button button tooltip-button"` + `pgs-option="buttonMini"` | `pgs="dropdown-button button['btnMini']"` | master's `--fa-size: .9rem` on the glyph is not carried over |
| `pgs="dropdown-content tooltip-content"` | `pgs="dropdown-content"` | master gave the tooltip `--dropdown-padding: 15px`; keep it with `--dropdown-padding: 15px` on the element |
| | every dropdown draws one: `dropdown['drpNotArrow']` removes it | |
| (new, written by the module) | `pgs-state="sideTop\|sideRight\|sideBottom\|sideLeft"` on `dropdown-content` | where the content actually landed; the arrow reads it. Never write them |
| `pgs.dropdown.*` called through `tooltip` docs | same API | tooltip had no module of its own |

#### Menu
| master | now | note |
| --- | --- | --- |
| `pgs-option="horizontal"` | `menu['menuHorizontal']` | |
| `pgs-option="vertical"` | `menu['menuVertical']` | vertical is still the layout without `menuHorizontal`; the flag only says it out loud |
| `pgs-option="menuHeader"` | gone | no replacement flag: put the button flags you want on each link |
| `pgs-option="menuIconOnlyCurrent"` / `"menuShort"` | `menu['menuIconOnlyCurrent']` / `menu['menuShort']` | |
| `pgs-option="position[...]"` (menu / its `li`) | gone | the module writes `pgs-data="dropdownPosition[bottom center]"` on the floating `li` itself |
| `menu-buttonIcon` (generated toggle, `+ dropdown-button button` + `pgs-option="buttonNohover"`, a `<span>&#9207;</span>`) | `_menu-submenuButton button['btnMini' 'btnIconOnly']` (generated, `<i pgs="icon['icon-chevronDown']">`); `dropdown-button` is added only on a floating submenu | a rule or script that expected `button > span` must read the icon instead |
| (no master equivalent) | `menu-submenuButton` hand-written, bare, right after the link: `pgs="menu-submenuButton button['btnMini' 'btnIconOnly']"` with any icon inside | the module wires `aria-expanded`/`aria-controls`/click and rotates the icon 180deg; never generates a second one |
| (no master equivalent) | `_menu-accordion` on the `li` of every in-place submenu | generated |
| `pgs-option="buttonNohover"` on the generated toggle | gone | the toggle simply has the button hover; a link/button of your own that must not react: `button['btnNotHover']` (-> see [Buttons and forms](#part-5-buttons-and-forms)) |
| `<a>` of a menu item, implicitly a button | `<a pgs="button['btnTransparent']">` (+ `'btnCurrent'`) written by you | |

#### Alerts
| master | now | note |
| --- | --- | --- |
| `pgs="alert" pgs-state="info"` | `pgs="alert['alertInfo']"` | |
| `pgs-state="success"` / `"warning"` / `"error"` | `alert['alertSuccess']` / `['alertWarning']` / `['alertError']` | `pgs-state` is not read on an alert any more; `alert['alertNeutral']` is new and equals no flag |
| `<i pgs="alert-icon" class="fa-solid fa-circle-info">` | `<i pgs="icon['icon-circleInfo'] alert-icon">` | glyphs `icon-circleInfo`, `icon-circleCheck`, `icon-triangleExclamation`, `icon-circleXmark` are built in; the card no longer sets a font size, `--icon-size` comes from `--alert-iconSize` |
| `alert-content`, `alert-content-title`, `alertContainer` | unchanged | a hand-written alert keeps the bare names |
| built by `pgs.alert.*`: `alert-icon`, `alert-content`, `alert-content-title` (bare, `pgs-state`) | `alert` + `alert['alertX']` card with generated `_alert-icon`, `_alert-content`, `_alert-content-title`, `_alert-dismiss`, `_alert-buttons` | a project rule that must reach JS-built cards targets the `_` names too |
| `pgs.alert.error/success/info/warning({ title, description, icon, root, container })` | same four, plus `pgs.alert.neutral()`; new options `id`, `dismissible`, `dismissIcon`, `closeTitle`, `timeout`, `buttons[]` | all new options are off unless given; the returned element has `pgsAlertClose()` |
| (no master equivalent) | events `pgs:alert:close` (on the card just before removal) and `pgs:alert:buttonClick` (cancelable) | |

#### Notification
| master | now | note |
| --- | --- | --- |
| `pgs="modal-button button notificationBell" pgs-option="buttonIcon"` inside a `<div pgs="modal">` | `<button pgs="button['btnIconOnly'] notificationBell">` anywhere, no wrapper, no `modal-button` | any number of bells share one panel; `icon-bell` is in the myIcons pack, not in the built-in glyphs |
| `pgs-option="right"` (panel on the right) | default; a bell chooses with `notificationBell['dialogLeft']`, `['dialogRight']`, `['dialogTop']`, `['dialogBottom']`, `['dialogCenter']` | the size is never the bell's choice |
| `notificationBell-counter` | unchanged (hand-written, bare); generated one is `_notificationBell-counter` | |
| `notificationLoad` + `pgs-option='notification[{...}]'` | `notificationLoad` + `pgs-data='notification[{...}]'` | JSON: `message` is `description` and `title-close` is `closeTitle` (the old keys still work); new `dismissIcon`, `type: "neutral"`, `id`; `buttons[].optionButton` is now a flag of `button[...]` (e.g. `btnMini`, not `buttonMini`) |
| `notifications` (list) | `_notification` inside `_notification-dialog` (both generated) | |
| `notifications-element`, `-content`, `-icon`, `-buttons`, `notifications-element-buttons-delete` | the `_alert` card: `_alert-content`, `_alert-icon`, `_alert-buttons`, `_alert-dismiss` | |
| `notifications-empty` | `_notification-empty` | generated |
| (no master equivalent) | `_notification-close` (close button above the first card) | generated |
| `pgs-state="success\|error\|warning\|info"` on a notification | `_alert['alertSuccess'\|'alertError'\|'alertWarning'\|'alertInfo']` | |
| `pgs:notification:buttonClick`, `pgs:notification:close` | `pgs:alert:buttonClick`, `pgs:alert:close` | `detail` gained `element` |
| `pgs:notification:deleteAll` (detail `ids`) | gone | `deleteAll()` closes every card, one `pgs:alert:close` each |
| `pgs.notification.error/success/info/warning/deleteAll/init/trigger` | unchanged, plus `neutral()` | `init`/`trigger` also bind bells |
| `data-notification-id` on a card, `data-initialize` on `notificationLoad` | gone | read `detail.id` of the events |

#### Toast
| master | now | note |
| --- | --- | --- |
| `toastLoad` + `pgs-option='toast[{...}]'` | `toastLoad` + `pgs-data='toast[{...}]'` | JSON keys `message`, `title-close`, `duration` still accepted as aliases of `description`, `closeTitle`, `timeout`; `link` and `title-link` are not (see A); new `buttons[]`, `dismissIcon`, `position`, `type: "neutral"` |
| `toastExe` (+ `pgs-option='toast[...]'`, fires on click) | gone | write a click listener: `button.addEventListener("click", () => pgs.toast.success({ title, description, timeout }))` |
| `pgs.toast.*({ link, linkTitle })` | `pgs.toast.*({ buttons: [{ title, link }] })` | |
| `toast` container (hand-written) | unchanged | a generated one is `_toast` |
| `toast-element`, `-content`, `-icon`, `-buttons`, `toast-element-buttons-delete` | the `_alert` card and its `_alert-*` children | |
| `pgs-state="success\|error\|warning\|info"` on `toast-element` | `_alert['alertSuccess'\|'alertError'\|'alertWarning'\|'alertInfo']` | |
| (no master equivalent: always top center) | position values `toastLeft`, `toastRight`, `toastCenter`, `toastBottom` | NOT flags you write: the JSON `"position": ["toastRight"]` / the `position` option of `pgs.toast.*` for that toast only; the module copies them to `_toast['toastRight']`. A hand-written `toast['toastLeft']` container keeps it as a baseline |
| `pgs.toast.*`, `deleteAll`, `init`, `trigger` | unchanged, plus `neutral()`; `timeout` default still 4000 | `pgs.toast.execute` was never public |

#### Legacy notification
| master | now | note |
| --- | --- | --- |
| `<div pgs="hidden notificationTrigger" pgs-option='notification[{ "element": "toast", ... }]'>` | gone | split it: `notificationLoad` (persistent list) or `toastLoad`, both with `pgs-data`; `link` / `title-link` become `buttons[]`; `duration` still accepted |
| `pgs.legacyNotification` (`init`, `trigger`) | gone | |
| `pgs.notification.alert.*`, `pgs.notification.toast.*` | `pgs.notification.*`, `pgs.toast.*` | |
| `_legacyNotification.js` | gone | |

#### Search
| master | now | note |
| --- | --- | --- |
| `pgs="button search"` | `pgs="search"` (+ `role="search"`) | |
| `pgs-option="buttonNohover"` on the search | gone | the form is not a button any more |
| submit `<button type="submit">` with `fa-search` | `<button pgs="button['btnIconOnly' 'btnTransparent']" type="submit">` with `<i pgs="icon['icon-magnifyingGlass']">` | |
| `search-suggestions` | unchanged (direct child of `search`, required) | |
| `search-suggestions-item` (generated, + `flexRow`) | `_search-suggestions-item` (generated) | |
| `search-modal`, `search-mobile` | gone | never implemented: no CSS, no JS; delete them or keep them as your own hooks |
| `pgs-option="containerPGS[header]"` on the modal around a search | `pgs-data="modalContainerPGS[header]"` | |
| `pgs-option="buttonIcon"` on its `modal-button` / `modal-close` | `button['btnIconOnly']` | -> see [Buttons and forms](#part-5-buttons-and-forms) |
| (no master equivalent) | `search['searchMinWidth']` (21.4rem minimum from the mobile breakpoint, which master applied always) | |
| (no master equivalent) | `pgs-data="searchPlaceholder[text]"`, `searchNoResults[text]`, `searchIconSuggestion[markup]` | `{minLength}` is replaced in `searchPlaceholder` |
| (no master equivalent) | generated `_search-suggestions-placeholder`, `_search-suggestions-empty` | |
| `pgs-state` `open`, `loading`, `error`, `selected` | unchanged | |
| `instance.refresh()` (re-ran the query, returned a Promise) | `instance.search()` | `refresh()` now rebuilds the instance |

#### Summary
| master | now | note |
| --- | --- | --- |
| `pgs-option="showMore[text]"` | `pgs-data="summaryShowMore[text]"` | |
| `pgs-option="showLess[text]"` | `pgs-data="summaryShowLess[text]"` | `pgs.summary.init(root, { message: { showMore, showLess } })` keeps its keys |
| `--summary-content-max-height` | `--summary-lines` | gone, not renamed: see C |
| unchanged | `summary`, `summary-content`, `summary-button` (required direct children, a missing one is skipped with a warning), states `overflow`, `open` | |

### C. Custom properties

Renamed:
| master | now |
| --- | --- |
| `--modal-padding` (`var(--padding)`) | `--modal-content-padding` (`var(--padding-elements)`) |
| `--dropdown-max-inline-size` | `--dropdown-maxInlineSize` |
| `--dropdown-left` / `--dropdown-top` (written by JS on the content) | `--_dropdown-left` / `--_dropdown-top` |
| `--notification-timeout` (written by JS on the toast) | `--_alert-timeout` (same, on every timed card) |
| `--search-suggestions-background` / `-color` / `-border` / `-borderRadius` | `--search-background` / `--search-color` / `--search-border` / `--search-borderRadius` |
| `--search-suggestions-item-selected-background` / `-color` | `--search-suggestions-item-background-selected` / `--search-suggestions-item-color-selected` |
| `--summary-content-max-height` | `--summary-lines` (a line count, not a length) |
| keyframes `toast-timeline` | `alertTimeline` |

Removed without replacement:
- `--menu-background`, `--menu-background-current`, `--menu-background-strong`, `--menu-border`, `--menu-color`, `--menu-color-current`, `--menu-color-strong`: set the button tokens on the link instead (`--button-background`, `--button-color`, ... see [Buttons and forms](#part-5-buttons-and-forms)).
- `--notification-background`, `--notification-color`, `--notification-shadow-color`, `--toast-background`, `--toast-background-timer`, `--toast-color`, `--toast-shadow-color`: use `--alert-background`, `--alert-color`, `--alert-accent` (severity accent; icon color), `--alert-content-title-color`. The toast box-shadow is gone.
- `--dropdown-maxwidth`, `--dropdown-position-right` (set only by tooltip, read by nothing).
- `--search-suggestions-boxShadow`, `--search-suggestions-gap` (items use `--search-suggestions-item-padding` as their gap now).

New (public, tunable): `--modal-offset` (`--gap-texts`), `--modal-animation-timing` (333ms), `--modal-animation-easing`, `--dropdown-arrow-size` (7px), `--dropdown-borderWidth`, `--dropdown-borderColor` (the border is composed of them; `--dropdown-border` still overrides all three), `--dropdown-maxBlockSize`, `--alert-iconSize` (3.5rem), `--search-height`, `--search-paddingBlock`, `--search-suggestions-item-background-hover`, `--search-suggestions-item-color-hover`, `--summary-lines`.
New, written by the module (never set): `--_modal-zoom-x|y|scaleX|scaleY`, `--_modal-drag-y`, `--_modal-drag-progress`, `--_dropdown-arrowLeft`, `--_dropdown-arrowTop`, `--_dropdown-arrow-inset`, `--_alert-timer`, `--_summary-content-height`.

Kept, default changed (value visible):
| property | master | now |
| --- | --- | --- |
| `--modal-background` | `var(--color-box)` | `var(--color-background)` |
| `--menu-gap-column` | `2px` | `.5rem` |
| `--alert-accent` | `var(--color-primary)` | `initial` (neutral) |
| `--alert-background` | `var(--color-primary-soft)` | `var(--color-box)` |
| `--alert-padding` | `var(--padding-2)` | `var(--padding-texts)` |
| `--search-suggestions-offset` | `.5rem` | `0rem` |
| `--search-suggestions-maxHeight` | `32rem` | `70vh` |
| `--search-suggestions-item-padding`, `--search-suggestions-padding` | `1rem`, `.5rem` | unchanged |
| `--dropdown-*` (background, color, padding `1rem`, inline-size, display) | | unchanged values |

### D. Sass
- Partials: `components/modals` is `components/modal` (`@include meta.load-css("components/modal")` in `assets/scss/index.scss`); `components/tooltip` is deleted (no replacement, see B Dropdown). `notification`, `toast`, `alerts`, `search`, `summary`, `menu`, `dropdown` keep their names.
- No `$variable`, mixin or function is exported by these components; a stylesheet that overrode them writes custom properties (C) or the selectors in B.
- The mixins these components included are gone or renamed: `button_header()`, `buttonNohover()`, `buttonContent()` (menu, search), `flexRow()`, `flexColumn()` (modal, alert, search) -> see [Buttons and forms](#part-5-buttons-and-forms) and [Utilities](#part-3-utilities). `buttonBase()`, `buttonHover()`, `buttonCurrent()`, `sectionNoPadding()` still exist but the menu no longer includes them: a project that copied the menu rules includes them on its own link selector, or writes the tokens in the markup.
- Selector shape: option flags and child tokens of these components are inside `:where()` now (one point of specificity lighter), and a root also matches the bracket form (`[pgs*="modal\5B"]`): a project override with one class or attribute now wins. Hits: dropdown, menu, modal, alert, search, summary, toast.

### E. JavaScript
- File/module names: `components/_modals.js` is `components/_modal.js`; `_legacyNotification.js` and `pgs.legacyNotification` are gone; `pgs.notification.alert.*` / `.toast.*` are gone.
- Events (all bubble, `detail.element` always present): `modal:open`, `modal:close` -> `pgs:modal:open`, `pgs:modal:close` (`detail`: `element`, `modal`, `dialog`; the wrapper and the dialog are both reached once even when the dialog was moved to the body); `pgs:notification:buttonClick|close|deleteAll` -> `pgs:alert:buttonClick|close` (no `deleteAll`); `pgs:search:select` / `pgs:search:error` keep their names and now bubble through `pgs.helper.dispatch`.
- Instance API: every instance has `destroy()` and `refresh()` (destroy + init, returns the new instance). New in this area: `modal.destroy()` (closes an open dialog and, for a wrapper that left the page, removes the moved dialog), `dropdown.reposition()` / `destroy()`, `menu.destroy()`, `search.destroy()` (existed) and `search.search()` as the re-run, `summary.destroy()`. `pgs.menu.api(el).refresh()` reuses the generated toggles. `init(root)` of every module also initializes `root` itself.
- `pgs.dropdown` / `pgs.modal` states written on the DOM: dialog `pgs-state` `animationIn`, `animationOut`, `dragging`, `dragClose` (new); dropdown-content `sideTop|sideRight|sideBottom|sideLeft` (new); dropdown/`li` `open` (unchanged).
- Listeners: the dropdown document/window listeners are registered once at module load (not per `init()`); `pgs.dropdown.init()` on a dropdown with no `dropdown-content` warns and skips; `pgs.modal.init()` on a wrapper with no `<dialog>` warns and skips.
- Alert/notification/toast API: `pgs.alert.*` and the cards of `pgs.notification.*` / `pgs.toast.*` return/hold an element with `pgsAlertClose({ immediate })`; closing twice raises one `pgs:alert:close`; `buttons[].link` is URL-filtered (A); `closeTitle` default is `Close` (alert), `Close notification`, `Close toast`; panel and empty texts are internal defaults (`Close`, `No notifications`); a call made before `<body>` exists waits for the document; `pgs.notification.*` with no `notificationBell` on the page warns once.
- Toast/notification JSON: `type` is `neutral | error | success | warning | info`, anything else falls back to `info`; `icon: null` / omitted uses the glyph of the type, `""` shows none; `title` omitted falls back to the type's title, `""` shows none; invalid JSON in `pgs-data` warns `pgs.<module>.init(): invalid JSON in pgs-data`. Entries with neither title nor description are skipped.
- Search: `configure`, `setSource`, `search`, `open`, `close`, `clear`, `cancel`, `select`, `items`, `isOpen`, `isLoading`, `setActiveIndex` unchanged; `refresh()` changed (A); `onSelect` / `pgs:search:select` detail `{ element, item, index, value, input }`; the suggestion `data` for a string source stays the string.
- Summary: `pgs.summary.init(root, options)` throws a `TypeError` starting `pgs.summary.init():` on bad `options` / `options.message`; `pgs.summary.api(el).refresh()` keeps the open/closed state.
- Markup attributes a script can notice: `modal-button` no longer always has `role="button"` / `aria-label`; `<dialog>` has no `aria-expanded`; the focus target (header or dialog) has `tabindex="-1"`; `notificationBell` gets `aria-haspopup="dialog"` and a live `aria-expanded`; every `dropdown` trigger gets `aria-controls`, `aria-haspopup`, `aria-expanded` (unchanged).
- Safari fixes inside the modal, no API: `focus({ preventScroll: true })`, `overflow: clip` while `animationIn` runs, `100dvh`.

### F. New (opt-in)
- `modal['dialogAnimationZoom']`: panel grows out of the `modal-button`; `dialogAnimationLeft|Right|Top|Bottom` slide from an edge; tuned by `--modal-animation-timing` / `-easing`, off under `prefers-reduced-motion`.
- `modal['dialogDragClose']`: touch drag-down closes the panel (bottom-sheet look with `dialogBottom dialogFull dialogAnimationBottom`).
- `modal['dialogSmall' | 'dialogMedium' | 'dialogFull']`, `['dialogTop' | 'dialogBottom' | 'dialogCenter']`.
- `dropdown['drpNotArrow']` (opt out of the default arrow), `--dropdown-arrow-size`.
- `menu-submenuButton`: a toggle you write yourself, with the icon of your choice.
- `alert['alertNeutral']`, `pgs.alert.neutral()`, `pgs.notification.neutral()`, `pgs.toast.neutral()`.
- `dismissible`, `dismissIcon`, `closeTitle`, `timeout` (with the countdown bar), `buttons[]`, `id` on `pgs.alert.*`; `pgsAlertClose()` on the card; `pgs:alert:close`, `pgs:alert:buttonClick`.
- `notificationBell` bracket flags (`dialogLeft|Right|Top|Bottom|Center`) choose where the one panel opens; any number of bells.
- Toast position: `"position": ["toastLeft" | "toastRight" | "toastCenter" | "toastBottom"]` in the JSON or in the `pgs.toast.*` options.
- `search['searchMinWidth']`, `pgs-data` `searchPlaceholder`, `searchNoResults`, `searchIconSuggestion`.
- `--summary-lines`: the number of lines a summary keeps visible.

### G. Sweep
Patterns use `grep -rnE` (`-P` where noted).

```
# 1. modal options still written as pgs-option (also left/right/topLevel on a <dialog>, buttonClose).
grep -rnE 'pgs-option="[^"]*\b(containerID|containerPGS|disableBackdropClose|history|topLevel|left|right|buttonClose)\b' .
```
-> move each into `modal['dialogX']` / `pgs-data="modalContainerID[...]"` per B; re-check width and vertical position of `left`/`right`/`topLevel` (A).

```
# 2. dropdown, menu, summary options still written as pgs-option.
grep -rnE 'pgs-option="[^"]*\b(dropdownHover|position\[|horizontal|vertical|menuHeader|buttonNohover|showMore|showLess)' .
```
-> rename per B (`drpHover`, `dropdownPosition`, `menuHorizontal`, `menuVertical`, `summaryShowMore`...); `menuHeader` is deleted.

```
# 3. the tooltip tokens.
grep -rnE 'pgs="[^"]*\btooltip(-button|-content)?\b' .
```
-> plain `dropdown` markup (B Dropdown).

```
# 4. the old event names.  -P
grep -rnP '(?<!pgs:)\bmodal:(open|close)\b' .
# 4b. notification events and the legacy API.
grep -rnE 'pgs:notification:|pgs\.notification\.(alert|toast)\b' .
```
-> `pgs:modal:*`; `pgs:alert:buttonClick` / `pgs:alert:close`.

```
# 5. generated tokens of the removed notification/toast markup.  -P
grep -rnP '(^|[ "(.>\x27])notifications(-element[-a-z]*|-empty)(?![-\w])|toast-element[-a-z]*' .
```
-> delete or target `_alert*` / `_notification*`.

```
# 6. toastExe, notificationTrigger, legacy module.
grep -rnE '\b(toastExe|notificationTrigger|legacyNotification)\b|pgs\.notification\.(alert|toast)\b' .
```
-> rewrite as `toastLoad` / `notificationLoad` or a click listener calling `pgs.toast.<type>()`.

```
# 7. toast link options, and the notification/toast JSON still in pgs-option.
grep -rnE '"title-link"|\blinkTitle\b' .
grep -rnE "pgs-option=.(toast|notification)\[" .
```
-> `buttons: [{ title, link }]`; move the JSON to `pgs-data`.

```
# 8. alert severity written as a state.
grep -rnE 'pgs-state="(info|success|warning|error)"' .
```
-> `alert['alertInfo'|'alertSuccess'|'alertWarning'|'alertError']`. (A hit on a badge or another component belongs to its own area.)

```
# 9. bell wrapped in a modal.
grep -rnE 'pgs="[^"]*\bmodal-button[^"]*\bnotificationBell|pgs="[^"]*\bnotificationBell[^"]*\bmodal-button' .
```
-> remove `modal-button` and the `<div pgs="modal">` around the bell; `button['btnIconOnly']` instead of `buttonIcon`.

```
# 10. search written as a button, the unimplemented hooks, the old item token.  -P for the last
grep -rnE 'pgs="[^"]*\bbutton search\b' .
grep -rnE 'search-(modal|mobile)\b' .
grep -rnP '(?<![_\w-])search-suggestions-item(?![-\w])' .
```
-> `pgs="search"` + button flags on the inner buttons; delete the hooks; target `_search-suggestions-item`.

```
# 11. the generated menu toggle, and menus to read (their links need button tokens; submenus change behavior).
grep -rnE 'menu-buttonIcon' .
grep -rnE 'pgs="([^"]* )?menu(\[| |")' .
```
-> the second line only lists menus to open: every `<a>` of an item needs `button['btnTransparent']`, a vertical menu's submenus now open in place, each item with a submenu needs a direct `<a>`. (The hits in the current tree are the current references.)

```
# 12. removed custom properties.
grep -rnE -- '--(dropdown-(left|top|max-inline-size|maxwidth|position-right)|modal-padding)\b' .
grep -rnE -- '--menu-(background|border|color)[a-z-]*\b' .
grep -rnE -- '--(notification-(background|color|shadow-color|timeout)|toast-(background|background-timer|color|shadow-color))\b' .
grep -rnE -- '--(search-suggestions-(background|color|border|borderRadius|boxShadow|gap|item-selected-(background|color))|summary-content-max-height)\b' .
```
-> rename or delete per C; `--summary-content-max-height` becomes a line count.

```
# 13. renamed keyframes, and the Sass partial paths.
grep -rnE 'toast-timeline' .
grep -rnE 'components/(modals|tooltip)\b' .
```
-> `alertTimeline`; `components/modal`, no tooltip partial.

```
# 14. search instance refresh() used as "run the query again"  -P
grep -rnP 'search[^\n]{0,80}\.refresh\(' .
```
-> `.search()`; a plain rebuild stays `.refresh()`.

Read, not replace (no safe grep): every `pgs="modal"` whose `<dialog>` carries `pgs-option` (hit 1 lists them: `<dialog[^>]*pgs-option`); every `pgs="dropdown"` panel (arrow added, click propagation); every hand-written `pgs="alert"` with no state (now neutral, not primary); JS that calls `stopPropagation`-dependent logic around a dropdown trigger.

## Part 7: Content components

Components: card/box, accordion, slides, stepTabs, steps, summary, table, badge, breadcrumb, cookieConsent (removed), plus the removed `pgs.scrollHorizontal`.
Bracket form: every `pgs-option="x"` of these components is now a flag inside the component's own bracket, `pgs="card['cardMini']"`, several flags separated by a space, `pgs="badge['badgeSuccess' 'badgeDot']"`. `pgs-option` is not read by any component below any more (see [Core](#part-1-core-attribute-grammar-javascript-packaging) for the general rule).

### A. Same name, new meaning (silent)

| name | master | now |
| --- | --- | --- |
| `card`, a bare `<img>` / `<object>` that is a direct child of the card (or of its link) | styled without any token: full width, `object-fit: cover`, flush with the card | not styled. The element needs `pgs="card-img"` on itself (`card-img` was documented in master but had no CSS). Media you cannot put a token on (a helper that prints the `<img>`, a block of elements) goes in `pgs="card-imgForChild"` |
| `card` / `box` with `<a>` as first child (`<article pgs="card"><a href><img><div card-content>…</a></article>`) | the first-child link became the clickable surface (padding, white background, hover) | no longer recognized: the surface is the element that carries the token, `<a pgs="card" href>` / `<a pgs="box" href>`. The `<article>` + inner `<a>` markup now draws a plain card with the link inside it |
| `card` with no `card-content`, `card-img` or `card-imgForChild` as direct child (text written straight in it, a link with a label) | `padding: 0` | takes `--card-padding` all round (`cardMini` shrinks it). A card of just an image, or whose content is nested deeper, is unchanged. Two `card-content` blocks in a row halve the padding between them |
| `card` clipping | `overflow: hidden` on the card: every child cut at the rounded corners | no clipping on the card; only `card-img` / the child of `card-imgForChild` takes the top radius (`--card-borderRadius-item`) |
| clickable card / clickable box (`<a pgs="card">`, `<a pgs="box">`) | `--card-background` / `--box-background` = `--color-white`, `outline: var(--border-complete)`; hover and `:focus-visible` (fine pointer only) = `hover()`: `--color-primary-strong` background, white text, 38px glow `box-shadow`, instant (`transition: unset`) | background `--clickable-background` (= `--color-box`), text `--clickable-color`, border (card) / outline (box) from `--clickable-borderColor`; hover only under `(hover: hover) and (pointer: fine)`: `--hover-background` (= `--color-secondary-soft`), `--hover-color` (= `--color-secondary-strong`), no glow; headings and `p` inherit the link color; transition `--clickable-transition`. Retheme through the `--clickable-*` / `--hover-*` tokens (see [Foundation](#part-2-foundation-tokens-palette-base-icons)) |
| `cardHorizontal` | two columns decided by `flex-basis: calc((var(--card-horizontal-breakpoint) - 100%) * 999)`, `--card-horizontal-breakpoint` = 430px | the card is an inline-size query container (`container-type: inline-size`) and its children become a row at `@container (min-width: 430px)` (`$mobile`), a full line each below it. The threshold is fixed in the stylesheet (property gone, section C); because the card is a query container it no longer takes an intrinsic width from its content |
| card / box size defaults | `--card-padding` / `--box-padding` = `--padding` (30px); radius `calc(--border-radius-input (2.25rem) + padding)`; `cardMini` / `boxMini` padding `--padding-2` (15px); `boxMini` radius `--border-radius-input` | `--padding-elements` (3rem), radius `calc(--borderRadius-texts (1.5rem) + padding)`; `cardMini` / `boxMini` padding `--padding-texts` (1.5rem), `boxMini` radius `--borderRadius-texts` (1.5rem). Same padding, rounder corners are smaller |
| `accordion`, several next to each other | opening one closed every other accordion in the document (`pgs(document).querySelectorAll("accordion")`) | an accordion answers for itself; the one-at-a-time rule exists only inside `pgs="accordionContainer"`, scoped to the nearest container above each accordion. Without a container, panels stay open independently |
| `accordion` look | styled as a button (`buttonBase()`, `buttonContent()`, button hover/no-hover), `padding: 0 !important; display: block !important; width: 100% !important`; open: `margin-top: var(--padding)`, button padding, panel padding `--button-size * 2`; a leading `<i>` in the open button was lifted into a 40px badge above it; closed panel `max-height: 0` with padding / opacity transitions | flat surface: `--accordion-padding`, transparent, `--accordion-background-open` when open, a divider line above every accordion that is not `:first-child` (placed in the middle of the gap of the container, 1rem), no `!important`, no `--button-*` variables, no lifted `<i>`; panel animates `height: 0 → auto` over `--accordion-timing` (needs `interpolate-size: allow-keywords`, which comes from the `htmlBase` root; without it the panel snaps); chevron is `--accordion-icon` (`--icon-glyph-chevronDown`) rotated 180deg when open; focus ring on the button; nested accordion gets 10px inline padding |
| `accordion` open on load | `pgs-state="open"` written by hand | still honored, but the authored form is `accordion['accAutoOpen']`: the module writes `pgs-state="open"` itself, and the token protects that panel from the sibling rule until the reader opens or closes it by hand (then the token is removed from the element) |
| `accordion` generated label / scrolling | `aria-label` rewritten on every toggle as "Chiudi/Apri <text>" (Italian), overwriting a hand-written one; after opening, `accordion.scrollIntoView({block:"nearest"})` at 100ms | "Close/Open <text>" (English), written only when the button has no `aria-label` of its own (a hand-written one survives every toggle); the clicked button is held in place on screen while the layout above it moves, and the page scrolls only if the button ended up out of view |
| `slides`, generated arrows | absolutely positioned over the slides at 50% height, one at each edge (`left: 0` / `right: 0`; on tablet width pulled out by `--padding-page`); `display: none` at 430px and below | in a row above the slides at the end of the component (prev `margin-left: auto`, next `margin-right: 10px`, `order: -1`), shown at every width. The old placement is `slides['slidesArrowsCenter']` (one on each side at half of the track height, `left`/`right: .4rem`) |
| `slides`, hand-written arrows (`slides-next`, and `slides-prec` → `slides-prev`) | styled like the generated ones (absolute, centered, hidden on mobile) | the module still wires them, the stylesheet places nothing: position them with your own CSS |
| `slides`, generated dots | a boxed pill (`--color-box` background, border, padding .6rem) centered under the slides, dots 1.2rem with `padding .6rem`, the pill and the dots grow on hover | an unboxed row under the slides (`translateY(100% + --gap-texts)`), dots 1.5rem discs: `--clickable-background`, active `--current-background`, hover `--hover-background` (hover only with a fine pointer); the component reserves `margin-bottom: calc(var(--gap-elements) * 2)` while it holds a generated row; a hand-written `slides-dots` row gets the same row layout and the same dot look (every child is tagged `_slides-dots-dot`) |
| `slides`, mouse wheel | `pgs.scrollHorizontal(container, 5)` was attached to the track unless `notScrollWithMouse`: the vertical wheel moved the track sideways | nothing is attached: the track scrolls with swipe, trackpad, arrows, dots, keyboard focus. Write your own `wheel` listener if you want the old behavior |
| `slides`, "in view" | a slide counted as in view from 80% visible (`0.9 + ratio * 0.1 >= 0.98`) | from 97% visible (`intersectionRatio >= 0.97`); `getCurrentIndexes` / `getCurrentElements` follow, and `isAtStart()` / `isAtEnd()` now read the scroll position (end of the scroll, a margin of 1px) instead of "first / last slide is in view" |
| `slides`, arrows enabled state | disabled when the first / last slide is in view | disabled only when the scroll has run out (an edge slide carries a margin, so the arrow finishes the scroll); never disabled with `slidesLoop` |
| `slides`, scale effect | linear `scale: var(--visible-percent)` (0.9–1) on each slide's first child, only when the root carried exactly `pgs-option=slideScale` (CSS-only, undocumented); `notScrollAnimation` only stopped the JS from writing the number | opt-in `slides['slidesAnimationScale']`; the scale is the cube of the number (`--_slides-visiblePercent`, so 0.73–1), `transform-origin` center / left / right depending on the side of the slide in view; the module writes the number on every slide regardless |
| `slides`, geometry | slide `margin-inline: auto`; tablet width applied by a `@container (max-width: 800px)` rule; track `scroll-behavior: smooth` always; root a column, `align-items: center` | first / last slide `margin-left` / `margin-right: var(--page-edge)` (they line up with the page content); widths switched by `@media (max-width: 800px)` (`--slides-width-tablet`) and `@media (max-width: 430px)` (`--slides-width-mobile`), viewport instead of container; smooth scroll only without `prefers-reduced-motion`; root a wrapping row |
| `stepTabs`, icon of a dot | `<i class="fa-solid ${tabIcon}">`, default `fa-circle`: the module added `fa-solid` | built-in glyph `icon-circle` by default; a value that is not markup and does not start with `icon-` is a class list written through untouched (no `fa-solid` is added); markup is built as written |
| `stepTabs`, dot controls | `buttonBase()` + `buttonIcon()` mixins; no accessible name | the dot carries `button['btnIconOnly' 'btnNotHover']`, an `aria-label` ("Step N: <heading>" or "Step N"); the dots row gets `role="group"` when it has an `aria-label` and no role |
| `stepTabs`, `stepTabs-next` color | `--button-color: var(--color-whiteFixed)` | `--button-color: var(--color-primary-text)` |
| `stepTabs`, API arguments | `goTo(index)` clamped any number into range; `toggleLock(step, lock)` ignored a bad step silently and then re-ran `goTo(current)` (dispatching a change event); `next()` / `prev()` at the ends re-dispatched the change event; `restart()` went to step 0 and re-locked the tabs that were locked at build time, leaving others as they were | `goTo` and `toggleLock` throw `TypeError` for a non-integer or out-of-range index; `toggleLock` only redraws the controls (no event); `next()` / `prev()` at the ends do nothing and dispatch nothing; `restart()` puts every lock back to exactly what the markup declared (also removes locks added with `toggleLock`) |
| `stepTabs`, tabs lookup | `querySelectorAll("stepTabs-container-tab")` inside the container, any depth | direct children of `stepTabs-container` only; a wizard with no container or no tab is skipped with a console warning |
| `steps` | arrowhead (`::after`) on every connector line; circle `50px`; line `--color-gray`; `margin-bottom` / `padding-bottom` of the last step's content stayed (the rule targeted a nested `steps-step`, which does not exist) | no arrowhead; `--steps-circle-size` = `--heading-size-h3`, `--steps-line-color` = `--border-color`; the last step's content has no bottom padding / margin; the list is an `isolation: isolate` stacking context; `steps-step` is looked up as a direct child of the list only |
| `steps`, generated circle and line | tokens `steps-step-circle`, `steps-step-line` (same as a hand-written one) | generated ones carry `_steps-step-circle`, `_steps-step-line`; the stylesheet styles both forms, but a project rule on `[pgs~=steps-step-circle]` no longer reaches a generated circle. A generated circle is renumbered on every `refresh()` |
| `table`, zebra and hover | `--table-row-background-even` / `-odd` pointed at `--border-box-transparent` / `--border-box`, which are not defined anywhere: rows had no zebra background; borders `--border-complete-hover` (white); hover: `--color-secondary-soft` background and `--color-blackFixed` text unguarded; cells `--color-text` whatever the row color | zebra works: even `--color-box-transparent`, odd `--color-box`; borders `--border-width --border-color --border-style` (follow the border options); hover (fine pointer only) `--hover-background` / `--hover-color`; the cell inherits the row color, so `--table-row-color` and `--table-row-color-hover` reach it (default `--color-text`); radius `--borderRadius-texts`; inner `table`, `th`, `td`, `tr` rules are `:where()` (zero specificity), the wrapper `[pgs=table]` is unchanged |
| `badge` size | `--badge-size` (1.25rem) was the font size and the padding unit: padding `.625rem 1.25rem`, radius `--border-radius-input` (2.25rem), weight 700, icon `--badge-icon-size` 1.4rem | `--badge-size` (.85rem) is only the padding unit (padding `.85rem` all round, min-height `2.2 × size`); font size is `--badge-textSize` (1.25rem), icon `--badge-iconSize` (1.10rem, drawn with `scale: 1.3`); radius `--borderRadius-texts`, weight `--font-weight-title`. A project that set `--badge-size` to change the text size now changes only the padding |
| `badgePrimary` | `--color-primary-soft` background, `--color-primary-strong` text | solid `--color-primary` with `--color-primary-text` (the look of `btnPrimary`); the old look is `badgeSoft` |
| `badgeStrong` | `--color-primary` background, `--color-whiteFixed` text | `--color-primary-strong` background, `--color-white` text (the look of `btnStrong`) |
| `breadcrumb` look | link `--color-primary-strong`, weight 500, hover `--color-primary` + underline (unguarded); current page `--color-primary`, weight 600; separator = your own `<span>` (`margin: 0 8px`) | link `--breadcrumb-color`, no weight rule; hover (fine pointer) `--breadcrumb-color-hover` (`--hover-color`) + underline; current page `--breadcrumb-color-current` (`--current-color`), weight `--font-weight-bold`; separator drawn by `::after` of each item except the last (`--breadcrumb-separator-type` "/", color `--color-primary-soft`, gap .8rem), announced as nothing |
| `summary` collapsed height | `--summary-content-max-height: 5.7rem` in CSS, overwritten by the module with 3 line-heights in px | `--summary-lines` (default 3, read by the module and by the CSS as `lines × 1lh`); the module writes `--_summary-content-height` on the content. It keeps measuring with a `ResizeObserver` (a summary built inside a hidden tab is re-measured when shown) |
| every `pgs:*` event of these components (`pgs:stepTabs:change`, `pgs:tabs:change`, `pgs:pageNav:change`) | `stepTabs:change` was non-bubbling, `detail` = `{ current, total }` | bubbles; `detail` = `{ element, current, total }` |
| descendant rules of card, accordion, slides, steps, stepTabs, table, badge, summary | written as `[pgs~=card] [pgs~=card-content]` etc. | wrapped in `:where(...)`: specificity of the library rule drops, so a project override with fewer selectors now wins where it used to lose |

### B. Renames and removals (net)

#### card / box

| master | now | note |
| --- | --- | --- |
| `pgs-option="cardHorizontal"` | `pgs="card['cardHorizontal']"` | |
| `pgs-option="cardMini"` | `pgs="card['cardMini']"` | |
| `pgs-option="boxMini"` | `pgs="box['boxMini']"` | |
| `pgs-option="cardLegacy"` (CSS only, never documented) | gone | padded the card itself and pulled a direct `<img>` out to the edges with negative margins (`--card-img-base`, `--card-img-margin-*`). Use the standard card: `card-img` on the image, text inside `card-content` |
| bare `<img>` / `<object>` child of a card | `<img pgs="card-img">` | `card-img` is now the styled element |
| `<article pgs="card"><a href>…</a></article>`, `<div pgs="box"><a>…</a></div>` | `<a pgs="card" href>…</a>`, `<a pgs="box" href>…</a>` | the card / box must be the `<a>`. If the markup needs an `<article>` for semantics, put it around the `<a>` |
| media the card does not write itself | `<div pgs="card-imgForChild"><img></div>` | new wrapper, see F |
| `pgs="card"` combined with `pgs-option="column-2"` in examples | `-> see [Layout](#part-4-layout)` | `column-N` belongs to flex/grid |

#### accordion

| master | now | note |
| --- | --- | --- |
| implicit one-at-a-time across the whole page | `pgs="accordionContainer"` on the element that wraps the group (typically the `<ul>`) | new token; without it each accordion is independent |
| (none: closing others was always on) | `pgs="accordionContainer['accMultiOpen']"` | lifts the one-at-a-time rule inside that container; written on the container, not on an accordion |
| `pgs-state="open"` written in the markup to start open | `pgs="accordion['accAutoOpen']"` | `pgs-state="open"` in markup still works but belongs to the runtime. `accAutoOpen` stays open when a sibling opens, until the reader works that panel; then the module drops the token |
| `instance.refresh()` re-ran init on the parent | `instance.refresh()` rebuilds this accordion; new `instance.destroy()` | see E |

#### slides

| master | now | note |
| --- | --- | --- |
| `slides-prec` | `slides-prev` | token for a hand-written previous button. A leftover `slides-prec` is no longer found: the module builds a second button and the old one stays inert |
| `pgs-option="singleScroll"` | `pgs="slides['slidesSingleScroll']"` | the arrow starts from the slide the snap rests on (middle of those in view) |
| `pgs-option="shadowDesktop"` | `pgs="slides['slidesShadowDesktop']"` | fade at the edges from the tablet container width up; now a CSS mask on the track (no color), only on the side that still has slides |
| `pgs-option="slideScale"` (CSS only, exact attribute match) | `pgs="slides['slidesAnimationScale']"` | stronger scale, see A |
| `pgs-option="notScrollAnimation"` | gone | it only stopped a number being written; the scale is opt-in now, so there is nothing to switch off |
| `pgs-option="notScrollWithMouse"` | gone | the wheel conversion it switched off no longer exists (A, section E) |
| arrows over the slides, hidden on mobile | `pgs="slides['slidesArrowsCenter']"` | restores one arrow at each side, at half of the track height; the arrows are shown on mobile too |
| `pgs-option="buttonIcon"` on the generated arrows | gone | the module writes `button['btnIconOnly' 'btnMini']` and the glyph (`icon-chevronDown` rotated) itself. A hand-written arrow: `button['btnIconOnly']`, `-> see BUTTONS` |
| generated arrow `pgs="slides-prec button"` + `class="precButton"`, `pgs="slides-next button"` + `class="nextButton"` | `pgs="_slides-prev button[…]"`, `pgs="_slides-next button[…]"`, no classes | write `slides-prev` / `slides-next` yourself and the module leaves them alone |
| generated `<div pgs="slides-dots" class="slides-dots">` | `<div pgs="_slides-dots">` | |
| generated `<button class="slide-dot">` | `<button pgs="_slides-dots-dot">` | the token is also written on every child of a hand-written `slides-dots` |
| class `view` / `notView` on each slide | `pgs-state="view"` on a slide in view; no `notView` | threshold changed, see A |
| class `active` on the current dot | `pgs-state="active"` | `aria-current` is still written |
| JS-written style `--visible-percent` on the slide's first child | `--_slides-visiblePercent` | |
| `pgs.scrollHorizontal(element, speed)` | gone | `-> see` section E |

#### stepTabs

| master | now | note |
| --- | --- | --- |
| `pgs-option="tabIcon[fa-user]"` on a `stepTabs-container-tab` | `pgs-data="stepTabsIcon[fa-solid fa-user]"` | `fa-solid` is no longer added: write the whole class list. Other shapes: a built-in / myIcons glyph `stepTabsIcon[icon-circleCheck]`, or markup `stepTabsIcon[<i class='fa-solid fa-user'></i>]` (single quotes inside, mark your own element with `pgs='icon'` for the dot's icon box). Omitted: `icon-circle` |
| `pgs-option="step[N]"` written by the module on every dot | gone | |
| generated `stepTabs-dots-dot` | `_stepTabs-dots-dot` | CSS written against `[pgs~=stepTabs-dots-dot]` must follow |
| `pgs-state="is-active"` | `pgs-state="active"` | on the current tab and its dot |
| `pgs-state="is-completed"` | `pgs-state="completed"` | on the dots behind the current one |
| `pgs-state="is-locked"` | `pgs-state="locked"` | the one state written by hand: `<section pgs="stepTabs-container-tab" pgs-state="locked">` |
| `pgs-option="buttonReverse"` on `stepTabs-next` | `pgs="stepTabs-next button['btnReverse']"` | `-> see BUTTONS` |
| event `stepTabs:change` | `pgs:stepTabs:change` | bubbles; `detail` has `element` too |
| `data-step-tabs-initialized="true"` written on the root | gone | initialization is remembered in the instance (`pgs.stepTabs.api(el)`) |
| `stepTabs:go`, `:next`, `:prev`, `:reset`, `:toggle-lock`, `:get` (only in a comment block of the JS, never implemented) | n/a | use the instance methods |

#### steps

| master | now | note |
| --- | --- | --- |
| generated `steps-step-circle` / `steps-step-line` | `_steps-step-circle` / `_steps-step-line` | bare names stay valid for hand-written ones |

#### summary

| master | now | note |
| --- | --- | --- |
| `pgs-option="showMore[Show more] showLess[Show less]"` | `pgs-data="summaryShowMore[Show more] summaryShowLess[Show less]"` | `pgs.summary.init(root, { message: { showMore, showLess } })` keeps its keys; they are written as `summaryShowMore` / `summaryShowLess` |
| `--summary-content-max-height` | `--summary-lines` | section C |

#### badge

| master | now | note |
| --- | --- | --- |
| `pgs-option="badgePrimary"` | `pgs="badge['badgePrimary']"` | look changed, see A; the old look is `badgeSoft` |
| `pgs-option="badgeStrong"` | `pgs="badge['badgeStrong']"` | look changed, see A |
| `pgs-option="badgeSuccess"` / `badgeWarning` / `badgeError` / `badgeInfo` / `badgeNeutral` / `badgeDot` | `pgs="badge['badgeSuccess']"` etc., combined as `badge['badgeSuccess' 'badgeDot']` | same look |
| `pgs-option="badgePrimary"` for the old light look | `pgs="badge['badgeSoft']"` | new flag |
| `<i class="fa-solid …">` inside a badge | `<i pgs="icon['icon-…']">` | the badge styles `i`, `[pgs~=icon]` and `[pgs*="icon["]`; `--fa-*` variables are ignored (`-> see [Foundation](#part-2-foundation-tokens-palette-base-icons)` for icons) |

#### breadcrumb

| master | now | note |
| --- | --- | --- |
| `<span pgs="breadcrumb-item-separator" aria-hidden="true">></span>` | gone: delete the span | drawn by `::after` of each `breadcrumb-item`; the character is `--breadcrumb-separator-type` (`">"` was the markup, default now `"/"`) |
| component files `breadcumbs` (typo) in `reference/html`, `docs`, `assets/scss/components` | `breadcrumb` | only matters for a project that imports the partial or reads the reference |

#### cookieConsent (removed from the library)

| master | now | note |
| --- | --- | --- |
| `pgs.cookieConsent`, `pgs.cookieConsent.init(root)` | gone | |
| `<div pgs="hidden cookieConsent" pgs-option='cookieConsent[{…json…}]'>` marker that the module replaced with a generated modal | gone | the library no longer builds the banner. What the master pattern did: read the JSON (titles, description, privacy / cookie policy URLs, essential and analytics texts, `gaId`), build a `modal` + dialog with an essential row (`badge['badgeSuccess']`) and an analytics `toggle`, open on load when no preference was saved, store the choice in `localStorage` key `pgs_cookie_preferences_v1`, set Google Consent Mode defaults (`analytics_storage: denied`), load `gtag.js` for `gaId` only after consent, mark the root `cookieConsent-accepted` / `-declined` / `-gaUnavailable` |
| `cookieConsent-panel`, `-panel-featureEssential`, `-panel-badge`, `-panel-featureAnalytics`, `-panel-toggleAnalytics`, `-actionReject`, `-actionAccept` | gone as `pgs` tokens | generated tokens of the module |
| `cookieConsent-actionOpen` (a control you wrote that reopened the panel) | class `cookieConsent-actionOpen` (not a `pgs` token) | the control keeps working only in a project that carries the PGS_theme module below |
| `cookieConsent-gaUnavailable`, `-accepted`, `-declined` (runtime `pgs` tokens on the root) | classes `cookieConsent--gaUnavailable`, `cookieConsent--accepted`, `cookieConsent--declined` on `#cookieConsent` | in PGS_theme |
| `--cookie-bg`, `--cookie-color`, `--cookie-border` | gone | never set from outside in the library; PGS_theme styles `.cookieConsent` with its own SCSS |
| `assets/scss/patterns/_cookieConsent.scss`, `assets/javascript/patterns/_cookieConsent.js`, `docs/patterns/cookieConsent.md`, `reference/html/patterns/cookieConsent.html` | gone, together with the `patterns` group | |
| footer demo button `pgs="button cookieConsent-actionOpen"` in `reference/html/layout/footer.html` | `-> see [Layout](#part-4-layout)` | |

What a project must do: the replacement is in the `PGS_theme` project. `modules/md-cookieConsent.php` writes the banner markup (a `modal['dialogTopLevel' 'dialogBottom' 'dialogRight' 'dialogMedium']` wrapper `#cookieConsent.cookieConsent` with `data-ga-id`, the `cookieConsent-*` classes, `badge['badgeSuccess']`, `toggle`, `button['btnStrong']`), `assets/javascript/modules/_md-cookieConsent.js` holds the consent logic (same `localStorage` key, so saved choices carry over; uses `pgs.modal`), `assets/scss/modules/_md-cookieConsent.scss` the styles, `modules/md-footer.php` the reopen button. A project that is not on PGS_theme must copy those three files (or write its own banner); nothing in mypgs replaces them.

#### Removed helper

| master | now | note |
| --- | --- | --- |
| `pgs.scrollHorizontal(element, speed)` (`assets/javascript/helper/_scrollY.js`, `docs/helper/scrollHorizontal.md`) | gone, no replacement | turned the vertical wheel into horizontal scroll when the container could still move, ignored trackpads (`TrackpadDetector`), `Ctrl` and native horizontal wheel, returned a function that removed the listener. Write your own `wheel` listener (`passive: false`, `preventDefault` only when the container can still scroll in that direction) |

### C. Custom properties

Renamed:

| master | now |
| --- | --- |
| `--slide-width` | `--slides-width` (same default, `calc(var(--page-width) / 2.3)`) |
| `--slide-width-tablet` | `--slides-width-tablet` (100%) |
| (none; mobile used the tablet value) | `--slides-width-mobile` (100%, below 430px) |
| `--slide-shadow-width` (100px) | `--slides-sizeMaskImage` (40px), the fade length of `slidesShadowDesktop` |
| `--table-row-hover-background` | `--table-row-background-hover` |
| `--table-row-hover-color` | `--table-row-color-hover` |
| `--badge-icon-size` (1.4rem) | `--badge-iconSize` (1.10rem) |
| `--visible-percent` (JS-written on the slide's first child) | `--_slides-visiblePercent` |
| `--summary-content-max-height` (JS-written on `summary-content`) | `--summary-lines` (author setting, 3) and `--_summary-content-height` (JS-written) |

Removed without replacement:

- `--slide-shadow-color` (the fade is a mask now, it has no color).
- `--card-horizontal-breakpoint` (the switch point is `$mobile`, 430px, written in the `@container` rule; to move it, write your own `@container` rule or use `cardHorizontalFixed`).
- `--card-img-base`, `--card-img-margin-top`, `--card-img-margin-right`, `--card-img-margin-bottom`, `--card-img-margin-left` (belonged to `cardLegacy`).
- `--cookie-bg`, `--cookie-color`, `--cookie-border` (cookieConsent left the library).
- `--button-*` variables no longer reach an accordion (it is no longer a button): use `--accordion-*` below.
- `--fa-size`, `--fa-primary-color`, `--fa-secondary-color`, `--fa-secondary-opacity` set by badge, stepTabs, steps, accordion, cookieConsent for Font Awesome: not set any more (icons use `--icon-size`; `-> see [Foundation](#part-2-foundation-tokens-palette-base-icons)`).

New (not in master):

- accordion: `--accordion-icon`, `--accordion-borderRadius`, `--accordion-padding`, `--accordion-timing`, `--accordion-background`, `--accordion-background-open`; `--accordionContainer-gap` (1rem).
- card: `--card-borderRadius-item`, `--card-horizontal-borderRadius-item`.
- boxNavSmart: `--box-border`, `--boxNavSmart-shadow`.
- slides: `--slides-sizeMaskImage`, `--slides-width-mobile`; registered internal `--slides-maskStart`, `--slides-maskEnd` (written by the stylesheet); JS-written `--_slides-height` (on the root, the measured height of the track), `--_slides-visiblePercent`.
- badge: `--badge-textSize`, `--badge-iconSize`.
- breadcrumb: `--breadcrumb-size` (1.4rem), `--breadcrumb-color`, `--breadcrumb-color-hover`, `--breadcrumb-color-current`, `--breadcrumb-separator-type`, `--breadcrumb-separator-color`, `--breadcrumb-separator-gap`.
- summary: `--summary-lines`, JS-written `--_summary-content-height`.

Kept, default changed (value visible):

| property | master | now |
| --- | --- | --- |
| `--card-padding`, `--box-padding` | `var(--padding)` = 30px | `var(--padding-elements)` = 3rem |
| `--card-borderRadius`, `--box-borderRadius` | `calc(var(--border-radius-input) + padding)` = 2.25rem + padding | `calc(var(--borderRadius-texts) + padding)` = 1.5rem + padding |
| `--card-padding` under `cardMini`, `--box-padding` under `boxMini` | `var(--padding-2)` = 15px | `var(--padding-texts)` = 1.5rem |
| `--box-borderRadius` under `boxMini` | `var(--border-radius-input)` | `var(--borderRadius-texts)` |
| `--card-background` / `--box-background` on a link | `var(--color-white)` | `var(--clickable-background)` (hover: `var(--hover-background)`) |
| `--card-img-padding` | `0` | `0` (kept) |
| `--card-horizontal-img-grow`, `-content-grow`, `-img-minHeight` | 2, 3, 300px | same |
| `--badge-size` | 1.25rem (font and padding) | .85rem (padding only), see A |
| `--badge-background` / `--badge-color` of `badgePrimary`, `badgeStrong` | `primary-soft` / `primary-strong`; `primary` / `whiteFixed` | `primary` / `primary-text`; `primary-strong` / `white` |
| `--steps-circle-size` | `50px` | `var(--heading-size-h3)` |
| `--steps-line-color` | `var(--color-gray)` | `var(--border-color)` |
| `--steps-circle-color`, `--steps-line-size` | `primary-soft`, `2px` | same |
| `--table-row-background-even` / `-odd` | `var(--border-box-transparent)` / `var(--border-box)` (undefined: no zebra) | `var(--color-box-transparent)` / `var(--color-box)` |
| `--table-row-color` | `var(--color-black)` | `var(--color-text)` |
| `--table-row-background-hover` (was `-hover-background`) | `var(--color-secondary-soft)` | `var(--hover-background)` (same color) |
| `--table-row-color-hover` (was `-hover-color`) | `var(--color-blackFixed)` | `var(--hover-color)` (`--color-secondary-strong`) |
| `--slides-width`, `--slides-width-tablet` | `calc(var(--page-width)/2.3)`, `100%` | same |
| `--summary-fade-size`, `--summary-fade-background` | `4rem`, `var(--color-background)` | same |

### D. Sass

- `assets/scss/mixin/_mx-card.scss` is gone; `@forward "mx-card"` in `mixin/mixin.scss` is now `@forward "mx-box"` (`assets/scss/mixin/_mx-box.scss`).
- `card()` mixin: removed. The card rules live in `components/_card.scss` (selector `:is([pgs~="card"], [pgs*="card\5B"])`); to give your own element the card look, put `pgs="card"` on it.
- `box()` mixin: kept, new content: it sets padding, radius, background directly on the element and handles `&:where(a)` itself (no `> a:first-child`). New: `boxHover()` (the link hover), `boxNavSmart()` (frosted pill, the `boxNavSmart` flag).
- `hover()` mixin and `mixin/_mx-hover.scss`: removed with the shared hover system (`-> see [Core](#part-1-core-attribute-grammar-javascript-packaging)`); nothing of card, box, accordion or table calls it.
- `@use "…/components/breadcumbs"` → `components/breadcrumb` (`_breadcrumb.scss`).
- `assets/scss/patterns/_cookieConsent.scss`: removed (no `patterns/` folder); `index.scss` no longer loads it.
- New partials loaded by `index.scss`: `components/_tabs.scss`, `components/_pageNav.scss`.
- `[pgs~="list"] { @include list(); }` was at the end of `components/_steps.scss`; it is now in `base/_general.scss` (`-> see [Utilities](#part-3-utilities)`).
- Sass variables unchanged for this area: `$mobile` (430px), `$tablet` (800px) in `mixin/_settings.scss`. New in `components/_accordion.scss`: `$accordionGap` (1rem, not `!default`, so it cannot be configured by `@use … with`).

### E. JavaScript

- `pgs.accordion`: `init(root)` also initializes `root` when it is an accordion; an accordion without a direct `accordion-button` and a direct `accordion-content` is skipped with a console warning. Instance gains `destroy()` (listeners released, markup and state kept); `refresh()` = `destroy()` + build again from the current markup, returns the new instance. Initial open state: `accAutoOpen` or `pgs-state="open"`; the module writes `pgs-state="open"` itself. `accAutoOpen` is removed from the element the first time the reader toggles it. One-at-a-time only inside `accordionContainer` without `accMultiOpen`. Generated `aria-label` is English and never overwrites a hand-written one. Ids: `acc-btn-N`, `acc-panel-N` (now from `pgs.helper.uniqueId`).
- `pgs.slides`: `instance.previous()` → `instance.prev()`. `goTo(index)` throws `TypeError` unless `index` is an integer from 0 to the last slide. `isAtStart()` / `isAtEnd()` read the scroll position. `getCurrentIndexes()` / `getCurrentElements()` read `pgs-state="view"` at 97% visibility. New `instance.destroy()` (arrows and dots the module built stay, a later `init` reuses them); `instance.refresh()` returns `undefined` when the markup cannot be initialized (no `slides-container`, with a console warning). New `slidesLoop` (arrows wrap, neither is ever disabled), `slidesNotDots` (no dots row built). Generated labels are English ("Previous slide", "Next slide", "Go to slide N"); master wrote Italian ("slide precedente", "prossima slide", "vai alla slide N"). Focus moves to the target slide after an arrow, as before; the centering is computed on the track only, so the page is no longer scrolled vertically by an arrow. Generated arrow/dot markup, classes and tokens: section B. JS-written custom properties: `--_slides-height` (root), `--_slides-visiblePercent` (first child of each slide). The wheel conversion is gone: no `pgs.scrollHorizontal`, no `pgs.helper.scrollHorizontal`.
- `pgs.stepTabs`: see the API rows in A (`goTo` / `toggleLock` throw `TypeError`, `next()` / `prev()` silent at the ends, `restart()` restores the declared locks exactly, `toggleLock` dispatches nothing). New `destroy()`; `refresh()` starts again from the first step and re-reads the locks in the markup at that moment. Event `pgs:stepTabs:change` (bubbles, `detail` `{ element, current, total }`, dispatched after the instance exists). State attributes `active`, `completed`, `locked` (the module observes `pgs-state` of every tab, so a lock written by hand reaches the next button). `data-step-tabs-initialized` is not written. Tab content may set its dot with `stepTabsIcon`.
- `pgs.steps`: only direct `steps-step` children of the list are processed; new `destroy()`; `refresh()` renumbers generated circles and adds a missing circle / line.
- `pgs.summary`: `init(root, { message })` unchanged in shape; texts are read from `pgs-data` `summaryShowMore` / `summaryShowLess` (the module writes the default into that attribute when absent, where master wrote `pgs-option`); a bad `options` throws `TypeError` as before; `destroy()` added; `refresh()` re-measures and keeps open / closed; a summary without direct `summary-content` and `summary-button` is skipped with a console warning.
- `pgs.cookieConsent`, `pgs.scrollHorizontal`: removed from the registry (`pgs.registerModules`). `-> see [Core](#part-1-core-attribute-grammar-javascript-packaging)` for the `pgs.helper.*` namespace and `pgs.helper.dispatch`.
- Lifecycle shared by these modules (accordion, slides, stepTabs, steps, summary, tabs, pageNav): a WeakMap per module, `init(root)` is idempotent, `api(element)` returns the instance, `destroy()` + `refresh()` exist on every instance; a stale instance (replaced by `refresh`) cannot tear down the live one.

### F. New (opt-in)

- `accordionContainer` — groups accordions: opening one closes the others of that group; column layout with `--accordionContainer-gap`.
- `accordionContainer['accMultiOpen']` — the group lets its panels be open together.
- `accordion['accAutoOpen']` — open on load, survives sibling toggles until the reader works it.
- `card-imgForChild` — wrapper for media the card does not write itself (helper-printed images, element blocks); the image treatment lands on its direct child, and it takes the 40/60 split in horizontal cards.
- `card['cardHorizontalFixed']` — the 40/60 row with no container query: side by side at any width.
- `box['boxNavSmart']` / `boxNavSmart()` mixin — frosted pill (blur, thin border, soft shadow); the surface of `navSmart-element`.
- `slides['slidesArrowsCenter']` — arrows over the slides, one on each side (restores the master placement).
- `slides['slidesNotDots']` — no dots row is built and no room is reserved under the slides.
- `slides['slidesFullWidth']` — each slide fills the track (`--slides-width: 100%`) at every width.
- `slides['slidesLoop']` — arrows wrap around at the ends.
- `slides-prev` / `slides-next` / `slides-dots` hand-written — place the controls anywhere; the module wires them and never builds a second one. Generated twins are `_slides-prev`, `_slides-next`, `_slides-dots`.
- `badge['badgeSoft']` — light primary background with strong primary text (the master `badgePrimary` look).
- `stepTabsIcon[<markup>]`, `stepTabsIcon[icon-…]`, `stepTabsIcon[class list]` — three shapes of the dot icon; markup puts any icon set in reach (`<span class='material-symbols-outlined'>check</span>`, `<i data-lucide='check'></i>`).
- `steps-step-circle` / `steps-step-line` hand-written — place the number / line with your own markup.
- `tabs` module (new, master has none): tokens `tabs`, `tabs-list`, `tabs-list-tab`, `tabs-panels`, `tabs-panels-content`; `pgs-data="tabsHistory"` or `tabsHistory[name]` (selected tab in the URL, history entries); `pgs-state="active"`; API `pgs.tabs.init(root)`, `pgs.tabs.api(el)`, `instance.goTo(index)`, `getCurrent()`, `refresh()`, `destroy()`; event `pgs:tabs:change`; stylesheet `components/_tabs.scss` (only hides inactive panels, the tab look comes from `button[…]`).
- `pageNav` module (new, master has none): tokens `pageNav`, `pageNav-list`, `pageNav-list-item`, `pageNav-panels`, `pageNav-panels-content`; `pgs-state="active"` on the visible panel, `aria-current="page"` on the selected link; API `pgs.pageNav.init(root)`, `api(el)`, `instance.select(id)`, `getCurrent()` (index), `getCurrentPanel()`, `refresh()`, `destroy()`; event `pgs:pageNav:change`; panels switched by URL hash.
- `summary` `--summary-lines` — how many lines stay visible while closed.
- `--accordion-*`, `--breadcrumb-*`, `--badge-textSize` / `--badge-iconSize`, `--slides-sizeMaskImage` — see C.

### G. Sweep

Run from the project root over your own markup, CSS and JS (add `--include=*.php --include=*.html --include=*.scss --include=*.css --include=*.js` and `--exclude-dir=node_modules --exclude-dir=dist`).

```
# 1. card / box flags written as pgs-option, or as attribute selectors
grep -rnP "pgs-option=[\"'][^\"']*\b(cardHorizontal|cardMini|boxMini|cardLegacy)\b|\[pgs-option[~*^|\$]?=[\"']?[^]]*(cardHorizontal|cardMini|boxMini|cardLegacy)" .
```
Hit: move the flag into the bracket (`card['cardMini']`); delete `cardLegacy`.

```
# 2. a card / box whose first child is a link (the link used to be the clickable surface)
grep -rPzlo "pgs=\"[^\"]*\b(card|box)\b[^\"]*\"[^>]*>\s*<a\b" .
```
Hit: put `pgs="card"` / `pgs="box"` and the `href` on the `<a>` (keep the old element around it if you need it).

```
# 3. images and objects in files that use a card, with no pgs token (they are no longer styled)
grep -rlE 'pgs="[^"]*\bcard\b' . | xargs grep -nP '<img\b(?![^>]*pgs=)|<object\b(?![^>]*pgs=)'
```
Hit: add `pgs="card-img"` to the element, or wrap generated media in `pgs="card-imgForChild"`. It only sees an image written in the same file as the card: an image printed by a helper has to be found by reading the templates.

```
# 4. removed / renamed custom properties of this area
grep -rnE -- "--(card-horizontal-breakpoint|card-img-(base|margin)|slide-(width|shadow)|visible-percent|badge-icon-size|table-row-hover-|summary-content-max-height|cookie-(bg|color|border))" .
```
Hit: section C (`--slide-` is not `--slides-`, so current names do not match).

```
# 5. accordion files with no accordionContainer (the one-at-a-time rule is gone without it)
grep -rlE 'pgs="[^"]*\baccordion\b' . | xargs grep -L accordionContainer
```
Hit: wrap the set in `pgs="accordionContainer"` if the panels must close each other; `accAutoOpen` replaces a hand-written `pgs-state="open"`.

```
# 6. slides: old tokens, classes, flags
grep -rnE "slides-prec|\.(precButton|nextButton|slide-dot|slides-dots|notView)\b|class=\"[^\"]*\b(precButton|nextButton|slide-dot)\b" .
grep -rnE "classList\.[a-z]+\([\"'](view|notView|active)[\"']|\.(view|notView)\b|querySelectorAll?\([\"']\.view" .
grep -rnE "\b(singleScroll|shadowDesktop|notScrollAnimation|notScrollWithMouse|slideScale)\b" .
grep -rnE "\.previous\(" .
```
Hit: section B (`slides-prev`, `pgs-state="view"` / `"active"`, flags into `slides['…']`). The second line matches the project's own `.view` rules and JS that read the class; third line hits `pgs-option` values and any JS option check; the fourth, every `.previous(` call: keep those on a slides instance and change them to `.prev(`.

```
# 7. slides: wheel helper
grep -rnE "scrollHorizontal(WithMouse)?\b" .
```
Hit: delete the call or write your own wheel listener (section B, removed helper).

```
# 8. generated tokens used in project CSS (the module now writes the underscore form)
grep -rnP "(?<![_A-Za-z])stepTabs-dots-dot" .
grep -rnE "pgs[~*^|\$]?=[\"']?(steps-step-(circle|line)|slides-dots)\b" .
```
Hit: line 1 is always old (`_stepTabs-dots-dot`); line 2 also matches legitimate hand-written tokens, so keep the ones on elements you write yourself and retarget CSS aimed at generated nodes to `_steps-step-circle`, `_steps-step-line`, `_slides-dots`.

```
# 9. stepTabs: options, states, event, init flag
grep -rnP "\btabIcon\b|(?<![A-Za-z_])step\[|data-step-tabs-initialized|stepTabsInitialized" .
grep -rnE "\bis-(active|completed|locked)\b" .
grep -rnP "(?<!pgs:)stepTabs:(change|go|next|prev|reset|toggle-lock|get)" .
```
Hit: `stepTabsIcon[…]` in `pgs-data` (write the whole class list), states `active` / `completed` / `locked`, `addEventListener("pgs:stepTabs:change", …)`. `is-active` is a common class elsewhere: check each hit is a `pgs-state`.

```
# 10. summary texts
grep -rnP "(?<![A-Za-z])(showMore|showLess)\[" .
```
Hit: `pgs-data="summaryShowMore[…] summaryShowLess[…]"`.

```
# 11. badge flags written as pgs-option; breadcrumb separator span
grep -rnP "pgs-option=[\"'][^\"']*\bbadge[A-Z][a-zA-Z]*" .
grep -rn "breadcrumb-item-separator" .
```
Hit: `pgs="badge['badgeSuccess' 'badgeDot']"`; delete the separator span and set `--breadcrumb-separator-type`. Also review every `badgePrimary` / `badgeStrong` (their look changed, A).

```
# 12. cookieConsent
grep -rnE "cookieConsent|pgs_cookie_preferences" .
```
Hit: section B, cookieConsent (copy the PGS_theme module, or drop it).

```
# 13. generated labels in Italian that a test or a translation file may depend on
grep -rnE "slide precedente|prossima slide|vai alla slide" .
```
Hit: the labels are English now, and no option or `pgs-data` key sets them: write your own `aria-label` (honored on the accordion button and on hand-written `slides-prev` / `slides-next`; not available for the generated dots of slides and stepTabs).
