export default function StepTabs() {
    return (
        <div pgs="stepTabs flexColumn gapElements">
            <div pgs="stepTabs-dots" aria-label="Avanzamento"></div>

            <div pgs="stepTabs-container">
                <section pgs="stepTabs-container-tab flexColumn" tabIndex="-1" pgs-option="tabIcon[<i pgs='icon' pgs-option='icon-circle'></i>]">
                    <h3>Personal details</h3>
                    <p>First tab content.</p>
                </section>

                <section pgs="stepTabs-container-tab flexColumn" tabIndex="-1" pgs-option="tabIcon[<i pgs='icon' pgs-option='icon-sliders'></i>]">
                    <h3>Preferences</h3>
                    <p>Second tab content.</p>
                </section>

                <section pgs="stepTabs-container-tab flexColumn" tabIndex="-1" pgs-option="tabIcon[<i pgs='icon' pgs-option='icon-check'></i>]">
                    <h3>Confirmation</h3>
                    <p>Third tab content.</p>
                </section>
            </div>

            <div pgs="flexRow">
                <button pgs="stepTabs-prev button" type="button">
                    <i pgs="icon" pgs-option="icon-arrowLeft" aria-hidden="true"></i>
                    Back
                </button>

                <button pgs="stepTabs-restart button" type="button">
                    Ricomincia
                </button>

                <button pgs="stepTabs-next button" pgs-option="buttonReverse" type="button">
                    Next
                    <i pgs="icon" pgs-option="icon-arrowRight" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
}
