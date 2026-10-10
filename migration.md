# Migrating a project onto this branch

Everything below is what changed in `mypgs` since the last merge into `master`, still versioned
4.7.1. It is written to be handed to whoever updates a consuming project: each entry
says what to search for and what to write instead.

Read section 1 first. Those are the changes that break nothing loudly: the names survived and the
meaning moved under them, so nothing errors and the page just looks wrong.

## 1. Same name, new meaning — check these first

| name | was | is now |
| --- | --- | --- |
| `pgs-option` (retired) | `pgs="component" pgs-option="key1 key2"` | Every boolean flag, CSS-facing or JavaScript-only: `pgs="component['key1' 'key2']"`. Only a genuine `key[payload]` value: `pgs-data="..."`. The old attribute is no longer read or styled. |
| `pgs="icon"` | the round surface holding an icon | the glyph itself, drawn from inline SVG |
| `--icon-size` | the width driver of that surface | the size of a glyph, read as a font-size |
| `pgs-option="menuVertical"` (and any submenu below a horizontal menu's first level) | floated as a dropdown, same as every other submenu | expands in place as an accordion |
| a plain `<a>` in body content | `color: var(--color-black)`, underline on hover | `color: var(--color-link)`, background highlight on hover |
| `pgs-state="info"` (alert/badge/notification/toast) | read `--color-link`/`--color-linkBackground` directly | reads `--color-info`/`--color-info-soft`, which only default to the link colors |
| `pgs="header"` with no options | hid itself on scroll-down automatically | does nothing on scroll unless `pgs-option="headerScroll"` is also written |
| a bare `<button type="submit">` inside `pgs="form"` | the form styled it as a strong button on its own | draws nothing: mark it `pgs="button"` yourself |
| several `pgs="accordion"` next to each other | opening one closed every other accordion on the page | each one answers for itself: wrap them in `pgs="accordionContainer"` to get the old behavior |
| `pgs-option="buttonText"` and `pgs-option="buttonTransparent"` | `buttonTransparent` stripped every state, `buttonText` only the resting one | the two traded places: `buttonText` strips every state, `buttonTransparent` only the resting one |
| `pgs="toggleDarkmode"` inside `pgs="footer"` | the footer wrote "Dark mode"/"Light mode" next to the glyph on its own | the label is opt-in, and available everywhere: add `tglLabeled` to its bracket, `toggleDarkmode['tglLabeled']` |
| `pgs="dropdown"` (and the floating first-level submenus of a horizontal menu) | the content floated with no arrow | the content draws an arrow pointing back at the trigger: add `drpNotArrow` to the bracket to keep the old look |
| `pgs.<module>.init(root)` on an accordion, menu, steps, stepTabs, summary, notification or toast | looked only at what is inside `root`, so `pgs.helper.init(el)` on a freshly inserted `pgs="accordion"` did nothing | the root element itself is initialized too, like it already was for tabs, modal, dropdown, search, slides and pageNav |
| `refresh()` on a component instance | six different things: re-run the parent's init (a no-op for the element), re-measure, re-run a search | one meaning everywhere: `destroy()` then initialize that element again, and return the new instance. Search's old `refresh()` is `search()` now |
| every `pgs:*` event (`pgs:tabs:change`, `pgs:stepTabs:change`, `pgs:pageNav:change`, `pgs:modal:open`, `pgs:modal:close`, `pgs:alert:*`, `pgs:search:*`) | some bubbled, some did not | all bubble, and `detail.element` is always there. A listener on an ancestor now also hears the events of components nested inside it |
| `pgs.pageNav.api(el).getCurrent()` | the current panel element | the zero-based index, like tabs and stepTabs; the element is `getCurrentPanel()` |

### Retired option attribute: migrate every occurrence manually

Search the consuming project's HTML, PHP, templates, JavaScript strings and custom selectors for
`pgs-option`. Move each CSS flag into the bracket of its own component, retaining its exact existing
name and single quotes around each flag. Multiple components keep separate brackets:

```html
<button pgs="button['strong' 'mini'] icon['icon-check']"></button>
<div pgs="box['mini'] flex['column' 'wrap' 'flexCenter']"></div>
<header pgs="header['compactTablet' 'main' 'scroll']"
        pgs-data="headerCompactFrom[600]"></header>
```

`row` and `column` are now options of `flex`, not standalone component tokens. The existing
wrapping names remain `wrap` / `nowrap`, and `inlineFlex` keeps its name. A quoted `'column'`
cannot match `'columnReverse'`, regardless of its position in the bracket.

Only a genuine `key[payload]` value moves to `pgs-data`, with the existing format and support for
nested JSON arrays: `headerCompactFrom[600]`, `modalContainerID[myContainer]`,
`modalContainerPGS[header]`, `dropdownPosition[top left]`, `stepTabsIcon[...]`, `formMessage[...]`,
`formMessageTitle[...]`, `notification[...]`, `toast[...]`. `tabsHistory` is
the one hybrid case: it belongs in `pgs-data` whether written bare or with its optional
`tabsHistory[name]` payload, because it can carry one. A `pgs-data` key always keeps the prefix of
the component it belongs to — that attribute is flat, with no bracket to give a bare key context.

Every boolean flag with no payload stays in `pgs`, whether it is CSS-facing or read by JavaScript
only, written as `component['flagName']` next to the flags that also carry a CSS rule.

### Every flag carries its component's prefix

Once every flag lived inside its own component's bracket, the prefix looked redundant, and for a
while most flags dropped it (`accordion['autoOpen']`). But a bare name that two components share on
the same element matches both — `[pgs*="'mini'"]` cannot tell button's from card's — so every flag
now carries a prefix of its own component, even where no collision exists today. A short component
name is written in full (`cardMini`, `badgeDot`, `iconLarge`, `menuVertical`, `slidesSingleScroll`,
`headerScroll`), which is why many flags simply keep the name they had under `pgs-option`; a long one
is abbreviated (`btn`, `acc`, `drp`, `shell`, `tgl`, `mg`, `pd`, `bd`, `otl`). flex/grid's layout
flags (`column`, `row`, `gapTexts`, `itemCenter`, ...) are the one family still bare.
The `icon-*` glyphs and every `pgs-data` key keep their
prefix too. The table gives the current name; search for every occurrence of the left column and
rename it where it changed.

| component | was | is now |
| --- | --- | --- |
| accordion | `accordionAutoOpen` | `accAutoOpen` |
| accordionContainer | `accordionMultiOpen` | `accMultiOpen` |
| badge | `badgeDot` / `badgeError` / `badgeInfo` / `badgeNeutral` / `badgePrimary` / `badgeStrong` / `badgeSuccess` / `badgeWarning` | unchanged: every badge flag keeps `badge` |
| border (and its variants) | `borderThick` / `borderThicker` / `borderThin` | `bdThick` / `bdThicker` / `bdThin`; each side keeps its own root and folds its side code into the flag (`borderTop['bdTpThin']`, `borderLeft['bdLtThick']`, ...), and the color has its own root, `borderColor['bdPrimary']` |
| outline | `outlineThick` / `outlineThicker` / `outlineThin` | `otlThick` / `otlThicker` / `otlThin` |
| box | `boxMini` | `boxMini` (unchanged: button and card also have a mini) |
| button | `buttonVertical` / `buttonMini` / `buttonPaddingEqual` / `buttonPrimary` / `buttonQuaternary` / `buttonReverse` / `buttonSecondary` / `buttonStrong` / `buttonTertiary` / `buttonText` / `buttonTransparent` | `btnVertical` / `btnMini` / `btnPaddingEqual` / `btnPrimary` / `btnQuaternary` / `btnReverse` / `btnSecondary` / `btnStrong` / `btnTertiary` / `btnText` / `btnTransparent` (every button flag carries `btn`) |
| button | `buttonHeader` | `btnForHeader` |
| button | `buttonIcon` | `btnIconOnly` |
| card | `cardHorizontal` / `cardHorizontalFixed` / `cardLegacy` / `cardMini` | `cardHorizontal` / `cardHorizontalFixed` / `legacy` (since removed, see section 2) / `cardMini` |
| dropdown | `dropdownHover` | `drpHover` |
| flex | `flexColumn` / `flexRow` / `flexColumnReverse` / `flexRowReverse` | `column` / `row` / `columnReverse` / `rowReverse` (`flexCenter` keeps its name: bare `center` would collide in meaning with `itemCenter`/`justifyCenter`/`contentCenter` in the same bracket) |
| header | `headerCompactBigMobile` / `headerCompactBigTablet` / `headerCompactBottom` / `headerCompactLaptop` / `headerCompactMobile` / `headerCompactTablet` / `headerCompactWatch` | unchanged |
| header | `headerPrimary` | `headerMain` |
| header | `headerScroll` | unchanged |
| icon | `iconBox` | `iconBoxed` |
| icon | `iconDuo` / `iconLarge` / `iconMedium` | unchanged |
| logo | `logoDarkmode` / `logoDarkmodeFixed` | unchanged |
| menu | `menuHorizontal` / `menuIconOnlyCurrent` / `menuShort` / `menuVertical` | unchanged |
| modal / modal-dialog | `modalBottom` / `modalCenter` / `modalDisableBackdropClose` / `modalFull` / `modalHistory` / `modalLeft` / `modalMedium` / `modalMini` / `modalRight` / `modalTop` / `modalTopLevel` | `dialogBottom` / `dialogCenter` / `dialogDisableBackdropClose` / `dialogFull` / `dialogHistory` / `dialogLeft` / `dialogMedium` / `dialogSmall` / `dialogRight` / `dialogTop` / `dialogTopLevel` (renamed to `dialog*`, not stripped bare — these flags act on the `<dialog>`, not the wrapper) |
| margin (and its variants) | `marginAuto` / `marginElements` / `marginNegative` / `marginPage` / `marginSections` / `marginTexts` / `marginUnset` | `mgAuto` / `mgElements` / `mgNegative` / `mgPage` / `mgSections` / `mgTexts` / `mgUnset`; each side keeps its own root and folds its side code into the flag (`marginTop['mgTpElements']`, `marginInline['mgInAuto']`, ...) |
| padding (and its variants) | same list as margin, `padding*` | the same with `pd` (`pdPage`, `paddingTop['pdTpTexts']`, ...); padding has no `auto` or `negative` |
| pageShell | `pageShellAsideScroll` / `pageShellAsideShadow` / `pageShellFullPage` | `shellAsideScroll` / `shellAsideShadow` / `shellFullPage` |
| slides | `slidesAnimationScale` / `slidesShadowDesktop` / `slidesSingleScroll` | unchanged (`slidesScrollMouse` was removed, see section 2) |
| toggleDarkmode | `toggleDarkmodeExtended` | `tglLabeled` |

`.option` and `.data` are two separate accessors, split by attribute as well as by purpose:
`.option` (`contains`/`add`/`remove`/`toggle`/queries/`closest`) only ever touches the `pgs`
attribute; `.data` (`getValueBrackets`/`setValueBrackets`/`value`) only ever touches `pgs-data`.
Neither reads nor writes the other's attribute. `option.add(key)` derives the owning component
from `key`'s own name — the lowercase run before the first uppercase letter or a `-` — and merges
into that component's existing bracket. Most flags lost that derivable prefix in the table above,
so this now only actually resolves an owner for the few that kept the component's own full name
(`icon-moon` → `icon`, `cardMini` → `card`); an abbreviated prefix does not count (`mgTp` derives
`mg`, not `margin`; `btnMini` derives `btn`, not `button`), and every other flag falls through to becoming its own bare `pgs` token. To add a shortened flag into its bracket from
JavaScript, call the base `pgs(el).add("component['flag']")` directly, naming the component — this
is the normal way to add a bracket flag now, not a fallback. `option.remove`/`option.toggle` strip
a flag correctly either way, bare or nested, since removal only needs to find the flag, not derive
where to put it. There is no ownership registry to keep in sync. `data.getValueBrackets` /
`data.setValueBrackets` read and write only `pgs-data`, for a genuine `key[payload]` value;
`data.value` is a plain passthrough on `pgs-data` — get or set its raw attribute string, nothing
from the `pgs` bracket. `.data` has no `contains`/`add`/`remove`/`toggle` of its own — `tabsHistory`
written bare goes through `data.value` directly, since it has no owner to derive and never belongs
in the `pgs` bracket. The base `pgs()` API recognizes components with brackets and preserves their
options when another token is added. There is no fallback to the retired attribute.

Update consumer selectors too: `[pgs~="button"]` alone does not match `button['btnMini']`.
Use `:is([pgs~="button"], [pgs*="button\5B"])` for the component and
`[pgs*="'btnMini'"]` for the flag. In SCSS, spell the opening bracket as `\5B`. A selector for a true
child token needs only the plain `[pgs~="X"]` form — no child keeps the full `:is(...)` form
anymore, not even `modal-dialog`: its own options (`dialogRight`, `dialogSmall`, ...) now land on
`_dialog`, a second, pgs-generated-only token added alongside it, so `modal-dialog` itself simplifies
like every other child (see `AGENTS-DEVELOPMENT.md`).
Custom code that directly reads/writes attributes must use the new storage or the wrapper.

This is a manual breaking migration: the two attribute forms do not coexist. The older transitions
below retain historical names in their explanations, from before either of the renames above —
apply both rules to their `pgs-option` examples as well. No consuming project is migrated by this
library change.

So `<span pgs="icon"><i class="fa-solid fa-star"></i></span>` no longer draws a circle. The surface
is now an option on an icon element:

```html
<span pgs="icon['iconBoxed']">
    <i pgs="icon['icon-star']"></i>
</span>
```

Menu: only the first level of a `menuHorizontal` menu still floats its submenu in a dropdown panel.
Every other submenu — a nested level inside that same horizontal menu, or anything inside a vertical
menu — now expands in place instead, via a generated `_menu-accordion` token and `pgs-state="open"`.
Nothing to rename, but a vertical menu with submenus will look different: check it visually.

Links: recolor `--color-link`/`--color-link-soft` if the previous black-with-underline look was
intentional rather than inherited from never having set them.

Info state: if you retheme "info" surfaces by overriding `--color-link`, set `--color-info` (and
`--color-info-soft`) instead — they used to be the same color by coincidence, now only by default.

Header scroll-hide: this used to run unconditionally on every `pgs="header"`. A header with no
`pgs-option` at all — which is what `PGS_theme`'s own header currently has — silently stops hiding on
scroll after this merge unless `headerScroll` is added to it.

Hover: there is no shared hover treatment. `pgs="hover"`, `hover-text`, `hoverNot`, `bodyHoverAuto`, the
`pgs.hover` module, the mixins `hoverBase()`, `hoverStyleNormal()`, `hoverStyle1()` and `hover()` (the file
`mixin/_mx-hover.scss` is gone) and the old `--hover-*` custom properties (`--hover-background` as a
per-element recolor, `--hover-color`, `--hover-border`, `--hover-shadow-color`, `--hover-timing`,
`--hover-behavior`, `--hover-st1-*`) are gone, and so is the opt-out (a button that must stay still takes
`button['btnNotHover']`): delete them from the markup and from
your stylesheets. Two names come back with a new meaning, so do not just keep your old rules: they are now
global tokens on `:root`, set once to recolor every hover. What remains is a plain CSS hover on each
component, read from `--hover-background`, `--hover-border-color`, `--hover-color` and `--hover-transition`
in `base/_variables.scss` (the secondary soft color, the secondary color, black, and a 400 ms transition
that is `none` under `prefers-reduced-motion`): `button` (`--button-*-hover`), a link `card`
(`--card-background`), a link `box` (`--box-background`), the table row, the search suggestion, the slides
dot, the box of a checkbox and a radio (`--checkbox-box-background-hover`), `checkboxBackground`, the file
button of a file input and the outline of an input. A component can still override its own token. The current and the two-state
looks work the same way: `--current-background`, `--current-border-color`, `--current-color` and
`--twoState-background`, `--twoState-border-color`, `--twoState-color`.

Form submit: `[pgs~=form]` no longer styles `button[type="submit"]`. It used to style any bare submit
button inside a form as a strong button (the button base, content, strong and hover mixins), styling it by
tag instead of by token — the one place left where writing no `pgs` still produced a component. Now
nothing errors and nothing is renamed: the button simply falls back to the browser's own look. Write
it out to get the same button as before:

```html
<button pgs="button" pgs-option="buttonStrong" type="submit">Send</button>
```

This one is worth a pass over every form in the project, since the markup keeps working and only the
look changes.

Accordion: opening a panel used to close every other accordion in the document, wherever it was —
two unrelated groups on the same page fought each other, and a single standalone panel was closed by
somebody else's. The rule now needs a group: `pgs="accordionContainer"` on the element that wraps a
set of accordions, typically the `<ul>`, and only the panels of that same group close each other.
Nothing errors, and a lone accordion is better off than before; what changes silently is a set that
relied on the old behavior, which now lets all of its panels stay open:

```html
<ul pgs="flexColumn accordionContainer">
    <li pgs="accordion">...</li>
    <li pgs="accordion">...</li>
</ul>
```

Two options come with it. `accordionMultiOpen` on the container lifts the rule again, so its panels
can be open together. `accordionAutoOpen` on a single accordion opens it on load and keeps it open
while the rest of the group is used, until the reader works that panel themselves — it is also the form to write instead of a hand-written
`pgs-state="open"`, which still works but belongs to the runtime.

Buttons, `buttonText` and `buttonTransparent`: the two names swapped implementations. Neither was
renamed and neither was removed, so nothing errors — a button carrying either one simply looks like
the other one now. `buttonTransparent` is the light touch: no background and no border at rest, the
label taking the accent color on hover, and `buttonStrong` or `aria-current` still filling the
button in. `buttonText` is the absolute one: every state transparent, so the button never fills,
not even when it is the current page. Navigation links want the first, which is why every menu,
header and notification example in the library now writes `buttonTransparent` where it used to write
`buttonText`. Search the project for both names and swap each for the other:

```html
<li><a pgs="button" pgs-option="buttonTransparent" href="/">Home</a></li>
```

## 2. Renames

### Every utility family is one bracket

The last round of the naming work gives each family of utility tokens a root with its own bracket,
the same shape every component already has: one `section[...]` instead of eight `section*` roots.
Margin, padding and border keep one root per side (`marginTop`, `paddingInline`, `borderLeft`, ...),
each with its own bracket. The flags inside carry a short prefix of their family (`mg`, `pd`, `bd`,
`sct`, `pos`, ...), so two families written on the same element can never match each other's flags.
Nothing keeps working under the old name.

| family | was | is now |
| --- | --- | --- |
| margin | `marginTop` / `marginBlock` / `marginAuto` / `marginTexts` / ... | `marginTop['mgTp']` / `marginBlock['mgBl']` / `margin['mgAuto']` / `margin['mgTexts']`. Each side keeps its own root, and a side and a scale fold into one flag inside it: `marginTop` + `texts` → `marginTop['mgTpTexts']`, `marginLeft` + `auto` → `marginLeft['mgLtAuto']`. `mgNegative` negates the base margin, `mgTpNegative` (and the other sides') only its own side |
| padding | `paddingTop` / `paddingInline` / `paddingElements` / ... | the same with `pd`: `paddingTop['pdTp']`, `paddingInline['pdInElements']`, `padding['pdPage']`. Padding has no `auto` and no `negative` |
| border | `pgs="border"` + `borderThin`/`borderThick`/`borderThicker`, the per-side `borderTop`/`borderLeft`/..., and a color `brPrimary`/... | width and side fold into one flag inside the root of that side (`border['bdThick']`, `borderTop['bdTpThin']`, `borderLeft['bdLtThick']`), and the color has its own root, `borderColor['bdPrimary']` replacing `brPrimary`, written next to the side: `borderTop['bdTpThin'] borderColor['bdPrimary']`. `border` with `borderColor['bdPrimary']` alone draws the default width in that color |
| outline | `pgs="outline"` + `olPrimary`/... and `outlineThin`/... | `outline['otlPrimary' 'otlThick']` |
| border radius | `borderRadius` / `borderRadiusInput` / `borderRadiusExternal` | `borderRadius` / `borderRadius['radInput']` / `borderRadius['radExternal']` |
| section | `section` / `sectionFull` / `sectionMax` / `sectionNoPadding` / `sectionSpecificity` (and the dev-only `sectionEdge*`) | `section` / `section['sctFull']` / `section['sctMax']` / `section['sctNoPadding']` / `section['sctSpecificity']` / `section['sctEdgeLeft']`...; its child `sectionSpecificity-child` → `section-specificity` |
| body | `bodyBase` / `bodyImg` / `bodyText` / `bodyHeading` on `<body>` | `body['bodyBase' 'bodyImg' 'bodyText' 'bodyHeading']` |
| background color | `bgPrimary` / `bgBoxDark` / ... | `background['bgPrimary']` / `background['bgBoxDark']` |
| text color | `colorPrimary` / ... (the dev-only `txtPrimary` / ...) | `textColor['txtPrimary']` — not `text[...]`, which is the typography utility |
| position | `positionRelative` / `positionAbsolute` / `positionSticky` | `position['posRelative']` / `position['posAbsolute']` / `position['posSticky']` |
| overflow | `overflowAuto` / `overflowXAuto` / `overflowHidden` | `overflow['ovAuto']` / `overflow['ovAutoX']` / `overflow['ovHidden']` (and the new `ovAutoY` / `ovHiddenX` / `ovHiddenY`) |
| aspect ratio | `aspectSquare` / `aspectVideo` | `aspect['aspSquare']` / `aspect['aspVideo']` |
| selection | `selectNone` / `selectText` | `userSelect['selNone']` / `userSelect['selText']` |
| pointer events | `pointerEventsNone` / `pointerEventsAuto` | `pointerEvents['peNone']` / `pointerEvents['peAuto']` |
| image fit | `imgCover` / `imgContain` | `img['imgCover']` / `img['imgContain']` |
| flex item | `flex-flex1` / `flex-flexFull` / `flex-flexInitial` / `flex-flexNone` / `flex-flexOrderFirst` / `flex-flexOrderLast` | `flexChild['flex1']` / `flexChild['flexFull']` / ...: its own component, so it works inside any flex or grid container, not only under `flex` |

Unchanged: `block`, `minWidth0`, `truncate`, `cursorNotAllowed`, `container`, and
`iconColorPrimary`/`iconColorSecondary`, which stay bare.

`svgChangeColor` now recolors Lottie animations too, from the same `--svg-color-N` pairs. The
`lottieChangeColor` token that briefly existed on this branch is gone; write `svgChangeColor`.

In PHP, a value an ACF field or a helper writes straight into `pgs` needs the same rename.
`PGS_theme`'s `bl-section.php` maps the old section names for content already published; any other
template that builds these names by concatenation will not show up in a plain search.

### Height flags named by their unit

The viewport-height flags of `height`, `heightMax` and `heightMin` say the value they set instead of
a word for it. Nothing else in those three brackets changed (`heightFull`, `heightUnderHeader`,
`heightUnderMain`, `heightAuto` keep their names).

| was | is now |
| --- | --- |
| `height['heightScreen']` / `heightMax['heightMaxScreen']` / `heightMin['heightMinScreen']` | `height['height100svh']` / `heightMax['heightMax100svh']` / `heightMin['heightMin100svh']` |
| `heightScreenLive` / `heightMaxScreenLive` / `heightMinScreenLive` | `height100dvh` / `heightMax100dvh` / `heightMin100dvh` |
| `heightScreenLarge` / `heightMaxScreenLarge` / `heightMinScreenLarge` | `height100lvh` / `heightMax100lvh` / `heightMin100lvh` |
| `heightScreenHalf` / `heightMaxScreenHalf` / `heightMinScreenHalf` | `height50svh` / `heightMax50svh` / `heightMin50svh` |

The width scales also go further down the page: a quarter, fifth, sixth, seventh and eighth of it, as
`widthPageQuarter` ... `widthPageEighth`, and the same under `widthMax` and `widthMin`
(`widthMaxPageQuarter`, `widthMinPageEighth`, ...).

### Text color utilities — `color*` becomes `txt*`

Thirty-eight tokens, one straight substitution: `colorPrimary` → `txtPrimary`, `colorError` →
`txtError`, `colorWhiteFixed` → `txtWhiteFixed`, and so on for every `color*` you were using. The
flag then moved into its own bracket, so the final form is `textColor['txtPrimary']`; see "Every
utility family is one bracket" above.

### Markup the library builds — an `_` prefix

These were always generated at runtime; the prefix now says so. Style them and query them, never
write them by hand.

`notifications-element` `notifications-element-buttons` `notifications-element-content`
`notifications-element-icon` `notifications-empty` `toast-element` `toast-element-buttons`
`toast-element-content` `toast-element-icon` `search-suggestions-item` `stepTabs-dots-dot`
→ each one gains a
leading `_`. `menu-buttonIcon` also changes name, to `_menu-submenuButton`: the toggle the menu
inserts next to every link with a submenu. The notification panel's own tokens end up singular, as
the component is: `notifications-empty` is `_notification-empty`, the list `_notification`, its close
button `_notification-close` and its dialog `_notification-dialog` (see "Consolidation pass" below).

### Header

| was | now |
| --- | --- |
| `header-element-onlyDesktop` | `header-element-onlyFull` |
| `header-element-onlyMobile` | `header-element-onlyCompact` |
| `pgs-state="mobileActive"` | `pgs-state="compact"` |
| `pgs-option="mobileBottom"` | `pgs-option="compactBottom"` |
| `--header-mobile-bottom-active` | `--header-compactBottom-active` |

The header collapses on measured overflow rather than on a hardcoded width, and the breakpoint can
be forced with `headerCompactWatch` through `headerCompactLaptop`.

### Color tokens

| was | now |
| --- | --- |
| `--color-success-background` | `--color-success-soft` |
| `--color-warning-background` | `--color-warning-soft` |
| `--color-error-background` | `--color-error-soft` |
| `--color-linkBackground` | `--color-link-soft` |

Same substitution as `color*` → `txt*`, just the `-background`/`Background` suffix this time. These
feed `--alert-background`, `--badge-background` and similar component defaults, so a project that set
the old names to retheme those surfaces needs to move the override to the new ones.

### Step tabs

| was | now |
| --- | --- |
| `pgs="tab"` | `pgs="stepTabs-container-tab"` |

The bare `tab` token was never namespaced to the component; every panel written by hand needs the new
name.

### Menu

`pgs-option="menuHeader"` is gone, and with it every `--menu-*` custom property: `--menu-background`,
`--menu-background-current`, `--menu-background-strong`, `--menu-border`, `--menu-color`,
`--menu-color-current`, `--menu-color-strong`.

Menu links are no longer styled by the menu. Write the button tokens on the link and configure it
with the `--button-*` properties you already know:

```html
<li><a pgs="button" pgs-option="buttonTransparent" href="/">Home</a></li>
```

### Slides

| was | now |
| --- | --- |
| `pgs-option="slideScale"` | `pgs-option="slideAnimationScale"` |
| `pgs-option="notScrollAnimation"` | `pgs-option="notScrollWithMouse"` |
| `--slides-shadow-color`, `--slides-shadow-width` | `--slides-maskStart`, `--slides-maskEnd`, `--slides-sizeMaskImage` |

The edge fade is a mask now, not a shadow, so it fades to whatever is behind instead of to one color.

The arrows the module builds changed place: they now sit in a row above the slides, at the end, instead
of lying over them at the middle of their height. `slidesArrowsCenter` brings the old placement back,
so a slides that should keep its arrows over the slides needs it written. Arrows written by hand
(`slides-prev`, `slides-next`) are not moved by either. The dots can be taken off too, with `slidesNotDots`.
Check sweep step 35.

### Cookie consent is gone from the library

`pgs.cookieConsent`, `cookieConsent[...]`, the `cookieConsent-*` tokens and their styles are removed:
the consent banner was a Google Analytics integration, not a piece of interface, and it now lives in
`PGS_theme`, which hooks onto classes of its own (`.cookieConsent`, `.cookieConsent-actionOpen`, ...) and
keeps using the library's modal, buttons, toggle and badge. A project that used the library's version
needs the `PGS_theme` one, or its own: the hidden marker is now
`<div hidden data-cookie-consent='{json}'></div>`, and a control that reopens the panel carries the class
`cookieConsent-actionOpen` instead of the token. Check sweep step 34.

### Scroll horizontal is gone

`pgs.scrollHorizontal(element, speed)` and `pgs.scrollHorizontalWithMouse(element, speed)` — the helpers
that turned the vertical wheel into horizontal scrolling — are removed, and so is the Slides option
that used them, `slidesScrollMouse`. A slides track no longer takes over the mouse wheel: it scrolls
sideways with a swipe, a trackpad, the arrows or the dots, like any other horizontal scroller. A
project that wants the old behavior needs to write its own `wheel` listener. Check sweep step 11.

### Header: the hamburger group is an onlyCompact group

| was | now |
| --- | --- |
| `pgs="header-element-hamburger"` | `pgs="header-element-onlyCompact"` |
| `pgs="header-element-hamburger-button"` | nothing: the control is a plain `pgs="button"` |

The two tokens did what `header-element-onlyCompact` already did — hidden in the full layout, shown
once the header turns compact — so they are gone and the group carries `onlyCompact` instead. The
button keeps `button modal-button modal-close` and its `buttonIcon` option; the header-specific
token added nothing to it. The group has to stay **inside** `pgs="header-element"`: that is where
the rule that hides it in the full layout looks for it.

`modal` does **not** go on the same element. `header-element-onlyCompact` is a group, like
`alwaysOn` or `onlyFull`, and a group holds controls: written together the group *is* the modal, so
it can never hold a second compact-only control (a theme toggle, a search button) without that
control becoming part of the modal. Nest the modal inside it, the way any other header group holds
its controls.

```html
<div pgs="header-element-onlyCompact">
    <div pgs="modal" pgs-option="modalContainerPGS[header]">
        <button pgs="button modal-button modal-close" pgs-option="buttonIcon" type="button" aria-label="Open menu">
            <i pgs="icon" pgs-option="icon-hamburgerTwo" aria-hidden="true"></i>
        </button>
        <dialog pgs="modal-dialog" pgs-option="modalRight">...</dialog>
    </div>
</div>
```

### Header: `header-element-alwaysOnLast` is gone

| was | now |
| --- | --- |
| `pgs="header-element-alwaysOnLast"` | `pgs="header-element-alwaysOn"` |

The two tokens were the same thing: neither carried a single declaration, and the order of the areas
in the header came from the order of the markup, not from the names. `alwaysOnLast` only read as if
it did something. Write `header-element-alwaysOn` as many times as the header needs areas — the one
that comes last in the document is the one that lands last, which is what the old name was promising.

A WordPress theme that hooks content into the trailing area keeps its hook: only the `pgs` attribute
on the wrapper changes.

### Page shell

| was | now |
| --- | --- |
| `pgs="pageShell-aside-scroll"` | `pgs-option="pageShellAsideScroll"` on the `pageShell` wrapper (not on the aside) |
| `--pageShell-aside-sticky-top` | `--pageShell-asideScroll-top` |
| `--pageShell-aside-maxHeight` | `--pageShell-asideScroll-maxHeight` |

The two sticky properties carry the option's name now, `asideScroll` instead of `aside`: they only
exist while `pageShellAsideScroll` is on, and the old names read as if every sidebar had them.

### Buttons and borders

| was | now |
| --- | --- |
| `pgs-option="buttonClose"` | `pgs-option="buttonIcon buttonMini"` |
| `--border` | `--border-width`, alongside the new `--border-style` |
| `--border-complete-hover` | gone; nothing replaces it |
| `--button-background-active` | `--button-background-twoState` |
| `--button-color-active` | `--button-color-twoState` |
| `--button-border-color-active` | `--button-border-color-twoState` |

The three button custom properties were renamed to say what they actually do: "active" was only ever
read under `:has(input:checked)`, so a two-state control wearing the name of a generic state. The three
defaults come from the global `--twoState-background`, `--twoState-border-color` and
`--twoState-color` in `base/_variables.scss`. The reading
also moved — it used to sit inside the `twoState` mixin, so only that control picked it up; it is now
in `buttonBase()`, so any element marked `pgs="button"` that wraps a checked input takes the checked
colors. That is what let `twoState` be dropped altogether — see just below. Retheming stays the same
otherwise: set the three properties on the element or a container, under the new names. Nothing reads
the old ones any more, so a project that overrode them silently loses the override.

Border and outline are now separate: `br*` colors become `bd*` flags in `borderColor[...]`, `ol*` become
`otl*` flags in `outline[...]`, and each family has its own thickness options (`bd*`, `otl*`); see
"Every utility family is one bracket".

### Global tokens — one `--SIZE` scale

| was | now |
| --- | --- |
| `--padding-2` | `--padding-texts` |
| `--padding-page` | `--page-padding` |
| `--font-titoli` | `--font-heading` |

The spacing rhythm now comes off a single root value, `--SIZE`. `--padding`, `--padding-texts`,
`--page-padding`, `--border-radius`, `--border-radius-input`, `--gap-texts` and `--gap-elements` are
all derived from it, so retheming the whole scale is one number instead of seven. The three renames
are a consequence: `-2` said "divided by two" rather than what it is, and `--padding-page` was the
only page token not on the `--page-*` prefix that `--page-width`, `--page-top` and `--page-edge`
already shared.

Two behaviors moved with the names, so a project that only renames still gets a different result:

- `--page-padding` is a plain measure, where `--padding-page` was `min(5vw, var(--padding-elements))`. The
  page gutter no longer shrinks on a narrow screen. Put the clamp back on the new name if a project
  wants it: `--page-padding: min(5vw, var(--padding-elements))`.
- `--page-edgeFlush` is now one `--page-padding` shorter than `--page-edge`, so it lands on the outer
  edge of a section box rather than on its text, and reaches zero as soon as that box stops fitting
  rather than when the bare column does.

### Flex/grid gap and wrap, bare `pgs` support removed

| was | now |
| --- | --- |
| `pgs="gapTexts"` | `pgs-option="gapTexts"` |
| `pgs="gapElements"` | `pgs-option="gapElements"` |
| `pgs="gapSections"` | `pgs-option="gapSections"` |
| `pgs="gapNone"` | `pgs-option="gapNone"` |
| `pgs="nowrap"` | `pgs-option="nowrap"` |
| `pgs="wrap"` | `pgs-option="wrap"` |

These six were always meant to be `pgs-option`, matching every other flex/grid modifier
(`itemCenter`, `justifyBetween`, ...), but a `[pgs~=...]` fallback kept the bare form working. That
fallback is gone: write them as `pgs-option`, combined with `pgs="flexColumn"`/`flexRow`/`flex`/`grid`
or any other element that already carries a `pgs-option`.

### Reference layout

`reference/html/layout/body.html` moved to `reference/html/base/body.html`. If any tooling reads that
path, update it.

### Option names now prefixed with their component

These `pgs-option` values were single-component options that did not carry their component's name;
they now do, matching every other option in the library.

| was | now |
| --- | --- |
| `pgs-option="singleScroll"` | `pgs-option="slidesSingleScroll"` |
| `pgs-option="shadowDesktop"` | `pgs-option="slidesShadowDesktop"` |
| `pgs-option="notScrollWithMouse"` | `pgs-option="slidesNotScrollWithMouse"` |
| `pgs-option="slideAnimationScale"` | `pgs-option="slidesAnimationScale"` |
| `pgs-option="tabIcon"` (Step tabs) | `pgs-option="stepTabsIcon"` |
| `pgs-option="shellAsideScroll"` | `pgs-option="pageShellAsideScroll"` |
| `pgs-option="shellFullPage"` | `pgs-option="pageShellFullPage"` |
| `pgs-option="horizontal"` (Menu) | `pgs-option="menuHorizontal"` |
| `pgs-option="vertical"` (Menu) | `pgs-option="menuVertical"` |
| `pgs-option="position"` (Dropdown, and Menu's own internal use of it) | `pgs-option="dropdownPosition"` |
| `pgs-option="containerID"` (Modal) | `pgs-option="modalContainerID"` |
| `pgs-option="containerPGS"` (Modal) | `pgs-option="modalContainerPGS"` |
| `pgs-option="disableBackdropClose"` | `pgs-option="modalDisableBackdropClose"` |
| `pgs-option="history"` (Modal) | `pgs-option="modalHistory"` |
| `pgs-option="left"` (Modal) | `pgs-option="modalLeft"` |
| `pgs-option="right"` (Modal, and Notification's dialog which reuses it) | `pgs-option="modalRight"` |
| `pgs-option="topLevel"` (Modal) | `pgs-option="modalTopLevel"` |
| `pgs-option="compactBottom"` (Header) | `pgs-option="headerCompactBottom"` |
| `--header-compactBottom-active` | unchanged (the custom property already carried the `header-` prefix) |
| `pgs-option="message[]"` (Form) | `pgs-option="formMessage[]"` |
| `pgs-option="messageTitle[]"` (Form) | `pgs-option="formMessageTitle[]"` |
| `pgs-option="fieldErrorTitle[]"` (Form) | `pgs-option="formFieldErrorTitle[]"` |
| `pgs-option="fieldError[]"` (Form) | `pgs-option="formFieldError[]"` |
| `pgs-option="fieldsError[]"` (Form) | `pgs-option="formFieldsError[]"` |
| `pgs-option="successTitle[]"` (Form) | `pgs-option="formSuccessTitle[]"` |
| `pgs-option="success[]"` (Form) | `pgs-option="formSuccess[]"` |

The `formValidate` JS API's `options.message` bag uses these same keys (e.g. `formFieldErrorTitle`
instead of `fieldErrorTitle`), since they are written straight through as the `pgs-option` bracket
key. The `success`/`errorForm`/`errorField` `pgs-state` values are unrelated and unchanged.

`buttonReverse` and the `icon-*` glyph names were left alone: those belong to the button and icon
components respectively, even where another component's example or generated markup uses them.
`buttonNohover` did move — see just below.

### The hover opt-out — `buttonNohover` becomes `btnNotHover`

| was | now |
| --- | --- |
| `pgs-option="buttonNohover"` | `button['btnNotHover']` |

The mixin `buttonNohover()` is gone with it. Only a button has an opt-out: a clickable card and a clickable
box always answer the pointer, because the shared hover system that carried `hoverNot` was removed (see the
hover note in section 1).

### `twoState` is gone — mark the label `pgs="button"`

| was | now |
| --- | --- |
| `<label pgs="twoState">` | `<label pgs="button">` |

The control was a button that showed whether its own checkbox or radio was checked, so it is now the
button itself: `[pgs~=button]` hides a nested `input[type=checkbox]`/`input[type=radio]`, keeps the
input's semantics and keyboard behavior, and paints the checked colors through
`--button-*-twoState`. Every button option comes along with it — `buttonStrong`, `buttonMini`,
`buttonIcon`, the color palettes — which the old token could not take. The `twoState()` mixin and
the `[pgs~=twoState]` selector no longer exist; `chip`, `chips`, `toggle` and `checkboxBackground`
are unchanged. Inside `pgs="form"` a label marked as a button is left alone by the generic checkbox
styling, exactly as `twoState` was.

### Icon surface, corrected

| was | now |
| --- | --- |
| `--icon-padding`, `--icon-background` | `--boxed-padding`, `--boxed-background` |
| `--icon-close`, `--icon-chevronDown`, ... (every built-in glyph) | `--icon-glyph-close`, `--icon-glyph-chevronDown`, ... |
| `pgs-option="iconDuo-hamburger"` | `pgs-option="icon-hamburgerTwo iconDuo"` |

The glyphs moved to a namespace of their own: the data URI of each built-in icon is now published as
`--icon-glyph-<name>` instead of `--icon-<name>`, so the drawings no longer sit in the same list as
the icon's actual configuration (`--icon`, `--icon-size`, `--icon-color`). The option written in the
markup is unchanged — `pgs-option="icon-close"` is still `icon-close` — so this only matters to a
stylesheet that read a glyph by hand, e.g. `--icon: var(--icon-close)` becomes
`var(--icon-glyph-close)`.

`iconDuo-hamburger` was NOT left alone as an earlier note here claimed — it no longer exists.
`iconDuo` is now a general-purpose option: it draws the two-layer version of any glyph that has one
(currently only `icon-hamburgerTwo`) when written alongside that glyph's name, instead of being its
own baked-in glyph name. Three new custom properties, `--icon`, `--iconBefore` and `--iconAfter`, let a
later, more specific rule swap the drawn glyph in pure CSS — see the header's expanded hamburger for
the pattern.

### Two tokens that were the last ones off convention

| was | now |
| --- | --- |
| `pgs="bglink-soft"` | `pgs="bgLinkSoft"` |
| `pgs="required-here"` | `pgs="form-requiredHere"` |

`bglink-soft` was the only one of the forty-three `bg*` utilities written in lower case with a dash,
while its own text twin was already `txtLinkSoft`. `required-here` is the marker that says where the
asterisk of a required label goes, and it belongs to the form, so it takes the component's name like
every other child token.

### Events — one prefix for all of them

| was | now |
| --- | --- |
| `modal:open` | `pgs:modal:open` |
| `modal:close` | `pgs:modal:close` |
| `tabs:change` | `pgs:tabs:change` |
| `stepTabs:change` | `pgs:stepTabs:change` |

Four events were dispatched with a bare component prefix, while `pgs:notification:*`,
`pgs:search:*` and `pgs:svg:changeColor` already carried `pgs:`. Every listener needs the new name.
The events keep their element and their detail. They bubble now, which is the one difference worth a
look: see "Consolidation pass" below.

### Card — cardHorizontal switches on a real container query

`cardHorizontal` used to force the switch between stacked and side-by-side with a flex-basis
`calc()` trick (`calc((var(--card-horizontal-breakpoint) - 100%) * 999)`), which needed no
container-type at all but hid the breakpoint inside arithmetic. It is a `@container` query now,
matching pageShell, header and slides elsewhere in the library — but a `@container` condition
cannot take a `var()` reliably, so the breakpoint is fixed in Sass (`$mobile`, 430px, the same
default the custom property held) instead of being read from one. `--card-horizontal-breakpoint`
is gone; nothing else about the option — the 40/60 split, `--card-horizontal-img-grow`,
`--card-horizontal-content-grow`, `--card-horizontal-img-minHeight` — changed. A project that
overrode `--card-horizontal-breakpoint` to move the switch point needs the `@container` rule's
`min-width` changed directly, in a project-side override of the selector.

### Card — `legacy` is gone

`card['legacy']` padded the card itself and pulled a direct `<img>`/`<object>` out to the edges
with negative margins. The option, its rules and the five custom properties behind it
(`--card-img-base`, `--card-img-margin-top`, `--card-img-margin-right`, `--card-img-margin-bottom`,
`--card-img-margin-left`) are removed. A card still carrying `'legacy'` in its bracket gets the
standard card: no padding on the card, the image full-bleed at the top, and the text padded only
inside `pgs="card-content"`.

Search for `'legacy'` and drop the option, then move everything that is not the image into a
`card-content`:

```html
<!-- before -->
<div pgs="card['legacy']">
    <img src="...">
    <h3>...</h3>
    <p>...</p>
</div>

<!-- after -->
<div pgs="card">
    <img pgs="card-img" src="...">
    <div pgs="card-content">
        <h3>...</h3>
        <p>...</p>
    </div>
</div>
```

The image needs `pgs="card-img"` on it: the card no longer styles a bare `<img>`/`<object>` child
on its own (see below). A card with no image at all needs the same `card-content` around its
content, or it loses every bit of its padding. When the image arrives already wrapped, from a
helper or a block of elements, wrap it in `pgs="card-imgForChild"` (see section 3) instead of leaving the wrapper unmarked.

### Card — the image needs `card-img`

The card used to style any direct `<img>` or `<object>` child by tag, token or not. It
now styles only what is marked: `pgs="card-img"` on the image itself, or `pgs="card-imgForChild"`
around it when the markup comes from a helper that writes its own `pgs`. A bare image inside a card
keeps its intrinsic size and loses the full-bleed width, the top radius, `object-fit: cover` and,
in `cardHorizontal`/`horizontalFixed`, its share of the 40/60 split.

```html
<!-- before -->
<article pgs="card">
    <img src="...">

<!-- after -->
<article pgs="card">
    <img pgs="card-img" src="...">
```

### Tooltip is gone — every dropdown has the arrow

Tooltip was a dropdown with three rules of its own: the arrow, a larger `--dropdown-padding`
(15px) and a smaller icon in its trigger. Every dropdown now draws the arrow on its own; the component, its
three tokens (`tooltip`, `tooltip-button`, `tooltip-content`) and `--tooltip-arrow-size` are removed.

```html
<!-- before -->
<span pgs="dropdown tooltip">
    <button pgs="dropdown-button button tooltip-button" type="button">...</button>
    <div pgs="dropdown-content tooltip-content">...</div>
</span>

<!-- after -->
<span pgs="dropdown">
    <button pgs="dropdown-button button['btnMini']" type="button">...</button>
    <div pgs="dropdown-content">...</div>
</span>
```

`tooltip` is dropped, since the arrow needs no flag; `tooltip-button` is dropped and its button takes `btnMini`;
`tooltip-content` is dropped. `--tooltip-arrow-size` becomes `--dropdown-arrow-size`. A page that
relied on the 15px padding sets `--dropdown-padding` itself.

### Custom properties written by JavaScript — an `_` prefix

A custom property the JavaScript writes on its own, recomputed on every open, scroll or resize,
now starts with `_`, the same way generated markup does: setting it from a stylesheet never worked,
since the inline value always won. Rename any read of it:

| was | is now |
| --- | --- |
| `--dropdown-left` / `--dropdown-top` | `--_dropdown-left` / `--_dropdown-top` |
| `--dropdown-arrowLeft` / `--dropdown-arrowTop` | `--_dropdown-arrowLeft` / `--_dropdown-arrowTop` |
| `--slides-visiblePercent` | `--_slides-visiblePercent` |
| `--slides-height` | `--_slides-height` |
| `--notification-timeout` / `--toast-timeout` | `--_alert-timeout` |

`--summary-content-max-height` is gone rather than renamed: the module always overwrote it with
three lines' worth of height, so a value set from a stylesheet only lasted until the script ran.
The collapsed height is now `--summary-lines`, a number of lines (3 by default) that the module
reads and never writes; the height it animates lives in `--_summary-content-height`. A project that
set `--summary-content-max-height` converts it to a line count.

### Slides — the last CSS classes become states

| was | now |
| --- | --- |
| `.view` on a slide | `pgs-state="view"` |
| `.notView` on a slide | `pgs-state="notView"` |
| `.active` on a dot | `pgs-state="active"` |
| `class="slide-dot"` on each dot | `pgs="_slides-dots-dot"` |

Slides was the one component still writing plain classes, which the rest of the library had already
left behind: runtime state lives in `pgs-state`. A stylesheet that hooked into `.view` — to animate
the slide in view, or to style the current dot — needs the attribute selector instead, e.g.
`[pgs-state~="view"]`. The classes on the two arrows, `precButton` and `nextButton`, are gone as
well (see "Consolidation pass" below): `[pgs~="_slides-prev"]` and `[pgs~="_slides-next"]` sit on the
same buttons and are the selectors to move to.

### Three broken custom property references, fixed

Nothing to rename here — these were typos in the library, so the rules they sat in were dropped by
the browser and now apply. Three surfaces change look without any markup changing:

| where | was | is now |
| --- | --- | --- |
| `pgs="table"` rows | `var(--border-box)` / `var(--border-box-transparent)`, neither of which exists, so no zebra striping at all | `var(--color-box)` / `var(--color-box-transparent)`: the alternating rows are drawn |
| `pgs="footer-legal-content"` | `border-top: var(--border) ...`, no such property, so no line | the separator above the legal area is drawn |

A project that worked around any of the three — its own zebra striping on a `pgs="table"`, its own
border above the footer legal row — now has both its rule and the library's.

### Consolidation pass — one contract for every module, and the last names

The components were written one at a time, and the same job was done five different ways. This pass
makes it one way. The renames come first, then what behaves differently under a name that stayed.

| was | now |
| --- | --- |
| `pgs-state="is-active"`, `"is-completed"`, `"is-locked"` on a stepTabs tab or dot | `active`, `completed`, `locked` — also in `pgs(tab).state.remove("is-locked")` and in the CSS that reads them |
| `alert['info']`, `['success']`, `['warning']`, `['error']`, `['neutral']` (also `_alert[...]`, on alert, notification and toast cards) | `alertInfo`, `alertSuccess`, `alertWarning`, `alertError`, `alertNeutral`. The JSON `type` values and the method names (`pgs.toast.info(...)`) do not change |
| `pgs-data="showMore[...] showLess[...]"` on a summary | `summaryShowMore[...]`, `summaryShowLess[...]`. The `message` object given to `pgs.summary.init(root, { message })` keeps `showMore`/`showLess` |
| `slides-prec`, `_slides-prec`; the `precButton` and `nextButton` classes on the generated arrows | `slides-prev`, `_slides-prev`; the classes are gone — select by `[pgs~="_slides-prev"]` and `[pgs~="_slides-next"]` |
| `_notifications`, `_notifications-close`, `_notifications-empty`, `_notificationsDialog` | `_notification`, `_notification-close`, `_notification-empty`, `_notification-dialog` |
| the user-select utility `select['selNone']`, `select['selText']` | `userSelect['selNone']`, `userSelect['selText']`. The `select` of a form field keeps its name |
| `sctSpecificity-child` (and the mixin `sectionSpecifity-child`) | `section-specificity` (and `sectionSpecificity-child`) |
| `data-dropdown-side="bottom"` on `dropdown-content` | `pgs-state="sideBottom"` (`sideTop`, `sideRight`, `sideLeft`) |
| `data-header-scroll="true"` on a header | `pgs-state="hiddenByScroll"`. `data-navsmart-scroll` is gone: nothing ever wrote it |
| `--logo-finter` | `--logo-filter` |
| `--header-letter-spacing`, `--header-letter-spacing-h1` … `-h6` | `--heading-letter-spacing`, `--heading-letter-spacing-h1` … `-h6`. They sat in the header's namespace and the `heading()` mixin never read them |
| mixins `rage()`, `inputcolor()`; `label($borderadius)` and `--label-borderadius` | `range()`, `inputColor()`; `label($borderRadius)` and `--label-borderRadius` |
| `pgs.tabs.api(el).select(index)` | `goTo(index)` |
| `pgs.slides.api(el).previous()` | `prev()` |
| `pgs.search.api(el).refresh()`, which re-ran the current query and returned a Promise | `search()` does that; `refresh()` rebuilds the instance, like everywhere else |
| `--heightOfHeader`, `--heightOfHeaderScroll`, `--heightOfNavSmart`, `--heightOfNavSmartScroll` | `--_header-height`, `--_header-heightScroll`, `--_navSmart-height`, `--_navSmart-heightScroll`. The JS writes them, so they take the `_`: read them, never set them (a theme that declared `--heightOfHeader: 75px` as a first-paint fallback now declares `--_header-height: 75px`) |
| `--button-font-size`, `--badge-icon-size`, `--badge-text-size`, `--search-paddingBlock` | `--button-fontSize`, `--badge-iconSize`, `--badge-textSize`, `--search-padding-block` |
| `--search-suggestions-item-hover-background` and `-color`, `--search-suggestions-item-selected-background` and `-color`, `--table-row-hover-background` and `-color` | the state goes last, like on button and breadcrumb: `--search-suggestions-item-background-hover`, `-color-hover`, `-background-selected`, `-color-selected`; `--table-row-background-hover`, `--table-row-color-hover` |
| `--button-primaryColor` | `--button-baseColor`. It is the accent `btnStrong` and the palette flags (`btnPrimary`…) read |
| `--button-*-hover`, `--button-*-current`, `--button-*-twoState` (background, color, border color, shadow) | declared on every button at rest, from the global tokens, so a theme can set any of them on one element or a container. The hover rule only applies them |
| `--checkboxBackground-background-checked` | gone: a checked `checkboxBackground` reads `--twoState-background`, `--twoState-border-color` and `--twoState-color`. It also has a border now (`--border-complete`) and takes `--hover-background`, `--hover-border-color` and `--hover-color` on hover |
| `btnNotHover` (new) | a button that must not answer the pointer: `button['btnNotHover']`. It replaces the `hoverNot` the buttons used to take; cards and boxes have no opt-out any more |
| `btnText` | text only, black in every state, with a 3 px bottom edge that is secondary on hover and primary when current, no radius, no shadow; it used to take the accent color on hover, current and checked, with no bottom edge |
| `btnTransparent` | on hover it fills like any other button; it used to color only the label |
| `pgs.registerImport(...)`, `pgs.import(...)` | gone; nothing used them. Modules stay reachable as `pgs.modal`, `pgs.toast`, `pgs.tabs`… |
| `pgs.init(root)`, `new pgs.formValidate(form, options)` | `pgs.helper.init(root)`, `new pgs.helper.formValidate(form, options)`. Every helper is under `pgs.helper` now, and the others (`warn`, `invalid`, `dispatch`, `roots`, `directChild`, `directChildren`, `uniqueId`, `rafThrottle`, `watchDocument`, `onDocumentReady`, `escapeHtml`, `formatText`) are public there too. The error messages say `pgs.helper.init()` and `pgs.helper.formValidate()` |

Gone with nothing to put in their place, because nothing used them: the `precButton`/`nextButton`
classes, `data-alert-id`, the init markers `data-initialize`, `data-notification-bell-bound` and
`data-step-tabs-initialized` (a `WeakMap` guards a double init now), the `--button-background-strong`,
`--button-color-strong` and `--button-shadow-strong` that `buttonText()` set and no rule read,
`--search-suggestions-maxRowView`, and the documented-but-never-implemented `search-modal`,
`search-mobile` and `footer-brand-motto`. A project may keep writing those last three as plain hooks
of its own: the library never styled or read them. `slidesNotDots` was documented in the previous
pass without a rule behind it; it works now, and it hides a hand-written `slides-dots` too.

Same name, different behavior:

- **Fixed rules that never applied.** `slidesArrowsCenter`'s tablet rules (the `@container` condition
  was never interpolated), the pageNav skeleton shimmer shown while no panel is active, and the
  `selfStart`…`selfBaseline` flags, which only matched an element that was itself a flex or grid
  root: they belong to the bracket of `flexChild` or `gridChild` now (`flexChild['selfEnd']`), the
  way `flexValue` and `colM` do, and work on any item of the container. `btnReverse` with an icon now swaps its
  two paddings (it gave both sides the icon padding). `m2e` keeps two columns on mobile also with `column-2` and `column-3` flex layouts (it gave one), and `grid['column-1' 'm2e']` stays at one column (it gave two). Check a page that relied on the old rendering.
- **Looks that change.** `--color-white-transparent` and `--color-black-transparent` are really 50%
  now (they computed to 33%), which makes the header background and `bgWhiteTransparent`,
  `bgBlackTransparent` fuller. Every hover background is `--color-secondary-soft`: the plain hovers of
  `button`, `box` and `card`, the table row, the search suggestion, the slides dot and the checkbox
  used `--color-primary-soft`.
  A dropdown panel is as wide as its content up to
  `--dropdown-max-inline-size` instead of always 400px.
- **Negative margins and z-index stop leaking.** `mgNegative` (and the per-side `Negative` flags)
  negated every margin utility of every descendant; each root now resets its own sign. A `zIndex`
  flag no longer reaches a descendant that carries a `zIndex` root of its own.
- **Modal history.** Back and forward open and close the dialog through the normal path (events,
  animation, focus), and no longer push a second history entry.
- **Safe where there is no browser.** Importing the library in Node (SSR) does nothing instead of
  throwing, and the darkmode switch keeps working in memory when `localStorage` is blocked.
- **One lifecycle.** Every component instance has `element`, `destroy()` and `refresh()`. `destroy()`
  releases its listeners, observers and timers and forgets the instance; the markup the module
  generated stays, and a new `init` reuses it. `refresh()` is `destroy()` plus a fresh `init` of that
  element, and returns the new instance. `pgs.<module>.api(el)` returns `undefined` after a `destroy()`
  until `pgs.<module>.init(el)` runs again.
- **Invalid arguments throw.** `tabs.goTo`, `slides.goTo`, `stepTabs.goTo`, `stepTabs.toggleLock` and
  `pageNav.select` throw a `TypeError` for an index or an id that does not exist, where they used to
  clamp or return silently (`stepTabs.next()`/`prev()` still stop at the ends). Invalid *markup* is a
  `console.warn` of the form `pgs.<module>.<method>(): ...` and the element is skipped.
- **Events bubble, once.** A listener on `document` hears every `pgs:*` event. `pgs:modal:close` is
  dispatched for every close, `Escape` and `dialog.close()` included; its `detail` carries `modal` and
  `dialog` next to `element`. A dialog that was moved out of its wrapper still delivers the event to
  its own listeners and to the wrapper, each exactly once.
- **Direct children.** stepTabs reads its tabs, and steps reads its `steps-step`, as direct children
  of the container, so a list nested inside a step no longer leaks into the outer one. A menu item with
  a submenu needs a direct `<a>` (a nested link was picked up before); one without is skipped with a
  warning. A summary needs its `summary-button`: the module does not generate one.
- **`pgs.helper.init(root)` is idempotent.** On a page that is already running, `pgs.darkmode.init` binds only
  the switches it has not bound yet, and no longer re-applies the theme or fires `pgs:svg:changeColor`.
- **Smaller fixes that follow.** A stepTabs wizard without a `stepTabs-container` is skipped with a
  warning instead of aborting the others; the search suggestions are escaped; `formValidate.validate()`
  adds no listener, and `formValidate` has a `destroy()`; the dropdown's four global listeners are
  registered once, not once per `init()`; `<object>` svgs keep their `preserveAspectRatio` when their
  `data` is swapped; an alert closes once even when dismissed right before its timeout.

## 3. New, worth adopting

- **`cardHorizontalFixed`.** The same 40/60 row layout `cardHorizontal` switches to, minus the
  `@container` behind it: for a card whose own width is not a reliable signal — already known
  to be wide enough, or deliberately narrow but still meant to read side-by-side — where
  `cardHorizontal` would stack, this one never does.
- **The dropdown arrow.** The arrow the tooltip used to draw, now on every dropdown by default and
  removed with `dropdown['drpNotArrow']`. It follows the trigger even when the viewport clamp
  pushes the content off-center, and `--dropdown-arrow-size` sizes it. It is what replaced the
  tooltip component; see section 2.
- **`card-imgForChild`.** A wrapper for card media the card does not write itself — an `<img>`
  printed by a helper, a block of elements: the `card-img` treatment lands on its
  direct child, and in `cardHorizontal`/`horizontalFixed` the wrapper itself takes the 40/60 split.
- **Icons with no font.** `pgs="icon"` plus a glyph option covers dozens of shapes and needs nothing
  loaded. Written bare it only marks an element as an icon, which is how a set that does not use
  `<i>` — Material Symbols, Lucide, Iconify — gets the same box and placement.
- **`stepTabsIcon` takes markup.** `stepTabsIcon[<span pgs='icon' class='material-symbols-outlined'>check</span>]`
  works, as does a glyph name or a class list. Inner attributes use single quotes.
- **Border and outline sizing.** `border['bdThin'/'bdThick'/'bdThicker']`, per side too
  (`borderTop['bdTpThick']`, `borderInline['bdInThin']`, ...), and `outline['otlThin'/'otlThick'/'otlThicker']`.
- **Spacing utilities.** Every side and scale of `margin`/`padding`: `margin['mgPage']`,
  `padding['pdUnset']`, `marginBlock['mgBlGroups']`, `margin['mgNegative']`, ...
- **Responsive hiding.** `hide` alone hides unconditionally; `hide['hideMediaUpTablet']`,
  `hide['hideMediaDownMobile']`, `hide['hideContainerUpLaptop']`, ... hide past one breakpoint, by viewport
  or by container, across all six breakpoints, and several options combine for a range.
- **Size utilities.** `width`/`widthMax`/`widthMin`/`height`/`heightMax`/`heightMin`, each with its
  own scale (`width['widthPage']`, `heightMin['heightMin100svh']`, `height['heightUnderMain']`, ...)
  and its own inline custom property (`--width-size`, `--widthMax-size`, `--heightMin-size`, ...).
- **Proportional flex children.** `flexChild['flexS'/'flexM'/'flexL'/'flexXl'/'flexXxl']` grow in
  proportion 1:2:3:4:5 on a zero basis, so a `flexS` next to a `flexL` splits the row 1:3; each
  weight is a custom property (`--flexChild-size-s` … `--flexChild-size-xxl`).
- **Column spans.** `colS`/`colM`/`colL`/`colXl`/`colXxl` take 1 to 5 columns of a `column-N` row
  (`colL` = three columns of a `column-4`), capped by the columns each breakpoint leaves, so a
  span never overflows into extra columns: on `flexChild` inside a `flex['column-N']`, and on the
  new `gridChild` inside a `grid['column-N']`, where it replaces a hand-written
  `grid-column: span N`. `--flexChild-col-*` / `--gridChild-col-*` retune the spans. `grid['gridDense']` lets later items fill the holes a wide span leaves.
- **More utilities.** `textAlign['taCenter']` and the rest of the `ta*` set, `rotate` (180deg bare,
  `rot0`/`rot90`/`rot270` in the bracket), `container['cntNone']`, and `section['sctRemoveGap']`/
  `sctRemoveGapTop`/`sctRemoveGapBottom` to drop a section's outer margin.
- **`modal['dialogAnimationZoom']`.** The dialog panel grows out of the `modal-button` that opened it and
  shrinks back into it on close, PhotoSwipe-style, with the backdrop fading alongside.
  `--modal-animation-timing` (333ms) and `--modal-animation-easing` tune it; reduced motion skips it.
- **`modal['dialogAnimationLeft']`, `dialogAnimationRight`, `dialogAnimationTop`,
  `dialogAnimationBottom`.** The panel slides in from that edge of the screen and goes back there on
  close, with the same backdrop fade, timing and reduced-motion handling as `dialogAnimationZoom`.
  While any of them runs, the dialog carries `pgs-state="animationIn"` / `animationOut`.
- **`column-1`** stacks a flex or grid layout in a single column.
- **`pgs.header.init(root)`** is registered, several headers on one page are supported, and
  `headerMain` says which one drives `--heightOfHeader`.
- **Focus is separate from hover.** The focus ring is identical everywhere and no longer sits inside
  a hover media query, so a keyboard user on a touch device gets one; `bodyBase` draws it for every
  `:focus-visible` element.
- **A button can be a two-state control.** `<label pgs="button">` around a checkbox or radio hides
  the input, keeps its semantics, and paints the checked state from `--button-*-twoState` — with
  every button option available on it. This is what replaced `twoState`.
- **`alertContainer`, `notificationBell`** are new public tokens.
- **A theme switch can carry its label anywhere.** `toggleDarkmode['tglLabeled']` writes the
  theme the click leads to next to the glyph. The rule used to be baked into the footer, where it
  applied whether or not the page wanted it and reached no switch outside; it now lives in the
  darkmode layer, opt-in, with `--darkmode-label-toDark` and `--darkmode-label-toLight`
  to translate it — both take a CSS string, quotes included.

## 4. A sweep to run on the project

```sh
# 1. color utilities that moved to txt*
grep -rnE 'pgs="[^"]*\bcolor[A-Z]' .

# 2. generated markup now prefixed
grep -rnE '\b(notifications-element|_?notifications(-empty|-close|Dialog)?|toast-element|search-suggestions-item|stepTabs-dots-dot|menu-buttonIcon)\b' .

# 3. options and states that were renamed
grep -rnE '\b(menuHeader|buttonClose|mobileBottom|mobileActive|slideScale|notScrollAnimation|pageShell-aside-scroll|header-element-onlyDesktop|header-element-onlyMobile)\b' .

# 4. custom properties that were renamed or removed
grep -rnE '\-\-(fa-|menu-|icon-background|icon-padding|border-complete-hover|slide-shadow|pageShell-aside-sticky-top|header-mobile-bottom-active|color-.*-background|color-linkBackground)' .

# 5. the silent one: icon as a surface
grep -rn 'pgs="[^"]*\bicon\b' . | grep -v 'pgs-option'

# 6. options renamed to carry their component's name
grep -rnE 'pgs-option="(singleScroll|shadowDesktop|notScrollWithMouse|slideAnimationScale|tabIcon|shellAsideScroll|shellFullPage|horizontal|vertical|position|containerID|containerPGS|disableBackdropClose|history|left|right|topLevel|compactBottom)([" \[])' .

# 7. Step tabs' bare token, and the old hamburger duo option
grep -rnE 'pgs="[^"]*\btab\b|pgs-option="[^"]*\biconDuo-hamburger\b' .

# 8. menus that may rely on the old unconditional-dropdown submenu behavior
grep -rnE 'pgs="menu"|pgs-option="[^"]*\bmenuVertical\b' . -A2 -B2

# 9. a header with no pgs-option, which silently lost scroll-hide
grep -rnE 'pgs="header"\s*>' .

# 10. gap/wrap written as a bare pgs value instead of pgs-option
grep -rnE 'pgs="[^"]*\b(gapTexts|gapElements|gapSections|gapNone|nowrap|wrap)\b' .

# 11. calls to the removed scrollHorizontal helpers, and the removed Slides option
grep -rnE 'pgs\.scrollHorizontal(WithMouse)?\(|slides\[[^]]*.slidesScrollMouse.' .

# 12. the hover opt-out, renamed
grep -rn 'buttonNohover\|hoverNot' .

# 13. button custom properties renamed from -active to -twoState
grep -rn -- '--button-\(background\|color\|border-color\)-active' .

# 14. the two-state control, now a button
grep -rn 'twoState' .

# 15. submit buttons that relied on the form styling them (read, don't replace)
grep -rn 'type="submit"' . | grep -v 'pgs='

# 16. accordion groups that need the new container (read, don't replace)
grep -rn 'pgs="[^"]*\baccordion\b' .

# 17. built-in glyphs read by hand, now on the --icon-glyph-* namespace
grep -rnE 'var\(--icon-(?!glyph|color|size)' .

# 18. the header hamburger group, now an onlyCompact group, with the modal nested rather than merged
grep -rn 'header-element-hamburger' .
grep -rnE 'pgs="[^"]*header-element-onlyCompact[^"]*\bmodal\b' .

# 19. global tokens renamed onto the --SIZE scale
grep -rnE -- '--padding-2|--padding-page|--font-titoli' .

# 20. the trailing header area, now a second alwaysOn group
grep -rn 'header-element-alwaysOnLast' .

# 21. the two button options that traded places (read, don't replace)
grep -rnE 'buttonText|buttonTransparent' .

# 22. theme switches the footer used to label on its own (read, don't replace)
grep -rnE 'pgs="[^"]*\btoggleDarkmode\b' .

# 23. the last two tokens off convention
grep -rn 'bglink-soft' .
grep -rn 'required-here' .

# 24. listeners on the four renamed events
grep -rnE '\b(modal:open|modal:close|tabs:change|stepTabs:change)\b' .

# 25. stylesheets hooked into the slides classes, now states
grep -rnE '\.(view|notView|slide-dot)\b' .

# 26. the removed hover system (delete each hit)
grep -rnE "hoverNot|bodyHoverAuto|hover-text|buttonNohover|pgs\.hover|pgs=\"[^\"]*\bhover\b|--hover-(shadow|timing|behavior|st1)" .

# 27. cardHorizontal's breakpoint, no longer a custom property
grep -rn 'card-horizontal-breakpoint' .

# 28. cards still on the removed legacy geometry (read, don't replace)
grep -rnE "card\\[[^]]*'legacy'|--card-img-(base|margin)" .

# 29. cards whose image carries no card-img (read, don't replace)
grep -rnE -A3 'pgs="card(\[|")' . | grep -E '<(img|object|picture)\b' | grep -v 'card-img'

# 30. the tooltip component, now a plain dropdown
grep -rnE 'tooltip(-button|-content)?\b|--tooltip-arrow-size' .

# 31. custom properties written by JavaScript, now _-prefixed
grep -rnE -- '--(dropdown-left|dropdown-top|dropdown-arrowLeft|dropdown-arrowTop|slides-visiblePercent|slides-height|notification-timeout|toast-timeout|summary-content-max-height)\b' .

# 32. utility families folded into one bracket each (read, then rename by the table)
grep -rnE '\b(margin|padding)(Top|Bottom|Left|Right|Block|Inline|Auto|Texts|Elements|Sections)\b' .
grep -rnE '\b(border(Top|Bottom|Left|Right|Block|Inline|Thin|Thick|Thicker|RadiusInput|RadiusExternal)|outline(Thin|Thick|Thicker))\b' .
grep -rnE 'pgs="([^"]* )?(br|ol|bg|txt|color)[A-Z]' .
grep -rnE '\b(section(Full|Max|NoPadding|Specificity|Edge[A-Za-z]*)|sectionSpecificity-child)\b' .
grep -rnE '\bbody(Base|Img|Text|Heading|HoverAuto)\b' . | grep -v "body\['"
grep -rnE '\b(position(Relative|Absolute|Sticky)|overflow(Auto|XAuto|Hidden)|aspect(Square|Video)|select(None|Text)|pointerEvents(None|Auto)|img(Cover|Contain))\b' .
grep -rnE '\bflex-flex[A-Za-z0-9]+|lottieChangeColor' .
# 33. flags that took their component prefix (read, then rename by the prefix table)
grep -rnE "accordion(Container)?\[[^]]*'(autoOpen|multiOpen)'|badge\[[^]]*'(dot|error|info|neutral|success|warning)'|card\[[^]]*'horizontalFixed'|dropdown\[[^]]*'hover'" .
grep -rnE "icon\[[^]]*'(boxed|duo|large|medium)'|logo\[[^]]*'darkmode|menu\[[^]]*'(iconOnlyCurrent|short|vertical)'|slides\[[^]]*'(animationScale|shadowDesktop|singleScroll)'" .
grep -rnE "header\[[^]]*'(compact[A-Za-z]+|main|scroll)'|pageShell\[[^]]*'(asideScroll|asideShadow|fullPage)'|toggleDarkmode\[[^]]*'labelled'" .
grep -rnE "container\[[^]]*'none'|img\[[^]]*'(cover|contain)'|borderRadius\[[^]]*'(input|external)'|hide\[[^]]*'(media|container)(Up|Down)" .

# 34. the cookie consent that left the library
grep -rnE "cookieConsent(-actionOpen)?\b|pgs\.cookieConsent" .

# 35. every slides, to decide whether its arrows stay over the slides (read, don't replace)
grep -rnE "pgs=\"[^\"]*slides(\[|\"| )" .

# 36. stepTabs states, alert flags, the summary data keys, the slides arrows (rename by the "Consolidation pass" table)
grep -rnE 'pgs-state="[^"]*\bis-(active|completed|locked)|state\.[a-z]+\("is-(active|completed|locked)"' .
grep -rnE "(alert|_alert|toast|notification)\[[^]]*'(info|success|warning|error|neutral)'" .
grep -rnE '\b(showMore|showLess)\[|\bslides-prec\b|_slides-prec|class="[^"]*\b(precButton|nextButton)\b|\.(precButton|nextButton)\b' .

# 37. generated tokens and the two utilities that changed owner
grep -rnE '\bsctSpecificity-child\b|sectionSpecifity-child|select\[[^]]*.(selNone|selText)' .

# 38. data attributes that became pgs-state, and the custom properties and mixins that were misspelled
grep -rnE 'data-(dropdown-side|header-scroll|navsmart-scroll|alert-id)' .
grep -rnE -- '--(logo-finter|header-letter-spacing|label-borderadius|heightOf(Header|NavSmart)(Scroll)?|button-font-size|badge-(icon|text)-size|search-paddingBlock|search-suggestions-item-(hover|selected)-(background|color)|table-row-hover-(background|color))\b|@include (rage|inputcolor)\b' .

# 39. calls that changed name or meaning (read, don't replace)
grep -rnE '\.(select|previous)\(|\bgetCurrent\(\)|\.refresh\(\)' .

# 40. the two helpers that moved under pgs.helper
grep -rnE '\bpgs\.(init|formValidate)\b|\b(pgsApi|mypgs\.pgs)\.(init|formValidate)\b' .
```

Hit 5 needs reading rather than replacing: an `icon` that wraps another element wanted the surface
and needs `icon['iconBoxed']`; one that was empty next to a label wanted the glyph and needs an
`icon-*` option. Hits 8 and 9 need reading too, not replacing: they flag menus and headers whose
*behavior* changed under an unchanged name (see section 1), so add `headerScroll` or accept the new
accordion submenus, whichever the page actually wants. Hit 15 is the same kind: a submit button that
sits inside a `pgs="form"` and carries no `pgs` used to be styled by the form and now is not, so it
needs `pgs="button"` written on it — one outside a form was never styled and needs nothing. Hit 16
is the last of the kind: a set of accordions that used to close each other needs `accordionContainer`
on its wrapper, while a standalone one needs nothing. Hit 21 too: `buttonText` and `buttonTransparent`
swapped implementations, so every hit needs the other name — but read each one, because a link that
should stay filled when it is the current page wants `buttonTransparent`, and only a button that
must never fill wants `buttonText`. Hit 22 closes the set: a switch that sat in a footer and
showed a written label needs `toggleDarkmode['tglLabeled']` to keep it, while one that was
icon-only — in a header, or anywhere outside the footer — needs nothing. Hits 23 and 24 are plain substitutions:
`bglink-soft` → `bgLinkSoft`, `required-here` → `form-requiredHere`, and each of the four events
gains its `pgs:` prefix, and the slides classes each become the `pgs-state` or generated token named
after them. Hit 26 is a deletion: `hoverNot`, `bodyHoverAuto`, `hover-text` and `pgs="hover"` come out of the markup (a `hoverNot` on a button becomes `btnNotHover` in the button's bracket; on a card or a box it has no replacement). A rule
that set `--hover-background` or `--hover-color` on an element to recolor its hover needs the component's own
tokens instead (`--button-background-hover` and `--button-color-hover` on a button, `--card-background` on a
link card, `--box-background` on a link box); the same names on `:root` are the new global ones, so leave
those alone. Hit 27 needs reading: a project that never touched
`--card-horizontal-breakpoint` needs nothing, one that did override it needs the same `min-width`
written into its own `@container` rule instead. Hit 32 needs reading: the patterns also catch PHP
variable names and CSS properties that happen to share the spelling (`$imgCover`, `marginTop` in a
style object); rename only what ends up inside a `pgs` attribute, by the table in "Every utility
family is one bracket". A name built by concatenation or picked from an ACF field
(`pgs="<?= $imgCover ?>"`) is the one that slips through, so read those templates too. Hit 33 is
the same kind: it only sees a flag written inside its bracket, so a PHP helper that receives the
flags as a plain string (`PGS_md_menu('footer', 'vertical')`) has to be found by reading the calls. Hit 28 needs reading as well: dropping `'legacy'` is
the easy half, each hit also needs its non-image content moved into a `pgs="card-content"`, which
only the markup can tell you how to split. Hit 29 is a starting point, not a complete list: it only
sees an image written within three lines of the card, so an image printed by a helper
(`PGS_fn_img()` and the like) has to be found by reading the card templates, and wrapped in
`card-imgForChild`.

Hit 40 is a plain substitution too: `pgs.init(` becomes `pgs.helper.init(` and `pgs.formValidate` becomes
`pgs.helper.formValidate`. Hits 36 and 37 are plain substitutions by the "Consolidation pass" table, with one caution for 37:
`select[...]` is only the user-select utility when its flag is `selNone` or `selText`; the `select` of
a form field is unchanged. Hit 38 is a substitution too, except a stylesheet that read
`[data-dropdown-side="bottom"]` or `[data-header-scroll="true"]` needs `[pgs-state~="sideBottom"]` and
`[pgs-state~="hiddenByScroll"]`. Hit 39 needs reading: `.select(i)` on a tabs instance is now `.goTo(i)`
and `.previous()` on a slides instance is `.prev()`, but the pattern also matches `.select()` on a
search instance (unchanged) and every `.refresh()` — check that a caller of `refresh()` expects the
new instance back and not a re-run of the parent, and that a `getCurrent()` on a pageNav wanted an
index and not the panel (`getCurrentPanel()`).
