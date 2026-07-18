<!-- File generato automaticamente da templates/html/components/dropdown.html. Modificare templates/html/components/dropdown.html e rieseguire npm run docs:generate. -->

# Dropdown

Componente a comparsa che associa un controllo a un contenuto posizionato rispetto al trigger e gestisce apertura, chiusura, click esterno ed Escape.

## PGS

- `dropdown`: identifica il contenitore inizializzato dal modulo dropdown.
- `dropdown-button`: identifica il controllo che apre o chiude il contenuto.
- `dropdown-content`: identifica il pannello posizionato rispetto al controllo.

## PGS Options

- `position`: configura il root come position[lato allineamento]; lato accetta top, right, bottom o left e l'allineamento compatibile accetta top, right, bottom, left o center. Il valore predefinito è bottom center.
- `buttonReverse`: inverte testo e icona sui pulsanti di esempio e appartiene al componente button.

## PGS States

- `open`: indica che il dropdown è aperto e che il contenuto è visibile.

## Elementi correlati

- `flexRow`: dispone i diversi esempi di posizionamento sulla stessa riga flessibile.
- `button`: applica lo stile standard ai controlli del dropdown.

## Output

Serie di dropdown HTML che dimostra le direzioni di posizionamento supportate.

## Esempio

```html
<div pgs="flexRow">

    <span pgs="dropdown">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Bottom center
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            Contenuto bottom center
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[top left]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Top left
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            Contenuto top left
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[top center]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Top center
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            Contenuto top center
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[top right]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Top right
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            Contenuto top right
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[bottom left]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Bottom left
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            Contenuto bottom left
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[bottom right]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Bottom right
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            Contenuto bottom right
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[left center]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Left center
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            Contenuto left center
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[right center]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Right center
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            Contenuto right center
        </div>
    </span>

</div>
```
