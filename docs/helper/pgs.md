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

`pgs.init(root)` inizializza i moduli registrati nell'ordine in cui compaiono in `registerModules(...)`: se un modulo usa l'API di un altro durante il proprio `init` (es. `cookieConsent` che chiama `pgs.modal.api(...)`), quello richiesto va elencato prima.

### Registro diretto

Serve per usare i moduli direttamente da `pgs`:

```js
pgs.registerModules({
  init: PGS_init,
  darkmode: PGS_darkmode,
  svg: PGS_svg,
  accordion: PGS_accordion,
  dropdown: PGS_dropdown,
  menu: PGS_menu,
  modal: PGS_modal,
  cookieConsent: PGS_cookieConsent,
  notification: PGS_notification,
  toast: PGS_toast,
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
pgs.toast.success({ title: "Salvato" });
pgs.modal.api(modalEl)?.open();
pgs.dropdown.api(dropdownEl)?.close();
pgs.slides.api(slidesEl)?.next();
```

Shortcuts available after `import "mypgs"`:

- `pgs.init`
- `pgs.cookieConsent`
- `pgs.darkmode`
- `pgs.svg`
- `pgs.accordion`
- `pgs.dropdown`
- `pgs.menu`
- `pgs.modal`
- `pgs.notification`
- `pgs.toast`
- `pgs.search`
- `pgs.slides`
- `pgs.stepTabs`
- `pgs.steps`
- `pgs.summary`
- `pgs.formValidate`
- `pgs.scrollHorizontal`

## Component API reference

Le firme, i parametri e la funzione di ogni metodo sono generati dai commenti nei riferimenti HTML:

- [Accordion](../components/accordion.md#api-javascript)
- [Dropdown](../components/dropdown.md#api-javascript)
- [Form validation](../components/form.md#api-javascript)
- [Menu](../components/menu.md#api-javascript)
- [Modal](../components/modal.md#api-javascript)
- [Notification](../components/notification.md#api-javascript)
- [Toast](../components/toast.md#api-javascript)
- [Search](../components/search.md#api-javascript)
- [Slides](../components/slides.md#api-javascript)
- [Step Tabs](../components/stepTabs.md#api-javascript)
- [Steps](../components/steps.md#api-javascript)
- [Summary](../components/summary.md#api-javascript)
- [Tooltip tramite Dropdown](../components/tooltip.md#api-javascript)

I componenti non elencati non espongono attualmente un'API JavaScript specifica.

## Utility JavaScript pubbliche

- `pgs.init(root)`: rileva automaticamente i moduli registrati che espongono `init(root)` e inizializza il markup aggiunto dinamicamente.
- `pgs.cookieConsent.init(root)`: inizializza il pattern cookie consent presente nel `Document` o `Element` indicato senza duplicare i listener.
- `pgs.darkmode.init(root)`: inizializza i controlli `toggleDarkmode` presenti nel `Document` o `Element` indicato senza duplicare i listener già applicati.
- `pgs.scrollHorizontal(element, speed)`: converte lo scroll verticale della rotella in scorrimento orizzontale quando il contenitore può ancora muoversi nella direzione richiesta e restituisce una funzione che rimuove il listener.
- `pgs.svg.init()`: aggiorna insieme i colori degli SVG e dei player Lottie presenti nella pagina.
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

`PGS_notification` e `PGS_toast` sono un caso diverso: funzionano più come service/helper che come istanze, non hanno `api(element)`, e vanno usati tramite `pgs.notification.*`/`pgs.toast.*` (vedi sotto). La forma pre-split `pgs.notification.alert.*`/`pgs.notification.toast.*` resta ancora disponibile ma solo per retrocompatibilità: nel codice nuovo usa direttamente `pgs.notification.*` per il pannello persistente e `pgs.toast.*` per il messaggio effimero.

### Notification e Toast

`pgs.notification` è un pannello persistente di messaggi, apribile/chiudibile con `notificationBell`, con dismissione solo manuale. `pgs.toast` è un messaggio effimero mostrato uno alla volta, con auto-dismissione dopo `timeout`. Sono due moduli indipendenti: vedi [Notification](../components/notification.md) e [Toast](../components/toast.md) per il markup dichiarativo completo.

Il pannello di `pgs.notification` vive dentro una `<dialog>` gestita da `pgs.modal`. Basta autorare il wrapper con la campanella, senza dialog dentro:

```html
<div pgs="modal">
    <button pgs="modal-button button notificationBell" pgs-option="buttonIcon" aria-label="Apri notifiche">
        <i class="fa-duotone fa-solid fa-bell"></i>
        <span pgs="notificationBell-counter"></span>
    </button>
</div>
```

Alla prima notifica, `pgs.notification` genera da solo `<dialog pgs-option="right"><div pgs="modal-dialog-content"><div pgs="notifications"></div></div></dialog>` dentro quel wrapper e richiama `pgs.modal.init()` per attivarlo — apertura/chiusura/il chiudersi quando apri un altro dialog sulla pagina sono gestiti interamente da `pgs.modal`, non da `pgs.notification`. `pgs.toast` non usa nessun dialog/modal: resta un div fisso indipendente come prima.

```js
pgs.notification.success({
    title: "Salvato",
    description: "Le modifiche sono state salvate.",
    buttons: [
        { title: "Vai al profilo", link: "/profilo" },
        { id: "yes", title: "Si" },
        { id: "no", title: "No" },
        { id: "close", title: "Chiudi", close: true }
    ]
});

pgs.toast.success({ title: "Salvato" });
```

Ogni voce di `buttons` (solo su `pgs.notification`, `pgs.toast` non lo supporta) accetta:

- `id` (opzionale): usato nell'evento `buttonClick`; se assente viene generato automaticamente.
- `title` (obbligatorio): testo del bottone.
- `link` (opzionale): se presente il bottone è un `<a href>` che naviga normalmente; se assente è un `<button>` senza navigazione.
- `close` (opzionale, default `true`): se non impostato a `false`, il click chiude anche la notifica. Il bottone di chiusura predefinito (`closeTitle`) resta sempre presente indipendentemente da `buttons`.
- `optionButton` (opzionale): stringa applicata come `pgs-option` sul bottone generato, per riusare stili/comportamenti esistenti (es. `"optionButton": "buttonIcon"`).

Eventi disponibili (bubbling, delegabili anche su `document`):

```js
document.addEventListener("pgs:notification:buttonClick", (event) => {
    const { id, buttonId, link } = event.detail;
    if (buttonId === "yes" || buttonId === "no") {
        // invia la risposta al server...
    }
    // event.preventDefault() blocca la navigazione del link (se presente)
    // finché non hai finito il tuo codice asincrono.
});

document.addEventListener("pgs:notification:close", (event) => { /* event.detail.id */ });
document.addEventListener("pgs:notification:deleteAll", (event) => { /* event.detail.ids */ });
```

Passa un `id` tuo in `options.id` per correlare la notifica con la tua logica, altrimenti ne viene generato uno automaticamente. `pgs.notification.deleteAll()` rimuove tutte le notifiche del pannello e dispara `pgs:notification:deleteAll`.

## Registro ed estensione

- `pgs.registerModules(modules)`: espone un oggetto di moduli direttamente come proprietà di `pgs` e impedisce sovrascritture incompatibili.
- `pgs.registerImport(...modules)`: registra moduli nel registro nominato usato dalle integrazioni avanzate.
- `pgs.import(...names)`: recupera dal registro i moduli richiesti e genera un errore per i nomi non registrati.
