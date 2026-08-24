# JavaScript helper

`pgs(root)` finds and edits PGS tokens without writing selectors by hand:

```js
const modal = pgs(document).querySelector("modal");

pgs(modal).contains("modal");
pgs(modal).add("custom-token");
pgs(modal).remove("custom-token");
pgs(modal).toggle("custom-token", true);
```

## The `pgs` helper API

Search, available on `Document` and `Element`:

- `pgs(root).querySelector(token)`: returns the first descendant carrying the requested `pgs` token.
- `pgs(root).querySelectorAll(token)`: returns every matching descendant; also accepts an array or comma-separated tokens.

Manipulation, available when `root` is an `Element`:

- `pgs(element).add(...tokens)`: adds tokens without duplicating them and returns the helper.
- `pgs(element).remove(...tokens)`: removes the given tokens and returns the helper.
- `pgs(element).toggle(token, force)`: flips or forces the token and returns the resulting state.
- `pgs(element).contains(token)`: checks for the exact token.
- `pgs(element).value`: reads or replaces the whole `pgs` attribute.

Runtime states:

```js
pgs(modal).state.add("open");
pgs(modal).state.toggle("open", false);
pgs(modal).state.contains("open");
```

- `state.add(...states)`, or `state(...states)`: adds one or more states.
- `state.remove(...states)`: removes the given states.
- `state.toggle(state, force)`: flips or forces a state and returns the result.
- `state.contains(state)`: checks whether the state is present.
- `state.value`: reads or replaces the whole `pgs-state` attribute.

Options:

```js
pgs(modal).option.contains("history");
pgs(modal).option.getValueBrackets("containerID");
```

- `option.add(...options)`: adds plain or parameterized options.
- `option.remove(...keys)`: removes options by their key.
- `option.toggle(option, force)`: flips or forces an option.
- `option.contains(key)`: checks for a key even when it carries a payload.
- `option.getValueBrackets(key)`: returns what is inside the square brackets, or `undefined`.
- `option.setValueBrackets(key, value)`: sets or replaces a single parameterized option.
- `option.value`: reads or replaces the whole `pgs-option` attribute.

Example markup with options:

```html
<div pgs="modal" pgs-option="containerID[modal-container]"></div>
<div pgs="slides" pgs-option="singleScroll shadowDesktop"></div>
```

## Automatically initialized JavaScript

Importing `mypgs` initializes:

- the global `pgs` helper
- dark mode
- SVG object handling
- accordion
- dropdown
- menu
- modals
- slides
- steps
- step tabs
- notifications
- search with optional suggestions
- header
- cookie consent

Components with instances use internal `WeakMap`s to expose their instance API.

## Module API

The main modules are registered in `assets/javascript/_imports.js` in two ways.

`pgs.init(root)` initializes the registered modules in the order they appear in `registerModules(...)`: when a module uses another one's API during its own `init` (for example `cookieConsent` calling `pgs.modal.api(...)`), the one it needs has to be listed first.

### Direct registry

This is what makes the modules reachable straight from `pgs`:

```js
pgs.registerModules({
  init: PGS_init,
  darkmode: PGS_darkmode,
  svg: PGS_svg,
  accordion: PGS_accordion,
  dropdown: PGS_dropdown,
  menu: PGS_menu,
  modal: PGS_modal,
  cookieConsent: PGS_cookieConsent,
  notification: PGS_notification,
  toast: PGS_toast,
  search: PGS_search,
  slides: PGS_slides,
  stepTabs: PGS_stepTabs,
  steps: PGS_steps,
  summary: PGS_summary,
  formValidate: PGS_formValidate,
  scrollHorizontal: PGS_scrollHorizontal,
});
```

Recommended usage:

```js
pgs.toast.success({ title: "Saved" });
pgs.modal.api(modalEl)?.open();
pgs.dropdown.api(dropdownEl)?.close();
pgs.slides.api(slidesEl)?.next();
```

Shortcuts available after `import "mypgs"`:

- `pgs.init`
- `pgs.cookieConsent`
- `pgs.darkmode`
- `pgs.svg`
- `pgs.accordion`
- `pgs.dropdown`
- `pgs.menu`
- `pgs.modal`
- `pgs.notification`
- `pgs.toast`
- `pgs.search`
- `pgs.slides`
- `pgs.stepTabs`
- `pgs.steps`
- `pgs.summary`
- `pgs.formValidate`
- `pgs.scrollHorizontal`

## Component API reference

The signature, the parameters and the purpose of every method are generated from the comments in the HTML references:

- [Accordion](../components/accordion.md#javascript-api)
- [Dropdown](../components/dropdown.md#javascript-api)
- [Form validation](../components/form.md#javascript-api)
- [Menu](../components/menu.md#javascript-api)
- [Modal](../components/modal.md#javascript-api)
- [Notification](../components/notification.md#javascript-api)
- [Toast](../components/toast.md#javascript-api)
- [Search](../components/search.md#javascript-api)
- [Slides](../components/slides.md#javascript-api)
- [Step Tabs](../components/stepTabs.md#javascript-api)
- [Steps](../components/steps.md#javascript-api)
- [Summary](../components/summary.md#javascript-api)
- [Tooltip, through Dropdown](../components/tooltip.md#javascript-api)

The components that are not listed expose no JavaScript API of their own.

## Public JavaScript utilities

- `pgs.init(root)`: finds the registered modules that expose `init(root)` and initializes markup added dynamically.
- `pgs.cookieConsent.init(root)`: initializes the cookie consent pattern inside the given `Document` or `Element` without duplicating listeners.
- `pgs.darkmode.init(root)`: initializes the `toggleDarkmode` controls inside the given `Document` or `Element` without duplicating listeners already applied.
- `pgs.scrollHorizontal(element, speed)`: turns vertical wheel movement into horizontal scrolling while the container can still move in the requested direction, and returns a function that removes the listener.
- `pgs.svg.init()`: refreshes the colours of the SVG files and the Lottie players on the page together.
- `pgs.svg.applyColorsSVG(isDarkMode)`: refreshes the colours of the SVG files loaded through `object` and marked with `svgChangeColor`.
- `pgs.svg.applyColorsLottie(isDarkMode)`: refreshes the colours of the SVG inside the Lottie players marked with `lottieChangeColor`.
- `pgs.svg.eventChangeColor`: holds the name of the `pgs:svg:changeColor` event the SVG module listens for.

## Component module structure

Components with instances follow this shape:

```js
export const PGS_modal = {
  init: PGS_modal_init,
  api: PGS_modal_api
};
```

`PGS_modal_init` and `PGS_modal_api` stay internal to the module: the only export of the file is `PGS_modal`. The same applies to the other components.

- `init`: initializes or re-initializes the markup in the `Document` or `Element` it receives; with no argument it uses `document`.
- `api`: returns the API of a single already-initialized instance.

Example:

```js
pgs.modal.init();
pgs.modal.api(modalEl)?.open();
```

`PGS_notification` and `PGS_toast` are a different case: they behave more like services than instances, they have no `api(element)`, and they are used through `pgs.notification.*` and `pgs.toast.*` (see below). The pre-split form `pgs.notification.alert.*` / `pgs.notification.toast.*` still works, but only for backward compatibility: in new code use `pgs.notification.*` for the persistent panel and `pgs.toast.*` for the ephemeral message.

### Notification and Toast

`pgs.notification` is a persistent panel of messages, opened and closed with `notificationBell` and dismissed only by hand. `pgs.toast` is an ephemeral message shown one at a time, dismissing itself after `timeout`. They are two independent modules: see [Notification](../components/notification.md) and [Toast](../components/toast.md) for the complete declarative markup.

The `pgs.notification` panel lives inside a `<dialog>` managed by `pgs.modal`. Author only the wrapper with the bell, with no dialog inside it:

```html
<div pgs="modal">
    <button pgs="modal-button button notificationBell" pgs-option="buttonIcon" aria-label="Open notifications">
        <i class="fa-duotone fa-solid fa-bell"></i>
        <span pgs="notificationBell-counter"></span>
    </button>
</div>
```

At the first notification, `pgs.notification` generates `<dialog pgs-option="right"><div pgs="modal-dialog-content"><div pgs="notifications"></div></div></dialog>` inside that wrapper on its own and calls `pgs.modal.init()` to activate it — opening, closing and closing when another dialog opens on the page are handled entirely by `pgs.modal`, not by `pgs.notification`. `pgs.toast` uses no dialog and no modal: it stays an independent fixed container as before.

```js
pgs.notification.success({
    title: "Saved",
    description: "Your changes have been saved.",
    buttons: [
        { title: "Go to profile", link: "/profile" },
        { id: "yes", title: "Yes" },
        { id: "no", title: "No" },
        { id: "close", title: "Close", close: true }
    ]
});

pgs.toast.success({ title: "Saved" });
```

Every entry of `buttons` (only on `pgs.notification`, `pgs.toast` does not support it) accepts:

- `id` (optional): reported in the `buttonClick` event; generated automatically when absent.
- `title` (required): the text of the button.
- `link` (optional): when present the button is an `<a href>` that navigates normally; when absent it is a `<button>` that does not.
- `close` (optional, defaults to `true`): unless set to `false`, the click also dismisses the notification. The default dismiss button (`closeTitle`) is always present, whatever `buttons` holds.
- `optionButton` (optional): a string applied as `pgs-option` on the generated button, to reuse existing styles and behaviour, for example `"optionButton": "buttonIcon"`.

Available events, all bubbling, so they can be delegated on `document`:

```js
document.addEventListener("pgs:notification:buttonClick", (event) => {
    const { id, buttonId, link } = event.detail;
    if (buttonId === "yes" || buttonId === "no") {
        // send the answer to the server...
    }
    // event.preventDefault() holds back the link navigation, if there is one,
    // until your asynchronous work has finished.
});

document.addEventListener("pgs:notification:close", (event) => { /* event.detail.id */ });
document.addEventListener("pgs:notification:deleteAll", (event) => { /* event.detail.ids */ });
```

Pass your own `id` in `options.id` to correlate a notification with your own logic, otherwise one is generated. `pgs.notification.deleteAll()` removes every notification from the panel and dispatches `pgs:notification:deleteAll`.

## Registry and extension

- `pgs.registerModules(modules)`: exposes an object of modules directly as properties of `pgs` and refuses incompatible overwrites.
- `pgs.registerImport(...modules)`: registers modules in the named registry used by advanced integrations.
- `pgs.import(...names)`: returns the requested modules from the registry and throws for names that are not registered.
