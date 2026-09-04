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
- `demo/`: complete integration assembly, not a design reference.

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
- `pgs-option` contains configuration and bracket values.
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
- Compose button variants from `buttonBase`, `buttonContent` or `buttonIcon`, `buttonHover` or `buttonNohover`, plus the required variant mixins.
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
- Update `assets/javascript/pgs.d.ts` and `dist/index.d.ts` when a public API changes.
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

- document every `pgs`, `pgs-state`, and `pgs-option` value used by its example;
- contain only meaningful public examples, not temporary test markup;
- keep the demo scaffolding out of the copyable code, with `demo-code="children"`;
- preserve required structure and accessibility attributes;
- avoid duplicating full examples in other guides under `reference/html/guides/`.

### How the documentation system works

Each file in `reference/html/` is both the canonical example and its own documentation. A single
source feeds two renderers, which must stay in agreement:

- `scripts/generate-component-docs.js` writes `docs/**/*.md` and validates the reference;
- `demo/demo.js` renders the same file as a live panel in `demo/demo.html`.

Every reference opens with a JSDoc-style block. Tags must appear in this order, and each entry is a
single line in the form `- value: description` — the parser accepts no continuation lines:

| tag | holds |
| --- | --- |
| `@title`, `@description` | name and prose, `@description` is the place for events and behaviour |
| `@pgs` | tokens you write yourself |
| `@pgs-generated` | tokens the library puts in the DOM; an `_` prefix marks the ones you can never write |
| `@pgs-option` | configuration, with bracket payloads |
| `@pgs-state` | runtime state |
| `@api` | public JavaScript entry points |
| `@related` | tokens borrowed from other components, grouped automatically by kind |
| `@return` | what the example renders |

The markup below the block is annotated with `demo` attributes that tell both renderers how to split
and present it:

| attribute | effect |
| --- | --- |
| `demo="component"` | the outer wrapper, one per example group |
| `demo="item"` | one example, rendered as its own title, preview and code pair |
| `demo-title`, `demo-description` | heading and prose for that item |
| `demo="disabled"` | keeps the element in the live preview, hides it from the code |
| `demo-preview="none"` | keeps the element in the code, hides the preview — for markup that only carries a payload and is consumed on init, such as `notificationLoad` |
| `demo-code="children"` | prints what is inside the element instead of the element itself |

A `<script type="application/json">` block becomes the "PGS Option fields" section and a
`<script type="text/x-example-js">` block becomes "JavaScript Usage". Both are documentation, so
annotate every field with its accepted values and its default, read from the JavaScript rather than
guessed. Keep the annotations in that one block instead of repeating the field list in `@pgs-option`.

**Example HTML must contain only the markup someone copies to reuse the component, never the markup
that exists to arrange the demo.** When an example needs a layout wrapper to be presentable, mark
that wrapper `demo-code="children"`: it stays in the live preview and disappears from the code. The
same applies to any element whose only job is grouping, spacing or aligning the example.

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

Because the demo rebuilds its code blocks from the live DOM while the generator reads the source
text, the two can drift apart. The serializer normalises what the author wrote — it double-quotes
attributes, expands boolean attributes to `attr=""`, escapes a bare `>` and keeps the source
indentation on every line after the first — so `demo/demo.js` undoes each of those. When changing
either renderer, compare their output: every "Example HTML" block in the demo must match the
corresponding fenced block in `docs/**/*.md` character for character.

## 8. Build and Verification

After relevant changes:

```sh
npm run docs:generate
npm run start
git diff --check
```

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
- Do not use `demo/demo.html` as inspiration or as the canonical component structure.
- Do not keep temporary test examples in canonical references.
- Do not let demo scaffolding reach an Example HTML block: a layout wrapper added to arrange the example belongs in the preview only.
- Do not repeat a field list in `@pgs-option` when the option block already documents it.
- Do not hardcode values when an established variable or custom property exists.
- Do not make a reusable feature project-specific.

## 10. Maintainer Checklist

- Did I search for an existing implementation first?
- Is the source file in the correct architectural group?
- Are `pgs`, `pgs-state`, and `pgs-option` synchronized everywhere?
- Is the HTML reference canonical, minimal, and fully documented?
- Does every Example HTML block contain only reusable markup, and match the generated `.md` exactly?
- Did I update public APIs and TypeScript declarations together?
- Did I preserve compatibility or clearly identify a breaking change?
- Did I regenerate documentation and rebuild `dist/`?
- Did I run `git diff --check`?
- Did I avoid changing unrelated user work?
