export default function Button() {
    return (
        <div pgs="flexRow">
            <a pgs="button" href="#">
                <i className="fa-duotone fa-solid fa-store"></i>
                About
            </a>

            <button pgs="button" type="button" pgs-option="buttonReverse">
                Avanti
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>

            <button pgs="buttonStrong" type="button">
                <i className="fa-solid fa-check" aria-hidden="true"></i>
                Submit
            </button>

            <button pgs="buttonIcon" type="button" aria-label="Impostazioni">
                <i className="fa-solid fa-gear" aria-hidden="true"></i>
            </button>

            <button pgs="buttonMini" type="button" aria-label="Informazioni">
                <i className="fa-solid fa-info" aria-hidden="true"></i>
            </button>

            <button pgs="buttonBig" type="button" aria-label="Bottone grande">
                <i className="fa-solid fa-rocket" aria-hidden="true"></i>
                Bottone grande
            </button>
        </div>
    );
}
