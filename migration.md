# Migrating from 5.0.0 to the next version

This guide is the net difference between `mypgs` 5.0.0 and the next release, written for whoever updates a
project that consumes it (a theme, a plugin, a site). For each change it says what 5.0.0 had and what to write
or expect now. Names from the work in between never appear: a name in the "5.0.0" column is one 5.0.0 really
had, a name in the "now" column is one this version really has.

The **since** column says which release brought the change. 5.0.1 to 5.0.8 are already published, so a project
that is on 5.0.8 only needs the rows marked **next**; one that is still on 5.0.0 needs all of them.

The guide for moving from 4.x (`master`, 4.7.1) to 5.0.0 is the `migration.md` of the `v5.0.0` tag.

## How to use it

1. **Do the breaking changes first** ([list below](#breaking-changes)): each one has a `grep` in the
   [Sweep](#sweep) that finds it.
2. **Read the silent changes of each area you use.** The name stayed and the look or the behavior moved under it,
   so nothing errors and the page just looks different.
3. **Open the pages.** Headings, labels, tables, dropdowns and the spacing scale look different by default.

Reading the tables: a flag is written inside the bracket of the component that owns it, `pgs="label['labelBox']"`.
`(none)` in the "5.0.0" column means the thing is new. `-> see` points to the section that owns the item.

## Breaking changes

| # | 5.0.0 | now | since |
| --- | --- | --- | --- |
| 1 | `toggleDarkmode`, `toggleDarkmode-light`, `toggleDarkmode-dark` | `darkmodeToggle`, `darkmodeToggle-light`, `darkmodeToggle-dark`; the options keep their names (`darkmodeToggle['tglLabeled']`). The old name does nothing any more | next |
| 2 | the `texts` step: `gapTexts`, `mgTexts`, `mgTpTexts`, `pdTexts`, `radTexts`, ..., `--gap-texts`, `--padding-texts`, `--margin-texts`, `--borderRadius-texts`, `--SIZE-texts` | the `paragraphs` step: `gapParagraphs`, `mgParagraphs`, `--gap-paragraphs`, ..., same value (1.5rem). The old names still work as deprecated aliases (`base/_deprecated.scss`) until version 6, but overriding an old `--*-texts` property no longer changes the library: override `--*-paragraphs` | next |
| 3 | `$big-mobile`, `$big-tablet`; `hideMedia*BigMobile`, `hideMedia*BigTablet`, `hideContainer*BigMobile`, `hideContainer*BigTablet`; `header['headerCompactBigMobile']`, `['headerCompactBigTablet']` | `$phablet`, `$notebook`; `hideMediaDownPhablet`, `hideMediaUpNotebook`, ...; `headerCompactPhablet`, `headerCompactNotebook`. No aliases | 5.0.2 |
| 4 | `--header-size` (4.4rem) | gone: a button of the header sets no height, the logo is `--logo-height` (4.6rem everywhere). A theme that read `var(--header-size)` declares its own value | 5.0.2 |
| 5 | `new pgs.helper.formValidate(form, { typeNotice: "alert" \| "toast" })` | `typeNotice` is ignored: the messages are an alert when the form holds a `pgs="alertContainer"` (or `alertContainer` is passed), a toast when it does not. A form that relied on the default `"alert"` needs an `alertContainer` in its markup | 5.0.3 |
| 6 | `label` and `pgs="legend"`: a white box with a border | plain text above the control. The box is `label['labelBox']` / `legend['labelBox']` -> see [Forms](#forms) | next |
| 7 | every dropdown drew an arrow; `dropdown['drpNotArrow']` removed it | no arrow by default; `dropdown['drpArrow']` draws it. `drpNotArrow` is gone (just delete it) | next |
| 8 | `table`: zebra rows and row hover by default | header background and a line under each row only; `table['tableStriped']`, `['tableHover']`, `['tableBordered']` add the rest | next |
| 9 | `pageShell` with its own vertical room (`--pageShell-offsetTop`, `--pageShell-paddingBottom`), sticky sidebar at `--pageShell-asideScroll-top` | the shell has no room above or below of its own: write `pgs="main pageShell"` or put it in a `main`. Those three variables and `--pageShell-asideScroll-maxHeight` are gone -> see [Layout](#layout) | next |
| 10 | `--search-suggestions-*` custom properties | the list of suggestions is a `listbox`: `--listbox-*` -> see [Search, selectBox and listbox](#search-selectbox-and-listbox) | next |
| 11 | `@include legend()` | gone: `[pgs~=legend]` takes `label()` itself, options included | next |
| 12 | the generated slides arrows were children of `slides` | they live in a `_slides-arrows` wrapper: a selector `[pgs~="slides"] > [pgs~="_slides-next"]` stops matching (a descendant selector still works) | 5.0.6 |
| 13 | a `pageNav` panel addressed by its `id` | addressed by `pgs-data="pageNavHash[name]"` (the id still works as a fallback); the root takes a bracket, so a project selector on it is `:is([pgs~="pageNav"], [pgs*="pageNav["])` | next |

## Foundation

### Silent changes

| what | 5.0.0 | now | since |
| --- | --- | --- | --- |
| breakpoint values | `$watch` 315px, `$big-mobile` 615px | `$watch` 320px, `$phablet` 600px (`$mobile` 430, `$tablet` 800, `$notebook` 900, `$laptop` 1100 unchanged): a screen 316-320 or 601-615 wide now falls in the other class of `column-N`, `pageShell`, `hide` and `headerCompact` | 5.0.2 |
| headings | weight 900 (`--heading-weight`) | `--heading-weight` = `--font-weight-title`, 700 | next |
| `--font-weight-title` | 800 | 700 (also the `heading()` mixin default `$weight`) | next |
| `bodyText` plain `<a>` | `--color-link`, underlined, everywhere | the link color and the underline only inside a `<p>` or `pgs="text"`; elsewhere the text color, no underline. An `<a>` with a `pgs` token takes the color of its component | 5.0.2 |
| `bodyText` list items | `line-height: normal` | `line-height: var(--text-lineHeight)` (1.5), so a menu or a nav built on `<ul>` may grow a little | next |
| `textBlock` headings, `list()` indent | 25px | `--margin-elements` (30px) | next |
| `--icon-size` in em | counted twice (1.25em drew 1.56em) | counted once; `iconMedium` is 1.5em and `iconLarge` 2.25em, so they draw as before, but a custom `--icon-size` in em now draws smaller | next |
| `hamburgerTwo` glyph | bars almost touching | bars spaced like the two layers of the duo icon | next |

### Renames and removals

| 5.0.0 | now | since |
| --- | --- | --- |
| `toggleDarkmode*` | `darkmodeToggle*` (breaking change 1) | next |
| the `texts` step | the `paragraphs` step (breaking change 2) | next |

### New (opt-in)

- The `details` step, 0.75rem: `gapDetails`, `mgDetails`, `pdDetails`, `radDetails`, `--gap-details`,
  `--padding-details`, `--margin-details`, `--borderRadius-details`, `--SIZE-details`; for the space between small
  pieces of text in a row, such as an icon and its label. Also `radSections` / `--borderRadius-sections`. (next)
- Dark mode that follows the operating system (next):
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

| what | 5.0.0 | now | since |
| --- | --- | --- | --- |
| `pageShell` vertical room | `padding-top: var(--pageShell-offsetTop)`, `padding-bottom: var(--pageShell-paddingBottom)` on the shell | none; `main` gives it: `pgs="main pageShell"` on the same element (`--main-paddingTop/-paddingBottom` stay), or the shell inside a `main`. A shell at the top of the page with no `main` starts under the header | next |
| `pageShell['shellAsideScroll']` | sticky at `--pageShell-asideScroll-top` (default `--_header-height`), shell top moved to the content | sticky right under the header (`top: var(--_header-height)`); on `main pageShell` it climbs into main's top padding and gives it back as its own `padding-top`, so its content stays level with the content; no variable of its own | next |
| `pageShell['shellAsideShadow']` | a mask on both edges | a mask `--pageShell-asideShadow-sizeMaskImage` tall that follows the scroll: at the top only once scrolled, at the bottom only while there is more below, none on a sidebar that does not scroll (Firefox: only the bottom one) | next |
| `pageShell-content` | not a container | a container (`@container` rules inside it measure it) | 5.0.2 |
| `pageShell` content of a sticky-aside shell | `min-height: 100dvh` | no forced height | next |
| `main` bottom room | `--page-top` | `--page-bottom` (`7lvh`) | next |
| buttons of the header (`btnForHeader`) | `min-height: var(--header-size)` | no height: as tall as the content; give `min-height` yourself where the header needs it | 5.0.2 |
| logo | 4.4rem in a header, 6rem outside | `--logo-height: calc(var(--SIZE) + var(--font-size-text))` (4.6rem) everywhere; set `--logo-height` on the logo itself | 5.0.2 |
| logo of `footer-brand` | resized by the footer (`aspect-ratio: 1; height: 200px`) | not resized: write `logo['logoFooter']` for the big footer logo | next |
| links of `footer-top` | `--color-primary-strong`, bold, underlined on hover | `--footer-color`, bold, underlined on hover; an icon in a footer menu link keeps its own size and color, spaced by `--gap-details` | next |
| `navSmart` items | fixed width `--navSmart-itemMinWidth`; icon 2.2rem, item 4.9rem | `--navSmart-itemMinWidth` or as wide as the label, shrinking toward the label when the bar does not fit the screen; icon `--navSmart-iconSize` 2.8rem, item `--navSmart-itemHeight` 5.5rem; the bar distance is capped at the home indicator | 5.0.3 - 5.0.6 |
| `slides` track | `--page-padding` inline padding and `--page-edge` margins | no padding or margin of its own (inside a section it is not needed); `slides['slidesEdge']` for slides as wide as the screen | 5.0.4 - 5.0.5 |
| `slides` arrows | in a row above the slides | at the top right above the slides, out of the flow, in the `_slides-arrows` wrapper, with the room kept above the track from the first paint (`--slides-arrowsSpace`) | 5.0.5 - 5.0.6 |
| `slides` dots | | spaced by `--gap-details`, pointer cursor | next |

### New (opt-in)

- `pgs="main pageShell"` on one element. (next)
- `pageShell['shellNested']`: no padding on the sides (`--pageShell-paddingInline: 0`), for a shell inside a section or another element with its own. (next)
- `slides['slidesEdge']`. (5.0.5)
- `logo['logoFooter']`: `--logo-height: 200px`, square image box, text at 4rem (`--logo-textSize`). (next)
- `--page-bottom` (`7lvh`), the room at the bottom of the page. (next)

## Buttons

| what | 5.0.0 | now | since |
| --- | --- | --- | --- |
| `btnIconOnly` | 50 x 50 (38 with `btnMini`) | 48 x 48 (36), a square in Safari too | 5.0.2 |
| `btnVertical` icon | 1.2em (drawn at about 1.44em) | 1.45em, the same size on screen | next |
| `--button-gap` | a third of `--button-size` | half of `--button-size` | next |
| `buttonForNavSmart()` | included `buttonVertical()` | writes its own column layout; the item width is the bar's | 5.0.7 |

## Forms

### Silent changes

| what | 5.0.0 | now | since |
| --- | --- | --- | --- |
| `label` | white box with a border, rounded on every corner | plain text in `--label-color`, `--label-size` 1.1em, `--label-weight` bold. The box is `label['labelBox']` (on one line with an ellipsis) | next |
| `pgs="legend"` | the same box as `label` | the same as `label` under its own token, options included: `legend['labelBox']`, `legend['labelTab']` | next |
| label to control | `margin-bottom` plus the form gap when the two were siblings | always `--label-gap` (`--gap-details`), in a wrapper, a div, or next to it in a `form` / `fieldset` / `flex['column']`; `labelTab` sets it to 0 in every context, and `labelTabNoGap` is only its deprecated alias | next |
| `--label-background` | read by every label | read only by `labelBox` and `labelTab*` | next |
| required asterisk | a label was marked by any required control after it | only by its own control (the one right after it, or inside the element right after it); a `legend` still reads the whole group | next |
| `textarea` | bottom-right radius 40px | the radius of an input on every corner | next |
| `range` | `--range-size` `--borderRadius-texts` | `--range-size` 2.0rem: the track is the rail of a toggle and the thumb is the toggle's (grows 20% on hover; the toggle thumb grows 20% too, was 40%) | next |

### New (opt-in)

- `selectBox`: a `<select>` wrapped in `pgs="selectBox"` gets a button and a list of its own, the same in every
  browser (combobox / listbox, keyboard of a native select, typeahead, optgroups, `multiple`); the select stays in
  the form with its value. API `pgs.selectBox.init/api`, `open()`, `close()`, `toggle()`, `isOpen()`, `update()`,
  `destroy()`, `refresh()`; event `pgs:selectBox:change`; `--selectBox-icon`, `--selectBox-timing`. An option draws
  what its `<template>` holds before its text. (next)
- `label['labelBox']`, `legend['labelBox']`. (next)

### JavaScript

- `formValidate`: `typeNotice` is gone (breaking change 5). (5.0.3)

## Search, selectBox and listbox

The suggestions of `search` and the list of `selectBox` are a `listbox` (`listbox`, `listbox-option`,
`listbox-group`, also usable by hand); `--listbox-*` set once on `[pgs~="listbox"]` change every list. (next)

| 5.0.0 | now | since |
| --- | --- | --- |
| `--search-suggestions-item-background-selected` / `-color-selected` | `--listbox-option-background-selected` / `--listbox-option-color-selected` | next |
| `--search-suggestions-item-background-hover` / `-color-hover` | `--listbox-option-background-active` / `--listbox-option-color-active` | next |
| `--search-suggestions-offset` / `-maxHeight` / `-padding` | `--listbox-offset` (`0px`) / `--listbox-maxHeight` (`30rem`, was `70vh`) / `--listbox-padding` (`calc(var(--padding-details) / 2)`, also the gap between the options, `--listbox-gap`) | next |
| `--search-suggestions-item-padding` | `--listbox-option-padding` (`var(--padding-details) var(--padding-paragraphs)`) | next |

Silent changes and new features of `search`:

- The bar has a border by default: `--search-borderWidth` (`--border-width`) and `--search-borderColor`; the
  suggestions take the same border on the sides and at the bottom. Set `--search-borderWidth: 0` for none. (next)
- The focus ring surrounds the suggestions too. (5.0.6)
- A search without a submit button pads its input inline (`--search-paddingBlock`). (next)
- An object item can carry its own icon as markup (`icon`), shown before its label in place of
  `searchIconSuggestion`. (next)

## Content components

### Silent changes

| what | 5.0.0 | now | since |
| --- | --- | --- | --- |
| `dropdown` | an arrow by default | no arrow; `drpArrow` (breaking change 7) | next |
| `table` | zebra and hover by default | plain base (breaking change 8); `tableBordered` draws a line round every cell and round the table, radius `--borderRadius-paragraphs` | next |
| `steps` | the last circle highlighted | every circle the same; `steps['stepsLastHighlight']` for the old look; the content is at least the circle plus `5rem` tall | next |
| `accordion` open | a box with a background | keeps the divider lines, no background or radius; `accordion['accOpenBox']` (or on `accordionContainer`) for the box; the lines next to an open accordion fade out | next |
| `badge` | weight `--font-weight-title` (800) | 600 | next |
| `modal` page lock | `overflow: clip` on an `<html>` with `htmlBase` while a modal is open | the page is not locked: the html only gets the pointer cursor, and the dialog and `modal-dialog-content-scroll` keep the wheel (`overscroll-behavior: contain`) | next |
| `modal` look | | the scrollbar of `modal-dialog-content-scroll` runs along the right edge of the panel; `--modal-borderRadius` is `--borderRadius-details` + `--modal-content-padding`; the generated close button has `background['bgBackground']` | next |
| `modal` Escape and stacking | | Escape closes a modal that is not `dialogTopLevel`; opening a modal closes only the other library modals, never the one it is written inside (a nested modal opens over its parent); a `modal-button` that is an `<a href>` no longer follows the link; the clicks are no longer stopped (`stopImmediatePropagation` removed), so delegated listeners hear them; `dialogHistory` replaces the entry on close | 5.0.7 |
| `modal` focus | | the focus returns to the `modal-button` on close (Safari too); a `tabindex` written by hand keeps its focus ring | 5.0.7 |
| `modal-close` | only the first one closed the modal | every `modal-close` of the modal closes it; a button that is both `modal-button` and `modal-close` toggles | next |
| `slides` focus | | `slide.focus()` after an arrow, a dot or `goTo` only when the focus was already inside the track | 5.0.7 |

### New (opt-in)

- `modal['modalSheet']`: a bottom sheet in one option (the width of `dialogSmall`, centered, round at the top,
  pulled down to close, over the navSmart bar and the header). It keeps a size, an animation or a container
  written next to it. (5.0.7 - 5.0.8)
- `modal-dialog-content-footer`: the actions under the part that scrolls, always in view. (next)
- `accordion['accOpenBox']`, `steps['stepsLastHighlight']`, `table['tableStriped' 'tableHover' 'tableBordered']`,
  `dropdown['drpArrow']`. (next)
- `buttonGroup`: a set of buttons on a background of its own with a hairline between them, for a toolbar, a
  segmented choice or the list of a menu (`<ul pgs="buttonGroup['btgVertical' 'btgFill']">` inside a vertical
  `menu`, plain `buttonGroup` in a `menuHorizontal`); `btgVertical`, `btgFill`, `--buttonGroup-*`; a child with
  `aria-pressed="true"` takes the checked colors of a two-state button. CSS only, a part of `assets/modules.json`.
  (next)
- `pageNav['pageNavDrillDown']`: while a `pageShell` stacks its sidebar (or on a screen up to 900px without one),
  the list is the first screen and a panel opens on its own, with `pageNav-back`; `pageNav-home` marks what hides
  with the list. The root carries the state `home` while the URL names no panel, and `pgs:pageNav:change` has
  `detail.home`. (next)
- `pgs-data="pageNavHash[name]"` on a panel: the browser never scrolls to it on load. (next)

## Packaging and build

- A project that compiles the sources can keep only the components it uses: `mypgs.config.json`
  (`{ "include": [...] }`, names in `assets/modules.json`), read by the new export `mypgs/build` (`pgsModules()`:
  `alias` for webpack `resolve.alias`, `sass` for `sass-loader` `additionalData`, `vite()` for Vite). What a
  listed part requires is added; without the file everything is in, as before. (next)
- Each module is registered from its own file in `assets/javascript/modules/`, and `index.scss` loads each part
  only when `$pgs-exclude` does not list it (default `()`). A project that imports `index.scss` or `"mypgs"` sees
  no difference. (next)

## Sweep

Run each over the consuming project (markup, PHP, SCSS, JS).

```sh
# 1 dark mode switch renamed. Hit: toggleDarkmode -> darkmodeToggle (also the -light / -dark children)
grep -rn 'toggleDarkmode' .

# 2 the texts step (deprecated until 6). Hit: Texts -> Paragraphs, --*-texts -> --*-paragraphs
grep -rnE "(gap|mg|pd|rad|mg(Tp|Rt|Bt|Lt|Bl|In)|pd(Tp|Rt|Bt|Lt|Bl|In))Texts|--(gap|padding|margin|borderRadius|SIZE)-texts" .

# 3 breakpoint names. Hit: BigMobile -> Phablet, BigTablet -> Notebook, $big-mobile -> $phablet, $big-tablet -> $notebook
grep -rnE 'BigMobile|BigTablet|\$big-(mobile|tablet)' .

# 4 --header-size. Hit: declare your own value or drop it
grep -rn -- '--header-size' .

# 5 formValidate typeNotice. Hit: drop the option; add a pgs="alertContainer" to forms that want an alert
grep -rn 'typeNotice' .

# 6 labels and legends that should stay boxes. Hit: add label['labelBox'] / legend['labelBox'] where the box is wanted
grep -rnE 'pgs="[^"]*\b(label|legend)\b' .

# 7 dropdown arrow. Hit: delete drpNotArrow; add drpArrow where an arrow is wanted
grep -rn "drpNotArrow\|pgs=\"[^\"]*dropdown" .

# 8 tables. Hit: add table['tableStriped' 'tableHover'] where the zebra and the hover are wanted
grep -rnE 'pgs="[^"]*\btable\b' .

# 9 pageShell room. Hit: write pgs="main pageShell" or wrap the shell in a main; drop the removed variables
grep -rnE 'pgs="[^"]*pageShell|--pageShell-(offsetTop|paddingBottom|asideScroll-top|asideScroll-maxHeight)' .

# 10 search suggestions variables. Hit: rename to --listbox-* (table above)
grep -rn -- '--search-suggestions-' .

# 11 legend() mixin. Hit: @include label()
grep -rn '@include legend' .

# 12 slides arrows as direct children. Hit: use a descendant selector
grep -rnE 'slides"?\]? *> *\[pgs~="?_slides-(next|prev)' .

# 13 pageNav panels and selectors. Hit: add pgs-data="pageNavHash[name]"; write :is([pgs~="pageNav"], [pgs*="pageNav["])
grep -rn 'pageNav' .

# footer logo. Hit: add logo['logoFooter'] to the logo of footer-brand that should stay big
grep -rn 'footer-brand' .

# steps. Hit: add steps['stepsLastHighlight'] to keep the highlighted last circle
grep -rnE 'pgs="[^"]*\bsteps\b' .

# accordion. Hit: add accordion['accOpenBox'] (or on accordionContainer) to keep the open box
grep -rnE 'pgs="[^"]*\baccordion(Container)?\b' .
```
