export default function Accordion() {
    return (
        <ul pgs="grid gapTexts" pgs-option="column-1">
            <li pgs="accordion">
                <button pgs="accordion-button" type="button">
                    <i className="fa-solid fa-circle-question" aria-hidden="true"></i>
                    <span>Frequently asked question</span>
                </button>

                <div pgs="accordion-content" hidden>
                    <p>Example answer with reusable text content.</p>
                </div>
            </li>

            <li pgs="accordion">
                <button pgs="accordion-button" type="button">
                    <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
                    <span>Second section</span>
                </button>

                <div pgs="accordion-content" hidden>
                    <p>Additional accordion panel content.</p>
                </div>
            </li>
        </ul>
    );
}
