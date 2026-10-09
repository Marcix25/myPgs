<!-- Automatically generated from reference/html/helper/helper.html. Edit reference/html/helper/helper.html and run npm run docs:generate again. -->

# Helper

pgs.helper gathers the small functions the library itself is built on, public so that a theme or a script of your own speaks the same way: the same ids, the same bubbling events, the same console messages. pgs.helper.init and pgs.helper.formValidate have a page of their own. Every other helper is listed here.

## JavaScript API

- `pgs.helper.roots(root, token)`: the elements inside the given Document or Element that carry the token, the root itself first when it carries it too; token also accepts an array. Throws a TypeError when root is neither a Document nor an Element.
- `pgs.helper.directChildren(parent, token)`: the children of parent, not the deeper descendants, that carry the token or any of the tokens in an array.
- `pgs.helper.directChild(parent, token)`: the first of them, or null.
- `pgs.helper.uniqueId(prefix)`: "prefix-1", "prefix-2" and so on, one counter per prefix, for the ids a script generates.
- `pgs.helper.dispatch(target, name, detail, options)`: dispatches a CustomEvent that bubbles and whose detail always carries element, the target; pass { cancelable: true } only for an event whose default action the listener may stop. Returns the event.
- `pgs.helper.rafThrottle(callback)`: returns a function that runs the callback at most once per animation frame, with the arguments of the last call; its cancel() drops a call that has not run yet.
- `pgs.helper.watchDocument(callback, options)`: calls back once per frame while nodes arrive in the document, for a script that has to find markup added later. Returns the MutationObserver, so it can be disconnected, or null when there is no document.
- `pgs.helper.onDocumentReady(callback)`: runs the callback once the DOM is parsed, straight away when it already is; does nothing without a document.
- `pgs.helper.escapeHtml(value)`: the text with & < > " ' turned into entities, for a string that goes into innerHTML.
- `pgs.helper.formatText(value)`: escapeHtml, then **bold** as strong and line breaks as br, the same small subset the alert card accepts.
- `pgs.helper.warn(scope, message, ...details)`: prints "pgs.<scope>(): <message>" with console.warn, for markup that is invalid but can be skipped.
- `pgs.helper.invalid(scope, message)`: returns a TypeError with the message "pgs.<scope>(): <message>", to throw for an invalid argument.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `button`: styles the trigger that adds a card.
- `card-content`: the padded area of that card, where the escaped title goes.

### PGS Options (component brackets)

- `column`: stacks the button and the cards vertically in this example.
- `gapElements`: spaces them apart.

### Other

- `card`: the component the script builds with the generated id.

## Output

A button that adds a card with a generated id and an escaped title, then announces it with a bubbling event.

## Example

```html
<div pgs="flex['column' 'gapElements']">
    <button pgs="button" id="pgsHelper-add" type="button">Add a card</button>
    <div id="pgsHelper-target" pgs="flex['column' 'gapElements']"></div>
</div>

<script type="module">
    import { pgs } from "mypgs";

    const target = document.getElementById("pgsHelper-target");

    target.addEventListener("pgs:example:added", event => {
        console.log("added", event.detail.element.id);
    });

    document.getElementById("pgsHelper-add").addEventListener("click", () => {
        const card = document.createElement("article");
        card.id = pgs.helper.uniqueId("pgsHelper-card");
        card.setAttribute("pgs", "card");
        card.innerHTML = `<div pgs="card-content"><h3>${pgs.helper.escapeHtml("<Generated> & escaped")}</h3></div>`;
        target.append(card);

        pgs.helper.dispatch(card, "pgs:example:added");
    });
</script>
```
