# PGS HTML Suggestions

Autocomplete for `pgs="..."` and `pgs-data="..."` in HTML/PHP, read directly from
`reference/pgs-map.json` (generated with `node scripts/generate-pgs-map.js`).

- `pgs="flex["` suggests only the options of `flex` (never those of `grid`, `modal`, etc.).
- `pgs-data="` suggests the keys of the components already written in the `pgs="..."` of the same tag,
  falling back to all keys if it finds none.
- Brackets are suggested only on a real root of the map: a generated child (even
  one that can be addressed by hand, like `modal-dialog`) never carries a bracket of its own, so it
  never receives these options — only `pgs-data`, if the root documents any, is still suggested there too.
- It also recognizes `pgs(el).option.*(...)` and `pgs(el).data.*(...)` in JS/TS, without scoping (there
  is no element to infer the component from).

## Development

```sh
npm install
npm run compile      # or npm run watch
npm run package      # produces ../../pgs-html-suggestions.vsix
```

Reload the map from the command (`PGS: Reload pgs-map.json`) or automatically: a file watcher
watches `reference/pgs-map.json` and updates itself on every `node scripts/generate-pgs-map.js`.
