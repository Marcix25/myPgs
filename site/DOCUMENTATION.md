# How the documentation works

This explains the pipeline behind everything under `reference/html/`, `docs/`, and this `site/`
folder: where a component's documentation actually lives, how it turns into the generated Markdown
and into `site/build/home.html` — the site's home page, see "Pre-baking the demo" below for how it
is assembled — and what to do when you add or change something.

## The three places involved

1. **`reference/html/**/*.html`** — the single source of truth. Each file is one component, layout
   feature, base utility, pattern, or helper: a structured doc comment followed by real, working
   markup (and sometimes a script).
2. **`docs/**/*.md`** — generated from those files by `npm run docs:generate`. Never edit these by
   hand; edit the `reference/html` source and regenerate.
3. **`site/`** (this folder) — a browsable reference with working examples, pre-baked by
   `npm run sitebuild`: `scripts/demo-render.js` turns every `reference/html` file into its panel, and
   `scripts/build-site-static.js` merges it with a hand-authored shell into `site/build/home.html` —
   see "Pre-baking the demo" below for the full split between `assets/`, `parts/`, `build/` and
   `page/`. The site's own CSS/JS/images live under `site/assets/css/`, `site/assets/js/`,
   `site/assets/img/` and `site/assets/font/`, the two shells under `site/parts/`; every
   generated output lives under `site/build/` (both the fragments nobody opens directly and the
   complete, directly-openable pages) or `site/page/` (one page's own content each). `site/index.html`
   redirects to `build/home.html`, the current home page, and `index.html` at the repo root
   redirects to it in turn, for GitHub Pages. Nothing is fetched or parsed at runtime: `assets/js/demo.js`
   only wires up navigation, copy buttons and the interactive examples.

Two things parse the doc-comment format, both in Node: `scripts/generate-component-docs.js` for the
Markdown and `scripts/demo-render.js` for the demo panels. Keep that in mind if you ever change the
format: both sides need updating.

Guide pages (see "The guides exception" below) run through a completely separate pipeline,
`scripts/generate-guide-docs.js` — currently dormant, since the only file left in
`reference/html/guides/` is `welcome.html`, itself excluded from generation (see below). The demo
bakes `welcome.html` in as its landing panel, source and all. Everything else in this document
describes the main pipeline; guides are called out on their own wherever they differ.

## The doc comment

Every `reference/html/**/*.html` file starts with an HTML comment wrapping a `/** ... */` block,
each line prefixed with `*`, tags in this order:

```html
<!--
/**
 * @title Modal
 * @description One sentence overview, plus anything a reader needs before the tag lists below.
 *
 * @pgs
 * - modal: identifies the modal element used by Modal.
 *
 * @pgs-generated
 * - dialog: added to the dialog element on initialization, which is why the example writes a bare dialog tag.
 *
 * @pgs-options
 * - dialogMini: shrinks the dialog content to a compact width instead of filling the viewport.
 *
 * @pgs-state
 * - open: identifies the open element used by Modal.
 *
 * @api
 * - pgs.modal.init(root): initializes matching elements within the specified root.
 * - instance.open(): opens the component.
 *
 * @related
 * - button: provides the base styling for the primary submit action.
 *
 * @return Complete HTML markup and usage example for Modal.
 */
-->

<div pgs="modal">...</div>
```

- **Tag order is enforced**: `title`, `description`, `pgs`, `pgs-generated`, `pgs-options`, `pgs-data`,
  `pgs-state`, `api`, `related`, `return`. Skip any tag you don't need, but don't reorder them.
- **`@title`/`@description`/`@return`** are single-line, free text on the same line as the tag.
- **`@pgs`, `@pgs-generated`, `@pgs-options`, `@pgs-data`, `@pgs-state`, `@api`, `@related`** are lists: the tag
  starts on its own empty line, then one `- key: description` per line below it.
- **`@pgs`** is the component's own root token(s) — what you write to say "this element is a
  Modal/Slides/etc.". Required for every file *except* under `helper/` (see below).
- **`@pgs-generated`** is markup the library builds at runtime that you don't author by hand
  (`dialog` above, or anything the JS inserts as a new element, which additionally gets an `_`
  prefix — see Naming conventions below).
- **`@pgs-options`** documents CSS flags inside component brackets; **`@pgs-data`** documents JavaScript-only flags and key[payload] values; **`@pgs-state`** documents runtime states.
  An option or state that belongs to a *different* component (reused in this file's example) goes
  under `@related` instead, not here.
- **`@api`** documents callable JavaScript. The signature must be `pgs.x.y(args)` or
  `instance.z(args)` (optionally `new pgs.x(args)`) — a plain call like `pgs(el)` itself can't be
  expressed this way and is left to prose in `@description` instead.
- **`@related`** lists any `pgs` (including its option brackets)/`pgs-data`/`pgs-state` value used in the example that belongs to
  *another* component or a plain utility (`column`, `gapElements`, `icon-close`, ...).

Everything after the closing `-->` is the actual example: real markup, exactly as a consumer would
write it. It's rendered live in the demo *and* copied verbatim into the generated Markdown.

### The helper exception

`reference/html/helper/*.html` documents a JavaScript utility rather than a component's markup —
`pgs()` itself, `pgs.init`, `pgs.formValidate`, `pgs.scrollHorizontal`. These often touch no `pgs`
token of their own, so `@pgs` is optional there and `@api` is required instead (enforced in
`scripts/generate-component-docs.js` by `HELPER_REQUIRED_TAGS`). Everything else about the format
is unchanged — see `reference/html/helper/formValidate.html` for a full example.

### The guides exception

`reference/html/guides/*.html` documents prose, not a component or a JS utility: conventions,
narrative usage docs, the kind of page that's just headings/paragraphs/lists/code samples. It's
built by an entirely separate pipeline from everything else on this page.

- **Node side**: `scripts/generate-guide-docs.js`, not `generate-component-docs.js`. It never
  imports from that file. `generate-component-docs.js` walks the whole `reference/html/` tree
  looking for `.html` files, so it does carry one matching line of its own that skips anything
  under `guides/` — the only place the two scripts touch, and it's an exclusion, not shared logic.
  A guide only needs `@title` and `@description` (both required, both single-line) — no `@pgs`, no
  `@api`, nothing to cross-check against source code, because a guide owns no tokens and no
  JavaScript API of its own.
- Its body supports a small, fixed tag vocabulary — `h2`/`h3`/`h4`, `p`, `ul`/`ol` + `li`,
  `pre><code class="language-x">`, and inline `code`/`strong`/`em`/`a href` — which the generator
  converts into **real Markdown prose**, not a fenced ```` ```html ```` blob like every other
  category. Keep a guide's markup flat (no nesting a list inside a paragraph, no inline formatting
  inside a code block) since the converter is intentionally simple, not a general HTML parser.
  Anything outside that vocabulary is a validation error, not a silent pass-through.
- A code sample that needs to show literal `pgs="..."` text (e.g. explaining the attribute syntax
  itself) must stay HTML-escaped inside its `<pre><code>`, exactly as you'd write any inert code
  sample, so it's never mistaken for real authored markup.
- **Demo side**: none currently — `demo-render.js` has no guide branch, because the only file in
  `reference/html/guides/` is the excluded `welcome.html`, baked in as-is. A guide's panel would skip
  the doc-tag block and the "Example HTML" code block entirely: there's no `@pgs`/`@api` to list, and
  showing raw source doesn't help for prose — write that branch if `reference/html/guides/` gets a
  real entry again.
- `npm run docs:generate` runs both generators (`generate-component-docs.js` then
  `generate-guide-docs.js`); run the guide one on its own with `node scripts/generate-guide-docs.js`,
  there is no npm script for it alone.

One file in `reference/html/guides/` is an explicit exception to all of the above:
**`welcome.html`**, the demo's own landing panel. It's excluded by name in
`generate-guide-docs.js` (`EXCLUDED_FILES`) and produces no `docs/guides/welcome.md`, because its
layout — coloured cards, component-option boxes — is richer than the small prose vocabulary can
convert. The build bakes its markup in verbatim as the demo's first panel, and it's hand-kept in
sync in substance with the project `README.md`, on purpose looking different rather than reusing
either pipeline.

## Categories and file layout

`reference/html/` has six top-level folders — `base/`, `components/`, `layout/`, `patterns/`,
`helper/`, `guides/` — each becoming its own section in the demo's side menu, in the order that
`referenceFiles` in `scripts/demo-render.js` lists them; a file's position within a category
follows that same array. `docs/` mirrors the same folder structure and filenames for every category
except `guides/`, which is generated by its own script into `docs/guides/` (see above).

## Demo markup: `demo`, `<demo demo-h2/demo-h3>`

These attributes and the standalone `<demo>` tag only mean something to the demo/doc tooling — strip
them and what's left is the real example a consumer would copy. `demo` itself is a space-separated
token list, the same convention as `pgs-state`: `component` is the only role marker — every
independent example is one, whether it's the only one in the file or nested inside another as one of
several — optionally combined with `previewNone` and/or `codeNone` as modifiers, e.g.
`demo="component previewNone"`. `wrapper` is a second, distinct token that never marks an example on
its own; it only ever nests inside a `component`'s own markup.

| attribute | value | effect |
| --- | --- | --- |
| `demo` | `"component"` | one independent example — the outer boundary of a group, or (nested inside another `component`) one variant/entry within it |
| `demo` | `"wrapper"` | a purely nested grouping element inside a `component`: its tag never reaches the copied code, only its children do — repeatable at any depth or side by side |
| `demo` | `"disabled"` | keeps the element in the live preview, drops it (and its subtree) from the generated code block |
| `demo` | `"previewNone"` | keeps the element in the code and in the live DOM, hides its styled preview box |
| `demo` | `"codeNone"` | keeps the title and description, drops the code block entirely |
| `<demo demo-h3="Title" demo-description="...">` | — | standalone sibling tag that titles the `component` it immediately precedes |
| `<demo demo-h2="Title" demo-description="...">` | — | same, one level up: groups every example that follows until the next `demo-h2` |

Details and cross-references, past what the table already says:

- `demo="component"` — see `modal.html`'s many `<div pgs="modal" demo="component">` blocks, one per
  variant, and `formAddon.html`'s outer `<form demo="component">` wrapping several inner ones.
  `stripComponentWrapperAttributes` in `scripts/generate-component-docs.js` treats a `component`'s own
  attributes as incidental *only* once it has a nested `component` inside it — that nesting is the
  only signal that matters: a real variant worth documenting (`pgs="modal"`) needs no nested
  `component`, while a transparent grouping wrapper (`form.html`'s outer `<form>`, or a plain
  `pgs="flex['column']"` div once one existed there) always does.
- `demo="wrapper"` — see `base/border.html`'s rows of spans, each its own `<div demo="wrapper">`
  inside one `<section demo="component">`: several, side by side, all disappearing from the code
  while the section's own tag stays. Never appears as a file's outermost marker — remove a purely
  cosmetic outer layout div entirely instead of tagging it `wrapper` (see `icon.html`, `badges.html`,
  `dropdown.html`, and most other reference files: no wrapping div left at the top of the file at
  all, just sibling `demo="component"` examples, exactly like `modal.html` already did).
- `<demo demo-h3>` — see `modal.html`'s `<demo demo-h3="Standard modal" demo-description="...">`
  right above its `<div pgs="modal" ... demo="component">`. The heading is never an attribute on the
  example itself, so it can't compete with the real `pgs-state` the example is documenting.
- `<demo demo-h2>` — used when a file's examples split into named sets (see `layout/pageShell.html`'s
  "Page Shell simple" vs. "Page Shell - Not scroll" groups). Most files only ever need `demo-h3`.
  Both `demo-render.js`'s `extractDemoBlocks` and the doc generator's own in
  `scripts/generate-component-docs.js` walk the markup in document order, pairing a `demo-h3` marker
  with the next `demo="component"` leaf and recursing straight through anything that isn't one (a
  plain layout wrapper with no `demo` attribute at all, or a `demo="component"` that itself has a
  nested `demo="component"`) — keep the two in sync when changing either. `demo="wrapper"` never
  appears in this top-level walk: it's unwrapped afterwards, by a separate pass over each captured
  example's own markup, never treated as a block boundary.
- `demo="disabled"` — use it for something the reader needs to see working but that would be noise
  in copy-pasted code.
- `demo="previewNone"` — the opposite kind of split from `disabled`: think `notificationLoad`/
  `toastLoad`, whose whole purpose is to be consumed and removed on init, since rendering an
  empty/consumed box would be confusing. Combine it with `component` on the same element, e.g.
  `demo="component previewNone"` (see `notification.html`'s payload-only examples).
- `demo="codeNone"` — the live preview still renders, there's just nothing worth copying (a more
  direct alternative to putting `demo="disabled"` on the item's own root for the same effect).
  Combine it with `component`, e.g. `demo="component codeNone"` (see `svg.html`'s `<object>` and
  `scrollHorizontal.html`'s demo rows).

## Script blocks

A reference file's example can include up to three special blocks, extracted separately from the
markup and never shown mixed in with the "Example HTML":

- **`<script type="application/json">`** — a fully-commented reference of every field a JSON
  `pgs-data` payload accepts (see `toast.html`). Rendered as its own "PGS Data fields" section.
- **`<script type="text/x-example-js">`** — illustrative JavaScript, shown as its own "JavaScript
  Usage" code block. **This one never actually runs on the demo page** — it's inserted via
  `innerHTML`, and a browser does not execute a `<script>` inserted that way. It exists purely to be
  read and copied (see `pgs.html`, `scrollHorizontal.html`, `svg.html`).
- **`<script type="module">`** — looks like it should be live, and reads like real wiring code
  (see `form.html`, `search.html`), but it's subject to the exact same `innerHTML` limitation as
  above: **it doesn't execute either.** It's still just documentation.

### Making an example actually interactive

Because none of the embedded `<script>` tags run, any demo that needs real interactivity — a form
with custom validation, a live search, a button that inserts markup and calls `pgs.init()` on it —
needs matching wire-up code written directly in `assets/js/demo.js`, scoped to that file's section:

```js
function configureFormDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-reference="components/form.html"]');
    const form = section?.querySelector('[pgs~="form"]');
    if (!form) return;
    // ... real, running code, kept in sync by hand with the illustrative script in form.html
}
```

Every such function is called once from `boot()`. Search `demo.js` for `configure` to see the
current set (`configureFormDemo`, `configureSearchDemo`, `configureNotificationDemo`,
`configureInitDemo`, `configureScrollHorizontalDemo`, `configureFormValidateHelperDemo`, ...) — copy
that pattern for a new interactive example, always scoping queries to the element's own
`data-reference` section (never to `document` directly), since every reference file's markup is
present in the DOM at once, just hidden behind the currently-selected nav entry.

## Wiring a new page into the demo (`demo-render.js`)

Adding a `reference/html/<category>/<name>.html` file makes it validate and generate its `.md`, but
three things in `demo-render.js` need a manual entry for it to actually show up in the demo:

1. **`CATEGORY_LABELS`** — only needed for a brand-new top-level category (e.g. adding `helper` for
   the first time required `helper: "Helper"` here).
2. **`referenceFiles`** (an array near the top of the file) — add `"<category>/<name>.html"`. Its
   position in the array is the file's position in the nav; a category's *first* appearance in this
   array is where that whole category section is inserted.
3. **`ENTRY_ICONS`** — add `"<category>/<name>.html": "fa-solid-icon-name"` (any Font Awesome
   solid icon class) for its nav icon; falls back to a generic square icon if omitted.

Then rebuild with `npm run sitebuild`, and only if the example needs real interactivity add a
`configureXDemo()` function to `assets/js/demo.js` as above and call it from `boot()`.

## Naming conventions worth knowing

- **Markup the library builds at runtime gets an `_` prefix** (`_toast-element`,
  `_notifications-element-content-icon`, ...) and is documented under `@pgs-generated`, never `@pgs`. An
  exception: a token merely *added* to an element the author already wrote (`formValidate` added to
  an existing `<form>`, `dialog`/`modal-dialog` added to an existing `<dialog>`) stays unprefixed
  and still goes under `@pgs-generated` — the prefix marks a whole new element, not an added token.
- **A CSS flag or JavaScript-only bracket flag drops its component's name**, since the bracket it
  lives in already says which component owns it (`button['mini']`, `header['headerScroll']`, not
  `button['buttonMini']`). A handful kept the prefix on purpose because a bare word would mean
  nothing on its own — `margin2`/`padding2` (a lone digit) and the `icon-*` glyphs — and `hoverNot`
  never had a single owner to drop a prefix from. A `pgs-data` key keeps its prefix always
  (`formFieldError`, `headerCompactFrom`): that attribute is flat, with no bracket to give a bare
  key context. See `migration.md` for the history of both conventions.
- **A plain reusable utility has no prefix** and is written directly as a `pgs` value, not inside a
  component bracket (`column`, `gapElements`, `truncate`, `icon-close`, ...).

## The tools

```sh
npm run start                      # webpack: compiles assets/ into dist/
node scripts/generate-pgs-map.js   # scans compiled CSS + source, writes reference/pgs-map.json
npm run docs:generate              # validates every reference/html file, writes docs/**/*.md
                                    # (runs generate-component-docs.js, then generate-guide-docs.js)
npm run sitebuild                  # pre-bakes site/build/ and site/page/ — see the section below
```

Run all four, in that order, after touching anything under `assets/` or `reference/html/`. The order
is not cosmetic: `generate-pgs-map.js` and `build-site-static.js` read `dist/css/index.css`, so a map
or a demo built before webpack describes the previous compile. `docs:generate` reads the SCSS and
JavaScript sources instead, so it is the one step that does not need the build.

`docs:generate` is strict: an undocumented token used in an example, a documented token that
doesn't actually exist anywhere in `assets/scss`/`assets/javascript`, wrong tag order, a duplicate
section, and more all fail the whole run with a specific file/line/suggestion — fix everything it
reports before it will write anything.

While iterating, two watchers replace the first and the last step, so nothing has to be remembered:

```sh
npm run start:watch                # webpack --watch: recompiles dist/ on every assets/ change
npm run sitebuild:watch            # scripts/watch-site.js: rebuilds every site/build/*.html on
                                    # every change to reference/html/, demo.structure.html,
                                    # site.structure.html, demo-render.js, a page's own file under
                                    # site/page/ (except the generated demo.html), or
                                    # dist/css/index.css — so a webpack rebuild reaches the demo too
```

Run them in two terminals. Neither replaces `generate-pgs-map.js` or `docs:generate`: the map and the
generated Markdown are still produced on demand, and `docs:generate` has to pass before committing
anyway.

## Pre-baking the demo (`npm run sitebuild`)

`site/` separates hand-authored source from generated output, across four folders (plus
`site/index.html`, a hand-kept redirect stub — see below):

- **`site/parts/`** — hand-authored, nothing generated. Two shells, neither a page on its own:
  - `demo.structure.html` — the pageShell that hosts the reference nav and panels (nav+main empty
    until the build fills them in). Edit this for the reference demo's own layout — the part
    specific to browsing components.
  - `site.structure.html` — the page around every page: head, header, footer, and an
    `id="reference-demo-content"` placeholder (`display: contents`, so it adds no box of its own)
    that one page's own content is spliced into. Edit this for the surrounding page — everything
    that would still be there without a single reference panel — since every generated page shares
    this one shell.

  Both files' asset links (`<script>`/`<link>` hrefs) are written relative to `site/build/`, where
  every generated page ends up — not relative to either file's own location in `site/parts/`.
- **`site/page/`** — one page's own content, no shell around any of it:
  - `demo.html` — generated: `demo.content.html`'s nav+panels spliced into `demo.structure.html`.
    The reference demo's own content, still with no `<html>`/`<head>` of its own.
  - `home.html` and `test.html` — hand-kept, not touched by the build; just a `<main>` and nothing
    else, the same shape `demo.html` has. `home.html` is the home page, its content still to be
    filled in; `test.html` is a fixture for trying components out.
  - a future page follows the same rule: drop its own content here, as `<name>.html`, and the build
    picks it up on its own — nothing else has to change.
- **`site/build/`** — the complete, directly-openable pages, plus one fragment:
  - `demo.content.html` — generated, reference-only: the whole nav plus every panel's markup,
    produced by `scripts/demo-render.js` (see below), with no shell around it. Consumed to build
    `page/demo.html`, above — not meant to be opened directly, and its two halves sit inside inert
    `<template>` tags so it parses as valid HTML without rendering anything if opened by mistake.
  - one output per file in `page/`, named the same: `site.structure.html` with that page's own
    content spliced into the placeholder, plus `assets/js/demo.js`. `demo.html` is generated the
    same way as `home.html` and `test.html` here — only its own content in `page/` is generated
    rather than hand-kept. `demo.js` only runs `pgs.init()` and the demo's own interactive wiring
    (nav clicks, copy buttons, the `configureXDemo` functions) — nothing in it fetches or parses a
    reference file, since each page already has everything written out. Every page opens
    instantly, whatever the reference count.
- **`site/index.html`** — hand-kept, not touched by the build: a redirect stub, exactly like the
  one at the repo root, pointing to `build/home.html`. It is the one place that names the current
  home page's filename, so a future rename touches only this file, not the repo-root `index.html`
  or anything else.

`scripts/demo-render.js` is what makes `demo.content.html` possible — it never reaches the
browser, only `scripts/build-site-static.js` (in Node) requires it. Plain string/data functions with
no DOM and no fetch: it parses a reference file's doc comment, builds its doc panel (PGS lists,
related, CSS variables) and its example markup. It is the only renderer — a live, fetch-everything
page used to exist alongside it (`demo-fetch.html` plus `assets/demo-fetch.js`) and was removed, so
there is no second implementation to keep in step any more.

Components built entirely by JS at runtime (notification, toast, modal, accordion, ...) are
untouched by any of this: their source markup is baked in like everything else, and `pgs.init()`
still builds them for real when the page loads.

Never hand-edit `demo.content.html`, `page/demo.html`, or any page under `site/build/` — edit
`reference/html/`, either `site/parts/*.structure.html` file, or a page's own file under
`site/page/`, and run `npm run sitebuild` again.

## Adding a brand-new reference page, step by step

1. Create `reference/html/<category>/<name>.html` with the doc comment (see format above) and a
   real, working example below it.
2. Wire it into `scripts/demo-render.js`'s `referenceFiles`/`ENTRY_ICONS` — that is the only list the
   build reads. Add a `configureXDemo()` function to `assets/js/demo.js`, called from its `boot()`, if
   the page is interactive.
3. Run the commands above, in order. Fix anything `docs:generate` reports.
4. Open `site/build/demo.html` directly and check the new page renders and behaves as expected.
