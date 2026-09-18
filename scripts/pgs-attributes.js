"use strict";

// Shared by the Markdown validator, static demo and token map. Keep tokenization aligned
// with assets/javascript/_pgs.js: spaces and nested JSON arrays stay inside a payload.
function findMatchingBracket(source, openIndex) {
    let depth = 0;
    let inString = false;
    let escaped = false;
    for (let i = openIndex; i < source.length; i++) {
        const char = source[i];
        if (escaped) { escaped = false; continue; }
        if (inString) {
            if (char === "\\") escaped = true;
            else if (char === '"') inString = false;
            continue;
        }
        if (char === '"') inString = true;
        else if (char === "[") depth++;
        else if (char === "]" && --depth === 0) return i;
    }
    return -1;
}

function tokenizeOptions(value) {
    const tokens = [];
    let i = 0;
    while (i < value.length) {
        while (i < value.length && /\s/.test(value[i])) i++;
        if (i >= value.length) break;
        const start = i;
        while (i < value.length && !/\s/.test(value[i]) && value[i] !== "[") i++;
        if (value[i] === "[") {
            const close = findMatchingBracket(value, i);
            i = close === -1 ? value.length : close + 1;
        }
        tokens.push(value.slice(start, i));
    }
    return tokens;
}

function decodeAttribute(value) {
    return value.replace(/&quot;/g, '"').replace(/&(?:apos|#39);/g, "'")
        .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

function extractAttributes(markup) {
    const activeMarkup = markup.replace(/<!--[\s\S]*?-->/g, "");
    const result = { pgs: [], options: [], data: [], states: [] };
    const pattern = /\b(pgs(?:-data|-state)?)\s*=\s*(["'])([\s\S]*?)\2/g;
    for (const match of activeMarkup.matchAll(pattern)) {
        const attribute = match[1];
        const value = decodeAttribute(match[3]);
        if (attribute === "pgs-data") result.data.push(...tokenizeOptions(value));
        else if (attribute === "pgs-state") result.states.push(...value.trim().split(/\s+/).filter(Boolean));
        else for (const token of tokenizeOptions(value)) {
            const open = token.indexOf("[");
            result.pgs.push(open === -1 ? token : token.slice(0, open));
            if (open !== -1) result.options.push(...[...token.slice(open + 1).matchAll(/'([^']+)'/g)].map(item => item[1]));
        }
    }
    for (const key of Object.keys(result)) result[key] = [...new Set(result[key])];
    return result;
}

module.exports = { findMatchingBracket, tokenizeOptions, decodeAttribute, extractAttributes };
