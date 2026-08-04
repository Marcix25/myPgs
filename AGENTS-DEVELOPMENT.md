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
- `reference/html/`: canonical markup and documentation metadata;
- `reference/react/`: React equivalents of canonical examples;
- `docs/`: generated and manually maintained documentation;
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
7. Keep the React reference aligned when one exists.
8. Update declarations, README, guide files, and manually maintained docs when the public usage changes.
9. Regenerate generated documentation.
10. Rebuild distributed CSS and JavaScript assets.

Do not create a separate reference page when the new token is intentionally part of an existing component API. Document it in that component's canonical reference instead.

## 7. Canonical References

Use `reference/html/` as the single source of truth. Each reference must:

- document every `pgs`, `pgs-state`, and `pgs-option` value used by its example;
- contain only meaningful public examples, not temporary test markup;
- preserve required structure and accessibility attributes;
- avoid duplicating full examples in other manually maintained guides;
- remain aligned with its React equivalent when present.

Generate component documentation with:

```sh
npm run docs:generate
```

The generator must complete with zero blocking validation errors.

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
- Do not hardcode values when an established variable or custom property exists.
- Do not make a reusable feature project-specific.

## 10. Maintainer Checklist

- Did I search for an existing implementation first?
- Is the source file in the correct architectural group?
- Are `pgs`, `pgs-state`, and `pgs-option` synchronized everywhere?
- Is the HTML reference canonical, minimal, and fully documented?
- Is the React reference aligned where applicable?
- Did I update public APIs and TypeScript declarations together?
- Did I preserve compatibility or clearly identify a breaking change?
- Did I regenerate documentation and rebuild `dist/`?
- Did I run `git diff --check`?
- Did I avoid changing unrelated user work?
