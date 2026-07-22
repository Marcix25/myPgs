export default function Summary() {
    return (
        <div pgs="summary">
            <div pgs="summary-content">
                <p>
                    This demonstration text is long enough to span multiple lines and show the summary component behavior. Content can include text, links, and other inline elements without requiring additional markup.
                </p>
                <p>
                    When content exceeds three lines, a button is shown to expand or collapse the visible area.
                </p>
            </div>

            <button pgs="summary-button" type="button">
                Show more
            </button>
        </div>
    );
}
