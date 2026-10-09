# Developing and Maintaining `mypgs`

This guide is for AI/Codex agents modifying the `mypgs` repository itself. For projects that only consume the package, follow `AGENTS-USAGE.md` instead.

## 1. Repository Scope

The source of truth is organized as follows:

- `assets/scss/base/`: global foundations and variables;
- `assets/scss/layout/`: reusable layout tokens;
- `assets/scss/components/`: component selectors;
- `assets/scss/mixin/`: public and private SCSS mixins;
- `assets/javascript/base/`: base runtime behavior;
- `assets/javascript/components/`: reusable component modules;
- `assets/javascript/helper/`: reusable JavaScript helpers;
- `reference/html/`: canonical markup and documentation metadata, including `reference/html/guides/` for narrative guide pages (rendered as prose, not a component example — see `scripts/generate-guide-docs.js`);
- `docs/`: generated documentation, entirely produced by `scripts/generate-component-docs.js` and `scripts/generate-guide-docs.js` — there is no hand-maintained file left under `docs/`;
- `dist/`: compiled package assets;
- `site/`: complete integration assembly, not a design reference.

Do not edit generated `dist/` files as the source of truth. Modify `assets/`, regenerate documentation when needed, and rebuild the distribution.

## 2. Before Changing the Library

- Check `README.md`, `reference/`, `assets/scss/`, and `assets/javascript/` for an existing implementation.
- Search for related tokens, selectors, mixins, and APIs with `rg`.
- Determine whether the change is a fix, extension, new component, or breaking public API change.
- Preserve backward compatibility unless the user explicitly accepts or requests a breaking change.
- Keep HTML, SCSS, JavaScript, declarations, references, documentation, demo, and compiled assets synchronized where applicable.
- Preserve unrelated work already present in the worktree.

## 3. Library Contracts

- `pgs` is the component and layout contract shared by markup, SCSS, and JavaScript.
- `pgs-state` contains runtime state.
- CSS flags and JavaScript-only boolean flags both live inside their component bracket, and each flag carries its component's own prefix: `pgs="button['btnTransparent']"`, `pgs="header['headerScroll']"`, `pgs="card['cardMini']"`. The prefix table below is the authoritative list.
- `pgs-data` holds only genuine `key[payload]` values passed from HTML to JavaScript, such as `headerCompactFrom[600]`. A flag with no payload never belongs there, and its key keeps its component prefix (`headerCompactFrom`, `modalContainerID`) — `pgs-data` is a flat attribute with no bracket to give a bare key context, unlike a CSS flag.
- `.option` and `.data` are two separate accessors, split by attribute as well as by purpose: `.option` (`contains`/`add`/`remove`/`toggle`/`querySelector(All)`/`closest`) only ever reads/writes the `pgs` attribute; `.data` (`getValueBrackets`/`setValueBrackets`/`value`) only ever reads/writes `pgs-data`. Neither one touches the other's attribute.
- `.option.add(key)` derives the owning component from `key`'s own name — the lowercase run before the first uppercase letter or a `-` — and merges into that component's existing bracket if a token with that key is present on the element. Most flags carry an abbreviated prefix, so this only actually resolves an owner for flags whose prefix is the component's own full name (`icon-moon` → `icon`, `cardMini` → `card`, `badgeDot` → `badge`, `menuVertical` → `menu`); an abbreviated prefix does not count — `mgLt`/`pdTp` derive `mg`/`pd`, not `margin`/`padding`, `btnMini` derives `btn`, not `button`, and the same goes for every other abbreviated prefix in the table below — so those fall through the same as any other abbreviated flag, becoming their own bare `pgs` token, same as `hoverNot` (which never had an owner to derive). To add a shortened flag into its bracket, call the base `pgs(el).add("component['flag']")` directly, naming the component — this is now the normal way to add a bracket flag from JavaScript, not a fallback. `option.remove`/`option.toggle` strip a flag correctly either way, bare or nested, since removal only needs to find the flag, not derive where to put it. There is no ownership registry to keep in sync.
- A flag with no payload always lives in `pgs`, bare or bracketed. `pgs-data` holds only a genuine `key[payload]` value; `tabsHistory` is the one flag that can be either, and its bare form is set through `.data.value` directly (`.data` has no `contains`/`add`/`remove`/`toggle`), since there is no owner to derive for it and it never belongs in the `pgs` bracket.
- Components use a stable root token and consistently prefixed child tokens.
- Naming is normally camelCase for compound root/options and component-prefixed naming for child tokens.
- Every bracket flag carries a prefix of its own component, so two components on the same element can never match each other's flag (`[pgs*="'btnMini'"]` cannot be mistaken for card's `[pgs*="'cardMini'"]`). A short component name is written in full (`alertInfo`, `badgeDot`, `cardMini`, `headerScroll`, `iconLarge`, `menuVertical`, `slidesSingleScroll`); a long one is abbreviated, as the table below lists. Once a component has a prefix, every new flag of it uses the same one. The documented exceptions are flex/grid's layout flags (`column`, `row`, `wrap`, `gapTexts`, `itemCenter`, `justifyBetween`, and the child flags `flexM`, `colL`, ...), which are the one family still bare; `hoverNot`, which has no single owner and is written in the bracket of whichever component it opts out (`box['hoverNot']`, as `reference/html/base/hover.html` shows — the bare token `hoverNot`, which is what `option.add("hoverNot")` writes, matches too); and the `icon-*` glyphs, which keep their `icon-` form (`icon['icon-check']`).

  The abbreviated prefixes, derived from `reference/pgs-map.json` and `assets/scss` (a flag that starts with its component's own full name, such as `badgeDot`, `bodyBase`, `boxMini`, `gridDense`, `hideMediaUpTablet`, `imgCover`, `logoDarkmode`, `searchMinWidth`, `toastLeft` or the `height*`/`width*` families, needs no row):

  | prefix | component or utility roots | example flags |
  | --- | --- | --- |
  | `acc` | `accordion`, `accordionContainer` | `accAutoOpen`, `accMultiOpen` |
  | `asp` | `aspect` | `aspSquare`, `aspVideo` |
  | `bd` | `border`, `borderTop` and the other sides, `borderColor` | `bdThin`, `bdTpThick`, `bdPrimary` |
  | `bg` | `background` | `bgPrimary`, `bgBoxDark` |
  | `blr` | `blur` | `blrUnset` |
  | `btn` | `button` | `btnMini`, `btnStrong`, `btnTransparent`, `btnIconOnly` |
  | `bxs` | `boxShadow` | `bxsUnset` |
  | `cnt` | `container` | `cntNone` |
  | `dialog` | `modal`, `notificationBell` | `dialogRight`, `dialogAnimationZoom` (they act on the `<dialog>`, not on the wrapper) |
  | `drp` | `dropdown` | `drpHover`, `drpNotArrow` |
  | `mg` | `margin`, `marginTop` and the other sides | `mgAuto`, `mgElements`, `mgTpElements` |
  | `otl` | `outline` | `otlPrimary`, `otlThin` |
  | `ov` | `overflow` | `ovHidden`, `ovAutoY` |
  | `pd` | `padding`, `paddingTop` and the other sides | `pdPage`, `pdBlTexts` |
  | `pe` | `pointerEvents` | `peNone` |
  | `pos` | `position` | `posRelative`, `posSticky` |
  | `rad` | `borderRadius` | `radInput`, `radExternal` |
  | `rot` | `rotate` | `rot90`, `rot180` |
  | `sct` | `section` | `sctFull`, `sctMax` |
  | `sel` | `userSelect` | `selNone`, `selText` |
  | `shell` | `pageShell` | `shellAsideScroll`, `shellFullPage` |
  | `ta` | `textAlign` | `taCenter`, `taJustify` |
  | `tgl` | `toggleDarkmode` | `tglLabeled` |
  | `txs` | `textShadow` | `txsUnset` |
  | `txt` | `textColor` | `txtPrimary`, `txtError` |
  | `zi` | `zIndex` | `ziOne`, `ziTen` |

  Margin, padding and border have one root per side next to the root for all four sides (`marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `marginBlock`, `marginInline`, and the same for `padding*` and `border*`; see `assets/scss/layout/_spacing.scss` and `assets/scss/base/_border.scss`). Every root of a family shares the abbreviated prefix, and a per-side flag adds a side code (`Tp`, `Rt`, `Bt`, `Lt`, `Bl`, `In`) before the scale: `marginTop['mgTpElements']`, `paddingInline['pdInPage']`, `borderTop['bdTpThin']`. The side code alone (`mgTp`) is that side's default size. Margin and padding take the same scale as `gap` (`Texts`, `Elements`, `Groups`, `Sections`, `Page`, `Unset`; margin also `Auto` and `Negative`), border takes `Thin`, `Thick`, `Thicker` and `Unset`. Border color is its own root, `borderColor['bdPrimary']`, and outline is a single root, `outline['otlThin' 'otlPrimary']`.
- A child element the JavaScript may need to build from scratch — because the author can place it by hand but doesn't have to — takes two forms of the same token: the bare name when the author writes it, an `_`-prefixed name when the module generates it instead. Both forms mean the same thing to the component, so every check has to recognize either: an existence check reads `pgs(el).querySelector(["childToken", "_childToken"])` (array-argument `querySelector` accepts either form as one call), and the generated markup itself is written with only the underscore form. The SCSS selector styling that child needs both too, normally as `:where([pgs~="childToken"]), :where([pgs~="_childToken"])`. Document the split the same way: the bare name under `@pgs` ("write one yourself... the module leaves it alone and never generates a second one"), the underscore name under `@pgs-generated`. See `_steps.js`/`_steps.scss`/`steps.html` (`steps-step-circle`/`_steps-step-circle`) or `_modal.js`/`_modal.scss`/`modal.html` (`modal-close`/`_modal-close`) for the pattern applied end to end. This is a different case from the `modal-dialog`/`_dialog` one below: there the child is never author-placeable at all, so it only ever needs the one, always-bare form, with a second underscore-only token carrying its options instead of switching name.
- A token's CSS selector needs the full `:is([pgs~="X"], [pgs*="X\5B"])` form only if X itself ever carries its own bracket. "Root" here means "gets its own bracket," not "has no prefix in its name": a true child token (`accordion-button`, `modal-dialog-content`) never carries one and simplifies to a plain `[pgs~="X"]`. When adding a selector for a new child-shaped token, check whether it will ever receive its own option before simplifying it. There is no exception left for a child that also happens to be its own DOM element, addressable and movable independently of its nominal parent (`modal-dialog`, the `<dialog>` the JavaScript can move anywhere): it stays plain like every other child, and options land instead on a second, pgs-generated-only token added alongside it for that purpose (`_dialog`) — see `assets/javascript/components/_modal.js` and `assets/scss/components/_modal.scss`. A future case shaped like this should follow the same pattern rather than reopening the exception: never write the underscore-prefixed token by hand, add it in the same place the JavaScript already adds the plain child token, and copy each option onto it instead of onto the child.
- Markup must remain semantic and accessible before runtime enhancement.
- Canonical HTML references define the supported structure and option syntax.

When changing a token, update every selector, query, reference, declaration, demo usage, and documentation entry that depends on it.

## 4. SCSS Development

### SCSS comment hierarchy

Every SCSS comment uses one of these markers, chosen by what it introduces, never mixed with plain
prose:

| marker (followed by a space) | use |
| --- | --- |
| `//#` | page identifier, once per file, when the file has several sections and it helps to know what's inside from the first line — like an HTML `<title>`; not essential, but preferred when a file has more than one `//=` section. Example: `//# BORDER - BORDER RADIUS - OUTLINE` |
| `//=` | a title. Example: `//= SLIDES` |
| `//==` | a subtitle, one level under a title. Example: `//== CONTAINER SLIDES` |
| `//===` | a sub-subtitle, one level under a subtitle. Example: `//=== SLIDE` |
| `//` (nothing after the slashes) | a description or explanation, at any depth. Never reuse `//#`/`//=`/`//==`/`//===` for this — those four are reserved for the heading hierarchy above, nothing else. |

- Add reusable styles to the correct `base`, `layout`, `components`, or `mixin` group.
- Import new source files from `assets/scss/index.scss` or forward mixins from `assets/scss/mixin/mixin.scss` as appropriate.
- Reuse existing custom properties and naming conventions.
- Prefer configurable custom properties over hardcoded values.
- Custom properties are named `--component-property[-variant]`. A hyphen separates a family from what varies inside it — a state, a side, a color role: `--button-color-current`, `--button-border-color`, `--button-padding-block`, `--search-suggestions-item-background-hover` (the state goes last). A property that is one concept stays one camelCase word: `--button-borderRadius`, `--button-fontSize`, `--alert-iconSize`, `--footer-colorScheme`. The global design tokens (`--border-radius`, `--font-size-text`, `--text-line-height`, `--box-shadow`, …) predate this rule and keep their names.
- A custom property written only by JavaScript (a measured position, height or ratio that an author override would be overwritten on) takes a leading `_`: `--_dropdown-left`, `--_slides-height`. The underscore says "read it if you need it, never set it". A private SCSS-only helper property uses the same prefix (`--_dropdown-arrow-inset`). A property the author is meant to set stays unprefixed even when JavaScript reads it (`--header-compact-breakpoint`, `--svg-color-N`). `--_header-height` and the three like it are written by the JS and read by the SCSS and by themes: the underscore keeps authors from setting them.
- Keep component selectors scoped consistently with the existing stylesheet architecture.
- Use private mixins with a leading `_` when they are implementation details of a public mixin.
- Do not duplicate layout or component logic already available elsewhere in the library.
- Compose button variants from `buttonBase` plus the variant mixins that exist in `assets/scss/mixin/_mx-button.scss` (`buttonIconOnly`, `buttonMini`, `buttonVertical`, `buttonTransparent`, `buttonText`, `buttonPaddingEqual`, `buttonCurrent`, `buttonTwoState`, `buttonForHeader`, `buttonForNavSmart`); variant mixins do not include the base. The shared hover treatment is written once, under `[pgs~=hover]`: `pgs.hover` adds the `hover` token to clickable surfaces when the page's `<body>` has `bodyHoverAuto`, and `component['hoverNot']` is the opt-out. Only `button`, `box` and `card` also keep a pure-CSS fallback hover (`buttonHover`, `boxHover`, the link rule in `assets/scss/components/_card.scss`) that applies while the body lacks `bodyHoverAuto`. An element that needs the treatment without that token composes `hoverBase`, `hoverStyle1` and `focus` directly.
- Treat a removed or renamed public mixin, token, option, or custom property as a potential breaking change.

Example component structure:

```scss
@use "../mixin/mixin" as *;

[pgs~=myComponent] {
    @include myComponent();
}
```

## 5. JavaScript and TypeScript Development

- Prefer extending an existing module or helper over creating overlapping behavior.
- Component initialization accepts a root, `init(root = document)`: see "Module lifecycle" below.
- Use `WeakMap` for per-element public APIs when the component owns instances.
- Export modules with `init` and/or `api` when public lifecycle access is needed.
- Register public shortcuts in `assets/javascript/_imports.js` through `pgs.registerModules`.
- Import runtime modules from `assets/javascript/_imports.js` (`index.js` loads it): a module starts itself on import, so there is no second list to keep in `index.js`.
- Keep visual state in `pgs-state`, not arbitrary CSS classes.
- Update `dist/index.d.ts` when a public API changes: it is the only declaration file the package ships.
- Validate options and produce clear errors for invalid public input.
- Escape user-provided content before inserting it through HTML templates.

Registration example:

```js
import { PGS_myNewComponent } from "./components/_myNewComponent.js";

pgs.registerModules({
    myNewComponent: PGS_myNewComponent,
});
```

### Module lifecycle

Every component module follows one contract; its helpers live in `assets/javascript/helper/` and every module imports `pgs` from `../_pgs.js` instead of relying on the global.

- `init(root = document)` resolves its elements with `PGS_roots(root, token)` (`_dom.js`), which always includes the root itself when it carries the token, then skips every element that is already in the module's `WeakMap`: the map is the only double-init guard, never a `data-*` marker. It checks the required markup before writing to the DOM and, when it is invalid, calls `PGS_warn("module.init", "...")` and returns.
- One `AbortController` per instance: every listener the instance adds (element, `document` or `window`) takes `{ signal }`, and observers, timers and animation frames are released in `destroy()`. A `document`/`window` listener that serves all instances is registered once at module level, never inside `init`.
- The instance API (what `api(el)` returns) has `element`, `destroy()` and `refresh()` next to the module's own methods. `destroy()` aborts the controller and removes the instance from the `WeakMap`; it leaves the markup the module generated in place, so a new `init` reuses it. `refresh()` is `destroy()` plus a rebuild of that one element, and it returns the new instance.
- Events go only through `PGS_dispatch(target, "pgs:module:name", detail)`: they bubble, and `detail.element` is always the target.
- Messages share one voice, `pgs.<module>.<method>(): message`: `PGS_warn(scope, message)` for invalid markup or a request that can be skipped, `throw PGS_invalid(scope, message)` (a `TypeError`) for an invalid argument to a public method.
- The helpers: `_dom.js` (`PGS_roots`, `PGS_directChild`, `PGS_directChildren`, `PGS_uniqueId`, `PGS_dispatch`), `_throttle.js` (`PGS_rafThrottle`, `PGS_watchDocument`), `_warn.js` (`PGS_warn`, `PGS_invalid`), `_text.js` and `_onDocumentReady.js`.

## 6. Adding or Changing a Component

For a reusable component:

1. Add or update its mixins in `assets/scss/mixin/` when composition is useful.
2. Add its public selector in `assets/scss/components/`.
3. Import it from `assets/scss/index.scss`.
4. Add JavaScript only when behavior is required.
5. Register the JavaScript module when it needs a `pgs.*` public API.
6. Add or update the canonical HTML reference.
7. Update declarations and README when the public usage changes.
8. Regenerate generated documentation.
9. Rebuild distributed CSS and JavaScript assets.

Do not create a separate reference page when the new token is intentionally part of an existing component API. Document it in that component's canonical reference instead.

## 7. Canonical References

Use `reference/html/` as the single source of truth. Each reference must:

- document every `pgs`, `pgs-state`, and `pgs-data` value used by its example;
- contain only meaningful public examples, not temporary test markup;
- keep the demo scaffolding out of the copyable code, with `demo="wrapper"`;
- preserve required structure and accessibility attributes;
- avoid duplicating full examples in other guides under `reference/html/guides/`.

### How the documentation system works

Each file in `reference/html/` is both the canonical example and its own documentation. A single
source feeds two renderers, which must stay in agreement:

- `scripts/generate-component-docs.js` writes `docs/**/*.md` and validates the reference;
- `scripts/demo-render.js` renders the same file as a demo panel, at build time, in Node.

Hand-authored shells feed the build, none of them a page on its own: `site/page/demo.html` (the
pageShell that hosts the reference nav and panels, empty until the build fills it in) and
`site/index.html` (the page around every page — the head, shared by all of them),
which names `header.html` (header and navSmart) and `footer.html` with `<!-- include: <file name> -->` comments, one
fragment per component. The site's own CSS/JS/images live under `site/assets/css/`,
`site/assets/js/`, `site/assets/img/` and `site/assets/font/`, the shells and fragments under
`site/parts/`; `npm run sitebuild`
(`scripts/build-site-static.js`) combines
them with the rendered reference files into generated output across two places:
`site/page/*.html` — one page's own content each, no shell around it, all of it hand-kept (`home.html`,
`test.html`; nothing generated is written there) — and `site/build/*.html`: one output per file in
`page/`, named the same, plus `demo.html`, with `site/index.html` and `assets/js/demo.js`
wrapped around it. The demo page's own content (page/demo.html merged with the nav+panels that
`scripts/demo-render.js` renders from `reference/html`) is built in memory and goes straight into
`build/demo.html`, with no file of its own. Every page renders nothing at runtime, so it opens instantly whatever the
reference count, and `demo.js` only wires navigation, copy buttons and the interactive examples —
most of that specific to whichever page carries the reference panels, harmless on any other.
The `index.html` at the repo root redirects to `site/build/home.html`, the one place that names
the current home page's filename. Adding a brand-new page needs no script change: drop its own content in
`site/page/<name>.html` and the next `npm run sitebuild` produces `site/build/<name>.html` from it,
sharing the same shell as every other page (`demo.html` is the one page the script fills in with the rendered reference, and it has to exist). Everything in `site/build/` is generated; `site/page/` is all hand-kept:
never edit any `site/build/*.html` by hand — edit
`reference/html/`, the two `site/parts/*.html` files, or a page's own file under
`site/page/`, and rerun the script.

Every reference opens with a JSDoc-style block. Tags must appear in this order, and each entry is a
single line in the form `- value: description` — the parser accepts no continuation lines:

| tag | holds |
| --- | --- |
| `@title`, `@description` | name and prose, `@description` is the place for events and behavior |
| `@pgs` | tokens you write yourself |
| `@pgs-generated` | tokens the library puts in the DOM; an `_` prefix marks the ones you can never write |
| `@pgs-options` | CSS flags and JavaScript-only boolean flags inside each component bracket |
| `@pgs-data` | key[payload] configuration passed from HTML to JavaScript |
| `@pgs-state` | runtime state |
| `@api` | public JavaScript entry points |
| `@related` | tokens borrowed from other components, grouped automatically by kind |
| `@return` | what the example renders |

The markup below the block is annotated with `demo` attributes that tell both renderers how to split
and present it:

The `demo` attribute is a space-separated token list, the same convention as `pgs-state` (component brackets keep their internal spaces in `pgs`):

| token | effect |
| --- | --- |
| `demo="component"` | one independent example — the outer boundary of a group, or (nested inside another `component`) one variant/entry within it |
| `demo="wrapper"` | a purely nested grouping element inside a `component`'s own markup: its tag never reaches the copied code, only its children do — repeatable at any depth or side by side (see `base/border.html`'s several rows) |
| `demo="disabled"` | keeps the element in the live preview, hides it from the code |
| `demo="previewNone"` | keeps the element in the code, hides the preview — for markup that only carries a payload and is consumed on init, such as `notificationLoad` |
| `demo="codeNone"` | keeps the title and description, drops the code block entirely — for markup with nothing worth copying |

`component` marks structure — every independent example is one, whether it's the only one in the
file or nested inside another as one of several; `wrapper` and the two modifiers never define
structure on their own. `previewNone`/`codeNone` combine with `component` on the same element, e.g.
`demo="component previewNone"` — never write more than one `component` role marker's worth of intent
on an element; a `wrapper` is never itself a `component` and vice versa.

A heading is never an attribute on the example itself: a standalone, self-closing `<demo>` element
placed immediately before it carries the title and description instead, so the two never compete for
the same tag. `<demo demo-h3="Title" demo-description="...">` titles the `demo="component"` element it
immediately precedes; `<demo demo-h2="Title" demo-description="...">` introduces a heading one level
up, grouping every example that follows until the next `demo-h2` (used when a file's examples split
into named groups, such as `layout/pageShell.html`'s "Page Shell" and "Page Shell - Scroll" sets — most files only
ever need `demo-h3`). A `demo="component"` that itself contains a nested `demo="component"` (as in
`formAddon.html`'s outer `<form>` around several inner examples) is transparent: it carries no heading
of its own, and a `<demo>` marker only ever precedes an actual titleable leaf.

A `<script type="application/json">` block becomes the "PGS Data fields" section and a
`<script type="text/x-example-js">` block becomes "JavaScript Usage". Both are documentation, so
annotate every field with its accepted values and its default, read from the JavaScript rather than
guessed. Keep the annotations in that one block instead of repeating the field list in `@pgs-data`.

**Example HTML must contain only the markup someone copies to reuse the component, never the markup
that exists to arrange the demo.** When an example needs a layout wrapper to be presentable, mark
that wrapper `demo="wrapper"`: it stays in the live preview and disappears from the code. The same
applies to any element whose only job is grouping, spacing or aligning the example, and it can repeat
at any depth within one example (see `base/border.html`'s several rows, each its own `wrapper`).

Generate component documentation with:

```sh
npm run docs:generate
```

The generator must complete with zero blocking validation errors. It also enforces the contracts
that cannot be checked by reading: every documented value must exist in the associated source, every
`@pgs-generated` entry must really be emitted by the JavaScript, a token the JavaScript builds
cannot sit in `@pgs` unless an example writes it, and an `_` prefix is only allowed on a
`@pgs-generated` entry.

`reference/pgs-map.json` is the whole token surface grouped by component, rebuilt with
`node scripts/generate-pgs-map.js` after adding or renaming a token.

Both renderers read the reference's source text and only dedent it, so an "Example HTML" block in
the demo and the fenced block in `docs/**/*.md` are the same characters by construction. That used
to take deliberate work, when the demo rebuilt its code blocks from the live DOM and had to undo
what the serializer normalized; keep it that way — a renderer that goes through the DOM brings the
drift back.

## 8. Build and Verification

After relevant changes:

```sh
npm run webpack                     # compiles assets/ into dist/
node scripts/generate-pgs-map.js    # reads dist/css/index.css
npm run docs:generate               # reads the SCSS and JavaScript sources
npm run sitebuild                   # reads dist/css/index.css and reference/html/
npm test
git diff --check
```

`npm run precommit` runs this whole chain, in this order, and stops at the first failure.

Keep that order: `generate-pgs-map.js` and `build-site-static.js` both read the compiled CSS, so
running either before webpack describes the previous compile.

While iterating, `npm run webpack:watch` and `npm run sitebuild:watch` keep `dist/` and every
`site/build/*.html` up to date on their own; the map and the documentation are still generated on
demand.

Apply verification in proportion to the change. Also inspect generated output when selectors, markup contracts, public APIs, or distribution files change.

Before a release:

- inspect the complete diff from the previous release;
- select the version according to SemVer;
- update `package.json` and `package-lock.json` together;
- document all breaking changes explicitly;
- confirm references, documentation, demo, declarations, and `dist/` are synchronized.

## 9. What Not to Do

- Do not edit `dist/` as the primary implementation.
- Do not create duplicate components or JavaScript services.
- Do not invent APIs without implementing and documenting them.
- Do not silently change public tokens, selectors, markup, mixins, method signatures, or source import paths.
- Do not use `site/` as inspiration or as the canonical component structure.
- Do not keep temporary test examples in canonical references.
- Do not let demo scaffolding reach an Example HTML block: a layout wrapper added to arrange the example belongs in the preview only.
- Do not repeat a field list in `@pgs-data` when the option block already documents it.
- Do not hardcode values when an established variable or custom property exists.
- Do not make a reusable feature project-specific.

## 10. Maintainer Checklist

- Did I search for an existing implementation first?
- Is the source file in the correct architectural group?
- Are `pgs`, `pgs-state`, and `pgs-data` synchronized everywhere?
- Is the HTML reference canonical, minimal, and fully documented?
- Does every Example HTML block contain only reusable markup, and match the generated `.md` exactly?
- Did I update public APIs and TypeScript declarations together?
- Did I preserve compatibility or clearly identify a breaking change?
- Did I regenerate documentation and rebuild `dist/`?
- Did I run `git diff --check`?
- Did I avoid changing unrelated user work?
