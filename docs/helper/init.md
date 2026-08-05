# Inizializzazione di contenuti dinamici

`pgs.init(root)` inizializza i componenti MyPGS aggiunti dopo il caricamento iniziale della pagina, per esempio tramite JavaScript, JSX, AJAX o un renderer client-side.

L'helper rileva automaticamente tutti i moduli registrati su `pgs` che espongono un metodo `init(root)`, incluse notifiche e gestione dei colori SVG/Lottie. Non contiene una lista di componenti o eccezioni specifiche.

## JavaScript

```js
container.insertAdjacentHTML("beforeend", markup);
pgs.init(container);
```

## React

```jsx
import { useEffect, useRef } from "react";
import "mypgs";

export function MyComponent() {
    const root = useRef(null);

    useEffect(() => {
        pgs.init(root.current);
    }, []);

    return <div ref={root}>{/* markup MyPGS */}</div>;
}
```

Passa il contenitore del markup appena creato invece di `document`, così la ricerca rimane limitata al sottoalbero interessato.
