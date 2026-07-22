export default function Modal() {
    return (
        <>
            <div pgs="modal" pgs-option="containerID[modal-container]">
                <button pgs="modal-button button" type="button">
                    <i className="fa-solid fa-window-maximize"></i> Open modal
                </button>

                <dialog>
                    <div pgs="modal-dialog-content">
                        <div pgs="modal-dialog-content-header">
                            <h3>Example modal</h3>
                        </div>

                        <div pgs="modal-dialog-content-scroll">
                            <p>Modal content. The close button is added automatically when missing.</p>
                        </div>
                    </div>
                </dialog>
            </div>

            <div pgs="modal" pgs-option="containerID[modal-container]">
                <button pgs="modal-button button" type="button">
                    <i className="fa-solid fa-window-maximize"></i> Open modal right
                </button>

                <dialog pgs-option="right">
                    <div pgs="modal-dialog-content">
                        <div pgs="modal-dialog-content-header">
                            <h3>Side modal</h3>
                        </div>

                        <div pgs="modal-dialog-content-scroll">
                            <p>Modal content with <code>pgs-option=&quot;right&quot;</code>.</p>
                        </div>
                    </div>
                </dialog>
            </div>

            <div pgs="modal" pgs-option="containerID[modal-container]">
                <button pgs="modal-button button" type="button">
                    <i className="fa-solid fa-window-maximize"></i> Open modal left
                </button>

                <dialog pgs-option="left">
                    <div pgs="modal-dialog-content">
                        <div pgs="modal-dialog-content-header">
                            <h3>Left-side modal</h3>
                        </div>

                        <div pgs="modal-dialog-content-scroll">
                            <p>Modal content with <code>pgs-option=&quot;left&quot;</code>.</p>
                        </div>
                    </div>
                </dialog>
            </div>

            <div pgs="modal">
                <button pgs="modal-button button" type="button">
                    <i className="fa-solid fa-floppy-disk"></i> Confirmation salvataggio
                </button>

                <dialog pgs-option="topLevel">
                    <div pgs="modal-dialog-content">
                        <div pgs="modal-dialog-content-header">
                            <h3>Save changes?</h3>
                        </div>

                        <div pgs="modal-dialog-content-scroll flexColumnElements">
                            <p>You have unsaved changes. Confirm to apply them or cancel to return to the page.</p>

                            <div pgs="flexRow">
                                <button pgs="button modal-close" type="button">Cancel</button>
                                <button pgs="buttonStrong" type="button">Save changes</button>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>

            <div id="modal-container"></div>
        </>
    );
}
