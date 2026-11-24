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

test('the base api adds, removes, toggles and checks components only, keeping their brackets', () => {
    const el = element({ pgs: "button['btnMini' 'btnStrong'] flex['column']" });
    const api = pgs(el);
    assert.equal(api.contains('button'), true);
    assert.equal(api.contains('btnMini'), false);
    // a component already there keeps its bracket; a new one goes at the end, once
    api.add('itemCenter', 'button', 'itemCenter');
    assert.equal(api.value, "button['btnMini' 'btnStrong'] flex['column'] itemCenter");
    assert.equal(api.toggle('button', false), false);
    assert.equal(api.value, "flex['column'] itemCenter");
    assert.equal(api.toggle('button'), true);
    assert.equal(api.value, "flex['column'] itemCenter button");
    api.remove('flex', 'button');
    assert.equal(api.value, 'itemCenter');
    // add() returns the api, so the options of a new component follow in the same line
    api.add('button').option('button').add('btnMini', 'btnIconOnly');
    assert.equal(api.value, "itemCenter button['btnMini' 'btnIconOnly']");
});

test('a component name is a single word: an array, a space, a bracket or an empty name is a TypeError', () => {
    const api = pgs(element({ pgs: 'button' }));
    for (const call of [
        () => api.add("button['btnMini']"),
        () => api.add(['card', 'box']),
        () => api.add('card box'),
        () => api.add(''),
        () => api.add(null),
        () => api.remove("button['btnMini']"),
        () => api.toggle('card box'),
        () => api.contains("button['btnMini']"),
    ]) assert.throws(call, { name: 'TypeError' });
    assert.throws(() => api.add("button['btnMini']"), { message: /option\("button"\)\.add\("btnMini"\)/ });
    // the edges are trimmed, and no argument is no change
    api.add(' card ').add();
    assert.equal(api.value, 'button card');
});

test('option(component) writes the bracket of that component and of no other', () => {
    const el = element({ pgs: "button['btnPrimary'] modal['btnIconOnly'] flex['column']" });
    const button = pgs(el).option('button');

    assert.equal(button.contains('btnPrimary'), true);
    assert.equal(button.contains('btnIconOnly'), false);
    assert.deepEqual([...button.list()], ['btnPrimary']);

    // add merges without doubles; toggle twice gives back what was there
    button.add('btnMini', 'btnMini');
    assert.equal(el.getAttribute('pgs'), "button['btnPrimary' 'btnMini'] modal['btnIconOnly'] flex['column']");
    assert.equal(button.toggle('btnMini'), false);
    assert.equal(button.toggle('btnMini'), true);
    assert.equal(button.toggle('btnMini'), false);
    assert.equal(button.toggle('btnPrimary', true), true);
    assert.equal(el.getAttribute('pgs'), "button['btnPrimary'] modal['btnIconOnly'] flex['column']");

    // the last option gone leaves the bare component; the same option of another bracket stays
    button.add('btnIconOnly').remove('btnPrimary', 'btnIconOnly');
    assert.equal(el.getAttribute('pgs'), "button modal['btnIconOnly'] flex['column']");
    assert.deepEqual([...button.list()], []);
    assert.equal(el.getAttribute('pgs-data'), null);
});

test('option(component) on an element without the component: add is a TypeError, the rest change nothing', () => {
    const el = element({ pgs: 'card' });
    const button = pgs(el).option('button');
    assert.throws(() => button.add('btnMini'), { name: 'TypeError', message: /no button: add it first with pgs\(el\)\.add\("button"\)/ });
    assert.throws(() => button.toggle('btnMini'), { name: 'TypeError' });
    assert.equal(button.toggle('btnMini', false), false);
    assert.equal(button.contains('btnMini'), false);
    assert.deepEqual([...button.list()], []);
    button.remove('btnMini');
    assert.equal(el.getAttribute('pgs'), 'card');
});

test('option names the component, and an option is a single word', () => {
    const api = pgs(element({ pgs: 'button' }));
    for (const call of [
        () => api.option(),
        () => api.option("button['btnMini']"),
        () => api.option('button card'),
        () => api.option('button').add(['btnMini']),
        () => api.option('button').add('btnMini btnStrong'),
        () => api.option('button').add("'btnMini'"),
        () => api.option('button').contains(''),
    ]) assert.throws(call, { name: 'TypeError' });
    // there is no option without a component
    assert.equal(api.option.add, undefined);
    assert.equal(api.option.contains, undefined);
});

test('a list() is a copy: changing it leaves the element as it is', () => {
    const el = element({ pgs: "icon['icon-close']" });
    const list = pgs(el).option('icon').list();
    list.push('icon-moon');
    assert.equal(el.getAttribute('pgs'), "icon['icon-close']");
});

test('options and nested JSON in pgs-data survive updates of each other', () => {
    const payload = JSON.stringify({ nested: [[1, 2], { text: 'literal ] [ and "quotes"', path: 'a\\b' }] });
    const el = element({ pgs: "header['headerMain' 'headerScroll']", 'pgs-data': `config[${payload}] headerCompactFrom[600]` });
    const options = pgs(el).option('header');
    const data = pgs(el).data;
    data.setValueBrackets('headerCompactFrom', '800');
    assert.equal(data.getValueBrackets('config'), payload);
    assert.equal(data.getValueBrackets('headerCompactFrom'), '800');
    assert.equal(data.getValueBrackets('headerMain'), undefined);
    assert.equal(options.contains('headerScroll'), true);
    options.remove('headerMain');
    assert.equal(data.getValueBrackets('config'), payload);
    assert.equal(el.getAttribute('pgs'), "header['headerScroll']");
});

test('valued getters/setters use only pgs-data; the retired attribute is ignored', () => {
    const el = element({ pgs: "button['btnMini']", 'pgs-option': 'scroll config[old]' });
    const data = pgs(el).data;
    assert.equal(pgs(el).option('button').contains('scroll'), false);
    assert.equal(data.getValueBrackets('config'), undefined);
    data.setValueBrackets('config', '["nested", "]"]');
    assert.equal(data.getValueBrackets('config'), '["nested", "]"]');
    assert.equal(el.getAttribute('pgs-option'), 'scroll config[old]');
    assert.equal(el.getAttribute('pgs'), "button['btnMini']");
    data.setValueBrackets('empty');
    assert.equal(data.getValueBrackets('empty'), '');
});

test('data.value is a plain passthrough on pgs-data, never the pgs bracket', () => {
    const el = element({ pgs: "modal-dialog _dialog['dialogRight' 'dialogHistory']", 'pgs-data': 'modalContainerID[my dialog]' }, 'DIALOG');
    const data = pgs(el).data;
    assert.equal(data.value, 'modalContainerID[my dialog]');
    data.value = 'modalContainerID[other dialog] modalContainerPGS[header]';
    assert.equal(el.getAttribute('pgs'), "modal-dialog _dialog['dialogRight' 'dialogHistory']");
    assert.equal(data.getValueBrackets('modalContainerID'), 'other dialog');
    assert.deepEqual([...pgs(el).option('_dialog').list()], ['dialogRight', 'dialogHistory']);
    data.value = null;
    assert.equal(el.getAttribute('pgs-data'), null);
    assert.equal(data.value, null);
});

test('unmatched payload brackets do not yield a partial value', () => {
    const data = pgs(element({ 'pgs-data': 'broken[[1, 2]' })).data;
    assert.equal(data.getValueBrackets('broken'), undefined);
});

test('every flag of the CSS goes into the bracket it is given, never into pgs-data', () => {
    const css = read('dist/css/index.css');
    const flags = new Set([...css.matchAll(/\[pgs\*="'([^']+)'"\]/g)].map(match => match[1]));
    assert(flags.size > 100);
    for (const flag of flags) {
        const el = element({ pgs: 'owner' });
        pgs(el).option('owner').add(flag);
        assert.equal(el.getAttribute('pgs-data'), null, `${flag} must not be written to pgs-data`);
        assert.equal(el.getAttribute('pgs'), `owner['${flag}']`, `${flag} must land in the bracket named`);
    }
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

test('a state is a single word, and state is no longer callable', () => {
    const state = pgs(element()).state;
    assert.equal(typeof state, 'object');
    for (const call of [() => state.add(['open']), () => state.add('open active'), () => state.toggle(''), () => state.contains(null)]) {
        assert.throws(call, { name: 'TypeError' });
    }
    state.add('open', 'active');
    assert.equal(state.value, 'open active');
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

// _imports.js and the file of each module it imports (assets/javascript/modules/), where they are published
function moduleSources() {
    const dir = 'assets/javascript/modules';
    return [read('assets/javascript/_imports.js'), ...fs.readdirSync(path.join(root, dir)).map(file => read(`${dir}/${file}`))];
}

test('dist/index.d.ts declares every helper pgs.helper has', () => {
    const declared = read('dist/index.d.ts');
    const published = [
        ...objectKeys(read('assets/javascript/_pgs.js'), 'pgs.helper = '),
        ...moduleSources().flatMap(source => [...source.matchAll(/pgs\.helper\.(\w+) = /g)].map(match => match[1])),
    ].sort();
    const typed = interfaceMembers(declared, 'PgsHelper').sort();
    assert(published.length >= 12);
    assert.deepEqual(typed, published);
});

test('dist/index.d.ts declares every module registerModules registers', () => {
    const declared = read('dist/index.d.ts');
    const registered = moduleSources()
        .filter(source => source.includes('pgs.registerModules('))
        .flatMap(source => objectKeys(source, 'pgs.registerModules('))
        .sort();
    const typed = interfaceMembers(declared, 'PgsFunction').filter(name => !['registerModules', 'helper'].includes(name)).sort();
    assert(registered.length >= 15);
    assert.deepEqual(typed, registered);
});

//= MODULES
// assets/modules.json is what a project can leave out: index.scss, _imports.js and the files under
// assets/javascript/modules/ have to agree with it, or an excluded part would stay (or a kept one go)
const { modules: MODULES } = JSON.parse(read('assets/modules.json'));

test('assets/modules.json agrees with index.scss and _imports.js', () => {
    const scss = read('assets/scss/index.scss');
    const imports = read('assets/javascript/_imports.js');
    const jsFiles = fs.readdirSync(path.join(root, 'assets/javascript/modules')).map(file => file.replace(/\.js$/, ''));

    for (const [name, module] of Object.entries(MODULES)) {
        assert(module.scss || module.js, `${name} has neither scss nor js`);
        if (module.scss) {
            assert(fs.existsSync(path.join(root, 'assets/scss', path.dirname(module.scss), `_${path.basename(module.scss)}.scss`)), `${module.scss} not found`);
            assert(scss.includes(`@if pgs-module("${name}") { @include meta.load-css("${module.scss}"); }`), `index.scss does not gate ${module.scss} on ${name}`);
        }
        if (module.js) {
            assert(jsFiles.includes(module.js), `assets/javascript/modules/${module.js}.js not found`);
        }
        for (const needed of module.requires ?? []) assert(MODULES[needed], `${name} requires an unknown ${needed}`);
    }

    // every scss file index.scss gates is a module, every module file is imported, and only core is always there
    for (const [, name] of scss.matchAll(/pgs-module\("([^"]+)"\)/g)) assert(MODULES[name], `index.scss gates an unknown ${name}`);
    const declaredJs = Object.values(MODULES).map(module => module.js).filter(Boolean);
    for (const file of jsFiles) {
        assert(imports.includes(`import "./modules/${file}.js";`), `_imports.js does not import modules/${file}.js`);
        if (file !== 'core') assert(declaredJs.includes(file), `modules/${file}.js is not in assets/modules.json`);
    }
});

test('the welcome guide lists every name of assets/modules.json', () => {
    // the example mypgs.config.json is the complete list, to copy and trim
    const welcome = read('reference/html/guides/welcome.html');
    const example = welcome.match(/<code class="language-json">([\s\S]*?)<\/code>/);
    assert(example, 'the example mypgs.config.json is not there');
    const decoded = example[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    assert.deepEqual([...JSON.parse(decoded).include].sort(), Object.keys(MODULES).sort());
});

test('mypgs/build includes the listed parts and what they require', () => {
    const { pgsModules, modules } = require('../plugins/build.cjs');
    const all = Object.keys(modules);

    // no config: every part is in
    const none = pgsModules({ config: path.join(root, 'no-such-config.json'), warn: false });
    assert.deepEqual(none.include, all);
    assert.equal(none.sass, '$pgs-exclude: ();\n');
    assert.deepEqual(none.alias, {});

    // a modal brings its button and icon; everything else, a component added later too, is out
    const some = pgsModules({ include: ['modal'], warn: false });
    assert.deepEqual(some.include, ['button', 'icon', 'modal']);
    assert.equal(some.exclude.length, all.length - 3);
    assert(some.sass.includes('slides') && !some.sass.includes('modal'));
    assert(Object.keys(some.alias).some(file => file.endsWith('/slides.js')));
    assert(!Object.keys(some.alias).some(file => file.endsWith('/modal.js')));

    // a chain: formValidate brings toast, which brings alerts, which brings button and icon
    assert.deepEqual(pgsModules({ include: ['formValidate'], warn: false }).include, ['alerts', 'button', 'formValidate', 'icon', 'toast']);

    // an empty list keeps only what is always there
    assert.deepEqual(pgsModules({ include: [], warn: false }).exclude, all);
    assert.equal(pgsModules({ include: ['card'], warn: false }).sass.includes('$pgs-exclude: (accordion,'), true);

    assert.throws(() => pgsModules({ include: ['slide'] }), /unknown in include: slide/);
});
