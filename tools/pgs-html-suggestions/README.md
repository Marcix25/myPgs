# PGS HTML Suggestions

Autocomplete per `pgs="..."` e `pgs-data="..."` in HTML/PHP, letto direttamente da
`reference/pgs-map.json` (generato con `node scripts/generate-pgs-map.js`).

- `pgs="flex["` suggerisce solo le opzioni di `flex` (mai quelle di `grid`, `modal`, ecc.).
- `pgs-data="` suggerisce le chiavi dei componenti già scritti nel `pgs="..."` dello stesso tag,
  con fallback a tutte le chiavi se non ne trova nessuno.
- Un token generato ma indirizzabile a mano (`modal-dialog`) risolve le sue opzioni tramite la
  radice che le documenta (`modal`), anche se non è una voce di primo livello nella mappa.
- Riconosce anche `pgs(el).option.*(...)` e `pgs(el).data.*(...)` in JS/TS, senza scoping (non
  c'è un elemento da cui dedurre il componente).

## Sviluppo

```sh
npm install
npm run compile      # o npm run watch
npm run package      # produce ../../pgs-html-suggestions.vsix
```

Ricarica la mappa da comando (`PGS: ricarica pgs-map.json`) o automaticamente: un file watcher
osserva `reference/pgs-map.json` e si aggiorna da solo a ogni `node scripts/generate-pgs-map.js`.
