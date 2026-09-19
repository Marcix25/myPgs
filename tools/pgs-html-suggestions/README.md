# PGS HTML Suggestions

Autocomplete per `pgs="..."` e `pgs-data="..."` in HTML/PHP, letto direttamente da
`reference/pgs-map.json` (generato con `node scripts/generate-pgs-map.js`).

- `pgs="flex["` suggerisce solo le opzioni di `flex` (mai quelle di `grid`, `modal`, ecc.).
- `pgs-data="` suggerisce le chiavi dei componenti già scritti nel `pgs="..."` dello stesso tag,
  con fallback a tutte le chiavi se non ne trova nessuno.
- Le parentesi si suggeriscono solo su una vera radice della mappa: un figlio generato (anche
  se indirizzabile a mano, come `modal-dialog`) non porta mai un proprio bracket, quindi non
  riceve mai queste opzioni — solo `pgs-data`, se la radice ne documenta, resta suggerito anche lì.
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
