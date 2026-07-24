export default function Section() {
    return (
        <div pgs="flexColumn gapSections">
            <section pgs="section flexColumn gapElements">
                <div pgs="container flexColumn">
                    <strong>Standard section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
            </section>

            <section pgs="sectionFull flexColumn gapElements">
                <div pgs="container flexColumn">
                    <strong>Full-width section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
            </section>

            <section pgs="sectionSpecificity flexColumn gapElements">
                <div pgs="container flexColumn">
                    <strong>Specificity section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
                <div pgs="sectionSpecificity-child container flexColumn">
                    <strong>Specificity-child section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
            </section>

            <section pgs="sectionMax flexColumn gapElements" style={{ backgroundColor: "var(--color-primary-soft)" }}>
                <div pgs="container flexColumn">
                    <strong>Max-width section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
            </section>

            <section pgs="sectionNoPadding flexColumn gapElements">
                <div pgs="container flexColumn">
                    <strong>No-padding section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
            </section>
        </div>
    );
}
