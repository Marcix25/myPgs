# MyPGS

`mypgs` e' una libreria frontend condivisa per costruire interfacce coerenti tramite attributi `pgs`, SCSS sorgenti, componenti UI e comportamenti JavaScript riutilizzabili.

La libreria nasce come base di design system: layout, spacing, colori, bottoni, form, menu, modali, dropdown, slides, notifiche e pattern ricorrenti vengono definiti una volta sola e riusati nei progetti.

## Cosa contiene

- `assets/scss/`: SCSS sorgenti divisi in base, layout, componenti, pattern e mixin.
- `assets/javascript/`: helper `pgs`, componenti JS, funzioni e pattern.
- `templates/`: esempi HTML pronti per componenti e layout.
- `dist/css/`: CSS compilato.
- `dist/javascript/`: bundle JavaScript compilato.
- `dist/index.d.ts`: dichiarazioni TypeScript esportate dal pacchetto.
- `AI_GUIDELINES.md`: guida operativa per AI/Codex.
- `AI_GUIDELINES_EN.md`: versione inglese della guida.

## Installazione

Da registry npm:

```bash
npm install mypgs
```

## Uso rapido

Importa JavaScript e CSS compilato nell'entrypoint del progetto:

```js
import "mypgs";
import "mypgs/style.css";
```

Se ti serve accedere direttamente all'helper:

```js
import { pgs } from "mypgs";
import "mypgs/style.css";
```

Markup minimo consigliato:

```html
<html lang="it" pgs="htmlBase initP">
  <body pgs="bodyBase bodyImg bodyText bodyHeading">
    <main pgs="main"></main>
  </body>
</html>
```

`initP` e' importante: molti layout, componenti e pattern SCSS sono definiti sotto `[pgs~=initP]`.

## Uso SCSS sorgente

Se il progetto vuole compilare un CSS unico, importa gli SCSS sorgenti:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
@import "../../node_modules/mypgs/assets/scss/index.scss";
```

Se servono solo i mixin:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
```

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

### Helper JavaScript

`pgs(root)` permette di cercare e modificare token PGS senza scrivere selettori manuali:

```js
const modal = pgs(document).querySelector("modal");

pgs(modal).contains("modal");
pgs(modal).add("custom-token");
pgs(modal).remove("custom-token");
pgs(modal).toggle("custom-token", true);
```

Stati runtime:

```js
pgs(modal).state.add("open");
pgs(modal).state.toggle("open", false);
pgs(modal).state.contains("open");
```

Opzioni:

```js
pgs(modal).option.contains("history");
pgs(modal).option.getValueBrackets("containerID");
```

Esempio markup con opzioni:

```html
<div pgs="modal" pgs-option="containerID[modal-container]"></div>
<div pgs="slides" pgs-option="singleScroll shadowDesktop"></div>
```

## JavaScript inizializzato automaticamente

Importando `mypgs`, l'entrypoint inizializza:

- helper globale `pgs`
- dark mode
- gestione object SVG
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

I componenti inizializzati usano `WeakMap` interne per esporre API di istanza.

## API dei moduli

I moduli principali sono registrati in `assets/javascript/_imports.js` in due modi.

### Registro diretto

Serve per usare i moduli direttamente da `pgs`:

```js
pgs.registerModules({
  accordion: PGS_accordion,
  dropdown: PGS_dropdown,
  menu: PGS_menu,
  modal: PGS_modal,
  notification: PGS_notification,
  slides: PGS_slides,
  stepTabs: PGS_stepTabs,
  steps: PGS_steps,
  formValidate: PGS_formValidate,
  scrollHorizontal: PGS_scrollHorizontal,
});
```

Uso consigliato:

```js
pgs.notification.toast.success("Salvato");
pgs.modal.api(modalEl)?.open();
pgs.dropdown.api(dropdownEl)?.close();
pgs.slides.api(slidesEl)?.next();
```

Shortcut disponibili dopo `import "mypgs"`:

- `pgs.accordion`
- `pgs.dropdown`
- `pgs.menu`
- `pgs.modal`
- `pgs.notification`
- `pgs.slides`
- `pgs.stepTabs`
- `pgs.steps`
- `pgs.formValidate`
- `pgs.scrollHorizontal`

## Struttura dei moduli componente

I componenti con istanze seguono questo schema:

```js
export const PGS_modal = {
  init: PGS_modal_init,
  api: PGS_modal_api
};
```

- `PGS_name`: nome ufficiale del modulo per il registro legacy.
- `init`: inizializza o reinizializza markup, utile dopo contenuti dinamici.
- `api`: recupera l'API di una singola istanza gia' inizializzata.

Esempio:

```js
pgs.modal.init();
pgs.modal.init(container);
pgs.modal.api(modalEl)?.open();
```

`PGS_notification` e' un caso diverso: funziona piu' come service/helper e espone `alert`, `toast` e `trigger`.

## Componenti e markup

I template completi sono in `templates/components/` e `templates/layout/`. Usa quei file come sorgente di riferimento prima di creare markup nuovo.

### Layout

```html
<main pgs="main">
  <section pgs="section flexColumnElements">
    <div pgs="flexColumnTexts">
      <h2>Titolo</h2>
      <p>Contenuto.</p>
    </div>
  </section>
</main>
```

```html
<section pgs="sectionFull flexColumnElements">
  <div pgs="grid-3">
    <article pgs="card flexColumnTexts">
      <h3>Colonna uno</h3>
      <p>Contenuto.</p>
    </article>
  </div>
</section>
```

### Bottoni

```html
<button pgs="button" type="button">Base</button>
<button pgs="buttonStrong" type="button">Primario</button>
<button pgs="buttonIcon" type="button" aria-label="Impostazioni">
  <i class="fa-solid fa-gear" aria-hidden="true"></i>
</button>
```

### Accordion

```html
<div pgs="accordion">
  <button pgs="accordion-button" type="button">Domanda</button>
  <div pgs="accordion-content">Risposta</div>
</div>
```

### Dropdown

```html
<span pgs="dropdown">
  <button pgs="dropdown-button button" type="button">Apri menu</button>
  <div pgs="dropdown-content">
    <nav aria-label="Menu dropdown"></nav>
  </div>
</span>
```

### Modal

```html
<div pgs="modal" pgs-option="containerID[modal-container]">
  <button pgs="modal-button button" type="button">Apri modale</button>
  <dialog>
    <div pgs="modal-dialog-content">
      <div pgs="modal-dialog-content-header">
        <h3>Modale</h3>
      </div>
      <div pgs="modal-dialog-content-scroll">
        <p>Contenuto della modale.</p>
      </div>
    </div>
  </dialog>
</div>
<div id="modal-container"></div>
```

### Slides

```html
<div pgs="slides" pgs-option="singleScroll shadowDesktop">
  <ul pgs="slides-container">
    <li>
      <article pgs="card flexColumn">
        <img pgs="card-img imgCover" src="image.jpg" alt="">
        <div pgs="flexColumnTexts">
          <h3>Slide uno</h3>
        </div>
      </article>
    </li>
  </ul>
</div>
```

### Step tabs

```html
<div pgs="stepTabs flexColumnElements">
  <div pgs="stepTabs-dots" aria-label="Avanzamento"></div>
  <div pgs="stepTabs-container">
    <section pgs="tab flexColumnTexts" tabindex="-1" pgs-option="tabIcon[fa-user]"></section>
  </div>
  <div pgs="flexRow">
    <button pgs="stepTabs-prev button" type="button">Indietro</button>
    <button pgs="stepTabs-next button" pgs-option="buttonReverse" type="button">Avanti</button>
  </div>
</div>
```

### Form

```html
<form pgs="form" action="#" method="post">
  <label pgs="label" for="form-email">Email</label>
  <input id="form-email" pgs="input" type="email" name="email" required data-form-field-message="Inserisci una email valida">
  <button pgs="buttonStrong" type="submit">Invia</button>
</form>
```

Validazione programmatica:

```js
const form = document.querySelector("form");
const validator = new pgs.formValidate({ form });

if (validator.validate()) {
  pgs.notification.toast.success("Inviato con successo");
}
```

### Notifiche

```html
<div pgs="notification" aria-live="polite"></div>
<div pgs="toast" aria-live="polite"></div>
```

```js
pgs.notification.toast.success("Salvato");
pgs.notification.alert.error("Errore", null, 0);
```

Trigger da markup:

```html
<div pgs="hidden notificationTrigger" data-notification='{
  "title":"Titolo",
  "message":"Messaggio",
  "element":"notification",
  "type":"info",
  "duration":"-1"
}'></div>
```

### Menu

```html
<nav pgs="menuHorizontal" aria-label="Menu principale">
  <ul>
    <li class="menu-item"><a href="/">Home</a></li>
    <li class="menu-item menu-item-has-children">
      <a href="/servizi">Servizi</a>
      <ul class="sub-menu">
        <li class="menu-item"><a href="/servizi/uno">Servizio uno</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

## Componenti disponibili

Layout e utility:

- `main`
- `section`
- `sectionFull`
- `sectionMax`
- `sectionNoPadding`
- `container`
- `pageShell`
- `aside`
- `flexColumn`
- `flexColumnTexts`
- `flexColumnElements`
- `flexColumnSections`
- `flexRow`
- `grid-*`
- `gapTexts`
- `gapElements`
- `gapSections`
- `card`
- `boxtext`

Componenti:

- `button`
- `buttonStrong`
- `buttonIcon`
- `buttonMini`
- `buttonBig`
- `buttonClose`
- `form`
- `input`
- `textarea`
- `select`
- `toggle`
- `checkbox`
- `radio`
- `dropdown`
- `tooltip`
- `modal`
- `accordion`
- `slides`
- `steps`
- `stepTabs`
- `notification`
- `toast`
- `table`
- `breadcrumb`
- `searchbar`
- `logo`
- `menuHorizontal`
- `menuVertical`
- `menuFooter`

Pattern:

- `header`
- `footer`
- `cookieConsent`

## Export npm

Il pacchetto espone:

```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./assets/javascript/index.js",
    "default": "./dist/javascript/index.js"
  },
  "./style.css": "./dist/css/index.css",
  "./style.min.css": "./dist/css/index.min.css"
}
```

Uso compilato:

```js
import "mypgs";
import "mypgs/style.css";
```

Uso sorgente SCSS:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
@import "../../node_modules/mypgs/assets/scss/index.scss";
```

## Sviluppo

Build una tantum:

```bash
npm run start
```

Build in watch mode:

```bash
npm run "start watch"
```

Creare un pacchetto locale:

```bash
npm pack
```

Flusso consigliato quando modifichi la libreria:

1. modifica i sorgenti in `assets/`;
2. aggiorna template o documentazione se cambia il modo d'uso;
3. ricompila con `npm run start`;
4. verifica `dist/`;
5. crea il pacchetto con `npm pack`;
6. installa il `.tgz` nel progetto che consuma la libreria.

Nota: se la build Webpack fallisce, non modificare manualmente `dist/javascript` come sorgente primaria. Sistema la toolchain e rigenera gli asset compilati.

## Aggiungere un nuovo modulo

Esempio componente:

```js
export function PGS_myComponent_init(root = document) {
  pgs(root).querySelectorAll("myComponent").forEach((element) => {
    // init
  });
}

export function PGS_myComponent_api(element) {
  // return instance API
}

export const PGS_myComponent = {
  PGS_name: "PGS_myComponent",
  init: PGS_myComponent_init,
  api: PGS_myComponent_api
};
```

Registrazione in `assets/javascript/_imports.js`:

```js
import { PGS_myComponent } from "./components/_myComponent.js";

pgs.registerImport({
  PGS_myComponent,
});

pgs.registerModules({
  myComponent: PGS_myComponent,
});
```

Uso:

```js
pgs.myComponent.init();
pgs.myComponent.api(element);
```

## Convenzioni

- Usa `pgs` come prima scelta per markup, layout, componenti e comportamenti.
- Mantieni coerenti i token tra template, SCSS e JS.
- Usa `pgs-state` per stati runtime.
- Usa `pgs-option` per opzioni dichiarative.
- Preferisci custom properties e mixin a CSS hardcoded.
- Non duplicare componenti gia' presenti nella libreria.
- Non inventare API: verifica i sorgenti in `assets/javascript/`.
- Mantieni in `mypgs` solo stili e comportamenti riutilizzabili.
- Mantieni nel progetto finale le personalizzazioni specifiche del progetto.
- Aggiorna `AI_GUIDELINES.md` quando introduci pattern importanti.
