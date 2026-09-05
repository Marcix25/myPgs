# How the documentation works

This explains the pipeline behind everything under `reference/html/`, `docs/`, and this `demo/`
folder: where a component's documentation actually lives, how it turns into both the generated
Markdown and the live page at `demo/demo.html`, and what to do when you add or change something.

## The three places involved

1. **`reference/html/**/*.html`** — the single source of truth. Each file is one component, layout
   feature, base utility, pattern, or helper: a structured doc comment followed by real, working
   markup (and sometimes a script).
2. **`docs/**/*.md`** — generated from those files by `npm run docs:generate`. Never edit these by
   hand; edit the `reference/html` source and regenerate.
3. **`demo/`** (this folder) — a static site (`demo.html` + `demo.js` + `demo.css`, no build step)
   that fetches every `reference/html` file at runtime, parses the same doc comment, and renders it
   as a live, browsable reference with working examples.

Both `docs:generate` and `demo.js` parse the *same* doc-comment format independently — one in
Node (`scripts/generate-component-docs.js`), one in the browser (`demo.js`, functions like
`parseDocumentation`). Keep that in mind if you ever change the format: both sides need updating.

Guide pages (see "The guides exception" below) are the one part of this that runs through a
completely separate, parallel pipeline instead: `scripts/generate-guide-docs.js` on the Node side,
`demo/demo-guide.js` in the browser. Everything else in this document describes the main pipeline;
guides are called out on their own wherever they differ.

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
 * @pgs-option
 * - modalMini: shrinks the dialog content to a compact width instead of filling the viewport.
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

- **Tag order is enforced**: `title`, `description`, `pgs`, `pgs-generated`, `pgs-option`,
  `pgs-state`, `api`, `related`, `return`. Skip any tag you don't need, but don't reorder them.
- **`@title`/`@description`/`@return`** are single-line, free text on the same line as the tag.
- **`@pgs`, `@pgs-generated`, `@pgs-option`, `@pgs-state`, `@api`, `@related`** are lists: the tag
  starts on its own empty line, then one `- key: description` per line below it.
- **`@pgs`** is the component's own root token(s) — what you write to say "this element is a
  Modal/Slides/etc.". Required for every file *except* under `helper/` (see below).
- **`@pgs-generated`** is markup the library builds at runtime that you don't author by hand
  (`dialog` above, or anything the JS inserts as a new element, which additionally gets an `_`
  prefix — see Naming conventions below).
- **`@pgs-option`** and **`@pgs-state`** document that component's own modifiers and runtime states.
  An option or state that belongs to a *different* component (reused in this file's example) goes
  under `@related` instead, not here.
- **`@api`** documents callable JavaScript. The signature must be `pgs.x.y(args)` or
  `instance.z(args)` (optionally `new pgs.x(args)`) — a plain call like `pgs(el)` itself can't be
  expressed this way and is left to prose in `@description` instead.
- **`@related`** lists any `pgs`/`pgs-option`/`pgs-state` value used in the example that belongs to
  *another* component or a plain utility (`flexColumn`, `gapElements`, `icon-close`, ...).

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
- **Browser side**: `demo/demo-guide.js`, loaded as its own `<script>` tag before `demo.js` in
  `demo.html`. `demo.js` only does the minimum needed to route to it: guide entries in
  `CATEGORY_LABELS`/`referenceFiles`/`ENTRY_ICONS` (see below) and one check in `boot()`'s render
  loop (`if (path.startsWith("guides/")) { DemoGuide.render(...); ... }`). Everything else — the
  header, injecting the body as real formatted content, running it through Prism — lives in
  `demo-guide.js`. A guide's live page skips the doc-tag block and the "Example HTML" code block
  entirely: there's no `@pgs`/`@api` to list, and showing raw source doesn't help for prose.
- `npm run docs:generate` runs both generators (`generate-component-docs.js` then
  `generate-guide-docs.js`); run the guide one on its own with `npm run docs:generate:guides`.

One file in `reference/html/guides/` is an explicit exception to all of the above:
**`welcome.html`**, the demo's own landing panel. It's excluded by name in
`generate-guide-docs.js` (`EXCLUDED_FILES`) and produces no `docs/guides/welcome.md`, because its
layout — coloured cards, `pgs-option` boxes — is richer than the small prose vocabulary can
convert. `demo.js` fetches it directly instead of going through `DemoGuide`, and it's hand-kept in
sync in substance with the project `README.md`, on purpose looking different rather than reusing
either pipeline.

## Categories and file layout

`reference/html/` has six top-level folders — `base/`, `components/`, `layout/`, `patterns/`,
`helper/`, `guides/` — each becoming its own section in the demo's side menu, in the order that
`demoRenderer.referenceFiles` (see `demo.js`) lists them; a file's position within a category
follows that same array. `docs/` mirrors the same folder structure and filenames for every category
except `guides/`, which is generated by its own script into `docs/guides/` (see above).

## Demo markup: `demo`, `<demo demo-h2/demo-h3>`, `demo-code`, `demo-preview`

These attributes and the standalone `<demo>` tag only mean something to the demo/doc tooling — strip
them and what's left is the real example a consumer would copy.

- **`demo="component"`** marks one independent example within a file that has several (see
  `modal.html`'s many `<div pgs="modal" demo="component">` blocks, one per variant).
- **`demo="container"`** is the same grouping wrapper as `demo="component"`, used instead of it when
  the wrapper's own `pgs` value is plain demo-page layout (`flexRow`, `flexColumn`, ...) rather than
  something meant to be authored — see `icon.html`'s outer `<div pgs="flexColumn" pgs-option="gapSections" demo="container">`.
  Both values are found and grouped identically; `container` just says upfront that the wrapper
  itself isn't part of the real example, the same way `stripComponentWrapperAttributes` in
  `scripts/generate-component-docs.js` already treats a `component` wrapper once it has `demo="item"`
  children. Use `component` when the wrapper's own token is real and worth documenting (a whole
  `pgs="modal"` variant, a `pgs="main"` region); use `container` when it's pure scaffolding.
- **`demo="item"`** marks one entry inside a `demo="component"`/`demo="container"` that's showing a
  *set* (see `icon.html`'s dozens of `demo="item"` icons, or `button.html`'s button variants).
  Without any `demo="item"` children, the wrapper element itself is the one example.
- **`<demo demo-h3="Title" demo-description="...">`** — a standalone, self-closing sibling tag
  placed immediately before the `demo="component"`/`demo="item"` element it titles (see
  `modal.html`'s `<demo demo-h3="Standard modal" demo-description="...">` right above its
  `<div pgs="modal" ... demo="component">`). The heading is never an attribute on the example
  itself, so it can't compete with the real `pgs`/`pgs-option` the example is documenting.
- **`<demo demo-h2="Title" demo-description="...">`** — the same idea one level up: groups every
  example that follows until the next `demo-h2`, when a file's examples split into named sets (see
  `layout/pageShell.html`'s "Page Shell simple" vs. "Page Shell - Not scroll" groups). Most files
  only ever need `demo-h3`. Both `demo.js`'s `extractDemoBlocks` and the Node generator's
  `extractDemoBlocks` in `scripts/generate-component-docs.js` walk the markup in document order,
  pairing a `demo-h3` marker with the next `demo="item"`/`demo="component"` leaf and recursing
  straight through anything that isn't one (a plain layout wrapper, or a `demo="component"`/
  `"container"` that itself has `demo="item"` descendants) — keep the two in sync when changing either.
- **`demo="disabled"`** removes that whole element (and its subtree) from the *generated code
  block* only — the live preview on the page still renders it untouched. Use it for something the
  reader needs to see working but that would be noise in copy-pasted code.
- **`demo-preview="none"`** is the opposite kind of split: the element **stays** in the live DOM
  (so the library can read and process it — think `notificationLoad`/`toastLoad`, whose whole
  purpose is to be consumed and removed on init) but its styled preview box is hidden, since
  rendering an empty/consumed box would be confusing.
- **`demo-code="children"`** marks a wrapping element as demo-only layout: the generated code block
  unwraps it and keeps only its children, because the wrapper itself isn't part of the real usage
  (see `spacing.html`'s `demo-code="children"` sections).
- **`demo-code="none"`** hides the "Example HTML" code block for that item entirely — the live
  preview still renders, there's just nothing worth copying (a more direct alternative to putting
  `demo="disabled"` on the item's own root for the same effect).

## Script blocks

A reference file's example can include up to three special blocks, extracted separately from the
markup and never shown mixed in with the "Example HTML":

- **`<script type="application/json">`** — a fully-commented reference of every field a JSON
  `pgs-option` payload accepts (see `toast.html`). Rendered as its own "PGS Option fields" section.
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
needs matching wire-up code written directly in `demo.js`, scoped to that file's section:

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

## Wiring a new page into the demo (`demo.js`)

Adding a `reference/html/<category>/<name>.html` file makes it validate and generate its `.md`, but
three things in `demo.js` need a manual entry for it to actually show up on the live site:

1. **`CATEGORY_LABELS`** — only needed for a brand-new top-level category (e.g. adding `helper` for
   the first time required `helper: "Helper"` here).
2. **`referenceFiles`** (an array near the top of `demoRenderer`) — add `"<category>/<name>.html"`.
   Its position in the array is the file's position in the nav; a category's *first* appearance in
   this array is where that whole category section is inserted.
3. **`ENTRY_ICONS`** — add `"<category>/<name>.html": "fa-solid-icon-name"` (any Font Awesome
   solid icon class) for its nav icon; falls back to a generic square icon if omitted.

Then, only if the example needs real interactivity, add a `configureXDemo()` function as above and
call it from `boot()`.

## Naming conventions worth knowing

- **Markup the library builds at runtime gets an `_` prefix** (`_toast-element`,
  `_notifications-element-icon`, ...) and is documented under `@pgs-generated`, never `@pgs`. An
  exception: a token merely *added* to an element the author already wrote (`formValidate` added to
  an existing `<form>`, `dialog`/`modal-dialog` added to an existing `<dialog>`) stays unprefixed
  and still goes under `@pgs-generated` — the prefix marks a whole new element, not an added token.
- **A `pgs-option` specific to one component is prefixed with that component's name**
  (`modalMini`, `slidesScrollMouse`, `formFieldError`, `headerCompactBottom`, ...) — see
  `migration.md` for the full history of this convention being applied retroactively.
- **A plain reusable utility has no prefix** and is written directly as a `pgs` value, not a
  `pgs-option` (`flexColumn`, `gapElements`, `overflowXAuto`, `icon-close`, ...).

## The tools

```sh
node scripts/generate-pgs-map.js   # scans compiled CSS + source, writes reference/pgs-map.json
npm run docs:generate              # validates every reference/html file, writes docs/**/*.md
                                    # (runs generate-component-docs.js, then generate-guide-docs.js)
npm run start                      # webpack: compiles assets/ into dist/
```

Run all three, in that order, after touching anything under `assets/` or `reference/html/`.
`docs:generate` is strict: an undocumented token used in an example, a documented token that
doesn't actually exist anywhere in `assets/scss`/`assets/javascript`, wrong tag order, a duplicate
section, and more all fail the whole run with a specific file/line/suggestion — fix everything it
reports before it will write anything.

## Adding a brand-new reference page, step by step

1. Create `reference/html/<category>/<name>.html` with the doc comment (see format above) and a
   real, working example below it.
2. Wire it into `demo.js`: `referenceFiles`, `ENTRY_ICONS`, and (only if interactive) a
   `configureXDemo()` call from `boot()`.
3. Run the three commands above, in order. Fix anything `docs:generate` reports.
4. Open `demo/demo.html` in a browser and check the new page renders and behaves as expected.
