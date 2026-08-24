# Initializing dynamic content

`pgs.init(root)` initializes the MyPGS components added after the initial page load, for example through JavaScript, JSX, AJAX or a client-side renderer.

The helper picks up every module registered on `pgs` that exposes an `init(root)` method, dark mode, Cookie Consent, notifications and the SVG/Lottie colour handling included. It holds no list of components and no special cases.

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

    return <div ref={root}>{/* MyPGS markup */}</div>;
}
```

Pass the container of the markup you just created instead of `document`, so the search stays inside the subtree that changed.
