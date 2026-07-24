export default function StepTabs() {
    return (
        <div pgs="stepTabs flexColumn gapElements">
            <div pgs="stepTabs-dots" aria-label="Avanzamento"></div>

            <div pgs="stepTabs-container">
                <section pgs="tab flexColumn" tabIndex="-1" pgs-option="tabIcon[fa-user]">
                    <h3>Personal details</h3>
                    <p>First tab content.</p>
                </section>

                <section pgs="tab flexColumn" tabIndex="-1" pgs-option="tabIcon[fa-list-check]">
                    <h3>Preferences</h3>
                    <p>Second tab content.</p>
                </section>

                <section pgs="tab flexColumn" tabIndex="-1" pgs-option="tabIcon[fa-check]">
                    <h3>Confirmation</h3>
                    <p>Third tab content.</p>
                </section>
            </div>

            <div pgs="flexRow">
                <button pgs="stepTabs-prev button" type="button">
                    <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                    Back
                </button>

                <button pgs="stepTabs-restart button" type="button">
                    Ricomincia
                </button>

                <button pgs="stepTabs-next button" pgs-option="buttonReverse" type="button">
                    Next
                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
}
