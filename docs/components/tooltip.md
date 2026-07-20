<!-- File generato automaticamente da templates/html/components/tooltip.html. Modificare templates/html/components/tooltip.html e rieseguire npm run docs:generate. -->

# Tooltip

Variante compatta del dropdown che mostra un breve pannello informativo controllato da un pulsante a icona.

## PGS

- `tooltip`: identifica il root della variante tooltip.
- `tooltip-button`: identifica il controllo specifico del tooltip.
- `tooltip-content`: identifica il contenuto informativo del tooltip.

## PGS Options

- `position`: può essere applicata al root condiviso con sintassi position[lato allineamento] per modificare la posizione ereditata dal dropdown.

## PGS States

- `open`: viene gestito dal modulo dropdown sul root per mostrare o nascondere il tooltip.

## API JavaScript

- `pgs.dropdown.init(root)`: inizializza il tooltip perché il suo root condivide il token dropdown.
- `pgs.dropdown.api(element)`: restituisce l'istanza dropdown associata al root del tooltip.
- `instance.open()`: apre il contenuto informativo.
- `instance.close()`: chiude il contenuto informativo.
- `instance.toggle()`: inverte la visibilità del tooltip.
- `instance.refresh()`: reinizializza il contesto e ricalcola il posizionamento.
- `instance.isOpen()`: restituisce true quando il tooltip è aperto.

## Elementi correlati

- `dropdown`: fornisce apertura, chiusura e posizionamento del tooltip.
- `dropdown-button`: collega il pulsante al comportamento dropdown.
- `dropdown-content`: collega il pannello al comportamento dropdown.
- `buttonMini`: presenta il controllo come pulsante a icona di dimensione minima.

## Output

Tooltip HTML composto tramite i token condivisi del dropdown.

## Esempio

```html
<span pgs="dropdown tooltip">
    <button pgs="dropdown-button buttonMini tooltip-button" title="open-tooltip" type="button">
        <i class="fa-solid fa-info"></i>
    </button>
    <div pgs="dropdown-content tooltip-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto hic, id consectetur facilis et, iste animi minima quidem praesentium omnis quod. Quidem provident ad cum aut reprehenderit laboriosam eum placeat.
    </div>
</span>
```
