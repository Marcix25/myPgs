<!-- File generato automaticamente da templates/html/components/steps.html. Modificare templates/html/components/steps.html e rieseguire npm run docs:generate. -->

# Steps

Elenco ordinato di passaggi che presenta numero, contenuto e linea di collegamento, aggiungendo a runtime gli elementi strutturali mancanti.

## PGS

- `steps`: identifica la lista ordinata inizializzata dal modulo steps.
- `steps-step`: identifica ogni passaggio della sequenza.
- `steps-step-circle`: identifica l'indicatore numerico, creato automaticamente se assente.
- `steps-step-content`: identifica il contenuto testuale del passaggio.
- `steps-step-line`: identifica la linea di collegamento aggiunta dinamicamente a ogni passaggio.

## Output

Lista ordinata HTML di passaggi numerati completata dal modulo JavaScript.

## Esempio

```html
<ol pgs="steps">
    <li pgs="steps-step">
        <span pgs="steps-step-circle">1</span>
        <div pgs="steps-step-content">
            <h3>Primo step</h3>
            <p>Descrizione del primo passaggio.</p>
        </div>
    </li>

    <li pgs="steps-step">
        <span pgs="steps-step-circle">2</span>
        <div pgs="steps-step-content">
            <h3>Secondo step</h3>
            <p>Descrizione del secondo passaggio.</p>
        </div>
    </li>

    <li pgs="steps-step">
        <span pgs="steps-step-circle">3</span>
        <div pgs="steps-step-content">
            <h3>Terzo step</h3>
            <p>Descrizione del terzo passaggio.</p>
        </div>
    </li>
</ol>
```
