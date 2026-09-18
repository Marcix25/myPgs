# Developing and Maintaining `mypgs`

This guide is for AI/Codex agents modifying the `mypgs` repository itself. For projects that only consume the package, follow `AGENTS-USAGE.md` instead.

## 1. Repository Scope

The source of truth is organized as follows:

- `assets/scss/base/`: global foundations and variables;
- `assets/scss/layout/`: reusable layout tokens;
- `assets/scss/components/`: component selectors;
- `assets/scss/patterns/`: larger interface patterns;
- `assets/scss/mixin/`: public and private SCSS mixins;
- `assets/javascript/base/`: base runtime behavior;
- `assets/javascript/components/`: reusable component modules;
- `assets/javascript/helper/`: reusable JavaScript helpers;
- `assets/javascript/patterns/`: larger runtime patterns;
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
- CSS flags and JavaScript-only boolean flags both live inside their component bracket: `pgs="button['buttonStrong']"`, `pgs="header['headerScroll']"`.
- `pgs-data` holds only genuine `key[payload]` values passed from HTML to JavaScript, such as `headerCompactFrom[600]`. A flag with no payload never belongs there.
- `.option` and `.data` are two separate accessors, split by attribute as well as by purpose: `.option` (`contains`/`add`/`remove`/`toggle`/`querySelector(All)`/`closest`) only ever reads/writes the `pgs` attribute; `.data` (`getValueBrackets`/`setValueBrackets`/`value`) only ever reads/writes `pgs-data`. Neither one touches the other's attribute.
- `.option.add(key)` derives the owning component from `key`'s own name — the lowercase run before the first uppercase letter or a `-` (`buttonTransparent` → `button`, `headerScroll` → `header`), the naming convention every component-owned flag already follows — and merges into that component's existing bracket if a token with that key is present on the element. When no such token is present, the flag becomes its own bare `pgs` token instead (this is how `hoverNot` — a flag with no single owner — ends up on an element with no matching `hover`/`button`/`card`/`box` token to merge into). `option.remove`/`option.toggle` strip a flag correctly either way, bare or nested. There is no ownership registry to keep in sync.
- A flag with no payload always lives in `pgs`, bare or bracketed. `pgs-data` holds only a genuine `key[payload]` value; `tabsHistory` is the one flag that can be either, and its bare form is set through `.data.value` directly (`.data` has no `contains`/`add`/`remove`/`toggle`), since there is no owner to derive for it and it never belongs in the `pgs` bracket.
- Components use a stable root token and consistently prefixed child tokens.
- Naming is normally camelCase for compound root/options and component-prefixed naming for child tokens.
- Markup must remain semantic and accessible before runtime enhancement.
- Canonical HTML references define the supported structure and option syntax.

When changing a token, update every selector, query, reference, declaration, demo usage, and documentation entry that depends on it.

## 4. SCSS Development

- Add reusable styles to the correct `base`, `layout`, `components`, `patterns`, or `mixin` group.
- Import new source files from `assets/scss/index.scss` or forward mixins from `assets/scss/mixin/mixin.scss` as appropriate.
- Reuse existing custom properties and naming conventions.
- Prefer configurable custom properties over hardcoded values.
- Keep component selectors scoped consistently with the existing stylesheet architecture.
- Use private mixins with a leading `_` when they are implementation details of a public mixin.
- Do not duplicate layout or component logic already available elsewhere in the library.
- Compose button variants from `buttonBase`, `buttonContent` or `buttonIcon`, plus the required variant mixins. No component writes the hover treatment itself: `pgs.hover` marks a clickable surface with the `hover` token and `[pgs~=hover]` draws it, with `pgs="button['hoverNot']"` (or the bracket of the relevant component) as the single opt-out. An element that needs the treatment without that token composes `hoverBase`, `hoverStyle1` and `focus` directly.
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
- Component initialization should accept a root when practical.
- Use `WeakMap` for per-element public APIs when the component owns instances.
- Export modules with `init` and/or `api` when public lifecycle access is needed.
- Register public shortcuts in `assets/javascript/_imports.js` through `pgs.registerModules`.
- Import runtime modules from `assets/javascript/index.js` when they require automatic initialization or bundling.
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

## 6. Adding or Changing a Component

For a reusable component:

1. Add or update its mixins in `assets/scss/mixin/` when composition is useful.
2. Add its public selector in `assets/scss/components/` or `assets/scss/patterns/`.
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

Two hand-authored shells feed the build, neither a page on its own: `site/parts/demo.structure.html`
(the pageShell that hosts the reference nav and panels) and `site/parts/site.structure.html` (the
page around every page — head, header, footer, shared by all of them). The site's own CSS/JS/images
live under `site/assets/css/`, `site/assets/js/`, `site/assets/img/` and `site/assets/font/`, the
two shells under `site/parts/`; `npm run sitebuild`
(`scripts/build-site-static.js`) combines
them with the rendered reference files into generated output across two places:
`site/page/*.html` (one page's own content each, no shell around it — `demo.html` generated from
demo.structure.html merged with demo.content.html, alongside whatever else is hand-kept there, such
as `home.html` and `test.html`) and `site/build/*.html` — one output per file in `page/`, `demo.html`
included, named the same, with `site.structure.html` and `assets/js/demo.js` wrapped around it.
`site/build/` also holds `demo.content.html`, the pre-baked nav+panels markup produced by
`scripts/demo-render.js`, a fragment nobody opens directly, next to the real pages it feeds into
`page/demo.html`. Every page renders nothing at runtime, so it opens instantly whatever the
reference count, and `demo.js` only wires navigation, copy buttons and the interactive examples —
most of that specific to whichever page carries the reference panels, harmless on any other.
`site/index.html` redirects to `build/home.html`, so nothing else needs to know the current home
page's filename. Adding a brand-new page needs no script change: drop its own content in
`site/page/<name>.html` and the next `npm run sitebuild` produces `site/build/<name>.html` from it,
sharing the same shell as every other page. All of it is generated except that hand-kept content:
never edit `demo.content.html`, `page/demo.html` or any `site/build/*.html` by hand — edit
`reference/html/`, the two `site/parts/*.structure.html` files, or a page's own file under
`site/page/`, and rerun the script.

Every reference opens with a JSDoc-style block. Tags must appear in this order, and each entry is a
single line in the form `- value: description` — the parser accepts no continuation lines:

| tag | holds |
| --- | --- |
| `@title`, `@description` | name and prose, `@description` is the place for events and behaviour |
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
into named groups, such as `layout/pageShell.html`'s "simple" vs. "not scroll" sets — most files only
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
what the serializer normalised; keep it that way — a renderer that goes through the DOM brings the
drift back.

## 8. Build and Verification

After relevant changes:

```sh
npm run start                       # webpack: compiles assets/ into dist/
node scripts/generate-pgs-map.js    # reads dist/css/index.css
npm run docs:generate               # reads the SCSS and JavaScript sources
npm run sitebuild                   # reads dist/css/index.css and reference/html/
git diff --check
```

Keep that order: `generate-pgs-map.js` and `build-site-static.js` both read the compiled CSS, so
running either before webpack describes the previous compile.

While iterating, `npm run start:watch` and `npm run sitebuild:watch` keep `dist/` and every
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
