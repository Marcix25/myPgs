# Componenti e markup

I template completi sono in `templates/`. Usa quei file come sorgente di riferimento prima di creare markup nuovo.

## Componenti disponibili

Componenti:

- [`accordion`](components/accordion.md)
- [`badges`](components/badges.md)
- [`breadcrumb`](components/breadcumbs.md)
- [`button`](components/button.md)
- [`card`](components/card.md)
- [`dropdown`](components/dropdown.md)
- [`form`](components/form.md)
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
- [`flex`](layout/flex.md)
- [`grid`](layout/grid.md)

Pattern:

- [`cookieConsent`](patterns/cookieConsent.md)

## Search con suggerimenti

`search` include sia lo stile sia il comportamento di ricerca e usa `search-suggestions` come lista opzionale:

```html
<form pgs="buttonNohover search" autocomplete="off">
  <button type="submit">Cerca</button>
  <input type="search" name="s" placeholder="Cerca">
  <ul pgs="search-suggestions"></ul>
</form>
```

Il progetto fornisce la sorgente dati; `mypgs` non dipende da endpoint o formati backend specifici:

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

## Altri elementi senza template

Base:

- `htmlBase`
- `initP`
- `heading`
- `boxtext`
- `darkmode-lightmode`
- `img`
- `borderRadius`
- `olther`
