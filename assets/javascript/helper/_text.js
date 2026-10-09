//+ escapes text that gets interpolated into innerHTML, shared by the components that build their own
//+ markup from supplied strings: the alert card (the titles and descriptions of alerts, and of
//+ the notifications and toasts built on it) and the search suggestions (their labels)
export function PGS_escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

//+ the shared bit of markdown the alert card accepts in its title and description: **bold** and line
//+ breaks, applied after escaping so the source text can contain < > & unescaped
export function PGS_formatText(value) {
    return PGS_escapeHtml(value)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\r?\n/g, "<br>");
}
