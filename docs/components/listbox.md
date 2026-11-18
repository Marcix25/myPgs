<!-- Automatically generated from reference/html/components/listbox.html. Edit reference/html/components/listbox.html and run npm run docs:generate again. -->

# Listbox

The look of a list of options to pick from, the same wherever one is: the suggestions of Search and the list of a select box take it from their JavaScript, and a list written by hand can take it too. Listbox alone decides how the list looks: its box, its text (--font-size-text and --font-weight-text, its own and not the one of the place it opens in), its options, the headings of its groups and its messages. A component that opens one draws only its own field and decides where the list lies and when it shows: it never changes how the list looks. Every rule is under :where, so a project changes the look by setting the tokens below: once on [pgs~="listbox"] for every list, or on one list alone. A list written by hand takes role="listbox", its options role="option" and aria-selected, as the components write them.

## PGS

- `listbox`: the list of options: a column of them with --listbox-gap between, on --listbox-background with --listbox-color, inside --listbox-border and --listbox-borderRadius, with --listbox-padding round them and a scroll past --listbox-maxHeight. --listbox-offset is read by the component that lays the list under its control, as the space between the two.
- `listbox-option`: one option of the list, with --listbox-option-padding and --listbox-option-borderRadius, which follows the radius of the list less its padding (in a listbox inside another, the one of the outer box). What it holds before its text (an icon of any pack, an svg, an image) sits a gap apart, in a box --listbox-option-iconSize wide, so the texts line up whatever the glyph. The option the keys are on (pgs-state active) and the one under the pointer take --listbox-option-background-active and --listbox-option-color-active, the selected one (aria-selected="true") --listbox-option-background-selected and --listbox-option-color-selected, a disabled one (aria-disabled="true") is dimmed, and one with the hidden attribute is not shown, as a filter or a closed group of its component wants.
- `listbox-group`: the heading of a group of options, small and dimmed, which the keys skip; hidden with the hidden attribute, like an option. With the state open or closed it is a heading that opens and closes its group (the component does that): it takes the pointer and --listbox-group-icon (the chevron) at its end, turned while closed in --listbox-timing.
- `listbox-message`: a message in place of the options, such as nothing found or how many more letters to type: dimmed like a group heading, without the bold, and no pointer. The suggestions of Search and the select box with a search write it; outside a listbox it takes the default padding of the options.

## PGS States

- `active`: on the listbox-option the keys are on, written by the component that owns the list.
- `below`: on a listbox joined under the field that opened it (a search, a select box): it squares its top corners, the side of the field.
- `above`: on a listbox joined over the field that opened it, when there was no room below: it squares its bottom corners.
- `open`: on a listbox-group whose group is open, in a list where the groups open and close.
- `closed`: on a listbox-group whose group is closed: its options are hidden and the chevron is turned.

## Related elements

### PGS

- `icon`: draws the glyph before the text of an option; see Icon for the whole set.

### PGS Options (component brackets)

- `icon-star`: the neutral stand-in glyph, used where the example needs an icon but not a particular one.

### Other

- `search`: its list of suggestions is a listbox; see Search.
- `selectBox`: its list of options is a listbox; see Form Add-ons.

## CSS Variables

- `--listbox-background`
- `--listbox-border`
- `--listbox-borderRadius`
- `--listbox-color`
- `--listbox-gap`
- `--listbox-group-icon`
- `--listbox-maxHeight`
- `--listbox-offset`
- `--listbox-option-background-active`
- `--listbox-option-background-selected`
- `--listbox-option-borderRadius`
- `--listbox-option-color-active`
- `--listbox-option-color-selected`
- `--listbox-option-iconSize`
- `--listbox-option-padding`
- `--listbox-padding`
- `--listbox-timing`

## Output

A listbox written by hand with a group heading, a selected option, an option with an icon and a disabled one, a listbox with groups that open and close, and a listbox with a message in place of the options.
## Examples

### Listbox

A list written by hand: a group heading, the selected option, one with an icon before its text and a disabled one.

```html
<ul pgs="listbox" role="listbox" aria-label="Countries">
    <li pgs="listbox-group" role="presentation">Europe</li>
    <li pgs="listbox-option" role="option" aria-selected="true">Italy</li>
    <li pgs="listbox-option" role="option" aria-selected="false"><i pgs="icon['icon-star']" aria-hidden="true"></i>France</li>
    <li pgs="listbox-option" role="option" aria-selected="false" aria-disabled="true">Germany</li>
</ul>
```

### Groups that open and close

Headings with the state open or closed: the closed group hides its options (hidden), and the script that owns the list turns the states over on a click.

```html
<ul pgs="listbox" role="listbox" aria-label="Countries">
    <li pgs="listbox-group" pgs-state="open" role="presentation">Europe</li>
    <li pgs="listbox-option" role="option" aria-selected="false">Italy</li>
    <li pgs="listbox-option" role="option" aria-selected="false">France</li>
    <li pgs="listbox-group" pgs-state="closed" role="presentation">America</li>
    <li pgs="listbox-option" role="option" aria-selected="false" hidden>Brazil</li>
</ul>
```

### Listbox with a message

listbox-message in place of the options, here because nothing matched what was typed.

```html
<ul pgs="listbox" role="listbox" aria-label="Countries">
    <li pgs="listbox-message" role="option" aria-disabled="true">No country found</li>
</ul>
```
