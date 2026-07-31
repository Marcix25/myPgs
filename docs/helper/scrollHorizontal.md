# Horizontal scroll helper

`pgs.scrollHorizontal(element, speed)` converte il movimento verticale della rotella in scorrimento orizzontale solamente quando il contenitore può ancora muoversi nella direzione richiesta.

```js
const container = document.querySelector(".horizontal-list");
const removeScroll = pgs.scrollHorizontal(container, 1);
```

L'helper:

- lascia invariato lo scorrimento dei trackpad;
- ignora lo zoom con `Ctrl`;
- non sostituisce uno scorrimento orizzontale nativo;
- lascia scorrere la pagina quando il contenitore raggiunge l'inizio o la fine;
- restituisce una funzione per rimuovere il listener.

```js
removeScroll();
```
