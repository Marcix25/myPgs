# JavaScript helpers

Gli helper raccolgono comportamenti riutilizzabili che non rappresentano componenti autonomi. Sono registrati su `pgs` dall'entrypoint della libreria e possono essere utilizzati dopo:

```js
import "mypgs";
```

Per accedere anche alla funzione `pgs(root)`:

```js
import { pgs } from "mypgs";
```

## Helper disponibili

- [`pgs(root)`](pgs.md): ricerca e modifica token, stati e opzioni PGS.
- [`pgs.formValidate`](formValidate.md): validazione dei form, messaggi, regole personalizzate ed errori esterni.
- [`pgs.scrollHorizontal`](scrollHorizontal.md): converte lo scroll verticale della rotella in scorrimento orizzontale quando il contenitore può scorrere.

I sorgenti degli helper si trovano in `assets/javascript/helper/`.
