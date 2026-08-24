# Horizontal scroll helper

`pgs.scrollHorizontal(element, speed)` turns vertical wheel movement into horizontal scrolling, but only while the container can still move in the requested direction.

```js
const container = document.querySelector(".horizontal-list");
const removeScroll = pgs.scrollHorizontal(container, 1);
```

The helper:

- leaves trackpad scrolling untouched;
- ignores zooming with `Ctrl`;
- does not replace a native horizontal scroll;
- lets the page scroll once the container reaches its start or its end;
- returns a function that removes the listener.

```js
removeScroll();
```
