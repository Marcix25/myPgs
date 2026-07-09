# Helper JavaScript

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
