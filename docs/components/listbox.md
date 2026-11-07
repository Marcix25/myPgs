<!-- Automatically generated from reference/html/components/listbox.html. Edit reference/html/components/listbox.html and run npm run docs:generate again. -->

# Listbox

The look of a list of options to pick from, the same wherever one is: the suggestions of Search and the list of a select box take it from their JavaScript, and a list written by hand can take it too. It draws the list, its options and the headings of its groups; where the list lies, and when it shows, is up to the component that owns it. Every rule is under :where, so a component, or a project, changes the look by setting the tokens below: once on [pgs~="listbox"] for every list, or on one list alone. A list written by hand takes role="listbox", its options role="option" and aria-selected, as the components write them.

## PGS

- `listbox`: the list of options: a column of them with --listbox-gap between, on --listbox-background with --listbox-color, inside --listbox-border and --listbox-borderRadius, with --listbox-padding round them and a scroll past --listbox-maxHeight. --listbox-offset is read by the component that lays the list under its control, as the space between the two.
- `listbox-option`: one option of the list, with --listbox-option-padding and a radius that follows the one of the list. What it holds before its text (an icon, an svg) sits a gap apart. The option the keys are on (pgs-state active) and the one under the pointer take --listbox-option-background-active and --listbox-option-color-active, the selected one (aria-selected="true") --listbox-option-background-selected and --listbox-option-color-selected, a disabled one (aria-disabled="true") is dimmed.
- `listbox-group`: the heading of a group of options, small and dimmed, which the keys skip.

## PGS States

- `active`: on the listbox-option the keys are on, written by the component that owns the list.

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
- `--listbox-maxHeight`
- `--listbox-offset`
- `--listbox-option-background-active`
- `--listbox-option-background-selected`
- `--listbox-option-color-active`
- `--listbox-option-color-selected`
- `--listbox-option-padding`
- `--listbox-padding`

## Output

A listbox written by hand with a group heading, a selected option, an option with an icon and a disabled one.
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
