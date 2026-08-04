# AI Guidelines for `mypgs`

This file is the entry point for AI/Codex agents working with `mypgs`. The detailed rules are separated by working context so that consuming the library and maintaining the library are not confused.

## Choose the working context

- If you are modifying this `mypgs` repository, follow [`AGENTS-DEVELOPMENT.md`](AGENTS-DEVELOPMENT.md).
- If you are building or modifying another project that installs `mypgs` as a dependency, follow [`AGENTS-USAGE.md`](AGENTS-USAGE.md).
- If a task changes both the library and a consuming project, follow both guides. Use the development guide for files inside `mypgs` and the usage guide for files inside the consuming project.

## Shared principles

- Check whether `mypgs` already provides a suitable token, component, layout, mixin, variable, helper, or API before creating a custom solution.
- Treat `reference/html/` as the canonical source for markup and option syntax.
- Keep `pgs`, `pgs-state`, and `pgs-option` consistent between HTML, SCSS, and JavaScript.
- Keep markup semantic and accessible.
- Do not invent public APIs. Verify them in the source, declarations, or current documentation.

## Guide precedence

Repository-specific instructions and explicit user requirements take precedence over these guides. When both specialized guides apply, neither guide authorizes changes outside the files and projects included in the user request.
