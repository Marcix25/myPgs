const slides = [
    ["First slide", "First slide content.", "https://placehold.co/800x500?text=Slide+1", "Slide 1"],
    ["Second slide", "Second slide content.", "https://placehold.co/800x500?text=Slide+2", "Slide 2"],
    ["Slide tre", "Third slide content.", "https://placehold.co/800x500?text=Slide+3", "Slide 3"],
];

export default function Slides() {
    return (
        <div pgs="slides" pgs-option="slidesSingleScroll slidesShadowDesktop">
            <ul pgs="slides-container">
                {slides.map(([title, text, src, alt]) => (
                    <li key={title} pgs="slides-container-slide">
                        <article pgs="card flexColumn">
                            <img pgs="card-img imgCover" src={src} alt={alt} />
                            <div pgs="card-content">
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
