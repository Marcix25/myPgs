const columns = [
    ["Column one", "First column content."],
    ["Column two", "Second column content."],
    ["Column three", "Third column content."],
    ["Column four", "Fourth column content."],
    ["Column five", "Fifth column content."],
    ["Column six", "Sixth column content."],
];

function ColumnCard({ title, text }) {
    return (
        <article pgs="card flexColumnTexts">
            <strong>{title}</strong>
            <p>{text}</p>
        </article>
    );
}

export default function Flex() {
    return (
        <>
            <div pgs="container flexColumnTexts">
                <strong>Standard section</strong>
                <p>Centered content inside a MyPGS section.</p>
            </div>

            {[2, 3, 4, 6].map((count) => (
                <div key={count} pgs={`flex-${count}`}>
                    {columns.slice(0, count).map(([title, text]) => (
                        <ColumnCard key={title} title={title} text={text} />
                    ))}
                </div>
            ))}
        </>
    );
}
