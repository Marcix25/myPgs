# MyPGS

Libreria frontend condivisa per componenti, layout e pattern basati sull'attributo `pgs`.

Contiene sorgenti SCSS, mixin, comportamenti JavaScript, template HTML di esempio e asset compilati pronti all'uso. Puo' essere usata sia importando direttamente CSS e JavaScript compilati, sia importando gli SCSS sorgenti dentro il build del progetto che la utilizza.

## Installazione come dipendenza

Da registry npm, se pubblicata:

```bash
npm install mypgs
```

## Utilizzo

### JavaScript

Importa la libreria nell'entrypoint JavaScript del progetto:

```js
import * as mypgs from "mypgs";
```

L'entrypoint di MyPGS inizializza:

- helper globale `pgs`
- dark mode
- gestione oggetti PGS
- accordion
- dropdown
- menu
- modali
- slides
- steps
- step tabs
- notifiche
- header
- cookie consent

Il bundle finale viene generato dal progetto che importa `mypgs`, in base alla propria configurazione Webpack o al proprio bundler.

### SCSS

Per integrare MyPGS nel build SCSS del progetto, importa mixin e stili sorgenti da `node_modules`:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
@import "../../node_modules/mypgs/assets/scss/index.scss";
```

Se servono solo i mixin, importa solo il file dedicato:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
```

Molti layout, componenti e pattern sono inclusi sotto `[pgs~=initP]`, quindi il markup principale deve abilitare la libreria così:

```html
<html pgs="htmlBase initP">
<body pgs="bodyBase bodyImg bodyText bodyHeading">
```

## Markup PGS

I componenti vengono attivati usando token nell'attributo `pgs`, per esempio:

```html
<nav pgs="menuHorizontal"></nav>
<button pgs="button modal-button"></button>
<div pgs="accordion">
  <button pgs="accordion-button"></button>
  <div pgs="accordion-content"></div>
</div>
```

Gli stessi token devono restare coerenti tra markup, SCSS e JavaScript.

## Contenuto del pacchetto

- `assets/scss/`: sorgenti SCSS, mixin, base, layout, componenti e pattern
- `assets/javascript/`: sorgenti JavaScript dei comportamenti PGS
- `templates/`: esempi HTML dei componenti e dei layout
- `dist/javascript/index.js`: bundle JavaScript non minificato
- `dist/javascript/index.min.js`: bundle JavaScript minificato
- `dist/css/index.css`: CSS compilato non minificato
- `dist/css/index.min.css`: CSS compilato minificato
- `dist/index.d.ts`: dichiarazioni TypeScript esportate dal pacchetto

## Export npm

Il pacchetto espone:

```json
{
  ".": "./dist/javascript/index.js",
  "./style.css": "./dist/css/index.css",
  "./style.min.css": "./dist/css/index.min.css"
}
```

Uso diretto degli asset compilati:

```js
import "mypgs";
import "mypgs/style.css";
```

In alternativa, puoi importare gli SCSS sorgenti direttamente nel build del progetto quando vuoi ottenere un unico CSS finale.

## Sviluppo

Build una tantum:

```bash
npm run start
```

Build in watch mode:

```bash
npm run "start watch"
```

Per preparare un archivio locale installabile in un altro progetto:

```bash
npm pack
```

Quando modifichi MyPGS e vuoi provarlo in un progetto che la usa:

1. ricompila MyPGS con `npm run start`
2. crea un nuovo archivio con `npm pack`
3. copia o aggiorna il `.tgz` usato dal progetto
4. esegui `npm install` nel progetto
5. ricompila il progetto

## Convenzioni

- Usa l'attributo `pgs` per collegare markup, CSS e JavaScript.
- Mantieni i token PGS coerenti tra template HTML, componenti, moduli e script.
- Metti in MyPGS solo stili e comportamenti riutilizzabili.
- Mantieni nel progetto finale gli stili e le personalizzazioni specifiche.
- Esporta in `dist/` prima di creare il pacchetto locale `.tgz`.
