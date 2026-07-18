<!-- File generato automaticamente da templates/html/components/summary.html. Modificare templates/html/components/summary.html e rieseguire npm run docs:generate. -->

# Summary

Componente che limita inizialmente un testo lungo a tre righe e mostra il controllo di espansione solo quando il contenuto eccede tale altezza.

## PGS

- `summary`: identifica il root inizializzato dal modulo summary.
- `summary-content`: identifica il contenuto misurato e ridimensionato.
- `summary-button`: identifica il controllo per mostrare più o meno contenuto.

## PGS States

- `overflow`: indica che il contenuto supera l'altezza contratta e richiede il controllo.
- `open`: indica che tutto il contenuto è espanso e visibile.

## Output

Struttura HTML con contenuto espandibile e pulsante sincronizzato tramite ARIA.

## Esempio

```html
<div pgs="summary">
    <div pgs="summary-content">
        <p>
            Questo testo dimostrativo e' abbastanza lungo da occupare piu righe e mostrare il comportamento del componente summary. Il contenuto puo includere testo, link e altri elementi inline senza richiedere markup aggiuntivo.
        </p>
        <p>
            Quando il contenuto supera tre righe viene mostrato un pulsante per espandere o richiudere l'area visibile.
        </p>
    </div>

    <button pgs="summary-button" type="button">
        Mostra di più
    </button>
</div>
```
