# CSS/SCSS usage

The library exposes many custom properties that should be preferred to hardcoded values, for example:

```scss
:root {
  --color-primary: #5c7d6f;
  --padding: 30px;
  --gap-texts: 1rem;
  --gap-elements: 4rem;
  --border-radius: 4.5rem;
  --border-radius-input: 2.25rem;
  --border-width: 1.5px;
  --border-color: #ebebeb;
  --outline-width: var(--border-width);
  --outline-color: var(--border-color);
}
```

Recommended override:

```scss
#danger-action {
  --button-background: var(--color-error);
  --button-color: var(--color-whiteFixed);
}
```

Avoid rewriting padding, gaps, border radii, or colors from scratch when a suitable variable or PGS token already exists.

## Button mixins

Button styling is split into small mixins so each consumer can include only the behavior it needs. A standard button is composed explicitly:

```scss
.action {
  @include buttonBase();
  @include buttonContent();
  @include buttonHover();
}
```

Use `buttonIcon` instead of `buttonContent` for icon-only controls, and `buttonNohover` instead of `buttonHover` when pointer interaction must remain neutral:

```scss
.icon-action {
  @include buttonBase();
  @include buttonIcon();
  @include buttonNohover();
}
```

`buttonStrong`, `buttonMini`, `buttonBig`, and `buttonTransparent` contain only their variant declarations and must be added after the required base, content/icon, and interaction mixins. This explicit composition is also the preferred pattern for components such as menus, accordions, forms, and step tabs.

## The `pgs` system

Markup uses space-separated tokens inside the `pgs` attribute:

```html
<button pgs="button" pgs-option="buttonStrong" type="button">Save</button>
<section pgs="section flexColumn gapElements"></section>
```

The same tokens connect HTML, SCSS, and JavaScript.
