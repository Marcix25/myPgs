export default function Card() {
    return (
        <>
            <h2>Cards</h2>

            <div pgs="flexRow" pgs-option="column-2">
                <article pgs="card">
                    <img pgs="card-img" src="https://placehold.co/800x500" alt="Placeholder image" />

                    <div pgs="card-content">
                        <h3>Standard card</h3>
                        <p>Descriptive card content suitable for lists, previews, and grids.</p>
                        <a pgs="button marginTop" href="#">Read more</a>
                    </div>
                </article>

                <article pgs="card">
                    <a href="#">
                        <img pgs="card-img" src="https://placehold.co/800x500" alt="Placeholder image" />

                        <div pgs="card-content">
                            <h3>Clickable card</h3>
                            <p>The complete card surface behaves as a link.</p>
                        </div>
                    </a>
                </article>

                <article pgs="card" pgs-option="cardHorizontal">
                    <img pgs="card-img" src="https://placehold.co/800x500" alt="Placeholder image" />

                    <div pgs="card-content">
                        <h3>Horizontal card</h3>
                        <p>This card switches intrinsically between horizontal and stacked layouts.</p>
                    </div>
                </article>

                <article pgs="card" pgs-option="cardMini">
                    <div pgs="card-content">
                        <h3>Compact card</h3>
                        <p>The compact option reduces the content padding.</p>
                    </div>
                </article>
            </div>

            <h2>Boxes</h2>

            <div pgs="flexRow" pgs-option="column-2">
                <div pgs="box">
                    <h3>Standard box</h3>
                    <p>Lightweight content grouped inside a neutral surface.</p>
                </div>

                <div pgs="box" pgs-option="boxMini">
                    <h3>Compact box</h3>
                    <p>The compact option reduces the internal spacing.</p>
                </div>

                <a pgs="box" href="#">
                    <h3>Clickable box</h3>
                    <p>The complete box surface behaves as a link.</p>
                </a>
            </div>
        </>
    );
}
