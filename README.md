# MyPGS

Libreria frontend con asset JavaScript e CSS precompilati per i componenti e i pattern MyPGS.

## Installazione

```bash
npm install mypgs
```

## Utilizzo

Importa gli asset compilati nel tuo progetto:

```js
import "mypgs";
import "mypgs/style.css";
```

Lo script inizializza le funzionalita' globali della libreria ed espone `pgs` su `globalThis`.

## Contenuto del pacchetto

- `dist/javascript/index.js`
- `dist/javascript/index.min.js`
- `dist/css/index.css`
- `dist/css/index.min.css`

## Sviluppo

```bash
npm run build
```
