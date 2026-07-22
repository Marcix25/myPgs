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

## The `pgs` system

Markup uses space-separated tokens inside the `pgs` attribute:

```html
<button pgs="button buttonStrong" type="button">Save</button>
<section pgs="section flexColumnElements"></section>
```

The same tokens connect HTML, SCSS, and JavaScript.
