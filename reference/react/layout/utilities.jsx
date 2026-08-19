export default function Utilities() {
    return (
        <>
            <a pgs="skipLink" href="#utility-content">Skip to utility examples</a>

            <main id="utility-content" pgs="flexColumn" pgs-option="gapSections">
                <section pgs="flexColumn" pgs-option="gapTexts">
                    <strong>Layout</strong>
                    <div pgs="flexRow" pgs-option="gapTexts wrap">
                        <span pgs="box block">Block</span>
                        <span pgs="box flexRow" pgs-option="inlineFlex">Inline flex</span>
                        <span pgs="box flexRow aspectSquare" pgs-option="flexCenter">Centered</span>
                    </div>
                    <div pgs="flexRow" pgs-option="gapTexts">
                        <span pgs="box flexRow flex-flexNone">Fixed</span>
                        <span pgs="box flexRow minWidth0 truncate flex-flex1">Flexible content that is safely truncated when needed.</span>
                        <span pgs="box flexColumn flex-flexOrderFirst">First</span>
                        <span pgs="box flexColumn flex-flexOrderLast">Last</span>
                    </div>
                    <div pgs="box positionRelative">
                        Relative parent
                        <span pgs="positionAbsolute">Absolute child</span>
                    </div>
                    <aside pgs="box positionSticky">Sticky element</aside>
                </section>

                <section pgs="flexColumn" pgs-option="gapTexts">
                    <strong>Content and interaction</strong>
                    <div pgs="box overflowAuto">Scrollable content when its container has constrained dimensions.</div>
                    <div pgs="box overflowXAuto">Horizontally scrollable content when required.</div>
                    <div pgs="box overflowHidden">Overflowing content is clipped.</div>
                    <div pgs="box aspectVideo">16:9 media area</div>
                    <span pgs="selectNone">Selection disabled</span>
                    <span pgs="selectText">Selection enabled</span>
                    <span pgs="pointerEventsNone">Pointer events disabled</span>
                    <span pgs="pointerEventsAuto">Pointer events enabled</span>
                    <button type="button" pgs="cursorNotAllowed">Unavailable action</button>
                </section>

                <section pgs="flexColumn" pgs-option="gapTexts">
                    <strong>Accessibility and color</strong>
                    <button type="button" pgs="focusRing">Keyboard focus ring</button>
                    <span pgs="visuallyHidden">Screen-reader-only description.</span>
                    <a pgs="visuallyHiddenFocusable" href="#utility-content">Visible while focused</a>
                    <span pgs="motionReduce">Motion is reduced for users who request it.</span>
                    <span pgs="bgInfo clInfoBackground brInfo">Info background</span>
                    <span pgs="bgInfoBackground clInfo">Info text</span>
                </section>
            </main>
        </>
    );
}
