export default function Spacing() {
    return (
        <div pgs="flexColumn gapSections">
            <section pgs="flexColumn gapTexts">
                <strong>Gap</strong>
                <div pgs="flexRow gapTexts wrap">
                    <span pgs="box">Text gap</span>
                    <span pgs="box">Text gap</span>
                </div>
                <div pgs="flexRow gapElements wrap">
                    <span pgs="box">Element gap</span>
                    <span pgs="box">Element gap</span>
                </div>
                <div pgs="flexRow gapSections nowrap">
                    <span pgs="box">Section gap</span>
                    <span pgs="box">Section gap</span>
                </div>
            </section>

            <section pgs="flexColumn gapTexts">
                <strong>Margin</strong>
                <p pgs="marginLeft" pgs-option="marginTexts">Text spacing on the left.</p>
                <p pgs="marginRight" pgs-option="marginElements">Element spacing on the right.</p>
                <p pgs="marginBottom" pgs-option="marginSections">Section spacing below.</p>
                <p pgs="marginTop" pgs-option="marginTexts">Text spacing above.</p>
                <p pgs="marginInline" pgs-option="marginElements">Element spacing on the inline axis.</p>
                <p pgs="marginBlock" pgs-option="marginSections">Section spacing on the block axis.</p>
            </section>

            <section pgs="flexColumn gapTexts">
                <strong>Padding</strong>
                <p pgs="paddingLeft" pgs-option="paddingTexts">Text spacing on the left.</p>
                <p pgs="paddingRight" pgs-option="paddingElements">Element spacing on the right.</p>
                <p pgs="paddingBottom" pgs-option="paddingSections">Section spacing below.</p>
                <p pgs="paddingTop" pgs-option="paddingTexts">Text spacing above.</p>
                <p pgs="paddingInline" pgs-option="paddingElements">Element spacing on the inline axis.</p>
                <p pgs="paddingBlock" pgs-option="paddingSections">Section spacing on the block axis.</p>
            </section>
        </div>
    );
}
