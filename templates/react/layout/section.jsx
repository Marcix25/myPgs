export default function Section() {
    return (
        <div pgs="flexColumnSections">
            <section pgs="section flexColumnElements">
                <div pgs="container flexColumnTexts">
                    <strong>Standard section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
            </section>

            <section pgs="sectionFull flexColumnElements">
                <div pgs="container flexColumnTexts">
                    <strong>Full-width section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
            </section>

            <section pgs="sectionSpecificity flexColumnElements">
                <div pgs="container flexColumnTexts">
                    <strong>Specificity section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
                <div pgs="sectionSpecificity-child container flexColumnTexts">
                    <strong>Specificity-child section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
            </section>

            <section pgs="sectionMax flexColumnElements" style={{ backgroundColor: "var(--color-primary-soft)" }}>
                <div pgs="container flexColumnTexts">
                    <strong>Max-width section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
            </section>

            <section pgs="sectionNoPadding flexColumnElements">
                <div pgs="container flexColumnTexts">
                    <strong>No-padding section</strong>
                    <p>Centered content inside a MyPGS section.</p>
                </div>
            </section>
        </div>
    );
}
