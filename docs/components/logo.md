<!-- File generato automaticamente da templates/html/components/logo.html. Modificare templates/html/components/logo.html e rieseguire npm run docs:generate. -->

# Logo

Componente per mostrare un logo grafico o testuale, con supporto alle varianti dell'immagine legate al tema scuro.

## PGS

- `logo`: identifica il collegamento contenitore del marchio.
- `logo-image`: identifica l'immagine grafica del logo.
- `logo-text`: identifica la variante testuale del marchio.

## PGS Options

- `logoDarkmode`: inverte l'immagine del logo quando lo stato globale darkmode è attivo.
- `logoDarkmodeFixed`: mantiene applicata l'inversione dell'immagine indipendentemente dal tema corrente.

## PGS States

- `darkmode`: stato globale applicato al documento che attiva la variante logoDarkmode.

## Output

Esempi HTML del logo grafico sensibile al tema e del logo testuale.

## Esempio

```html
<a aria-label="Logo" pgs="logo" pgs-option="logoDarkmode" href="/">
    <img pgs="logo-image" src="https://placehold.co/240x80?text=MyPGS" alt="MyPGS">
</a>

<a aria-label="Logo testuale" pgs="logo" href="/">
    <span pgs="logo-text">MyPGS</span>
</a>
```
