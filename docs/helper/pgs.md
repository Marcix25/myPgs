<!-- Automatically generated from reference/html/helper/pgs.html. Edit reference/html/helper/pgs.html and run npm run docs:generate again. -->

# PGS

The `pgs(root)` function is how every component finds and edits its own markup: it wraps a Document or Element and returns read/write helpers for the pgs, pgs-data and pgs-state attributes, so nothing in the library — or in your own code — needs to hand-write an attribute selector. querySelector/querySelectorAll work on a Document too. On a Document, closest, add, remove, toggle, contains and assigning value throw a TypeError, reading value returns undefined, and state, option and data are undefined. pgs(root) itself throws a TypeError when root is missing or has no querySelector/querySelectorAll.

## JavaScript API

- `instance.querySelector(token)`: returns the first descendant carrying the given pgs token; also accepts an array or a comma-separated list of tokens.
- `instance.querySelectorAll(token)`: returns every matching descendant.
- `instance.closest(token)`: returns the nearest ancestor carrying the given pgs token, the element itself included, or null; also accepts an array or a comma-separated list of tokens.
- `instance.add(...components)`: adds one or more components, each passed as its own argument and each a single word, and returns the instance, so the options of a new component follow in the same line: add("button").option("button").add("btnMini"). A component already there keeps its bracket as it is, and none is written twice. An array, a name with a space, a bracket or a quote, or an empty name throws a TypeError: the options of a component go through option(component).
- `instance.remove(...components)`: removes the given components, each with its bracket, and returns the instance.
- `instance.toggle(component, force)`: adds the component when it is missing and removes it otherwise, or forces it on/off when force is passed, and returns the resulting boolean state.
- `instance.contains(component)`: checks whether the component is present, bare or with its bracket: contains("button") matches button['btnMini']. Whether it has an option is option(component).contains().
- `instance.state.add(...states)`: adds one or more pgs-state values, each passed as its own argument and each a single word.
- `instance.state.remove(...states)`: removes the given pgs-state values.
- `instance.state.toggle(state, force)`: flips or forces a pgs-state value and returns the result.
- `instance.state.contains(state)`: checks whether a pgs-state value is present.
- `instance.state.querySelector(state)`: returns the first descendant carrying the given pgs-state value; also accepts an array or a comma-separated list.
- `instance.state.querySelectorAll(state)`: returns every matching descendant.
- `instance.state.closest(state)`: returns the nearest ancestor carrying the given pgs-state value, the element itself included, or null.
- `instance.state.value`: the raw pgs-state attribute, or null; assigning a string replaces it and assigning null removes it.
- `instance.option(component)`: the options of one component of the element, the flags inside its bracket. The component is always named, so nothing guesses the owner of an option from its name: option("button").add("btnMini") puts btnMini where it is told. Each method takes options as single words, one per argument, like add(); an array, a space, a bracket or a quote throws a TypeError, and so does option() with no component. It never touches pgs-data.
- `instance.option(component).add(...options)`: adds the options to the bracket of the component, without doubles, and returns the same object, so calls chain. An element without the component throws a TypeError: add the component first with instance.add(component), so a misspelled name is an error and not a component nobody styles.
- `instance.option(component).remove(...options)`: removes the options from the bracket and returns the same object; the component stays, bare when its last option goes. On an element without the component it changes nothing.
- `instance.option(component).toggle(option, force)`: adds the option when it is missing and removes it otherwise, or forces it on/off when force is passed, and returns the resulting boolean state. Turning it on follows add(), so it throws on an element without the component; turning it off follows remove().
- `instance.option(component).contains(option)`: checks whether the option is in the bracket of the component; false on an element without the component.
- `instance.option(component).list()`: the options written in the bracket of the component now, as a new array (changing it does not change the element); an empty array for a bare component or an element without it, which instance.contains(component) tells apart. It lists what the markup holds, not every option the component could take.
- `instance.data.getValueBrackets(key)`: returns the payload inside a key[payload] pgs-data entry, or undefined. Never checks the pgs bracket.
- `instance.data.setValueBrackets(key, value)`: sets or replaces a single parameterized pgs-data entry. Never touches the pgs bracket.
- `instance.data.value`: the raw pgs-data attribute, or null; assigning a string replaces it and assigning null removes it.
- `pgs.registerModules(modules)`: exposes an object of named modules directly as properties of pgs, refusing to silently overwrite one already registered.

## Related elements

### Other

- `button`: borrowed purely to illustrate a component added through add() and its options through option(); belongs to the button component.
- `btnMini`: borrowed purely to illustrate option("button"); belongs to the button component.
- `btnIconOnly`: borrowed purely to illustrate several options in one call; belongs to the button component.
- `icon`: borrowed purely to illustrate option(component).list(); belongs to the icon component.
- `icon-moon`: one of the icon-* glyphs, borrowed for the same example; belongs to the icon component.
- `flex`: borrowed to show a layout option written through option("flex"); belongs to the flex layout.
- `itemCenter`: a layout option of flex, borrowed for the same example.
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

// a component is added on its own, and its options are those of option(component)
instance.add("button").option("button").add("btnMini", "btnIconOnly");
instance.option("button").contains("btnMini");
instance.option("button").toggle("btnMini");
instance.option("button").remove("btnIconOnly");
instance.add("icon").option("icon").add("icon-moon");
instance.option("icon").list(); // ["icon-moon"]: what the markup holds now
instance.add("flex").option("flex").add("itemCenter");
instance.data.getValueBrackets("headerCompactFrom"); // pgs-data only, never the pgs bracket
instance.data.setValueBrackets("headerCompactFrom", "600");
// tabsHistory never belongs in the pgs bracket, so its bare form goes through data.value directly — .data has no contains/add/remove/toggle of its own
instance.data.value = "tabsHistory";
const savedData = instance.data.value;
instance.data.value = savedData;

// available on a Document too
pgs(document).querySelector("box");
pgs(document).querySelectorAll("box");
```
