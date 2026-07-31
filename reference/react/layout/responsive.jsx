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
        <article pgs="box flexColumn">
            <strong>{title}</strong>
            <p>{text}</p>
        </article>
    );
}

export default function Responsive() {
    return (
        <div pgs="flexColumn gapSections">
            <section>
                <strong>Flex</strong>
                <div pgs="flexRow" pgs-option="column-2 m2e">
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

            <section pgs="flexColumn gapTexts">
                <strong>Wrap</strong>
                <div pgs="flexRow gapTexts wrap">
                    <span pgs="box">Wrapping item</span>
                    <span pgs="box">Wrapping item</span>
                    <span pgs="box">Wrapping item</span>
                </div>
                <div pgs="flexRow gapTexts nowrap">
                    <span pgs="box">Non-wrapping item</span>
                    <span pgs="box">Non-wrapping item</span>
                </div>
            </section>
        </div>
    );
}
