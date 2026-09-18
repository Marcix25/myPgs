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
    const el = element({ pgs: "button['buttonMini' 'buttonStrong'] flex['flexColumn']" });
    const api = pgs(el);
    assert.equal(api.contains('button'), true);
    assert.equal(api.contains('buttonMini'), false);
    api.add('hover', 'button', "button['buttonReverse']");
    assert.equal(api.value, "button['buttonMini' 'buttonStrong' 'buttonReverse'] flex['flexColumn'] hover");
    assert.equal(api.toggle('button', false), false);
    assert.equal(api.value, "flex['flexColumn'] hover");
    api.remove('flex');
    assert.equal(api.value, 'hover');
});

test('bracket flags stay in the matching bracket and do not collide with longer names', () => {
    const el = element({ pgs: "button['buttonMini'] icon['icon-moon'] flex['flexColumnReverse']" });
    const options = pgs(el).option;
    assert.equal(options.contains('flexColumn'), false);
    //== turning a bracket flag off still goes through option.remove/toggle (a generic, non-owning
    //== operation); turning one on needs the base add(), naming the owning component directly
    options.toggle('icon-moon', false);
    pgs(el).add("icon['icon-sun']");
    pgs(el).add("button['buttonStrong']", "flex['gapTexts']");
    assert.equal(el.getAttribute('pgs'), "button['buttonMini' 'buttonStrong'] icon['icon-sun'] flex['flexColumnReverse' 'gapTexts']");
    assert.equal(el.getAttribute('pgs-data'), null);
    assert.equal(el.getAttribute('pgs-option'), null);
});

test('JS-only flags and nested JSON survive updates and removal of adjacent keys', () => {
    const payload = JSON.stringify({ nested: [[1, 2], { text: 'literal ] [ and "quotes"', path: 'a\\b' }] });
    const el = element({ pgs: "header['headerPrimary' 'headerScroll']", 'pgs-data': `config[${payload}] headerCompactFrom[600]` });
    const options = pgs(el).option;
    const data = pgs(el).data;
    data.setValueBrackets('headerCompactFrom', '800');
    assert.equal(data.getValueBrackets('config'), payload);
    assert.equal(data.getValueBrackets('headerCompactFrom'), '800');
    assert.equal(data.getValueBrackets('headerPrimary'), undefined);
    assert.equal(options.contains('headerScroll'), true);
    options.remove('headerPrimary');
    assert.equal(data.getValueBrackets('config'), payload);
    assert.equal(el.getAttribute('pgs'), "header['headerScroll']");
    assert.equal(el.getAttribute('pgs-option'), null);
});

test('valued getters/setters use only pgs-data; the retired attribute is ignored', () => {
    const el = element({ pgs: "button['buttonMini']", 'pgs-option': 'headerScroll config[old]' });
    const options = pgs(el).option;
    const data = pgs(el).data;
    assert.equal(options.contains('headerScroll'), false);
    assert.equal(data.getValueBrackets('config'), undefined);
    data.setValueBrackets('config', '["nested", "]"]');
    assert.equal(data.getValueBrackets('config'), '["nested", "]"]');
    assert.equal(el.getAttribute('pgs-option'), 'headerScroll config[old]');
    assert.equal(el.getAttribute('pgs'), "button['buttonMini']");
    data.setValueBrackets('empty');
    assert.equal(data.getValueBrackets('empty'), '');
});

test('data.value is a plain passthrough on pgs-data, never the pgs bracket', () => {
    const el = element({ pgs: "modal-dialog['modalRight' 'modalHistory']", 'pgs-data': 'modalContainerID[my dialog]' }, 'DIALOG');
    const options = pgs(el).option;
    const data = pgs(el).data;
    assert.equal(data.value, 'modalContainerID[my dialog]');
    data.value = 'modalContainerID[other dialog] modalContainerPGS[header]';
    assert.equal(el.getAttribute('pgs'), "modal-dialog['modalRight' 'modalHistory']");
    assert.equal(data.getValueBrackets('modalContainerID'), 'other dialog');
    assert.equal(options.contains('modalRight'), true);
    assert.equal(options.contains('modalHistory'), true);
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
    const el = element({ pgs: 'button' });
    pgs(el).option.add('buttonMini');
    assert.equal(el.getAttribute('pgs'), "button['buttonMini']");
    pgs(el).option.add('buttonStrong', 'buttonTransparent');
    assert.equal(el.getAttribute('pgs'), "button['buttonMini' 'buttonStrong' 'buttonTransparent']");
    assert.equal(el.getAttribute('pgs-data'), null);
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
    const el = element({ pgs: "header['headerScroll' 'headerPrimary'] hoverNot" });
    pgs(el).option.remove('headerScroll', 'hoverNot');
    assert.equal(el.getAttribute('pgs'), "header['headerPrimary']");
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
        ['header', 'headerScroll'], ['header', 'headerPrimary'],
        ['accordion', 'accordionAutoOpen'], ['accordionContainer', 'accordionMultiOpen'],
        ['slides', 'slidesSingleScroll'], ['slides', 'slidesScrollMouse'],
        ['dropdown', 'dropdownHover'], ['modal', 'modalHistory'],
    ]) {
        const el = element();
        pgs(el).add(`${component}['${flag}']`);
        assert.equal(el.getAttribute('pgs-data'), null, `${flag} must not be written to pgs-data`);
        assert.equal(pgs(el).option.contains(flag), true, `${flag} must be found through option.contains()`);
    }
});
