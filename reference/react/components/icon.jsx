export default function Icon() {
    return (
        <div pgs="flexColumn" pgs-option="gapSections">
            <div pgs="flexRow" pgs-option="gapTexts wrap">
                <i pgs="icon" pgs-option="icon-arrowLeft"></i>
                <i pgs="icon" pgs-option="icon-arrowRight"></i>
                <i pgs="icon" pgs-option="icon-chevronDown"></i>
                <i pgs="icon" pgs-option="icon-check"></i>
                <i pgs="icon" pgs-option="icon-close"></i>
                <i pgs="icon" pgs-option="icon-magnifyingGlass"></i>
                <i pgs="icon" pgs-option="icon-moon"></i>
                <i pgs="icon" pgs-option="icon-sun"></i>
                <i pgs="icon" pgs-option="icon-cookie"></i>
                <i pgs="icon" pgs-option="icon-sliders"></i>
                <i pgs="icon" pgs-option="icon-circle"></i>
                <i pgs="icon" pgs-option="icon-circleXmark"></i>
                <i pgs="icon" pgs-option="icon-circleCheck"></i>
                <i pgs="icon" pgs-option="icon-circleInfo"></i>
                <i pgs="icon" pgs-option="icon-triangleExclamation"></i>
            </div>

            <p><i pgs="icon" pgs-option="icon-circleInfo"></i> A glyph follows the size and colour of the text around it.</p>

            <div pgs="flexRow" pgs-option="gapTexts">
                <span pgs="icon" pgs-option="iconBox" aria-hidden="true">
                    <i pgs="icon" pgs-option="icon-check"></i>
                </span>

                <span pgs="icon" pgs-option="iconBox" aria-hidden="true">
                    <i pgs="icon" className="material-symbols-outlined">check</i>
                </span>
            </div>
        </div>
    );
}
