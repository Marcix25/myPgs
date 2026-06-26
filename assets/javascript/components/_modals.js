//# MODAL
const API = new WeakMap();

export function PGS_modal_init(selector = "modal") {
    pgs(document).querySelectorAll(selector).forEach(MODAL => {
        if (API.has(MODAL)) return;

        const BUTTON_OPEN = pgs(MODAL).querySelector("modal-button");        
        const DIALOG = MODAL.querySelector("dialog");
        if (!BUTTON_OPEN || !DIALOG) return;

        //== SELECTOR
        const DOMButtonClose = '<button pgs="buttonClose modal-close" type="button" tabindex="0" aria-label="Chiudi"><i class="fa-solid fa-close"></i></button>';
        const modalContentHeader = pgs(MODAL)?.querySelector("modal-dialog-content-header")
        
        
        //== OPTION ATTRIBUTES MODAL
        const disableBackdropClose = pgs(MODAL).option.contains("disableBackdropClose")
        const data_history = pgs(MODAL).option.contains("history");
        const data_container = pgs(MODAL).option.getValueBrackets("containerID");
        const data_containerPGS = pgs(MODAL).option.getValueBrackets("containerPGS");
        
        //== OPTION ATTRIBUTES DIALOG
        const topLevel = pgs(DIALOG).option.contains("topLevel")

        
        //== BUTTON CLOSE
        if (pgs(MODAL).querySelector("modal-close")) null
        else if (modalContentHeader) modalContentHeader.insertAdjacentHTML("beforeend", DOMButtonClose)
        else DIALOG.insertAdjacentHTML("beforeend", DOMButtonClose)
        const BUTTON_CLOSE = pgs(MODAL).querySelector("modal-close")


        //== SET
        pgs(DIALOG).add("dialog modal-dialog");

        //== BUTTON OPEN
        BUTTON_OPEN.setAttribute("role", "button");
        BUTTON_OPEN.setAttribute("aria-label", "apri modale");


        //== POSITION
        if(!topLevel){           
            if (data_container) document.querySelector("#" + data_container)?.append(DIALOG);
            else if (data_containerPGS) pgs(document).querySelector(data_containerPGS)?.append(DIALOG);
            else document.body.append(DIALOG);
        }


        //+ FN STATUS 
        function statusModal(status = true) {
            BUTTON_OPEN?.setAttribute("aria-expanded", status);
            DIALOG?.setAttribute("aria-expanded", status);
        }

        //+ FN OPEN 
        function openModal(e) {
            e?.stopImmediatePropagation();
            if (DIALOG.open) {
                closeModal(e);
                return;
            }

            if (!DIALOG.open) document.querySelectorAll("dialog[open]").forEach((dlg) => dlg.close());
            statusModal(true);
            topLevel ? DIALOG.showModal() : DIALOG.show();
            // modalCustomEvents('modal:open', { event: e });
            MODAL.dispatchEvent(new CustomEvent('modal:open'));
            DIALOG.dispatchEvent(new CustomEvent('modal:open'));
        }

        //+ FN CLOSE 
        function closeModal(e) {
            e?.stopImmediatePropagation()
            statusModal(false);
            DIALOG.close();
            // modalCustomEvents('modal:close', { event: e });
            MODAL.dispatchEvent(new CustomEvent('modal:close'));
            DIALOG.dispatchEvent(new CustomEvent('modal:close'));
        }

        function forceOpen(e) {
            if (!DIALOG.open) openModal(e);
        }

        function forceClose(e) {
            if (DIALOG.open) closeModal(e);
        }

        //+ fn OPEN ON HISTORY
        function openModalOnHistory() {
            const params = new URLSearchParams(window.location.search);
            if (params.get('modal') !== BUTTON_OPEN.id) return;
            document.getElementById(BUTTON_OPEN.id)?.scrollIntoView({ behavior: 'smooth' });
            openModal();
        }


        //= OPEN 
        BUTTON_OPEN.addEventListener("click", (e) => openModal(e));
        BUTTON_OPEN.addEventListener("keypress", (e) => !DIALOG.open && (e.key === "Enter" || e.key === " ") && openModal(e));
        
        //= CLOSE 
        DIALOG.addEventListener("close", () => statusModal(false));
        DIALOG.addEventListener("click", e => { if (e.target == DIALOG && !disableBackdropClose) closeModal(e) });
        BUTTON_CLOSE?.addEventListener("click", e => closeModal(e));
        
        //= UPDATE HISTORY
        if (data_history && BUTTON_OPEN.id) {
            setTimeout(openModalOnHistory, 1);

            //== Aggiorna URL quando cambia l'attributo "open" del dialog
            const obs = new MutationObserver(() => {
                let isOpen = DIALOG.hasAttribute("open");
                try {
                    const url = new URL(window.location.href);
                    const params = new URLSearchParams(url.search);
                    isOpen ? params.set('modal', BUTTON_OPEN.id) : params.delete('modal');
                    url.search = params.toString() ? `?${params.toString()}` : "";
                    window.history.pushState({ modal: BUTTON_OPEN.id, open: isOpen }, "", url);
                } catch (_) { }
            });
            obs.observe(DIALOG, { attributes: true, attributeFilter: ["open"] });

            //== Gestisce back/forward del browser per aprire/chiudere il dialog coerentemente
            window.addEventListener("popstate", () => {
                try {
                    const params = new URLSearchParams(window.location.search);
                    const shouldOpen = params.get('modal') === BUTTON_OPEN.id;
                    if (shouldOpen && !DIALOG.open) DIALOG.showModal();
                    if (!shouldOpen && DIALOG.open) closeModal()
                } catch (_) { }
            });
        }

        API.set(MODAL, {
            element: MODAL,
            button: BUTTON_OPEN,
            dialog: DIALOG,
            closeButton: BUTTON_CLOSE,
            open: forceOpen,
            close: forceClose,
            toggle: openModal,
            refresh: () => {
                PGS_modal_init(selector);
                return API.get(MODAL);
            },
            isOpen: () => DIALOG.open,
        });
    });
}

//# INIT PGS_modal
PGS_modal_init()

//# API
export function PGS_modal_api(selector) {
    return API.get(selector);
}

export const PGS_modal = {
    PGS_name: "PGS_modal",
    init: PGS_modal_init,
    api: PGS_modal_api
};
