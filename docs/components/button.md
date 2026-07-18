<!-- File generato automaticamente da templates/html/components/button.html. Modificare templates/html/components/button.html e rieseguire npm run docs:generate. -->

# Button

Varianti di pulsante e collegamento d'azione con dimensioni, enfasi e composizione icona-testo definite dal design system.

## PGS

- `button`: identifica il pulsante standard utilizzabile anche su elementi a.
- `buttonStrong`: applica la variante con maggiore enfasi visiva.
- `buttonIcon`: identifica un pulsante compatto composto principalmente da un'icona.
- `buttonMini`: applica la variante di dimensione minima.
- `buttonBig`: applica la variante di dimensione ampia.

## PGS Options

- `buttonReverse`: inverte l'ordine visivo di testo e icona sul pulsante a cui è applicata.

## Elementi correlati

- `flexRow`: dispone gli esempi di pulsante su una riga flessibile.

## Output

Raccolta HTML delle principali varianti di button.

## Esempio

```html
<div pgs="flexRow">
    <a pgs="button" href="#">
        <i class="fa-duotone fa-solid fa-store"></i>
        About
    </a>

    <button pgs="button" type="button" pgs-option="buttonReverse">
        Avanti
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </button>

    <button pgs="buttonStrong" type="button">
        <i class="fa-solid fa-check" aria-hidden="true"></i>
        Submit
    </button>

    <button pgs="buttonIcon" type="button" aria-label="Impostazioni">
        <i class="fa-solid fa-gear" aria-hidden="true"></i>
    </button>

    <button pgs="buttonMini" type="button" aria-label="Informazioni">
        <i class="fa-solid fa-info" aria-hidden="true"></i>
    </button>

    <button pgs="buttonBig" type="button" aria-label="Bottone grande">
        <i class="fa-solid fa-rocket" aria-hidden="true"></i>
        Bottone grande
    </button>
</div>
```
