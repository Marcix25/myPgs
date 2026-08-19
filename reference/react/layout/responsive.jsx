const flexColumns = [
    ["Column one", "First flex column."],
    ["Column two", "Second flex column."],
    ["Column three", "Third flex column."],
];

const gridColumns = [
    ["Column one", "First grid column."],
    ["Column two", "Second grid column."],
    ["Column three", "Third grid column."],
    ["Column four", "Fourth grid column."],
];

function Column({ title, text }) {
    return (
        <article pgs="box flex" pgs-option="flexColumn">
            <strong>{title}</strong>
            <p>{text}</p>
        </article>
    );
}

export default function Responsive() {
    return (
        <div pgs="flex" pgs-option="flexColumn gapSections">
            <section>
                <strong>Flex</strong>
                <div pgs="flex" pgs-option="flexRow column-2 m2e">
                    {flexColumns.map(([title, text]) => (
                        <Column key={title} title={title} text={text} />
                    ))}
                </div>
            </section>

            <section>
                <strong>Grid</strong>
                <div pgs="grid" pgs-option="column-4 m2e">
                    {gridColumns.map(([title, text]) => (
                        <Column key={title} title={title} text={text} />
                    ))}
                </div>
            </section>

            <section pgs="flex" pgs-option="flexColumn gapTexts">
                <strong>Wrap</strong>
                <div pgs="flex" pgs-option="flexRow gapTexts wrap">
                    <span pgs="box">Wrapping item</span>
                    <span pgs="box">Wrapping item</span>
                    <span pgs="box">Wrapping item</span>
                </div>
                <div pgs="flex" pgs-option="flexRow gapTexts nowrap">
                    <span pgs="box">Non-wrapping item</span>
                    <span pgs="box">Non-wrapping item</span>
                </div>
            </section>

            <section pgs="flex" pgs-option="flexColumn gapTexts">
                <strong>Direction</strong>
                <div pgs="flex" pgs-option="flexRowReverse gapTexts">
                    <span pgs="box">First in markup</span>
                    <span pgs="box">Second in markup</span>
                </div>
                <div pgs="flex" pgs-option="flexColumnReverse gapTexts">
                    <span pgs="box">First in markup</span>
                    <span pgs="box">Second in markup</span>
                </div>
            </section>

            <section pgs="flex" pgs-option="flexColumn gapTexts">
                <strong>Alignment</strong>
                <div pgs="flex" pgs-option="flexRow gapTexts itemCenter justifyBetween contentCenter">
                    <span pgs="box">Short item</span>
                    <span pgs="box">Taller item<br />with two lines</span>
                    <span pgs="box" pgs-option="selfEnd">Self-aligned item</span>
                </div>
            </section>

            <section pgs="flex" pgs-option="flexColumn gapTexts">
                <strong>Flex children</strong>
                <div pgs="flex" pgs-option="flexRow gapTexts wrap">
                    <span pgs="box flex-flexInitial">Initial</span>
                    <span pgs="box flex-flexNone">None</span>
                    <span pgs="box flex-flex1">Grow</span>
                    <span pgs="box flex-flexFull">Full width</span>
                    <span pgs="box flex-flexOrderLast">Last</span>
                    <span pgs="box flex-flexOrderFirst">First</span>
                </div>
            </section>
        </div>
    );
}
