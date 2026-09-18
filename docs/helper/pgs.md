<!-- Automatically generated from reference/html/helper/pgs.html. Edit reference/html/helper/pgs.html and run npm run docs:generate again. -->

# PGS

The `pgs(root)` function is how every component finds and edits its own markup: it wraps a Document or Element and returns read/write helpers for the pgs, pgs-data and pgs-state attributes, so nothing in the library — or in your own code — needs to hand-write an attribute selector. querySelector/querySelectorAll work on a Document too; every other method needs an Element and throws otherwise.

## JavaScript API

- `instance.querySelector(token)`: returns the first descendant carrying the given pgs token; also accepts an array or a comma-separated list of tokens.
- `instance.querySelectorAll(token)`: returns every matching descendant.
- `instance.closest(token)`: returns the nearest ancestor carrying the given pgs token, the element itself included, or null; also accepts an array or a comma-separated list of tokens.
- `instance.add(...tokens)`: adds one or more pgs tokens without duplicating existing ones and returns the instance.
- `instance.remove(...tokens)`: removes the given pgs tokens and returns the instance.
- `instance.toggle(token, force)`: flips the token, or forces it on/off when force is passed, and returns the resulting boolean state.
- `instance.contains(token)`: checks whether the component token is present, including its bracket form; contains("button") also matches button['buttonMini'].
- `instance.state.add(...states)`: adds one or more pgs-state values.
- `instance.state.remove(...states)`: removes the given pgs-state values.
- `instance.state.toggle(state, force)`: flips or forces a pgs-state value and returns the result.
- `instance.state.contains(state)`: checks whether a pgs-state value is present.
- `instance.state.querySelector(state)`: returns the first descendant carrying the given pgs-state value; also accepts an array or a comma-separated list.
- `instance.state.querySelectorAll(state)`: returns every matching descendant.
- `instance.state.closest(state)`: returns the nearest ancestor carrying the given pgs-state value, the element itself included, or null.
- `instance.option.add(...flags)`: adds a CSS or JavaScript-only boolean flag, deriving its owning component from the flag's own name (the lowercase run before the first uppercase letter or a "-") and merging into that component's existing bracket; a flag with no matching owner present becomes its own bare pgs token instead. Never touches pgs-data.
- `instance.option.remove(...keys)`: removes a flag by key, bare or nested in a bracket, preserving the rest. Never touches pgs-data.
- `instance.option.toggle(key, force)`: flips or forces a flag and returns the resulting boolean state. Never touches pgs-data.
- `instance.option.contains(key)`: checks whether a flag is present, bare or nested in a bracket. Never checks pgs-data.
- `instance.option.querySelector(key)`: returns the first descendant carrying that flag; also accepts an array or a comma-separated list of keys.
- `instance.option.querySelectorAll(key)`: returns every matching descendant, as an Array rather than a NodeList, since the keys are matched here and not by the selector engine.
- `instance.option.closest(key)`: returns the nearest ancestor carrying that flag, the element itself included, or null.
- `instance.data.getValueBrackets(key)`: returns the payload inside a key[payload] pgs-data entry, or undefined. Never checks the pgs bracket.
- `instance.data.setValueBrackets(key, value)`: sets or replaces a single parameterized pgs-data entry. Never touches the pgs bracket.
- `pgs.registerModules(modules)`: exposes an object of named modules directly as properties of pgs, refusing to silently overwrite one already registered.
- `pgs.import(...names)`: returns the requested modules from the advanced import registry, throwing for any name not registered there.

## Related elements

### PGS

- `box`: borrowed purely to illustrate option.add's owner derivation; belongs to the box component.
- `hoverNot`: has no single owning component, so it is the example for option.add's bare-token fallback; belongs to the hover opt-out.

### PGS Options (component brackets)

- `boxMini`: a CSS flag of box, used the same way here as any component-owned flag; belongs to the box component.

### Other

- `headerCompactFrom`: borrowed purely to illustrate data.getValueBrackets/setValueBrackets; belongs to the header component.

## Output

The instance returned by pgs(root), and the read/write methods it exposes for pgs, pgs-data and pgs-state.

## JavaScript Usage

```js
const instance = pgs(element); // any Element, or a Document for querySelector(All) only

instance.contains("modal");
instance.closest("accordionContainer");
instance.add("custom-token");
instance.remove("custom-token");
instance.toggle("custom-token", true);

instance.state.add("open");
instance.state.toggle("open", false);
instance.state.contains("open");
instance.state.closest("errorField");
instance.state.querySelectorAll("errorField");

instance.add("box"); // the owning component token has to exist first, for option.add to find it
instance.option.add("boxMini"); // derives "box" from "boxMini" and merges: pgs="box['boxMini']"
instance.option.contains("boxMini");
instance.option.closest("boxMini");
instance.option.add("hoverNot"); // no "hover" token present to merge into: lands bare, pgs="box hoverNot"
instance.data.getValueBrackets("headerCompactFrom"); // pgs-data only, never the pgs bracket
instance.data.setValueBrackets("headerCompactFrom", "600");
// tabsHistory has no owner to derive and never belongs in the pgs bracket, so its bare form goes
// through data.value directly — .data has no contains/add/remove/toggle of its own
instance.data.value = "tabsHistory";
const savedData = instance.data.value;
instance.data.value = savedData;

// available on a Document too
pgs(document).querySelector("box");
pgs(document).querySelectorAll("box");
```
