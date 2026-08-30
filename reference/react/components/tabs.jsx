export default function Tabs() {
    return (
        <div pgs="tabs card">
            <div pgs="tabs-list card-content flexRow" aria-label="Code formats">
                <button pgs="tabs-list-tab button" pgs-option="buttonMini" type="button">HTML</button>
                <button pgs="tabs-list-tab button" pgs-option="buttonMini" type="button">React</button>
                <button pgs="tabs-list-tab button" pgs-option="buttonMini" type="button">Vue</button>
                <button pgs="tabs-list-tab button" pgs-option="buttonMini" type="button">SVG</button>
                <button pgs="tabs-list-tab button" pgs-option="buttonMini" type="button">XML</button>
            </div>

            <div pgs="tabs-panels card-content">
                <section pgs="tabs-panels-content">
                    <h3>HTML</h3>
                    <p>Semantic markup ready to copy into a page.</p>
                </section>
                <section pgs="tabs-panels-content">
                    <h3>React</h3>
                    <p>The same structure written in JSX with pgs attributes.</p>
                </section>
                <section pgs="tabs-panels-content">
                    <h3>Vue</h3>
                    <p>Component markup ready for a Vue template.</p>
                </section>
                <section pgs="tabs-panels-content">
                    <h3>SVG</h3>
                    <p>Inline vector markup for scalable graphics.</p>
                </section>
                <section pgs="tabs-panels-content">
                    <h3>XML</h3>
                    <p>Structured data markup in XML format.</p>
                </section>
            </div>
        </div>
    );
}
