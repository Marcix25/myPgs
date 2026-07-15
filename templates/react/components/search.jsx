export default function Search() {
    return (
        <form pgs="buttonNohover search" autoComplete="off" action="" method="get">
            <button type="submit" title="Cerca"><i className="fa-solid fa-search"></i></button>
            <input type="search" name="s" placeholder="Cerca" defaultValue="" />
            <ul pgs="search-suggestions"></ul>
        </form>
    );
}

export function SearchModal() {
    return (
        <div pgs="modal search-modal" pgs-option="containerPGS[header]">
            <button type="button" pgs="modal-button buttonIcon" title="Cerca">
                <i className="fa-solid fa-search"></i>
            </button>

            <dialog>
                <div pgs="flexRow section search-mobile">
                    <form pgs="buttonNohover search" autoComplete="off" action="/" method="get">
                        <button type="submit" title="Cerca">
                            <i className="fa-solid fa-search"></i>
                        </button>

                        <input type="search" name="s" placeholder="Cerca" defaultValue="" />
                        <ul pgs="search-suggestions"></ul>
                    </form>

                    <button type="button" pgs="modal-close buttonIcon">
                        <i className="fa-solid fa-close"></i>
                    </button>
                </div>
            </dialog>
        </div>
    );
}
