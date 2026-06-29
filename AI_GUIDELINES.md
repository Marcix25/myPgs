# AI Guidelines per `mypgs`

Questa guida serve a qualsiasi AI/Codex che inizializza o modifica un progetto basato sulla libreria NPM `mypgs`. Prima di scrivere CSS, JavaScript o markup custom, controlla sempre se `mypgs` offre gia' token `pgs`, componenti, layout, mixin, variabili o API adatte.

## 1. Panoramica della libreria

`mypgs` e' una libreria frontend condivisa per costruire interfacce coerenti tramite:

- attributi HTML `pgs` come contratto tra markup, SCSS e JavaScript;
- SCSS sorgenti con base, layout, componenti, pattern, variabili CSS e mixin;
- moduli JavaScript per comportamenti ricorrenti come accordion, dropdown, menu, modali, slides, steps, step tabs, notifiche, header, cookie consent e dark mode;
- template HTML di esempio in `templates/`;
- asset compilati in `dist/`.

Risolve il problema di riscrivere ogni volta layout, bottoni, form, modali, menu, tabs, spacing, stati e interazioni base. Va usata come base del design system perche' centralizza naming, spaziature, colori, radius, ombre, comportamenti accessibili e pattern riutilizzabili.

Preferisci `mypgs` rispetto a CSS/JS custom quando:

- devi creare layout standard, sezioni, container, griglie, flex o page shell;
- ti servono componenti gia' presenti nella libreria;
- devi aggiungere stati, opzioni o comportamenti gia' gestiti dagli attributi `pgs`, `pgs-state`, `pgs-option`;
- la richiesta riguarda coerenza visiva, velocita' di sviluppo o riuso.

Scrivi codice custom solo quando il pattern non esiste, oppure quando stai aggiungendo una nuova funzionalita' riutilizzabile alla libreria.

## 2. Regole generali di utilizzo

- Usa `mypgs` come prima scelta per layout, componenti, helper, variabili, utility e pattern disponibili.
- Non ricreare da zero componenti gia' presenti: bottoni, form, dropdown, modal, menu, slides, accordion, steps, stepTabs, notification, tooltip, table, searchbar, logo, header, footer, cookie consent.
- Non duplicare logiche gia' gestite dai moduli JS di `mypgs`, come apertura/chiusura modal, stato accordion, dropdown con Popover API, step tabs, notifiche o validazione form.
- Mantieni coerenza tra token `pgs` nel markup, selettori SCSS e query JS.
- Preferisci composizione di token `pgs` a nuove classi CSS.
- Le classi sono accettabili per integrazioni esterne o dettagli locali, ma non devono sostituire token PGS esistenti.
- Mantieni markup semantico e accessibile: la libreria aggiunge molti attributi ARIA, ma la struttura base deve restare corretta.

## 3. Analisi dei file esistenti

File analizzati:

- `README.md`
- `package.json`
- `webpack.config.js`
- `assets/javascript/_pgs.js`
- `assets/javascript/index.js`
- `assets/javascript/_imports.js`
- `assets/javascript/pgs.d.ts`
- `dist/index.d.ts`
- `assets/javascript/base/_darkmode.js`
- `assets/javascript/base/_object.js`
- `assets/javascript/components/_accordion.js`
- `assets/javascript/components/_dropdown.js`
- `assets/javascript/components/_menu.js`
- `assets/javascript/components/_modals.js`
- `assets/javascript/components/_slides.js`
- `assets/javascript/components/_steps.js`
- `assets/javascript/components/_stepTabs.js`
- `assets/javascript/components/_notifications.js`
- `assets/javascript/functions/_formValidate.js`
- `assets/javascript/functions/_scrollY.js`
- `assets/javascript/patterns/_header.js`
- `assets/javascript/patterns/_cookieConsent.js`
- `assets/scss/index.scss`
- `assets/scss/base/*`
- `assets/scss/layout/*`
- `assets/scss/components/*`
- `assets/scss/patterns/*`
- `assets/scss/mixin/*`
- `templates/demo.html`
- `templates/demo.js`
- `templates/demo.css`
- `templates/components/*`
- `templates/layout/*`

Pattern trovati:

- `pgs` e' l'attributo principale: i token sono separati da spazi, per esempio `pgs="button modal-button"`.
- `assets/scss/index.scss` importa base, layout, componenti e pattern; layout/componenti/pattern sono quasi tutti sotto `[pgs~=initP]`.
- Il markup principale deve abilitare la libreria con `htmlBase initP` e il body con token base:

```html
<html lang="it" pgs="htmlBase initP">
<body pgs="bodyBase bodyImg bodyText bodyHeading">
```

- I componenti usano un token radice e token figli con prefisso coerente:

```html
<div pgs="accordion">
  <button pgs="accordion-button" type="button">Titolo</button>
  <div pgs="accordion-content">Contenuto</div>
</div>
```

- Gli stati runtime usano `pgs-state`, per esempio `open`, `is-active`, `is-completed`, `is-locked`, `success`, `error`, `warning`, `info`.
- Le opzioni configurabili usano `pgs-option`, con token semplici o valori tra parentesi quadre:

```html
<div pgs="slides" pgs-option="singleScroll shadowDesktop"></div>
<div pgs="modal" pgs-option="containerID[modal-container]"></div>
<section pgs="tab" pgs-option="tabIcon[fa-user]"></section>
```

- Il naming e' prevalentemente camelCase nei token composti (`menuHorizontal`, `buttonStrong`, `flexColumnElements`) e kebab-like per sotto-elementi collegati al componente (`accordion-button`, `modal-dialog-content`, `cookieConsent-actionAccept`).
- I moduli JS esportano oggetti con `PGS_name`, `init` e/o `api`; `_imports.js` li registra con `pgs.registerImport` per l'import legacy e con `pgs.registerModules` per l'accesso diretto `pgs.*`.

## 4. Linee guida SCSS

Import consigliati in un progetto che consuma la libreria:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
@import "../../node_modules/mypgs/assets/scss/index.scss";
```

Se servono solo i mixin:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
```

Uso diretto del CSS compilato:

```js
import "mypgs/style.css";
```

Regole SCSS:

- Usa le custom properties gia' definite, per esempio `--color-primary`, `--color-box`, `--color-text`, `--padding`, `--padding-page`, `--gap-texts`, `--gap-elements`, `--gap-sections`, `--border-radius`, `--border-radius-input`, `--border-complete`, `--box-shadow`, `--focus-visible`.
- Usa mixin e token esistenti invece di riscrivere layout: `flexColumn`, `flexRow`, `grid-*`, `section`, `container`, `card`, `button`, `form`.
- Preferisci override tramite custom properties sul componente:

```scss
#dropdownMenuPrimary { //[pgs~="dropdown"]
  --dropdown-background: var(--color-box);
  --dropdown-padding: var(--padding-2);
  --dropdown-maxwidth: min(420px, 90vw);
}
```

- Evita override aggressivi di `padding`, `gap`, `display`, `position` e `overflow` se sono gia' gestiti dal design system.
- Puoi personalizzare colori, border-radius, bordi, ombre e dettagli visuali mantenendo coerenza con i token.
- Se servono nuovi stili riutilizzabili, aggiungili in modo modulare nel gruppo corretto: `base`, `layout`, `components`, `patterns` o `mixin`.
- Se aggiungi un nuovo componente PGS, mantieni lo stesso contratto: token radice, token figli, eventuali stati in `pgs-state`, eventuali opzioni in `pgs-option`.

Consigliato:

```scss
#products .pricing-card {
    --card-background: var(--color-box);
    --button-background: var(--color-primary);
  }
```

Oppure ma meno cosnigliato:

```scss
[pgs~="card"].pricing-card {
  --card-background: var(--color-box);
  --button-background: var(--color-primary);
}
```

Da evitare:

```scss
.pricing-card {
  padding: 37px;
  border-radius: 19px;
  background: #f8f8f8;
}
```

## 5. Linee guida JS/TS

Import base:

```js
import "mypgs";
```

Oppure, se serve accedere all'helper:

```js
import { pgs } from "mypgs";
```

L'entrypoint inizializza automaticamente helper globale `pgs`, dark mode, object SVG handling, accordion, dropdown, menu, modali, slides, steps, stepTabs, notifiche, header e cookie consent.

Helper `pgs` disponibile:

```js
const modal = pgs(document).querySelector("modal");
pgs(modal).add("custom-token");
pgs(modal).remove("custom-token");
pgs(modal).toggle("custom-token", true);
pgs(modal).contains("modal");
pgs(modal).state.add("open");
pgs(modal).state.toggle("open", false);
pgs(modal).option.contains("history");
pgs(modal).option.getValueBrackets("containerID");
```

Registro moduli legacy:

```js
const { PGS_modal, PGS_notification } = pgs.import("modal", "notification");
```

Accesso diretto consigliato:

```js
pgs.notification.toast.success("Salvato");
pgs.modal.api(modalEl)?.open();
```

In `assets/javascript/_imports.js` ci sono due registri:

```js
pgs.registerImport({
    PGS_notification,
});

pgs.registerModules({
    notification: PGS_notification,
});
```

- `pgs.registerImport` mantiene compatibile `pgs.import("PGS_notification")` e `pgs.import("notification")`.
- `pgs.registerModules` espone il modulo direttamente su `pgs`, per esempio `pgs.notification`.

Prima di usare un modulo, verifica che sia registrato in `assets/javascript/_imports.js`. I moduli registrati nel codice analizzato sono:

- `PGS_accordion`
- `PGS_dropdown`
- `PGS_menu`
- `PGS_modal`
- `PGS_notification`
- `PGS_slides`
- `PGS_stepTabs`
- `PGS_steps`
- `PGS_formValidate`
- `PGS_scrollHorizontal`

Shortcut dirette disponibili se `mypgs` e' stato caricato:

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

Regole JS/TS:

- Preferisci le API e gli init esistenti prima di scrivere nuove funzioni.
- Non duplicare helper gia' presenti (`pgs`, `PGS_scrollHorizontal`, `PGS_formValidate`, notifiche).
- Le inizializzazioni devono accettare un root quando possibile, come `PGS_accordion_init(root = document)`.
- Usa `WeakMap` per API di istanze se aggiungi componenti, come fanno accordion, dropdown, menu, modali, slides, steps e stepTabs.
- Mantieni eventi e stati coerenti: gli stati visuali vanno in `pgs-state`, non in classi arbitrarie.
- Non affidarti a classi `.open` per componenti PGS se il componente usa `pgs-state~="open"`.

Esempio API esistente:

```js
const modalEl = pgs(document).querySelector("modal");

pgs.modal.api(modalEl)?.open();
```

## 6. Componenti e markup

Usa i template in `templates/components/` e `templates/layout/` come riferimento prima di creare markup nuovo.

Layout consigliati:

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

Griglie e card:

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

Bottoni:

```html
<button pgs="button" type="button" pgs-option="buttonReverse">
  Avanti
  <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
</button>

<button pgs="buttonIcon" type="button" aria-label="Impostazioni">
  <i class="fa-solid fa-gear" aria-hidden="true"></i>
</button>
```

Form:

```html
<form pgs="form" action="#" method="post">
  <label pgs="label" for="form-email">Email</label>
  <input id="form-email" pgs="input" type="email" name="email" required data-form-field-message="Inserisci una email valida">
  <button pgs="buttonStrong" type="submit">Invia</button>
</form>
```

Dropdown:

```html
<span pgs="dropdown">
  <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
    Apri menu
    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
  </button>
  <div pgs="dropdown-content">
    <nav aria-label="Menu dropdown"></nav>
  </div>
</span>
```

Modal:

```html
<div pgs="modal" pgs-option="containerID[modal-container]">
  <button pgs="modal-button button" type="button">Apri modale</button>
  <dialog>
    <div pgs="modal-dialog-content">
      <div pgs="modal-dialog-content-header">
        <h3>Modale di esempio</h3>
      </div>
      <div pgs="modal-dialog-content-scroll">
        <p>Contenuto della modale.</p>
      </div>
    </div>
  </dialog>
</div>
<div id="modal-container"></div>
```

Slides:

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

Step tabs:

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

Notifiche:

```html
<div pgs="notification" aria-live="polite"></div>
<div pgs="toast" aria-live="polite"></div>

<div pgs="hidden notificationTrigger" data-notification='{
  "title":"Titolo",
  "message":"Messaggio",
  "element":"notification",
  "type":"info",
  "duration":"-1"
}'></div>
```

Menu:

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

Per estendere un componente:

- conserva token radice e figli obbligatori;
- aggiungi un token `pgs` specifico o una classe locale solo per la variante;
- configura tramite custom properties o `pgs-option`;
- non rimuovere elementi che il JS cerca con `pgs(...).querySelector(...)`.

## 7. Cosa NON fare

- Non sostituire `mypgs` con soluzioni custom senza un motivo tecnico chiaro.
- Non hardcodare colori se esistono variabili o custom properties, usa semre var(--color-primary) ecc...
- Non creare componenti duplicati per bottoni, form, modali, dropdown, slides, tabs, notifiche o menu.
- Non duplicare logiche di apertura, chiusura, stato o accessibilita' gia' gestite dai moduli.
- Non rendere il codice piu' complesso del necessario.
- Non inventare API: se un metodo non e' presente in `assets/javascript/*` o nelle `.d.ts`, va verificato o aggiunto esplicitamente.

## 8. Esempi pratici

Import consigliato in un progetto:

```js
import "mypgs";
import "mypgs/style.css";
```

Import SCSS sorgente:

```scss
@import "../../node_modules/mypgs/assets/scss/mixin/mixin.scss";
@import "../../node_modules/mypgs/assets/scss/index.scss";
```

Consigliato: usare token layout PGS.

```html
<section pgs="section flexColumnElements">
  <div pgs="flexColumnTexts">
    <h2>Dashboard</h2>
    <p>Contenuto principale.</p>
  </div>
</section>
```

Da evitare: layout custom equivalente.

```html
<section class="my-section">
  <div class="my-container">
    <h2>Dashboard</h2>
  </div>
</section>
```

Consigliato: personalizzare un bottone con variabili.

```scss
#danger-action {
  --button-background: var(--color-error);
  --button-color: var(--color-whiteFixed);
}
```

Da evitare: riscrivere tutto il bottone.

```scss
.danger-action {
  display: inline-flex;
  gap: 12px;
  padding: 14px 22px;
  border-radius: 999px;
  background: #ff6161;
}
```

Consigliato: stato PGS.

```js
const accordion = pgs(document).querySelector("accordion");
pgs(accordion).state.toggle("open", true);
```

Da evitare: classe parallela non letta dalla libreria.

```js
accordion.classList.add("open");
```

Consigliato: usare API notifiche registrata su `pgs`.

```js
pgs.notification.toast.success("Salvato");
```

Da evitare: creare un sistema toast separato.

```js
document.body.insertAdjacentHTML("beforeend", "<div class='toast-ok'>Salvato</div>");
```

## 9. Regole per nuove feature

Prima di sviluppare una nuova feature:

- controlla `README.md`, `templates/`, `assets/scss/` e `assets/javascript/`;
- cerca token o API esistenti con `rg "nomeFeature|pgs-token"`;
- verifica se `mypgs` offre gia' componenti, helper, mixin o variabili adatti;
- usa naming coerente con i pattern esistenti;
- separa struttura HTML, stile SCSS e logica JS;
- scrivi codice semplice, modulare e mantenibile;
- aggiorna questa guida se introduci un pattern importante.

Per un nuovo componente riutilizzabile:

- crea SCSS in `assets/scss/components/` o `assets/scss/patterns/`;
- importa il file da `assets/scss/index.scss` nel blocco corretto;
- crea JS in `assets/javascript/components/` o `assets/javascript/patterns/` solo se serve comportamento;
- esporta un oggetto con `PGS_name` se il modulo deve essere recuperabile via registro;
- registralo in `assets/javascript/_imports.js` con `pgs.registerImport` se deve restare importabile con `pgs.import`;
- registralo anche con `pgs.registerModules` se deve essere disponibile come `pgs.nomeModulo`;
- aggiungi un template in `templates/components/` o `templates/layout/`;
- aggiorna `README.md` e questa guida se cambia il modo d'uso.

Esempio per un nuovo modulo:

```js
import { PGS_myNewComponent } from "./components/_myNewComponent.js";

pgs.registerImport({
    PGS_myNewComponent,
});

pgs.registerModules({
    myNewComponent: PGS_myNewComponent,
});
```

## 10. Checklist rapida per AI

- Ho controllato se esiste gia' un token `pgs` o un componente adatto?
- Ho consultato `templates/` per copiare il markup corretto?
- Ho abilitato `htmlBase initP` e i token base del body quando serve tutta la libreria?
- Sto usando variabili CSS e mixin PGS invece di valori hardcoded?
- Sto usando `pgs-state` per stati runtime e `pgs-option` per configurazioni?
- Sto evitando classi custom quando un token PGS e' sufficiente?
- Ho verificato le API JS nel sorgente o nelle dichiarazioni TypeScript?
- Ho mantenuto separati markup, stile e logica?
- Ho evitato modifiche dirette a `dist/` come sorgente primaria?
- Se ho introdotto un nuovo pattern, ho aggiornato questa guida?
