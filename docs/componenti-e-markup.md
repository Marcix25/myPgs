# Components and markup

Canonical component and layout examples are available in `reference/`. Use those files as the reference source before creating new markup.

## Componenti disponibili

Componenti:

- [`accordion`](components/accordion.md)
- [`alerts`](components/alerts.md)
- [`badges`](components/badges.md)
- [`breadcrumb`](components/breadcumbs.md)
- [`button`](components/button.md)
- [`card`](components/card.md)
- [`dropdown`](components/dropdown.md)
- [`form`](components/form.md)
- [`formAddon`](components/formAddon.md)
- [`logo`](components/logo.md)
- [`menu`](components/menu.md)
- [`modal`](components/modal.md)
- [`notification`](components/notification.md)
- [`search`](components/search.md) (`search-suggestions` opzionale)
- [`slides`](components/slides.md)
- [`steps`](components/steps.md)
- [`stepTabs`](components/stepTabs.md)
- [`summary`](components/summary.md)
- [`table`](components/table.md)
- [`tooltip`](components/tooltip.md)

Layout:

- [`body`](layout/body.md)
- [`section`](layout/section.md)
- [`header`](layout/header.md)
- [`footer`](layout/footer.md)
- [`pageShell`](layout/pageShell.md)
- [`responsive`](layout/responsive.md)

Pattern:

- [`cookieConsent`](patterns/cookieConsent.md)

## Search with suggestions

`search` include sia lo stile sia il comportamento di ricerca e usa `search-suggestions` come lista opzionale:

```html
<form pgs="button search" pgs-option="buttonNohover" autocomplete="off">
  <button type="submit">Cerca</button>
  <input type="search" name="s" placeholder="Cerca">
  <ul pgs="search-suggestions"></ul>
</form>
```

The project provides the data source; `mypgs` does not depend on specific backend endpoints or formats:

```js
const form = pgs(document).querySelector("search");

pgs.search.api(form)?.configure({
  minLength: 2,
  debounce: 200,
  limit: 8,
  source: async ({ query, signal, limit }) => {
    const response = await fetch(`/api/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`, { signal });
    const payload = await response.json();

    return payload.items.map(item => ({
      label: item.title,
      value: item.value,
      data: item,
    }));
  },
});
```

La sorgente puo' essere anche un array locale di stringhe o oggetti. Il componente gestisce debounce, annullamento richieste, risposte fuori ordine, tastiera, selezione, click esterno, stati `open`, `loading` ed `error` e attributi ARIA. Gli eventi `pgs:search:select` e `pgs:search:error` sono emessi sul root `search`.

## Other elements without reference files

Base:

- `htmlBase`
- `initP`
- `heading`
- `boxtext`
- `darkmode-lightmode`
- `img`
- `borderRadius`
- `olther`
