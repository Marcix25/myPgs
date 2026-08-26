export default function Accordion() {
    return (
        <ul pgs="grid gapTexts">
            <li pgs="accordion">
                <button pgs="accordion-button" type="button">
                    <span>Frequently asked question</span>
                </button>

                <div pgs="accordion-content" hidden>
                    <p>Example answer with reusable text content.</p>
                </div>
            </li>

            <li pgs="accordion">
                <button pgs="accordion-button" type="button">
                    <span>Second section</span>
                </button>

                <div pgs="accordion-content" hidden>
                    <p>Additional accordion panel content.</p>
                </div>
            </li>
        </ul>
    );
}
