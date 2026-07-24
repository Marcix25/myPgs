# JavaScript helper

`pgs(root)` permette di cercare e modificare token PGS senza scrivere selettori manuali:

```js
const modal = pgs(document).querySelector("modal");

pgs(modal).contains("modal");
pgs(modal).add("custom-token");
pgs(modal).remove("custom-token");
pgs(modal).toggle("custom-token", true);
```

## API dell'helper `pgs`

Ricerca disponibile su `Document` ed `Element`:

- `pgs(root).querySelector(token)`: restituisce il primo discendente che contiene il token `pgs` richiesto.
- `pgs(root).querySelectorAll(token)`: restituisce tutti i discendenti corrispondenti; accetta anche un array o token separati da virgola.

Manipulation available when `root` è un `Element`:

- `pgs(element).add(...tokens)`: aggiunge token evitando duplicati e restituisce l'helper.
- `pgs(element).remove(...tokens)`: rimuove i token indicati e restituisce l'helper.
- `pgs(element).toggle(token, force)`: inverte o forza la presenza del token e restituisce lo stato risultante.
- `pgs(element).contains(token)`: verifica la presenza esatta del token.
- `pgs(element).value`: legge o sostituisce il valore completo dell'attributo `pgs`.

Stati runtime:

```js
pgs(modal).state.add("open");
pgs(modal).state.toggle("open", false);
pgs(modal).state.contains("open");
```

- `state.add(...states)` oppure `state(...states)`: aggiunge uno o più stati.
- `state.remove(...states)`: rimuove gli stati indicati.
- `state.toggle(state, force)`: inverte o forza uno stato e restituisce il risultato.
- `state.contains(state)`: verifica se lo stato è presente.
- `state.value`: legge o sostituisce l'intero attributo `pgs-state`.

Opzioni:

```js
pgs(modal).option.contains("history");
pgs(modal).option.getValueBrackets("containerID");
```

- `option.add(...options)`: aggiunge opzioni semplici o parametrizzate.
- `option.remove(...keys)`: rimuove le opzioni usando la relativa chiave.
- `option.toggle(option, force)`: inverte o forza un'opzione.
- `option.contains(key)`: verifica la presenza di una chiave anche quando possiede un payload.
- `option.getValueBrackets(key)`: restituisce il contenuto tra parentesi quadre oppure `undefined`.
- `option.setValueBrackets(key, value)`: imposta o sostituisce una singola opzione parametrizzata.
- `option.value`: legge o sostituisce l'intero attributo `pgs-option`.

Example markup with options:

```html
<div pgs="modal" pgs-option="containerID[modal-container]"></div>
<div pgs="slides" pgs-option="singleScroll shadowDesktop"></div>
```

## Automatically initialized JavaScript

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
- search con suggerimenti opzionali
- header
- cookie consent

I componenti inizializzati usano `WeakMap` interne per esporre API di istanza.

## API dei moduli

I moduli principali sono registrati in `assets/javascript/_imports.js` in due modi.

### Registro diretto

Serve per usare i moduli direttamente da `pgs`:

```js
pgs.registerModules({
  svg: PGS_svg,
  accordion: PGS_accordion,
  dropdown: PGS_dropdown,
  menu: PGS_menu,
  modal: PGS_modal,
  notification: PGS_notification,
  search: PGS_search,
  slides: PGS_slides,
  stepTabs: PGS_stepTabs,
  steps: PGS_steps,
  summary: PGS_summary,
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

Shortcuts available after `import "mypgs"`:

- `pgs.svg`
- `pgs.accordion`
- `pgs.dropdown`
- `pgs.menu`
- `pgs.modal`
- `pgs.notification`
- `pgs.search`
- `pgs.slides`
- `pgs.stepTabs`
- `pgs.steps`
- `pgs.summary`
- `pgs.formValidate`
- `pgs.scrollHorizontal`

## Component API reference

Le firme, i parametri e la funzione di ogni metodo sono generati dai commenti nei riferimenti HTML:

- [Accordion](components/accordion.md#api-javascript)
- [Dropdown](components/dropdown.md#api-javascript)
- [Form validation](components/form.md#api-javascript)
- [Menu](components/menu.md#api-javascript)
- [Modal](components/modal.md#api-javascript)
- [Notification](components/notification.md#api-javascript)
- [Search](components/search.md#api-javascript)
- [Slides](components/slides.md#api-javascript)
- [Step Tabs](components/stepTabs.md#api-javascript)
- [Steps](components/steps.md#api-javascript)
- [Summary](components/summary.md#api-javascript)
- [Tooltip tramite Dropdown](components/tooltip.md#api-javascript)

I componenti non elencati non espongono attualmente un'API JavaScript specifica.

## Utility JavaScript pubbliche

- `pgs.scrollHorizontal(element, speed)`: converte lo scroll verticale della rotella in scorrimento orizzontale quando il contenitore può ancora muoversi nella direzione richiesta e restituisce una funzione che rimuove il listener.
- `pgs.svg.applyColorsSVG(isDarkMode)`: aggiorna i colori degli SVG caricati tramite `object` e marcati con `svgChangeColor`.
- `pgs.svg.applyColorsLottie(isDarkMode)`: aggiorna i colori degli SVG interni ai player Lottie marcati con `lottieChangeColor`.
- `pgs.svg.eventChangeColor`: contiene il nome dell'evento `pgs:svg:changeColor` ascoltato dal modulo SVG.

## Component module structure

I componenti con istanze seguono questo schema:

```js
export const PGS_modal = {
  init: PGS_modal_init,
  api: PGS_modal_api
};
```

Le funzioni `PGS_modal_init` e `PGS_modal_api` restano interne al modulo: l'unico export del file è `PGS_modal`. Lo stesso criterio vale per gli altri componenti.

- `init`: inizializza o reinizializza il markup nel `Document` o `Element` ricevuto; senza argomenti usa `document`.
- `api`: recupera l'API di una singola istanza gia' inizializzata.

Esempio:

```js
pgs.modal.init();
pgs.modal.api(modalEl)?.open();
```

`PGS_notification` e' un caso diverso: funziona piu' come service/helper e espone `alert`, `toast` e `trigger`.

## Registro ed estensione

- `pgs.registerModules(modules)`: espone un oggetto di moduli direttamente come proprietà di `pgs` e impedisce sovrascritture incompatibili.
- `pgs.registerImport(...modules)`: registra moduli nel registro nominato usato dalle integrazioni avanzate.
- `pgs.import(...names)`: recupera dal registro i moduli richiesti e genera un errore per i nomi non registrati.
