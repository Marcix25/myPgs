//# PGS BRACKET AUDIT (dev-only, not part of the library bundle)
//+ Drop this on any page while testing — <script src="pgs-bracket-audit.js"> anywhere after the
//+ markup — to find every element whose "pgs" attribute puts brackets on a generated child token.
//+ A child token is named after the component it belongs to (the part before its first dash, the
//+ same convention scripts/generate-pgs-map.js reads the tree by) and never carries its own
//+ options, no exceptions: a component shaped like modal-dialog, its own DOM element the
//+ JavaScript can move independently of its nominal parent, gets its options through a second,
//+ underscore-prefixed token added alongside it instead (see AGENTS-DEVELOPMENT.md and _dialog in
//+ _modal.js) — an underscore-prefixed token is never hand-written, so it never counts as a
//+ mistake either. Runs once on load and logs one console.error per offending element, with the
//+ token text and the element itself so devtools can jump straight to it.
(function () {
    const isGeneratedOnly = key => key.startsWith("_");

    //== mirrors BracketToken.split/key in assets/javascript/_pgs.js, kept standalone here so this
    //== file has nothing to import and can run on any page, including a production WordPress site
    function splitTokens(value) {
        const tokens = [];
        let i = 0;

        while (i < value.length) {
            while (i < value.length && /\s/.test(value[i])) i++;
            if (i >= value.length) break;

            const start = i;
            while (i < value.length && !/\s/.test(value[i]) && value[i] !== "[") i++;

            if (i < value.length && value[i] === "[") {
                let depth = 0;
                let inString = false;
                let escaped = false;
                let j = i;

                for (; j < value.length; j++) {
                    const char = value[j];
                    if (escaped) { escaped = false; continue; }
                    if (inString) {
                        if (char === "\\") escaped = true;
                        else if (char === "\"") inString = false;
                        continue;
                    }
                    if (char === "\"") inString = true;
                    else if (char === "[") depth++;
                    else if (char === "]") { depth--; if (depth === 0) { j++; break; } }
                }

                i = j;
            }

            if (i > start) tokens.push(value.slice(start, i));
        }

        return tokens;
    }

    const keyOf = token => token.match(/^[^\s[\]]+/)?.[0] || "";
    const isChildToken = key => key.includes("-") && !isGeneratedOnly(key);

    let found = 0;

    document.querySelectorAll("[pgs]").forEach(element => {
        const value = element.getAttribute("pgs") || "";

        for (const token of splitTokens(value)) {
            const key = keyOf(token);
            const hasBracket = token.length > key.length;
            if (!hasBracket || !isChildToken(key)) continue;

            found++;
            console.error(`[pgs-bracket-audit] "${key}" is a generated child token and shouldn't carry its own brackets:`, token, element);
        }
    });

    if (!found) console.log("[pgs-bracket-audit] no offending brackets found on this page");
})();
