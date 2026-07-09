export default function pgsVite() {
    return {
        name: "vite-plugin-pgs-html",
        enforce: "pre",

        transform(code, id) {
            if (!/\.(jsx|tsx)$/.test(id)) return null;

            const nextCode = code.replace(/\bpgsHtml(\s*)=/g, "pgs$1=");

            if (nextCode === code) return null;

            return {
                code: nextCode,
                map: null,
            };
        },
    };
}
