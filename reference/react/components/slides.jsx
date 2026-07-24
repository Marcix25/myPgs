const slides = [
    ["Slide uno", "First slide content.", "https://placehold.co/800x500?text=Slide+1", "Slide 1"],
    ["Slide due", "Second slide content.", "https://placehold.co/800x500?text=Slide+2", "Slide 2"],
    ["Slide tre", "Third slide content.", "https://placehold.co/800x500?text=Slide+3", "Slide 3"],
];

export default function Slides() {
    return (
        <div pgs="slides" pgs-option="singleScroll shadowDesktop">
            <ul pgs="slides-container">
                {slides.map(([title, text, src, alt]) => (
                    <li key={title}>
                        <article pgs="card flexColumn">
                            <img pgs="card-img imgCover" src={src} alt={alt} />
                            <div pgs="flexColumn">
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    );
}
