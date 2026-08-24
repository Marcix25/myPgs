# Conventions

- Use `pgs` as the first choice for markup, layouts, components, and behaviors.
- Keep tokens consistent across references, SCSS, and JavaScript.
- Use `pgs-state` for runtime states.
- Use `pgs-option` for declarative options.
- Never write a token that starts with `_`: it marks markup the library generates.
- Reach for the colour prefix that matches the property: `bg*`, `txt*`, `br*`, `ol*`.
- Prefer custom properties and mixins to hardcoded CSS.
- Do not duplicate components that already exist in the library.
- Do not invent APIs: verify the sources in `assets/javascript/`.
- Keep only reusable styles and behaviors in `mypgs`.
- Keep project-specific customizations in the consuming project.
- Update `AGENTS.md` when introducing important patterns.
