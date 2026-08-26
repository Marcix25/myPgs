export default function Button() {
    return (
        <div pgs="flexRow">
            <a pgs="button" href="#">
                <i pgs="icon" pgs-option="icon-star"></i>
                About
            </a>

            <button pgs="button" type="button" pgs-option="buttonReverse" disabled>
                Next
                <i pgs="icon" pgs-option="icon-arrowRight" aria-hidden="true"></i>
            </button>

            <button pgs="button" pgs-option="buttonStrong" type="button">
                Submit
            </button>

            <button pgs="button" pgs-option="buttonIcon" type="button" aria-label="Settings">
                <i pgs="icon" pgs-option="icon-star" aria-hidden="true"></i>
            </button>

            <button pgs="button" pgs-option="buttonMini" type="button" aria-label="Information">
                <i pgs="icon" pgs-option="icon-star" aria-hidden="true"></i>
            </button>

            <button pgs="button" pgs-option="buttonBig" type="button" aria-label="Large button">
                <i pgs="icon" pgs-option="icon-star" aria-hidden="true"></i>
                Large button
            </button>

            <button pgs="button" pgs-option="buttonTransparent" type="button">
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

        </div>
    );
}
