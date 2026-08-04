export default function Button() {
    return (
        <div pgs="flexRow">
            <a pgs="button" href="#">
                <i className="fa-duotone fa-solid fa-store"></i>
                About
            </a>

            <button pgs="button" type="button" pgs-option="buttonReverse" disabled>
                Next
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>

            <button pgs="button" pgs-option="buttonStrong" type="button">
                <i className="fa-solid fa-check" aria-hidden="true"></i>
                Submit
            </button>

            <button pgs="button" pgs-option="buttonIcon" type="button" aria-label="Settings">
                <i className="fa-solid fa-gear" aria-hidden="true"></i>
            </button>

            <button pgs="button" pgs-option="buttonMini" type="button" aria-label="Information">
                <i className="fa-solid fa-info" aria-hidden="true"></i>
            </button>

            <button pgs="button" pgs-option="buttonBig" type="button" aria-label="Large button">
                <i className="fa-solid fa-rocket" aria-hidden="true"></i>
                Large button
            </button>

            <button pgs="button" pgs-option="buttonTransparent" type="button">
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                Transparent
            </button>

            <button pgs="button" pgs-option="buttonStrong buttonSecondary" type="button">
                Secondary
            </button>

            <button pgs="button" pgs-option="buttonStrong buttonTertiary" type="button">
                Tertiary
            </button>

            <button pgs="button" pgs-option="buttonStrong buttonQuaternary" type="button">
                Quaternary
            </button>

            <span pgs="icon" aria-hidden="true">
                <i className="fa-solid fa-star"></i>
            </span>
        </div>
    );
}
