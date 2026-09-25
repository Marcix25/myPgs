<!-- Automatically generated from reference/html/components/accordion.html. Edit reference/html/components/accordion.html and run npm run docs:generate again. -->

# Accordion

Expandable panels with synchronized visibility, ARIA attributes and keyboard navigation. An accordion on its own answers for itself: opening it leaves every other panel on the page alone. Wrap a set of them in an accordionContainer to get the one-at-a-time behaviour, scoped to that group.

## PGS

- `accordionContainer`: groups the accordions inside it, so opening one closes the others of the same group. The group is the nearest container above each accordion, so a nested container keeps its own panels to itself. (Optional)
- `accordion`: identifies each expandable element initialized by the JavaScript module.
- `accordion-button`: identifies the control that opens or closes the associated panel.
- `accordion-content`: identifies the content panel managed through the hidden attribute.

## PGS Options (component brackets)

- `accAutoOpen`: written on an accordion, the module opens that panel by itself on load and leaves it open while the rest of its group is used, so opening a sibling does not take it down. That protection lasts until the reader works that panel themselves: the first time it is opened or closed by hand the module drops the token, and from there it is an ordinary panel of the group. It is the authored form of the open state: pgs-state belongs to the runtime, and the module writes it from here.
- `accMultiOpen`: written on an accordionContainer, it lifts the one-at-a-time rule for that group, so its panels can be open together. Without a container this is already the behaviour, so the option only means something on the container.

## PGS States

- `open`: indicates the accordion element that is currently open and visible.

## JavaScript API

- `pgs.accordion.init(root)`: initializes unregistered accordions within the specified Document or Element.
- `pgs.accordion.api(element)`: returns the instance associated with an initialized accordion root.
- `instance.open()`: opens the panel and closes any other accordions on the page.
- `instance.close()`: closes the current panel.
- `instance.toggle()`: toggles the panel between its open and closed states.
- `instance.refresh()`: reruns initialization within the accordion container and returns the instance.
- `instance.isOpen()`: returns true when the open state is active.

## CSS Variables

- `--accordion-gap`
- `--accordion-icon`
- `--accordion-timing`

## Output

A group of accessible accordion items, each with its button and panel, the last one open on load and left open while the others are used.

## Example

```html
<ul pgs="accordionContainer">
    <li pgs="accordion">
        <button pgs="accordion-button" type="button">
            <span>Lorem ipsum dolor</span>
        </button>

        <div pgs="accordion-content" hidden>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </li>

    <li pgs="accordion">
        <button pgs="accordion-button" type="button">
            <span>Sit amet consectetur</span>
        </button>

        <div pgs="accordion-content" hidden>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore.</p>
        </div>
    </li>

    <li pgs="accordion['accAutoOpen']">
        <button pgs="accordion-button" type="button">
            <span>Tempor incididunt (accAutoOpen)</span>
        </button>

        <div pgs="accordion-content" hidden>
            <p>This panel is already open when the page loads, and stays open while the other two are used.</p>
        </div>
    </li>
</ul>
```
