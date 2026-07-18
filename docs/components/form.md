<!-- File generato automaticamente da templates/html/components/form.html. Modificare templates/html/components/form.html e rieseguire npm run docs:generate. -->

# Form

Struttura di modulo con etichette, campi testuali, textarea e controllo toggle compatibile con la validazione nativa e con PGS_formValidate.

## PGS

- `form`: identifica il contenitore del modulo e applica il layout dei campi.
- `label`: identifica le etichette associate ai controlli.
- `input`: applica lo stile condiviso agli input testuali.
- `textarea`: applica lo stile condiviso all'area di testo.
- `toggle`: presenta una checkbox come controllo a due stati.

## Elementi correlati

- `buttonStrong`: presenta l'invio del modulo come azione primaria.

## Output

Modulo HTML completo con campi required e messaggi utilizzabili dalla utility di validazione.

## Esempio

```html
<form pgs="form" action="#" method="post">
    <label pgs="label" for="form-name">
        Nome
    </label>
    <input id="form-name" pgs="input" type="text" name="name" placeholder="Mario Rossi" required data-form-field-message="Inserisci il nome">

    <label pgs="label" for="form-email">
        Email
    </label>
    <input id="form-email" pgs="input" type="email" name="email" placeholder="nome@example.com" required data-form-field-message="Inserisci una email valida">

    <label pgs="label" for="form-message">
        Messaggio
    </label>
    <textarea id="form-message" pgs="textarea" name="message" rows="5" placeholder="Scrivi il messaggio"></textarea>

    <label pgs="toggle">
        <span>Accetto la privacy policy</span>
        <input type="checkbox" name="privacy" required>
    </label>

    <button pgs="buttonStrong" type="submit">
        <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
        Invia
    </button>
</form>
```
