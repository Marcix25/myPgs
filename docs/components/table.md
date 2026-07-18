<!-- File generato automaticamente da templates/html/components/table.html. Modificare templates/html/components/table.html e rieseguire npm run docs:generate. -->

# Table

Contenitore responsive per una tabella semantica con intestazioni e righe di dati coerenti con gli stili del design system.

## PGS

- `table`: identifica il wrapper che gestisce presentazione e scorrimento della tabella nativa.

## Output

Tabella HTML completa racchiusa nel contenitore PGS dedicato.

## Esempio

```html
<div pgs="table">
    <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Stato</th>
                <th>Data</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Elemento uno</td>
                <td>Attivo</td>
                <td>2026-01-01</td>
            </tr>
            <tr>
                <td>Elemento due</td>
                <td>Bozza</td>
                <td>2026-02-01</td>
            </tr>
        </tbody>
    </table>
</div>
```
