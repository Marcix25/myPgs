<!-- Automatically generated from reference/html/components/pageNav.html. Edit reference/html/components/pageNav.html and run npm run docs:generate again. -->

# Page Nav

Full-page panels switched by the URL hash instead of an index, so the current one survives a reload or a shared link with no extra bookkeeping. A panel is addressed by the name in its pageNavHash, matched against the fragment of whichever pageNav-list-item link points at it: write as many pageNav-list navs as the layout needs — a sidebar and a copy inside a mobile dialog, say — and every one of them stays in sync, since matching goes by name rather than by counting positions in a single list. The name is not an id: with no element of that id in the page, the browser has nothing to scroll to when the page opens on a panel, so it never pulls back a reader who has already started scrolling, the URL keeps its hash and the panel can carry an id of its own for CSS or ARIA, as long as it differs from the name. Clicking a link is a native hash navigation the browser already handles; the module only reacts to it (and to a direct back/forward move) to hide every panel but the one now named by the hash. A link inside an open dialog closes it on selection. Every selection dispatches pgs:pageNav:change on the pageNav root, once, with detail { element, panel, items }; the event bubbles, so a listener can sit on the root or above it. A root with no panel or no link is reported in the console and left alone. A panel with no pageNavHash is still addressed by its own id: the browser would scroll to it, so on a load that opens on it the hash is taken off the URL and put back once the page has loaded. The hash the page was opened with is taken once, on the first initialization of the root; initializing it again with refresh() follows the URL as it is by then. The panels hide with display: none until one carries the pgs-state active, because they have to start hidden; tabs uses the native hidden attribute, so that every panel stays visible without JavaScript.

## PGS

- `pageNav`: identifies the root initialized by the module; usually the page's own <body>, since the panels it switches are whole pages, not a fragment of one.
- `pageNav-list`: identifies one navigation list of links; write as many as the layout needs, they all stay in sync.
- `pageNav-list-item`: identifies a link, whose href="#name" names the panel it selects.
- `pageNav-panels`: identifies the wrapper around every panel.
- `pageNav-panels-content`: identifies one panel, addressed by its pageNavHash. Hidden by default, with no [hidden] to write by hand — give its own content's layout to an inner wrapper, not to this element.

## PGS Data

- `pageNavHash`: on a pageNav-panels-content, pageNavHash[name]: the name of the panel in the URL hash, the one its links write as href="#name". Keep it different from every id in the page, or the browser scrolls to that element: the module warns in the console when they match. Without it the panel is addressed by its own id, as before.

## PGS States

- `active`: identifies the visible panel; the module writes it, and reads it back on a hashless load to honor one already marked in the markup, the same convention Tabs uses. A link's own selected state is separate, aria-current="page", not pgs-state.

## JavaScript API

- `pgs.pageNav.init(root)`: initializes pageNav inside the specified Document or Element, including the root when it is pageNav.
- `pgs.pageNav.api(element)`: returns the instance associated with an initialized pageNav root.
- `instance.select(name)`: navigates to the panel with that pageNavHash (or id), the same as following a link to #name, and applies it right away; throws a TypeError when no panel has that name.
- `instance.getCurrent()`: returns the zero-based index of the currently visible panel, in document order.
- `instance.getCurrentPanel()`: returns the currently visible panel element.
- `instance.destroy()`: removes the listeners of the instance and forgets it; the panels keep their active state.
- `instance.refresh()`: destroys the instance and builds a new one on the same root, and returns it.

## Output

Two synchronized link lists above a bordered panel, the visible one always matching the URL hash.
## Examples

### Page Nav

Two independent lists of links, kept in sync, switching the same set of full panels by hash. Only one pageNav can exist on a page — usually pgs=&quot;pageNav&quot; on the body itself — so this is markup to copy and adapt, not a live preview to click through.

```html
<div pgs="pageNav">
    <nav pgs="pageNav-list" aria-label="Sections">
        <a href="#pageNav-html" pgs="pageNav-list-item">HTML</a>
        <a href="#pageNav-react" pgs="pageNav-list-item">React</a>
        <a href="#pageNav-vue" pgs="pageNav-list-item">Vue</a>
    </nav>

    <!-- a second, independent list of links to the same panels, kept in sync automatically -->
    <nav pgs="pageNav-list" aria-label="Sections (copy)">
        <a href="#pageNav-html" pgs="pageNav-list-item">HTML</a>
        <a href="#pageNav-react" pgs="pageNav-list-item">React</a>
        <a href="#pageNav-vue" pgs="pageNav-list-item">Vue</a>
    </nav>

    <div pgs="pageNav-panels">
        <section pgs="pageNav-panels-content" pgs-data="pageNavHash[pageNav-html]">
            <h3>HTML</h3>
            <p>Semantic markup ready to copy into a page.</p>
        </section>
        <section pgs="pageNav-panels-content" pgs-data="pageNavHash[pageNav-react]">
            <h3>React</h3>
            <p>The same structure written in JSX with pgs attributes.</p>
        </section>
        <section pgs="pageNav-panels-content" pgs-data="pageNavHash[pageNav-vue]">
            <h3>Vue</h3>
            <p>Component markup ready for a Vue template.</p>
        </section>
    </div>
</div>
```
