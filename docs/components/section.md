<!-- File generato automaticamente da templates/html/layout/section.html. Modificare templates/html/layout/section.html e rieseguire npm run docs:generate. -->

# Section

Varianti di sezione che controllano larghezza, padding e trattamento di contenuti specifici mantenendo la spaziatura verticale condivisa.

## PGS

- `section`: identifica la sezione standard con contenuto centrato.
- `sectionFull`: identifica una sezione estesa a tutta la larghezza disponibile.
- `sectionSpecificity`: identifica una sezione che applica una struttura specifica al relativo figlio.
- `sectionSpecificity-child`: identifica il contenuto figlio gestito dalla variante sectionSpecificity.
- `sectionMax`: identifica una sezione con larghezza massima estesa.
- `sectionNoPadding`: identifica una sezione priva del padding standard.

## Elementi correlati

- `flexColumnSections`: distanzia verticalmente tutte le sezioni dell'esempio.
- `flexColumnElements`: organizza verticalmente gli elementi principali di ogni sezione.
- `flexColumnTexts`: organizza e distanzia i contenuti interni.
- `card-img`: riutilizza il trattamento delle immagini card nelle sezioni dimostrative.
- `imgCover`: adatta le immagini alla larghezza della sezione.

## Output

Raccolta HTML delle varianti di section disponibili.

## Esempio

```html
<div pgs="flexColumnSections">
    <section pgs="section flexColumnElements">
        <div pgs="flexColumnTexts">
            <strong>Sezione standard</strong>
            <p>Contenuto centrato dentro una sezione MyPGS.</p>
        </div>
    </section>

    <section pgs="sectionFull flexColumnElements">
        <div pgs="flexColumnTexts">
            <strong>Sezione full-width</strong>
            <p>Contenuto centrato dentro una sezione MyPGS.</p>
        </div>
    </section>

    <section pgs="sectionSpecificity flexColumnElements">
        <div pgs="flexColumnTexts">
            <img pgs="card-img imgCover" src="https://placehold.co/800x200?text=Hero" alt="Immagine segnaposto">
        </div>
        <div pgs="sectionSpecificity-child flexColumnTexts">
            <strong>Sezione specificità-child</strong>
            <p>Contenuto centrato dentro una sezione MyPGS.</p>
        </div>
    </section>

    <section pgs="sectionMax flexColumnElements" style="background-color: var(--color-primary-soft)">
        <div pgs="flexColumnTexts">
            <strong>Sezione max-width</strong>
            <p>Contenuto centrato dentro una sezione MyPGS.</p>
        </div>
    </section>

    <section pgs="sectionNoPadding flexColumnElements">
        <div pgs="flexColumnTexts">
            <img pgs="card-img imgCover" src="https://placehold.co/800x500?text=HI!" alt="Immagine segnaposto">
        </div>
    </section>
</div>
```
