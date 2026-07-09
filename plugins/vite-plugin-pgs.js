export default function pgsVite() {
    return {
        name: "vite-plugin-pgs-html",

        transform(code, id) {
            if (!/\.(jsx|tsx)$/.test(id)) return null;

            return {
                code: code.replace(/\bpgsHtml=/g, "pgs="),
                map: null,
            };
        },
    };
}