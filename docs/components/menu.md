<!-- Automatically generated from reference/html/components/menu.html. Edit reference/html/components/menu.html and run npm run docs:generate again. -->

# Menu

Menu markup with horizontal, vertical and recursively nested navigation examples.

## PGS

- `menu`: identifies the menu element used by Menu.
- `menu-buttonIcon`: identifies the menu-buttonIcon element used by Menu.

## PGS Options

- `horizontal`: identifies the horizontal element used by Menu.
- `vertical`: identifies the vertical element used by Menu.
- `menuHeader`: identifies the menuHeader element used by Menu.
- `menuIconOnlyCurrent`: displays link icons only when the link has an active aria-current value.
- `menuShort`: compacts adjacent menu links by overlapping their horizontal spacing.
- `position`: identifies the position element used by Menu.

## PGS States

- `open`: identifies the open element used by Menu.

## JavaScript API

- `pgs.menu.init(root)`: initializes matching elements within the specified root.
- `pgs.menu.api(element)`: returns the instance associated with the specified initialized element.
- `instance.refresh()`: refreshes the component and returns its updated instance.

## Related elements

### Other

- `dropdown`: uses the related dropdown component or utility in this example.
- `dropdown-button`: uses the related dropdown-button component or utility in this example.
- `dropdown-content`: uses the related dropdown-content component or utility in this example.
- `buttonNohover`: disables hover behavior on menu buttons generated at runtime.

## Output

Horizontal and vertical menu examples, including recursively nested submenus.

## Example

```html
<nav pgs="menu" pgs-option="horizontal" aria-label="Menu orizzontale">
    <ul>
        <li>
            <a href="/" aria-current="page">
                <i class="fa-solid fa-house" aria-hidden="true"></i>
                <span>Home</span>
            </a>
        </li>
        <li>
            <a href="/servizi">
                <i class="fa-solid fa-layer-group" aria-hidden="true"></i>
                <span>Servizi</span>
            </a>
            <ul>
                <li><a href="/servizi/uno">Servizio uno</a></li>
                <li><a href="/servizi/due">Servizio due</a></li>
            </ul>
        </li>
    </ul>
</nav>

<nav pgs="menu" pgs-option="vertical menuIconOnlyCurrent" aria-label="Menu verticale">
    <ul>
        <li>
            <a href="/" aria-current="page">
                <i class="fa-solid fa-house" aria-hidden="true"></i>
                <span>Home</span>
            </a>
        </li>
        <li>
            <a href="/servizi">
                <i class="fa-solid fa-layer-group" aria-hidden="true"></i>
                <span>Servizi</span>
            </a>
            <ul>
                <li><a href="/servizi/uno">Servizio uno</a></li>
                <li><a href="/servizi/due">Servizio due</a></li>
            </ul>
        </li>
        <li>
            <a href="/about">
                <i class="fa-solid fa-info-circle" aria-hidden="true"></i>
                <span>about</span>
            </a>
            <ul>
                <li><a href="/servizi/uno">Servizio uno</a></li>
                <li>
                    <a href="/servizi/due">Servizio due</a>
                    <ul>
                        <li><a href="/servizi/uno">Servizio uno</a></li>
                        <li><a href="/servizi/due">Servizio due</a></li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</nav>
```
