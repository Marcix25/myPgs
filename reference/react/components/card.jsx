export default function Card() {
    return (
        <article pgs="card flexColumn">
            <img pgs="card-img imgCover" src="https://placehold.co/800x500" alt="Placeholder image" />

            <div pgs="flexColumn">
                <h3>Card riutilizzabile</h3>
                <p>Descriptive card content suitable for lists, previews, and grids.</p>
                <a pgs="button" href="#">Leggi di piu</a>
            </div>
        </article>
    );
}
export default function CardLink() {
    return (
        <article pgs="card">
            <a pgs="flexColumn" href="">
                <img pgs="card-img imgCover" src="https://placehold.co/800x500" alt="Placeholder image" />

                <div pgs="flexColumn">
                    <h3>Card riutilizzabile</h3>
                    <p>Descriptive card content suitable for lists, previews, and grids.</p>
                </div>
            </a>
        </article>
    );
}
