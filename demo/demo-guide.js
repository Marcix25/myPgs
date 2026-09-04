//# GUIDE PAGES (reference/html/guides/*.html)
//
// A guide is prose, not a component demo: its body already reads as formatted content (headings,
// paragraphs, lists, code blocks), not as markup meant to be copied. So unlike every other
// reference page, a guide renders straight into the page with no "Example HTML" code block below
// it. Kept in its own file, separate from demo.js, since none of this shares logic with how a
// component's live preview + copyable source are built there.
const DemoGuide = {
    render(section, data, markup) {
        const header = document.createElement("div");
        header.className = "demoContent-heading";
        header.setAttribute("pgs", "flexColumn");
        header.setAttribute("pgs-option", "gapTexts");

        const heading = document.createElement("h1");
        heading.textContent = data?.title || "";
        header.append(heading);

        if (data?.description) {
            const p = document.createElement("p");
            p.textContent = data.description;
            header.append(p);
        }

        section.append(header);

        const content = document.createElement("div");
        content.setAttribute("pgs", "flexColumn");
        content.setAttribute("pgs-option", "gapElements");
        content.innerHTML = markup;
        section.append(content);

        //== the same highlighter already loaded for every other code block on the page; languages
        //== without a loaded grammar (scss, bash) just render as plain, unhighlighted text
        content.querySelectorAll('pre code[class*="language-"]').forEach(code => window.Prism?.highlightElement(code));
    }
};
