//+ escapes text that gets interpolated into innerHTML, shared by every component that builds its
//+ own markup from author-supplied strings (alert/notification/toast titles and descriptions,
//+ cookieConsent copy)
export function PGS_escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

//+ the shared bit of markdown every one of those components accepts: **bold** and line breaks,
//+ applied after escaping so the source text can contain < > & unescaped
export function PGS_formatText(value) {
    return PGS_escapeHtml(value)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\r?\n/g, "<br>");
}
