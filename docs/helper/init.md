<!-- Automatically generated from reference/html/helper/init.html. Edit reference/html/helper/init.html and run npm run docs:generate again. -->

# Init

Every component initializes itself on page load. pgs.init(root) re-runs that same initialization for whatever a Document or Element received later — markup inserted from an AJAX response, rendered by React or Vue, or built by hand with a template string — since none of that existed yet for the automatic pass to find.

## JavaScript API

- `pgs.init(root)`: finds every registered module that exposes init(root) and runs it again against the given Document or Element; already-initialized markup inside it is left untouched.

## Related elements

### PGS

- `flexColumn`: stacks the trigger and the target vertically in this example.
- `button`: styles the trigger that inserts the new markup.
- `dropdown`: uses the related dropdown component or utility in this example.
- `dropdown-button`: uses the related dropdown-button component or utility in this example.
- `dropdown-content`: uses the related dropdown-content component or utility in this example.

### PGS Options

- `gapElements`: spaces them apart.

## Output

A dropdown built and inserted after the page has already loaded, working only because pgs.init(root) is called on it.

## Example

```html
<div pgs="flexColumn" pgs-option="gapElements">
    <button pgs="button" id="pgsInit-add" type="button">Add dropdown</button>
    <div id="pgsInit-target"></div>
</div>

<script type="module">
    import { pgs } from "mypgs";

    document.getElementById("pgsInit-add").addEventListener("click", () => {
        const target = document.getElementById("pgsInit-target");

        target.innerHTML = `
            <span pgs="dropdown">
                <button pgs="dropdown-button button" type="button">Added dynamically</button>
                <div pgs="dropdown-content">This dropdown did not exist when the page loaded.</div>
            </span>
        `;

        // Without this call pgs.dropdown never saw the new markup, and it would stay inert.
        pgs.init(target);
    });
</script>
```
