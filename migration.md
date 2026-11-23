# Migrating from 5.0.8 to 6.0.0

This guide is the net difference between `mypgs` 5.0.8 and 6.0.0, written for whoever updates a project that
consumes it (a theme, a plugin, a site). For each change it says what 5.0.8 had and what to write or expect now.
Names from the work in between never appear: a name in the "5.0.8" column is one 5.0.8 really had, a name in the
"now" column is one 6.0.0 really has. A project still on an older 5.0.x updates to 5.0.8 first.

The guide for moving from 4.x (4.7.1) to 5.0.0 is the `migration.md` of the `v5.0.0` tag.

## How to use it

1. **Do the breaking changes first** ([list below](#breaking-changes)): each one has a `grep` in the
   [Sweep](#sweep) that finds it.
2. **Read the silent changes of each area you use.** The name stayed and the look or the behavior moved under it,
   so nothing errors and the page just looks different.
3. **Open the pages.** Headings, labels, tables, dropdowns and the spacing scale look different by default.

Reading the tables: a flag is written inside the bracket of the component that owns it, `pgs="label['labelBox']"`.
`(none)` in the "5.0.8" column means the thing is new. `-> see` points to the section that owns the item.

## Breaking changes

| # | 5.0.8 | now |
| --- | --- | --- |
| 1 | `toggleDarkmode`, `toggleDarkmode-light`, `toggleDarkmode-dark` | `darkmodeToggle`, `darkmodeToggle-light`, `darkmodeToggle-dark`; the options keep their names (`darkmodeToggle['tglLabeled']`). The old name does nothing any more |
| 2 | the `texts` step: `gapTexts`, `mgTexts`, `mgTpTexts`, `pdTexts`, `radTexts`, ..., `--gap-texts`, `--padding-texts`, `--margin-texts`, `--borderRadius-texts`, `--SIZE-texts` | the `paragraphs` step: `gapParagraphs`, `mgParagraphs`, `--gap-paragraphs`, ..., same value (1.5rem). The old names still work as deprecated aliases (`base/_deprecated.scss`) until version 7, but overriding an old `--*-texts` property no longer changes the library: override `--*-paragraphs` |
| 3 | `label` and `pgs="legend"`: a white box with a border | plain text above the control. The box is `label['labelBox']` / `legend['labelBox']` -> see [Forms](#forms) |
| 4 | every dropdown drew an arrow; `dropdown['drpNotArrow']` removed it | no arrow by default; `dropdown['drpArrow']` draws it. `drpNotArrow` is gone (just delete it) |
| 5 | `table`: zebra rows and row hover by default | header background and a line under each row only; `table['tableStriped']`, `['tableHover']`, `['tableBordered']` add the rest |
| 6 | `pageShell` with its own vertical room (`--pageShell-offsetTop`, `--pageShell-paddingBottom`), sticky sidebar at `--pageShell-asideScroll-top` | the shell has no room above or below of its own: write `pgs="main pageShell"` or put it in a `main`. Those three variables and `--pageShell-asideScroll-maxHeight` are gone -> see [Layout](#layout) |
| 7 | `--search-suggestions-*` custom properties | the list of suggestions is a `listbox`: `--listbox-*` -> see [Search, selectBox and listbox](#search-selectbox-and-listbox) |
| 8 | `@include legend()` | gone: `[pgs~=legend]` takes `label()` itself, options included |
| 9 | the generated slides arrows `_slides-prev` and `_slides-next`, in the `_slides-arrows` wrapper | `_slides-arrows-prev` and `_slides-arrows-next`, in the same wrapper: a selector on the old names stops matching. The arrows written by hand keep `slides-prev` / `slides-next` |
| 10 | a `pageNav` panel addressed by its `id` | addressed by `pgs-data="pageNavHash[name]"` (the id still works as a fallback); the root takes a bracket, so a project selector on it is `:is([pgs~="pageNav"], [pgs*="pageNav["])` |
| 11 | `footer-top-content`, `footer-brand`, `footer-content` | gone: the footer gives no style to the row of the upper section or to its columns, so they have no token; the layout is `flex` in the markup (`flex['row' 'column-3']` for the row, `flex['column']` for a column). A project selector on the old names stops matching |
| 12 | `search-suggestions` a list (`<ul>`), the list of the suggestions and its box at once, with `_search-suggestions-item` and the messages `_search-suggestions-placeholder` and `_search-suggestions-empty` in it; the active suggestion `aria-selected="true"` and the state `selected` | `search-suggestions` is the box, written as a `<div>` (a `<ul>` is left alone, with a warning): the JavaScript makes it the `listbox` and builds in it the list `_search-suggestions-list` with the suggestions `_search-suggestions-list-item`, and one `_search-suggestions-message` under the list. The active suggestion takes the state `active`, `aria-selected` stays `false` -> see [Search, selectBox and listbox](#search-selectbox-and-listbox) |
| 13 | `header['headerCompactBottom']`: documented as moving `header-element` to the bottom of the screen while the header is compact, but it did nothing any more (its rules were gone) | removed, with `--header-compactBottom-active`. Delete the option; for a header at the bottom write `header['headerBottom']` |
| 14 | custom properties whose names broke the naming rule (`--component-subElement-property-state`, one camelCase word per segment), such as `--label-size`, `--modal-content-padding`, `--steps-circle-*`, `--navSmart-itemMinWidth` | renamed, with no alias: an old name set by a project does nothing any more -> see [Renamed custom properties](#renamed-custom-properties) |
| 15 | `@include focus()` | gone: every element that takes the focus already has the ring (`:focus-visible` in `base/_body.scss`); for an element that draws the ring for another one, `@include focusRing()` inside the rule that says when |

## Renamed custom properties

Breaking change 14. Each one keeps its value and its role; only the name changed. `--checkboxRadio-labelColor`, one
property for the text of a checkbox, a radio and a toggle, is now one per component: `--checkbox-label-color`,
`--radio-label-color`, `--toggle-label-color`.

| 5.0.8 | now |
| --- | --- |
| `--dropdown-inline-size` | `--dropdown-inlineSize` |
| `--label-size` | `--label-fontSize` |
| `--badge-textSize` | `--badge-fontSize` |
| `--breadcrumb-size` | `--breadcrumb-fontSize` |
| `--logo-textSize` | `--logo-text-fontSize` |
| `--footer-titleSize` | `--footer-title-fontSize` |
| `--flex-flexValue` | `--flexChild-basis` |
| `--modal-content-padding` | `--modal-dialog-content-padding` |
| `--modal-footer-gap` | `--modal-dialog-content-footer-gap` |
| `--steps-circle-background` | `--steps-step-circle-background` |
| `--steps-circle-color` | `--steps-step-circle-color` |
| `--steps-circle-size` | `--steps-step-circle-size` |
| `--steps-line-color` | `--steps-step-line-color` |
| `--steps-line-size` | `--steps-step-line-size` |
| `--range-background-thumb-hover` | `--range-thumb-background-hover` |
| `--range-background-thumb` | `--range-thumb-background` |
| `--range-background-progress` | `--range-progress-background` |
| `--range-thumbWidth` | `--range-thumb-width` |
| `--menu-gap-row` | `--menu-rowGap` |
| `--menu-gap-column` | `--menu-columnGap` |
| `--slides-sizeMaskImage` | `--slides-maskSize` |
| `--pageShell-asideShadow-sizeMaskImage` | `--pageShell-asideShadow-maskSize` |
| `--slides-arrowSize` | `--slides-arrows-size` |
| `--slides-arrowsSpace` | `--slides-arrows-space` |
| `--selectBox-chips-item-removeIcon` | `--selectBox-chips-item-remove-icon` |
| `--pagination-justify` | `--pagination-justifyContent` |
| `--alert-iconSize` | `--alert-icon-size` |
| `--badge-iconSize` | `--badge-icon-size` |
| `--checkbox-iconSize` | `--checkbox-icon-size` |
| `--listbox-list-option-iconSize` | `--listbox-list-option-icon-size` |
| `--navSmart-iconSize` | `--navSmart-icon-size` |
| `--select-chevronSize` | `--select-chevron-size` |
| `--select-chevronInset` | `--select-chevron-inset` |
| `--navSmart-itemHeight` | `--navSmart-item-height` |
| `--navSmart-itemMinWidth` | `--navSmart-item-minWidth` |
| `--navSmart-edgeHomeIndicator` | `--navSmart-edge-homeIndicator` |
| `--navSmart-edgePWA` | `--navSmart-edge-pwa` |
| `--checkbox-borderStyleWidth` | `--checkbox-border` |
| `--radio-borderStyleWidth` | `--radio-border` |
| `--toggle-borderStyleWidth` | `--toggle-border` |
| `--card-horizontal-borderRadius-item` | `--card-img-borderRadius-horizontal` |
| `--card-borderRadius-item` | `--card-img-borderRadius` |
| `--card-horizontal-content-grow` | `--card-content-grow-horizontal` |
| `--card-horizontal-img-grow` | `--card-img-grow-horizontal` |
| `--card-horizontal-img-minHeight` | `--card-img-minHeight-horizontal` |
| `--label-left` | `--label-offsetInline` |
| `--checkboxRadio-labelColor` | `--checkbox-label-color`, `--radio-label-color`, `--toggle-label-color` |

## Foundation

### Silent changes

| what | 5.0.8 | now |
| --- | --- | --- |
| headings | weight 900 (`--heading-weight`) | `--heading-weight` = `--font-weight-title`, 700 |
| `--font-weight-title` | 800 | 700 (also the `heading()` mixin default `$weight`) |
| `bodyText` list items | `line-height: normal` | `line-height: var(--text-lineHeight)` (1.5), so a menu or a nav built on `<ul>` may grow a little |
| `textBlock` headings indent | 25px | `--margin-elements` (30px) |
| lists of `list()` (`pgs="list"`, `textBlock`) | `margin-left: 25px`; every item `margin-top: calc(var(--gap-texts) / 2)`, a nested item `--gap-texts` | a column (`flex`): the items, nested ones included, spaced by the gap alone (`--gap-details`), a nested list the same gap below its item's text; in `pgs="list"` a list after another element (a paragraph, as an editor writes it) `--gap-paragraphs` below it, in `textBlock` its gap does it; the markers in a `padding-left: 1.5em`, no margin. A `pgs="list"` wrapper after a paragraph is spaced by its parent: `flex['column']` on it |
| `--icon-size` in em | counted twice (1.25em drew 1.56em) | counted once; `iconMedium` is 1.5em and `iconLarge` 2.25em, so they draw as before, but a custom `--icon-size` in em now draws smaller |
| `hamburgerTwo` glyph | bars almost touching | bars spaced like the two layers of the duo icon |

### Renames and removals

| 5.0.8 | now |
| --- | --- |
| `toggleDarkmode*` | `darkmodeToggle*` (breaking change 1) |
| the `texts` step | the `paragraphs` step (breaking change 2) |

### New (opt-in)

- The `details` step, 0.75rem: `gapDetails`, `mgDetails`, `pdDetails`, `radDetails`, `--gap-details`,
  `--padding-details`, `--margin-details`, `--borderRadius-details`, `--SIZE-details`; for the space between small
  pieces of text in a row, such as an icon and its label. Also `radSections` / `--borderRadius-sections`.
- Dark mode that follows the operating system:
  - `<html pgs="htmlBase htmlDarkmodeFollowSystem">`: with no choice stored, the page takes the theme of the system
    and changes with it while open. Without it the page starts light, as before.
  - `darkmodeToggle['tglFollowSystem']`: one switch with three states, light, dark, system, and a third icon
    `darkmodeToggle-system`; with `tglLabeled` the third label is `--darkmode-label-system` ("System theme").
  - `darkmodeButtons` with `darkmodeButtons-light`, `-dark`, `-system`: the three states on separate buttons; the one
    of the current state has `aria-pressed="true"` and the state `active`.
  - `screenIsDarkMode` in localStorage can now be `"system"`; the html carries the state `darkmodeSystem` while the
    page follows the system.

## Layout

### Silent changes

| what | 5.0.8 | now |
| --- | --- | --- |
| `pageShell` vertical room | `padding-top: var(--pageShell-offsetTop)`, `padding-bottom: var(--pageShell-paddingBottom)` on the shell | none; `main` gives it: `pgs="main pageShell"` on the same element (`--main-paddingTop/-paddingBottom` stay), or the shell inside a `main`. A shell at the top of the page with no `main` starts under the header |
| `pageShell['shellAsideScroll']` | sticky at `--pageShell-asideScroll-top` (default `--_header-height`), shell top moved to the content | sticky right under the header (`top: var(--_header-height)`); on `main pageShell` it climbs into main's top padding and gives it back as its own `padding-top`, so its content stays level with the content; no variable of its own |
| `pageShell['shellAsideShadow']` | a mask on both edges | a mask `--pageShell-asideShadow-maskSize` tall that follows the scroll: at the top only once scrolled, at the bottom only while there is more below, none on a sidebar that does not scroll (Firefox: only the bottom one) |
| `pageShell` content of a sticky-aside shell | `min-height: 100dvh` | no forced height |
| `main` bottom room | `--page-top` | `--page-bottom` (`7lvh`) |
| logo of `footer-brand` | resized by the footer (`aspect-ratio: 1; height: 200px`) | not resized: write `logo['logoFooter']` for the big footer logo |
| links of `footer` | in `footer-top` `--color-primary-strong`, bold, underlined on hover; in `footer-legal` `--footer-color`, underlined on hover | `--footer-color`, always underlined (the underline the link color at half strength), `--footer-color-hover` (default `--color-link`) on hover and keyboard focus, anywhere in the footer; bold in `footer-top`, not in `footer-legal`; a link drawn as a `button` or a `logo` keeps its own look |
| `footer-brand` and the menu of `footer-content` | the brand a column; menu links 5px apart, an icon 18px wide before the text | no layout from the footer, and no token (breaking change 11): `flex['column']` on the brand column, `flex['column' 'gapDetails']` on the `ul` of the menu; an icon keeps its own size and color |
| `footer-legal` | padding 60px; a logo on the left, full width below 800px of screen; text, links and buttons 1.3rem | padding `--padding-groups`, wrapping; a logo centered with the rest, full width below 800px of the legal section (container query); text, links and buttons (`--button-size`) at `--footer-legal-fontSize` (1.3rem) |

### New (opt-in)

- `pgs="main pageShell"` on one element.
- `pageShell['shellNested']`: no padding on the sides (`--pageShell-paddingInline: 0`), for a shell inside a section or another element with its own.
- `logo['logoFooter']`: `--logo-height: 200px`, square image box, text at 4rem (`--logo-text-fontSize`).
- `--page-bottom` (`7lvh`), the room at the bottom of the page.
- `footer` variables: `--footer-color-hover` (`--color-link`), `--footer-paddingBlock` (`calc(var(--gap-sections) / 3)`), `--footer-title-fontSize` (`2rem`), `--footer-borderColor` (`--color-boxDark-transparent`), `--footer-legal-fontSize` (`1.3rem`, also the size of its buttons); `--footer-background` takes an image too.

## Buttons

### Silent changes

| what | 5.0.8 | now |
| --- | --- | --- |
| `btnVertical` icon | 1.2em (drawn at about 1.44em) | 1.45em, the same size on screen |
| `--button-gap` | a third of `--button-size` | half of `--button-size` |
| `btnText` side padding | `padding-inline: var(--button-paddingBlock)`, written as a property, so a `--button-paddingInline` of the project did nothing | `--button-paddingInline: 0px`: the label and its bottom edge are as wide as the text; set `--button-paddingInline` to give it room again |
| `btnForHeader` border | no border style (`--button-borderStyle: unset`) | keeps the border of the button: add `btnTransparent` or `btnText` to a header button that should have none |
| `btnForNavSmart` with `aria-expanded="true"` | documented as current, drawn as a plain item | the current look, as for `aria-current="page"`: the item whose panel is open is highlighted |

### New (opt-in)

- `button['btnIconBoth']`, for an icon on each side of the label: the short padding (`--button-paddingInline-short`) on both sides.

## Forms

### Silent changes

| what | 5.0.8 | now |
| --- | --- | --- |
| `label` | white box with a border, rounded on every corner | plain text in `--label-color`, `--label-fontSize` 1.1em, `--label-weight` bold. The box is `label['labelBox']` (on one line with an ellipsis) |
| `pgs="legend"` | the same box as `label` | the same as `label` under its own token, options included: `legend['labelBox']`, `legend['labelTab']` |
| label to control | `margin-bottom` plus the form gap when the two were siblings | always `--label-gap` (`--gap-details`), in a wrapper, a div, or next to it in a `form` / `fieldset` / `flex['column']`; `labelTab` sets it to 0 in every context, and `labelTabNoGap` is only its deprecated alias |
| `--label-background` | read by every label | read only by `labelBox` and `labelTab*` |
| required asterisk | a label was marked by any required control after it | only by its own control (the one right after it, or inside the element right after it); a `legend` still reads the whole group |
| label hidden with its control | hidden when anything inside it was `hidden` (an icon, a span) | hidden only when the control inside it or right after it is |
| `textarea` | bottom-right radius 40px | the radius of an input on every corner |
| `range` | `--range-size` `--borderRadius-texts` | `--range-size` 2.0rem: the track is the rail of a toggle and the thumb is the toggle's (grows 20% on hover; the toggle thumb grows 20% too, was 40%) |

### New (opt-in)

- `selectBox`: a `<select>` wrapped in `pgs="selectBox"` gets a button and a list of its own, the same in every
  browser (combobox / listbox, keyboard of a native select, typeahead, optgroups, `multiple`); the select stays in
  the form with its value. API `pgs.selectBox.init/api`, `open()`, `close()`, `toggle()`, `isOpen()`, `update()`,
  `destroy()`, `refresh()`; event `pgs:selectBox:change`; `--selectBox-icon`, `--selectBox-timing`. An option draws
  what its `<template>` holds before its text. Options in its bracket: `selectBoxSearch`, `selectBoxChips`,
  `selectBoxCollapse`; in `pgs-data`: `selectBoxMax[n]`, `selectBoxSearchPlaceholder[text]`,
  `selectBoxNoResults[text]`, `selectBoxChipRemove[text]`. `pgs.selectBox` ships in the `formAddon` module, so a
  `mypgs.config.json` lists `formAddon` to have it.
- `label['labelBox']`, `legend['labelBox']`.

## Search, selectBox and listbox

The suggestions of `search` and the options of `selectBox` are a `listbox`, also usable by hand, always with the
same shape: the box `listbox`, the list in it `listbox-list` (role listbox, the part that scrolls) with
`listbox-list-option` and `listbox-list-group`, and `listbox-message` in the box under the list. `--listbox-*` set
once on `[pgs~="listbox"]` change every list. One behavior too: `pgs.listbox.attach(list, settings)`, which search
and selectBox use (keys, pointer, opening, placing, closing).

| 5.0.8 | now |
| --- | --- |
| `--search-suggestions-item-background-selected` / `-color-selected` | `--listbox-list-option-background-selected` / `--listbox-list-option-color-selected` |
| `--search-suggestions-item-background-hover` / `-color-hover` | `--listbox-list-option-background-active` / `--listbox-list-option-color-active` |
| `--search-suggestions-offset` / `-maxHeight` / `-padding` | `--listbox-offset` (`0px`) / `--listbox-maxHeight` (`30rem`, was `70vh`) / `--listbox-padding` (`calc(var(--padding-details) / 2)`, also the gap between the options, `--listbox-gap`) |
| `--search-suggestions-item-padding` | `--listbox-list-option-padding` (`var(--padding-details) var(--padding-paragraphs)`) |

Silent changes and new features of `search`:

- The bar has a border by default: `--search-borderWidth` (`--border-width`) and `--search-borderColor`; the
  suggestions take the same border on the sides and at the bottom. Set `--search-borderWidth: 0` for none.
- A search without a submit button pads its input inline (`--search-paddingBlock`).
- An object item can carry its own icon as markup (`icon`), shown before its label in place of
  `searchIconSuggestion`.
- The keys are those of every listbox: the arrows and Page Up / Page Down stop at the first and the last suggestion
  (they no longer wrap), disabled and hidden ones are skipped, Home and End stay with the text; a click chooses (was
  a pointer down); the focus moving to another element of the page closes the list.
- `instance.panel` (the box), `instance.listbox` (its controller).

## Content components

### Silent changes

| what | 5.0.8 | now |
| --- | --- | --- |
| `dropdown` | an arrow by default | no arrow; `drpArrow` (breaking change 4) |
| `menu` floating submenu | a dropdown with no arrow | `dropdown['drpArrow']`: the arrow points back at the toggle of the item |
| `menu` item with a submenu that opens in place | a wrapping flex row (`row`): an open submenu widened a dropdown by its own width | a grid, the link and the toggle on the first row, the submenu across the next one: the item is as wide as its widest row |
| `menu` submenus | shown open until the module ran, the menu as wide as all of them for a moment | hidden from the first paint while their item is neither a `dropdown` nor open; without JavaScript they stay hidden and the item's own link still leads to its page |
| `table` | zebra and hover by default | plain base (breaking change 5); `tableBordered` draws a line round every cell and round the table, radius `--borderRadius-paragraphs` |
| `steps` | the last circle highlighted | every circle the same; `steps['stepsLastHighlight']` for the old look; the content is at least the circle plus `5rem` tall |
| `steps` circle | `--color-primary-soft` behind it, the number in the text color, the icon black; `--steps-circle-color` was the background | the current state: `--steps-step-circle-background` (`--current-background`) and `--steps-step-circle-color` (`--current-color`) for the number and the icon. A `--steps-circle-color` set by a project was the background: move it to `--steps-step-circle-background` (breaking change 14) |
| `stepTabs` dots | completed: `--color-primary-soft` / `--color-primary-strong`; active: `--current-*`, the icon `--color-whiteFixed` | the button's own state colors: active `--button-*-current`, completed `--button-*-twoState`; the icon takes the color of the dot |
| `accordion` open | a box with a background | keeps the divider lines, no background or radius; `accordion['accOpenBox']` (or on `accordionContainer`) for the box; the lines next to an open accordion fade out |
| `badge` | weight `--font-weight-title` (800) | 600 |
| `modal` page lock | `overflow: clip` on an `<html>` with `htmlBase` while a modal is open | `overflow: hidden` on the html while a modal is open, and the width of its scrollbar as `padding-right` (`--_modal-scrollbarWidth`, measured by the JavaScript), so the page does not move and the backdrop covers the whole screen |
| `modal` look | (none) | the scrollbar of `modal-dialog-content-scroll` runs along the right edge of the panel; `--modal-borderRadius` is `--borderRadius-details` + `--modal-dialog-content-padding`; the generated close button has `background['bgBackground']` |
| `modal-close` | only the first one closed the modal | every `modal-close` of the modal closes it; a button that is both `modal-button` and `modal-close` toggles |
| `slides` dots | (none) | spaced by `--gap-details`, pointer cursor |
| `slides-dots` written by hand | its children took the layout of the row but no dot shape and no active color | every child of the row is drawn as the dots of the generated row |
| `menu` generated toggle | an icon with no name | `aria-label` "Show the submenu of" + the text of its link; the icon is `aria-hidden` |
| `stepTabs` `instance.next()` | went on past a step marked `locked` | stops on it, like the next button |
| `toastLoad` / `notificationLoad` with no `title` | an empty title, the title of the type lost | the title of the type (Error, Success, ...) |
| `summary-button` with no `type` in a form | submitted the form | `type="button"` is set |
| `card` written on an `<a>` | `display: block`, so `cardHorizontal` never laid out as a row | a flex column like any other card |
| `card` written on an `<a>`, hover | the background and the text changed, the border did not | the border takes `--hover-borderColor` too, as a box on an `<a>` does |
| `dropdown-content` | a nested one was positioned by the JS but never shown by the CSS | only a direct child of `dropdown` is its content; a nested one is skipped with a warning |
| `dropdown` left / right that flips for lack of room | the pgs-state kept the side asked for, the `drpArrow` pointed away | the state of the side it ended on (`sideLeft` / `sideRight`) |
| `accordion` on a native `<button>` | `role="button"` and `tabindex="0"` added | added only to a trigger that is not a `<button>` |
| alert close (`toast`, `notification`, `alertContainer`) | removed at once | fades out in 300ms (none under `prefers-reduced-motion`) |
| `toast` container written by hand | no live region | `aria-live="polite"` and `aria-relevant="additions"` unless it has its own |
| `listbox` / `selectBox` `destroy()` | left `aria-hidden`, `aria-expanded` and the `tabindex` of the select behind | removes what it wrote and gives the select back its own `tabindex` |
| `--steps-*` | declared on every `steps-step`, so a value set on the list did nothing | declared on the `ol`: a value on the list reaches every step, one on a step changes that step |
| `table['tableBordered']` | `border-collapse: collapse`, the radius never showed | `border-collapse: separate; border-spacing: 0`, each cell draws its right and bottom line, the corners round; CSS of a project that drew borders per cell needs a look |
| `modal-dialog-content-header` followed by `modal-dialog-content-scroll` | a `margin-bottom` under the header | the room is the `padding-top` of the scroll, so the text scrolls up to the border of the header; the same spacing at rest |
| `--search-border` | declared, never read | gone: `--search-borderWidth` and `--search-borderColor` |
| `stepTabs` steps | focused only when the markup gave them `tabindex="-1"` | the module adds `tabindex="-1"` where there is none (and removes it on `destroy()`); the current dot carries `aria-current="step"` |
| `pgs.modal.api(el).button` of a modal with no button of its own | could be the `modal-button` of a modal written inside its dialog | `null` |
| `search` with `searchOnFocus` | choosing a suggestion opened the list again | the list stays closed after a choice |

### New (opt-in)

- `modal-dialog-content-footer`: the actions under the part that scrolls, always in view.
- `accordion['accOpenBox']`, `steps['stepsLastHighlight']`, `table['tableStriped' 'tableHover' 'tableBordered']`,
  `dropdown['drpArrow']`.
- `buttonGroup`: a set of buttons on a background of its own with a hairline between them, for a toolbar, a
  segmented choice or the list of a menu (`<ul pgs="buttonGroup['btgVertical' 'btgFill']">` inside a vertical
  `menu`, plain `buttonGroup` in a `menuHorizontal`); `btgVertical`, `btgFill`, `--buttonGroup-*`; a child with
  `aria-pressed="true"` takes the checked colors of a two-state button. CSS only, a part of `assets/modules.json`.
- `pageNav['pageNavDrillDown']`: while a `pageShell` stacks its sidebar (or on a screen up to 900px without one),
  the list is the first screen and a panel opens on its own, with `pageNav-back`; `pageNav-home` marks what hides
  with the list. The root carries the state `home` while the URL names no panel, and `pgs:pageNav:change` has
  `detail.home`.
- `pgs-data="pageNavHash[name]"` on a panel: the browser never scrolls to it on load.
- `pagination` (`pagination-item`, `pagination-ellipsis`): the links to the pages of a list split in several
  pages, written as buttons; the current one carries `aria-current="page"`.
- `rating` (`rating-star`): a score drawn as a row of stars (`--rating-value`, `--rating-max`); `rating['ratingInput']`
  makes it a fieldset of radios to choose a score. `icon-star` is a core glyph for it.
- `listbox`: the list of options of search and selectBox, usable by hand (`pgs.listbox.attach(list, settings)`),
  its own module in `assets/modules.json`. -> see [Search, selectBox and listbox](#search-selectbox-and-listbox)

## JavaScript core

| what | 5.0.8 | now |
| --- | --- | --- |
| `pgs(el).value = null`, `pgs(el).state.value = null` | wrote the string `"null"` | remove the attribute, as `pgs(el).data.value = null` does |
| `header['headerScroll']` | a header hidden by the scroll stayed hidden once the window grew past 900px; `destroy()` left the transform | it comes back above 900px; `destroy()` removes the transform and `hiddenByScroll` |
| `pgs.header.api(el).destroy()`, `pgs.navSmart.api(el).destroy()` | a destroyed header or bar still in the page kept `--_header-height*` / `--_navSmart-height*` | another one takes them over, or they go to 0px |
| `--_header-height`, `--_navSmart-heightScroll` before the JS runs | 6.8rem / 8.9rem even with `header` / `navSmart` left out of the build | 0px when the module is left out (`$pgs-exclude`) |
| `pgs.helper.roots(root, token, scope?)` | a comma-separated token string never matched the root; the error always named `helper.init` | the root is matched too; the error names the scope passed (default `helper.roots`) |
| `pgs.helper.watchDocument(...).disconnect()` | a callback already queued for the next frame still ran | it is cancelled |
| `formValidate` checkbox group | only the boxes marked `required` made the group: a box of the same name without `required` was ignored, even when it was the one checked | one required box makes the whole group (every enabled box of its name) required, and any checked box of it passes, as for radios |
| `formValidate` error of a field | cleared only by a click on the field | cleared by a click, a keystroke (`input`) or a change (a select, a file picker, the keyboard on a checkbox) |
| `new pgs.helper.formValidate(form, { message })` with an invalid `message` | threw after the form had been changed | throws before touching the form |
| `index.d.ts` | `pgs.helper`, `pgs.darkmode`, `pgs.svg` optional | required, as they always are |

## Packaging and build

- A project that compiles the sources can keep only the components it uses: `mypgs.config.json`
  (`{ "include": [...] }`, names in `assets/modules.json`), read by the new export `mypgs/build` (`pgsModules()`:
  `alias` for webpack `resolve.alias`, `sass` for `sass-loader` `additionalData`, `vite()` for Vite). What a
  listed part requires is added; without the file everything is in, as before.
- Each module is registered from its own file in `assets/javascript/modules/`, and `index.scss` loads each part
  only when `$pgs-exclude` does not list it (default `()`). A project that imports `index.scss` or `"mypgs"` sees
  no difference.
- With `meta.load-css`, the exclusion reaches the library only through `$with`: write
  `$pgs-exclude: () !default;` and `@include meta.load-css("mypgs/assets/scss/index.scss", $with: ("pgs-exclude": $pgs-exclude));`
  (see the README). A plain `load-css` loads every part whatever the config says.

## Sweep

Run each over the consuming project (markup, PHP, SCSS, JS).

```sh
# 1 dark mode switch renamed. Hit: toggleDarkmode -> darkmodeToggle (also the -light / -dark children)
grep -rn 'toggleDarkmode' .

# 2 the texts step (deprecated until 7). Hit: Texts -> Paragraphs, --*-texts -> --*-paragraphs
grep -rnE "(gap|mg|pd|rad|mg(Tp|Rt|Bt|Lt|Bl|In)|pd(Tp|Rt|Bt|Lt|Bl|In))Texts|--(gap|padding|margin|borderRadius|SIZE)-texts" .

# 3 labels and legends that should stay boxes. Hit: add label['labelBox'] / legend['labelBox'] where the box is wanted
grep -rnE 'pgs(=\\?["'"'"']|\()[^"'"'"']*\b(label|legend)\b' .

# 4 dropdown arrow. Hit: delete drpNotArrow; add drpArrow where an arrow is wanted
grep -rn "drpNotArrow\|pgs=\"[^\"]*dropdown" .

# 5 tables. Hit: add table['tableStriped' 'tableHover'] where the zebra and the hover are wanted
grep -rnE 'pgs(=\\?["'"'"']|\()[^"'"'"']*\btable\b' .

# 6 pageShell room. Hit: write pgs="main pageShell" or wrap the shell in a main; drop the removed variables
grep -rnE 'pgs(=\\?["'"'"']|\()[^"'"'"']*pageShell|--pageShell-(offsetTop|paddingBottom|asideScroll-top|asideScroll-maxHeight)' .

# 7 search suggestions variables. Hit: rename to --listbox-* (table above)
grep -rn -- '--search-suggestions-' .

# 8 legend() mixin. Hit: @include label()
grep -rn '@include legend' .

# 9 slides arrows renamed. Hit: _slides-prev -> _slides-arrows-prev, _slides-next -> _slides-arrows-next
grep -rnE '_slides-(next|prev)' .

# 10 pageNav panels and selectors. Hit: add pgs-data="pageNavHash[name]"; write :is([pgs~="pageNav"], [pgs*="pageNav["])
grep -rn 'pageNav' .

# 11 footer columns without a token. Hit: drop footer-top-content, footer-brand and footer-content; lay the row
# out with flex['row' 'column-3'] and a column with flex['column']; add logo['logoFooter'] to the logo of the brand
# that should stay big and flex['column' 'gapDetails'] to the ul of a menu
grep -rnE 'footer-(top-content|brand|content)' .

# 12 search suggestions as a box. Hit: write search-suggestions as a <div>; _search-suggestions-item ->
# _search-suggestions-list-item; _search-suggestions-placeholder / -empty -> _search-suggestions-message;
# state selected -> active
grep -rn 'search-suggestions' .

# 13 headerCompactBottom removed. Hit: delete it, or write headerBottom for a header at the bottom
grep -rn 'headerCompactBottom\|--header-compactBottom-active' .

# 14 renamed custom properties. Hit: the new name in the table "Renamed custom properties"; a --steps-circle-color
# of the project was the background of the circle: it becomes --steps-step-circle-background
grep -rnE -- '(--dropdown-inline-size|--label-size|--badge-textSize|--breadcrumb-size|--logo-textSize|--footer-titleSize|--flex-flexValue|--modal-content-padding|--modal-footer-gap|--steps-circle-background|--steps-circle-color|--steps-circle-size|--steps-line-color|--steps-line-size|--range-background-thumb-hover|--range-background-thumb|--range-background-progress|--range-thumbWidth|--menu-gap-row|--menu-gap-column|--slides-sizeMaskImage|--pageShell-asideShadow-sizeMaskImage|--slides-arrowSize|--slides-arrowsSpace|--selectBox-chips-item-removeIcon|--pagination-justify|--alert-iconSize|--badge-iconSize|--checkbox-iconSize|--listbox-list-option-iconSize|--navSmart-iconSize|--select-chevronSize|--select-chevronInset|--navSmart-itemHeight|--navSmart-itemMinWidth|--navSmart-edgeHomeIndicator|--navSmart-edgePWA|--checkbox-borderStyleWidth|--radio-borderStyleWidth|--toggle-borderStyleWidth|--card-horizontal-borderRadius-item|--card-borderRadius-item|--card-horizontal-content-grow|--card-horizontal-img-grow|--card-horizontal-img-minHeight|--label-left|--checkboxRadio-labelColor)([^a-zA-Z-]|$)' .

# 15 focus() mixin. Hit: delete it (the ring is already there), or @include focusRing() inside a :focus-visible rule
grep -rn '@include focus\b\|@include focus(' .

# steps. Hit: add steps['stepsLastHighlight'] to keep the highlighted last circle
grep -rnE 'pgs(=\\?["'"'"']|\()[^"'"'"']*\bsteps\b' .


# accordion. Hit: add accordion['accOpenBox'] (or on accordionContainer) to keep the open box
grep -rnE 'pgs(=\\?["'"'"']|\()[^"'"'"']*\baccordion(Container)?\b' .
```
