// words after which a "pgsHtml =" is code and not a JSX attribute: a declaration, a return, an operator
const CODE_KEYWORDS = new Set([
    "const", "let", "var", "return", "typeof", "in", "of", "new", "case", "else", "do", "await", "yield",
    "void", "delete", "throw", "export", "import", "default", "instanceof",
]);

// an attribute comes right after the tag name or after the end of the previous attribute, which is a
// word (a tag name, a boolean attribute), a closing quote or a closing brace ({...props}, {value}).
// Anything else before the name ({ pgsHtml = "" } and ( pgsHtml = "" ) defaults, a, pgsHtml = ...,
// a comment, an operator) is code, and so is a name that follows a declaring keyword
function isAttributePosition(code, offset) {
    const before = code.slice(0, offset).trimEnd();
    if (!before) return false;

    const last = before[before.length - 1];
    if (last === '"' || last === "'" || last === "}") return true;
    if (!/[\w$]/.test(last)) return false;

    return !CODE_KEYWORDS.has(before.match(/[\w$]+$/)[0]);
}

// pgsHtml="..." becomes pgs="..." where it is written as a JSX attribute: not a property (props.pgsHtml),
// not a comparison or an arrow (==, =>), not a declaration or a destructuring default
function transformPgsHtml(code) {
    return code.replace(/(?<![.\w$-])pgsHtml(\s*)=(?![=>])/g, (match, space, offset) =>
        isAttributePosition(code, offset) ? `pgs${space}=` : match);
}

export default function pgsVite() {
    return {
        name: "vite-plugin-pgs-html",
        enforce: "pre",

        transform(code, id) {
            // an id can carry a query (Component.tsx?v=123, ?import)
            if (!/\.(jsx|tsx)$/.test(String(id).split("?")[0])) return null;

            const nextCode = transformPgsHtml(code);

            if (nextCode === code) return null;

            return {
                code: nextCode,
                map: null,
            };
        },
    };
}
