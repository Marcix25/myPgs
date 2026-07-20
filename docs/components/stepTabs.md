<!-- File generato automaticamente da templates/html/components/stepTabs.html. Modificare templates/html/components/stepTabs.html e rieseguire npm run docs:generate. -->

# Step Tabs

Procedura guidata a schede con avanzamento sequenziale, indicatori generati, controlli di navigazione e possibilità di bloccare uno step.

## PGS

- `stepTabs`: identifica il root della procedura guidata.
- `stepTabs-dots`: identifica il contenitore degli indicatori di avanzamento.
- `stepTabs-dots-dot`: identifica ogni indicatore creato dinamicamente.
- `stepTabs-container`: contiene nell'ordine tutte le schede della procedura.
- `tab`: identifica una singola scheda navigabile.
- `stepTabs-prev`: identifica il controllo per tornare allo step precedente.
- `stepTabs-restart`: identifica il controllo che riavvia la procedura dal primo step.
- `stepTabs-next`: identifica il controllo per avanzare allo step successivo.

## PGS Options

- `tabIcon`: su ogni tab usa tabIcon[classe] con una singola classe Font Awesome per l'indicatore corrispondente; il fallback è fa-circle.
- `step`: viene applicata a ogni indicatore generato con la sintassi step[indice] per conservarne l'indice zero-based.
- `buttonReverse`: inverte testo e icona sul pulsante successivo e appartiene al componente button.

## PGS States

- `is-active`: identifica la scheda corrente e il relativo indicatore.
- `is-completed`: identifica gli indicatori degli step già completati e nuovamente selezionabili.
- `is-locked`: applicato a un tab impedisce di avanzare finché lo step resta bloccato.

## API JavaScript

- `pgs.stepTabs.init(root)`: inizializza le procedure non ancora registrate dentro Document o Element indicato.
- `pgs.stepTabs.api(element)`: restituisce l'istanza associata a un root stepTabs inizializzato.
- `instance.restart()`: torna al primo tab e ripristina i blocchi dichiarati inizialmente.
- `instance.goTo(index, scroll)`: attiva il tab indicato, aggiorna controlli e indicatori e opzionalmente scorre al componente.
- `instance.next()`: attiva il tab successivo entro i limiti disponibili.
- `instance.prev()`: attiva il tab precedente entro i limiti disponibili.
- `instance.toggleLock(index, lock)`: aggiunge o rimuove is-locked dal tab indicato e aggiorna i controlli.
- `instance.refresh()`: riesegue l'inizializzazione nel contenitore della procedura e restituisce l'istanza.
- `instance.getCurrent()`: restituisce l'indice del tab corrente.
- `instance.getState()`: restituisce un oggetto con indice corrente e numero totale di tab.

## Elementi correlati

- `flexColumnElements`: organizza verticalmente le aree principali del componente.
- `flexColumnTexts`: organizza il contenuto testuale di ogni tab.
- `flexRow`: dispone sulla stessa riga i controlli di navigazione.
- `button`: applica lo stile standard ai controlli precedente, riavvio e successivo.

## Output

Procedura HTML a tre schede con indicatori e controlli di navigazione.

## Esempio

```html
<div pgs="stepTabs flexColumnElements">
    <div pgs="stepTabs-dots" aria-label="Avanzamento"></div>

    <div pgs="stepTabs-container">
        <section pgs="tab flexColumnTexts" tabindex="-1" pgs-option="tabIcon[fa-user]">
            <h3>Dati personali</h3>
            <p>Contenuto del primo tab.</p>
        </section>

        <section pgs="tab flexColumnTexts" tabindex="-1" pgs-option="tabIcon[fa-list-check]">
            <h3>Preferenze</h3>
            <p>Contenuto del secondo tab.</p>
        </section>

        <section pgs="tab flexColumnTexts" tabindex="-1" pgs-option="tabIcon[fa-check]">
            <h3>Conferma</h3>
            <p>Contenuto del terzo tab.</p>
        </section>
    </div>

    <div pgs="flexRow">
        <button pgs="stepTabs-prev button" type="button">
            <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
            Indietro
        </button>

        <button pgs="stepTabs-restart button" type="button">
            Ricomincia
        </button>

        <button pgs="stepTabs-next button" pgs-option="buttonReverse" type="button">
            Avanti
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
    </div>
</div>
```
