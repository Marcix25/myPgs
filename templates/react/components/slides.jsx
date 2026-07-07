const slides = [
    ["Slide uno", "Contenuto della prima slide.", "https://placehold.co/800x500?text=Slide+1", "Slide 1"],
    ["Slide due", "Contenuto della seconda slide.", "https://placehold.co/800x500?text=Slide+2", "Slide 2"],
    ["Slide tre", "Contenuto della terza slide.", "https://placehold.co/800x500?text=Slide+3", "Slide 3"],
];

export default function Slides() {
    return (
        <div pgs="slides" pgs-option="singleScroll shadowDesktop">
            <ul pgs="slides-container">
                {slides.map(([title, text, src, alt]) => (
                    <li key={title}>
                        <article pgs="card flexColumn">
                            <img pgs="card-img imgCover" src={src} alt={alt} />
                            <div pgs="flexColumnTexts">
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
