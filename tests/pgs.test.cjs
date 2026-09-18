const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/javascript/_pgs.js'), 'utf8')
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
    const el = element({ pgs: "button['mini' 'strong'] flex['column']" });
    const api = pgs(el);
    assert.equal(api.contains('button'), true);
    assert.equal(api.contains('mini'), false);
    api.add('hover', 'button', "button['reverse']");
    assert.equal(api.value, "button['mini' 'strong' 'reverse'] flex['column'] hover");
    assert.equal(api.toggle('button', false), false);
    assert.equal(api.value, "flex['column'] hover");
    api.remove('flex');
    assert.equal(api.value, 'hover');
});

test('bracket flags stay in the matching bracket and do not collide with longer names', () => {
    const el = element({ pgs: "button['mini'] icon['icon-moon'] flex['columnReverse']" });
    const options = pgs(el).option;
    assert.equal(options.contains('column'), false);
    //== turning a bracket flag off still goes through option.remove/toggle (a generic, non-owning
    //== operation); turning one on needs the base add(), naming the owning component directly
    options.toggle('icon-moon', false);
    pgs(el).add("icon['icon-sun']");
    pgs(el).add("button['strong']", "flex['gapTexts']");
    assert.equal(el.getAttribute('pgs'), "button['mini' 'strong'] icon['icon-sun'] flex['columnReverse' 'gapTexts']");
    assert.equal(el.getAttribute('pgs-data'), null);
    assert.equal(el.getAttribute('pgs-option'), null);
});

test('JS-only flags and nested JSON survive updates and removal of adjacent keys', () => {
    const payload = JSON.stringify({ nested: [[1, 2], { text: 'literal ] [ and "quotes"', path: 'a\\b' }] });
    const el = element({ pgs: "header['main' 'scroll']", 'pgs-data': `config[${payload}] headerCompactFrom[600]` });
    const options = pgs(el).option;
    const data = pgs(el).data;
    data.setValueBrackets('headerCompactFrom', '800');
    assert.equal(data.getValueBrackets('config'), payload);
    assert.equal(data.getValueBrackets('headerCompactFrom'), '800');
    assert.equal(data.getValueBrackets('main'), undefined);
    assert.equal(options.contains('scroll'), true);
    options.remove('main');
    assert.equal(data.getValueBrackets('config'), payload);
    assert.equal(el.getAttribute('pgs'), "header['scroll']");
    assert.equal(el.getAttribute('pgs-option'), null);
});

test('valued getters/setters use only pgs-data; the retired attribute is ignored', () => {
    const el = element({ pgs: "button['mini']", 'pgs-option': 'scroll config[old]' });
    const options = pgs(el).option;
    const data = pgs(el).data;
    assert.equal(options.contains('scroll'), false);
    assert.equal(data.getValueBrackets('config'), undefined);
    data.setValueBrackets('config', '["nested", "]"]');
    assert.equal(data.getValueBrackets('config'), '["nested", "]"]');
    assert.equal(el.getAttribute('pgs-option'), 'scroll config[old]');
    assert.equal(el.getAttribute('pgs'), "button['mini']");
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
    const css = fs.readFileSync(path.join(__dirname, '../dist/css/index.css'), 'utf8');
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
    //== most flags were shortened once bracket scoping made the component prefix redundant
    //== (button['mini'], not button['buttonMini']) — margin2/padding2 and the icon-* glyphs kept
    //== theirs on purpose, precisely so a bare add() can still find its way home without the
    //== caller naming the component explicitly. auto/unset lost that prefix along with the rest,
    //== so only margin2 can still be derived here — see the next test for what happens to auto
    const el = element({ pgs: 'margin' });
    pgs(el).option.add('margin2');
    assert.equal(el.getAttribute('pgs'), "margin['margin2']");
    assert.equal(el.getAttribute('pgs-data'), null);
});

test("option.add cannot derive an owner from a shortened flag name; it lands bare like hoverNot", () => {
    //== this is the real cost of shortening: button['mini'] and margin['auto'] must be written
    //== explicitly through the base pgs(el).add() — option.add('mini') / option.add('auto') alone
    //== have no component name left in them to find
    const button = element({ pgs: 'button' });
    pgs(button).option.add('mini');
    assert.equal(button.getAttribute('pgs'), 'button mini');

    const margin = element({ pgs: 'margin' });
    pgs(margin).option.add('auto');
    assert.equal(margin.getAttribute('pgs'), 'margin auto');
});

test('option.add falls back to a bare pgs token when no owner is present, like hoverNot on a plain button', () => {
    const el = element({ pgs: 'button' });
    pgs(el).option.add('hoverNot');
    assert.equal(el.getAttribute('pgs'), 'button hoverNot');
    assert.equal(pgs(el).option.contains('hoverNot'), true);
    pgs(el).option.remove('hoverNot');
    assert.equal(el.getAttribute('pgs'), 'button');
});

test('option.remove strips a flag whether it is bare or nested in a bracket', () => {
    const el = element({ pgs: "header['scroll' 'main'] hoverNot" });
    pgs(el).option.remove('scroll', 'hoverNot');
    assert.equal(el.getAttribute('pgs'), "header['main']");
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
        ['header', 'scroll'], ['header', 'main'],
        ['accordion', 'autoOpen'], ['accordionContainer', 'multiOpen'],
        ['slides', 'singleScroll'], ['slides', 'scrollMouse'],
        ['dropdown', 'hover'], ['modal', 'dialogHistory'],
    ]) {
        const el = element();
        pgs(el).add(`${component}['${flag}']`);
        assert.equal(el.getAttribute('pgs-data'), null, `${flag} must not be written to pgs-data`);
        assert.equal(pgs(el).option.contains(flag), true, `${flag} must be found through option.contains()`);
    }
});
