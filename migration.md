# Migrating a project onto this branch

Everything below is what changed in `mypgs` since the last merge into `master` — over twenty commits,
still versioned 4.7.1. It is written to be handed to whoever updates a consuming project: each entry
says what to search for and what to write instead.

Read section 1 first. Those are the changes that break nothing loudly: the names survived and the
meaning moved under them, so nothing errors and the page just looks wrong.

## 1. Same name, new meaning — check these first

| name | was | is now |
| --- | --- | --- |
| `pgs="icon"` | the round surface holding an icon | the glyph itself, drawn from inline SVG |
| `--icon-size` | the width driver of that surface | the size of a glyph, read as a font-size |
| `pgs-option="menuVertical"` (and any submenu below a horizontal menu's first level) | floated as a dropdown, same as every other submenu | expands in place as an accordion |
| a plain `<a>` in body content | `color: var(--color-black)`, underline on hover | `color: var(--color-link)`, background highlight on hover |
| `pgs-state="info"` (alert/badge/notification/toast) | read `--color-link`/`--color-linkBackground` directly | reads `--color-info`/`--color-info-soft`, which only default to the link colours |
| `pgs="header"` with no options | hid itself on scroll-down automatically | does nothing on scroll unless `pgs-option="headerScroll"` is also written |
| `pgs.scrollHorizontal(element, speed)` | converted a mouse wheel only, ignoring a trackpad/Magic Mouse | converts any wheel source, trackpad included |
| `pgs="button"`, a link `pgs="card"`, a link `pgs="box"` | the hover treatment was baked into each component's CSS | the treatment lives only under `pgs="hover"`, which the JS adds to these at load |
| a bare `<button type="submit">` inside `pgs="form"` | the form styled it as a strong button on its own | draws nothing: mark it `pgs="button"` yourself |
| several `pgs="accordion"` next to each other | opening one closed every other accordion on the page | each one answers for itself: wrap them in `pgs="accordionContainer"` to get the old behaviour |
| `pgs-option="buttonText"` and `pgs-option="buttonTransparent"` | `buttonTransparent` stripped every state, `buttonText` only the resting one | the two traded places: `buttonText` strips every state, `buttonTransparent` only the resting one |
| `pgs="toggleDarkmode"` inside `pgs="footer"` | the footer wrote "Dark mode"/"Light mode" next to the glyph on its own | the label is opt-in, and available everywhere: add `pgs-option="toggleDarkmodeExtended"` |
| `pgs.hover`'s marking (a button, and a card or box written as a link) | ran on every page as soon as the bundle loaded, and `pgs.hover.init(root)` always ran on request | needs `pgs="bodyHoverAuto"` on `<body>` to run at all, by any path — the automatic pass, a direct `pgs.hover.init(root)` call, or `pgs.init(root)`, which reaches every module's `init(root)` regardless of what the caller meant to touch |

So `<span pgs="icon"><i class="fa-solid fa-star"></i></span>` no longer draws a circle. The surface
is now an option on an icon element:

```html
<span pgs="icon" pgs-option="iconBox">
    <i pgs="icon" pgs-option="icon-star"></i>
</span>
```

Menu: only the first level of a `menuHorizontal` menu still floats its submenu in a dropdown panel.
Every other submenu — a nested level inside that same horizontal menu, or anything inside a vertical
menu — now expands in place instead, via a generated `_menu-accordion` token and `pgs-state="open"`.
Nothing to rename, but a vertical menu with submenus will look different: check it visually.

Links: recolour `--color-link`/`--color-link-soft` if the previous black-with-underline look was
intentional rather than inherited from never having set them.

Info state: if you retheme "info" surfaces by overriding `--color-link`, set `--color-info` (and
`--color-info-soft`) instead — they used to be the same colour by coincidence, now only by default.

Header scroll-hide: this used to run unconditionally on every `pgs="header"`. A header with no
`pgs-option` at all — which is what `PGS_theme`'s own header currently has — silently stops hiding on
scroll after this merge unless `headerScroll` is added to it.

Scroll horizontal: the old mouse-only behaviour moved to a new function,
`pgs.scrollHorizontalWithMouse(element, speed)` — Slides' `slidesScrollMouse` now calls that one
internally, so its own behaviour is unchanged. If you called `pgs.scrollHorizontal` directly and
relied on trackpad input being left alone, switch that call to `pgs.scrollHorizontalWithMouse`.

Hover: the shared treatment is no longer written three times. `[pgs~=button]`, `[pgs~=card]:where(a)`
and `[pgs~=box]:where(a)` dropped their own copy, and `pgs.hover` — a new base module, loaded by the
bundle — marks those surfaces with `hover` when the page loads and keeps them in sync afterwards
(markup the library injects later, a token added at runtime, `hoverNot` toggled on or off). The
output is the same and there is nothing to rename, with two consequences: a project that loads
`dist/css` **without** `dist/javascript` loses hover on buttons, clickable cards and clickable boxes
— and with it the keyboard focus ring, which is part of the same treatment, so write `hover` in the
markup there — and the `buttonHover()` mixin no longer exists, since nothing composed it any more. A
custom element that wants the treatment in CSS includes `hoverBase()`, `hoverStyle1()` and
`focus()`, the three it was an alias for.

Form submit: `[pgs~=form]` no longer styles `button[type="submit"]`. It used to give any bare submit
button inside a form `buttonBase` + `buttonContent` + `buttonStrong` + `buttonHover`, styling it by
tag instead of by token — the one place left where writing no `pgs` still produced a component. Now
nothing errors and nothing is renamed: the button simply falls back to the browser's own look. Write
it out to get the same button as before:

```html
<button pgs="button" pgs-option="buttonStrong" type="submit">Send</button>
```

`buttonHover` needs no equivalent — `pgs.hover` adds the hover token to anything marked `pgs="button"`.
This one is worth a pass over every form in the project, since the markup keeps working and only the
look changes.

Accordion: opening a panel used to close every other accordion in the document, wherever it was —
two unrelated groups on the same page fought each other, and a single standalone panel was closed by
somebody else's. The rule now needs a group: `pgs="accordionContainer"` on the element that wraps a
set of accordions, typically the `<ul>`, and only the panels of that same group close each other.
Nothing errors, and a lone accordion is better off than before; what changes silently is a set that
relied on the old behaviour, which now lets all of its panels stay open:

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
label taking the accent colour on hover, and `buttonStrong` or `aria-current` still filling the
button in. `buttonText` is the absolute one: every state transparent, so the button never fills,
not even when it is the current page. Navigation links want the first, which is why every menu,
header and notification example in the library now writes `buttonTransparent` where it used to write
`buttonText`. Search the project for both names and swap each for the other:

```html
<li><a pgs="button" pgs-option="buttonTransparent" href="/">Home</a></li>
```

## 2. Renames

### Text colour utilities — `color*` becomes `txt*`

Thirty-eight tokens, one straight substitution: `colorPrimary` → `txtPrimary`, `colorError` →
`txtError`, `colorWhiteFixed` → `txtWhiteFixed`, and so on for every `color*` you were using. The
family now matches `bg*`, `br*` and `ol*`.

### Markup the library builds — an `_` prefix

These were always generated at runtime; the prefix now says so. Style them and query them, never
write them by hand.

`notifications-element` `notifications-element-buttons` `notifications-element-content`
`notifications-element-icon` `notifications-empty` `toast-element` `toast-element-buttons`
`toast-element-content` `toast-element-icon` `search-suggestions-item` `stepTabs-dots-dot`
`cookieConsent-panel` `cookieConsent-panel-badge` `cookieConsent-panel-featureAnalytics`
`cookieConsent-panel-featureEssential` `cookieConsent-panel-toggleAnalytics`
`cookieConsent-actionReject` `cookieConsent-actionAccept` `menu-buttonIcon` → each one gains a
leading `_`. `cookieConsent-actionOpen` is unaffected: you write that trigger yourself, it is not
generated.

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
| `--slide-shadow-color`, `--slide-shadow-width` | `--slides-maskStart`, `--slides-maskEnd`, `--slides-sizeMaskImage` |
| `pgs-option="slidesNotScrollWithMouse"` | `pgs-option="slidesScrollMouse"` |

The edge fade is a mask now, not a shadow, so it fades to whatever is behind instead of to one colour.

The mouse-scroll option's default also flipped, not just its name: `slidesNotScrollWithMouse` opted OUT of mouse-wheel scrolling (on by default), while `slidesScrollMouse` opts IN (off by default). Simply renaming the token in existing markup silently disables the behavior — check each usage and add the option where the effect is still wanted.

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
| `--button-background-active` | `--button-background-checked` |
| `--button-color-active` | `--button-color-checked` |
| `--button-border-color-active` | `--button-border-color-checked` |

The three button custom properties were renamed to say what they actually do: "active" was only ever
read under `:has(input:checked)`, so a checked state wearing the name of a generic one. The reading
also moved — it used to sit inside the `twoState` mixin, so only that control picked it up; it is now
in `buttonBase()`, so any element marked `pgs="button"` that wraps a checked input takes the checked
colours. That is what let `twoState` be dropped altogether — see just below. Retheming stays the same
otherwise: set the three properties on the element or a container, under the new names. Nothing reads
the old ones any more, so a project that overrode them silently loses the override.

Border and outline are now separate: `br*` colours need `pgs="border"`, `ol*` need `pgs="outline"`,
and each family has its own thickness options.

### Global tokens — one `--SIZE` scale

| was | now |
| --- | --- |
| `--padding-2` | `--padding-half` |
| `--padding-page` | `--page-padding` |
| `--font-titoli` | `--font-heading` |

The spacing rhythm now comes off a single root value, `--SIZE`. `--padding`, `--padding-half`,
`--page-padding`, `--border-radius`, `--border-radius-input`, `--gap-texts` and `--gap-elements` are
all derived from it, so retheming the whole scale is one number instead of seven. The three renames
are a consequence: `-2` said "divided by two" rather than what it is, and `--padding-page` was the
only page token not on the `--page-*` prefix that `--page-width`, `--page-top` and `--page-edge`
already shared.

Two behaviours moved with the names, so a project that only renames still gets a different result:

- `--page-padding` is a plain measure, where `--padding-page` was `min(5vw, var(--padding))`. The
  page gutter no longer shrinks on a narrow screen. Put the clamp back on the new name if a project
  wants it: `--page-padding: min(5vw, var(--padding))`.
- `--page-edgeFlush` is now one `--page-padding` shorter than `--page-edge`, so it lands on the outer
  edge of a section box rather than on its text, and reaches zero as soon as that box stops fitting
  rather than when the bare column does.

The `margin2` and `padding2` options keep their names while reading `--padding-half` — the token is
the public name, the custom property is the plumbing, and renaming the options too would have been a
second breaking change for no gain.

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

### The hover opt-out — `buttonNohover` becomes `hoverNot`

| was | now |
| --- | --- |
| `pgs-option="buttonNohover"` | `pgs-option="hoverNot"` |

The mixin `buttonNohover()` is gone with it, replaced by `hoverNot()` in the hover set, and `buttonHover()` was removed too (see the hover note in section 1). There is one
opt-out now instead of one per component, because there is one hover treatment: `hoverNot` works on
a button, on a clickable card and on a clickable box alike — the last two had no opt-out at all
before. `pgs.hover` skips a surface that carries it, and the SCSS guard covers a `hover` written by
hand. Menu's generated toggle and Step tabs' generated dots write the new name themselves.

### `twoState` is gone — mark the label `pgs="button"`

| was | now |
| --- | --- |
| `<label pgs="twoState">` | `<label pgs="button">` |

The control was a button that showed whether its own checkbox or radio was checked, so it is now the
button itself: `[pgs~=button]` hides a nested `input[type=checkbox]`/`input[type=radio]`, keeps the
input's semantics and keyboard behaviour, and paints the checked colours through
`--button-*-checked`. Every button option comes along with it — `buttonStrong`, `buttonMini`,
`buttonIcon`, the colour palettes — which the old token could not take. The `twoState()` mixin and
the `[pgs~=twoState]` selector no longer exist; `chip`, `chips`, `toggle` and `checkboxBackground`
are unchanged. Inside `pgs="form"` a label marked as a button is left alone by the generic checkbox
styling, exactly as `twoState` was.

### Icon surface, corrected

| was | now |
| --- | --- |
| `--icon-padding`, `--icon-background` | `--iconBox-padding`, `--iconBox-background` |
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
own baked-in glyph name. Two new custom properties, `--icon`, `--iconBefore` and `--iconAfter`, let a
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
The events themselves are unchanged: same element, same detail, and still not bubbling, so the
listener stays where it is.

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
`[pgs-state~="view"]`. The classes on the two arrows, `precButton` and `nextButton`, are untouched
in this pass, though `[pgs~="slides-prec"]` and `[pgs~="slides-next"]` sit on the same buttons and
are the selectors to move to.

### Three broken custom property references, fixed

Nothing to rename here — these were typos in the library, so the rules they sat in were dropped by
the browser and now apply. Three surfaces change look without any markup changing:

| where | was | is now |
| --- | --- | --- |
| `pgs="table"` rows | `var(--border-box)` / `var(--border-box-transparent)`, neither of which exists, so no zebra striping at all | `var(--color-box)` / `var(--color-box-transparent)`: the alternating rows are drawn |
| `pgs="footer-legal-content"` | `border-top: var(--border) ...`, no such property, so no line | the separator above the legal area is drawn |
| `pgs="cookieConsent"` | `gap: var(--gap-)`, a truncated token, so no gap | `var(--gap-texts)` between heading, text and buttons |

A project that worked around any of the three — its own zebra striping on a `pgs="table"`, its own
border above the footer legal row — now has both its rule and the library's.

## 3. New, worth adopting

- **`cardHorizontalFixed`.** The same 40/60 row layout `cardHorizontal` switches to, minus the
  `@container` behind it: for a card whose own width is not a reliable signal — already known
  to be wide enough, or deliberately narrow but still meant to read side-by-side — where
  `cardHorizontal` would stack, this one never does.
- **Icons with no font.** `pgs="icon"` plus a glyph option covers dozens of shapes and needs nothing
  loaded. Written bare it only marks an element as an icon, which is how a set that does not use
  `<i>` — Material Symbols, Lucide, Iconify — gets the same box and placement.
- **`tabIcon` takes markup.** `tabIcon[<span pgs='icon' class='material-symbols-outlined'>check</span>]`
  works, as does a glyph name or a class list. Inner attributes use single quotes.
- **Border and outline sizing.** `borderThin`/`borderThick`/`borderThicker` and the `outline*` set.
- **Spacing utilities.** `padding`, `padding2`, `paddingPage`, `paddingUnset`, and the same for
  `margin`.
- **Responsive hiding.** `hideMediaUp*`/`hideMediaDown*` by viewport, `hideContainerUp*`/
  `hideContainerDown*` by container, across all six breakpoints.
- **`column-1`** stacks a flex or grid layout in a single column.
- **`pgs.header.init(root)`** is registered, several headers on one page are supported, and
  `headerPrimary` says which one drives `--heightOfHeader`.
- **Focus is separate from hover.** The focus ring is identical everywhere and no longer sits inside
  a hover media query, so a keyboard user on a touch device gets one. It is drawn by `pgs="hover"`
  along with the rest of the treatment, so it reaches a button, a clickable card or box through the
  token `pgs.hover` marks them with.
- **`pgs="hover"` is a token you can write.** The whole treatment — surface recolour, `hover-text`,
  focus ring — comes from one place, so any element can take it, not just the components that used
  to bake it in. `pgs.hover` writes it for you on buttons and clickable cards/boxes, and
  `pgs-option="hoverNot"` takes it back off.
- **A button can be a two-state control.** `<label pgs="button">` around a checkbox or radio hides
  the input, keeps its semantics, and paints the checked state from `--button-*-checked` — with
  every button option available on it. This is what replaced `twoState`.
- **`alertContainer`, `notificationTrigger`, `toastExe`, `lottieChangeColor`** are new public tokens.
- **A theme switch can carry its label anywhere.** `pgs-option="toggleDarkmodeExtended"` writes the
  theme the click leads to next to the glyph. The rule used to be baked into the footer, where it
  applied whether or not the page wanted it and reached no switch outside; it now lives in the
  darkmode layer, opt-in, with `--darkmode-label-toDark` and `--darkmode-label-toLight`
  to translate it — both take a CSS string, quotes included.

## 4. A sweep to run on the project

```sh
# 1. colour utilities that moved to txt*
grep -rnE 'pgs="[^"]*\bcolor[A-Z]' .

# 2. generated markup now prefixed
grep -rnE '\b(notifications-element|notifications-empty|toast-element|search-suggestions-item|stepTabs-dots-dot|cookieConsent-panel|cookieConsent-actionReject|cookieConsent-actionAccept|menu-buttonIcon)' .

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

# 8. menus that may rely on the old unconditional-dropdown submenu behaviour
grep -rnE 'pgs="menu"|pgs-option="[^"]*\bmenuVertical\b' . -A2 -B2

# 9. a header with no pgs-option, which silently lost scroll-hide
grep -rnE 'pgs="header"\s*>' .

# 10. gap/wrap written as a bare pgs value instead of pgs-option
grep -rnE 'pgs="[^"]*\b(gapTexts|gapElements|gapSections|gapNone|nowrap|wrap)\b' .

# 11. direct calls to scrollHorizontal that relied on the old mouse-only behaviour
grep -rn 'pgs\.scrollHorizontal(' .

# 12. the hover opt-out, renamed
grep -rn 'buttonNohover' .

# 13. button custom properties renamed from -active to -checked
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

# 26. a body with no bodyHoverAuto, which silently lost the automatic hover marking
grep -rnE '<body\b[^>]*\bpgs="' . | grep -vE 'bodyHoverAuto'

# 27. cardHorizontal's breakpoint, no longer a custom property
grep -rn 'card-horizontal-breakpoint' .
```

Hit 5 needs reading rather than replacing: an `icon` that wraps another element wanted the surface
and needs `pgs-option="iconBox"`; one that was empty next to a label wanted the glyph and needs an
`icon-*` option. Hits 8 and 9 need reading too, not replacing: they flag menus and headers whose
*behaviour* changed under an unchanged name (see section 1), so add `headerScroll` or accept the new
accordion submenus, whichever the page actually wants. Hit 15 is the same kind: a submit button that
sits inside a `pgs="form"` and carries no `pgs` used to be styled by the form and now is not, so it
needs `pgs="button"` written on it — one outside a form was never styled and needs nothing. Hit 16
is the last of the kind: a set of accordions that used to close each other needs `accordionContainer`
on its wrapper, while a standalone one needs nothing. Hit 21 too: `buttonText` and `buttonTransparent`
swapped implementations, so every hit needs the other name — but read each one, because a link that
should stay filled when it is the current page wants `buttonTransparent`, and only a button that
must never fill wants `buttonText`. Hit 22 closes the set: a switch that sat in a footer and
showed a written label needs `pgs-option="toggleDarkmodeExtended"` to keep it, while one that was
icon-only — in a header, or anywhere outside the footer — needs nothing. Hits 23 and 24 are plain substitutions:
`bglink-soft` → `bgLinkSoft`, `required-here` → `form-requiredHere`, and each of the four events
gains its `pgs:` prefix, and the slides classes each become the `pgs-state` or generated token named
after them. Hit 26 needs reading, not replacing: a `<body>` that never wrote `pgs="bodyHoverAuto"` simply
never got the automatic marking, so this only flags pages that carry some other `pgs` value on
`<body>` already — a bare `<body>` with none at all was never in scope for the grep and needs
`bodyHoverAuto` added regardless if it uses `pgs="button"`, a link `card` or `box` anywhere and relied on
the hover treatment showing up on its own. Hit 27 needs reading: a project that never touched
`--card-horizontal-breakpoint` needs nothing, one that did override it needs the same `min-width`
written into its own `@container` rule instead.
