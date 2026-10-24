const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

// _pgs.js is an ES module that imports the helpers pgs.helper publishes; the vm runs it as a plain
// script, so the import lines go and the helpers are stand-ins (none of them is under test here,
// except the one that builds the TypeError, which keeps the voice the messages are written in). The
// names come from the import lines themselves, so there is no second list to keep in step
const pgsSource = read('assets/javascript/_pgs.js');
const importedHelpers = [...pgsSource.matchAll(/^import \{([^}]*)\} from/gm)]
    .flatMap(match => match[1].split(',').map(name => name.trim()).filter(Boolean));
const context = Object.fromEntries(importedHelpers.map(name => [name, () => {}]));
context.PGS_invalid = (scope, message) => new TypeError(`pgs.${scope}(): ${message}`);
vm.runInNewContext(pgsSource
    .replace(/^import .*\n/gm, '')
    .replace('export function pgs', 'function pgs'), context);
const { pgs } = context;

function element(attributes = {}, tagName = 'DIV') {
    const values = new Map(Object.entries(attributes));
    return {
        tagName,
        getAttribute: key => values.get(key) ?? null,
        setAttribute: (key, value) => values.set(key, String(value)),
        removeAttribute: key => values.delete(key),
        querySelector: () => null,
        querySelectorAll: () => [],
    };
}

test('component mutations preserve brackets and merge without duplicating component roots', () => {
    const el = element({ pgs: "button['btnMini' 'btnStrong'] flex['column']" });
    const api = pgs(el);
    assert.equal(api.contains('button'), true);
    assert.equal(api.contains('btnMini'), false);
    api.add('itemCenter', 'button', "button['btnReverse']");
    assert.equal(api.value, "button['btnMini' 'btnStrong' 'btnReverse'] flex['column'] itemCenter");
    assert.equal(api.toggle('button', false), false);
    assert.equal(api.value, "flex['column'] itemCenter");
    api.remove('flex');
    assert.equal(api.value, 'itemCenter');
});

test('bracket flags stay in the matching bracket and do not collide with longer names', () => {
    const el = element({ pgs: "button['btnMini'] icon['icon-moon'] flex['columnReverse']" });
    const options = pgs(el).option;
    assert.equal(options.contains('column'), false);
    // turning a bracket flag off still goes through option.remove/toggle (a generic, non-owning
    // operation); turning one on needs the base add(), naming the owning component directly
    options.toggle('icon-moon', false);
    pgs(el).add("icon['icon-sun']");
    pgs(el).add("button['btnStrong']", "flex['gapTexts']");
    assert.equal(el.getAttribute('pgs'), "button['btnMini' 'btnStrong'] icon['icon-sun'] flex['columnReverse' 'gapTexts']");
    assert.equal(el.getAttribute('pgs-data'), null);
    assert.equal(el.getAttribute('pgs-option'), null);
});

test('JS-only flags and nested JSON survive updates and removal of adjacent keys', () => {
    const payload = JSON.stringify({ nested: [[1, 2], { text: 'literal ] [ and "quotes"', path: 'a\\b' }] });
    const el = element({ pgs: "header['headerMain' 'headerScroll']", 'pgs-data': `config[${payload}] headerCompactFrom[600]` });
    const options = pgs(el).option;
    const data = pgs(el).data;
    data.setValueBrackets('headerCompactFrom', '800');
    assert.equal(data.getValueBrackets('config'), payload);
    assert.equal(data.getValueBrackets('headerCompactFrom'), '800');
    assert.equal(data.getValueBrackets('headerMain'), undefined);
    assert.equal(options.contains('headerScroll'), true);
    options.remove('headerMain');
    assert.equal(data.getValueBrackets('config'), payload);
    assert.equal(el.getAttribute('pgs'), "header['headerScroll']");
    assert.equal(el.getAttribute('pgs-option'), null);
});

test('valued getters/setters use only pgs-data; the retired attribute is ignored', () => {
    const el = element({ pgs: "button['btnMini']", 'pgs-option': 'scroll config[old]' });
    const options = pgs(el).option;
    const data = pgs(el).data;
    assert.equal(options.contains('scroll'), false);
    assert.equal(data.getValueBrackets('config'), undefined);
    data.setValueBrackets('config', '["nested", "]"]');
    assert.equal(data.getValueBrackets('config'), '["nested", "]"]');
    assert.equal(el.getAttribute('pgs-option'), 'scroll config[old]');
    assert.equal(el.getAttribute('pgs'), "button['btnMini']");
    data.setValueBrackets('empty');
    assert.equal(data.getValueBrackets('empty'), '');
});

test('data.value is a plain passthrough on pgs-data, never the pgs bracket', () => {
    const el = element({ pgs: "modal-dialog['dialogRight' 'dialogHistory']", 'pgs-data': 'modalContainerID[my dialog]' }, 'DIALOG');
    const options = pgs(el).option;
    const data = pgs(el).data;
    assert.equal(data.value, 'modalContainerID[my dialog]');
    data.value = 'modalContainerID[other dialog] modalContainerPGS[header]';
    assert.equal(el.getAttribute('pgs'), "modal-dialog['dialogRight' 'dialogHistory']");
    assert.equal(data.getValueBrackets('modalContainerID'), 'other dialog');
    assert.equal(options.contains('dialogRight'), true);
    assert.equal(options.contains('dialogHistory'), true);
    data.value = null;
    assert.equal(el.getAttribute('pgs-data'), null);
    assert.equal(data.value, null);
});

test('unmatched payload brackets do not yield a partial value', () => {
    const data = pgs(element({ 'pgs-data': 'broken[[1, 2]' })).data;
    assert.equal(data.getValueBrackets('broken'), undefined);
});

test('option.add never writes to pgs-data; a flag with no owner present becomes its own bare pgs token', () => {
    const css = read('dist/css/index.css');
    const flags = new Set([...css.matchAll(/\[pgs\*="'([^']+)'"\]/g)].map(match => match[1]));
    assert(flags.size > 100);
    for (const flag of flags) {
        const el = element();
        pgs(el).option.add(flag);
        assert.equal(el.getAttribute('pgs-data'), null, `${flag} must not be written to pgs-data`);
        assert.equal(el.getAttribute('pgs'), flag, `${flag} with no matching owner present must land as its own bare pgs token`);
    }
});

test("option.add derives the owning component from the flag's own name and merges into its bracket", () => {
    // most flags carry an abbreviated prefix (btnMini, mgAuto), which derives btn/mg and not the
    // component name — only a flag that starts with its component's own full name (cardMini,
    // menuVertical, the icon-* glyphs) can be derived here, so a bare add() finds its way home
    // without the caller naming the component. margin2 stands in for such a flag in this test;
    // see the next test for what happens to a flag with an abbreviated prefix
    const el = element({ pgs: 'margin' });
    pgs(el).option.add('margin2');
    assert.equal(el.getAttribute('pgs'), "margin['margin2']");
    assert.equal(el.getAttribute('pgs-data'), null);
});

test("option.add cannot derive an owner from a shortened flag name; it lands bare like itemCenter", () => {
    // this is the real cost of abbreviating: button['btnMini'] and margin['mgAuto'] must be written
    // explicitly through the base pgs(el).add() — option.add('btnMini') / option.add('mgAuto') alone
    // derive btn / mg, which is not the component name
    const button = element({ pgs: 'button' });
    pgs(button).option.add('btnMini');
    assert.equal(button.getAttribute('pgs'), 'button btnMini');

    const margin = element({ pgs: 'margin' });
    pgs(margin).option.add('mgAuto');
    assert.equal(margin.getAttribute('pgs'), 'margin mgAuto');
});

test('option.add falls back to a bare pgs token when no owner is present, like itemCenter on a plain button', () => {
    const el = element({ pgs: 'button' });
    pgs(el).option.add('itemCenter');
    assert.equal(el.getAttribute('pgs'), 'button itemCenter');
    assert.equal(pgs(el).option.contains('itemCenter'), true);
    pgs(el).option.remove('itemCenter');
    assert.equal(el.getAttribute('pgs'), 'button');
});

test('option.remove strips a flag whether it is bare or nested in a bracket', () => {
    const el = element({ pgs: "header['headerScroll' 'headerMain'] itemCenter" });
    pgs(el).option.remove('headerScroll', 'itemCenter');
    assert.equal(el.getAttribute('pgs'), "header['headerMain']");
});

test('tabsHistory is genuine pgs-data: bare via data.value, or with its optional payload', () => {
    const el = element();
    const data = pgs(el).data;
    data.value = 'tabsHistory';
    assert.equal(el.getAttribute('pgs-data'), 'tabsHistory');
    assert.equal(el.getAttribute('pgs'), null);
    data.setValueBrackets('tabsHistory', 'docs');
    assert.equal(el.getAttribute('pgs-data'), 'tabsHistory[docs]');
    data.value = null;
    assert.equal(el.getAttribute('pgs-data'), null);
});

test('boolean flags with no payload live in the component bracket, not pgs-data', () => {
    for (const [component, flag] of [
        ['header', 'headerScroll'], ['header', 'headerMain'],
        ['accordion', 'accAutoOpen'], ['accordionContainer', 'accMultiOpen'],
        ['slides', 'slidesSingleScroll'],
        ['dropdown', 'drpHover'], ['modal', 'dialogHistory'],
    ]) {
        const el = element();
        pgs(el).add(`${component}['${flag}']`);
        assert.equal(el.getAttribute('pgs-data'), null, `${flag} must not be written to pgs-data`);
        assert.equal(pgs(el).option.contains(flag), true, `${flag} must be found through option.contains()`);
    }
});

test('option.add is idempotent, and a flag that is its own owner is not merged into itself', () => {
    // column, wrap and card derive themselves as their owner: merging would write column['column']
    for (const flag of ['column', 'wrap', 'card']) {
        const el = element({ pgs: flag });
        pgs(el).option.add(flag);
        assert.equal(el.getAttribute('pgs'), flag, `${flag} already present must stay as it is`);
    }

    const el = element({ pgs: "card['cardMini'] flex['column']" });
    pgs(el).option.add('card', 'cardMini', 'column');
    assert.equal(el.getAttribute('pgs'), "card['cardMini'] flex['column']");

    const bare = element({ pgs: 'button btnMini' });
    pgs(bare).option.add('btnMini', 'btnMini');
    assert.equal(bare.getAttribute('pgs'), 'button btnMini');
});

test('state.remove and state.toggle leave no empty pgs-state attribute', () => {
    const el = element({ 'pgs-state': 'open active' });
    const state = pgs(el).state;
    state.remove('open');
    assert.equal(el.getAttribute('pgs-state'), 'active');
    state.remove('active');
    assert.equal(el.getAttribute('pgs-state'), null);

    state.toggle('open');
    assert.equal(el.getAttribute('pgs-state'), 'open');
    assert.equal(state.toggle('open'), false);
    assert.equal(el.getAttribute('pgs-state'), null);

    state.add('open');
    state.toggle('open', false);
    assert.equal(el.getAttribute('pgs-state'), null);
});

test('invalid input to the pgs core throws a TypeError in the library voice', () => {
    assert.throws(() => pgs(null), { name: 'TypeError', message: /^pgs\.pgs\(\): root is required/ });
    assert.throws(() => pgs({}), { name: 'TypeError', message: /^pgs\.pgs\(\): root must support/ });
    assert.throws(() => pgs.registerModules({ helper: {} }), { name: 'TypeError', message: /^pgs\.registerModules\(\): "helper" is already defined/ });
});

//= VITE PLUGIN
// the plugin is an ES module in a package with no "type": the vm runs it as a plain script
function loadVitePlugin() {
    const source = read('plugins/vite-plugin-pgs.js').replace('export default function pgsVite', 'function pgsVite');
    return vm.runInNewContext(`${source}\npgsVite`, {});
}

test('the vite plugin renames pgsHtml only where it is a JSX attribute', () => {
    const plugin = loadVitePlugin()();
    const run = (code, id = 'App.tsx') => plugin.transform(code, id)?.code ?? code;

    assert.equal(run('<div pgsHtml="card">x</div>'), '<div pgs="card">x</div>');
    assert.equal(run('<Button\n  type="submit"\n  pgsHtml = "button[\'btnMini\']"\n/>'), '<Button\n  type="submit"\n  pgs = "button[\'btnMini\']"\n/>');
    assert.equal(run('<a {...props} pgsHtml={value} href="#">'), '<a {...props} pgs={value} href="#">');
    assert.equal(run('<input disabled pgsHtml="field" />'), '<input disabled pgs="field" />');

    // code is left alone: destructuring defaults, parameters, declarations, properties, comparisons, arrows
    const code = [
        'const { pgsHtml = "" } = props;',
        'function Card({ a, pgsHtml = "x" }) {}',
        'const f = (pgsHtml = 1) => pgsHtml;',
        'let pgsHtml = 1;',
        'var pgsHtml = 2;',
        'props.pgsHtml = 3;',
        'if (pgsHtml == 1 || pgsHtml === 2) {}',
        'const g = pgsHtml => pgsHtml;',
        '// pgsHtml = 4',
        'const other_pgsHtml = 5;',
    ].join('\n');
    assert.equal(plugin.transform(code, 'App.jsx'), null);
});

test('the vite plugin takes ids with a query string and skips other files', () => {
    const plugin = loadVitePlugin()();
    assert.equal(plugin.transform('<p pgsHtml="x" />', '/src/App.tsx?v=abc123').code, '<p pgs="x" />');
    assert.equal(plugin.transform('<p pgsHtml="x" />', '/src/App.jsx?import&t=1').code, '<p pgs="x" />');
    assert.equal(plugin.transform('<p pgsHtml="x" />', '/src/App.ts'), null);
    assert.equal(plugin.transform('<p pgsHtml="x" />', '/src/App.tsx.map'), null);
    assert.equal(plugin.transform('<p pgs="x" />', 'App.tsx'), null);
});

//= DECLARATIONS
// every helper and module the library publishes has to be declared, and nothing declared may be missing
function objectKeys(source, opener) {
    const start = source.indexOf(opener);
    assert.notEqual(start, -1, `${opener} not found`);
    const open = source.indexOf('{', start);
    let depth = 0;
    let end = open;
    for (; end < source.length; end++) {
        if (source[end] === '{') depth++;
        if (source[end] === '}' && --depth === 0) break;
    }
    return [...source.slice(open + 1, end).matchAll(/(?:^|,)\s*([A-Za-z_$][\w$]*)\s*[:,(]/gm)].map(match => match[1]);
}

function interfaceMembers(source, name) {
    const start = source.indexOf(`interface ${name} {`);
    assert.notEqual(start, -1, `interface ${name} not found`);
    const open = source.indexOf('{', start);
    let depth = 0;
    let end = open;
    for (; end < source.length; end++) {
        if (source[end] === '{') depth++;
        if (source[end] === '}' && --depth === 0) break;
    }
    // the members at the top level of the interface only: what is nested in a signature is not one
    const members = [];
    let nesting = 0;
    for (const line of source.slice(open + 1, end).split('\n')) {
        const match = nesting === 0 && line.match(/^\s*([A-Za-z_$][\w$]*)\??\s*[:(<]/);
        if (match) members.push(match[1]);
        for (const char of line) {
            if ('{(['.includes(char)) nesting++;
            if ('})]'.includes(char)) nesting--;
        }
    }
    return members;
}

test('dist/index.d.ts declares every helper pgs.helper has', () => {
    const declared = read('dist/index.d.ts');
    const published = [
        ...objectKeys(read('assets/javascript/_pgs.js'), 'pgs.helper = '),
        ...objectKeys(read('assets/javascript/_imports.js'), 'Object.assign(pgs.helper, '),
    ].sort();
    const typed = interfaceMembers(declared, 'PgsHelper').sort();
    assert(published.length >= 12);
    assert.deepEqual(typed, published);
});

test('dist/index.d.ts declares every module registerModules registers', () => {
    const declared = read('dist/index.d.ts');
    const registered = objectKeys(read('assets/javascript/_imports.js'), 'pgs.registerModules(').sort();
    const typed = interfaceMembers(declared, 'PgsFunction').filter(name => !['registerModules', 'helper'].includes(name)).sort();
    assert(registered.length >= 15);
    assert.deepEqual(typed, registered);
});
