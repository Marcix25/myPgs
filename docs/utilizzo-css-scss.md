# Utilizzo CSS/SCSS

La libreria espone molte custom properties da preferire agli hardcode, per esempio:

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

Override consigliato:

```scss
#danger-action {
  --button-background: var(--color-error);
  --button-color: var(--color-whiteFixed);
}
```

Evita di riscrivere da zero padding, gap, border-radius o colori se esiste gia' una variabile o un token PGS adatto.

## Il sistema `pgs`

Il markup usa token separati da spazio dentro l'attributo `pgs`:

```html
<button pgs="button buttonStrong" type="button">Salva</button>
<section pgs="section flexColumnElements"></section>
```

Gli stessi token collegano HTML, SCSS e JavaScript.
