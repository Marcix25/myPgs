const columns = [
    ["Colonna uno", "Contenuto della prima colonna."],
    ["Colonna due", "Contenuto della seconda colonna."],
    ["Colonna tre", "Contenuto della terza colonna."],
    ["Colonna quattro", "Contenuto della quarta colonna."],
    ["Colonna cinque", "Contenuto della quinta colonna."],
    ["Colonna sei", "Contenuto della sesta colonna."],
];

function ColumnCard({ title, text }) {
    return (
        <article pgs="card flexColumnTexts">
            <strong>{title}</strong>
            <p>{text}</p>
        </article>
    );
}

export default function Grid() {
    return (
        <>
            <div pgs="container flexColumnTexts">
                <strong>Sezione standard</strong>
                <p>Contenuto centrato dentro una sezione MyPGS.</p>
            </div>

            {[2, 3, 4, 6].map((count) => (
                <div key={count} pgs={`grid-${count}`}>
                    {columns.slice(0, count).map(([title, text]) => (
                        <ColumnCard key={title} title={title} text={text} />
                    ))}
                </div>
            ))}
        </>
    );
}
