# Form validation helper

`pgs.formValidate` valida i campi obbligatori, applica gli stati `errorForm`, `errorField` e `success`, mostra alert o toast e permette di aggiungere regole personalizzate.

## Inizializzazione

```js
const form = pgs(document).querySelector("form");

const formValidate = new pgs.formValidate(form, {
    typeNotice: "alert",
    showSuccessOnValidate: true,
    alertContainer: undefined,
    message: {
        fieldErrorTitle: "Controlla il modulo",
        fieldError: "Completa questo campo",
        fieldsError: "Completa tutti i campi obbligatori",
        successTitle: "Inviato",
        success: "Modulo inviato correttamente"
    }
});
```

Il costruttore aggiunge `formValidate` al token `pgs`, imposta `novalidate` e completa le opzioni dei messaggi mancanti sul form.

## Configurazione dei messaggi

Il form è la sorgente effettiva dei messaggi:

```html
<form
    pgs="form"
    pgs-option="
        fieldErrorTitle[Controlla il modulo]
        fieldError[Completa questo campo]
        fieldsError[Completa tutti i campi obbligatori]
        successTitle[Inviato]
        success[Modulo inviato correttamente]
    "
>
</form>
```

Durante l'inizializzazione viene applicato questo ordine:

1. opzioni già dichiarate nel `pgs-option` del form;
2. valori mancanti ricevuti tramite `options.message`;
3. valori ancora mancanti presi dai default della libreria.

`options.message` e i default servono quindi soltanto a riempire il form. Alert, toast e messaggi di successo vengono letti dal `pgs-option`.

Per modificare un messaggio dopo l'inizializzazione si interviene sull'unica sorgente effettiva:

```js
pgs(form).option.setValueBrackets(
    "fieldsError",
    "Controlla i campi indicati"
);
```

## Messaggi specifici dei campi

`messageTitle` e `message` appartengono al singolo campo:

```html
<input
    pgs="input"
    pgs-option="
        messageTitle[Password non valida]
        message[La password deve contenere almeno 8 caratteri]
    "
    required
>
```

Quando esiste un solo errore, questi valori hanno priorità sui fallback `fieldErrorTitle` e `fieldError` del form. Quando esistono più campi invalidi viene usato `fieldsError`.

## Validazione e invio

```js
formValidate.validator(event => {
    const values = Object.fromEntries(new FormData(form));
    console.log(values);
});
```

Ogni nuovo evento gestito da `validator()` elimina prima gli errori temporanei registrati con `temporaryFieldError.set()`. Non è quindi necessario aggiungere un listener `submit` separato per chiamare `temporaryFieldError.clear()`.

Per validare senza registrare un listener:

```js
if (formValidate.validate()) {
    formValidate.success();
}
```

Per mostrare un successo determinato dal backend:

```js
const formValidate = new pgs.formValidate(form, {
    showSuccessOnValidate: false
});

formValidate.validator(async () => {
    await saveForm();
    formValidate.success("I dati sono stati salvati", "Aggiornato");
});
```

## Regole personalizzate

Una regola restituisce `null` quando è valida, un elemento quando è invalida oppure un array di elementi invalidi:

```js
formValidate.addNewRule(() => {
    if (password.value === confirmPassword.value) return null;

    pgs(confirmPassword).option
        .setValueBrackets("messageTitle", "Le password non coincidono")
        .setValueBrackets("message", "Inserisci nuovamente la conferma");

    return confirmPassword;
});
```

## Errori temporanei

Gli errori temporanei, per esempio provenienti dal server, non modificano i messaggi permanenti del campo:

```js
formValidate.temporaryFieldError.set(password, {
    title: "Accesso non riuscito",
    message: "Le credenziali inserite non sono valide"
});
```

Gestione:

```js
formValidate.temporaryFieldError.remove(password);
formValidate.temporaryFieldError.clear();
```

Gli errori temporanei sono conservati in una `Map` privata e hanno priorità sui messaggi dichiarativi del campo.
