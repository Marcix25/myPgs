<!-- File generato automaticamente da templates/html/components/modal.html. Modificare templates/html/components/modal.html e rieseguire npm run docs:generate. -->

# Modal

Componente che collega un pulsante a un dialog nativo, ne gestisce apertura e chiusura e può spostarlo in un contenitore configurato.

## PGS

- `modal`: identifica il contenitore logico inizializzato dal modulo modal.
- `modal-button`: identifica il controllo di apertura della finestra.
- `dialog`: token aggiunto dinamicamente all'elemento dialog inizializzato.
- `modal-dialog`: identifica il dialog nativo dopo l'inizializzazione JavaScript.
- `modal-dialog-content`: identifica il contenitore visivo della finestra.
- `modal-dialog-content-header`: identifica l'intestazione che può ricevere il pulsante di chiusura automatico.
- `modal-dialog-content-scroll`: identifica l'area interna scorrevole.
- `modal-close`: identifica un controllo che chiude la finestra.

## PGS Options

- `containerID`: sul root usa containerID[id] per spostare il dialog nell'elemento con l'id indicato.
- `containerPGS`: sul root usa containerPGS[token] per spostare il dialog nel primo elemento con quel token pgs.
- `disableBackdropClose`: sul root impedisce la chiusura tramite click sul backdrop.
- `history`: sul root sincronizza l'apertura con il parametro modal nella cronologia del browser e richiede un id sul pulsante.
- `topLevel`: sul dialog mantiene la finestra nel componente e usa showModal per una modale top-level.
- `left`: sul dialog posiziona e anima il contenuto dal lato sinistro.
- `right`: sul dialog posiziona e anima il contenuto dal lato destro.

## Elementi correlati

- `button`: presenta i controlli di apertura, chiusura e annullamento come pulsanti standard.
- `buttonStrong`: presenta l'azione di conferma con maggiore enfasi.
- `buttonClose`: viene aggiunto automaticamente al controllo di chiusura quando manca nel markup.
- `flexColumnElements`: organizza verticalmente il contenuto della modale di conferma.
- `flexRow`: dispone affiancate le azioni della modale di conferma.

## Output

Quattro esempi basati su dialog nativo e un contenitore opzionale usato da containerID.

## Esempio

```html
<div pgs="modal" pgs-option="containerID[modal-container]">
    <button pgs="modal-button button" type="button">
        <i class="fa-solid fa-window-maximize"></i> Apri modale
    </button>

    <dialog>
        <div pgs="modal-dialog-content">
            <div pgs="modal-dialog-content-header">
                <h3>Modale di esempio</h3>
            </div>

            <div pgs="modal-dialog-content-scroll">
                <p>Contenuto della modale. Il bottone di chiusura viene aggiunto automaticamente se non presente.</p>
            </div>
        </div>
    </dialog>
</div>

<div pgs="modal" pgs-option="containerID[modal-container]">
    <button pgs="modal-button button" type="button">
        <i class="fa-solid fa-window-maximize"></i> Apri modale right
    </button>

    <dialog pgs-option="right">
        <div pgs="modal-dialog-content">
            <div pgs="modal-dialog-content-header">
                <h3>Modale laterale</h3>
            </div>

            <div pgs="modal-dialog-content-scroll">
                <p>Contenuto della modale con <code>pgs-option="right"</code>.</p>
            </div>
        </div>
    </dialog>
</div>

<div pgs="modal" pgs-option="containerID[modal-container]">
    <button pgs="modal-button button" type="button">
        <i class="fa-solid fa-window-maximize"></i> Apri modale left
    </button>

    <dialog pgs-option="left">
        <div pgs="modal-dialog-content">
            <div pgs="modal-dialog-content-header">
                <h3>Modale laterale sinistra</h3>
            </div>

            <div pgs="modal-dialog-content-scroll">
                <p>Contenuto della modale con <code>pgs-option="left"</code>.</p>
            </div>
        </div>
    </dialog>
</div>

<div pgs="modal">
    <button pgs="modal-button button" type="button">
        <i class="fa-solid fa-floppy-disk"></i> Conferma salvataggio
    </button>

    <dialog pgs-option="topLevel">
        <div pgs="modal-dialog-content">
            <div pgs="modal-dialog-content-header">
                <h3>Salvare le modifiche?</h3>
            </div>

            <div pgs="modal-dialog-content-scroll flexColumnElements">
                <p>Hai modifiche non salvate. Conferma per applicarle oppure annulla per tornare alla pagina.</p>

                <div pgs="flexRow">
                    <button pgs="button modal-close" type="button">Annulla</button>
                    <button pgs="buttonStrong" type="button">Salva modifiche</button>
                </div>
            </div>
        </div>
    </dialog>
</div>

<div id="modal-container"></div>
```
