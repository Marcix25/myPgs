# JavaScript helpers

Helpers collect reusable behaviour that is not a component of its own. They are registered on `pgs` by the library entrypoint and are available after:

```js
import "mypgs";
```

To reach the `pgs(root)` function as well:

```js
import { pgs } from "mypgs";
```

## Available helpers

- [`pgs(root)`](pgs.md): finds and edits PGS tokens, states and options.
- [`pgs.init(root)`](init.md): initializes components added through JavaScript, JSX or an asynchronous request.
- [`pgs.formValidate`](formValidate.md): form validation, messages, custom rules and external errors.
- [`pgs.scrollHorizontal`](scrollHorizontal.md): turns vertical wheel movement into horizontal scrolling while the container can still scroll.

The helper sources live in `assets/javascript/helper/`.
