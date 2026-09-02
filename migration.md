# Migrating a project onto this branch

Everything below is what changed in `mypgs` since the last merge into `master` — fourteen commits,
still versioned 4.7.1. It is written to be handed to whoever updates a consuming project: each entry
says what to search for and what to write instead.

Read section 1 first. Those are the changes that break nothing loudly: the names survived and the
meaning moved under them, so nothing errors and the page just looks wrong.

## 1. Same name, new meaning — check these first

| name | was | is now |
| --- | --- | --- |
| `pgs="icon"` | the round surface holding an icon | the glyph itself, drawn from inline SVG |
| `--icon-size` | the width driver of that surface | the size of a glyph, read as a font-size |

So `<span pgs="icon"><i class="fa-solid fa-star"></i></span>` no longer draws a circle. The surface
is now an option on an icon element:

```html
<span pgs="icon" pgs-option="iconBox">
    <i pgs="icon" pgs-option="icon-star"></i>
</span>
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
`menu-buttonIcon` → each one gains a leading `_`.

###
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

### Menu

`pgs-option="menuHeader"` is gone, and with it every `--menu-*` custom property: `--menu-background`,
`--menu-background-current`, `--menu-background-strong`, `--menu-border`, `--menu-color`,
`--menu-color-current`, `--menu-color-strong`.

Menu links are no longer styled by the menu. Write the button tokens on the link and configure it
with the `--button-*` properties you already know:

```html
<li><a pgs="button" pgs-option="buttonText" href="/">Home</a></li>
```

### Slides

| was | now |
| --- | --- |
| `pgs-option="slideScale"` | `pgs-option="slideAnimationScale"` |
| `pgs-option="notScrollAnimation"` | `pgs-option="notScrollWithMouse"` |
| `--slide-shadow-color`, `--slide-shadow-width` | `--slides-maskStart`, `--slides-maskEnd`, `--slides-sizeMaskImage` |

The edge fade is a mask now, not a shadow, so it fades to whatever is behind instead of to one colour.

### Page shell

| was | now |
| --- | --- |
| `pgs="pageShell-aside-scroll"` | `pgs-option="shellAsideScroll"` on the aside |
| `--pageShell-aside-sticky-top` | `--pageShell-aside-top` |

### Buttons and borders

| was | now |
| --- | --- |
| `pgs-option="buttonClose"` | `pgs-option="buttonIcon buttonMini"` |
| `--border` | `--border-width`, alongside the new `--border-style` |
| `--border-complete-hover` | gone; nothing replaces it |

Border and outline are now separate: `br*` colours need `pgs="border"`, `ol*` need `pgs="outline"`,
and each family has its own thickness options.

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
| `pgs-option="shellAsideScrollFlush"` | `pgs-option="pageShellAsideScrollFlush"` |
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

`buttonReverse`, `buttonNohover`, the `icon-*` glyph names, and `iconDuo-hamburger` were left alone:
those belong to the button and icon components respectively, even where another component's example
or generated markup uses them.

## 3. New, worth adopting

- **Icons with no font.** `pgs="icon"` plus a glyph option covers seventeen shapes and needs nothing
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
  a hover media query, so a keyboard user on a touch device gets one.
- **`alertContainer`, `notificationTrigger`, `toastExe`, `lottieChangeColor`** are new public tokens.

## 4. A sweep to run on the project

```sh
# 1. colour utilities that moved to txt*
grep -rnE 'pgs="[^"]*\bcolor[A-Z]' .

# 2. generated markup now prefixed
grep -rnE '\b(notifications-element|notifications-empty|toast-element|search-suggestions-item|stepTabs-dots-dot|cookieConsent-panel|menu-buttonIcon)' .

# 3. options and states that were renamed
grep -rnE '\b(menuHeader|buttonClose|mobileBottom|mobileActive|slideScale|notScrollAnimation|pageShell-aside-scroll|header-element-onlyDesktop|header-element-onlyMobile)\b' .

# 4. custom properties that were renamed or removed
grep -rnE '\-\-(fa-|menu-|icon-background|icon-padding|border-complete-hover|slide-shadow|pageShell-aside-sticky-top|header-mobile-bottom-active)' .

# 5. the silent one: icon as a surface
grep -rn 'pgs="[^"]*\bicon\b' . | grep -v 'pgs-option'

# 6. options renamed to carry their component's name
grep -rnE 'pgs-option="(singleScroll|shadowDesktop|notScrollWithMouse|slideAnimationScale|tabIcon|shellAsideScroll|shellAsideScrollFlush|shellFullPage|horizontal|vertical|position|containerID|containerPGS|disableBackdropClose|history|left|right|topLevel|compactBottom)([" \[])' .
```

Hit 5 needs reading rather than replacing: an `icon` that wraps another element wanted the surface
and needs `pgs-option="iconBox"`; one that was empty next to a label wanted the glyph and needs an
`icon-*` option.
